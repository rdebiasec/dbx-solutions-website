#!/usr/bin/env node
/**
 * Prepare direct MCP upload batch: writes per-index CDP args + tracks state.
 * Agent loop: for each pending in /tmp/intercom-batch/pending.json
 *   1. browser_navigate (URL in meta.json)
 *   2. sleep 5s
 *   3. browser_cdp with /tmp/intercom-batch/cdp-{n}.json args
 *   4. node verify-and-advance.mjs N '<result json>'
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BATCH_DIR = '/tmp/intercom-batch';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const start = Number(process.argv[2] ?? 7);
const end = Number(process.argv[3] ?? 83);

fs.mkdirSync(BATCH_DIR, { recursive: true });
const progress = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'),
);
const pending = [];
for (let i = start; i <= end; i++) {
  if (progress.uploaded.includes(i)) continue;
  const paramsFile = `/tmp/cdp-params-${i}.json`;
  if (!fs.existsSync(paramsFile)) {
    try {
      execSync(`node ${path.join(__dirname, 'emit-atomic-pub.mjs')} ${i} ${paramsFile}`, {
        stdio: 'pipe',
      });
    } catch {
      console.error(JSON.stringify({ error: 'no_params', index: i }));
      continue;
    }
  }
  const params = JSON.parse(fs.readFileSync(paramsFile, 'utf8'));
  fs.writeFileSync(
    path.join(BATCH_DIR, `cdp-${i}.json`),
    JSON.stringify({
      method: 'Runtime.evaluate',
      params,
      viewId: VIEW_ID,
    }),
  );
  pending.push(i);
}
fs.writeFileSync(
  path.join(BATCH_DIR, 'pending.json'),
  JSON.stringify({ pending, url: URL, viewId: VIEW_ID }),
);
console.log(JSON.stringify({ pending, count: pending.length }));

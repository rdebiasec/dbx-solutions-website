#!/usr/bin/env node
/**
 * Prepare pending upload indices and emit per-index MCP step files.
 * Agent: for each index N, browser_navigate URL, then browser_cdp from /tmp/glass-step-N.json
 * Usage: node glass-upload-batch.mjs [start] [end]
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const progressFile = path.join(__dirname, 'upload-progress.json');
const start = Number(process.argv[2] ?? 30);
const end = Number(process.argv[3] ?? 80);
const p = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
const done = new Set(p.uploaded);
const pending = [];
for (let i = start; i <= end; i++) {
  if (i >= 51 && i <= 56) continue;
  if (!done.has(i)) pending.push(i);
}
const out = { viewId: VIEW, url: URL, pending, steps: {} };
for (const n of pending) {
  const payload = execSync(`node ${path.join(__dirname, 'emit-atomic-pub.mjs')} ${n}`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
  const parsed = JSON.parse(payload);
  if (parsed.skip) {
    out.steps[n] = { skip: true };
    continue;
  }
  const step = {
    navigate: URL,
    cdp: {
      method: 'Runtime.evaluate',
      params: parsed.cdp.params,
      viewId: VIEW,
    },
    append: n,
  };
  const f = `/tmp/glass-step-${n}.json`;
  fs.writeFileSync(f, JSON.stringify(step));
  out.steps[n] = { file: f, title: parsed.title, exprLen: parsed.exprLen };
}
const manifest = `/tmp/glass-batch-${start}-${end}.json`;
fs.writeFileSync(manifest, JSON.stringify(out, null, 2));
console.log(JSON.stringify({ manifest, pending, count: pending.length }));

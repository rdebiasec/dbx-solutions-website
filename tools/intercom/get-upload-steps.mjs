#!/usr/bin/env node
/** Output upload steps JSON for index N (combined expr + session chunk fallback). */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const index = Number(process.argv[2]);
const combined = `/tmp/intercom-upload/combined/${index}.expr`;

if (!fs.existsSync(combined)) {
  console.log(JSON.stringify({ error: 'missing', index }));
  process.exit(1);
}

const expr = fs.readFileSync(combined, 'utf8').trim();
const singleParams = { expression: expr, awaitPromise: true, returnByValue: true };
const singleSize = JSON.stringify(singleParams).length;

const steps = [{ action: 'navigate', url: URL, viewId: VIEW }];

if (singleSize <= 12000) {
  steps.push({
    action: 'cdp',
    method: 'Runtime.evaluate',
    params: singleParams,
    viewId: VIEW,
  });
} else {
  execSync(`node ${path.join(__dirname, 'prepare-session-chunks.mjs')} ${index}`, { stdio: 'pipe' });
  const dir = `/tmp/session-upload-${index}`;
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith('step-'))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  for (const f of files) {
    const j = JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'));
    steps.push({ action: 'cdp', ...j });
  }
}

steps.push({ action: 'append', index });
console.log(JSON.stringify({ index, singleSize, steps }));

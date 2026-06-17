#!/usr/bin/env node
/** Build JSONL queue of split-upload steps for pending indices. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const QUEUE = '/tmp/upload-queue.jsonl';
const STATE = '/tmp/upload-queue-state.json';

const pending = process.argv.slice(2).map(Number).filter((n) => !Number.isNaN(n));
if (!pending.length) {
  const p = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
  const done = new Set(p.uploaded);
  const m = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-manifest.json'), 'utf8'));
  for (let i = 0; i < m.length; i++) if (!done.has(i)) pending.push(i);
}

const lines = [];
for (const n of pending) {
  execSync(`node ${path.join(__dirname, 'prepare-split-index.mjs')} ${n}`, { stdio: 'pipe' });
  const outDir = `/tmp/split-${n}`;
  lines.push(JSON.stringify({ action: 'navigate', index: n, url: URL, viewId: VIEW }));
  lines.push(JSON.stringify({ action: 'sleep', index: n, ms: 9000 }));
  lines.push(JSON.stringify({ action: 'cdp', index: n, file: path.join(outDir, 'open.json') }));
  lines.push(JSON.stringify({ action: 'sleep', index: n, ms: 5000 }));
  lines.push(JSON.stringify({ action: 'cdp', index: n, file: path.join(outDir, 'fill.json') }));
  for (let s = 1; s <= 4; s++) {
    lines.push(JSON.stringify({ action: 'cdp', index: n, file: path.join(outDir, `pub-s${s}.json`) }));
    if (s < 4) lines.push(JSON.stringify({ action: 'sleep', index: n, ms: 2000 }));
  }
  lines.push(JSON.stringify({ action: 'append', index: n }));
}

fs.writeFileSync(QUEUE, lines.join('\n') + '\n');
fs.writeFileSync(STATE, JSON.stringify({ pos: 0, total: lines.length, pending }, null, 2));
console.log(JSON.stringify({ queue: QUEUE, steps: lines.length, indices: pending }));

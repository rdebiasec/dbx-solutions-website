#!/usr/bin/env node
/** Build flat MCP queue JSONL for remaining uploads. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const SKIP = new Set([81, 82, 83]);
const OUT = '/tmp/mcp-queue.jsonl';

const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
const done = new Set(progress.uploaded);
const pending = [];
for (let i = 0; i <= 83; i++) {
  if (SKIP.has(i)) continue;
  if (!done.has(i)) pending.push(i);
}

const lines = [];
for (const n of pending) {
  lines.push(JSON.stringify({ type: 'navigate', index: n, url: URL, viewId: VIEW }));
  lines.push(JSON.stringify({ type: 'sleep', ms: 10000, index: n }));
  const cdp = JSON.parse(
    execSync(`node ${path.join(__dirname, 'get-cdp-call.mjs')} ${n}`, {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    }),
  );
  const rawFile = `/tmp/cdp-raw-${n}.json`;
  const chunkOut = `/tmp/cdp-chunk-${n}.json`;
  fs.writeFileSync(rawFile, JSON.stringify(cdp));
  execSync(`node ${path.join(__dirname, 'cdp-chunk-from-json.mjs')} ${rawFile} cdp${n}_ ${chunkOut}`, {
    stdio: 'pipe',
  });
  const chunked = JSON.parse(fs.readFileSync(chunkOut, 'utf8'));
  chunked.stores.forEach((store, i) => {
    lines.push(JSON.stringify({ type: 'cdp', index: n, label: `store-${i}`, payload: store }));
  });
  lines.push(JSON.stringify({ type: 'cdp', index: n, label: 'run', payload: chunked.run }));
  lines.push(JSON.stringify({ type: 'append', index: n }));
}

fs.writeFileSync(OUT, lines.join('\n') + '\n');
fs.writeFileSync('/tmp/mcp-queue-state.json', JSON.stringify({ pos: 0, total: lines.length, pending }, null, 2));
console.log(JSON.stringify({ out: OUT, steps: lines.length, pending }));

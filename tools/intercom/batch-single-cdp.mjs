#!/usr/bin/env node
/**
 * Batch-prepare single CDP payloads for pending indices.
 * Usage: node batch-single-cdp.mjs [start] [end]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const start = Number(process.argv[2] ?? 33);
const end = Number(process.argv[3] ?? 80);
const progress = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'),
);
const uploaded = new Set(progress.uploaded);
const outDir = '/tmp/single-cdp';
fs.mkdirSync(outDir, { recursive: true });
const single = [];
const chunked = [];
for (let n = start; n <= end; n++) {
  if (uploaded.has(n)) continue;
  const expr = fs.readFileSync(`/tmp/intercom-upload/combined/${n}.expr`, 'utf8').trim();
  const params = { expression: expr, awaitPromise: true, returnByValue: true };
  const size = JSON.stringify(params).length;
  if (size <= 12000) {
    fs.writeFileSync(
      `${outDir}/${n}.json`,
      JSON.stringify({ method: 'Runtime.evaluate', params, viewId: VIEW }),
    );
    single.push(n);
  } else {
    chunked.push(n);
  }
}
console.log(JSON.stringify({ single, chunked }));

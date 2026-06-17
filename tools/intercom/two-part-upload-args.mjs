#!/usr/bin/env node
/**
 * Upload one index via 2-part fragmented CDP (writes args files for MCP).
 * Usage: node two-part-upload-args.mjs N
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const n = Number(process.argv[2]);

execSync(`node ${path.join(__dirname, 'run-upload-index.mjs')} ${n}`, { stdio: 'pipe' });
const out = `/tmp/two-part-${n}`;
fs.mkdirSync(out, { recursive: true });

for (let part = 0; part < 2; part++) {
  const payload = JSON.parse(fs.readFileSync(`/tmp/upload-${n}/direct-split/part-${part}.json`, 'utf8'));
  const args = {
    method: payload.method,
    params: payload.params,
    viewId: VIEW,
  };
  if (part === 1) args.params.awaitPromise = true;
  fs.writeFileSync(`${out}/part-${part}.json`, JSON.stringify(args));
}
console.log(JSON.stringify({ index: n, dir: out }));

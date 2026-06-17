#!/usr/bin/env node
/** Next pending index for single-expr bulk upload */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const queue = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-pending-queue.json'), 'utf8'));
const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
const pending = queue.pending.filter((n) => !progress.uploaded.includes(n));
const n = pending[0];
if (n === undefined) {
  console.log(JSON.stringify({ done: true, uploaded: progress.uploaded.length }));
  process.exit(0);
}
const pad = String(n).padStart(3, '0');
const exprFile = path.join(__dirname, '.expr-cache', `${pad}.expr`);
if (!fs.existsSync(exprFile)) {
  console.log(JSON.stringify({ error: 'missing expr', index: n }));
  process.exit(1);
}
const { execSync } = await import('child_process');
execSync(`node ${path.join(__dirname, 'batch-cdp-payload.mjs')} ${n} > /tmp/cdp-payload-${n}.json`);
const payload = JSON.parse(fs.readFileSync(`/tmp/cdp-payload-${n}.json`, 'utf8'));
const item = JSON.parse(execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${n}`, { encoding: 'utf8' }));
console.log(JSON.stringify({ index: n, title: item.title, exprLen: payload.expression.length, remaining: pending.length }));

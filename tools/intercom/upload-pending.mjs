#!/usr/bin/env node
/**
 * Batch upload driver: reads combined expr, prints compact status.
 * Agent loop: for i in pending; navigate; cdp evaluate $(node print-combined-expr.mjs $i); append-progress $i
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
const start = Number(process.argv[2] ?? 4);
const end = Number(process.argv[3] ?? 80);
const failuresFile = path.join(__dirname, 'upload-failures.json');

let failures = [];
if (fs.existsSync(failuresFile)) failures = JSON.parse(fs.readFileSync(failuresFile, 'utf8'));

const pending = [];
for (let i = start; i <= end; i++) {
  if (!progress.uploaded.includes(i)) pending.push(i);
}
console.log(JSON.stringify({ pending, uploadedCount: progress.uploaded.length }));

#!/usr/bin/env node
/**
 * Upload one index via batched session CDP files.
 * Prints each step JSON path; agent runs browser_cdp sequentially.
 * Usage: node upload-batched-index.mjs <N> [--list-only]
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const listOnly = process.argv.includes('--list-only');

execSync(`node ${path.join(__dirname, 'emit-session-batched.mjs')} ${n}`, { stdio: 'pipe' });
const dir = `/tmp/upload-batch-${n}`;
const files = fs.readdirSync(dir).sort((a, b) => {
  if (a === 'run.json') return 1;
  if (b === 'run.json') return -1;
  return a.localeCompare(b, undefined, { numeric: true });
});
const steps = files.map((f) => path.join(dir, f));
if (listOnly) {
  console.log(JSON.stringify({ index: n, steps }));
} else {
  console.log(JSON.stringify({ index: n, steps, count: steps.length }));
}

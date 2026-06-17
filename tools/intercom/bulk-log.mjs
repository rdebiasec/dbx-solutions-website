#!/usr/bin/env node
/**
 * Log bulk upload result and return next index.
 * Usage: node bulk-log.mjs <index> '<result-json>'
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const log = '/tmp/bulk-upload-log.jsonl';
const n = Number(process.argv[2]);
const result = JSON.parse(process.argv[3] || '{}');
const ok = result?.ok === true;
const line = { index: n, ok, title: result?.title || result?.fill?.title, at: new Date().toISOString(), err: ok ? null : result };
fs.appendFileSync(log, JSON.stringify(line) + '\n');
if (ok) execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { stdio: 'pipe' });
const next = execSync(`node ${path.join(__dirname, 'next-bulk-upload.mjs')}`, { encoding: 'utf8' }).trim();
console.log(next);

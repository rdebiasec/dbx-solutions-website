#!/usr/bin/env node
/**
 * Print one-line upload workflow instructions for agent/browser CDP loop.
 * Usage: node upload-batch-print.mjs 2 10
 * Outputs JSON array of {index, fillExprFile, steps} for indices start..end
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const start = Number(process.argv[2] ?? 0);
const end = Number(process.argv[3] ?? start);
const outDir = path.join(__dirname, 'cdp-b64');
fs.mkdirSync(outDir, { recursive: true });

const batch = [];
for (let i = start; i <= end; i++) {
  const file = path.join(outDir, `${String(i).padStart(3, '0')}.txt`);
  const expr = execSync(`node ${path.join(__dirname, 'emit-fill-b64.mjs')} ${i}`, { encoding: 'utf8' });
  fs.writeFileSync(file, expr);
  batch.push({ index: i, fillExprFile: file, fillExprLen: expr.length });
}
console.log(JSON.stringify(batch, null, 2));

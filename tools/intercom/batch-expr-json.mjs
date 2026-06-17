#!/usr/bin/env node
/**
 * Print JSON {index, expr} for indices start..end (inclusive).
 * Agent passes expr to browser_cdp Runtime.evaluate with awaitPromise:true, returnByValue:true.
 */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const start = Number(process.argv[2]);
const end = Number(process.argv[3] ?? start);

const items = [];
for (let i = start; i <= end; i++) {
  const expr = execSync(`node ${path.join(__dirname, 'get-upload-expr.mjs')} ${i}`, {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  items.push({ index: i, exprLen: expr.length, expr });
}
process.stdout.write(JSON.stringify(items));

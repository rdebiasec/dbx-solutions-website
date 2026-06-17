#!/usr/bin/env node
/** Build compact b64-wrapped CDP params for index N. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const params = JSON.parse(
  execSync(`node ${path.join(__dirname, 'batch-cdp-payload.mjs')} ${n}`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  }),
);
const b64 = Buffer.from(params.expression, 'utf8').toString('base64');
const compact = {
  expression: `(async()=>{return await eval(atob(${JSON.stringify(b64)}));})()`,
  awaitPromise: true,
  returnByValue: true,
};
const out = `/tmp/cdp-compact-${String(n).padStart(3, '0')}.json`;
fs.writeFileSync(out, JSON.stringify(compact));
console.log(JSON.stringify({ index: n, out, len: compact.expression.length }));

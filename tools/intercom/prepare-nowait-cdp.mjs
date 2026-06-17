#!/usr/bin/env node
/** Prepare no-wait batch CDP args for index N. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const params = JSON.parse(
  execSync(`node ${path.join(__dirname, 'batch-cdp-payload.mjs')} ${n}`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  }),
);
let expr = params.expression;
expr = expr.replace(
  /^\(async \(\) => \{ await new Promise\(\(resolve, reject\) => \{[\s\S]*?\}\);\s*/,
  '(async () => { ',
);
const out = {
  method: 'Runtime.evaluate',
  params: { expression: expr, awaitPromise: true, returnByValue: true },
  viewId: VIEW,
};
const f = `/tmp/cdp-nowait-${n}.json`;
fs.writeFileSync(f, JSON.stringify(out));
console.log(f);

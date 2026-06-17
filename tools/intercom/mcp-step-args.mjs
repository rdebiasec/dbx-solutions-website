#!/usr/bin/env node
/** Print MCP browser_cdp arguments JSON for run-upload step. */
import fs from 'fs';
const n = Number(process.argv[2]);
const step = Number(process.argv[3]);
const expr = fs.readFileSync(`/tmp/run-upload-${n}/expr-${step}.txt`, 'utf8');
const awaitPromise = expr.includes('eval(atob') || expr.includes('await ');
const params = { expression: expr, returnByValue: true };
if (awaitPromise) params.awaitPromise = true;
console.log(
  JSON.stringify({
    method: 'Runtime.evaluate',
    params,
    viewId: 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c',
  }),
);

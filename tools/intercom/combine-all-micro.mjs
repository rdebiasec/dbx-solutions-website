#!/usr/bin/env node
/** Combine ALL micro steps for index N into one Runtime.evaluate. */
import fs from 'fs';

const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const n = Number(process.argv[2]);
const lines = fs.readFileSync(`/tmp/micro-upload-${n}/steps.jsonl`, 'utf8').trim().split('\n');
const exprs = lines.map((l) => JSON.parse(l).params.expression);
const hasAwait = lines.some((l) => JSON.parse(l).params.awaitPromise);
const runner = `(async()=>{let r;${exprs.map((e) => `r=(${e});`).join('')}return r;})()`;
const payload = {
  method: 'Runtime.evaluate',
  params: { expression: runner, returnByValue: true, ...(hasAwait ? { awaitPromise: true } : {}) },
  viewId: VIEW,
};
const out = `/tmp/micro-all-${n}.json`;
fs.writeFileSync(out, JSON.stringify(payload));
console.log(JSON.stringify({ index: n, steps: lines.length, bytes: JSON.stringify(payload).length, out, hasAwait }));

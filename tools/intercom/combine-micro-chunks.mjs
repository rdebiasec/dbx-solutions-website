#!/usr/bin/env node
/** Split micro steps into size-limited combined chunks for large indices. */
import fs from 'fs';

const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const n = Number(process.argv[2]);
const maxBytes = Number(process.argv[3] || 12000);
const lines = fs.readFileSync(`/tmp/micro-upload-${n}/steps.jsonl`, 'utf8').trim().split('\n');
const outDir = `/tmp/micro-chunks-${n}`;
fs.mkdirSync(outDir, { recursive: true });

const chunks = [];
let batch = [];
let batchExprs = [];

function flush() {
  if (!batch.length) return;
  const hasAwait = batch.some((l) => JSON.parse(l).params.awaitPromise);
  const exprs = batch.map((l) => JSON.parse(l).params.expression);
  const runner = `(async()=>{let r;${exprs.map((e) => `r=(${e});`).join('')}return r;})()`;
  const payload = {
    method: 'Runtime.evaluate',
    params: { expression: runner, returnByValue: true, ...(hasAwait ? { awaitPromise: true } : {}) },
    viewId: VIEW,
  };
  const bytes = JSON.stringify(payload).length;
  const file = `${outDir}/chunk-${chunks.length}.json`;
  fs.writeFileSync(file, JSON.stringify(payload));
  chunks.push({ file, steps: batch.length, bytes, start: chunks.reduce((a, c) => a + c.steps, 0) });
  batch = [];
}

for (const line of lines) {
  batch.push(line);
  const exprs = batch.map((l) => JSON.parse(l).params.expression);
  const runner = `(async()=>{let r;${exprs.map((e) => `r=(${e});`).join('')}return r;})()`;
  const payload = {
    method: 'Runtime.evaluate',
    params: { expression: runner, returnByValue: true },
    viewId: VIEW,
  };
  if (JSON.stringify(payload).length > maxBytes) {
    batch.pop();
    flush();
    batch.push(line);
  }
}
flush();

console.log(JSON.stringify({ index: n, chunks: chunks.length, totalSteps: lines.length, files: chunks.map((c) => c.file) }));

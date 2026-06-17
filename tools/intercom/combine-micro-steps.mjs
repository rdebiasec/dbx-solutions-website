#!/usr/bin/env node
/** Combine micro steps into one sequential Runtime.evaluate expression per part. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const n = Number(process.argv[2]);
const outDir = `/tmp/micro-combined-${n}`;
fs.mkdirSync(outDir, { recursive: true });

const manifest = JSON.parse(fs.readFileSync(`/tmp/upload-${n}/manifest.json`, 'utf8'));

function numSort(files) {
  return files
    .filter((f) => f.startsWith('micro-') && f.endsWith('.json'))
    .sort((a, b) => Number(a.match(/micro-(\d+)/)[1]) - Number(b.match(/micro-(\d+)/)[1]));
}

const combined = [];
for (const step of manifest.steps) {
  const partDir = `/tmp/micro-upload-${n}/part-${step.part}`;
  const exprs = numSort(fs.readdirSync(partDir)).map((f) => {
    const p = JSON.parse(fs.readFileSync(`${partDir}/${f}`, 'utf8'));
    return p.params.expression;
  });
  const runner = `(async()=>{let r;${exprs.map((e, i) => `r=(${e});`).join('')}return r;})()`;
  const payload = {
    method: 'Runtime.evaluate',
    params: {
      expression: runner,
      returnByValue: true,
      awaitPromise: true,
    },
    viewId: VIEW,
  };
  const file = `${outDir}/part-${step.part}.json`;
  fs.writeFileSync(file, JSON.stringify(payload));
  combined.push({ part: step.part, file, bytes: JSON.stringify(payload).length });
}
console.log(JSON.stringify({ index: n, parts: combined.length, combined }));

#!/usr/bin/env node
/** Merge session chunk steps into ≤12KB CDP groups + final step. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const runDir = `/tmp/run-upload-${n}`;
if (!fs.existsSync(`${runDir}/expr-0.txt`)) {
  execSync(`node ${path.join(__dirname, 'prepare-run-upload.mjs')} ${n}`, { stdio: 'pipe' });
}
const exprs = [];
for (let i = 1; ; i++) {
  const f = `${runDir}/expr-${i}.txt`;
  if (!fs.existsSync(f)) break;
  if (i < 16) exprs.push(fs.readFileSync(f, 'utf8'));
}
const final = fs.readFileSync(`${runDir}/expr-16.txt`, 'utf8');
const outDir = `/tmp/merged-upload-${n}`;
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  `${outDir}/00-clear.json`,
  JSON.stringify({
    method: 'Runtime.evaluate',
    params: {
      expression: fs.readFileSync(`${runDir}/expr-0.txt`, 'utf8'),
      returnByValue: true,
    },
    viewId: VIEW,
  }),
);
const groups = [];
let cur = [];
let curSize = 0;
for (const e of exprs) {
  const sz = JSON.stringify({ expression: e, returnByValue: true }).length;
  if (curSize + sz > 11000 && cur.length) {
    groups.push(cur);
    cur = [];
    curSize = 0;
  }
  cur.push(e);
  curSize += sz;
}
if (cur.length) groups.push(cur);
groups.forEach((g, i) => {
  const combined = g.join(';');
  fs.writeFileSync(
    `${outDir}/${String(i + 1).padStart(2, '0')}-group.json`,
    JSON.stringify({
      method: 'Runtime.evaluate',
      params: { expression: combined, returnByValue: true },
      viewId: VIEW,
    }),
  );
});
fs.writeFileSync(
  `${outDir}/99-final.json`,
  JSON.stringify({
    method: 'Runtime.evaluate',
    params: { expression: final, awaitPromise: true, returnByValue: true },
    viewId: VIEW,
  }),
);
console.log(JSON.stringify({ index: n, groups: groups.length, outDir }));

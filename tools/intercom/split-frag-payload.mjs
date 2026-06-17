#!/usr/bin/env node
/** Split fragment CDP payload into N sequential loader calls under maxLen each. */
import fs from 'fs';

const inFile = process.argv[2];
const outDir = process.argv[3];
const maxLen = Number(process.argv[4] || 2800);
const payload = JSON.parse(fs.readFileSync(inFile, 'utf8'));
const expr = payload.params.expression;
const m = expr.match(/^\(\(\) => \{ const p = (\[[\s\S]*\]); return \(0, eval\)\(p\.join\(''\)\); \}\)\(\)$/);
if (!m) throw new Error('unexpected fragment shape');
const parts = JSON.parse(m[1]);
fs.mkdirSync(outDir, { recursive: true });

const chunks = [];
let cur = [];
let curLen = 0;
for (const part of parts) {
  const test = cur.concat(part);
  const init = `(() => { window.__fp=${JSON.stringify(test)}; return {ok:true,n:${test.length}}; })()`;
  if (JSON.stringify({ method: 'Runtime.evaluate', params: { expression: init, returnByValue: true } }).length > maxLen && cur.length) {
    chunks.push(cur);
    cur = [part];
  } else {
    cur = test;
  }
}
if (cur.length) chunks.push(cur);

const files = [];
chunks.forEach((slice, i) => {
  const isLast = i === chunks.length - 1;
  const loader = isLast
    ? `(() => { window.__fp=(window.__fp||[]).concat(${JSON.stringify(slice)}); const src=window.__fp.join(''); delete window.__fp; return (0,eval)(src); })()`
    : `(() => { window.__fp=(window.__fp||[]).concat(${JSON.stringify(slice)}); return {ok:true,step:${i},n:window.__fp.length}; })()`;
  const out = {
    method: payload.method,
    params: {
      expression: loader,
      returnByValue: true,
      ...(isLast && payload.params.awaitPromise ? { awaitPromise: true } : {}),
    },
  };
  const f = `${outDir}/part-${i}.json`;
  fs.writeFileSync(f, JSON.stringify(out));
  files.push({ file: f, len: JSON.stringify(out).length });
});
console.log(JSON.stringify({ parts: chunks.length, files }));

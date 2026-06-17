#!/usr/bin/env node
/**
 * Prepare small CDP steps using sessionStorage for large combined expr uploads.
 * Usage: node prepare-session-chunks.mjs <index>
 */
import fs from 'fs';

const index = Number(process.argv[2]);
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const combined = `/tmp/intercom-upload/combined/${index}.expr`;
const outDir = `/tmp/session-upload-${index}`;

const expr = fs.readFileSync(combined, 'utf8').trim();
const m = expr.match(/atob\("([^"]+)"\)/);
if (!m) {
  console.error(JSON.stringify({ error: 'no b64 in combined expr' }));
  process.exit(1);
}
const b64 = m[1];
const size = 1500;
const chunks = [];
for (let i = 0; i < b64.length; i += size) chunks.push(b64.slice(i, i + size));

fs.mkdirSync(outDir, { recursive: true });
const steps = [
  {
    method: 'Runtime.evaluate',
    params: {
      expression: `sessionStorage.clear();window.__uploadKeys=${chunks.length};({ok:true,chunks:${chunks.length}})`,
      returnByValue: true,
    },
    viewId: VIEW,
  },
  ...chunks.map((ch, i) => ({
    method: 'Runtime.evaluate',
    params: {
      expression: `sessionStorage.setItem('u${i}',${JSON.stringify(ch)});({ok:true,i:${i}})`,
      returnByValue: true,
    },
    viewId: VIEW,
  })),
  {
    method: 'Runtime.evaluate',
    params: {
      expression: `(async () => {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    if (document.querySelector('textarea[placeholder="Untitled public article"]')) break;
    await new Promise(r => setTimeout(r, 200));
  }
  if (!document.querySelector('textarea[placeholder="Untitled public article"]')) return { ok: false, phase: 'poll' };
  let b64 = '';
  for (let i = 0; i < window.__uploadKeys; i++) b64 += sessionStorage.getItem('u' + i);
  return await eval(atob(b64));
})()`,
      awaitPromise: true,
      returnByValue: true,
    },
    viewId: VIEW,
  },
];

steps.forEach((s, i) => fs.writeFileSync(`${outDir}/step-${i}.json`, JSON.stringify(s)));
console.log(JSON.stringify({ index, outDir, steps: steps.length, b64Len: b64.length }));

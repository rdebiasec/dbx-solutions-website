#!/usr/bin/env node
/** Emit sessionStorage chunk stores + single run eval for large upload expr. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const prefix = `ic${n}_`;
const exprFile = `/tmp/intercom-expr-${n}.json`;
if (!fs.existsSync(exprFile)) {
  execSync(`node ${path.join(__dirname, 'agent-upload-runner.mjs')} ${n}`, { stdio: 'inherit' });
}
const expr = JSON.parse(fs.readFileSync(exprFile, 'utf8')).cdp.params.expression;
const b64 = Buffer.from(expr, 'utf8').toString('base64');
const chunk = 3000;
const parts = [];
for (let i = 0; i < b64.length; i += chunk) parts.push(b64.slice(i, i + chunk));
const stores = parts.map((p, i) => {
  const key = `${prefix}${i}`;
  return `(() => { sessionStorage.setItem(${JSON.stringify(key)}, ${JSON.stringify(p)}); return {ok:true,key:${JSON.stringify(key)},len:${p.length}}; })()`;
});
const keys = parts.map((_, i) => `${prefix}${i}`);
const runExpr = `(async () => { const b64 = ${JSON.stringify(keys)}.map(k => sessionStorage.getItem(k)).join(''); const src = atob(b64); return await (0, eval)(src); })()`;
process.stdout.write(JSON.stringify({ stores, runExpr, exprLen: expr.length, partCount: parts.length }, null, 2));

#!/usr/bin/env node
/** Single CDP call: set all session chunks + eval (for articles under size limit). */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const maxExpr = Number(process.argv[3] || 14000);
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

execSync(`node ${path.join(__dirname, 'prepare-session-small.mjs')} ${n}`, { stdio: 'pipe' });
const dir = `/tmp/session-mcp-${n}`;
const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
if (meta.exprLen > maxExpr) {
  console.log(JSON.stringify({ index: n, single: false, exprLen: meta.exprLen, use: 'emit-session-batched.mjs' }));
  process.exit(0);
}

const stores = fs.readdirSync(dir).filter((f) => f.startsWith('store-')).sort();
const items = stores.map((f) => {
  const expr = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).params.expression;
  const m = expr.match(/setItem\(([^,]+),\s*([^)]+)\)/);
  return { key: JSON.parse(m[1]), value: JSON.parse(m[2]) };
});
const keys = items.map((i) => i.key);
const expression = `(async () => { const items = ${JSON.stringify(items)}; for (const {key,value} of items) sessionStorage.setItem(key,value); const b64 = ${JSON.stringify(keys)}.map(k => sessionStorage.getItem(k)).join(''); const src = atob(b64); return await (0, eval)(src); })()`;
const out = {
  method: 'Runtime.evaluate',
  params: { expression, awaitPromise: true, returnByValue: true },
  viewId: VIEW,
};
const outFile = `/tmp/upload-single-${n}.json`;
fs.writeFileSync(outFile, JSON.stringify(out));
console.log(JSON.stringify({ index: n, single: true, outFile, exprLen: meta.exprLen, payloadLen: JSON.stringify(out).length }));

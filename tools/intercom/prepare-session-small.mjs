#!/usr/bin/env node
/** Emit sessionStorage stores with smaller chunks (default 800) to avoid MCP copy corruption. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const chunk = Number(process.argv[3] || 800);
const prefix = `ic${n}_`;
const exprFile = `/tmp/intercom-expr-${n}.json`;
if (!fs.existsSync(exprFile)) {
  execSync(`node ${path.join(__dirname, 'agent-upload-runner.mjs')} ${n}`, { stdio: 'inherit' });
}
const expr = JSON.parse(fs.readFileSync(exprFile, 'utf8')).cdp.params.expression;
const b64 = Buffer.from(expr, 'utf8').toString('base64');
const parts = [];
for (let i = 0; i < b64.length; i += chunk) parts.push(b64.slice(i, i + chunk));
const stores = parts.map((p, i) => {
  const key = `${prefix}${i}`;
  return `(() => { sessionStorage.setItem(${JSON.stringify(key)}, ${JSON.stringify(p)}); return {ok:true,key:${JSON.stringify(key)},len:${p.length}}; })()`;
});
const keys = parts.map((_, i) => `${prefix}${i}`);
const runExpr = `(async () => { const b64 = ${JSON.stringify(keys)}.map(k => sessionStorage.getItem(k)).join(''); const src = atob(b64); return await (0, eval)(src); })()`;
const outDir = `/tmp/session-mcp-${n}`;
fs.mkdirSync(outDir, { recursive: true });
for (let i = 0; i < stores.length; i++) {
  fs.writeFileSync(
    path.join(outDir, `store-${i}.json`),
    JSON.stringify({
      method: 'Runtime.evaluate',
      params: { expression: stores[i], returnByValue: true },
    }),
  );
}
fs.writeFileSync(
  path.join(outDir, 'run.json'),
  JSON.stringify({
    method: 'Runtime.evaluate',
    params: { expression: runExpr, awaitPromise: true, returnByValue: true },
  }),
);
fs.writeFileSync(
  path.join(outDir, 'meta.json'),
  JSON.stringify({ index: n, partCount: parts.length, exprLen: expr.length, chunk }),
);
process.stdout.write(JSON.stringify({ index: n, stores: stores.length, chunk, exprLen: expr.length }));

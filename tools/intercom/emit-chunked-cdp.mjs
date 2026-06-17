#!/usr/bin/env node
/** Emit chunk injection CDP expressions for large fill payloads. */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const fillExpr = execSync(`node ${path.join(__dirname, 'emit-desc-body-b64.mjs')} ${index}`, {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
});
const chunkSize = 3500;
const chunks = [];
for (let i = 0; i < fillExpr.length; i += chunkSize) {
  chunks.push(fillExpr.slice(i, i + chunkSize));
}
const init = `window.__fillExpr='';`;
const injects = chunks.map(
  (c, i) => `window.__fillExpr+='${c.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}';`,
);
const run = `(() => { const code = window.__fillExpr; return (0, eval)(code); })()`;
console.log(
  JSON.stringify({
    init,
    injects,
    run,
    chunks: chunks.length,
    total: fillExpr.length,
  }),
);

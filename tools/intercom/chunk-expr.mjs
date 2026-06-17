#!/usr/bin/env node
/** Chunk any expression string for incremental window.__fillExpr CDP injection. */
import fs from 'fs';

const expr = fs.readFileSync(0, 'utf8');
const chunkSize = 3200;
const chunks = [];
for (let i = 0; i < expr.length; i += chunkSize) {
  chunks.push(expr.slice(i, i + chunkSize));
}
const init = `window.__fillExpr='';`;
const injects = chunks.map(
  (c) => `window.__fillExpr+='${c.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}';`,
);
const run = `(async () => { return await (0, eval)(window.__fillExpr); })()`;
console.log(JSON.stringify({ init, injects, run, chunks: chunks.length, total: expr.length }));

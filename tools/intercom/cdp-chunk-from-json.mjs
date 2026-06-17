#!/usr/bin/env node
/** Chunk a CDP JSON file into sessionStorage store steps + run step. */
import fs from 'fs';

const file = process.argv[2];
const prefix = process.argv[3] || 'cdp_';
const cdp = JSON.parse(fs.readFileSync(file, 'utf8'));
const expr = cdp.params.expression;
const b64 = Buffer.from(expr, 'utf8').toString('base64');
const chunk = 3000;
const parts = [];
for (let i = 0; i < b64.length; i += chunk) parts.push(b64.slice(i, i + chunk));
const stores = parts.map((p, i) => ({
  method: 'Runtime.evaluate',
  params: {
    expression:
      '(() => { sessionStorage.setItem(' +
      JSON.stringify(prefix + i) +
      ', ' +
      JSON.stringify(p) +
      '); return {ok:true,i:' +
      i +
      '}; })()',
    returnByValue: true,
  },
  viewId: cdp.viewId,
}));
const keys = parts.map((_, i) => prefix + i);
const runExpr =
  '(async()=>{const b64=' +
  JSON.stringify(keys) +
  '.map(k=>sessionStorage.getItem(k)).join("");return await (0,eval)(atob(b64));})()';
const run = {
  method: 'Runtime.evaluate',
  params: { expression: runExpr, awaitPromise: true, returnByValue: true },
  viewId: cdp.viewId,
};
const out = process.argv[4] || '/tmp/cdp-chunked-out.json';
fs.writeFileSync(out, JSON.stringify({ stores, run, partCount: parts.length }));
console.log(JSON.stringify({ out, partCount: parts.length, prefix }));

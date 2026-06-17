#!/usr/bin/env node
/** Generate fill-only CDP payload for index N (no publish wizard). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const out = process.argv[3] || `/tmp/cdp-fill-only-${n}.json`;

let expr = fs.readFileSync(path.join(__dirname, '.expr-cache', `${String(n).padStart(3, '0')}.expr`), 'utf8').trim();
const WAIT = `await new Promise((resolve, reject) => { const start = Date.now(); const check = () => { const t = document.querySelector('textarea[placeholder="Untitled public article"]'); const b = document.querySelector('[role="textbox"]'); if (t && b) resolve(true); else if (Date.now() - start > 25000) reject(new Error('editor timeout')); else setTimeout(check, 300); }; check(); });`;
if (expr.startsWith('(async () => {')) {
  expr = expr.replace('(async () => {', `(async () => { ${WAIT}`);
} else {
  expr = `(async () => { ${WAIT} ${expr} })()`;
}
expr = expr.replace(/if \(!fill\?\.ok\)[\s\S]*/, 'return fill; })()');

const payload = { expression: expr, awaitPromise: true, returnByValue: true };
fs.writeFileSync(out, JSON.stringify(payload));
console.log(JSON.stringify({ index: n, out, exprLen: expr.length }));

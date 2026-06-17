#!/usr/bin/env node
/** Print CDP payload JSON for index N with editor wait prepended. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const pad = String(n).padStart(3, '0');
let expr = fs.readFileSync(path.join(__dirname, '.expr-cache', `${pad}.expr`), 'utf8').trim();
// Prefer explicit unlisted radio — generic /unlisted/ matched Help Center option first.
expr = expr.replace(
  /clickRadio\(\/unlisted public article\/i\)/g,
  "(() => { const r = [...document.querySelectorAll('[role=\"radio\"]')].find(e => /As an unlisted public article/i.test(e.getAttribute('aria-label')||e.textContent||'')); if (r) { r.click(); return {ok:true}; } return clickRadio(/As an unlisted public article/i); })()",
);
const WAIT = `await new Promise((resolve, reject) => { const start = Date.now(); const check = () => { const t = document.querySelector('textarea[placeholder="Untitled public article"]'); const b = document.querySelector('[role="textbox"]'); if (t && b) resolve(true); else if (Date.now() - start > 25000) reject(new Error('editor timeout')); else setTimeout(check, 300); }; check(); });`;
if (expr.startsWith('(async () => {')) {
  expr = expr.replace('(async () => {', `(async () => { ${WAIT}`);
} else {
  expr = `(async () => { ${WAIT} ${expr} })()`;
}
process.stdout.write(
  JSON.stringify({
    expression: expr,
    awaitPromise: true,
    returnByValue: true,
  }),
);

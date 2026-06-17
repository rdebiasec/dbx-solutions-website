#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const fillFn = fs.readFileSync(path.join(__dirname, 'cdp-fill-fn.js'), 'utf8').trim();
const b64 = fs.readFileSync(
  path.join(__dirname, 'cdp-b64', `${String(n).padStart(3, '0')}.txt`),
  'utf8',
).trim();
const publish = fs.readFileSync(path.join(__dirname, 'cdp-publish.js'), 'utf8').trim();

const expr = `(async () => {
  await new Promise((r) => setTimeout(r, 2500));
  await new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (document.querySelector('textarea[placeholder="Untitled public article"]')) resolve(true);
      else if (Date.now() - start > 15000) reject(new Error('timeout waiting for editor'));
      else setTimeout(check, 200);
    };
    check();
  });
  ${fillFn}
  const fill = ${b64};
  const publish = ${publish};
  return { fill, publish };
})()`;

process.stdout.write(expr);

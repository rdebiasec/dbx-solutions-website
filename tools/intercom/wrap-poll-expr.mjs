#!/usr/bin/env node
/** Wrap .expr-cache/N.expr with editor poll wait for reliable CDP execution. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const pad = String(n).padStart(3, '0');
const expr = fs.readFileSync(path.join(__dirname, '.expr-cache', `${pad}.expr`), 'utf8').trim();

const wrapped = `(async () => {
  await new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (document.querySelector('textarea[placeholder="Untitled public article"]')) resolve(true);
      else if (Date.now() - start > 15000) reject(new Error('timeout waiting for editor'));
      else setTimeout(check, 200);
    };
    check();
  });
  return await ${expr};
})()`;

process.stdout.write(wrapped);

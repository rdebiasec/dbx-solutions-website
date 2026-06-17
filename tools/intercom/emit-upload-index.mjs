#!/usr/bin/env node
/** Single CDP expression: inject fill fn, fill article N, publish unlisted. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
if (!Number.isInteger(index) || index < 0) {
  console.error('Usage: node emit-upload-index.mjs <index>');
  process.exit(1);
}

const fillFn = fs.readFileSync(path.join(__dirname, 'cdp-fill-fn.js'), 'utf8');
const fillExpr = fs.readFileSync(path.join(__dirname, 'cdp-b64', `${String(index).padStart(3, '0')}.txt`), 'utf8').trim();
const publishFn = fs.readFileSync(path.join(__dirname, 'cdp-publish-full.js'), 'utf8').trim();

const combined = `(async () => {
  ${fillFn}
  const fill = ${fillExpr};
  if (!fill?.ok) return { ok: false, phase: 'fill', fill };
  await new Promise((r) => setTimeout(r, 400));
  const pub = await ${publishFn};
  await new Promise((r) => setTimeout(r, 1200));
  const title = document.querySelector('textarea[placeholder="Untitled public article"]')?.value
    || document.querySelector('h1')?.textContent?.trim();
  return { ok: pub?.ok !== false, phase: 'publish', fill, pub, title };
})()`;

process.stdout.write(combined);

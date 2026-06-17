#!/usr/bin/env node
/** Single combined CDP expression for body fill (inject fn + pushes + fill). */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const out = process.argv[3] || '-';

const item = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${index}`, { encoding: 'utf8' }),
);
if (item.skip) {
  const msg = JSON.stringify({ index, skip: true });
  if (out === '-') process.stdout.write(msg);
  else fs.writeFileSync(out, msg);
  process.exit(0);
}

const fillFn = fs.readFileSync(path.join(__dirname, 'cdp-fill-body-only-fn.js'), 'utf8').replace(/\n/g, ' ');
const content = item.content;
const chunkSize = 800;
const chunks = [];
for (let i = 0; i < content.length; i += chunkSize) {
  chunks.push(content.slice(i, i + chunkSize));
}

const pushes = chunks.map((c) => `window.__bodyChunks.push(${JSON.stringify(c)});`).join(' ');
const expr = `${fillFn} window.__bodyChunks=[]; ${pushes} (() => { const data = { description: ${JSON.stringify(item.description)}, content: window.__bodyChunks.join('') }; return window.__intercomFillBody(data); })()`;

const payload = JSON.stringify({ index, title: item.title, expr, exprLen: expr.length });
if (out === '-') process.stdout.write(payload);
else fs.writeFileSync(out, payload);

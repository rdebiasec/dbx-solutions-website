#!/usr/bin/env node
/** One CDP expression: inject fill-body fn + fill desc/body for index N. */
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const fillFn = fs.readFileSync(path.join(__dirname, 'cdp-fill-body-only-fn.js'), 'utf8');
const item = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${index}`, { encoding: 'utf8' }),
);
const payload = JSON.stringify({ description: item.description, content: item.content });
const chunkSize = 2500;
const chunks = [];
for (let i = 0; i < payload.length; i += chunkSize) {
  chunks.push(payload.slice(i, i + chunkSize));
}

const expr = `(async () => { ${fillFn.replace(/\n/g, ' ')} const chunks = ${JSON.stringify(chunks)}; const data = JSON.parse(chunks.join('')); return window.__intercomFillBody(data); })()`;

process.stdout.write(expr);

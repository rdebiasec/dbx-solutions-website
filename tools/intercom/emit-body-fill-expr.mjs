#!/usr/bin/env node
/** Single CDP expression: fill body from JSON chunk array. */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const item = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${index}`, { encoding: 'utf8' }),
);
const payload = JSON.stringify({ description: item.description, content: item.content });
const chunkSize = 2500;
const chunks = [];
for (let i = 0; i < payload.length; i += chunkSize) {
  chunks.push(payload.slice(i, i + chunkSize));
}
const expr = `(() => { const chunks = ${JSON.stringify(chunks)}; const data = JSON.parse(chunks.join('')); return window.__intercomFillBody(data); })()`;
process.stdout.write(expr);

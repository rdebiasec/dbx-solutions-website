#!/usr/bin/env node
/**
 * Prepare CDP push expressions for one upload index.
 * Usage: node prepare-upload-index.mjs 15
 * Outputs JSON with title, pushExprs (array), fillExpr, publishExpr
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const item = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${index}`, { encoding: 'utf8' }),
);
if (item.skip) {
  console.log(JSON.stringify({ index, skip: true }));
  process.exit(0);
}

const fillFn = fs.readFileSync(path.join(__dirname, 'cdp-fill-body-only-fn.js'), 'utf8').replace(/\n/g, ' ');
const content = item.content;
const chunkSize = 800;
const chunks = [];
for (let i = 0; i < content.length; i += chunkSize) {
  chunks.push(content.slice(i, i + chunkSize));
}

const pushExprs = [
  'window.__bodyChunks=[];',
  ...chunks.map((c) => `window.__bodyChunks.push(${JSON.stringify(c)});`),
];
const fillExpr = `(() => { const data = { description: ${JSON.stringify(item.description)}, content: window.__bodyChunks.join('') }; return window.__intercomFillBody(data); })()`;

console.log(
  JSON.stringify({
    index,
    title: item.title,
    injectFillFn: fillFn,
    pushExprs,
    fillExpr,
    contentLen: content.length,
    pushCount: pushExprs.length,
  }),
);

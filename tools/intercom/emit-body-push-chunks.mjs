#!/usr/bin/env node
/** Small CDP push expressions for body content chunks. */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const item = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${index}`, { encoding: 'utf8' }),
);
const content = item.content;
const chunkSize = 800;
const chunks = [];
for (let i = 0; i < content.length; i += chunkSize) {
  chunks.push(content.slice(i, i + chunkSize));
}
const init = `window.__bodyChunks=[];`;
const pushes = chunks.map(
  (c, i) => `window.__bodyChunks.push(${JSON.stringify(c)});`,
);
const fill = `(() => {
  const data = { description: ${JSON.stringify(item.description)}, content: window.__bodyChunks.join('') };
  return window.__intercomFillBody(data);
})()`;
console.log(JSON.stringify({ init, pushes, fill, pushCount: pushes.length, contentLen: content.length }));

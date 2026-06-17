#!/usr/bin/env node
/** Fill+title only (no wait, no publish) — editor must already be open. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
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
const chunks = [];
for (let i = 0; i < item.content.length; i += 800) {
  chunks.push(item.content.slice(i, i + 800));
}
const pushes = chunks.map((c) => `window.__bodyChunks.push(${JSON.stringify(c)});`).join(' ');
const expr = `(async()=>{${fillFn} window.__bodyChunks=[]; ${pushes} const fillRes=window.__intercomFillBody({description:${JSON.stringify(item.description)}, content:window.__bodyChunks.join('')}); const titleEl=document.querySelector('textarea[placeholder="Untitled public article"]'); if(titleEl){titleEl.value=${JSON.stringify(item.title)}; titleEl.dispatchEvent(new Event('input',{bubbles:true})); titleEl.dispatchEvent(new Event('change',{bubbles:true}));} return {ok:fillRes.ok, index:${index}, title:${JSON.stringify(item.title)}, fillRes};})()`;
console.log(
  JSON.stringify({
    index,
    cdp: {
      method: 'Runtime.evaluate',
      params: { expression: expr, returnByValue: true, awaitPromise: true },
      viewId: 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c',
    },
  }),
);

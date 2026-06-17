#!/usr/bin/env node
/** Atomic wait+fill+title+publish CDP expression for one upload index. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const out = process.argv[3] || '-';
const publish = fs.readFileSync(path.join(__dirname, 'cdp-publish-full.js'), 'utf8').trim();
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
const chunks = [];
for (let i = 0; i < item.content.length; i += 800) {
  chunks.push(item.content.slice(i, i + 800));
}
const pushes = chunks.map((c) => `window.__bodyChunks.push(${JSON.stringify(c)});`).join(' ');
const expr = `(async()=>{const start=Date.now(); while(Date.now()-start<20000){if(document.querySelector('[role="textbox"]'))break; await new Promise(r=>setTimeout(r,200));} if(!document.querySelector('[role="textbox"]')) return {ok:false,err:'timeout'}; ${fillFn} window.__bodyChunks=[]; ${pushes} const fillRes=window.__intercomFillBody({description:${JSON.stringify(item.description)}, content:window.__bodyChunks.join('')}); const titleEl=document.querySelector('textarea[placeholder="Untitled public article"]'); if(titleEl){titleEl.value=${JSON.stringify(item.title)}; titleEl.dispatchEvent(new Event('input',{bubbles:true})); titleEl.dispatchEvent(new Event('change',{bubbles:true}));} if(!fillRes.ok) return {ok:false,phase:'fill',fillRes}; await new Promise(r=>setTimeout(r,300)); const pubRes=await (${publish}); return {ok:pubRes.ok, index:${index}, title:${JSON.stringify(item.title)}, fillRes, pubRes};})()`;

const payload = JSON.stringify({
  index,
  title: item.title,
  expr,
  exprLen: expr.length,
  cdp: { method: 'Runtime.evaluate', params: { expression: expr, returnByValue: true, awaitPromise: true } },
});
if (out === '-') process.stdout.write(payload);
else fs.writeFileSync(out, payload);

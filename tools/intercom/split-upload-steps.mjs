#!/usr/bin/env node
/** Emit split CDP steps for one index (fill + publish s1-s4) as JSON lines. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';

const n = Number(process.argv[2]);
const item = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${n}`, { encoding: 'utf8' }),
);
if (item.skip) {
  console.log(JSON.stringify({ step: 'skip', index: n }));
  process.exit(0);
}

const fillFn = fs.readFileSync(path.join(__dirname, 'cdp-fill-body-only-fn.js'), 'utf8').replace(/\n/g, ' ');
const chunks = [];
for (let i = 0; i < item.content.length; i += 800) {
  chunks.push(item.content.slice(i, i + 800));
}
const pushes = chunks.map((c) => `window.__bodyChunks.push(${JSON.stringify(c)});`).join(' ');
const fillExpr = `(async()=>{await new Promise((resolve,reject)=>{const start=Date.now();const check=()=>{if(document.querySelector('[role="textbox"]'))resolve(true);else if(Date.now()-start>20000)reject(new Error('timeout'));else setTimeout(check,200);};check();});${fillFn}window.__bodyChunks=[];${pushes}const fillRes=window.__intercomFillBody({description:${JSON.stringify(item.description)},content:window.__bodyChunks.join('')});const titleEl=document.querySelector('textarea[placeholder="Untitled public article"]');if(titleEl){titleEl.value=${JSON.stringify(item.title)};titleEl.dispatchEvent(new Event('input',{bubbles:true}));titleEl.dispatchEvent(new Event('change',{bubbles:true}));}await new Promise(r=>setTimeout(r,500));if(titleEl){titleEl.focus();titleEl.dispatchEvent(new Event('input',{bubbles:true}));titleEl.blur();}const bodyEl=document.querySelector('[role="textbox"]');if(bodyEl){bodyEl.dispatchEvent(new Event('input',{bubbles:true}));}await new Promise(r=>setTimeout(r,700));const pubBtn=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Publish');return{ok:fillRes.ok,fill:fillRes,title:${JSON.stringify(item.title)},publishDisabled:pubBtn?.disabled};})()`;

const pubSteps = ['cdp-publish-s1.js', 'cdp-publish-s2.js', 'cdp-publish-s3.js', 'cdp-publish-s4.js'].map(
  (f) => fs.readFileSync(path.join(__dirname, f), 'utf8').trim(),
);

const steps = [
  { step: 'navigate', index: n, viewId: VIEW_ID, url: URL },
  {
    step: 'evaluate',
    index: n,
    viewId: VIEW_ID,
    label: 'fill',
    method: 'Runtime.evaluate',
    params: { expression: fillExpr, awaitPromise: true, returnByValue: true },
  },
  ...pubSteps.map((expression, i) => ({
    step: 'evaluate',
    index: n,
    viewId: VIEW_ID,
    label: `publish-s${i + 1}`,
    method: 'Runtime.evaluate',
    params: { expression, awaitPromise: true, returnByValue: true },
  })),
  { step: 'advance', index: n },
];

for (const s of steps) console.log(JSON.stringify(s));

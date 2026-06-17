#!/usr/bin/env node
/** Prepare parts-based upload JSON for one index. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const item = JSON.parse(execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${n}`, { encoding: 'utf8' }));
const content = item.content;
const chunks = [];
for (let i = 0; i < content.length; i += 1500) chunks.push(content.slice(i, i + 1500));
const fillExpr = `(async()=>{const data={description:${JSON.stringify(item.description)},content:(window.__parts||[]).join('')}; const desc=document.querySelector('textarea[placeholder="Describe your article to help it get found"]'); const body=document.querySelector('[role="textbox"]'); if(!body) return {ok:false,err:'no body',index:${n}}; if(desc){desc.value=data.description; desc.dispatchEvent(new Event('input',{bubbles:true}));} body.focus(); body.innerHTML=''; for(const line of data.content.split('\\n')){const p=document.createElement('p'); p.textContent=line||' '; body.appendChild(p);} body.dispatchEvent(new Event('input',{bubbles:true})); await new Promise(r=>setTimeout(r,900)); const pub=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Publish'); return {ok:true,index:${n},bodyLen:body.innerText.length,publishDisabled:pub?.disabled};})()`;
const pub2 = `(async () => { await new Promise((r) => setTimeout(r, 1200)); const radios = [...document.querySelectorAll('input[type=radio]')]; const unlisted = radios[1]; if (unlisted) { unlisted.click(); unlisted.checked = true; unlisted.dispatchEvent(new Event('change', { bubbles: true })); (unlisted.closest('label') || unlisted.parentElement)?.click(); } await new Promise((r) => setTimeout(r, 1000)); const next = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Next' && !b.disabled); if (!next) return { ok: false, step: 2, err: 'no next' }; next.click(); return { ok: true, step: 2 }; })()`;
const out = {
  index: n,
  title: item.title,
  parts: chunks.map((c, i) => `(()=>{window.__parts=window.__parts||[];window.__parts.push(${JSON.stringify(c)});return {ok:true,i:${i}};})()`),
  fill: fillExpr,
  pub2,
};
const file = `/tmp/upload-plan-${n}.json`;
fs.writeFileSync(file, JSON.stringify(out));
console.log(JSON.stringify({ file, index: n, title: item.title, parts: chunks.length }));

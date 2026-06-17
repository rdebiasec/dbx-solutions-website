#!/usr/bin/env node
/** Build CDP step list for one index (parts fill; title via browser_fill). */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';

const item = JSON.parse(execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${n}`, { encoding: 'utf8' }));
if (item.skip) {
  console.log(JSON.stringify({ index: n, skip: true }));
  process.exit(0);
}

execSync(`node ${path.join(__dirname, 'prepare-parts-upload.mjs')} ${n}`, { stdio: 'pipe' });
const plan = JSON.parse(fs.readFileSync(`/tmp/upload-plan-${n}.json`, 'utf8'));

const openExpr = `(() => {
  const h = [...document.querySelectorAll('h4')].find((e) => e.textContent.trim() === 'Public article');
  if (h) { (h.closest('a,button,[role=button]') || h.parentElement).click(); return { ok: true }; }
  const tb = document.querySelector('[role="textbox"]');
  if (tb) return { ok: true, alreadyOpen: true };
  return { ok: false, err: 'no editor' };
})()`;

const s1 = fs.readFileSync(path.join(__dirname, 'cdp-publish-s1.js'), 'utf8').trim();
const s3 = fs.readFileSync(path.join(__dirname, 'cdp-publish-s3.js'), 'utf8').trim();
const s4 = fs.readFileSync(path.join(__dirname, 'cdp-publish-s4.js'), 'utf8').trim();

const steps = [
  { action: 'navigate', url: URL },
  { action: 'sleep', ms: 10000 },
  { action: 'cdp', expression: openExpr },
  { action: 'sleep', ms: 8000 },
  { action: 'cdp', expression: '(()=>{window.__parts=[];return {ok:true};})()' },
  ...plan.parts.map((expression, i) => ({ action: 'cdp', expression, part: i })),
  { action: 'fill_title', title: item.title },
  { action: 'sleep', ms: 500 },
  { action: 'cdp', expression: plan.fill, awaitPromise: true },
  { action: 'sleep', ms: 800 },
  { action: 'cdp', expression: s1 },
  { action: 'sleep', ms: 2000 },
  { action: 'cdp', expression: plan.pub2, awaitPromise: true },
  { action: 'sleep', ms: 2000 },
  { action: 'cdp', expression: s3, awaitPromise: true },
  { action: 'sleep', ms: 3500 },
  { action: 'cdp', expression: s4, awaitPromise: true },
  { action: 'append', index: n },
];

const out = `/tmp/upload-steps-${n}.json`;
fs.writeFileSync(out, JSON.stringify({ index: n, title: item.title, steps }, null, 2));
console.log(JSON.stringify({ file: out, index: n, title: item.title, stepCount: steps.length }));

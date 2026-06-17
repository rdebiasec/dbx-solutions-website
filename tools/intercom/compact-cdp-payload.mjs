#!/usr/bin/env node
/** Compact CDP via base64-embedded fill JSON (no localhost fetch). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const WAIT = `await new Promise((resolve, reject) => { const start = Date.now(); const check = () => { const t = document.querySelector('textarea[placeholder="Untitled public article"]'); const b = document.querySelector('[role="textbox"]'); if (t && b) resolve(true); else if (Date.now() - start > 25000) reject(new Error('editor timeout')); else setTimeout(check, 300); }; check(); });`;

function extractFill(index) {
  const payload = JSON.parse(fs.readFileSync(`/tmp/cdp-payload-${index}.json`, 'utf8'));
  const m = payload.expression.match(/window\.__intercomFill\((\{[\s\S]*?\})\);/);
  if (!m) throw new Error('no fill json');
  return m[1];
}

const fillJson = extractFill(n);
const b64 = Buffer.from(fillJson, 'utf8').toString('base64');
const pubBlock = fs.readFileSync(path.join(__dirname, 'cdp-publish-full.js'), 'utf8').trim();

const expr = `(async () => { ${WAIT}
  window.__intercomFill = function (data) {
  const title = document.querySelector('textarea[placeholder="Untitled public article"]');
  const desc = document.querySelector('textarea[placeholder="Describe your article to help it get found"]');
  const body = document.querySelector('[role="textbox"]');
  if (!title || !body) return { ok: false, err: 'missing fields' };
  title.value = data.title;
  title.dispatchEvent(new Event('input', { bubbles: true }));
  title.dispatchEvent(new Event('change', { bubbles: true }));
  if (desc) {
    desc.value = data.description;
    desc.dispatchEvent(new Event('input', { bubbles: true }));
  }
  body.focus();
  body.innerHTML = '';
  for (const line of data.content.split('\\n')) {
    const p = document.createElement('p');
    p.textContent = line || ' ';
    body.appendChild(p);
  }
  body.dispatchEvent(new Event('input', { bubbles: true }));
  const pub = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Publish');
  return { ok: true, title: title.value, bodyLen: body.innerText.length, publishDisabled: pub?.disabled };
};
  const data = JSON.parse(atob('${b64}'));
  const fill = window.__intercomFill(data);
  if (!fill?.ok) return { ok: false, phase: 'fill', fill };
  await new Promise((r) => setTimeout(r, 400));
  const pub = await ${pubBlock};
  await new Promise((r) => setTimeout(r, 1200));
  const title = document.querySelector('textarea[placeholder="Untitled public article"]')?.value
    || document.querySelector('h1')?.textContent?.trim();
  return { ok: pub?.ok !== false, phase: 'publish', fill, pub, title };
})()`;

process.stdout.write(JSON.stringify({ expression: expr, awaitPromise: true, returnByValue: true }));

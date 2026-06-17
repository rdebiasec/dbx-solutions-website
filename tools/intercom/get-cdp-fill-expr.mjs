#!/usr/bin/env node
/** CSP-safe CDP fill expression (no eval) for manifest index N. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-manifest.json'), 'utf8'));
const item = manifest[index];
const data = JSON.stringify({
  title: item.title,
  description: item.description,
  content: item.content,
});

const expr = `(async () => {
  const data = ${data};
  const title = document.querySelector('textarea[placeholder="Untitled public article"]');
  const desc = document.querySelector('textarea[placeholder="Describe your article to help it get found"]');
  const body = document.querySelector('[role="textbox"]');
  if (!title || !body) return { ok: false, err: 'missing fields' };
  title.focus();
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
})()`;

process.stdout.write(expr);

#!/usr/bin/env node
/** CDP expression: fill description + body only (title via browser_fill). */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const data = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${index}`, { encoding: 'utf8' }),
);

const expr = `(async () => {
  const data = ${JSON.stringify({ description: data.description, content: data.content })};
  const desc = document.querySelector('textarea[placeholder="Describe your article to help it get found"]');
  const body = document.querySelector('[role="textbox"]');
  if (!body) return { ok: false, err: 'missing body' };
  if (desc) {
    desc.value = data.description;
    desc.dispatchEvent(new Event('input', { bubbles: true }));
    desc.dispatchEvent(new Event('change', { bubbles: true }));
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
  return { ok: true, bodyLen: body.innerText.length, publishDisabled: pub?.disabled };
})()`;

process.stdout.write(expr);

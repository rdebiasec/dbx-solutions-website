#!/usr/bin/env node
/** Combined poll + emit-upload-b64 expression for index N. */
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const upload = fs.readFileSync(`/tmp/intercom-upload/${n}.expr`, 'utf8').trim();
const combined = `(async () => {
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    if (document.querySelector('textarea[placeholder="Untitled public article"]')) break;
    await new Promise(r => setTimeout(r, 200));
  }
  if (!document.querySelector('textarea[placeholder="Untitled public article"]')) return { ok: false, phase: 'poll', ready: false };
  return await ${upload};
})()`;
process.stdout.write(combined);

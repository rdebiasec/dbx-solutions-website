#!/usr/bin/env node
/** Print each CDP step JSON line for index N (session or single). */
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const plan = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-steps.mjs')} ${n}`, { encoding: 'utf8' }),
);
const cdp = plan.steps.filter((s) => s.action === 'cdp');
if (cdp.length === 1 && JSON.stringify(cdp[0].params).length <= 12000) {
  console.log(JSON.stringify({ method: cdp[0].method, params: cdp[0].params, viewId: cdp[0].viewId }));
} else {
  execSync(`node ${path.join(__dirname, 'prepare-session-chunks.mjs')} ${n}`, { stdio: 'pipe' });
  const dir = `/tmp/session-upload-${n}`;
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith('step-'))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  for (const f of files) {
    const j = JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'));
    console.log(JSON.stringify({ method: j.method, params: j.params, viewId: j.viewId }));
  }
}

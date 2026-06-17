#!/usr/bin/env node
/** Drive agent-micro-loop; emit CDP payload to /tmp/cdp-now.json, wait for /tmp/cdp-res.json */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const NOW = '/tmp/cdp-now.json';
const RES = '/tmp/cdp-res.json';
const DONE = `/tmp/cdp-handshake-done-${n}.json`;
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

function rm(f) {
  try {
    fs.unlinkSync(f);
  } catch {}
}
function waitFile(f, ms = 300000) {
  const t = Date.now();
  while (Date.now() - t < ms) {
    if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, 'utf8'));
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  }
  throw new Error('timeout ' + f);
}

function loopArg(v) {
  return JSON.stringify(v).replace(/'/g, "'\\''");
}

rm(NOW);
rm(RES);
rm(DONE);
rm(`/tmp/micro-loop-${n}.json`);

let out = JSON.parse(
  execSync(`node ${path.join(__dirname, 'agent-micro-loop.mjs')} ${n}`, { encoding: 'utf8' }),
);
if (out.action === 'navigate') {
  fs.writeFileSync(NOW, JSON.stringify({ phase: 'navigate', index: n, payload: out.payload }));
  const navRes = waitFile(RES);
  rm(RES);
  out = JSON.parse(
    execSync(`node ${path.join(__dirname, 'agent-micro-loop.mjs')} ${n} '${loopArg(navRes)}'`, {
      encoding: 'utf8',
    }),
  );
}

while (out.action === 'cdp') {
  fs.writeFileSync(
    NOW,
    JSON.stringify({ phase: 'cdp', index: n, step: out.step, total: out.total, payload: out.payload }),
  );
  const cdpRes = waitFile(RES);
  rm(RES);
  rm(NOW);
  out = JSON.parse(
    execSync(`node ${path.join(__dirname, 'agent-micro-loop.mjs')} ${n} '${loopArg(cdpRes)}'`, { encoding: 'utf8' }),
  );
}

fs.writeFileSync(DONE, JSON.stringify(out));
console.log(JSON.stringify(out));

#!/usr/bin/env node
/** Emit step payload; wait for /tmp/step-in.json with MCP result. Usage: node step-bridge.mjs <index> */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const OUT = '/tmp/step-out.json';
const IN = '/tmp/step-in.json';
const DONE = `/tmp/step-bridge-done-${n}.json`;

function waitFile(f, ms = 300000) {
  const t = Date.now();
  while (Date.now() - t < ms) {
    if (fs.existsSync(f)) return;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 150);
  }
  throw new Error('timeout ' + f);
}
function rm(f) {
  try {
    fs.unlinkSync(f);
  } catch {}
}

const total = fs.readFileSync(`/tmp/micro-upload-${n}/steps.jsonl`, 'utf8').trim().split('\n').length;
rm(OUT);
rm(IN);
rm(DONE);

let last, awaitResult, awaitStep = -1;
const lines = fs.readFileSync(`/tmp/micro-upload-${n}/steps.jsonl`, 'utf8').trim().split('\n');
for (let s = 0; s < total; s++) {
  if (lines[s].includes('awaitPromise')) awaitStep = s;
  const payload = JSON.parse(
    execSync(`node ${path.join(__dirname, 'get-micro-step.mjs')} ${n} ${s}`, { encoding: 'utf8' }),
  );
  fs.writeFileSync(OUT, JSON.stringify({ index: n, step: s, total, payload }));
  waitFile(IN);
  last = JSON.parse(fs.readFileSync(IN, 'utf8'));
  if (s === awaitStep) awaitResult = last;
  rm(IN);
}

const finalIsChunk = !last?.fill && !last?.publish && last?.ok === true;
const recordVal = finalIsChunk && awaitResult ? awaitResult : last;
const raw = JSON.stringify({ result: { value: recordVal } }).replace(/'/g, "'\\''");
const root = path.resolve(__dirname, '../..');
const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${raw}'`, {
  encoding: 'utf8',
  cwd: root,
}).trim();
const rec = JSON.parse(recOut.split('\n').pop());
fs.writeFileSync(DONE, JSON.stringify({ index: n, ok: rec.ok, title: rec.title }));
console.log(JSON.stringify(rec));

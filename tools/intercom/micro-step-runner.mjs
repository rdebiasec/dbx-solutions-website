#!/usr/bin/env node
/** File handshake micro-step runner. REQ=/tmp/micro-step-req.json RES=/tmp/micro-step-res.json */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const n = Number(process.argv[2]);
const REQ = '/tmp/micro-step-req.json';
const RES = '/tmp/micro-step-res.json';
const DONE = `/tmp/micro-step-done-${n}.json`;

function rm(f) {
  try {
    fs.unlinkSync(f);
  } catch {}
}
function waitRes(ms = 300000) {
  const t = Date.now();
  while (Date.now() - t < ms) {
    if (fs.existsSync(RES)) {
      const v = JSON.parse(fs.readFileSync(RES, 'utf8'));
      rm(RES);
      return v;
    }
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  }
  throw new Error('timeout');
}

const jsonl = `/tmp/micro-upload-${n}/steps.jsonl`;
if (!fs.existsSync(jsonl)) {
  execSync(`node ${path.join(__dirname, 'micro-upload-index.mjs')} ${n}`, { cwd: root, stdio: 'pipe' });
}
const total = fs.readFileSync(jsonl, 'utf8').trim().split('\n').length;
rm(REQ);
rm(RES);
rm(DONE);

let last;
let awaitResult;
let awaitStep = -1;
const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');
for (let s = 0; s < total; s++) {
  if (lines[s].includes('awaitPromise')) awaitStep = s;
  const payload = JSON.parse(
    execSync(`node ${path.join(__dirname, 'get-micro-step.mjs')} ${n} ${s}`, { encoding: 'utf8' }),
  );
  fs.writeFileSync(REQ, JSON.stringify({ index: n, step: s, total, payload }));
  const res = waitRes();
  last = res;
  if (s === awaitStep) awaitResult = res;
  rm(REQ);
}

const finalIsChunk = !last?.fill && !last?.publish && last?.ok === true;
const recordVal = finalIsChunk && awaitResult ? awaitResult : last;
const raw = JSON.stringify({ result: { value: recordVal } }).replace(/'/g, "'\\''");
const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${raw}'`, {
  encoding: 'utf8',
  cwd: root,
}).trim();
const rec = JSON.parse(recOut.split('\n').pop());
fs.writeFileSync(DONE, JSON.stringify(rec));
console.log(JSON.stringify(rec));

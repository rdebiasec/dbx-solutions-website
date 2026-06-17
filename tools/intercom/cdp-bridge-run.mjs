#!/usr/bin/env node
/** Run CDP steps [start,end] for index N via file bridge; agent responds to /tmp/cdp-bridge-call.json */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const n = Number(process.argv[2]);
const start = Number(process.argv[3] ?? 0);
const end = Number(process.argv[4] ?? 9999);
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const CALL = '/tmp/cdp-bridge-call.json';
const RESULT = '/tmp/cdp-bridge-result.json';

function waitResult(timeoutMs = 180000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    if (fs.existsSync(RESULT)) {
      const v = JSON.parse(fs.readFileSync(RESULT, 'utf8'));
      try {
        fs.unlinkSync(RESULT);
      } catch {}
      return v;
    }
    execSync('sleep 0.03');
  }
  throw new Error('bridge timeout');
}

function cdp(payload) {
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  fs.writeFileSync(CALL, JSON.stringify({ tool: 'browser_cdp', payload }));
  return waitResult();
}

const lines = fs.readFileSync(`/tmp/micro-upload-${n}/steps.jsonl`, 'utf8').trim().split('\n');
const hi = Math.min(end, lines.length - 1);
let last;

for (let s = start; s <= hi; s++) {
  last = cdp(JSON.parse(lines[s]));
  if (s % 20 === 0 || s === hi) process.stderr.write(`[cdp-bridge] ${n} step ${s + 1}/${lines.length}\n`);
}

if (process.argv[5] === 'record') {
  const raw = JSON.stringify({ result: { value: last } }).replace(/'/g, "'\\''");
  const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${raw}'`, {
    encoding: 'utf8',
    cwd: root,
  }).trim();
  console.log(recOut.split('\n').pop());
} else {
  console.log(JSON.stringify({ index: n, lastStep: hi, last }));
}

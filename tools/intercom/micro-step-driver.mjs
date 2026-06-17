#!/usr/bin/env node
/**
 * Drive micro-step upload: writes each step to /tmp/driver-req.json, waits for /tmp/driver-res.json.
 * Agent loop: read req -> browser_cdp -> write res.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const n = Number(process.argv[2]);
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const REQ = '/tmp/driver-req.json';
const RES = '/tmp/driver-res.json';
const LOG = `/tmp/driver-${n}.log`;

function log(msg) {
  fs.appendFileSync(LOG, `[${new Date().toISOString()}] ${msg}\n`);
}

function waitRes(step, timeoutMs = 180000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (fs.existsSync(RES)) {
      try {
        const data = JSON.parse(fs.readFileSync(RES, 'utf8'));
        if (data.step === step) {
          fs.unlinkSync(RES);
          return data.result;
        }
      } catch {}
    }
    execSync('sleep 0.05');
  }
  throw new Error(`timeout step ${step}`);
}

function mcpStep(step, payload) {
  try { fs.unlinkSync(RES); } catch {}
  fs.writeFileSync(REQ, JSON.stringify({ step, tool: 'browser_cdp', payload }));
  return waitRes(step);
}

function mcpNav() {
  try { fs.unlinkSync(RES); } catch {}
  fs.writeFileSync(
    REQ,
    JSON.stringify({ step: 'nav', tool: 'browser_navigate', payload: { url: URL, viewId: VIEW } }),
  );
  return waitRes('nav');
}

const jsonl = `/tmp/micro-upload-${n}/steps.jsonl`;
const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');
log(`start index ${n} steps=${lines.length}`);

mcpNav();

let last;
for (let s = 0; s < lines.length; s++) {
  const payload = JSON.parse(lines[s]);
  last = mcpStep(s, payload);
  if (s % 25 === 0 || s === lines.length - 1) log(`step ${s + 1}/${lines.length}`);
}

try { fs.unlinkSync(REQ); } catch {}

const raw = JSON.stringify({ result: { value: last } }).replace(/'/g, "'\\''");
const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${raw}'`, {
  encoding: 'utf8',
  cwd: root,
}).trim();
const rec = JSON.parse(recOut.split('\n').pop());
log(`done ok=${rec.ok}`);
console.log(JSON.stringify({ index: n, ok: rec.ok, steps: lines.length, title: rec.title }));

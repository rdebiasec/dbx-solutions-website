#!/usr/bin/env node
/** Write each micro-step payload; wait for /tmp/mcp-step-result.json from agent MCP loop. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const n = Number(process.argv[2]);
const PAYLOAD = '/tmp/mcp-step-payload.json';
const META = '/tmp/mcp-step-meta.json';
const RESULT = '/tmp/mcp-step-result.json';
const DONE = '/tmp/mcp-step-done.json';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

function waitFile(file, timeoutMs = 300000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (fs.existsSync(file)) return;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 200);
  }
  throw new Error(`timeout waiting for ${file}`);
}

function rm(f) {
  try {
    fs.unlinkSync(f);
  } catch {}
}

const jsonl = `/tmp/micro-upload-${n}/steps.jsonl`;
const total = fs.readFileSync(jsonl, 'utf8').trim().split('\n').length;

rm(PAYLOAD);
rm(META);
rm(RESULT);
rm(DONE);

fs.writeFileSync(
  PAYLOAD,
  JSON.stringify({ tool: 'browser_navigate', payload: { url: URL, viewId: VIEW } }),
);
fs.writeFileSync(META, JSON.stringify({ index: n, step: 'nav', total }));
waitFile(RESULT);
rm(RESULT);

let last;
let awaitResult;
let awaitStep = -1;
const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');
for (let s = 0; s < total; s++) {
  if (lines[s].includes('awaitPromise')) awaitStep = s;
  const payload = JSON.parse(
    execSync(`node ${path.join(__dirname, 'get-micro-step.mjs')} ${n} ${s}`, { encoding: 'utf8' }),
  );
  fs.writeFileSync(PAYLOAD, JSON.stringify({ tool: 'browser_cdp', payload }));
  fs.writeFileSync(META, JSON.stringify({ index: n, step: s, total, awaitStep }));
  waitFile(RESULT);
  last = JSON.parse(fs.readFileSync(RESULT, 'utf8'));
  if (s === awaitStep) awaitResult = last;
  rm(RESULT);
}

const finalIsChunk = !last?.fill && !last?.publish && last?.ok === true;
const recordVal = finalIsChunk && awaitResult ? awaitResult : last;
const raw = JSON.stringify({ result: { value: recordVal } }).replace(/'/g, "'\\''");
const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${raw}'`, {
  encoding: 'utf8',
  cwd: root,
}).trim();
const rec = JSON.parse(recOut.split('\n').pop());
fs.writeFileSync(DONE, JSON.stringify({ index: n, ok: rec.ok, title: rec.title, steps: total }));
console.log(JSON.stringify({ index: n, ok: rec.ok, title: rec.title, steps: total }));

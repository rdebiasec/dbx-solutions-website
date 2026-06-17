#!/usr/bin/env node
/** Bridge one index: writes /tmp/mcp-step.json, waits for /tmp/mcp-result.json per step. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const STEP = '/tmp/mcp-step.json';
const RESULT = '/tmp/mcp-result.json';
const DONE = `/tmp/upload-bridge-${n}-done.json`;

function waitResult(ms = 300000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (fs.existsSync(RESULT)) {
      const data = JSON.parse(fs.readFileSync(RESULT, 'utf8'));
      try {
        fs.unlinkSync(RESULT);
      } catch {}
      return data;
    }
    execSync('sleep 0.05');
  }
  throw new Error('timeout');
}

function bridge(tool, payload) {
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  fs.writeFileSync(STEP, JSON.stringify({ tool, payload, index: n }));
  return waitResult();
}

const progress = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'),
);
if (progress.uploaded.includes(n)) {
  fs.writeFileSync(DONE, JSON.stringify({ skip: true, index: n }));
  console.log(JSON.stringify({ skip: true, index: n }));
  process.exit(0);
}

const single = `/tmp/single-cdp/${n}.json`;
const runDir = `/tmp/run-upload-${n}`;
let cdpSteps = [];

if (fs.existsSync(single)) {
  cdpSteps = [JSON.parse(fs.readFileSync(single, 'utf8'))];
} else {
  if (!fs.existsSync(`${runDir}/expr-0.txt`)) {
    execSync(`node ${path.join(__dirname, 'prepare-run-upload.mjs')} ${n}`, { stdio: 'pipe' });
  }
  const files = fs
    .readdirSync(runDir)
    .filter((f) => f.startsWith('expr-'))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  cdpSteps = files.map((f) => {
    const expr = fs.readFileSync(`${runDir}/${f}`, 'utf8');
    const params = { expression: expr, returnByValue: true };
    if (expr.includes('eval(atob') || expr.includes('await ')) params.awaitPromise = true;
    return { method: 'Runtime.evaluate', params, viewId: VIEW };
  });
}

bridge('browser_navigate', { url: URL, viewId: VIEW });
let last;
for (let i = 0; i < cdpSteps.length; i++) {
  last = bridge('browser_cdp', cdpSteps[i]);
}

const ok =
  last?.result?.value?.ok === true ||
  last?.result?.value?.phase === 'publish' ||
  (last?.exceptionDetails?.text || '').includes('Execution context was destroyed');

if (ok) {
  execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { stdio: 'pipe' });
}
fs.writeFileSync(DONE, JSON.stringify({ index: n, ok, last }));
console.log(JSON.stringify({ index: n, ok, last }));

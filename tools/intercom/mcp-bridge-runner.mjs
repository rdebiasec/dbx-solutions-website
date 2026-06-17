#!/usr/bin/env node
/**
 * File-bridge micro-step runner for one index.
 * Writes /tmp/mcp-step.json, waits for /tmp/mcp-result.json per step.
 * Agent: read mcp-step.json -> CallMcpTool browser_cdp -> write mcp-result.json
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
const STEP = '/tmp/mcp-step.json';
const RESULT = '/tmp/mcp-result.json';
const DONE = '/tmp/mcp-bridge-done.json';

function waitResult(timeoutMs = 180000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (fs.existsSync(RESULT)) {
      const data = JSON.parse(fs.readFileSync(RESULT, 'utf8'));
      try {
        fs.unlinkSync(RESULT);
      } catch {}
      return data;
    }
    execSync('sleep 0.05');
  }
  throw new Error('timeout waiting for mcp-result');
}

function bridge(tool, payload) {
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  fs.writeFileSync(STEP, JSON.stringify({ tool, payload }));
  return waitResult();
}

const jsonl = `/tmp/micro-upload-${n}/steps.jsonl`;
if (!fs.existsSync(jsonl)) {
  console.error(JSON.stringify({ error: 'missing jsonl', jsonl }));
  process.exit(1);
}
const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');

bridge('browser_navigate', { url: URL, viewId: VIEW });

let last;
for (let s = 0; s < lines.length; s++) {
  const payload = JSON.parse(lines[s]);
  last = bridge('browser_cdp', payload);
  if (s % 25 === 0 || s === lines.length - 1) {
    process.stderr.write(`[bridge] index ${n} step ${s + 1}/${lines.length}\n`);
  }
}

try {
  fs.unlinkSync(STEP);
} catch {}

const raw = JSON.stringify({ result: { value: last } }).replace(/'/g, "'\\''");
const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${raw}'`, {
  encoding: 'utf8',
  cwd: root,
}).trim();
const rec = JSON.parse(recOut.split('\n').pop());
fs.writeFileSync(DONE, JSON.stringify({ index: n, ok: rec.ok, title: rec.title, steps: lines.length }));
console.log(JSON.stringify({ index: n, ok: rec.ok, steps: lines.length, title: rec.title }));

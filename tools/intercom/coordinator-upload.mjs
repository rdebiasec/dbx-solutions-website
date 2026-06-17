#!/usr/bin/env node
/**
 * Multi-index file-bridge coordinator for agent MCP loop.
 * Writes /tmp/agent-mcp-call.json; waits for /tmp/agent-mcp-result.json.
 * Agent: read call -> CallMcpTool -> write result JSON to /tmp/agent-mcp-result.json
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const CALL = '/tmp/agent-mcp-call.json';
const RESULT = '/tmp/agent-mcp-result.json';
const DONE = '/tmp/agent-all-done.json';
const progressFile = path.join(__dirname, 'upload-progress.json');

const indices = process.argv.slice(2).map(Number).filter(Boolean);

function loadProgress() {
  return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
}

function isUploaded(n) {
  return loadProgress().uploaded.includes(n);
}

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
  throw new Error('timeout waiting for agent-mcp-result');
}

function agentCall(meta, tool, payload) {
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  fs.writeFileSync(CALL, JSON.stringify({ ...meta, tool, payload }));
  return waitResult();
}

const summary = [];

for (const n of indices) {
  if (isUploaded(n)) {
    summary.push({ index: n, ok: true, skipped: true });
    continue;
  }

  const jsonl = `/tmp/micro-upload-${n}/steps.jsonl`;
  if (!fs.existsSync(jsonl)) {
    try {
      execSync(`node ${path.join(__dirname, 'micro-upload-index.mjs')} ${n}`, { stdio: 'pipe' });
    } catch (e) {
      summary.push({ index: n, ok: false, error: 'prep-failed' });
      continue;
    }
  }

  const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');
  process.stderr.write(`[coord] index ${n} steps=${lines.length}\n`);

  agentCall({ index: n, phase: 'nav', step: -1, total: lines.length }, 'browser_navigate', {
    url: URL,
    viewId: VIEW,
  });

  let last;
  for (let s = 0; s < lines.length; s++) {
    const payload = JSON.parse(lines[s]);
    last = agentCall({ index: n, phase: 'cdp', step: s, total: lines.length }, 'browser_cdp', payload);
    if (s % 25 === 0 || s === lines.length - 1) {
      process.stderr.write(`[coord] index ${n} step ${s + 1}/${lines.length}\n`);
    }
  }

  const raw = JSON.stringify({ result: { value: last } }).replace(/'/g, "'\\''");
  const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${raw}'`, {
    encoding: 'utf8',
    cwd: root,
  }).trim();
  const rec = JSON.parse(recOut.split('\n').pop());
  summary.push({ index: n, ok: rec.ok, title: rec.title, steps: lines.length });
}

try {
  fs.unlinkSync(CALL);
} catch {}
fs.writeFileSync(DONE, JSON.stringify({ summary, uploadedCount: loadProgress().uploaded.length }));
console.log(JSON.stringify({ summary, uploadedCount: loadProgress().uploaded.length }));

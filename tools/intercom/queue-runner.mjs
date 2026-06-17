#!/usr/bin/env node
/** Run upload queue; MCP steps via /tmp/agent-action.json bridge. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const QUEUE = '/tmp/upload-queue.jsonl';
const STATE = '/tmp/upload-queue-state.json';
const ACTION = '/tmp/agent-action.json';
const RESULT = '/tmp/agent-action-result.json';
const LOG = '/tmp/upload-queue-log.jsonl';

function waitResult(timeoutMs = 300000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (fs.existsSync(RESULT)) {
      const data = JSON.parse(fs.readFileSync(RESULT, 'utf8'));
      try {
        fs.unlinkSync(RESULT);
      } catch {}
      return data;
    }
    execSync('sleep 0.1');
  }
  throw new Error('timeout waiting for agent-action-result');
}

function mcp(step) {
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  fs.writeFileSync(ACTION, JSON.stringify(step));
  return waitResult();
}

const state = JSON.parse(fs.readFileSync(STATE, 'utf8'));
const lines = fs.readFileSync(QUEUE, 'utf8').trim().split('\n');
const failures = [];

while (state.pos < lines.length) {
  const step = JSON.parse(lines[state.pos]);
  try {
    if (step.action === 'sleep') {
      execSync(`sleep ${Math.ceil(step.ms / 1000)}`);
    } else if (step.action === 'append') {
      execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${step.index}`, { cwd: root });
      fs.appendFileSync(LOG, JSON.stringify({ ok: true, append: step.index }) + '\n');
    } else if (step.action === 'navigate') {
      const res = mcp({ tool: 'browser_navigate', payload: { url: step.url, viewId: step.viewId }, index: step.index });
      if (res?.error) throw new Error(JSON.stringify(res));
    } else if (step.action === 'cdp') {
      const cdp = JSON.parse(fs.readFileSync(step.file, 'utf8'));
      const res = mcp({ tool: 'browser_cdp', payload: cdp, index: step.index, label: path.basename(step.file) });
      const val = res?.result?.value ?? res?.value ?? res;
      if (step.file.includes('fill.json') && !val?.ok && !val?.fillRes?.ok) {
        throw new Error(`fill failed: ${JSON.stringify(val)}`);
      }
      if (step.file.includes('pub-s') && step.file.includes('pub-s4') === false) {
        if (val?.ok === false) throw new Error(`publish failed: ${JSON.stringify(val)}`);
      }
    }
    state.pos++;
    fs.writeFileSync(STATE, JSON.stringify(state, null, 2));
  } catch (e) {
    const err = String(e.message || e);
    failures.push({ pos: state.pos, step, err });
    fs.appendFileSync(LOG, JSON.stringify({ ok: false, pos: state.pos, step, err }) + '\n');
    if (step.action === 'append') {
      state.pos++;
      fs.writeFileSync(STATE, JSON.stringify(state, null, 2));
      continue;
    }
    break;
  }
}

try {
  fs.unlinkSync(ACTION);
} catch {}
console.log(JSON.stringify({ pos: state.pos, total: lines.length, done: state.pos >= lines.length, failures }));

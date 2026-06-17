#!/usr/bin/env node
/** Queue runner: sleeps/appends locally; CDP/navigate via agent-action bridge. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const QUEUE = '/tmp/mcp-queue.jsonl';
const STATE = '/tmp/mcp-queue-state.json';
const ACTION = '/tmp/agent-action.json';
const RESULT = '/tmp/agent-action-result.json';

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
  throw new Error('timeout');
}

function mcp(payload) {
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  fs.writeFileSync(ACTION, JSON.stringify(payload));
  return waitResult();
}

const state = JSON.parse(fs.readFileSync(STATE, 'utf8'));
const lines = fs.readFileSync(QUEUE, 'utf8').trim().split('\n');
const failures = [];

while (state.pos < lines.length) {
  const step = JSON.parse(lines[state.pos]);
  try {
    if (step.type === 'sleep') {
      execSync(`sleep ${Math.ceil(step.ms / 1000)}`);
    } else if (step.type === 'append') {
      execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${step.index}`, { cwd: root });
    } else if (step.type === 'navigate') {
      mcp({ tool: 'browser_navigate', payload: { url: step.url, viewId: step.viewId }, index: step.index, step: 'navigate' });
    } else if (step.type === 'cdp') {
      const res = mcp({ tool: 'browser_cdp', payload: step.payload, index: step.index, label: step.label });
      if (step.label === 'run') {
        const val = res?.result?.value ?? res?.value ?? res;
        if (!val?.ok && val?.phase !== 'publish') throw new Error(JSON.stringify(val));
      }
    }
    state.pos++;
    fs.writeFileSync(STATE, JSON.stringify(state, null, 2));
  } catch (e) {
    failures.push({ pos: state.pos, step, err: String(e.message || e) });
    break;
  }
}

try {
  fs.unlinkSync(ACTION);
} catch {}
console.log(JSON.stringify({ pos: state.pos, total: lines.length, done: state.pos >= lines.length, failures }));

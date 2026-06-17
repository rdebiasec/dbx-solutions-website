#!/usr/bin/env node
/** Execute CDP steps from JSONL via agent-action bridge. */
import fs from 'fs';
import { execSync } from 'child_process';

const jsonl = process.argv[2];
const ACTION = '/tmp/agent-action.json';
const RESULT = '/tmp/agent-action-result.json';
const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');
const start = Number(process.argv[3] ?? 0);
const results = [];

function waitResult(timeoutMs = 300000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    if (fs.existsSync(RESULT)) {
      const data = JSON.parse(fs.readFileSync(RESULT, 'utf8'));
      try { fs.unlinkSync(RESULT); } catch {}
      return data;
    }
    execSync('sleep 0.1');
  }
  throw new Error('timeout step ' + start);
}

for (let i = start; i < lines.length; i++) {
  const payload = JSON.parse(lines[i]);
  try { fs.unlinkSync(RESULT); } catch {}
  fs.writeFileSync(ACTION, JSON.stringify({ tool: 'browser_cdp', payload, step: i }));
  const res = waitResult();
  results.push({ step: i, res });
  fs.writeFileSync('/tmp/cdp-exec-pos.json', JSON.stringify({ pos: i + 1, total: lines.length }));
}

try { fs.unlinkSync(ACTION); } catch {}
console.log(JSON.stringify({ done: true, results: results.map(r => r.res?.result?.value ?? r.res) }));

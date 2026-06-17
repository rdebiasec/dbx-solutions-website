#!/usr/bin/env node
/** Agent tick: read /tmp/agent-mcp-call.json or write /tmp/agent-mcp-result.json */
import fs from 'fs';
import { execSync } from 'child_process';

const CALL = '/tmp/agent-mcp-call.json';
const RESULT = '/tmp/agent-mcp-result.json';
const DONE = '/tmp/agent-all-done.json';
const cmd = process.argv[2];

function waitCall(timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (fs.existsSync(DONE)) {
      return { done: true, all: JSON.parse(fs.readFileSync(DONE, 'utf8')) };
    }
    if (fs.existsSync(CALL)) {
      try {
        return JSON.parse(fs.readFileSync(CALL, 'utf8'));
      } catch {}
    }
    execSync('sleep 0.05');
  }
  return { done: true, reason: 'timeout' };
}

if (cmd === 'read') {
  console.log(JSON.stringify(waitCall()));
} else if (cmd === 'write') {
  const result = JSON.parse(process.argv[3] || '{}');
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  fs.writeFileSync(RESULT, JSON.stringify(result));
  const next = waitCall();
  console.log(JSON.stringify(next));
} else {
  console.error('Usage: read | write <json>');
  process.exit(1);
}

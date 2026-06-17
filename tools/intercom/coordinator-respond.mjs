#!/usr/bin/env node
/**
 * Process one coordinator tick: print MCP args JSON, write result from argv.
 * Usage: node coordinator-respond.mjs '<mcp-result-json>'
 */
import fs from 'fs';
import { execSync } from 'child_process';

const CALL = '/tmp/agent-mcp-call.json';
const RESULT = '/tmp/agent-mcp-result.json';
const DONE = '/tmp/agent-all-done.json';

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

if (process.argv[2] === 'read') {
  console.log(JSON.stringify(waitCall()));
  process.exit(0);
}

const mcpResult = JSON.parse(process.argv[2] || '{}');
try {
  fs.unlinkSync(RESULT);
} catch {}
fs.writeFileSync(RESULT, JSON.stringify(mcpResult));

const next = waitCall();
console.log(JSON.stringify(next));

#!/usr/bin/env node
/** Write /tmp/mcp-result.json and wait for next /tmp/mcp-step.json. */
import fs from 'fs';
import { execSync } from 'child_process';

const RESULT = '/tmp/mcp-result.json';
const STEP = '/tmp/mcp-step.json';
const DONE = '/tmp/mcp-bridge-done.json';
const result = JSON.parse(process.argv[2] || '{}');

try {
  fs.unlinkSync(RESULT);
} catch {}
fs.writeFileSync(RESULT, JSON.stringify(result));

const start = Date.now();
while (Date.now() - start < 180000) {
  if (fs.existsSync(DONE)) {
    console.log(JSON.stringify({ done: true, bridge: JSON.parse(fs.readFileSync(DONE, 'utf8')) }));
    process.exit(0);
  }
  if (fs.existsSync(STEP)) {
    try {
      const step = JSON.parse(fs.readFileSync(STEP, 'utf8'));
      console.log(JSON.stringify(step));
      process.exit(0);
    } catch {}
  }
  execSync('sleep 0.05');
}
console.log(JSON.stringify({ done: true, reason: 'timeout' }));

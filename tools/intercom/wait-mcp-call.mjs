#!/usr/bin/env node
/** Wait for /tmp/mcp-call.json and print it (one line). */
import fs from 'fs';
import { execSync } from 'child_process';

const CALL = '/tmp/mcp-call.json';
const start = Date.now();
while (Date.now() - start < 120000) {
  if (fs.existsSync(CALL)) {
    console.log(fs.readFileSync(CALL, 'utf8').trim());
    process.exit(0);
  }
  execSync('sleep 0.05');
}
console.log(JSON.stringify({ done: true, reason: 'no-call' }));

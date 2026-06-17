#!/usr/bin/env node
/** Block until /tmp/driver-req.json exists; print it and exit. */
import fs from 'fs';
import { execSync } from 'child_process';

const REQ = '/tmp/driver-req.json';
const timeout = Number(process.argv[2] || 120000);
const start = Date.now();

while (Date.now() - start < timeout) {
  if (fs.existsSync(REQ)) {
    try {
      const req = JSON.parse(fs.readFileSync(REQ, 'utf8'));
      console.log(JSON.stringify(req));
      process.exit(0);
    } catch {}
  }
  execSync('sleep 0.05');
}
console.log(JSON.stringify({ done: true, reason: 'timeout-wait-req' }));
process.exit(1);

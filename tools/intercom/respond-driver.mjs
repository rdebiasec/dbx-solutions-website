#!/usr/bin/env node
/** Write driver response for current /tmp/driver-req.json; wait and print next request. */
import fs from 'fs';
import { execSync } from 'child_process';

const REQ = '/tmp/driver-req.json';
const RES = '/tmp/driver-res.json';
const result = JSON.parse(process.argv[2] || '{}');

if (!fs.existsSync(REQ)) {
  console.log(JSON.stringify({ done: true, reason: 'no-req' }));
  process.exit(0);
}

const req = JSON.parse(fs.readFileSync(REQ, 'utf8'));
try {
  fs.unlinkSync(RES);
} catch {}
fs.writeFileSync(RES, JSON.stringify({ step: req.step, result }));

const start = Date.now();
while (Date.now() - start < 120000) {
  if (fs.existsSync(REQ)) {
    try {
      const next = JSON.parse(fs.readFileSync(REQ, 'utf8'));
      if (next.step !== req.step) {
        console.log(JSON.stringify(next));
        process.exit(0);
      }
    } catch {}
  }
  execSync('sleep 0.05');
}

console.log(JSON.stringify({ done: true, reason: 'timeout' }));

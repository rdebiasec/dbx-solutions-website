#!/usr/bin/env node
/** Write /tmp/cdp-bridge-result.json; print next /tmp/cdp-bridge-call.json payload or done. */
import fs from 'fs';
import { execSync } from 'child_process';

const CALL = '/tmp/cdp-bridge-call.json';
const RESULT = '/tmp/cdp-bridge-result.json';
const OUT = '/tmp/cdp-bridge-out.json';

function waitCall(timeoutMs = 120000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    if (fs.existsSync(OUT) && fs.statSync(OUT).size > 0) {
      return { done: true, out: fs.readFileSync(OUT, 'utf8').trim() };
    }
    if (fs.existsSync(CALL)) {
      try {
        return JSON.parse(fs.readFileSync(CALL, 'utf8'));
      } catch {}
    }
    execSync('sleep 0.03');
  }
  return { done: true, reason: 'timeout' };
}

if (process.argv[2] === 'read') {
  console.log(JSON.stringify(waitCall()));
  process.exit(0);
}

const result = JSON.parse(process.argv[2] || '{}');
try {
  fs.unlinkSync(RESULT);
} catch {}
fs.writeFileSync(RESULT, JSON.stringify(result));
const next = waitCall();
console.log(JSON.stringify(next));

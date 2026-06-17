#!/usr/bin/env node
/** Write /tmp/driver-res.json for current request using MCP result JSON on stdin or argv. */
import fs from 'fs';

const REQ = '/tmp/driver-req.json';
const RES = '/tmp/driver-res.json';
const raw = process.argv[2] || fs.readFileSync(0, 'utf8');
const result = JSON.parse(raw);

if (!fs.existsSync(REQ)) {
  console.error(JSON.stringify({ error: 'no-req' }));
  process.exit(1);
}

const req = JSON.parse(fs.readFileSync(REQ, 'utf8'));
try {
  fs.unlinkSync(RES);
} catch {}
fs.writeFileSync(RES, JSON.stringify({ step: req.step, result }));
console.log(JSON.stringify({ ok: true, step: req.step }));

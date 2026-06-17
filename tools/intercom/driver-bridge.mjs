#!/usr/bin/env node
/** Agent helper: read driver-req, print step; after MCP write driver-res via argv. */
import fs from 'fs';

const REQ = '/tmp/driver-req.json';
const RES = '/tmp/driver-res.json';

const action = process.argv[2];
if (action === 'read') {
  if (!fs.existsSync(REQ)) {
    console.log(JSON.stringify({ wait: true }));
    process.exit(0);
  }
  console.log(fs.readFileSync(REQ, 'utf8'));
} else if (action === 'write') {
  const step = process.argv[3];
  const result = process.argv[4] || '{}';
  fs.writeFileSync(RES, JSON.stringify({ step: step === 'nav' ? 'nav' : Number(step), result: JSON.parse(result) }));
  console.log('ok');
} else if (action === 'total') {
  const n = Number(process.argv[3]);
  const jsonl = `/tmp/micro-upload-${n}/steps.jsonl`;
  console.log(fs.readFileSync(jsonl, 'utf8').trim().split('\n').length);
}

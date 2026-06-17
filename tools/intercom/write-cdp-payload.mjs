#!/usr/bin/env node
import fs from 'fs';
const n = Number(process.argv[2]);
const expr = fs.readFileSync(`/tmp/intercom-upload/combined/${n}.expr`, 'utf8');
const out = `/tmp/cdp-payload-${n}.json`;
fs.writeFileSync(out, JSON.stringify({
  method: 'Runtime.evaluate',
  params: { expression: expr, awaitPromise: true, returnByValue: true },
}));
process.stdout.write(out);

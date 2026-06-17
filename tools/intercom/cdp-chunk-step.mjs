#!/usr/bin/env node
/** Print one step from chunked CDP file: node cdp-chunk-step.mjs /tmp/out.json store 0 | run */
import fs from 'fs';

const [, , file, kind, idx] = process.argv;
const j = JSON.parse(fs.readFileSync(file, 'utf8'));
if (kind === 'run') {
  console.log(JSON.stringify(j.run));
} else {
  console.log(JSON.stringify(j.stores[Number(idx)]));
}

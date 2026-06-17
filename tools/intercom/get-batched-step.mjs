#!/usr/bin/env node
/** Print one batched CDP step for index N (step 0..N-2 = batches, last = run). */
import fs from 'fs';

const n = Number(process.argv[2]);
const step = process.argv[3] === 'run' ? 'run' : `batch-${process.argv[3]}`;
const file = `/tmp/upload-batch-${n}/${step}.json`;
if (!fs.existsSync(file)) {
  console.error(JSON.stringify({ error: 'missing', file }));
  process.exit(1);
}
process.stdout.write(fs.readFileSync(file, 'utf8'));

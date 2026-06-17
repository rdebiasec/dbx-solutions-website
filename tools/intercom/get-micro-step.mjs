#!/usr/bin/env node
/** Output one micro-step MCP arguments JSON for index N step S (0-based). */
import fs from 'fs';

const n = Number(process.argv[2]);
const step = Number(process.argv[3]);
const jsonl = `/tmp/micro-upload-${n}/steps.jsonl`;
if (!fs.existsSync(jsonl)) {
  console.error(JSON.stringify({ error: 'run micro-upload-index.mjs first', jsonl }));
  process.exit(1);
}
const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');
if (step < 0 || step >= lines.length) {
  console.error(JSON.stringify({ error: 'step out of range', step, total: lines.length }));
  process.exit(1);
}
process.stdout.write(lines[step]);

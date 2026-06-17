#!/usr/bin/env node
/** Next queue step or advance. Usage: next | done <json> */
import fs from 'fs';

const QUEUE = '/tmp/upload-queue.jsonl';
const STATE = '/tmp/upload-queue-state.json';
const cmd = process.argv[2];

const state = JSON.parse(fs.readFileSync(STATE, 'utf8'));
const lines = fs.readFileSync(QUEUE, 'utf8').trim().split('\n');

if (cmd === 'next') {
  if (state.pos >= lines.length) {
    console.log(JSON.stringify({ done: true, pos: state.pos, total: lines.length }));
    process.exit(0);
  }
  const step = JSON.parse(lines[state.pos]);
  console.log(JSON.stringify({ pos: state.pos, total: lines.length, step }));
} else if (cmd === 'done') {
  state.pos++;
  state.lastResult = process.argv[3] ? JSON.parse(process.argv[3]) : null;
  fs.writeFileSync(STATE, JSON.stringify(state, null, 2));
  console.log(JSON.stringify({ advanced: true, pos: state.pos, total: lines.length }));
} else {
  console.error('Usage: queue-step.mjs next|done');
  process.exit(1);
}

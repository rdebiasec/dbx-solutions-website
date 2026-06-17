#!/usr/bin/env node
/**
 * Build CDP Runtime.evaluate params from /tmp/intercom-upload/combined/N.expr
 * For large expr (>12KB JSON), prints batched step paths instead.
 * Usage: node combined-cdp-params.mjs <index> [--steps]
 */
import fs from 'fs';
import { execSync } from 'child_process';

const index = Number(process.argv[2]);
const stepsOnly = process.argv.includes('--steps');
const combined = `/tmp/intercom-upload/combined/${index}.expr`;
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const THRESHOLD = 12000;

if (!fs.existsSync(combined)) {
  console.error(JSON.stringify({ error: 'missing combined expr', path: combined }));
  process.exit(1);
}

const expr = fs.readFileSync(combined, 'utf8').trim();
const single = {
  method: 'Runtime.evaluate',
  params: { expression: expr, awaitPromise: true, returnByValue: true },
  viewId: VIEW_ID,
};
const singleSize = JSON.stringify(single).length;

if (singleSize <= THRESHOLD) {
  const out = `/tmp/cdp-combined-${index}.json`;
  fs.writeFileSync(out, JSON.stringify(single));
  console.log(JSON.stringify({ index, mode: 'single', out, size: singleSize }));
  process.exit(0);
}

// Batched path via gen-small-chunks + batch-chunk-steps
execSync(`node /tmp/gen-small-chunks.mjs ${index}`, { stdio: 'inherit' });
execSync(`node /tmp/batch-chunk-steps.mjs ${index}`, { stdio: 'inherit' });
const batchedDir = `/tmp/cdp-batched-${index}`;
const stepFiles = fs
  .readdirSync(batchedDir)
  .filter((f) => f.startsWith('step-'))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]))
  .map((f) => `${batchedDir}/${f}`);

if (stepsOnly) {
  console.log(JSON.stringify({ index, mode: 'batched', steps: stepFiles }));
} else {
  console.log(JSON.stringify({ index, mode: 'batched', stepCount: stepFiles.length, steps: stepFiles }));
}

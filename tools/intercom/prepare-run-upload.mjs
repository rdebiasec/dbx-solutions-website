#!/usr/bin/env node
/**
 * Upload one index via session chunks + subprocess MCP helper.
 * Writes step expressions to /tmp/run-upload-N/ and prints step count.
 * Agent runs: node tools/intercom/mcp-step-expr.mjs N STEP
 */
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const progress = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'),
);
if (progress.uploaded.includes(n)) {
  console.log(JSON.stringify({ skip: true, index: n }));
  process.exit(0);
}

execSync(`node ${path.join(__dirname, 'prepare-session-chunks.mjs')} ${n}`, { stdio: 'pipe' });
const dir = `/tmp/session-upload-${n}`;
const out = `/tmp/run-upload-${n}`;
fs.mkdirSync(out, { recursive: true });
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith('step-'))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
files.forEach((f, i) => {
  const j = JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'));
  fs.writeFileSync(`${out}/step-${i}.json`, JSON.stringify(j));
  fs.writeFileSync(`${out}/expr-${i}.txt`, j.params.expression);
});
console.log(JSON.stringify({ index: n, steps: files.length, out }));

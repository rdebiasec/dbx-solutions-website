#!/usr/bin/env node
/** Record CDP result for index N; advance progress on success. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const raw = process.argv[3] || '{}';
const stateFile = path.join(__dirname, 'upload-run-state.json');

function loadState() {
  if (!fs.existsSync(stateFile)) {
    return { publishedThisRun: 0, failures: [], startedAt: new Date().toISOString() };
  }
  return JSON.parse(fs.readFileSync(stateFile, 'utf8'));
}

function saveState(s) {
  fs.writeFileSync(stateFile, JSON.stringify(s, null, 2) + '\n');
}

function isSuccess(v) {
  if (!v?.fill?.ok) return false;
  if (v.publish?.ok) return true;
  if (v.pub?.ok) return true;
  return false;
}

const parsed = JSON.parse(raw);
const v = parsed.result?.value ?? parsed.value ?? parsed;
const s = loadState();

if (isSuccess(v)) {
  execSync(`node ${path.join(__dirname, 'upload-queue-advance.mjs')} ${n}`, { stdio: 'inherit' });
  s.publishedThisRun++;
  console.log(JSON.stringify({ index: n, ok: true, title: v.title || v.fill?.title }));
} else {
  s.failures.push({ index: n, error: v });
  console.log(JSON.stringify({ index: n, ok: false, error: v }));
}
saveState(s);

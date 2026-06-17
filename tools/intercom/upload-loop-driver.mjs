#!/usr/bin/env node
/**
 * Automated upload loop driver — emits one index at a time for agent MCP.
 * Tracks run state in upload-run-state.json
 * Usage: node upload-loop-driver.mjs next | record N '{"result":{...}}' | summary
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const progressFile = path.join(__dirname, 'upload-progress.json');
const stateFile = path.join(__dirname, 'upload-run-state.json');
const START = 14;
const END = 83;

function loadProgress() {
  return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
}

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

const cmd = process.argv[2];

if (cmd === 'reset') {
  saveState({ publishedThisRun: 0, failures: [], startedAt: new Date().toISOString() });
  console.log('reset');
} else if (cmd === 'next') {
  const p = loadProgress();
  for (let i = START; i <= END; i++) {
    if (!p.uploaded.includes(i)) {
      const paramsFile = `/tmp/cdp-params-${i}.json`;
      if (!fs.existsSync(paramsFile)) {
        console.log(JSON.stringify({ index: i, error: 'missing_params', file: paramsFile }));
        process.exit(1);
      }
      console.log(JSON.stringify({ index: i, paramsFile }));
      process.exit(0);
    }
  }
  console.log(JSON.stringify({ index: null }));
} else if (cmd === 'record') {
  const n = Number(process.argv[3]);
  const raw = process.argv[4] || '{}';
  const parsed = JSON.parse(raw);
  const v = parsed.result?.value ?? parsed.value ?? parsed;
  const s = loadState();
  if (isSuccess(v)) {
    execSync(`node ${path.join(__dirname, 'upload-queue-advance.mjs')} ${n}`, { stdio: 'inherit' });
    s.publishedThisRun++;
    console.log(JSON.stringify({ index: n, ok: true }));
  } else {
    s.failures.push({ index: n, error: v });
    console.log(JSON.stringify({ index: n, ok: false, error: v }));
  }
  saveState(s);
} else if (cmd === 'summary') {
  const s = loadState();
  const p = loadProgress();
  console.log(
    JSON.stringify({
      publishedThisRun: s.publishedThisRun,
      failures: s.failures,
      finalUploadedCount: p.uploaded.length,
    }),
  );
} else {
  console.error('Usage: reset | next | record N JSON | summary');
  process.exit(1);
}

#!/usr/bin/env node
/**
 * Upload driver for agent MCP loop.
 *   node upload-driver.mjs next          -> next pending index or null
 *   node upload-driver.mjs params 12     -> CDP params JSON (stdout)
 *   node upload-driver.mjs result 12 '{}' -> record CDP result, advance if ok
 *   node upload-driver.mjs summary       -> {published,failures,uploadedCount}
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const progressFile = path.join(__dirname, 'upload-progress.json');
const stateFile = path.join(__dirname, 'upload-run-state.json');
const start = 7;
const end = 83;

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
  return v.ok === true && v.phase === 'publish';
}

const cmd = process.argv[2];

if (cmd === 'next') {
  const p = loadProgress();
  for (let i = start; i <= end; i++) {
    if (!p.uploaded.includes(i)) {
      console.log(JSON.stringify({ index: i }));
      process.exit(0);
    }
  }
  console.log(JSON.stringify({ index: null }));
} else if (cmd === 'params') {
  const n = Number(process.argv[3]);
  const out = execSync(`node ${path.join(__dirname, 'batch-cdp-payload.mjs')} ${n}`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
  process.stdout.write(out);
} else if (cmd === 'result') {
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
    s.failures.push({ index: n, result: v });
    console.log(JSON.stringify({ index: n, ok: false, result: v }));
  }
  saveState(s);
} else if (cmd === 'summary') {
  const s = loadState();
  const p = loadProgress();
  console.log(
    JSON.stringify({
      publishedThisRun: s.publishedThisRun,
      failures: s.failures,
      uploadedCount: p.uploaded.length,
    }),
  );
} else if (cmd === 'reset-run') {
  saveState({ publishedThisRun: 0, failures: [], startedAt: new Date().toISOString() });
  console.log('reset');
} else {
  console.error('Usage: next | params N | result N JSON | summary | reset-run');
  process.exit(1);
}

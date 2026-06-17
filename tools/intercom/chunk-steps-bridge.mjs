#!/usr/bin/env node
/** Drive chunked CDP steps via /tmp/mcp-step.json + /tmp/mcp-result.json bridge. */
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const start = Number(process.argv[3] ?? 0);
const end = Number(process.argv[4] ?? 16);
const STEP = '/tmp/mcp-step.json';
const RESULT = '/tmp/mcp-result.json';
const DONE = `/tmp/chunk-steps-${n}-done.json`;

function waitResult(ms = 300000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    if (fs.existsSync(RESULT)) {
      const data = JSON.parse(fs.readFileSync(RESULT, 'utf8'));
      try {
        fs.unlinkSync(RESULT);
      } catch {}
      return data;
    }
    execSync('sleep 0.05');
  }
  throw new Error(`timeout step ${n}`);
}

for (let s = start; s <= end; s++) {
  const args = JSON.parse(
    execSync(`node ${path.join(__dirname, 'mcp-step-args.mjs')} ${n} ${s}`, { encoding: 'utf8' }),
  );
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  fs.writeFileSync(STEP, JSON.stringify({ tool: 'browser_cdp', payload: args, index: n, step: s }));
  const res = waitResult();
  process.stderr.write(`[chunk] ${n} step ${s} ok\n`);
  if (s === end) {
    const ok =
      res?.result?.value?.ok === true ||
      res?.result?.value?.phase === 'publish' ||
      (res?.exceptionDetails?.text || '').includes('Execution context was destroyed');
    if (ok) {
      execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { stdio: 'pipe' });
    }
    fs.writeFileSync(DONE, JSON.stringify({ index: n, ok, last: res }));
    console.log(JSON.stringify({ index: n, ok, last: res }));
  }
}

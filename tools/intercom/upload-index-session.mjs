#!/usr/bin/env node
/**
 * Prepare upload payloads for one index (sessionStorage or direct+split).
 * Usage: node upload-index-session.mjs <N> [skip0]
 * Writes /tmp/upload-{N}/manifest.json and part-*.json
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const skip0 = process.argv[3] === 'skip0';
const outDir = `/tmp/upload-${n}`;
const DIRECT_MAX = 12000;

function fragmentPayload(payloadFile, outPrefix) {
  execSync(`node ${path.join(__dirname, 'fragment-cdp-payload.mjs')} ${payloadFile}`, {
    stdio: ['ignore', fs.openSync(`${outPrefix}-frag.json`, 'w'), 'inherit'],
  });
  fs.mkdirSync(`${outPrefix}-split`, { recursive: true });
  execSync(
    `node ${path.join(__dirname, 'split-frag-payload.mjs')} ${outPrefix}-frag.json ${outPrefix}-split 2800`,
    { stdio: 'inherit' },
  );
  return fs
    .readdirSync(`${outPrefix}-split`)
    .filter((f) => f.startsWith('part-'))
    .sort()
    .map((f) => `${outPrefix}-split/${f}`);
}

fs.mkdirSync(outDir, { recursive: true });
const progress = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'),
);
if (progress.uploaded.includes(n)) {
  console.log(JSON.stringify({ index: n, skip: true }));
  process.exit(0);
}

const exprFile = `/tmp/intercom-expr-${n}.json`;
if (!fs.existsSync(exprFile)) {
  execSync(`node ${path.join(__dirname, 'agent-upload-runner.mjs')} ${n}`, { stdio: 'inherit' });
}
const exprLen = JSON.parse(fs.readFileSync(exprFile, 'utf8')).cdp.params.expression.length;

let steps = [];
if (exprLen <= DIRECT_MAX) {
  const direct = path.join(outDir, 'direct.json');
  const expr = JSON.parse(fs.readFileSync(exprFile, 'utf8')).cdp.params.expression;
  fs.writeFileSync(
    direct,
    JSON.stringify({
      method: 'Runtime.evaluate',
      params: { expression: expr, awaitPromise: true, returnByValue: true },
    }),
  );
  const prefix = path.join(outDir, 'direct');
  const parts = fragmentPayload(direct, prefix);
  steps = parts.map((p, i) => ({ step: 'cdp', file: p, part: i }));
} else {
  execSync(`node ${path.join(__dirname, 'prepare-session-mcp.mjs')} ${n}${skip0 ? ' skip0' : ''}`, {
    stdio: 'inherit',
  });
  execSync(`node ${path.join(__dirname, 'prepare-frag-payloads.mjs')} ${n}${skip0 ? ' skip0' : ''}`, {
    stdio: 'inherit',
  });
  const stores = fs
    .readdirSync(`/tmp/session-mcp-${n}`)
    .filter((f) => f.startsWith('store-'))
    .map((f) => Number(f.replace('store-', '').replace('.json', '')))
    .sort((a, b) => a - b);
  for (const i of stores) {
    steps.push({ step: 'cdp', file: `/tmp/frag-${n}-${i}.json`, kind: 'store', i });
  }
  steps.push({ step: 'cdp', file: `/tmp/frag-${n}-run.json`, kind: 'run' });
}

const manifest = { index: n, exprLen, outDir, steps };
fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest));

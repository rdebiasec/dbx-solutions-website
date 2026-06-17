#!/usr/bin/env node
/**
 * Prepare 6-step chunked CDP upload for combined/N.expr (any size).
 * Usage: node prepare-chunked-upload.mjs <index>
 * Writes /tmp/chunked-upload-<index>/step-*.json
 */
import fs from 'fs';
import { execSync } from 'child_process';

const index = Number(process.argv[2]);
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const combined = `/tmp/intercom-upload/combined/${index}.expr`;
const outDir = `/tmp/chunked-upload-${index}`;

if (!fs.existsSync(combined)) {
  console.error(JSON.stringify({ error: 'missing', combined }));
  process.exit(1);
}

execSync(`node /tmp/gen-small-chunks.mjs ${index}`, { stdio: 'pipe' });
const chunkDir = `/tmp/cdp-chunks-${index}`;
const chunks = [];
for (let i = 0; ; i++) {
  const f = `${chunkDir}/chunk-${i}.json`;
  if (!fs.existsSync(f)) break;
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  const m = j.params.expression.match(/window\.__uploadB64\+=("(?:\\.|[^"\\])*");/);
  chunks.push(JSON.parse(m[1]));
}

const batches = [];
for (let i = 0; i < chunks.length; i += 4) batches.push(chunks.slice(i, i + 4).join(''));

fs.mkdirSync(outDir, { recursive: true });
const steps = [
  {
    method: 'Runtime.evaluate',
    params: { expression: 'window.__uploadB64="";({ok:true,init:true})', returnByValue: true },
    viewId: VIEW,
  },
  ...batches.map((b, i) => ({
    method: 'Runtime.evaluate',
    params: {
      expression: `window.__uploadB64+=${JSON.stringify(b)};({ok:true,b:${i},len:window.__uploadB64.length})`,
      returnByValue: true,
    },
    viewId: VIEW,
  })),
];
const run = JSON.parse(fs.readFileSync(`${chunkDir}/run.json`, 'utf8'));
run.viewId = VIEW;
steps.push(run);

steps.forEach((s, i) => fs.writeFileSync(`${outDir}/step-${i}.json`, JSON.stringify(s)));
console.log(
  JSON.stringify({
    index,
    outDir,
    steps: steps.length,
    sizes: steps.map((s) => JSON.stringify(s).length),
  }),
);

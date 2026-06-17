#!/usr/bin/env node
/** Print next pending index and CDP params path. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const start = Number(process.argv[2] ?? 7);
const end = Number(process.argv[3] ?? 83);
const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
const done = new Set(progress.uploaded);

for (let i = start; i <= end; i++) {
  if (done.has(i)) continue;
  const paramsFile = `/tmp/cdp-params-${i}.json`;
  if (!fs.existsSync(paramsFile)) {
    const { execSync } = await import('child_process');
    execSync(`node ${path.join(__dirname, 'agent-upload-runner.mjs')} ${i}`, { stdio: 'pipe' }); // eslint-disable-line
    const j = JSON.parse(fs.readFileSync(`/tmp/intercom-expr-${i}.json`, 'utf8'));
    fs.writeFileSync(paramsFile, JSON.stringify(j.cdp.params));
  }
  console.log(JSON.stringify({ index: i, paramsFile }));
  process.exit(0);
}
console.log(JSON.stringify({ done: true, uploadedCount: progress.uploaded.length }));

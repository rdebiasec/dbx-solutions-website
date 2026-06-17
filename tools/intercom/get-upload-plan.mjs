#!/usr/bin/env node
/** Print upload plan for index N using combined micro steps. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
if (progress.uploaded.includes(n)) {
  console.log(JSON.stringify({ index: n, skip: true }));
  process.exit(0);
}

const allFile = `/tmp/micro-all-${n}.json`;
const allBytes = fs.existsSync(allFile) ? fs.readFileSync(allFile, 'utf8').length : Infinity;
const maxSingle = 15000;

if (allBytes <= maxSingle) {
  console.log(JSON.stringify({ index: n, mode: 'single', file: allFile, bytes: allBytes }));
} else {
  const dir = `/tmp/micro-combined-${n}`;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
  console.log(JSON.stringify({ index: n, mode: 'parts', files: files.map((f) => `${dir}/${f}`) }));
}

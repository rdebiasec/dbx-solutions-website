#!/usr/bin/env node
/** Print pending index or CDP params for agent MCP upload loop */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const progressFile = path.join(__dirname, 'upload-progress.json');
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const cmd = process.argv[2];
const n = Number(process.argv[3]);

if (cmd === 'pending') {
  const start = Number(process.argv[3] ?? 14);
  const end = Number(process.argv[4] ?? 83);
  const p = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
  const out = [];
  for (let i = start; i <= end; i++) if (!p.uploaded.includes(i)) out.push(i);
  console.log(JSON.stringify(out));
} else if (cmd === 'cdp-args') {
  const paramsFile = `/tmp/cdp-params-${n}.json`;
  if (!fs.existsSync(paramsFile)) {
    console.error(JSON.stringify({ error: 'missing', file: paramsFile }));
    process.exit(1);
  }
  const params = JSON.parse(fs.readFileSync(paramsFile, 'utf8'));
  console.log(
    JSON.stringify({
      method: 'Runtime.evaluate',
      params,
      viewId: VIEW_ID,
    }),
  );
} else {
  console.error('Usage: pending [start] [end] | cdp-args N');
  process.exit(1);
}

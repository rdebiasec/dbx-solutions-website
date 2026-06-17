#!/usr/bin/env node
/** Execute micro steps for index N using direct CDP part files (5 calls) when under size limit. Fallback marker if too large. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const manifest = JSON.parse(fs.readFileSync(`/tmp/upload-${n}/manifest.json`, 'utf8'));
const steps = manifest.steps.map((s) => {
  const p = JSON.parse(fs.readFileSync(s.file, 'utf8'));
  return { method: p.method, params: p.params, viewId: VIEW };
});
console.log(JSON.stringify({ index: n, parts: steps.length, steps }));

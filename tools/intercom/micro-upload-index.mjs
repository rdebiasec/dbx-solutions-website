#!/usr/bin/env node
/** Prepare micro-split CDP steps for one index. Prints JSONL path + step count. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const n = Number(process.argv[2]);
const chunk = Number(process.argv[3] || 120);

execSync(`node ${path.join(__dirname, 'run-upload-index.mjs')} ${n}`, { stdio: 'pipe' });
const manifest = JSON.parse(fs.readFileSync(`/tmp/upload-${n}/manifest.json`, 'utf8'));
const outDir = `/tmp/micro-upload-${n}`;
fs.mkdirSync(outDir, { recursive: true });

const stepFiles = [];
for (const step of manifest.steps) {
  const partDir = `${outDir}/part-${step.part}`;
  execSync(`node ${path.join(__dirname, 'micro-split-invoke.mjs')} ${step.file} ${partDir} ${chunk}`, {
    stdio: 'pipe',
  });
  stepFiles.push(
    ...fs.readdirSync(partDir).filter((f) => f.startsWith('micro-')).sort((a, b) => {
      return Number(a.match(/micro-(\d+)/)[1]) - Number(b.match(/micro-(\d+)/)[1]);
    }),
  );
}

const jsonl = `${outDir}/steps.jsonl`;
const lines = [];
for (const step of manifest.steps) {
  const partDir = `${outDir}/part-${step.part}`;
  for (const f of fs
    .readdirSync(partDir)
    .filter((x) => x.startsWith('micro-'))
    .sort((a, b) => Number(a.match(/micro-(\d+)/)[1]) - Number(b.match(/micro-(\d+)/)[1]))) {
    const p = JSON.parse(fs.readFileSync(`${partDir}/${f}`, 'utf8'));
    lines.push(
      JSON.stringify({
        method: p.method,
        params: p.params,
        viewId: VIEW,
      }),
    );
  }
}
fs.writeFileSync(jsonl, lines.join('\n') + '\n');
console.log(JSON.stringify({ index: n, jsonl, steps: lines.length, exprLen: manifest.exprLen }));

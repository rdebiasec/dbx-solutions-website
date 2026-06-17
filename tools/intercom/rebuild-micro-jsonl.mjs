#!/usr/bin/env node
/** Rebuild steps.jsonl with numeric micro-N sort (fixes lexicographic bug). */
import fs from 'fs';
import path from 'path';

const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const n = Number(process.argv[2]);
const outDir = `/tmp/micro-upload-${n}`;
const manifest = JSON.parse(fs.readFileSync(`/tmp/upload-${n}/manifest.json`, 'utf8'));

function numSort(files) {
  return files
    .filter((f) => f.startsWith('micro-') && f.endsWith('.json'))
    .sort((a, b) => Number(a.match(/micro-(\d+)/)[1]) - Number(b.match(/micro-(\d+)/)[1]));
}

const lines = [];
for (const step of manifest.steps) {
  const partDir = `${outDir}/part-${step.part}`;
  for (const f of numSort(fs.readdirSync(partDir))) {
    const p = JSON.parse(fs.readFileSync(`${partDir}/${f}`, 'utf8'));
    lines.push(JSON.stringify({ method: p.method, params: p.params, viewId: VIEW }));
  }
}
const jsonl = `${outDir}/steps.jsonl`;
fs.writeFileSync(jsonl, lines.join('\n') + '\n');
console.log(JSON.stringify({ index: n, steps: lines.length, jsonl }));

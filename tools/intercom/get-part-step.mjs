#!/usr/bin/env node
/** Emit direct-split CDP steps for index N (assembled micro parts). */
import fs from 'fs';

const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const n = Number(process.argv[2]);
const part = process.argv[3];
const manifest = JSON.parse(fs.readFileSync(`/tmp/upload-${n}/manifest.json`, 'utf8'));

if (part === 'all') {
  const steps = manifest.steps.map((s) => {
    const p = JSON.parse(fs.readFileSync(s.file, 'utf8'));
    return { method: p.method, params: p.params, viewId: VIEW };
  });
  console.log(JSON.stringify({ index: n, steps: steps.length, payloads: steps }));
} else {
  const s = manifest.steps[Number(part)];
  const p = JSON.parse(fs.readFileSync(s.file, 'utf8'));
  console.log(JSON.stringify({ method: p.method, params: p.params, viewId: VIEW }));
}

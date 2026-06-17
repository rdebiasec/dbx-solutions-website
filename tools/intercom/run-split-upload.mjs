#!/usr/bin/env node
/**
 * Run one split upload index via agent MCP (prints steps as JSON for automation).
 * Usage: node run-split-upload.mjs 23
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const outDir = `/tmp/split-upload-${n}`;
fs.mkdirSync(outDir, { recursive: true });
const lines = execSync(`node ${path.join(__dirname, 'split-upload-steps.mjs')} ${n}`, {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
})
  .trim()
  .split('\n');
let stepNum = 0;
for (const line of lines) {
  const step = JSON.parse(line);
  if (step.step === 'evaluate') {
    const file = path.join(outDir, `${String(stepNum).padStart(2, '0')}-${step.label}.json`);
    fs.writeFileSync(
      file,
      JSON.stringify({
        method: step.method,
        params: step.params,
        viewId: step.viewId,
      }),
    );
    stepNum++;
  }
}
fs.writeFileSync(path.join(outDir, 'meta.json'), JSON.stringify({ index: n, steps: stepNum }));
console.log(JSON.stringify({ index: n, outDir, steps: stepNum }));

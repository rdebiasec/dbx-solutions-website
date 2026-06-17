#!/usr/bin/env node
/** Write CDP payload(s) for index N to /tmp/upload-cdp-N/ */
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const plan = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-steps.mjs')} ${n}`, { encoding: 'utf8' }),
);
const outDir = `/tmp/upload-cdp-${n}`;
fs.mkdirSync(outDir, { recursive: true });
const cdpSteps = plan.steps.filter((s) => s.action === 'cdp');
cdpSteps.forEach((s, i) => {
  fs.writeFileSync(
    `${outDir}/step-${i}.json`,
    JSON.stringify({ method: s.method, params: s.params, viewId: s.viewId }),
  );
});
console.log(JSON.stringify({ index: n, cdpSteps: cdpSteps.length, outDir }));

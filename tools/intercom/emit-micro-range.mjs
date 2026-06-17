#!/usr/bin/env node
/** Print micro step payload for index N step S (for agent MCP loop). */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const start = Number(process.argv[3]);
const end = Number(process.argv[4]);
for (let s = start; s <= end; s++) {
  const payload = execSync(`node ${path.join(__dirname, 'get-micro-step.mjs')} ${n} ${s}`, {
    encoding: 'utf8',
  });
  process.stdout.write(`${s}\t${payload}\n`);
}

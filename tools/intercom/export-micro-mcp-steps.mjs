#!/usr/bin/env node
/** Run micro CDP steps for index N via node + dynamic import of playwright over CDP from browser tab.
 * Falls back to printing steps for manual MCP if no CDP.
 * Usage: node run-micro-via-eval.mjs <index>
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const n = Number(process.argv[2]);
const jsonl = `/tmp/micro-upload-${n}/steps.jsonl`;

if (!fs.existsSync(jsonl)) {
  execSync(`node ${path.join(__dirname, 'micro-upload-index.mjs')} ${n}`, { stdio: 'inherit' });
}

const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');
const steps = lines.map((l) => JSON.parse(l));

// Export steps as individual MCP-ready files for agent batching
const outDir = `/tmp/micro-mcp-${n}`;
fs.mkdirSync(outDir, { recursive: true });
steps.forEach((step, i) => {
  fs.writeFileSync(path.join(outDir, `step-${String(i).padStart(3, '0')}.json`), JSON.stringify(step));
});
console.log(JSON.stringify({ index: n, outDir, steps: steps.length }));

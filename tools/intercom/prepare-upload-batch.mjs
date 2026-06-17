#!/usr/bin/env node
/** Prepare + print ordered MCP arg files for one index (800-char session chunks). */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

execSync(`node ${path.join(__dirname, 'prepare-session-small.mjs')} ${n}`, { stdio: 'pipe' });
const dir = `/tmp/session-mcp-${n}`;
const outDir = `/tmp/upload-batch-${n}`;
fs.mkdirSync(outDir, { recursive: true });

const files = [];
const stores = fs.readdirSync(dir).filter((f) => f.startsWith('store-')).sort();
for (const f of stores) {
  const mcp = `/tmp/s${n}-${f.replace('.json', '')}.json`;
  execSync(`node ${path.join(__dirname, 'write-mcp-call.mjs')} ${path.join(dir, f)} > ${mcp}`);
  const args = JSON.parse(fs.readFileSync(mcp, 'utf8')).arguments;
  const out = path.join(outDir, f);
  fs.writeFileSync(out, JSON.stringify(args));
  files.push(out);
}
const runMcp = `/tmp/s${n}-run.json`;
execSync(`node ${path.join(__dirname, 'write-mcp-call.mjs')} ${path.join(dir, 'run.json')} > ${runMcp}`);
const runArgs = JSON.parse(fs.readFileSync(runMcp, 'utf8')).arguments;
const runOut = path.join(outDir, 'run.json');
fs.writeFileSync(runOut, JSON.stringify(runArgs));
files.push(runOut);

console.log(JSON.stringify({ index: n, outDir, steps: files.length, files }));

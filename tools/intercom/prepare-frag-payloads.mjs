#!/usr/bin/env node
/** Upload one index via fragmented CDP payloads. Prints steps for agent or runs emit. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const skip0 = process.argv[3] === 'skip0';
const outDir = `/tmp/session-mcp-${n}`;
execSync(`node ${path.join(__dirname, 'prepare-session-mcp.mjs')} ${n}${skip0 ? ' skip0' : ''}`, {
  stdio: 'inherit',
});

const meta = JSON.parse(fs.readFileSync(path.join(outDir, 'meta.json'), 'utf8'));
const stores = fs
  .readdirSync(outDir)
  .filter((f) => f.startsWith('store-'))
  .map((f) => Number(f.replace('store-', '').replace('.json', '')))
  .sort((a, b) => a - b);

for (const i of stores) {
  const payload = `/tmp/session-mcp-${n}/store-${i}.json`;
  const frag = execSync(`node ${path.join(__dirname, 'fragment-cdp-payload.mjs')} ${payload}`, {
    encoding: 'utf8',
  });
  fs.writeFileSync(`/tmp/frag-${n}-${i}.json`, frag);
}
const runFrag = execSync(`node ${path.join(__dirname, 'fragment-cdp-payload.mjs')} ${path.join(outDir, 'run.json')}`, {
  encoding: 'utf8',
});
fs.writeFileSync(`/tmp/frag-${n}-run.json`, runFrag);
console.log(JSON.stringify({ index: n, stores, outDir, meta }));

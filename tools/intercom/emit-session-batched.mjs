#!/usr/bin/env node
/** Batch multiple sessionStorage stores per CDP call (default 3) to reduce MCP round-trips. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const batchSize = Number(process.argv[3] || 3);
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

execSync(`node ${path.join(__dirname, 'prepare-session-small.mjs')} ${n}`, { stdio: 'pipe' });
const dir = `/tmp/session-mcp-${n}`;
const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
const stores = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith('store-'))
  .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

const items = stores.map((f) => {
  const expr = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).params.expression;
  const m = expr.match(/setItem\(([^,]+),\s*([^)]+)\)/);
  return { key: JSON.parse(m[1]), value: JSON.parse(m[2]) };
});

const outDir = `/tmp/upload-batch-${n}`;
fs.mkdirSync(outDir, { recursive: true });
const steps = [];

for (let i = 0; i < items.length; i += batchSize) {
  const slice = items.slice(i, i + batchSize);
  const expression = `(() => { const items = ${JSON.stringify(slice)}; for (const {key,value} of items) sessionStorage.setItem(key,value); return {ok:true, lens: items.map(({key}) => ({k:key, len: sessionStorage.getItem(key).length}))}; })()`;
  const payload = {
    method: 'Runtime.evaluate',
    params: { expression, returnByValue: true },
    viewId: VIEW,
  };
  const f = path.join(outDir, `batch-${Math.floor(i / batchSize)}.json`);
  fs.writeFileSync(f, JSON.stringify(payload));
  steps.push(f);
}

const runExpr = JSON.parse(fs.readFileSync(path.join(dir, 'run.json'), 'utf8'));
const runPayload = { ...runExpr, viewId: VIEW };
const runFile = path.join(outDir, 'run.json');
fs.writeFileSync(runFile, JSON.stringify(runPayload));
steps.push(runFile);

console.log(JSON.stringify({ index: n, steps: steps.length, files: steps, exprLen: meta.exprLen }));

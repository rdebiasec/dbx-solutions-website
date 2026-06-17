#!/usr/bin/env node
/** Run full micro upload loop via subprocess calling agent-micro-loop + external MCP bridge. */
import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const progressFile = path.join(__dirname, 'upload-progress.json');
const indices = process.argv.slice(2).map(Number).filter((n) => !Number.isNaN(n));

function isUploaded(n) {
  const p = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
  return p.uploaded.includes(n);
}

function mcpViaAgent(tool, args) {
  const root = path.resolve(__dirname, '../..');
  const prompt = [
    'Execute ONE CallMcpTool only.',
    'server: cursor-ide-browser',
    `toolName: ${tool}`,
    `arguments: ${JSON.stringify(args)}`,
    'Return only JSON: result.result.value if present, else full result.',
  ].join('\n');
  const r = spawnSync('cursor', ['agent', '--print', '--force', '--workspace', root, prompt], {
    encoding: 'utf8',
    maxBuffer: 40 * 1024 * 1024,
    timeout: 180000,
  });
  if (r.status !== 0) throw new Error((r.stderr || r.stdout || 'agent failed').slice(0, 500));
  const text = r.stdout + r.stderr;
  for (let i = text.lastIndexOf('{'); i >= 0; i = text.lastIndexOf('{', i - 1)) {
    try {
      const parsed = JSON.parse(text.slice(i));
      return parsed.result?.value ?? parsed.result ?? parsed.value ?? parsed;
    } catch {}
  }
  throw new Error('parse fail');
}

async function runIndex(n) {
  if (isUploaded(n)) return { index: n, ok: true, skipped: true };
  try { fs.unlinkSync(`/tmp/micro-loop-${n}.json`); } catch {}

  let req = JSON.parse(execSync(`node ${path.join(__dirname, 'agent-micro-loop.mjs')} ${n}`, { encoding: 'utf8' }).trim());
  while (req.action !== 'DONE') {
    let result;
    if (req.action === 'navigate') {
      result = mcpViaAgent('browser_navigate', req.payload);
    } else {
      result = mcpViaAgent('browser_cdp', req.payload);
    }
    req = JSON.parse(
      execSync(`node ${path.join(__dirname, 'agent-micro-loop.mjs')} ${n} ${JSON.stringify(JSON.stringify(result))}`, {
        encoding: 'utf8',
      }).trim(),
    );
    if (req.action === 'cdp' && (req.step % 25 === 0 || req.step === req.total - 1)) {
      console.error(`index ${n} step ${req.step + 1}/${req.total}`);
    }
  }
  return req;
}

const results = [];
for (const n of indices) {
  try {
    console.error(`START ${n}`);
    results.push(await runIndex(n));
    console.error(`OK ${n}`);
  } catch (e) {
    results.push({ index: n, ok: false, error: String(e.message || e) });
    console.error(`FAIL ${n}: ${e.message}`);
  }
}
const p = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
console.log(JSON.stringify({ results, uploadedCount: p.uploaded.length }));

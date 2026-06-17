#!/usr/bin/env node
/** Process pending indices via split-bridge-runner + agent MCP bridge. */
import fs from 'fs';
import path from 'path';
import { execSync, spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STEP = '/tmp/mcp-step.json';
const RESULT = '/tmp/mcp-result.json';
const LOG = '/tmp/split-bridge-log.jsonl';

const pending = process.argv.slice(2).map(Number).filter((n) => !Number.isNaN(n));
if (!pending.length) {
  const p = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
  const done = new Set(p.uploaded);
  const m = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-manifest.json'), 'utf8'));
  for (let i = 0; i < m.length; i++) if (!done.has(i)) pending.push(i);
}

const results = { ok: [], fail: [] };

for (const n of pending) {
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  try {
    fs.unlinkSync(STEP);
  } catch {}

  const child = spawn('node', [path.join(__dirname, 'split-bridge-runner.mjs'), String(n)], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let stdout = '';
  let stderr = '';
  child.stdout.on('data', (d) => {
    stdout += d;
  });
  child.stderr.on('data', (d) => {
    stderr += d;
  });

  const poll = setInterval(() => {
    if (!fs.existsSync(STEP)) return;
    // agent must handle STEP file externally
  }, 100);

  await new Promise((resolve, reject) => {
    child.on('close', (code) => {
      clearInterval(poll);
      if (code === 0) {
        try {
          const r = JSON.parse(stdout.trim().split('\n').pop());
          results.ok.push(r);
        } catch {
          results.ok.push({ index: n });
        }
        resolve();
      } else {
        try {
          const r = JSON.parse(stdout.trim().split('\n').pop());
          results.fail.push(r);
        } catch {
          results.fail.push({ index: n, err: stderr || stdout });
        }
        resolve();
      }
    });
    child.on('error', reject);
  });
}

fs.appendFileSync(LOG, JSON.stringify({ ts: new Date().toISOString(), results }) + '\n');
console.log(JSON.stringify(results));

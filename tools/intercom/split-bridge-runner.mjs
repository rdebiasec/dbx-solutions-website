#!/usr/bin/env node
/**
 * Split-upload bridge for one index. Writes /tmp/mcp-step.json per action;
 * agent reads step, runs MCP, writes /tmp/mcp-result.json.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const STEP = '/tmp/mcp-step.json';
const RESULT = '/tmp/mcp-result.json';

function waitResult(timeoutMs = 300000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (fs.existsSync(RESULT)) {
      const data = JSON.parse(fs.readFileSync(RESULT, 'utf8'));
      try {
        fs.unlinkSync(RESULT);
      } catch {}
      return data;
    }
    execSync('sleep 0.1');
  }
  throw new Error('timeout waiting for mcp-result');
}

function bridge(tool, payload) {
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  fs.writeFileSync(STEP, JSON.stringify({ tool, payload, ts: Date.now() }));
  return waitResult();
}

const n = Number(process.argv[2]);
const maxRetries = Number(process.argv[3] ?? 2);
let attempt = 0;
let lastErr = null;

while (attempt <= maxRetries) {
  attempt++;
  try {
    execSync(`node ${path.join(__dirname, 'prepare-split-index.mjs')} ${n}`, { stdio: 'pipe' });
    const outDir = `/tmp/split-${n}`;

    bridge('browser_navigate', { url: URL, viewId: VIEW });
    execSync('sleep 9');

    const openRes = bridge('browser_cdp', { cdpFile: path.join(outDir, 'open.json') });
    const openVal = openRes?.result?.value ?? openRes?.value ?? openRes;
    if (!openVal?.ok) throw new Error(`open editor failed: ${JSON.stringify(openVal)}`);
    execSync('sleep 5');

    const fillRes = bridge('browser_cdp', { cdpFile: path.join(outDir, 'fill.json') });
    const fillVal = fillRes?.result?.value ?? fillRes?.value ?? fillRes;
    if (!fillVal?.ok && !fillVal?.fillRes?.ok) {
      throw new Error(`fill failed: ${JSON.stringify(fillVal)}`);
    }

    for (let s = 1; s <= 4; s++) {
      const pubRes = bridge('browser_cdp', { cdpFile: path.join(outDir, `pub-s${s}.json`) });
      const pubVal = pubRes?.result?.value ?? pubRes?.value ?? pubRes;
      if (s <= 3 && pubVal?.ok === false) {
        throw new Error(`publish s${s} failed: ${JSON.stringify(pubVal)}`);
      }
      if (s < 4) execSync('sleep 2');
    }

    execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { cwd: root });
    try {
      fs.unlinkSync(STEP);
    } catch {}
    console.log(JSON.stringify({ index: n, ok: true, attempt }));
    process.exit(0);
  } catch (e) {
    lastErr = String(e.message || e);
    if (attempt > maxRetries) break;
    execSync('sleep 3');
  }
}

try {
  fs.unlinkSync(STEP);
} catch {}
console.log(JSON.stringify({ index: n, ok: false, attempt, err: lastErr }));
process.exit(1);

#!/usr/bin/env node
/**
 * File-bridge driver for single-expr bulk upload (batch-cdp-payload workflow).
 * Agent loop: read /tmp/mcp-step.json -> MCP -> write /tmp/mcp-result.json
 * Usage: node glass-single-expr-bridge.mjs [start] [end]
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
const REPORT = '/tmp/glass-bridge-report.json';
const start = Number(process.argv[2] ?? 11);
const end = Number(process.argv[3] ?? 83);

function waitResult(timeoutMs = 240000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
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

function loadProgress() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
}

function ensurePayload(n) {
  const f = `/tmp/cdp-payload-${n}.json`;
  if (!fs.existsSync(f)) {
    execSync(`node ${path.join(__dirname, 'batch-cdp-payload.mjs')} ${n} > ${f}`, { cwd: root });
  }
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}

function isSuccess(v) {
  if (!v) return false;
  if (v.ok === true && v.fill?.ok !== false && v.pub?.ok !== false) return true;
  return v.fill?.ok && v.pub?.ok !== false;
}

const published = [];
const failures = [];

for (let n = start; n <= end; n++) {
  const p = loadProgress();
  if (p.uploaded.includes(n)) continue;

  let ok = false;
  for (let tryN = 0; tryN <= 2 && !ok; tryN++) {
    try {
      const params = ensurePayload(n);
      bridge('browser_navigate', { url: URL, viewId: VIEW });
      execSync('sleep 10');
      const res = bridge('browser_cdp', {
        method: 'Runtime.evaluate',
        params,
        viewId: VIEW,
      });
      const v = res?.result?.value ?? res?.value ?? res;
      if (isSuccess(v) || /context was destroyed/i.test(JSON.stringify(res))) {
        execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { cwd: root });
        published.push(n);
        ok = true;
        process.stderr.write(`OK ${n}\n`);
      } else if (tryN === 2) {
        failures.push({ index: n, error: v });
        process.stderr.write(`FAIL ${n}\n`);
      }
    } catch (e) {
      if (tryN === 2) failures.push({ index: n, error: String(e.message || e) });
    }
  }
}

const final = loadProgress();
const report = {
  published,
  failures,
  finalUploadedCount: final.uploaded.length,
  total: final.total,
};
fs.writeFileSync(REPORT, JSON.stringify(report, null, 2));
try {
  fs.unlinkSync(STEP);
} catch {}
console.log(JSON.stringify(report));

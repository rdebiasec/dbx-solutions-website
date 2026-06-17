#!/usr/bin/env node
/**
 * Upload remaining indices: navigate + sleep + combined get-cdp-call (fill+publish).
 * MCP bridge via /tmp/agent-action.json
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
const ACTION = '/tmp/agent-action.json';
const RESULT = '/tmp/agent-action-result.json';
const SKIP = new Set([81, 82, 83]);

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
  throw new Error('timeout');
}

function mcp(payload) {
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  fs.writeFileSync(ACTION, JSON.stringify(payload));
  return waitResult();
}

const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
const done = new Set(progress.uploaded);
const pending = [];
for (let i = 0; i <= 83; i++) {
  if (SKIP.has(i)) continue;
  if (!done.has(i)) pending.push(i);
}

const results = { ok: [], fail: [] };
const maxRetries = 2;

for (const n of pending) {
  let success = false;
  let lastErr = null;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      mcp({ tool: 'browser_navigate', payload: { url: URL, viewId: VIEW }, index: n, step: 'navigate' });
      execSync('sleep 10');
      const cdp = JSON.parse(
        execSync(`node ${path.join(__dirname, 'get-cdp-call.mjs')} ${n}`, {
          encoding: 'utf8',
          maxBuffer: 20 * 1024 * 1024,
        }),
      );
      const rawFile = `/tmp/cdp-raw-${n}.json`;
      const chunkOut = `/tmp/cdp-chunk-${n}.json`;
      fs.writeFileSync(rawFile, JSON.stringify(cdp));
      execSync(`node ${path.join(__dirname, 'cdp-chunk-from-json.mjs')} ${rawFile} cdp${n}_ ${chunkOut}`, {
        stdio: 'pipe',
      });
      const chunked = JSON.parse(fs.readFileSync(chunkOut, 'utf8'));
      for (let s = 0; s < chunked.stores.length; s++) {
        mcp({ tool: 'browser_cdp', payload: chunked.stores[s], index: n, step: `store-${s}` });
      }
      const fillRes = mcp({ tool: 'browser_cdp', payload: chunked.run, index: n, step: 'run' });
      const val = fillRes?.result?.value ?? fillRes?.value ?? fillRes;
      if (!val?.ok && val?.phase !== 'publish') {
        throw new Error(JSON.stringify(val));
      }
      execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { cwd: root });
      results.ok.push({ index: n, title: val?.title });
      success = true;
      break;
    } catch (e) {
      lastErr = String(e.message || e);
      execSync('sleep 3');
    }
  }
  if (!success) results.fail.push({ index: n, err: lastErr });
}

try {
  fs.unlinkSync(ACTION);
} catch {}
console.log(JSON.stringify({ ...results, uploaded: results.ok.length, failed: results.fail.length }));

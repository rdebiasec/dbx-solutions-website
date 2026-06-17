#!/usr/bin/env node
/**
 * Upload pending indices via sessionStorage CDP steps + cursor agent MCP bridge.
 * Usage: node run-session-upload-pending.mjs [startIndex] [endIndex]
 */
import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const progressFile = path.join(__dirname, 'upload-progress.json');

function loadProgress() {
  return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
}

function pendingList() {
  const p = loadProgress();
  const all = Array.from({ length: p.total || 84 }, (_, i) => i);
  return all.filter((i) => !p.uploaded.includes(i));
}

function agentMcp(toolName, args, timeout = 180000) {
  const prompt = [
    'Execute ONE CallMcpTool only.',
    'server: cursor-ide-browser',
    `toolName: ${toolName}`,
    `arguments: ${JSON.stringify(args)}`,
    'Return only JSON: result.result.value if present, else full result.',
  ].join('\n');
  const r = spawnSync('cursor', ['agent', '--print', '--force', '--workspace', root, prompt], {
    encoding: 'utf8',
    maxBuffer: 40 * 1024 * 1024,
    timeout,
  });
  if (r.status !== 0) {
    throw new Error((r.stderr || r.stdout || 'agent failed').slice(0, 800));
  }
  const text = r.stdout + r.stderr;
  for (let i = text.lastIndexOf('{'); i >= 0; i = text.lastIndexOf('{', i - 1)) {
    try {
      const parsed = JSON.parse(text.slice(i));
      return parsed.result?.value ?? parsed.result ?? parsed.value ?? parsed;
    } catch {
      /* continue */
    }
  }
  throw new Error(`parse fail: ${text.slice(-500)}`);
}

function getSessionStep(n, step) {
  return JSON.parse(
    execSync(`node ${path.join(__dirname, 'get-session-cdp-step.mjs')} ${n} ${step}`, {
      encoding: 'utf8',
    }),
  );
}

function uploadIndex(n) {
  execSync(`node ${path.join(__dirname, 'prepare-session-mcp.mjs')} ${n}`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
  const dir = `/tmp/session-mcp-${n}`;
  const stores = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith('store-'))
    .map((f) => Number(f.replace('store-', '').replace('.json', '')))
    .sort((a, b) => a - b);

  console.error(`[session] index ${n}: ${stores.length} stores`);

  agentMcp('browser_lock', { action: 'lock', viewId: VIEW_ID }, 30000);
  agentMcp('browser_navigate', { url: URL, viewId: VIEW_ID }, 90000);

  for (const i of stores) {
    const payload = getSessionStep(n, String(i));
    const res = agentMcp('browser_cdp', payload, 60000);
    if (!res?.ok) console.error(`[session] store ${i} warn:`, JSON.stringify(res).slice(0, 200));
  }

  const runPayload = getSessionStep(n, 'run');
  const last = agentMcp('browser_cdp', runPayload, 180000);

  const raw = JSON.stringify({ result: { value: last } }).replace(/'/g, "'\\''");
  const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${raw}'`, {
    encoding: 'utf8',
    cwd: root,
  }).trim();
  const rec = JSON.parse(recOut.split('\n').pop());
  return { index: n, ok: rec.ok, title: rec.title, stores: stores.length };
}

const startIdx = process.argv[2] ? Number(process.argv[2]) : null;
const endIdx = process.argv[3] ? Number(process.argv[3]) : null;
let pending = pendingList();
if (startIdx != null) pending = pending.filter((i) => i >= startIdx);
if (endIdx != null) pending = pending.filter((i) => i <= endIdx);

const results = [];
for (const n of pending) {
  try {
    results.push(uploadIndex(n));
    console.error(`[session] OK ${n}`);
  } catch (e) {
    results.push({ index: n, ok: false, error: String(e.message || e) });
    console.error(`[session] FAIL ${n}: ${e.message || e}`);
  }
}

const final = loadProgress();
console.log(
  JSON.stringify({
    results,
    uploadedCount: final.uploaded.length,
    uploadedThisRun: results.filter((r) => r.ok).length,
    failures: results.filter((r) => !r.ok),
  }),
);

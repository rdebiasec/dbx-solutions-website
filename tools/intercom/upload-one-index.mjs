#!/usr/bin/env node
/** Upload one index: navigate → sleep → CDP → append. Uses cursor agent for MCP. */
import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const n = Number(process.argv[2]);
const SPLIT = new Set([43, 56, 69]);

function agentMcp(toolName, args, timeout = 180000) {
  const prompt = [
    'Execute ONE CallMcpTool only.',
    'server: cursor-ide-browser',
    `toolName: ${toolName}`,
    `arguments: ${JSON.stringify(args)}`,
    'Return only JSON: full MCP result object.',
  ].join('\n');
  const r = spawnSync('cursor', ['agent', '--print', '--force', '--workspace', root], {
    input: prompt,
    encoding: 'utf8',
    maxBuffer: 40 * 1024 * 1024,
    timeout,
  });
  const text = (r.stdout || '') + (r.stderr || '');
  if (r.error?.code === 'ETIMEDOUT') throw new Error('agent timeout');
  for (let i = text.lastIndexOf('{'); i >= 0; i = text.lastIndexOf('{', i - 1)) {
    try {
      return JSON.parse(text.slice(i));
    } catch {}
  }
  if (/context was destroyed/i.test(text)) return { contextDestroyed: true };
  throw new Error(`parse fail: ${text.slice(-400)}`);
}

function isSuccess(res) {
  const v = res?.result?.value ?? res?.value ?? res;
  if (res?.contextDestroyed) return true;
  if (!v) return false;
  if (v.ok === true && v.fill?.ok !== false && v.pub?.ok !== false) return true;
  return v.fill?.ok && v.pub?.ok !== false;
}

function ensurePayload(index) {
  const f = `/tmp/cdp-payload-${index}.json`;
  if (!fs.existsSync(f)) {
    execSync(`node ${path.join(__dirname, 'batch-cdp-payload.mjs')} ${index} > ${f}`, { cwd: root });
  }
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}

const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
if (progress.uploaded.includes(n)) {
  console.log(JSON.stringify({ skip: true, index: n }));
  process.exit(0);
}

if (SPLIT.has(n)) {
  console.log(JSON.stringify({ split: true, index: n, hint: 'use bridge-parts.mjs' }));
  process.exit(2);
}

let ok = false;
for (let tryN = 0; tryN <= 2 && !ok; tryN++) {
  try {
    agentMcp('browser_navigate', { url: URL, viewId: VIEW }, 90000);
    execSync('sleep 10');
    const params = ensurePayload(n);
    const res = agentMcp('browser_cdp', { method: 'Runtime.evaluate', params, viewId: VIEW }, 180000);
    if (isSuccess(res)) {
      execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { cwd: root });
      ok = true;
      console.log(JSON.stringify({ ok: true, index: n }));
    }
  } catch (e) {
    if (tryN === 2) {
      console.log(JSON.stringify({ ok: false, index: n, error: String(e.message || e) }));
      process.exit(1);
    }
  }
}
if (!ok) process.exit(1);

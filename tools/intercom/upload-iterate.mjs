#!/usr/bin/env node
/**
 * Stateful upload driver for agent MCP loop.
 * init [start] [end] | next | result '<json>'
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const STATE = '/tmp/upload-iterate-state.json';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const SPLIT = new Set([43, 56, 69]);
const cmd = process.argv[2];

function load() {
  return JSON.parse(fs.readFileSync(STATE, 'utf8'));
}
function save(s) {
  fs.writeFileSync(STATE, JSON.stringify(s, null, 2));
}
function progress() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
}
function ensurePayload(n) {
  const f = `/tmp/cdp-payload-${n}.json`;
  if (!fs.existsSync(f)) {
    execSync(`node ${path.join(__dirname, 'batch-cdp-payload.mjs')} ${n} > ${f}`, { cwd: root });
  }
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}

if (cmd === 'init') {
  const start = Number(process.argv[3] ?? 19);
  const end = Number(process.argv[4] ?? 83);
  const p = progress();
  const pending = [];
  for (let n = start; n <= end; n++) {
    if (!p.uploaded.includes(n)) pending.push(n);
  }
  save({
    pending,
    idx: 0,
    phase: 'navigate',
    retries: 0,
    published: [],
    failures: [],
    current: null,
  });
  console.log(JSON.stringify({ ok: true, count: pending.length, pending: pending.slice(0, 10) }));
  process.exit(0);
}

if (cmd === 'result') {
  const result = JSON.parse(process.argv[3] || '{}');
  const s = load();
  const n = s.current;

  if (s.phase === 'cdp') {
    const v = result?.result?.value ?? result?.value ?? result;
    const ok =
      result?.contextDestroyed ||
      /context was destroyed/i.test(JSON.stringify(result)) ||
      (v?.ok === true && v?.fill?.ok !== false && v?.pub?.ok !== false) ||
      (v?.fill?.ok && v?.pub?.ok !== false);
    if (!ok) {
      if (s.retries < 2) {
        s.retries++;
        s.phase = 'navigate';
        save(s);
        console.log(JSON.stringify({ action: 'retry', index: n, retries: s.retries, err: v }));
        process.exit(0);
      }
      s.failures.push({ index: n, error: v });
      s.idx++;
      s.phase = 'navigate';
      s.retries = 0;
      s.current = null;
      save(s);
      console.log(JSON.stringify({ action: 'failed', index: n }));
      process.exit(0);
    }
    execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { cwd: root });
    s.published.push(n);
    s.idx++;
    s.phase = 'navigate';
    s.retries = 0;
    s.current = null;
    save(s);
    console.log(JSON.stringify({ action: 'done', index: n, count: s.published.length }));
    process.exit(0);
  }

  if (s.phase === 'navigate') {
    s.phase = 'sleep';
    save(s);
  } else if (s.phase === 'sleep') {
    s.phase = 'cdp';
    save(s);
  }
}

const s = load();
while (s.idx < s.pending.length) {
  const n = s.pending[s.idx];
  if (SPLIT.has(n)) {
    s.failures.push({ index: n, error: 'split required - use bridge-parts' });
    s.idx++;
    continue;
  }
  s.current = n;

  if (s.phase === 'navigate') {
    save(s);
    console.log(JSON.stringify({ action: 'navigate', index: n, tool: 'browser_navigate', args: { url: URL, viewId: VIEW } }));
    process.exit(0);
  }
  if (s.phase === 'sleep') {
    save(s);
    console.log(JSON.stringify({ action: 'sleep', index: n, ms: 10000 }));
    process.exit(0);
  }
  if (s.phase === 'cdp') {
    ensurePayload(n);
    save(s);
    console.log(
      JSON.stringify({
        action: 'cdp',
        index: n,
        tool: 'browser_cdp',
        payloadFile: `/tmp/cdp-payload-${n}.json`,
        viewId: VIEW,
      }),
    );
    process.exit(0);
  }
}

const p = progress();
console.log(
  JSON.stringify({
    action: 'ALL_DONE',
    published: s.published,
    failures: s.failures,
    total: p.uploaded.length,
  }),
);

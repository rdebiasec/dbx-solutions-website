#!/usr/bin/env node
/**
 * Fast upload bridge: 5 MCP actions per index (navigate, preTitle, fill_title, bodyFill, postFill).
 * init | next | result '<json>'
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const STATE = '/tmp/fast-upload-state.json';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const cmd = process.argv[2];

const ACTIONS = ['navigate', 'sleep10', 'preTitle', 'sleep8', 'fill_title', 'bodyFill', 'sleep1', 'postFill', 'append'];

function load() {
  return JSON.parse(fs.readFileSync(STATE, 'utf8'));
}
function save(s) {
  fs.writeFileSync(STATE, JSON.stringify(s, null, 2));
}

function prepareIndex(n) {
  execSync(`node ${path.join(__dirname, 'build-parts-steps.mjs')} ${n}`, { cwd: root, stdio: 'pipe' });
  execSync(`node ${path.join(__dirname, 'combine-cdp-steps.mjs')} ${n}`, { cwd: root, stdio: 'pipe' });
  return JSON.parse(fs.readFileSync(`/tmp/combined-cdp-${n}.json`, 'utf8'));
}

if (cmd === 'init') {
  const queue = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-pending-queue.json'), 'utf8'));
  const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
  const pending = queue.pending.filter((n) => !progress.uploaded.includes(n));
  save({ pending, idx: 0, action: 0, combined: null, index: null, retries: 0, published: [], failures: [] });
  console.log(JSON.stringify({ ok: true, count: pending.length }));
  process.exit(0);
}

if (cmd === 'result') {
  const result = JSON.parse(process.argv[3] || '{}');
  const s = load();
  const act = ACTIONS[s.action];

  if (result?.ok === false && !result?.contextDestroyed && act !== 'sleep10' && act !== 'sleep8' && act !== 'sleep1') {
    if (s.retries < 2) {
      s.retries++;
      save(s);
      console.log(JSON.stringify({ action: 'retry', index: s.index, step: act, retries: s.retries }));
      process.exit(0);
    }
  }

  if (act === 'append') {
    s.published.push(s.index);
    s.idx++;
    s.action = 0;
    s.combined = null;
    s.retries = 0;
    save(s);
    console.log(JSON.stringify({ action: 'index_done', index: s.index }));
    process.exit(0);
  }

  s.action++;
  s.retries = 0;
  save(s);
}

const s = load();

while (s.idx < s.pending.length) {
  if (!s.combined) {
    s.index = s.pending[s.idx];
    try {
      s.combined = prepareIndex(s.index);
      s.action = 0;
      save(s);
    } catch (e) {
      if (s.retries < 2) {
        s.retries++;
        save(s);
        console.log(JSON.stringify({ action: 'retry_build', index: s.index, err: String(e.message) }));
        process.exit(0);
      }
      s.failures.push(s.index);
      s.idx++;
      s.combined = null;
      s.retries = 0;
      save(s);
      continue;
    }
  }

  if (s.action >= ACTIONS.length) {
    execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${s.index}`, { cwd: root, stdio: 'pipe' });
    s.published.push(s.index);
    s.idx++;
    s.action = 0;
    s.combined = null;
    save(s);
    continue;
  }

  const act = ACTIONS[s.action];
  const c = s.combined;

  if (act === 'navigate') {
    console.log(JSON.stringify({ action: act, index: s.index, url: URL, viewId: VIEW }));
    process.exit(0);
  }
  if (act.startsWith('sleep')) {
    const ms = act === 'sleep10' ? 10000 : act === 'sleep8' ? 8000 : 1000;
    console.log(JSON.stringify({ action: act, index: s.index, ms }));
    process.exit(0);
  }
  if (act === 'preTitle') {
    console.log(
      JSON.stringify({
        action: act,
        index: s.index,
        method: 'Runtime.evaluate',
        params: { expression: c.preTitle, awaitPromise: true, returnByValue: true },
        viewId: VIEW,
      }),
    );
    process.exit(0);
  }
  if (act === 'fill_title') {
    console.log(JSON.stringify({ action: act, index: s.index, title: c.title, viewId: VIEW }));
    process.exit(0);
  }
  if (act === 'bodyFill') {
    console.log(
      JSON.stringify({
        action: act,
        index: s.index,
        method: 'Runtime.evaluate',
        params: { expression: c.bodyFill, awaitPromise: true, returnByValue: true },
        viewId: VIEW,
      }),
    );
    process.exit(0);
  }
  if (act === 'postFill') {
    console.log(
      JSON.stringify({
        action: act,
        index: s.index,
        method: 'Runtime.evaluate',
        params: { expression: c.postFill, awaitPromise: true, returnByValue: true },
        viewId: VIEW,
      }),
    );
    process.exit(0);
  }
  if (act === 'append') {
    execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${s.index}`, { cwd: root, stdio: 'pipe' });
    s.published.push(s.index);
    s.idx++;
    s.action = 0;
    s.combined = null;
    save(s);
    continue;
  }
}

console.log(JSON.stringify({ action: 'DONE', published: s.published, failures: s.failures }));

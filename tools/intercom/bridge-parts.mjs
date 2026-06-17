#!/usr/bin/env node
/**
 * File-bridge MCP driver for build-parts-steps uploads (single tab).
 * Init:  node bridge-parts.mjs init
 * Next:  node bridge-parts.mjs next        -> prints action JSON or DONE
 * Done:  node bridge-parts.mjs result '<json>'
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const STATE = '/tmp/bridge-parts-state.json';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const cmd = process.argv[2];

function load() {
  return JSON.parse(fs.readFileSync(STATE, 'utf8'));
}
function save(s) {
  fs.writeFileSync(STATE, JSON.stringify(s, null, 2));
}

if (cmd === 'init') {
  const queue = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-pending-queue.json'), 'utf8'));
  const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
  const pending = queue.pending.filter((n) => !progress.uploaded.includes(n));
  save({
    pending,
    idx: 0,
    step: 0,
    steps: null,
    index: null,
    title: null,
    retries: 0,
    published: [],
    failures: [],
  });
  console.log(JSON.stringify({ ok: true, count: pending.length }));
  process.exit(0);
}

if (cmd === 'result') {
  const result = JSON.parse(process.argv[3] || '{}');
  const s = load();
  const step = s.steps[s.step];

  if (step?.action === 'cdp' && result?.ok === false && !result?.contextDestroyed) {
    if (s.retries < 2) {
      s.retries++;
      save(s);
      console.log(JSON.stringify({ action: 'retry', index: s.index, step: s.step, retries: s.retries }));
      process.exit(0);
    }
  }

  if (step?.action === 'append') {
    s.published.push(s.index);
    s.idx++;
    s.step = 0;
    s.steps = null;
    s.retries = 0;
    save(s);
    console.log(JSON.stringify({ action: 'index_done', index: s.index, published: s.published.length }));
    process.exit(0);
  }

  s.step++;
  s.retries = 0;
  save(s);
}

const s = load();

while (s.idx < s.pending.length) {
  if (!s.steps) {
    s.index = s.pending[s.idx];
    try {
      execSync(`node ${path.join(__dirname, 'build-parts-steps.mjs')} ${s.index}`, { cwd: root, stdio: 'pipe' });
      const plan = JSON.parse(fs.readFileSync(`/tmp/upload-steps-${s.index}.json`, 'utf8'));
      if (plan.skip) {
        s.published.push(s.index);
        s.idx++;
        save(s);
        continue;
      }
      s.steps = plan.steps;
      s.title = plan.title;
      s.step = 0;
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
      s.steps = null;
      s.retries = 0;
      save(s);
      continue;
    }
  }

  if (s.step >= s.steps.length) {
    execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${s.index}`, { cwd: root, stdio: 'pipe' });
    s.published.push(s.index);
    s.idx++;
    s.step = 0;
    s.steps = null;
    save(s);
    continue;
  }

  const step = s.steps[s.step];
  if (step.action === 'navigate') {
    console.log(JSON.stringify({ action: 'navigate', index: s.index, step: s.step, url: step.url, viewId: VIEW }));
    process.exit(0);
  }
  if (step.action === 'sleep') {
    console.log(JSON.stringify({ action: 'sleep', index: s.index, step: s.step, ms: step.ms }));
    process.exit(0);
  }
  if (step.action === 'cdp') {
    const params = { expression: step.expression, returnByValue: true };
    if (step.awaitPromise) params.awaitPromise = true;
    console.log(
      JSON.stringify({
        action: 'cdp',
        index: s.index,
        step: s.step,
        method: 'Runtime.evaluate',
        params,
        viewId: VIEW,
      }),
    );
    process.exit(0);
  }
  if (step.action === 'fill_title') {
    console.log(
      JSON.stringify({ action: 'fill_title', index: s.index, step: s.step, title: step.title, viewId: VIEW }),
    );
    process.exit(0);
  }
  if (step.action === 'append') {
    execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${s.index}`, { cwd: root, stdio: 'pipe' });
    s.published.push(s.index);
    s.idx++;
    s.step = 0;
    s.steps = null;
    save(s);
    continue;
  }

  s.step++;
  save(s);
}

console.log(JSON.stringify({ action: 'DONE', published: s.published, failures: s.failures }));

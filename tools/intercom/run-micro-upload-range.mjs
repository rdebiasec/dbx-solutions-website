#!/usr/bin/env node
/**
 * Upload indices via micro steps: get-micro-step.mjs + browser_cdp + record-upload-result.mjs
 * Usage: node run-micro-upload-range.mjs [start] [end]
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
const start = Number(process.argv[2] ?? 41);
const end = Number(process.argv[3] ?? 45);

function loadProgress() {
  return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
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
  const idx = text.lastIndexOf('{');
  if (idx < 0) throw new Error(`no json: ${text.slice(0, 300)}`);
  for (let i = idx; i >= 0; i = text.lastIndexOf('{', i - 1)) {
    try {
      const parsed = JSON.parse(text.slice(i));
      return parsed.result?.value ?? parsed.result ?? parsed.value ?? parsed;
    } catch {
      /* try earlier */
    }
  }
  throw new Error(`parse fail: ${text.slice(-500)}`);
}

function stepCount(n) {
  const jsonl = `/tmp/micro-upload-${n}/steps.jsonl`;
  if (!fs.existsSync(jsonl)) throw new Error(`missing ${jsonl}`);
  return fs.readFileSync(jsonl, 'utf8').trim().split('\n').length;
}

function getMicroStep(n, step) {
  return JSON.parse(
    execSync(`node ${path.join(__dirname, 'get-micro-step.mjs')} ${n} ${step}`, { encoding: 'utf8' }),
  );
}

function uploadIndex(n) {
  const total = stepCount(n);
  console.error(`[micro] index ${n}: ${total} steps`);

  agentMcp('browser_navigate', { url: URL, viewId: VIEW_ID }, 90000);

  let last;
  for (let s = 0; s < total; s++) {
    const payload = getMicroStep(n, s);
    const timeout = payload.params?.awaitPromise ? 180000 : 60000;
    last = agentMcp('browser_cdp', payload, timeout);
    if (s % 20 === 0 || s === total - 1) {
      console.error(`[micro] index ${n} step ${s + 1}/${total}`);
    }
  }

  const raw = JSON.stringify({ result: { value: last } }).replace(/'/g, "'\\''");
  const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${raw}'`, {
    encoding: 'utf8',
    cwd: root,
  }).trim();
  const rec = JSON.parse(recOut.split('\n').pop());
  return { index: n, ok: rec.ok, steps: total, title: rec.title };
}

const results = [];
for (let n = start; n <= end; n++) {
  const p = loadProgress();
  if (p.uploaded.includes(n)) {
    console.error(`[micro] SKIP ${n} (already uploaded)`);
    results.push({ index: n, ok: true, skipped: true });
    continue;
  }
  try {
    results.push(uploadIndex(n));
    console.error(`[micro] OK ${n}`);
  } catch (e) {
    results.push({ index: n, ok: false, error: String(e.message || e) });
    console.error(`[micro] FAIL ${n}: ${e.message || e}`);
  }
}

const final = loadProgress();
console.log(
  JSON.stringify({
    results,
    uploadedCount: final.uploaded.length,
    uploadedThisRun: results.filter((r) => r.ok && !r.skipped).length,
  }),
);

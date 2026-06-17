#!/usr/bin/env node
/**
 * Automated split Intercom upload via cursor agent MCP bridge.
 * Usage: node auto-split-upload-batch.mjs [start] [end]
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
const stateFile = path.join(__dirname, 'upload-run-state.json');
const start = Number(process.argv[2] ?? 7);
const end = Number(process.argv[3] ?? 83);

function loadProgress() {
  return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
}
function loadState() {
  if (!fs.existsSync(stateFile)) {
    return { publishedThisRun: 0, failures: [], startedAt: new Date().toISOString() };
  }
  return JSON.parse(fs.readFileSync(stateFile, 'utf8'));
}
function saveState(s) {
  fs.writeFileSync(stateFile, JSON.stringify(s, null, 2) + '\n');
}

function agentMcp(toolName, args, timeout = 120000) {
  const prompt = [
    `Execute ONE CallMcpTool only.`,
    `server: cursor-ide-browser`,
    `toolName: ${toolName}`,
    `arguments: ${JSON.stringify(args)}`,
    `Report only the tool result JSON (result.result.value if present).`,
  ].join('\n');
  const r = spawnSync('cursor', ['agent', '--print', '--force', '--workspace', root, prompt], {
    encoding: 'utf8',
    maxBuffer: 30 * 1024 * 1024,
    timeout,
  });
  if (r.status !== 0) throw new Error(r.stderr?.slice(0, 500) || r.stdout?.slice(0, 500) || 'agent failed');
  const m = r.stdout.match(/\{[\s\S]*\}/);
  if (!m) throw new Error(`no json in output: ${r.stdout.slice(0, 300)}`);
  const parsed = JSON.parse(m[0]);
  return parsed.result?.value ?? parsed.value ?? parsed;
}

function uploadIndex(n) {
  execSync(`node ${path.join(__dirname, 'run-split-upload.mjs')} ${n}`, { stdio: 'pipe' });
  const outDir = `/tmp/split-upload-${n}`;
  const meta = JSON.parse(fs.readFileSync(path.join(outDir, 'meta.json'), 'utf8'));
  const files = fs
    .readdirSync(outDir)
    .filter((f) => f.endsWith('.json') && f !== 'meta.json')
    .sort();

  agentMcp('browser_navigate', { url: URL, viewId: VIEW_ID }, 90000);

  let fillOk = false;
  let pubOk = false;
  for (const f of files) {
    const payload = JSON.parse(fs.readFileSync(path.join(outDir, f), 'utf8'));
    const label = f.replace(/^\d+-/, '').replace('.json', '');
    const res = agentMcp('browser_cdp', payload, 120000);
    if (label === 'fill') fillOk = !!res?.ok && !!res?.fill?.ok;
    if (label.startsWith('publish')) pubOk = res?.ok !== false;
    if (res?.ok === false) throw new Error(`${label}: ${JSON.stringify(res)}`);
  }
  if (!fillOk || !pubOk) throw new Error(`verify failed fill=${fillOk} pub=${pubOk}`);
  execSync(`node ${path.join(__dirname, 'upload-queue-advance.mjs')} ${n}`, { stdio: 'inherit' });
  return { ok: true, index: n };
}

const state = loadState();
const failures = state.failures || [];
let published = state.publishedThisRun || 0;

for (let i = start; i <= end; i++) {
  const p = loadProgress();
  if (p.uploaded.includes(i)) continue;
  try {
    console.error(`[upload] index ${i}`);
    uploadIndex(i);
    published++;
    console.error(`[upload] OK ${i}`);
  } catch (e) {
    failures.push({ index: i, error: String(e.message || e) });
    console.error(`[upload] FAIL ${i}: ${e.message || e}`);
  }
  saveState({ ...state, publishedThisRun: published, failures });
}

const final = loadProgress();
console.log(JSON.stringify({ publishedThisRun: published, failures, finalUploadedCount: final.uploaded.length }));

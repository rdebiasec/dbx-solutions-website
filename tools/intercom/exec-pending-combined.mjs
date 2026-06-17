#!/usr/bin/env node
/**
 * Upload pending indices via cursor agent MCP bridge (combined expr / session chunks).
 * Usage: node exec-pending-combined.mjs [start] [end]
 */
import fs from 'fs';
import path from 'path';
import { spawnSync, execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const progressFile = path.join(__dirname, 'upload-progress.json');
const stateFile = path.join(__dirname, 'upload-run-state.json');
const start = Number(process.argv[2] ?? 29);
const end = Number(process.argv[3] ?? 80);

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
  let parsed;
  for (let i = idx; i >= 0; i = text.lastIndexOf('{', i - 1)) {
    try {
      parsed = JSON.parse(text.slice(i));
      break;
    } catch {
      /* try earlier */
    }
  }
  if (!parsed) throw new Error(`parse fail: ${text.slice(-500)}`);
  return parsed.result?.value ?? parsed.result ?? parsed.value ?? parsed;
}

function isOk(v) {
  if (!v || v.ok === false) return false;
  if (v.fill?.ok === false) return false;
  if (v.phase === 'poll') return false;
  return v.ok === true || v.fill?.ok || v.pub?.ok !== false || v.step === 'done';
}

const state = loadState();
const uploadedThisRun = [];
const failures = state.failures || [];

for (let n = start; n <= end; n++) {
  const p = loadProgress();
  if (p.uploaded.includes(n)) continue;

  try {
    const plan = JSON.parse(
      execSync(`node ${path.join(__dirname, 'get-upload-steps.mjs')} ${n}`, { encoding: 'utf8' }),
    );
    let last;
    for (const step of plan.steps) {
      if (step.action === 'navigate') {
        agentMcp('browser_navigate', { url: step.url, viewId: step.viewId }, 90000);
        continue;
      }
      if (step.action === 'cdp') {
        last = agentMcp(
          'browser_cdp',
          { method: step.method, params: step.params, viewId: step.viewId },
          180000,
        );
        continue;
      }
      if (step.action === 'append') {
        if (!isOk(last)) throw new Error(`bad result: ${JSON.stringify(last)?.slice(0, 400)}`);
        execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { stdio: 'inherit' });
      }
    }
    uploadedThisRun.push(n);
    console.error(`OK ${n}`);
  } catch (e) {
    failures.push({ index: n, error: String(e.message || e) });
    console.error(`FAIL ${n}: ${e.message || e}`);
  }
  saveState({ ...state, publishedThisRun: uploadedThisRun.length, failures });
}

const final = loadProgress();
const report = {
  uploadedThisRun,
  failures,
  progressCount: final.uploaded.length,
};
fs.writeFileSync(path.join(__dirname, 'upload-final-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));

#!/usr/bin/env node
/**
 * Drive build-parts-steps uploads via cursor agent MCP (single tab, sequential).
 * Usage: node drive-parts-upload.mjs [startIndex] [endIndex]
 */
import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const progressFile = path.join(__dirname, 'upload-progress.json');
const queueFile = path.join(__dirname, 'upload-pending-queue.json');
const logFile = `/tmp/drive-parts-upload-${Date.now()}.log`;

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  fs.appendFileSync(logFile, line + '\n');
  console.error(line);
}

function sleep(ms) {
  execSync(`sleep ${Math.max(1, Math.ceil(ms / 1000))}`, { stdio: 'ignore' });
}

function agentMcp(toolName, args, timeout = 180000) {
  const prompt = [
    'Execute ONE CallMcpTool only.',
    'server: cursor-ide-browser',
    `toolName: ${toolName}`,
    `arguments: ${JSON.stringify(args)}`,
    'Return only JSON: result.result.value if present, else full result.',
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
      const parsed = JSON.parse(text.slice(i));
      return { parsed: parsed.result?.value ?? parsed.result ?? parsed.value ?? parsed, text };
    } catch {
      /* continue */
    }
  }
  if (/context was destroyed|Promise was collected/i.test(text)) {
    return { parsed: { contextDestroyed: true }, text };
  }
  throw new Error(`parse fail: ${text.slice(-500)}`);
}

function agentValue(toolName, args, timeout) {
  return agentMcp(toolName, args, timeout).parsed;
}

function cdpEval(expression, awaitPromise = false) {
  const params = { expression, returnByValue: true };
  if (awaitPromise) params.awaitPromise = true;
  const { parsed, text } = agentMcp('browser_cdp', { method: 'Runtime.evaluate', params, viewId: VIEW });
  if (parsed?.contextDestroyed || /Promise was collected/i.test(text)) {
    return { contextDestroyed: true };
  }
  return parsed;
}

function fillTitle(title) {
  const { text } = agentMcp('browser_snapshot', { interactive: true, viewId: VIEW }, 60000);
  const lines = text.split('\n');
  let ref = null;
  for (let i = 0; i < lines.length; i++) {
    if (/Untitled public article/.test(lines[i])) {
      for (let j = i; j < Math.min(i + 6, lines.length); j++) {
        const rm = lines[j].match(/ref:\s*(e\d+)/);
        if (rm) {
          ref = rm[1];
          break;
        }
      }
      if (ref) break;
    }
  }
  if (!ref) throw new Error('title ref not found in snapshot');
  agentValue('browser_fill', { ref, value: title, element: 'Title', viewId: VIEW });
}

function isPublishSuccess(v, url) {
  if (v?.contextDestroyed) return true;
  if (v?.ok === true && (v?.step === 'done' || v?.step === 3)) return true;
  if (typeof url === 'string' && url.includes('editorMode=view')) return true;
  return false;
}

function uploadOne(n) {
  execSync(`node ${path.join(__dirname, 'build-parts-steps.mjs')} ${n}`, { cwd: root, stdio: 'pipe' });
  const plan = JSON.parse(fs.readFileSync(`/tmp/upload-steps-${n}.json`, 'utf8'));
  if (plan.skip) {
    log(`SKIP ${n} (marked skip)`);
    return true;
  }

  for (const step of plan.steps) {
    if (step.action === 'navigate') {
      agentValue('browser_navigate', { url: step.url, viewId: VIEW }, 90000);
    } else if (step.action === 'sleep') {
      sleep(step.ms);
    } else if (step.action === 'cdp') {
      const r = cdpEval(step.expression, !!step.awaitPromise);
      if (step.awaitPromise && r?.contextDestroyed) {
        log(`  CDP awaitPromise collected at index ${n} — continuing`);
      } else if (r?.ok === false && step.part === undefined && !step.awaitPromise) {
        throw new Error(`CDP failed: ${JSON.stringify(r).slice(0, 200)}`);
      }
    } else if (step.action === 'fill_title') {
      fillTitle(step.title);
    } else if (step.action === 'append') {
      execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { cwd: root, stdio: 'pipe' });
    }
  }

  const check = cdpEval('(() => ({ url: location.href, live: /editorMode=view/.test(location.href) }))()');
  if (!isPublishSuccess(check, check?.url)) {
    throw new Error(`publish verify failed: ${JSON.stringify(check)}`);
  }
  return true;
}

const queue = JSON.parse(fs.readFileSync(queueFile, 'utf8'));
const progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
const startIdx = Number(process.argv[2] ?? 0);
const endIdx = Number(process.argv[3] ?? 83);

const pending = queue.pending.filter((n) => n >= startIdx && n <= endIdx && !progress.uploaded.includes(n));
log(`Starting drive: ${pending.length} indices, log=${logFile}`);

const published = [];
const failures = [];

for (const n of pending) {
  let ok = false;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      log(`UPLOAD ${n} attempt ${attempt}`);
      uploadOne(n);
      published.push(n);
      ok = true;
      log(`OK ${n}`);
      break;
    } catch (e) {
      log(`FAIL ${n} attempt ${attempt}: ${e.message}`);
      if (attempt < 2) sleep(5000);
    }
  }
  if (!ok) failures.push(n);
}

const final = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
const report = { published, failures, uploadedCount: final.uploaded.length, logFile };
fs.writeFileSync(`/tmp/drive-parts-report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));

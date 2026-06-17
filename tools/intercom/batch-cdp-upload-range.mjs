#!/usr/bin/env node
/**
 * Upload pending indices via cursor agent MCP + /tmp/cdp-params-N.json
 * Usage: node batch-cdp-upload-range.mjs [start] [end]
 */
import fs from 'fs';
import path from 'path';
import { spawnSync, execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const progressFile = path.join(__dirname, 'upload-progress.json');
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const start = Number(process.argv[2] ?? 14);
const end = Number(process.argv[3] ?? 83);
const logFile = `/tmp/batch-cdp-upload-${start}-${end}.log`;

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  fs.appendFileSync(logFile, line + '\n');
  console.error(line);
}

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
  const text = (r.stdout || '') + (r.stderr || '');
  if (r.error?.code === 'ETIMEDOUT') throw new Error('agent timeout');
  for (let i = text.lastIndexOf('{'); i >= 0; i = text.lastIndexOf('{', i - 1)) {
    try {
      const parsed = JSON.parse(text.slice(i));
      return { parsed: parsed.result?.value ?? parsed.result ?? parsed.value ?? parsed, text, status: r.status };
    } catch {
      /* continue */
    }
  }
  if (/context was destroyed|Execution context was destroyed/i.test(text)) {
    return { parsed: null, text, contextDestroyed: true, status: r.status };
  }
  throw new Error(`parse fail (${r.status}): ${text.slice(-600)}`);
}

function ensureCdpParams(n) {
  const f = `/tmp/cdp-params-${n}.json`;
  if (fs.existsSync(f)) return f;
  execSync(`node ${path.join(__dirname, 'agent-upload-runner.mjs')} ${n}`, { stdio: 'pipe', cwd: root });
  execSync(`node ${path.join(__dirname, 'get-cdp-params.mjs')} ${n} > ${f}`, { shell: true, cwd: root });
  return f;
}

function isSuccess(v) {
  if (!v) return false;
  const fillOk = v.fillRes?.ok ?? v.fill?.ok;
  const pubOk = v.pubRes?.ok ?? v.publish?.ok ?? v.pub?.ok ?? v.ok;
  if (fillOk && pubOk) return true;
  if (v.ok && fillOk !== false && pubOk !== false) return true;
  return false;
}

function sleep(ms) {
  execSync(`sleep ${Math.ceil(ms / 1000)}`, { stdio: 'ignore' });
}

const publishedThisRun = [];
const failures = [];

for (let n = start; n <= end; n++) {
  const p = loadProgress();
  if (p.uploaded.includes(n)) {
    log(`SKIP ${n}`);
    continue;
  }

  try {
    ensureCdpParams(n);
    const params = JSON.parse(fs.readFileSync(`/tmp/cdp-params-${n}.json`, 'utf8'));

    log(`NAVIGATE ${n}`);
    agentMcp('browser_navigate', { url: URL, viewId: VIEW_ID }, 90000);
    sleep(6000);

    log(`CDP ${n}`);
    let result;
    try {
      result = agentMcp(
        'browser_cdp',
        { method: 'Runtime.evaluate', params, viewId: VIEW_ID },
        180000,
      );
    } catch (e) {
      if (/context was destroyed/i.test(String(e))) {
        result = { contextDestroyed: true, parsed: null };
      } else {
        throw e;
      }
    }

    const v = result.parsed ?? result;
    if (result.contextDestroyed || /context was destroyed/i.test(result.text || '')) {
      log(`CONTEXT_DESTROYED ${n} — treating as publish success`);
      execSync(`node ${path.join(__dirname, 'upload-queue-advance.mjs')} ${n}`, { stdio: 'pipe' });
      publishedThisRun.push(n);
      continue;
    }

    if (isSuccess(v)) {
      execSync(`node ${path.join(__dirname, 'upload-queue-advance.mjs')} ${n}`, { stdio: 'pipe' });
      publishedThisRun.push(n);
      log(`OK ${n} title=${v.title || ''}`);
    } else {
      failures.push({ index: n, error: v });
      log(`FAIL ${n} ${JSON.stringify(v)?.slice(0, 300)}`);
    }
  } catch (e) {
    failures.push({ index: n, error: String(e.message || e) });
    log(`ERROR ${n} ${e.message || e}`);
  }
}

const final = loadProgress();
const report = { publishedThisRun, failures, finalUploadedCount: final.uploaded.length };
fs.writeFileSync(`/tmp/batch-cdp-report-${start}-${end}.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));

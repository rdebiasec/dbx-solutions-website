#!/usr/bin/env node
/**
 * Sequential bulk upload via cursor agent MCP (single-expr workflow).
 * Usage: node glass-bulk-single-expr.mjs [start] [end]
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
const start = Number(process.argv[2] ?? 10);
const end = Number(process.argv[3] ?? 83);
const logFile = `/tmp/glass-bulk-${start}-${end}.log`;

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

function ensurePayload(n) {
  const f = `/tmp/cdp-payload-${n}.json`;
  if (!fs.existsSync(f)) {
    execSync(`node ${path.join(__dirname, 'batch-cdp-payload.mjs')} ${n} > ${f}`, { cwd: root });
  }
  return JSON.parse(fs.readFileSync(f, 'utf8'));
}

function isSuccess(v) {
  if (!v) return false;
  if (v.ok === true && v.fill?.ok !== false && v.pub?.ok !== false) return true;
  const fillOk = v.fill?.ok;
  const pubOk = v.pub?.ok ?? v.publish?.ok;
  return fillOk && pubOk !== false;
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

  let retries = 0;
  let done = false;
  while (!done && retries <= 2) {
    try {
      const params = ensurePayload(n);
      log(`NAVIGATE ${n} (try ${retries + 1})`);
      agentMcp('browser_navigate', { url: URL, viewId: VIEW_ID }, 90000);
      sleep(10000);

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
        log(`CONTEXT_DESTROYED ${n} — treating as success`);
        execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { cwd: root });
        publishedThisRun.push(n);
        done = true;
        continue;
      }

      if (isSuccess(v)) {
        execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { cwd: root });
        publishedThisRun.push(n);
        log(`OK ${n} title=${v.title || v.fill?.title || ''}`);
        done = true;
      } else {
        retries++;
        log(`FAIL ${n} try ${retries}: ${JSON.stringify(v)?.slice(0, 300)}`);
        if (retries > 2) failures.push({ index: n, error: v });
      }
    } catch (e) {
      retries++;
      log(`ERROR ${n} try ${retries}: ${e.message || e}`);
      if (retries > 2) failures.push({ index: n, error: String(e.message || e) });
    }
  }
}

const final = loadProgress();
const report = { publishedThisRun, failures, finalUploadedCount: final.uploaded.length, total: final.total };
fs.writeFileSync(`/tmp/glass-bulk-report-${start}-${end}.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));

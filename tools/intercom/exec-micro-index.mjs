#!/usr/bin/env node
/** Execute all micro steps for one index via cursor agent MCP bridge. */
import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const n = Number(process.argv[2]);
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const logFile = `/tmp/micro-run-${n}.log`;

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  fs.appendFileSync(logFile, line + '\n');
  console.error(line);
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
  if (r.status !== 0) throw new Error((r.stderr || r.stdout || 'agent failed').slice(0, 800));
  const text = r.stdout + r.stderr;
  for (let i = text.lastIndexOf('{'); i >= 0; i = text.lastIndexOf('{', i - 1)) {
    try {
      const parsed = JSON.parse(text.slice(i));
      return parsed.result?.value ?? parsed.result ?? parsed.value ?? parsed;
    } catch {
      /* continue */
    }
  }
  throw new Error(`parse fail: ${text.slice(-500)}`);
}

const jsonl = `/tmp/micro-upload-${n}/steps.jsonl`;
const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');
log(`start index ${n} steps=${lines.length}`);

agentMcp('browser_navigate', { url: URL, viewId: VIEW_ID }, 90000);

let last;
for (let s = 0; s < lines.length; s++) {
  const payload = JSON.parse(lines[s]);
  const timeout = payload.params?.awaitPromise ? 180000 : 60000;
  last = agentMcp('browser_cdp', payload, timeout);
  if (s % 25 === 0 || s === lines.length - 1) log(`step ${s + 1}/${lines.length}`);
}

const raw = JSON.stringify({ result: { value: last } }).replace(/'/g, "'\\''");
const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${raw}'`, {
  encoding: 'utf8',
  cwd: root,
}).trim();
const rec = JSON.parse(recOut.split('\n').pop());
log(`done ok=${rec.ok} title=${rec.title || ''}`);
console.log(JSON.stringify({ index: n, ok: rec.ok, steps: lines.length, title: rec.title }));

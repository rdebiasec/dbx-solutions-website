#!/usr/bin/env node
/** Drive one index upload: writes /tmp/mcp-call.json, waits /tmp/mcp-result.json */
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const intercomDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(intercomDir, '../..');
const CALL = '/tmp/mcp-call.json';
const RES = '/tmp/mcp-result.json';
const URL = 'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

const n = Number(process.argv[2]);
const mode = process.argv[3] || 'steps'; // steps | batch | micro

function waitRes(tag, timeoutMs = 300000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (fs.existsSync(RES)) {
      try {
        const data = JSON.parse(fs.readFileSync(RES, 'utf8'));
        if (data.tag === tag) {
          fs.unlinkSync(RES);
          return data.result;
        }
      } catch {}
    }
    execSync('sleep 0.05');
  }
  throw new Error(`timeout ${tag}`);
}

function mcp(tag, payload) {
  try { fs.unlinkSync(RES); } catch {}
  fs.writeFileSync(CALL, JSON.stringify({ tag, ...payload }));
  return waitRes(tag);
}

async function main() {
  // nav
  mcp('nav', { tool: 'browser_navigate', args: { url: URL, viewId: VIEW } });
  mcp('clear', { tool: 'browser_cdp', args: { method: 'Runtime.evaluate', params: { expression: 'delete window.__fp;delete window.__ce;({ok:true})', returnByValue: true }, viewId: VIEW } });

  let last;
  if (mode === 'batch') {
    const params = JSON.parse(execSync(`node ${path.join(intercomDir, 'batch-cdp-payload.mjs')} ${n}`, { encoding: 'utf8' }));
    last = mcp('batch', { tool: 'browser_cdp', args: { method: 'Runtime.evaluate', params, viewId: VIEW } });
  } else if (mode === 'micro') {
    execSync(`node ${path.join(intercomDir, 'micro-upload-index.mjs')} ${n}`, { cwd: repoRoot, stdio: 'pipe' });
    const lines = fs.readFileSync(`/tmp/micro-upload-${n}/steps.jsonl`, 'utf8').trim().split('\n');
    for (let i = 0; i < lines.length; i++) {
      const payload = JSON.parse(lines[i]);
      last = mcp(`micro-${i}`, { tool: 'browser_cdp', args: payload });
      if (i % 20 === 0) process.stderr.write(`micro ${i + 1}/${lines.length}\n`);
    }
  } else {
    const { steps } = JSON.parse(execSync(`node ${path.join(intercomDir, 'get-upload-steps.mjs')} ${n}`, { encoding: 'utf8' }));
    const cdp = steps.filter((s) => s.action === 'cdp');
    for (let i = 0; i < cdp.length; i++) {
      const s = cdp[i];
      last = mcp(`cdp-${i}`, { tool: 'browser_cdp', args: { method: s.method, params: s.params, viewId: s.viewId } });
      if (i % 3 === 0) process.stderr.write(`cdp ${i + 1}/${cdp.length}\n`);
    }
  }

  try { fs.unlinkSync(CALL); } catch {}
  const raw = JSON.stringify({ result: { value: last } }).replace(/'/g, "'\\''");
  const rec = execSync(`node ${path.join(intercomDir, 'record-upload-result.mjs')} ${n} '${raw}'`, { encoding: 'utf8', cwd: repoRoot }).trim();
  console.log(rec.split('\n').pop());
}

main().catch((e) => { console.error(JSON.stringify({ error: e.message })); process.exit(1); });

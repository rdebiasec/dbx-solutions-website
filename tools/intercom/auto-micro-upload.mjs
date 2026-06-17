#!/usr/bin/env node
/** Auto-run micro steps via cursor agent MCP bridge */
import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const intercomDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(intercomDir, '../..');
const index = Number(process.argv[2]);
const start = Number(process.argv[3] || 0);
const endArg = process.argv[4];
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

function agent(tool, args) {
  const prompt = [
    'Execute ONE CallMcpTool only.',
    'server: cursor-ide-browser',
    `toolName: ${tool}`,
    `arguments: ${JSON.stringify(args)}`,
    'Return only JSON: result.result.value if present, else full result.',
  ].join('\n');
  const r = spawnSync('cursor', ['agent', '--print', '--force', '--workspace', repoRoot], {
    input: prompt,
    encoding: 'utf8',
    maxBuffer: 40 * 1024 * 1024,
    timeout: 180000,
  });
  const text = (r.stdout || '') + (r.stderr || '');
  for (let i = text.lastIndexOf('{'); i >= 0; i = text.lastIndexOf('{', i - 1)) {
    try {
      const p = JSON.parse(text.slice(i));
      return p.result?.value ?? p.result ?? p.value ?? p;
    } catch {}
  }
  if (/context was destroyed/i.test(text)) return { contextDestroyed: true };
  throw new Error(`agent fail: ${text.slice(-400)}`);
}

const jsonl = `/tmp/micro-upload-${index}/steps.jsonl`;
if (!fs.existsSync(jsonl)) {
  execSync(`node ${path.join(intercomDir, 'micro-upload-index.mjs')} ${index}`, { cwd: repoRoot, stdio: 'inherit' });
}
const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');
const end = endArg ? Number(endArg) : lines.length - 1;

console.error(`index ${index} steps ${start}-${end} (${end - start + 1})`);
agent('browser_navigate', { url: URL, viewId: VIEW });
agent('browser_cdp', {
  method: 'Runtime.evaluate',
  params: { expression: 'delete window.__fp;delete window.__ce;({ok:true})', returnByValue: true },
  viewId: VIEW,
});

let last;
for (let i = start; i <= end; i++) {
  const payload = JSON.parse(lines[i]);
  last = agent('browser_cdp', payload);
  if (i % 10 === 0 || i === end) console.error(`  step ${i + 1}/${lines.length}`);
}

const raw = JSON.stringify({ result: { value: last } }).replace(/'/g, "'\\''");
const rec = execSync(`node ${path.join(intercomDir, 'record-upload-result.mjs')} ${index} '${raw}'`, {
  encoding: 'utf8',
  cwd: repoRoot,
}).trim();
console.log(rec.split('\n').pop());

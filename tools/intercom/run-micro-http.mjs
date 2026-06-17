#!/usr/bin/env node
/**
 * Run all micro steps for index N using browser_cdp via MCP HTTP bridge.
 * Set MCP_HTTP_URL env (e.g. from Cursor internal bridge) or use --emit for agent driver.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const n = Number(process.argv[2]);
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const progressFile = path.join(__dirname, 'upload-progress.json');

async function mcpCall(toolName, args) {
  const bridge = process.env.MCP_HTTP_URL;
  if (bridge) {
    const res = await fetch(`${bridge}/call`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ server: 'cursor-ide-browser', toolName, arguments: args }),
    });
    const data = await res.json();
    return data.result?.value ?? data.result ?? data.value ?? data;
  }
  throw new Error('MCP_HTTP_URL not set');
}

function isUploaded(idx) {
  const p = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
  return p.uploaded.includes(idx);
}

async function runIndex(idx) {
  if (isUploaded(idx)) return { index: idx, ok: true, skipped: true };

  const jsonl = `/tmp/micro-upload-${idx}/steps.jsonl`;
  const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');

  await mcpCall('browser_navigate', { url: URL, viewId: VIEW });

  let last;
  for (let s = 0; s < lines.length; s++) {
    const payload = JSON.parse(lines[s]);
    last = await mcpCall('browser_cdp', payload);
    if (s % 25 === 0 || s === lines.length - 1) {
      console.error(`index ${idx} step ${s + 1}/${lines.length}`);
    }
  }

  const raw = JSON.stringify({ result: { value: last } }).replace(/'/g, "'\\''");
  const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${idx} '${raw}'`, {
    encoding: 'utf8',
    cwd: root,
  }).trim();
  const rec = JSON.parse(recOut.split('\n').pop());
  return { index: idx, ok: rec.ok, steps: lines.length, title: rec.title };
}

const results = [];
for (const idx of process.argv.slice(3).map(Number).filter(Boolean)) {
  try {
    results.push(await runIndex(idx));
  } catch (e) {
    results.push({ index: idx, ok: false, error: String(e.message || e) });
  }
}
const p = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
console.log(JSON.stringify({ results, uploadedCount: p.uploaded.length }));

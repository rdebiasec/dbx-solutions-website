#!/usr/bin/env node
/**
 * Upload one index via CDP steps (stdout JSON lines for agent MCP).
 * Usage: node cdp-upload-one.mjs <index>
 * Emits: navigate, cdp steps..., append hint
 */
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const combined = `/tmp/intercom-upload/combined/${index}.expr`;

if (!fs.existsSync(combined)) {
  console.log(JSON.stringify({ error: 'missing', combined }));
  process.exit(1);
}

const expr = fs.readFileSync(combined, 'utf8').trim();
const singleParams = { expression: expr, awaitPromise: true, returnByValue: true };
const singleSize = JSON.stringify(singleParams).length;

const emit = (obj) => console.log(JSON.stringify(obj));

emit({ step: 'navigate', url: URL, viewId: VIEW });

if (singleSize <= 12000) {
  emit({
    step: 'cdp',
    index,
    method: 'Runtime.evaluate',
    params: singleParams,
    viewId: VIEW,
  });
} else {
  execSync(`node ${path.join(__dirname, 'prepare-chunked-upload.mjs')} ${index}`, { stdio: 'pipe' });
  execSync(`node /tmp/gen-small-chunks.mjs ${index}`, { stdio: 'pipe' });
  const chunkDir = `/tmp/cdp-chunks-${index}`;
  emit({
    step: 'cdp',
    index,
    method: 'Runtime.evaluate',
    params: { expression: 'window.__uploadB64="";({ok:true,init:true})', returnByValue: true },
    viewId: VIEW,
  });
  let i = 0;
  for (;;) {
    const f = `${chunkDir}/chunk-${i}.json`;
    if (!fs.existsSync(f)) break;
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    emit({ step: 'cdp', index, method: j.method, params: j.params, viewId: VIEW });
    i++;
  }
  const run = JSON.parse(fs.readFileSync(`${chunkDir}/run.json`, 'utf8'));
  emit({ step: 'cdp', index, method: run.method, params: run.params, viewId: VIEW });
}

emit({ step: 'append', index });

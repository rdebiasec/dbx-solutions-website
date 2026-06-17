#!/usr/bin/env node
/** Process driver MCP requests until index completes or no request pending. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indices = process.argv.slice(2).map(Number).filter(Boolean);
const progressFile = path.join(__dirname, 'upload-progress.json');
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

function isUploaded(n) {
  return JSON.parse(fs.readFileSync(progressFile, 'utf8')).uploaded.includes(n);
}

for (const n of indices) {
  if (isUploaded(n)) {
    console.log(JSON.stringify({ index: n, skipped: true }));
    continue;
  }
  try { fs.unlinkSync(`/tmp/micro-loop-${n}.json`); } catch {}
  fs.writeFileSync(`/tmp/run-index-${n}.json`, JSON.stringify({ status: 'pending', index: n }));
  execSync(`node ${path.join(__dirname, 'micro-step-driver.mjs')} ${n} > /tmp/driver-out-${n}.json`, {
    stdio: 'inherit',
  });
}

const p = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
console.log(JSON.stringify({ uploadedCount: p.uploaded.length }));

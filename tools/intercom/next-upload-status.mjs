#!/usr/bin/env node
/**
 * Print next pending upload index and metadata for MCP driver.
 * Usage: node next-upload-status.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

const SKIP_INDICES = [81, 82, 83];

const pending = [];
for (let i = 0; i <= 83; i++) {
  if (SKIP_INDICES.includes(i)) continue;
  if (!progress.uploaded.includes(i)) pending.push(i);
}

const next = pending[0] ?? null;
const out = {
  uploadedCount: progress.uploaded.length,
  pendingCount: pending.length,
  pending,
  next,
  url: URL,
  viewId: VIEW_ID,
  exprFile: next != null ? path.join(__dirname, '.expr-cache', `${String(next).padStart(3, '0')}.expr`) : null,
};
console.log(JSON.stringify(out, null, 2));

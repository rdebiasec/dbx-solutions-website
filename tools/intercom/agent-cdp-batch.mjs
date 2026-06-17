#!/usr/bin/env node
/**
 * Emit upload steps for agent MCP loop (indices start-end).
 * Usage: node agent-cdp-batch.mjs 14 83
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const start = Number(process.argv[2] ?? 14);
const end = Number(process.argv[3] ?? 83);
const progressFile = path.join(__dirname, 'upload-progress.json');
const progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
const uploaded = new Set(progress.uploaded);

const pending = [];
for (let i = start; i <= end; i++) {
  if (!uploaded.has(i)) pending.push(i);
}
console.log(JSON.stringify({ pending, count: pending.length }));

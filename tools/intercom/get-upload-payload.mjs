#!/usr/bin/env node
/**
 * Upload one article via browser MCP workflow instructions.
 * Outputs JSON steps for agent: fill fields then publish expression.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const SKIP = [81, 82, 83];

const index = Number(process.argv[2]);
if (SKIP.includes(index)) {
  console.log(JSON.stringify({ skip: true, index, reason: 'index-only entry' }));
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-manifest.json'), 'utf8'));
const item = manifest[index];
const publishExpr = fs.readFileSync(path.join(__dirname, 'cdp-publish-full.js'), 'utf8').trim();

console.log(
  JSON.stringify({
    index,
    url: URL,
    viewId: VIEW_ID,
    title: item.title,
    description: item.description,
    content: item.content,
    publishExpr,
  }),
);

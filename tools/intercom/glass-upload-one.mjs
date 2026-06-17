#!/usr/bin/env node
/**
 * Run one glass upload index via stdin/stdout MCP bridge (agent reads stdout).
 * Prints: NAVIGATE <url> | CDP <json-file> | APPEND <n> | RESULT expected
 * Usage: node glass-upload-one.mjs <N>
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const n = Number(process.argv[2]);
const stepFile = `/tmp/glass-step-${n}.json`;
if (!fs.existsSync(stepFile)) {
  execSync(`node ${path.join(__dirname, 'glass-upload-batch.mjs')} ${n} ${n}`, { stdio: 'pipe' });
}
const step = JSON.parse(fs.readFileSync(stepFile, 'utf8'));
const cdpFile = `/tmp/glass-cdp-call-${n}.json`;
fs.writeFileSync(cdpFile, JSON.stringify(step.cdp));
console.log(JSON.stringify({ index: n, navigate: step.navigate, cdpFile, append: step.append, viewId: VIEW }));

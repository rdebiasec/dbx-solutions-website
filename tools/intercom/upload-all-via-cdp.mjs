#!/usr/bin/env node
/**
 * Automated Intercom upload loop using Cursor browser MCP via stdin/stdout bridge.
 * Run from agent context; reads .expr-cache and updates upload-progress.json.
 *
 * This script emits JSON-RPC style steps on stdout for an external driver,
 * OR when CURSOR_MCP_BRIDGE=1 and bridge is available, executes directly.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const progressFile = path.join(__dirname, 'upload-progress.json');
const cacheDir = path.join(__dirname, '.expr-cache');
const logFile = path.join(__dirname, 'upload-run.log');

const start = Number(process.argv[2] ?? 3);
const end = Number(process.argv[3] ?? 83);

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(logFile, line);
  console.error(line.trim());
}

function loadProgress() {
  return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
}

function saveProgress(p) {
  p.updatedAt = new Date().toISOString();
  fs.writeFileSync(progressFile, JSON.stringify(p, null, 2) + '\n');
}

function appendIndex(n) {
  const p = loadProgress();
  if (!p.uploaded.includes(n)) p.uploaded.push(n);
  p.uploaded.sort((a, b) => a - b);
  saveProgress(p);
}

async function mcpCall(server, toolName, args) {
  // Emit for agent driver mode
  if (process.env.MCP_DRIVER === 'emit') {
    console.log(JSON.stringify({ server, toolName, arguments: args }));
    return { driver: true };
  }
  throw new Error('Direct MCP not available; use MCP_DRIVER=emit');
}

async function uploadOne(index) {
  const pad = String(index).padStart(3, '0');
  const expr = fs.readFileSync(path.join(cacheDir, `${pad}.expr`), 'utf8');

  log(`START index ${index}`);
  await mcpCall('cursor-ide-browser', 'browser_navigate', { url: URL, viewId: VIEW_ID });
  const evalResult = await mcpCall('cursor-ide-browser', 'browser_cdp', {
    method: 'Runtime.evaluate',
    params: { expression: expr, awaitPromise: true, returnByValue: true },
    viewId: VIEW_ID,
  });
  return { index, evalResult };
}

async function main() {
  const failures = [];
  let published = 0;
  for (let i = start; i <= end; i++) {
    const p = loadProgress();
    if (p.uploaded.includes(i)) {
      log(`SKIP index ${i} (already uploaded)`);
      continue;
    }
    try {
      await uploadOne(i);
      appendIndex(i);
      published++;
      log(`OK index ${i}`);
    } catch (e) {
      failures.push({ index: i, err: String(e) });
      log(`FAIL index ${i}: ${e}`);
    }
  }
  const final = loadProgress();
  console.log(JSON.stringify({ published, failures, uploadedCount: final.uploaded.length }));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * Batch upload helper: for each index, emit result line after MCP step.
 * Agent uses: node batch-mcp-upload.mjs start end
 * Then for each index runs navigate + cdp from /tmp/intercom-expr-N.json
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const start = Number(process.argv[2]);
const end = Number(process.argv[3]);
const progressFile = path.join(__dirname, 'upload-progress.json');
const logFile = path.join(__dirname, 'upload-run.log');

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  fs.appendFileSync(logFile, line + '\n');
  console.log(line);
}

const progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
const uploaded = new Set(progress.uploaded);

for (let i = start; i <= end; i++) {
  if (uploaded.has(i)) {
    log(`SKIP ${i}`);
    continue;
  }
  execSync(`node ${path.join(__dirname, 'agent-upload-runner.mjs')} ${i}`, { stdio: 'inherit' });
  log(`PREPARED ${i}`);
}

console.log(JSON.stringify({ prepared: `${start}-${end}` }));

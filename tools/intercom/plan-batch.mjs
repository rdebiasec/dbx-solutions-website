#!/usr/bin/env node
/** Upload manifest indices START..END via browser CDP expressions printed to stdout. */
import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const start = Number(process.argv[2] ?? 3);
const end = Number(process.argv[3] ?? 80);
const progressFile = path.join(__dirname, 'upload-progress.json');
const progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
const uploaded = new Set(progress.uploaded);
const failures = [];

const NEW_URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';

for (let i = start; i <= end; i++) {
  if (uploaded.has(i)) {
    console.log(`SKIP ${i} (already uploaded)`);
    continue;
  }
  const exprPath = `/tmp/intercom-upload-${i}.js`;
  execSync(`node ${path.join(__dirname, 'emit-upload-index.mjs')} ${i} > ${exprPath}`);
  const expr = fs.readFileSync(exprPath, 'utf8');
  console.log(`\n=== INDEX ${i} ===`);
  console.log(`NAVIGATE: ${NEW_URL}`);
  console.log(`CDP_EXPR_FILE: ${exprPath}`);
  console.log(`CDP_EXPR_BYTES: ${expr.length}`);
}

console.log('\nDone generating batch plan.');

#!/usr/bin/env node
/**
 * Prepare + print upload steps for index N.
 * Agent: navigate, then for each step file run write-mcp-call + browser_cdp, then record-upload-result.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const skip0 = process.argv[3] === 'skip0';

const out = execSync(
  `node ${path.join(__dirname, 'upload-index-session.mjs')} ${n}${skip0 ? ' skip0' : ''}`,
  { encoding: 'utf8' },
);
const manifest = JSON.parse(out.trim().split('\n').pop());
if (manifest.skip) {
  console.log(JSON.stringify({ index: n, skip: true }));
  process.exit(0);
}

const mcpFiles = [];
for (const step of manifest.steps) {
  const mcpOut = `/tmp/mcp-call-${n}-${step.part ?? step.kind ?? step.i}.json`;
  execSync(`node ${path.join(__dirname, 'write-mcp-call.mjs')} ${step.file} > ${mcpOut}`);
  mcpFiles.push(mcpOut);
}
console.log(JSON.stringify({ index: n, mcpFiles, manifest }));

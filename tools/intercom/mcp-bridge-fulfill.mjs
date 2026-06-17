#!/usr/bin/env node
/**
 * Fulfill one /tmp/mcp-step.json via cursor agent MCP call.
 * Usage: node mcp-bridge-fulfill.mjs
 */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const STEP = '/tmp/mcp-step.json';
const RESULT = '/tmp/mcp-result.json';

if (!fs.existsSync(STEP)) {
  console.log(JSON.stringify({ skip: true, reason: 'no step' }));
  process.exit(0);
}

const step = JSON.parse(fs.readFileSync(STEP, 'utf8'));
const tool = step.tool;
const args = step.payload;

const prompt = [
  'Execute ONE CallMcpTool only.',
  'server: cursor-ide-browser',
  `toolName: ${tool}`,
  `arguments: ${JSON.stringify(args)}`,
  'Return only JSON: full MCP result object.',
].join('\n');

const r = spawnSync('cursor', ['agent', '--print', '--force', '--workspace', root, prompt], {
  encoding: 'utf8',
  maxBuffer: 40 * 1024 * 1024,
  timeout: 240000,
});

const text = (r.stdout || '') + (r.stderr || '');
let out = null;
for (let i = text.lastIndexOf('{'); i >= 0; i = text.lastIndexOf('{', i - 1)) {
  try {
    out = JSON.parse(text.slice(i));
    break;
  } catch {}
}

if (!out) {
  console.error(text.slice(-800));
  process.exit(1);
}

fs.writeFileSync(RESULT, JSON.stringify(out));
console.log(JSON.stringify({ ok: true, tool, keys: Object.keys(out) }));

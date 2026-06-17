#!/usr/bin/env node
/** Execute one /tmp/mcp-bridge-call.json via cursor agent MCP; write /tmp/mcp-bridge-res.json */
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'Documents/dbx-solutions-website');
const call = JSON.parse(fs.readFileSync('/tmp/mcp-bridge-call.json', 'utf8'));
const prompt = [
  'Execute ONE CallMcpTool only.',
  'server: cursor-ide-browser',
  `toolName: ${call.tool}`,
  `arguments: ${JSON.stringify(call.payload)}`,
  'Return only JSON: result.result.value if present, else full result.',
].join('\n');

const r = spawnSync('cursor', ['agent', '--print', '--force', '--workspace', root], {
  input: prompt,
  encoding: 'utf8',
  maxBuffer: 40 * 1024 * 1024,
  timeout: 180000,
});
const text = (r.stdout || '') + (r.stderr || '');
let parsed;
for (let i = text.lastIndexOf('{'); i >= 0; i = text.lastIndexOf('{', i - 1)) {
  try {
    parsed = JSON.parse(text.slice(i));
    break;
  } catch {}
}
if (!parsed && /context was destroyed/i.test(text)) {
  parsed = { contextDestroyed: true };
}
if (!parsed) {
  console.error(text.slice(-800));
  process.exit(1);
}
fs.writeFileSync('/tmp/mcp-bridge-res.json', JSON.stringify({ tag: call.tag, result: parsed }));
console.log(JSON.stringify({ tag: call.tag, ok: true }));

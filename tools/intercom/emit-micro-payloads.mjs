#!/usr/bin/env node
/**
 * Run all micro CDP steps from a JSONL file via stdin-driven MCP bridge.
 * Agent loop: while read line; do node run-micro-jsonl-exec.mjs "$line"; done
 * This script evaluates one step by printing the exact CallMcpTool payload.
 */
import fs from 'fs';

const jsonl = process.argv[2];
const from = Number(process.argv[3] ?? 0);
const to = Number(process.argv[4] ?? 9999);

const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');
for (let i = from; i <= Math.min(to, lines.length - 1); i++) {
  const args = JSON.parse(lines[i]);
  const payload = {
    server: 'cursor-ide-browser',
    toolName: 'browser_cdp',
    arguments: args,
  };
  console.log(JSON.stringify({ step: i, payload }));
}

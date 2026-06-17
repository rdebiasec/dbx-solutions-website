#!/usr/bin/env node
/**
 * Execute micro steps by writing MCP request files for an external driver.
 * When MCP_BRIDGE=1, reads responses from /tmp/mcp-resp-{n}-{s}.json
 * Driver loop: for each pending file in /tmp/mcp-pending/, run CallMcpTool, write response.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const queueDir = `/tmp/mcp-queue-${n}`;
const respDir = `/tmp/mcp-resp-${n}`;

fs.mkdirSync(queueDir, { recursive: true });
fs.mkdirSync(respDir, { recursive: true });

const jsonl = `/tmp/micro-upload-${n}/steps.jsonl`;
const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');

// Write navigate request
fs.writeFileSync(
  `${queueDir}/nav.json`,
  JSON.stringify({ tool: 'browser_navigate', args: { url: URL, viewId: VIEW } }),
);

for (let s = 0; s < lines.length; s++) {
  fs.writeFileSync(`${queueDir}/step-${String(s).padStart(4, '0')}.json`, lines[s]);
}

console.log(JSON.stringify({ index: n, steps: lines.length, queueDir, respDir }));

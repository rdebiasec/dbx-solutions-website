#!/usr/bin/env node
/**
 * Orchestrates Intercom article uploads via browser MCP (agent-driven).
 * Prints one JSON line per step for the agent to execute with CallMcpTool.
 *
 * Usage: node mcp-upload-loop.mjs [start] [end]
 * Each line: {"step":"navigate"|"evaluate"|"progress","index":N,...}
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const start = Number(process.argv[2] ?? 2);
const end = Number(process.argv[3] ?? 83);
const cacheDir = path.join(__dirname, '.expr-cache');

for (let i = start; i <= end; i++) {
  const pad = String(i).padStart(3, '0');
  const exprFile = path.join(cacheDir, `${pad}.expr`);
  if (!fs.existsSync(exprFile)) {
    console.log(JSON.stringify({ step: 'error', index: i, err: `missing ${exprFile}` }));
    continue;
  }
  console.log(
    JSON.stringify({
      step: 'navigate',
      index: i,
      viewId: VIEW_ID,
      url: URL,
    }),
  );
  console.log(
    JSON.stringify({
      step: 'evaluate',
      index: i,
      viewId: VIEW_ID,
      method: 'Runtime.evaluate',
      params: {
        expression: fs.readFileSync(exprFile, 'utf8'),
        awaitPromise: true,
        returnByValue: true,
      },
    }),
  );
  console.log(JSON.stringify({ step: 'progress', index: i }));
}

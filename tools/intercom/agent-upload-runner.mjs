#!/usr/bin/env node
/**
 * Prepare wrapped CDP expression for one index; print JSON for agent MCP calls.
 * Usage: node agent-upload-runner.mjs <index>
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

const n = Number(process.argv[2]);
const expr = execSync(`node ${path.join(__dirname, 'wrap-poll-expr.mjs')} ${n}`, {
  encoding: 'utf8',
  maxBuffer: 10 * 1024 * 1024,
});

const outFile = `/tmp/intercom-expr-${n}.json`;
fs.writeFileSync(
  outFile,
  JSON.stringify({
    index: n,
    viewId: VIEW_ID,
    url: URL,
    cdp: {
      method: 'Runtime.evaluate',
      params: { expression: expr, awaitPromise: true, returnByValue: true },
    },
  }),
);

console.log(JSON.stringify({ index: n, exprFile: outFile, exprLen: expr.length }));

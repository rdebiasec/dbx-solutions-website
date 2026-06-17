#!/usr/bin/env node
/** Emit sessionStorage upload steps as JSONL for agent MCP loop.
 * Usage: node session-mcp-steps.mjs <start> <end> [skipFirstForIndex]
 * Each line: {step, index, ...}
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const start = Number(process.argv[2] ?? 14);
const end = Number(process.argv[3] ?? 83);
const skipFirstIndex = Number(process.argv[4] ?? 14);
const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));

function batchStores(emit, from, to, prefix) {
  const inner = emit.stores.slice(from, to + 1).map((s) => {
    const m = s.match(/^\(\(\) => \{ (.+); return \{ok:true.+}; \}\)\(\)$/);
    if (!m) throw new Error(`bad store ${from}`);
    return m[1];
  });
  const keys = Array.from({ length: to - from + 1 }, (_, j) => `${prefix}${from + j}`);
  return `(() => { ${inner.join('; ')}; return {ok:true,keys:${JSON.stringify(keys)}}; })()`;
}

for (let i = start; i <= end; i++) {
  if (progress.uploaded.includes(i)) {
    console.log(JSON.stringify({ step: 'skip', index: i, reason: 'already uploaded' }));
    continue;
  }
  const emit = JSON.parse(
    execSync(`node ${path.join(__dirname, 'emit-session-cdp.mjs')} ${i}`, {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    }),
  );
  const prefix = `ic${i}_`;
  console.log(JSON.stringify({ step: 'navigate', index: i, viewId: VIEW_ID, url: URL }));

  const storeStart = i === skipFirstIndex ? 1 : 0;
  const stores = emit.stores.length;
  // batch stores in groups of 4
  for (let s = storeStart; s < stores; s += 4) {
    const e = Math.min(s + 3, stores - 1);
    const expr = batchStores(emit, s, e, prefix);
    console.log(
      JSON.stringify({
        step: 'stores',
        index: i,
        viewId: VIEW_ID,
        method: 'Runtime.evaluate',
        params: { expression: expr, returnByValue: true },
      }),
    );
  }
  console.log(
    JSON.stringify({
      step: 'run',
      index: i,
      viewId: VIEW_ID,
      method: 'Runtime.evaluate',
      params: { expression: emit.runExpr, awaitPromise: true, returnByValue: true },
    }),
  );
  console.log(JSON.stringify({ step: 'record', index: i }));
}

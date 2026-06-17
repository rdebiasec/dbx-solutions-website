#!/usr/bin/env node
/** Prepare MCP browser_cdp payload files for sessionStorage chunk upload.
 * Usage: node prepare-session-mcp.mjs <index> [skipFirstStore]
 * Writes /tmp/session-mcp-{index}/store-{i}.json and run.json
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const skipFirst = process.argv[3] === 'skip0';
const outDir = `/tmp/session-mcp-${n}`;
fs.mkdirSync(outDir, { recursive: true });

const emit = JSON.parse(
  execSync(`node ${path.join(__dirname, 'emit-session-cdp.mjs')} ${n}`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  }),
);

const start = skipFirst ? 1 : 0;
for (let i = start; i < emit.stores.length; i++) {
  fs.writeFileSync(
    path.join(outDir, `store-${i}.json`),
    JSON.stringify({
      method: 'Runtime.evaluate',
      params: { expression: emit.stores[i], returnByValue: true },
    }),
  );
}
fs.writeFileSync(
  path.join(outDir, 'run.json'),
  JSON.stringify({
    method: 'Runtime.evaluate',
    params: { expression: emit.runExpr, awaitPromise: true, returnByValue: true },
  }),
);
fs.writeFileSync(
  path.join(outDir, 'meta.json'),
  JSON.stringify({ index: n, partCount: emit.partCount, exprLen: emit.exprLen, skipFirst }),
);
console.log(JSON.stringify({ index: n, outDir, stores: emit.stores.length - start }));

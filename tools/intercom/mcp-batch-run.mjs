#!/usr/bin/env node
/**
 * Emit pending indices and prepare MCP payloads for batch upload.
 * Usage: node mcp-batch-run.mjs START END
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const start = Number(process.argv[2] ?? 26);
const end = Number(process.argv[3] ?? 83);
const progress = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'),
);
const uploaded = new Set(progress.uploaded);
const pending = [];
for (let i = start; i <= end; i++) {
  if (!uploaded.has(i)) pending.push(i);
}
const outDir = '/tmp/mcp-batch';
fs.mkdirSync(outDir, { recursive: true });
for (const n of pending) {
  const src = `/tmp/cdp-params-${n}.json`;
  if (!fs.existsSync(src)) {
    console.error(`missing ${src}`);
    continue;
  }
  const params = JSON.parse(fs.readFileSync(src, 'utf8'));
  fs.writeFileSync(
    `${outDir}/${n}.json`,
    JSON.stringify({
      method: 'Runtime.evaluate',
      params,
      viewId: 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c',
    }),
  );
}
console.log(JSON.stringify({ pending, prepared: pending.length }));

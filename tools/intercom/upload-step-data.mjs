#!/usr/bin/env node
/**
 * Upload one index via browser MCP JSON-RPC on stdin (for agent loop).
 * Prints: {index, exprPath, pollExpr}
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
const n = Number(process.argv[2]);
const exprPath = `/tmp/intercom-upload/${n}.expr`;
const pollExpr = `(async () => { const deadline = Date.now() + 15000; while (Date.now() < deadline) { if (document.querySelector('textarea[placeholder="Untitled public article"]')) return { ready: true }; await new Promise(r => setTimeout(r, 200)); } return { ready: false }; })()`;

if (progress.uploaded.includes(n)) {
  console.log(JSON.stringify({ index: n, skip: true }));
  process.exit(0);
}
if (!fs.existsSync(exprPath)) {
  console.log(JSON.stringify({ index: n, error: 'missing expr' }));
  process.exit(1);
}
console.log(JSON.stringify({ index: n, expr: fs.readFileSync(exprPath, 'utf8'), pollExpr }));

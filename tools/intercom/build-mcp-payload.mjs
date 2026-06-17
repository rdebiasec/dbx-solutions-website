#!/usr/bin/env node
/**
 * Build MCP CDP payload JSON for one article index.
 * Usage: node build-mcp-payload.mjs 8 > /tmp/mcp-payload-008.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const expr = execSync(`node ${path.join(__dirname, 'get-upload-expr.mjs')} ${n}`, {
  encoding: 'utf8',
  maxBuffer: 10 * 1024 * 1024,
});
const payload = {
  method: 'Runtime.evaluate',
  params: { expression: expr, awaitPromise: true, returnByValue: true },
  viewId: 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c',
};
process.stdout.write(JSON.stringify(payload));

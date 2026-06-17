#!/usr/bin/env node
/**
 * Prepare MCP browser_cdp call for index N using .expr-cache (smaller than combined b64).
 * Usage: node mcp-cdp-from-cache.mjs 16 > /tmp/mcp-16.json
 */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const params = JSON.parse(
  execSync(`node ${path.join(__dirname, 'batch-cdp-payload.mjs')} ${n}`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  }),
);
console.log(
  JSON.stringify({
    method: 'Runtime.evaluate',
    params,
    viewId: 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c',
  }),
);

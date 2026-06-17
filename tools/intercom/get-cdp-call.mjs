#!/usr/bin/env node
/** Output browser_cdp MCP arguments JSON for index N (expr from .expr-cache). */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const n = Number(process.argv[2]);
const expr = execSync(`node ${path.join(__dirname, 'wrap-poll-expr.mjs')} ${n}`, {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
});
process.stdout.write(
  JSON.stringify({
    method: 'Runtime.evaluate',
    params: { expression: expr, awaitPromise: true, returnByValue: true },
    viewId: VIEW_ID,
  }),
);

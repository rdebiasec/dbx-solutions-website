#!/usr/bin/env node
/** Run one fast-upload step: handles sleep locally, prints MCP action otherwise. */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const resultArg = process.argv[2];

if (resultArg) {
  execSync(`node ${path.join(root, 'fast-upload-bridge.mjs')} result '${resultArg.replace(/'/g, "'\\''")}'`, {
    stdio: 'inherit',
  });
}

const next = execSync(`node ${path.join(root, 'fast-upload-bridge.mjs')} next`, { encoding: 'utf8' }).trim();
const action = JSON.parse(next);

if (action.action === 'DONE') {
  console.log(JSON.stringify(action));
  process.exit(0);
}

if (action.action?.startsWith('sleep')) {
  execSync(`sleep ${Math.ceil(action.ms / 1000)}`, { stdio: 'inherit' });
  execSync(`node ${path.join(root, 'fast-upload-bridge.mjs')} result '{"ok":true}'`, { stdio: 'pipe' });
  const again = execSync(`node ${path.join(root, 'fast-upload-bridge.mjs')} next`, { encoding: 'utf8' }).trim();
  console.log(again);
  process.exit(0);
}

console.log(next);

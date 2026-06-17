#!/usr/bin/env node
/**
 * Agent helper: upload one index via subprocess MCP bridge pattern.
 * Prints summary JSON for index after reading expr; agent calls browser MCP.
 * Usage: node agent-upload-one.mjs 9
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const params = JSON.parse(
  execSync(`node ${path.join(__dirname, 'batch-cdp-payload.mjs')} ${index}`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  }),
);
const out = `/tmp/intercom-cdp-${String(index).padStart(3, '0')}.json`;
fs.writeFileSync(out, JSON.stringify({ method: 'Runtime.evaluate', params }));
console.log(JSON.stringify({ index, payloadFile: out, exprLen: params.expression.length }));

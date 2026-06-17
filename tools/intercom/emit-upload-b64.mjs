#!/usr/bin/env node
/** Output eval(atob(...)) wrapper for combined upload expression. */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const expr = execSync(`node ${path.join(__dirname, 'emit-upload-index.mjs')} ${index}`, { encoding: 'utf8' });
const b64 = Buffer.from(expr, 'utf8').toString('base64');
process.stdout.write(`eval(atob(${JSON.stringify(b64)}))`);

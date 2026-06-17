#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const fillFn = fs.readFileSync(path.join(__dirname, 'cdp-fill-fn.js'), 'utf8').trim();
const b64 = fs.readFileSync(
  path.join(__dirname, 'cdp-b64', `${String(n).padStart(3, '0')}.txt`),
  'utf8',
).trim();
process.stdout.write(`${fillFn}; ${b64}`);

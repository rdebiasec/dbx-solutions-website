#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const file = path.join(__dirname, 'cdp-b64', `${String(n).padStart(3, '0')}.txt`);
process.stdout.write(fs.readFileSync(file, 'utf8'));

#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const pad = String(n).padStart(3, '0');
const expr = fs.readFileSync(path.join(__dirname, '.expr-cache', `${pad}.expr`), 'utf8');
process.stdout.write(expr);

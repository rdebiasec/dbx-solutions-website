#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const i = Number(process.argv[2]);
const pad = String(i).padStart(3, '0');
process.stdout.write(fs.readFileSync(path.join(__dirname, '.expr-cache', `${pad}.expr`), 'utf8'));

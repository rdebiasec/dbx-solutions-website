#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'upload-progress.json');
const n = Number(process.argv[2]);
const p = JSON.parse(fs.readFileSync(file, 'utf8'));
if (!p.uploaded.includes(n)) p.uploaded.push(n);
p.uploaded.sort((a, b) => a - b);
p.updatedAt = new Date().toISOString();
fs.writeFileSync(file, JSON.stringify(p, null, 2) + '\n');
console.log(JSON.stringify({ appended: n, count: p.uploaded.length }));

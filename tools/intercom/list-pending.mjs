#!/usr/bin/env node
/** Print pending indices in range for upload batch. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const start = Number(process.argv[2] ?? 14);
const end = Number(process.argv[3] ?? 83);
const p = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
const uploaded = new Set(p.uploaded);
const pending = [];
for (let i = start; i <= end; i++) if (!uploaded.has(i)) pending.push(i);
console.log(JSON.stringify({ uploaded: p.uploaded.length, pending: pending.length, indices: pending }));

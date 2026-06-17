#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const n = Number(process.argv[2]);
const progressFile = path.join(__dirname, 'upload-progress.json');
const queueFile = path.join(__dirname, 'upload-queue.json');

const p = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
if (!p.uploaded.includes(n)) p.uploaded.push(n);
p.uploaded.sort((a, b) => a - b);
p.updatedAt = new Date().toISOString();
fs.writeFileSync(progressFile, JSON.stringify(p, null, 2) + '\n');

if (fs.existsSync(queueFile)) {
  const q = JSON.parse(fs.readFileSync(queueFile, 'utf8'));
  q.pending = (q.pending || []).filter((item) => item.index !== n);
  fs.writeFileSync(queueFile, JSON.stringify(q, null, 2) + '\n');
}

console.log(JSON.stringify({ appended: n, uploadedCount: p.uploaded.length }));

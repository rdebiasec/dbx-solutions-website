#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const queueFile = path.join(__dirname, 'upload-queue.json');
const q = JSON.parse(fs.readFileSync(queueFile, 'utf8'));
const next = q.pending?.[0];
if (!next) {
  console.log(JSON.stringify({ done: true }));
  process.exit(0);
}
console.log(JSON.stringify(next));

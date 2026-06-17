#!/usr/bin/env node
/** Write pending index queue for full re-upload. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const p = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
const done = new Set(p.uploaded);
const pending = [];
for (let i = 0; i <= 83; i++) if (!done.has(i)) pending.push(i);
const out = path.join(__dirname, 'upload-pending-queue.json');
fs.writeFileSync(out, JSON.stringify({ pending, count: pending.length, updatedAt: new Date().toISOString() }, null, 2));
console.log(JSON.stringify({ out, count: pending.length, first: pending[0], last: pending[pending.length - 1] }));

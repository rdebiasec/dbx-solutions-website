#!/usr/bin/env node
/** Reset upload-progress to conservatively verified Intercom articles only. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, 'upload-progress.json');

// Confirmed in Intercom UI audit (2026-06-16)
const verified = [1, 16, 25, 33, 76, 77, 78, 79, 80];

const p = {
  total: 84,
  uploaded: [...verified].sort((a, b) => a - b),
  lastTitle: null,
  updatedAt: new Date().toISOString(),
  note: 'Reset to UI-verified only. Re-upload all other indices.',
};

fs.writeFileSync(file, JSON.stringify(p, null, 2) + '\n');
const pending = [];
for (let i = 0; i <= 83; i++) if (!verified.includes(i)) pending.push(i);
console.log(JSON.stringify({ verified: verified.length, pending: pending.length, indices: pending }, null, 2));

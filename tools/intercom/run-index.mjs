#!/usr/bin/env node
/** Print CDP fill expression for manifest index (stdout). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
if (!Number.isInteger(index) || index < 0) {
  console.error('Usage: node run-index.mjs <index>');
  process.exit(1);
}
const scriptPath = path.join(__dirname, 'cdp-scripts', `${String(index).padStart(3, '0')}.js`);
if (!fs.existsSync(scriptPath)) {
  console.error('Missing script:', scriptPath);
  process.exit(1);
}
process.stdout.write(fs.readFileSync(scriptPath, 'utf8'));

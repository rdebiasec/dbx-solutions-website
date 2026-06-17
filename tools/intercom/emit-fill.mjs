#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-manifest.json'), 'utf8'));
const item = manifest[index];
if (!item) {
  console.error('No manifest entry for index', index);
  process.exit(1);
}
process.stdout.write(`window.__intercomFill(${JSON.stringify({
  title: item.title,
  description: item.description,
  content: item.content,
})})`);

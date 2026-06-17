#!/usr/bin/env node
/** JSON payload for browser_fill upload: { index, title, description, content, skip } */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-manifest.json'), 'utf8'));
const item = manifest[index];
if (!item) {
  console.log(JSON.stringify({ error: 'no entry', index }));
  process.exit(1);
}
const skip = item.category === 'index';
console.log(
  JSON.stringify({
    index,
    skip,
    title: item.title,
    description: item.description,
    content: item.content,
    contentLen: item.content.length,
  }),
);

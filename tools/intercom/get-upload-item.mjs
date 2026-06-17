#!/usr/bin/env node
/** Payload for one upload: title (from title-map), description, cleaned content */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-manifest.json'), 'utf8'));
const titleMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'title-map.json'), 'utf8'));
const item = manifest[index];
if (!item) {
  console.error(JSON.stringify({ error: 'no entry', index }));
  process.exit(1);
}

function cleanContent(text) {
  const matches = [...text.matchAll(/^# /gm)];
  if (matches.length <= 1) return text.trim();
  return text.slice(0, matches[1].index).trim();
}

const title = titleMap[String(index)] || item.title;
const content = cleanContent(item.content);
const skip = item.category === 'index';

console.log(
  JSON.stringify({
    index,
    skip,
    title,
    description: item.description,
    content,
    contentLen: content.length,
  }),
);

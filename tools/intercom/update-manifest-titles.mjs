#!/usr/bin/env node
/** Apply title-map.json to upload-manifest.json and regenerate cdp-b64 + expr-cache. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(__dirname, 'upload-manifest.json');
const titleMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'title-map.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

for (let i = 0; i < manifest.length; i++) {
  if (titleMap[String(i)]) manifest[i].title = titleMap[String(i)];
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Updated ${Object.keys(titleMap).length} titles in manifest`);

const b64Dir = path.join(__dirname, 'cdp-b64');
const cacheDir = path.join(__dirname, '.expr-cache');
for (const key of Object.keys(titleMap)) {
  const n = Number(key);
  const fill = execSync(`node ${path.join(__dirname, 'emit-fill.mjs')} ${n}`, { encoding: 'utf8' });
  fs.writeFileSync(path.join(b64Dir, `${String(n).padStart(3, '0')}.txt`), fill);
  const expr = execSync(`node ${path.join(__dirname, 'emit-upload-index.mjs')} ${n}`, {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  fs.writeFileSync(path.join(cacheDir, `${String(n).padStart(3, '0')}.expr`), expr);
}
console.log('Regenerated cdp-b64 and .expr-cache for mapped indices');

#!/usr/bin/env node
/**
 * Write CDP Runtime.evaluate params for desc/body fill to /tmp/intercom-cdp-{index}.json
 */
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const fillExpr = execSync(`node ${path.join(__dirname, 'emit-desc-body.mjs')} ${index}`, {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
});
const pubExpr = fs.readFileSync(path.join(__dirname, 'cdp-publish-full.js'), 'utf8');
const item = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${index}`, { encoding: 'utf8' }),
);
fs.writeFileSync(
  `/tmp/intercom-cdp-${index}.json`,
  JSON.stringify({ index, title: item.title, fillExpr, pubExpr }),
);
console.log(JSON.stringify({ index, title: item.title, fillLen: fillExpr.length }));

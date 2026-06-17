#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const tpl = fs.readFileSync(path.join(__dirname, 'cdp-upload-index-template.js'), 'utf8');
process.stdout.write(tpl.replace('INDEX_PLACEHOLDER', String(index)));

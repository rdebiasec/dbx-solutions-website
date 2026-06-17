#!/usr/bin/env node
/** Fill + publish in one CDP expression for manifest index. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const fill = fs
  .readFileSync(path.join(__dirname, 'cdp-scripts', `${String(index).padStart(3, '0')}.js`), 'utf8')
  .trim();
const pub = fs.readFileSync(path.join(__dirname, 'cdp-publish.js'), 'utf8').trim();
process.stdout.write(`(() => { const fillResult = ${fill}; const publishResult = ${pub}; return { fill: fillResult, publish: publishResult }; })()`);

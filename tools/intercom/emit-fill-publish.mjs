#!/usr/bin/env node
/** Combined fill+publish CDP expression for index N (requires window.__intercomFill). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const fill = execSync(`node ${path.join(__dirname, 'emit-fill-b64.mjs')} ${index}`, { encoding: 'utf8' }).trim();
const publish = fs.readFileSync(path.join(__dirname, 'cdp-publish.js'), 'utf8').trim();
process.stdout.write(`(() => { const fill = ${fill}; const pub = ${publish}; return { fill, publish: pub }; })()`);

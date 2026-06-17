#!/usr/bin/env node
/** Print upload expression for index N (stdout). */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
process.stdout.write(execSync(`node ${path.join(__dirname, 'emit-upload-b64.mjs')} ${index}`, { encoding: 'utf8' }));

#!/usr/bin/env node
/** Short CDP expression: eval base64-encoded desc/body fill for index N. */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const fillExpr = execSync(`node ${path.join(__dirname, 'emit-desc-body.mjs')} ${index}`, {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
});
const b64 = Buffer.from(fillExpr, 'utf8').toString('base64');
const short = `(async () => { const code = atob('${b64}'); return (0, eval)(code); })()`;
process.stdout.write(short);

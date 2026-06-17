#!/usr/bin/env node
/** Emit CDP expression that loads and runs a wrapped upload expr from base64 chunks. */
import fs from 'fs';
const n = Number(process.argv[2]);
const b64 = fs.readFileSync(`/tmp/intercom-expr-${n}.json`, 'utf8');
const wrapped = JSON.parse(b64).cdp.params.expression;
const encoded = Buffer.from(wrapped, 'utf8').toString('base64');
const CHUNK = 8000;
const chunks = [];
for (let i = 0; i < encoded.length; i += CHUNK) chunks.push(encoded.slice(i, i + CHUNK));
const loader = `(async () => {
  const parts = ${JSON.stringify(chunks)};
  const b64 = parts.join('');
  const src = atob(b64);
  return await eval(src);
})()`;
process.stdout.write(loader);
console.error('loader len', loader.length, 'orig', wrapped.length);

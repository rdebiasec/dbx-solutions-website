#!/usr/bin/env node
/** Process one index: print CDP result check + advance command hint */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const n = Number(process.argv[2]);
const resultJson = process.argv[3];
if (!n || !resultJson) {
  console.error('Usage: node process-upload-result.mjs N \'{"result":{...}}\'');
  process.exit(1);
}
const parsed = JSON.parse(resultJson);
const v = parsed.result?.value ?? parsed.value ?? parsed;
const ok = v?.fill?.ok && (v?.publish?.ok || v?.pub?.ok);
console.log(JSON.stringify({ index: n, ok, fill: v?.fill, publish: v?.publish ?? v?.pub }));

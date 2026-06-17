#!/usr/bin/env node
/** Write /tmp/upload-{index}.expr for range start..end */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const start = Number(process.argv[2]);
const end = Number(process.argv[3] ?? start);
const SKIP = [81, 82, 83];

for (let i = start; i <= end; i++) {
  if (SKIP.includes(i)) continue;
  const expr = execSync(`node ${path.join(__dirname, 'get-cdp-upload-expr.mjs')} ${i}`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
  fs.writeFileSync(`/tmp/upload-${i}.expr`, expr);
  console.log(`wrote /tmp/upload-${i}.expr (${expr.length} bytes)`);
}

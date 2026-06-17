#!/usr/bin/env node
/** Build /tmp/mcp-NNN.json for index range. node build-mcp-args.mjs 11 83 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const start = Number(process.argv[2]);
const end = Number(process.argv[3] ?? start);
const viewId = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

for (let i = start; i <= end; i++) {
  const params = JSON.parse(
    execSync(`node ${path.join(__dirname, 'batch-cdp-payload.mjs')} ${i}`, {
      encoding: 'utf8',
      maxBuffer: 20 * 1024 * 1024,
    }),
  );
  fs.writeFileSync(
    `/tmp/mcp-${String(i).padStart(3, '0')}.json`,
    JSON.stringify({ method: 'Runtime.evaluate', params, viewId }),
  );
}
console.log(`built ${end - start + 1} files`);

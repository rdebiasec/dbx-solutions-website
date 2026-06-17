#!/usr/bin/env node
/**
 * Generate combined fill+publish CDP expression for index N (CSP-safe, no eval).
 * Usage: node get-cdp-upload-expr.mjs 8 > /tmp/upload-8.expr
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const fill = execSync(`node ${path.join(__dirname, 'get-cdp-fill-expr.mjs')} ${index}`, {
  encoding: 'utf8',
  maxBuffer: 10 * 1024 * 1024,
});
const publish = fs.readFileSync(path.join(__dirname, 'cdp-publish-full.js'), 'utf8').trim();
const wait = `(async () => {
  await new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (document.querySelector('textarea[placeholder="Untitled public article"]')) resolve(true);
      else if (Date.now() - start > 20000) reject(new Error('timeout waiting for editor'));
      else setTimeout(check, 200);
    };
    check();
  });
})()`;
process.stdout.write(
  `(async () => { await ${wait}; const fill = await (${fill}); if (!fill?.ok) return { ok:false, phase:'fill', fill }; await new Promise(r=>setTimeout(r,400)); const pub = await (${publish}); return { ok: pub?.ok !== false, fill, pub }; })()`,
);

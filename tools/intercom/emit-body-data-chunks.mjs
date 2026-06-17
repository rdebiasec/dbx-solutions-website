#!/usr/bin/env node
/** Chunked CDP: load JSON data then call __intercomFillBody. */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const item = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${index}`, { encoding: 'utf8' }),
);
const payload = JSON.stringify({ description: item.description, content: item.content });
const chunkSize = 3000;
const chunks = [];
for (let i = 0; i < payload.length; i += chunkSize) {
  chunks.push(payload.slice(i, i + chunkSize));
}
const init = `window.__bodyData='';`;
const injects = chunks.map((c) => `window.__bodyData+='${c.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}';`);
const run = `(() => { try { return window.__intercomFillBody(JSON.parse(window.__bodyData)); } catch(e) { return { ok:false, err:String(e) }; } })()`;
console.log(JSON.stringify({ init, injects, run, chunks: chunks.length, payloadLen: payload.length }));

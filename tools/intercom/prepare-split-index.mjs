#!/usr/bin/env node
/** Write CDP step JSON files for split upload workflow. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const n = Number(process.argv[2]);
const outDir = `/tmp/split-${n}`;
fs.mkdirSync(outDir, { recursive: true });

const item = JSON.parse(
  execSync(`node ${path.join(__dirname, 'get-upload-item.mjs')} ${n}`, { encoding: 'utf8' }),
);
if (item.skip) {
  console.log(JSON.stringify({ index: n, skip: true }));
  process.exit(0);
}

fs.writeFileSync(path.join(outDir, 'meta.json'), JSON.stringify({ index: n, url: URL, title: item.title, viewId: VIEW }));

const openOut = execSync(`node ${path.join(__dirname, 'emit-open-editor.mjs')}`, { encoding: 'utf8' }).trim();
fs.writeFileSync(path.join(outDir, 'open.json'), openOut);

const fillOut = execSync(`node ${path.join(__dirname, 'emit-fill-only.mjs')} ${n}`, { encoding: 'utf8' }).trim();
const fillParsed = JSON.parse(fillOut);
fs.writeFileSync(path.join(outDir, 'fill.json'), JSON.stringify(fillParsed.cdp));

for (const [i, f] of ['cdp-publish-s1.js', 'cdp-publish-s2.js', 'cdp-publish-s3.js', 'cdp-publish-s4.js'].entries()) {
  const expr = fs.readFileSync(path.join(__dirname, f), 'utf8').trim();
  fs.writeFileSync(
    path.join(outDir, `pub-s${i + 1}.json`),
    JSON.stringify({
      method: 'Runtime.evaluate',
      params: { expression: expr, awaitPromise: true, returnByValue: true },
      viewId: VIEW,
    }),
  );
}

console.log(JSON.stringify({ index: n, outDir, title: item.title }));

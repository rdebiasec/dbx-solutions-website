#!/usr/bin/env node
/** Parse /tmp/mcp-step.json -> {tool, index?, title?, payloadFile?} */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STEP = '/tmp/mcp-step.json';
if (!fs.existsSync(STEP)) {
  console.log(JSON.stringify({ idle: true }));
  process.exit(0);
}
const step = JSON.parse(fs.readFileSync(STEP, 'utf8'));
const out = { tool: step.tool, ts: step.ts };
if (step.tool === 'browser_cdp') {
  const expr = step.payload?.params?.expression || '';
  const m = expr.match(/"title":"([^"]+)"/);
  out.title = m?.[1] || '';
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-manifest.json'), 'utf8'));
  const titleMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'title-map.json'), 'utf8'));
  for (let i = 0; i < manifest.length; i++) {
    const t = titleMap[String(i)] || manifest[i].title;
    if (t === out.title) {
      out.index = i;
      out.payloadFile = `/tmp/cdp-payload-${i}.json`;
      break;
    }
  }
}
console.log(JSON.stringify(out));

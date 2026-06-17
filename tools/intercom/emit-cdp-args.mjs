#!/usr/bin/env node
/** Emit browser_cdp args from /tmp/cdp-queue-N.json or /tmp/mcp-call-N.json */
import fs from 'fs';
const n = Number(process.argv[2]);
const f = [`/tmp/mcp-call-${n}.json`, `/tmp/cdp-queue-${n}.json`, `/tmp/micro-all-${n}.json`].find((p) =>
  fs.existsSync(p),
);
if (!f) {
  console.error(JSON.stringify({ error: 'no payload', n }));
  process.exit(1);
}
process.stdout.write(fs.readFileSync(f, 'utf8'));

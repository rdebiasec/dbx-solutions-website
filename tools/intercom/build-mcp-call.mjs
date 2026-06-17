#!/usr/bin/env node
/** Output full browser_cdp CallMcpTool arguments JSON for index N. */
import fs from 'fs';

const n = Number(process.argv[2]);
const compact = JSON.parse(
  fs.readFileSync(`/tmp/cdp-compact-${String(n).padStart(3, '0')}.json`, 'utf8'),
);
const out = {
  method: 'Runtime.evaluate',
  params: compact,
  viewId: 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c',
};
process.stdout.write(JSON.stringify(out));

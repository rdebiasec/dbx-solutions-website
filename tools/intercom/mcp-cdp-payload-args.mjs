#!/usr/bin/env node
/** Print browser_cdp CallMcpTool args for /tmp/cdp-payload-N.json */
import fs from 'fs';
const n = Number(process.argv[2]);
const payload = JSON.parse(fs.readFileSync(`/tmp/cdp-payload-${n}.json`, 'utf8'));
console.log(
  JSON.stringify({
    server: 'cursor-ide-browser',
    toolName: 'browser_cdp',
    arguments: {
      method: 'Runtime.evaluate',
      params: payload,
      viewId: 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c',
    },
  }),
);

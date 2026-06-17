#!/usr/bin/env node
/** Write CallMcpTool arguments JSON for browser_cdp from a CDP payload file. */
import fs from 'fs';

const payloadFile = process.argv[2];
const viewId = process.argv[3] || 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const payload = JSON.parse(fs.readFileSync(payloadFile, 'utf8'));
process.stdout.write(
  JSON.stringify({
    server: 'cursor-ide-browser',
    toolName: 'browser_cdp',
    arguments: {
      method: payload.method,
      params: payload.params,
      viewId,
    },
  }),
);

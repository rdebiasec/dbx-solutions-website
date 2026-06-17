#!/usr/bin/env node
/** Print current agent-action for MCP execution. */
import fs from 'fs';

const ACTION = '/tmp/agent-action.json';
if (!fs.existsSync(ACTION)) {
  console.log(JSON.stringify({ ready: false }));
  process.exit(0);
}
const a = JSON.parse(fs.readFileSync(ACTION, 'utf8'));
if (a.tool === 'browser_cdp') {
  const cdp = a.payload;
  console.log(
    JSON.stringify({
      ready: true,
      tool: 'browser_cdp',
      index: a.index,
      label: a.label,
      method: cdp.method,
      params: cdp.params,
      viewId: cdp.viewId,
    }),
  );
} else {
  console.log(JSON.stringify({ ready: true, ...a }));
}

#!/usr/bin/env node
/** Read /tmp/agent-action.json; print MCP call args or {local:true} for sleep/append handled by runner. */
import fs from 'fs';
const ACTION = '/tmp/agent-action.json';
if (!fs.existsSync(ACTION)) {
  console.log(JSON.stringify({ wait: true }));
  process.exit(0);
}
const a = JSON.parse(fs.readFileSync(ACTION, 'utf8'));
if (a.tool === 'browser_navigate') {
  console.log(JSON.stringify({ tool: 'browser_navigate', args: a.payload, index: a.index, step: a.step }));
} else if (a.tool === 'browser_cdp') {
  console.log(JSON.stringify({ tool: 'browser_cdp', args: a.payload, index: a.index, label: a.label }));
} else {
  console.log(JSON.stringify({ unknown: a }));
}

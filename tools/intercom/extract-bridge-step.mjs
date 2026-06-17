#!/usr/bin/env node
/** Extract CDP MCP args from /tmp/mcp-step.json or /tmp/current-bridge-cdp.json for agent CallMcpTool. */
import fs from 'fs';
const f = fs.existsSync('/tmp/mcp-step.json') ? '/tmp/mcp-step.json' : '/tmp/current-bridge-cdp.json';
const step = JSON.parse(fs.readFileSync(f, 'utf8'));
const payload = step.payload || step;
if (step.tool === 'browser_navigate' || !payload.method) {
  console.log(JSON.stringify({ tool: 'browser_navigate', args: step.payload || payload }));
} else {
  fs.writeFileSync('/tmp/current-bridge-cdp.json', JSON.stringify(payload));
  console.log(JSON.stringify({ tool: 'browser_cdp', args: payload, exprLen: payload.params?.expression?.length }));
}

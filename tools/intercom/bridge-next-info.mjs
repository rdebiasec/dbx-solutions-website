#!/usr/bin/env node
/**
 * Print next bridge step info for agent MCP fulfill loop.
 * Usage: node bridge-next-info.mjs
 */
import fs from 'fs';
const STEP = '/tmp/mcp-step.json';
const REPORT = '/tmp/glass-bridge-report.json';
if (fs.existsSync(REPORT)) {
  console.log(JSON.stringify({ done: true, report: JSON.parse(fs.readFileSync(REPORT, 'utf8')) }));
  process.exit(0);
}
if (!fs.existsSync(STEP)) {
  console.log(JSON.stringify({ wait: true }));
  process.exit(0);
}
const s = JSON.parse(fs.readFileSync(STEP, 'utf8'));
if (s.tool === 'browser_navigate') {
  console.log(JSON.stringify({ tool: 'browser_navigate', args: s.payload, index: 'pending' }));
} else if (s.tool === 'browser_cdp') {
  const expr = s.payload?.params?.expression || '';
  const m = expr.match(/__intercomFill\(\{[^}]*"title":"([^"]+)"/) || expr.match(/"title":"([^"]+)"/);
  fs.writeFileSync('/tmp/current-bridge-cdp.json', JSON.stringify(s.payload));
  console.log(JSON.stringify({ tool: 'browser_cdp', argsFile: '/tmp/current-bridge-cdp.json', title: m?.[1]?.slice(0, 60), exprLen: expr.length }));
}

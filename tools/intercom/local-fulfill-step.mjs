#!/usr/bin/env node
/** Read /tmp/mcp-step.json, print action summary for agent fulfillment. */
import fs from 'fs';

const STEP = '/tmp/mcp-step.json';
if (!fs.existsSync(STEP)) {
  console.log(JSON.stringify({ skip: true }));
  process.exit(0);
}
const step = JSON.parse(fs.readFileSync(STEP, 'utf8'));
console.log(JSON.stringify({ tool: step.tool, payload: step.payload }));

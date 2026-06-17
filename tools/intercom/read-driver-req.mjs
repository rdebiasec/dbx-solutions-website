#!/usr/bin/env node
/** Agent-side: process one driver request via MCP bridge file. Prints MCP args JSON. */
import fs from 'fs';
const REQ = '/tmp/driver-req.json';
if (!fs.existsSync(REQ)) {
  console.log(JSON.stringify({ done: true }));
  process.exit(0);
}
const req = JSON.parse(fs.readFileSync(REQ, 'utf8'));
console.log(JSON.stringify(req));

#!/usr/bin/env node
/** Write /tmp/mcp-result.json using tag from current /tmp/mcp-call.json */
import fs from 'fs';
const call = JSON.parse(fs.readFileSync('/tmp/mcp-call.json', 'utf8'));
const result = JSON.parse(process.argv[2] || '{}');
fs.writeFileSync('/tmp/mcp-result.json', JSON.stringify({ tag: call.tag, result }));

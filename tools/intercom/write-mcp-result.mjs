#!/usr/bin/env node
/** Agent helper: read mcp-step, write mcp-result after MCP. Usage: write-result '<json>' */
import fs from 'fs';
const RESULT = '/tmp/mcp-result.json';
const step = fs.existsSync('/tmp/mcp-step.json')
  ? JSON.parse(fs.readFileSync('/tmp/mcp-step.json', 'utf8'))
  : null;
const result = JSON.parse(process.argv[2] || '{}');
fs.writeFileSync(RESULT, JSON.stringify(result));
console.log(JSON.stringify({ written: true, tool: step?.tool, index: step?.index }));

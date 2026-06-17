#!/usr/bin/env node
/** Write driver response after MCP call. */
import fs from 'fs';
const step = process.argv[2];
const result = process.argv[3] || '{}';
fs.writeFileSync('/tmp/driver-res.json', JSON.stringify({ step: isNaN(Number(step)) ? step : Number(step), result: JSON.parse(result) }));
console.log('ok');

#!/usr/bin/env node
/** Print browser_cdp args for index N from /tmp/mcp-args-N.json */
import fs from 'fs';
const n = Number(process.argv[2]);
const j = JSON.parse(fs.readFileSync(`/tmp/mcp-args-${n}.json`, 'utf8'));
process.stdout.write(JSON.stringify(j));

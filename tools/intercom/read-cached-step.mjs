#!/usr/bin/env node
/** Read step payload from /tmp/run{index}/{step}.json and print for MCP. */
import fs from 'fs';
const [index, step] = process.argv.slice(2).map(Number);
const f = `/tmp/run${index}/${step}.json`;
if (!fs.existsSync(f)) process.exit(1);
process.stdout.write(fs.readFileSync(f, 'utf8'));

#!/usr/bin/env node
/** Print browser_cdp arguments JSON for session store step (one line). */
import fs from 'fs';

const file = process.argv[2];
const j = JSON.parse(fs.readFileSync(file, 'utf8'));
const args = j.arguments ?? j;
process.stdout.write(JSON.stringify(args));

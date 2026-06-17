#!/usr/bin/env node
/** Print MCP browser_cdp args for index N (read from /tmp/cdp-payload-N.json). */
import fs from 'fs';
const n = Number(process.argv[2]);
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const params = JSON.parse(fs.readFileSync(`/tmp/cdp-payload-${n}.json`, 'utf8'));
console.log(JSON.stringify({ method: 'Runtime.evaluate', params, viewId: VIEW }));

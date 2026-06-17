#!/usr/bin/env node
/** Print browser_cdp arguments JSON for index N (reads /tmp/cdp-params-N.json) */
import fs from 'fs';
const n = Number(process.argv[2]);
const params = JSON.parse(fs.readFileSync(`/tmp/cdp-params-${n}.json`, 'utf8'));
process.stdout.write(JSON.stringify({
  method: 'Runtime.evaluate',
  params,
  viewId: 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c',
}));

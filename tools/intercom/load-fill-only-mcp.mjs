#!/usr/bin/env node
/** Print browser_cdp args for fill-only payload /tmp/cdp-fill-only-N.json */
import fs from 'fs';

const n = Number(process.argv[2]);
const payload = JSON.parse(fs.readFileSync(`/tmp/cdp-fill-only-${n}.json`, 'utf8'));
console.log(
  JSON.stringify({
    method: 'Runtime.evaluate',
    params: payload,
    viewId: 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c',
  }),
);

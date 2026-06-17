#!/usr/bin/env node
/** Output browser_cdp arguments JSON for index N (reads /tmp/cdp-params-N.json). */
import fs from 'fs';

const n = Number(process.argv[2]);
const paramsFile = `/tmp/cdp-params-${n}.json`;
if (!fs.existsSync(paramsFile)) {
  console.error(JSON.stringify({ error: 'missing', file: paramsFile }));
  process.exit(1);
}
const params = JSON.parse(fs.readFileSync(paramsFile, 'utf8'));
const out = {
  method: 'Runtime.evaluate',
  params,
  viewId: 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c',
};
process.stdout.write(JSON.stringify(out));

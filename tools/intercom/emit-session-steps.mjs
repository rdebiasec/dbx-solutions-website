#!/usr/bin/env node
/** Print one CDP step JSON per line from session-upload dir. */
import fs from 'fs';

const dir = process.argv[2];
const files = fs.readdirSync(dir).filter((f) => f.startsWith('step-')).sort((a, b) => {
  const na = Number(a.match(/\d+/)[0]);
  const nb = Number(b.match(/\d+/)[0]);
  return na - nb;
});
for (const f of files) {
  const step = JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'));
  process.stdout.write(JSON.stringify(step) + '\n');
}

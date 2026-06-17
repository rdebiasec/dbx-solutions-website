#!/usr/bin/env node
/** Output {index, expr} JSON for given indices (argv). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cache = path.join(__dirname, '.expr-cache');
for (const arg of process.argv.slice(2)) {
  const i = Number(arg);
  const pad = String(i).padStart(3, '0');
  const expr = fs.readFileSync(path.join(cache, `${pad}.expr`), 'utf8');
  process.stdout.write(JSON.stringify({ index: i, expr }) + '\n');
}

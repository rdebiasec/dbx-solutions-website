#!/usr/bin/env node
import fs from 'fs';
const file = process.argv[2];
const j = JSON.parse(fs.readFileSync(file, 'utf8'));
process.stdout.write(JSON.stringify({ method: j.method, params: j.params, viewId: j.viewId }));

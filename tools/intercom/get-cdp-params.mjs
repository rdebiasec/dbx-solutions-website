#!/usr/bin/env node
import fs from 'fs';
const n = Number(process.argv[2]);
const j = JSON.parse(fs.readFileSync(`/tmp/intercom-expr-${n}.json`, 'utf8'));
process.stdout.write(JSON.stringify(j.cdp.params));

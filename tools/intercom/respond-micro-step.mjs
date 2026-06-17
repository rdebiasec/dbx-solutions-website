#!/usr/bin/env node
import fs from 'fs';
const v = JSON.parse(process.argv[2] || '{}');
fs.writeFileSync('/tmp/micro-step-res.json', JSON.stringify(v));

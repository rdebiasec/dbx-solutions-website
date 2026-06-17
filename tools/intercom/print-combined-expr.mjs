#!/usr/bin/env node
/** Print combined upload expression for index N. */
import fs from 'fs';
const n = Number(process.argv[2]);
process.stdout.write(fs.readFileSync(`/tmp/intercom-upload/combined/${n}.expr`, 'utf8'));

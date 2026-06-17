#!/usr/bin/env node
/** Output CDP evaluate expression that runs base64-encoded fill script. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const index = Number(process.argv[2]);
const fill = execSync(`node ${path.join(__dirname, 'emit-fill.mjs')} ${index}`, {
  encoding: 'utf8',
});
// Direct call — Intercom CSP blocks eval(atob(...))
process.stdout.write(fill);

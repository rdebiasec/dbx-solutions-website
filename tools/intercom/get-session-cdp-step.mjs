#!/usr/bin/env node
/** Output browser_cdp arguments for sessionStorage upload step. */
import fs from 'fs';

const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const n = Number(process.argv[2]);
const step = process.argv[3];
const dir = `/tmp/session-mcp-${n}`;
const file = step === 'run' ? 'run.json' : `store-${step}.json`;
const p = JSON.parse(fs.readFileSync(`${dir}/${file}`, 'utf8'));
process.stdout.write(JSON.stringify({ method: p.method, params: p.params, viewId: VIEW }));

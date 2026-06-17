#!/usr/bin/env node
/** Print step summary for index N */
import fs from 'fs';
const n = Number(process.argv[2]);
const plan = JSON.parse(fs.readFileSync(`/tmp/upload-steps-${n}.json`, 'utf8'));
const cdpSteps = plan.steps.filter(s => s.action === 'cdp');
console.log(JSON.stringify({ index: n, title: plan.title, cdpCount: cdpSteps.length, hasFillTitle: plan.steps.some(s => s.action === 'fill_title') }));

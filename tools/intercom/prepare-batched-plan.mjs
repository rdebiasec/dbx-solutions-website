#!/usr/bin/env node
/** Run batched upload for index N via file bridge + exact MCP payloads. */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const n = Number(process.argv[2]);
const CALL = '/tmp/mcp-call.json';
const RES = '/tmp/mcp-result.json';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

execSync(`node ${path.join(__dirname, 'emit-session-batched.mjs')} ${n}`, { stdio: 'pipe' });
const dir = `/tmp/upload-batch-${n}`;
const steps = fs
  .readdirSync(dir)
  .sort((a, b) => {
    if (a === 'run.json') return 1;
    if (b === 'run.json') return -1;
    return a.localeCompare(b, undefined, { numeric: true });
  })
  .map((f) => path.join(dir, f));

const plan = {
  index: n,
  url: URL,
  viewId: VIEW,
  steps: steps.map((file, i) => ({
    tag: i === steps.length - 1 ? 'run' : `batch-${i}`,
    file,
    payload: JSON.parse(fs.readFileSync(file, 'utf8')),
  })),
};
const planFile = `/tmp/upload-plan-${n}.json`;
fs.writeFileSync(planFile, JSON.stringify(plan, null, 2));
console.log(JSON.stringify({ index: n, planFile, stepCount: steps.length }));

#!/usr/bin/env node
/** Emit next MCP call from batched plan; agent executes and writes /tmp/mcp-result.json */
import fs from 'fs';

const n = Number(process.argv[2]);
const step = Number(process.argv[3] ?? 0);
const plan = JSON.parse(fs.readFileSync(`/tmp/upload-plan-${n}.json`, 'utf8'));
const RES = '/tmp/mcp-result.json';

if (process.argv[3] === 'record') {
  const last = JSON.parse(fs.readFileSync(RES, 'utf8'));
  const raw = JSON.stringify({ result: { value: last.result?.value ?? last } });
  console.log(raw);
  process.exit(0);
}

const total = plan.steps.length + 1; // + nav
if (step === 0) {
  console.log(
    JSON.stringify({
      tag: 'nav',
      tool: 'browser_navigate',
      args: { url: plan.url, viewId: plan.viewId },
      step: 0,
      total,
    }),
  );
  process.exit(0);
}

const s = plan.steps[step - 1];
console.log(
  JSON.stringify({
    tag: s.tag,
    tool: 'browser_cdp',
    args: s.payload,
    step,
    total,
    index: n,
  }),
);

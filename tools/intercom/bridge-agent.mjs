#!/usr/bin/env node
/** Read bridge step or write result. Usage: read | write '<json>' */
import fs from 'fs';

const STEP = '/tmp/mcp-step.json';
const RESULT = '/tmp/mcp-result.json';
const cmd = process.argv[2];

if (cmd === 'read') {
  if (!fs.existsSync(STEP)) {
    console.log(JSON.stringify({ ready: false }));
    process.exit(0);
  }
  const step = JSON.parse(fs.readFileSync(STEP, 'utf8'));
  if (step.tool === 'browser_cdp' && step.payload?.cdpFile) {
    const cdp = JSON.parse(fs.readFileSync(step.payload.cdpFile, 'utf8'));
    step.cdp = cdp;
  }
  console.log(JSON.stringify({ ready: true, ...step }));
} else if (cmd === 'write') {
  fs.writeFileSync(RESULT, process.argv[3] || '{}');
  console.log(JSON.stringify({ written: true }));
} else {
  console.error('Usage: bridge-agent.mjs read|write');
  process.exit(1);
}

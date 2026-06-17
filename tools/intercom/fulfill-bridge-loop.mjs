#!/usr/bin/env node
/** Fulfill /tmp/mcp-step.json in a loop until bridge exits. Run bridge in parallel. */
import fs from 'fs';
import { execSync, spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STEP = '/tmp/mcp-step.json';
const RESULT = '/tmp/mcp-result.json';
const start = Number(process.argv[2] ?? 24);
const end = Number(process.argv[3] ?? 35);
const LOG = `/tmp/fulfill-bridge-${start}-${end}.log`;

function log(m) {
  fs.appendFileSync(LOG, `${new Date().toISOString()} ${m}\n`);
}

try {
  fs.unlinkSync(RESULT);
} catch {}
try {
  fs.unlinkSync(STEP);
} catch {}

const bridge = spawn('node', [path.join(__dirname, 'glass-single-expr-bridge.mjs'), String(start), String(end)], {
  stdio: ['ignore', 'pipe', 'pipe'],
});
bridge.stdout.on('data', (d) => log(`bridge: ${d}`));
bridge.stderr.on('data', (d) => log(`bridge-err: ${d}`));

let done = false;
bridge.on('close', (code) => {
  log(`bridge exit ${code}`);
  done = true;
});

const deadline = Date.now() + 3600000;
while (!done && Date.now() < deadline) {
  if (fs.existsSync(STEP)) {
    const step = JSON.parse(fs.readFileSync(STEP, 'utf8'));
    log(`STEP ${step.tool} ${JSON.stringify(step.payload).slice(0, 80)}`);
    fs.writeFileSync('/tmp/mcp-step-pending.json', JSON.stringify(step));
    // Agent must fulfill - write marker
    fs.writeFileSync('/tmp/mcp-needs-fulfill', String(Date.now()));
    const t0 = Date.now();
    while (!fs.existsSync(RESULT) && Date.now() - t0 < 240000) {
      execSync('sleep 0.2');
      if (done) break;
    }
    if (!fs.existsSync(RESULT)) {
      log('TIMEOUT waiting result');
      process.exit(1);
    }
    try {
      fs.unlinkSync(STEP);
    } catch {}
  } else {
    execSync('sleep 0.2');
  }
}

console.log(fs.readFileSync(LOG, 'utf8').slice(-2000));

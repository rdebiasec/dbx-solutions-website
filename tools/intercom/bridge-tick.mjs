#!/usr/bin/env node
/**
 * Agent-side bridge tick: read current step or write result and get next.
 * Usage:
 *   node bridge-tick.mjs read          -> prints current /tmp/mcp-step.json or {done:true}
 *   node bridge-tick.mjs write '<json>' -> writes /tmp/mcp-result.json, prints next step or done
 */
import fs from 'fs';
import { execSync } from 'child_process';

const STEP = '/tmp/mcp-step.json';
const RESULT = '/tmp/mcp-result.json';
const DONE = '/tmp/mcp-bridge-done.json';
const cmd = process.argv[2];

function readStep() {
  if (fs.existsSync(DONE)) {
    return { done: true, bridge: JSON.parse(fs.readFileSync(DONE, 'utf8')) };
  }
  if (fs.existsSync(STEP)) {
    return JSON.parse(fs.readFileSync(STEP, 'utf8'));
  }
  return { done: true, reason: 'no-step' };
}

function waitStep(timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const s = readStep();
    if (!s.done || s.bridge) return s;
    if (fs.existsSync(STEP)) {
      try {
        return JSON.parse(fs.readFileSync(STEP, 'utf8'));
      } catch {}
    }
    execSync('sleep 0.05');
  }
  return { done: true, reason: 'timeout' };
}

if (cmd === 'read') {
  console.log(JSON.stringify(waitStep()));
} else if (cmd === 'write') {
  const result = JSON.parse(process.argv[3] || '{}');
  try {
    fs.unlinkSync(RESULT);
  } catch {}
  fs.writeFileSync(RESULT, JSON.stringify(result));
  const next = waitStep();
  console.log(JSON.stringify(next));
} else {
  console.error('Usage: read | write <json>');
  process.exit(1);
}

#!/usr/bin/env node
/**
 * Run micro CDP steps from JSONL via Playwright when CDP_ENDPOINT is set.
 * Usage: CDP_ENDPOINT=http://127.0.0.1:PORT node micro-cdp-playwright.mjs /tmp/micro-upload-31/steps.jsonl
 */
import fs from 'fs';

const jsonl = process.argv[2];
const from = Number(process.argv[3] ?? 0);
const cdpEndpoint = process.env.CDP_ENDPOINT;
if (!cdpEndpoint) {
  console.error(JSON.stringify({ error: 'CDP_ENDPOINT required' }));
  process.exit(2);
}

const lines = fs.readFileSync(jsonl, 'utf8').trim().split('\n');
const { chromium } = await import('playwright');

const browser = await chromium.connectOverCDP(cdpEndpoint);
const page =
  browser.contexts()[0]?.pages().find((p) => p.url().includes('intercom.com')) ??
  browser.contexts()[0]?.pages()[0];

if (!page) {
  console.error(JSON.stringify({ error: 'no intercom page' }));
  process.exit(1);
}

let last;
for (let i = from; i < lines.length; i++) {
  const step = JSON.parse(lines[i]);
  last = await page.evaluate(
    async ({ expression, awaitPromise }) => {
      if (awaitPromise) return await eval(`(${expression})`);
      return eval(expression);
    },
    { expression: step.params.expression, awaitPromise: !!step.params.awaitPromise },
  );
  if (i % 10 === 0) process.stderr.write(`step ${i}/${lines.length - 1}\n`);
}

console.log(JSON.stringify({ steps: lines.length - from, last }));
await browser.close();

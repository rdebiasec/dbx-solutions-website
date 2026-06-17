#!/usr/bin/env node
/**
 * Automated upload runner using sessionStorage chunks + Playwright CDP.
 * Requires CDP_ENDPOINT env (ws:// or http:// debugger URL for Glass browser tab).
 * Usage: CDP_ENDPOINT=... node session-upload-runner.mjs [start] [end]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const progressFile = path.join(__dirname, 'upload-progress.json');
const start = Number(process.argv[2] ?? 14);
const end = Number(process.argv[3] ?? 80);
const cdpEndpoint = process.env.CDP_ENDPOINT;

function loadProgress() {
  return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
}

function appendIndex(n) {
  execSync(`node ${path.join(__dirname, 'append-progress.mjs')} ${n}`, { stdio: 'inherit' });
}

function prepareSession(index) {
  execSync(`node ${path.join(__dirname, 'prepare-session-chunks.mjs')} ${index}`, { stdio: 'pipe' });
  return `/tmp/session-upload-${index}`;
}

async function runWithPlaywright(page, index) {
  const dir = prepareSession(index);
  const steps = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith('step-'))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]))
    .map((f) => JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8')));

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  let last;
  for (const step of steps) {
    last = await page.evaluate(async ({ expression, awaitPromise }) => {
      if (awaitPromise) {
        // eslint-disable-next-line no-eval
        return await eval(`(${expression})`);
      }
      // eslint-disable-next-line no-eval
      return eval(expression);
    }, { expression: step.params.expression, awaitPromise: !!step.params.awaitPromise });
  }
  return last;
}

async function main() {
  if (!cdpEndpoint) {
    console.error(JSON.stringify({ error: 'CDP_ENDPOINT required' }));
    process.exit(1);
  }
  const { chromium } = await import('playwright');
  const browser = await chromium.connectOverCDP(cdpEndpoint);
  const context = browser.contexts()[0] ?? (await browser.newContext());
  const page = context.pages().find((p) => p.url().includes('intercom.com')) ?? context.pages()[0] ?? (await context.newPage());

  const uploadedThisRun = [];
  const failures = [];
  const p = loadProgress();

  for (let i = start; i <= end; i++) {
    if (p.uploaded.includes(i)) continue;
    try {
      const result = await runWithPlaywright(page, i);
      const ok = result?.ok === true || result?.fill?.ok || result?.pub?.ok || result?.phase === 'publish';
      if (ok) {
        appendIndex(i);
        uploadedThisRun.push(i);
        console.error(`OK ${i}`);
      } else {
        failures.push({ index: i, result });
        console.error(`FAIL ${i}`, JSON.stringify(result));
      }
    } catch (e) {
      failures.push({ index: i, error: String(e) });
      console.error(`ERR ${i}`, e);
    }
  }

  const final = loadProgress();
  console.log(JSON.stringify({ uploadedThisRun, failures, progressCount: final.uploaded.length }));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

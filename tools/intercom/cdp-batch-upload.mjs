#!/usr/bin/env node
/**
 * Drive Intercom uploads via CDP WebSocket when BROWSER_CDP_WS is set,
 * otherwise print MCP instructions for agent.
 *
 * Usage: BROWSER_CDP_WS=ws://... node cdp-batch-upload.mjs 7 80
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW_URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const progressFile = path.join(__dirname, 'upload-progress.json');
const start = Number(process.argv[2] ?? 7);
const end = Number(process.argv[3] ?? 80);
const wsUrl = process.env.BROWSER_CDP_WS;

function loadProgress() {
  return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
}
function saveProgress(p) {
  p.updatedAt = new Date().toISOString();
  fs.writeFileSync(progressFile, JSON.stringify(p, null, 2) + '\n');
}
function appendIndex(n) {
  const p = loadProgress();
  if (!p.uploaded.includes(n)) p.uploaded.push(n);
  p.uploaded.sort((a, b) => a - b);
  saveProgress(p);
}

async function cdpEval(ws, expression) {
  const id = Math.floor(Math.random() * 1e9);
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('cdp timeout')), 120000);
    const onMsg = (raw) => {
      const msg = JSON.parse(raw.toString());
      if (msg.id === id) {
        clearTimeout(timer);
        ws.off('message', onMsg);
        if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)));
        else resolve(msg.result?.result?.value ?? msg.result);
      }
    };
    ws.on('message', onMsg);
    ws.send(
      JSON.stringify({
        id,
        method: 'Runtime.evaluate',
        params: { expression, awaitPromise: true, returnByValue: true },
      }),
    );
  });
}

async function cdpNavigate(ws, url) {
  const id = Math.floor(Math.random() * 1e9);
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('nav timeout')), 30000);
    const onMsg = (raw) => {
      const msg = JSON.parse(raw.toString());
      if (msg.id === id) {
        clearTimeout(timer);
        ws.off('message', onMsg);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      }
    };
    ws.on('message', onMsg);
    ws.send(JSON.stringify({ id, method: 'Page.navigate', params: { url } }));
  });
}

async function main() {
  if (!wsUrl) {
    console.error('BROWSER_CDP_WS not set');
    process.exit(2);
  }
  const { default: WebSocket } = await import('ws');
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => {
    ws.once('open', res);
    ws.once('error', rej);
  });

  const failures = [];
  let published = 0;
  const pollExpr = `(async () => { const deadline = Date.now() + 15000; while (Date.now() < deadline) { if (document.querySelector('textarea[placeholder="Untitled public article"]')) return { ready: true }; await new Promise(r => setTimeout(r, 200)); } return { ready: false }; })()`;

  for (let i = start; i <= end; i++) {
    const p = loadProgress();
    if (p.uploaded.includes(i)) continue;
    const exprPath = `/tmp/intercom-upload/combined/${i}.expr`;
    if (!fs.existsSync(exprPath)) {
      failures.push({ index: i, err: 'missing expr' });
      continue;
    }
    const expr = fs.readFileSync(exprPath, 'utf8');
    try {
      console.error(`[${i}] navigate`);
      await cdpNavigate(ws, VIEW_URL);
      await new Promise((r) => setTimeout(r, 800));
      console.error(`[${i}] poll`);
      const poll = await cdpEval(ws, pollExpr);
      if (!poll?.ready) throw new Error('poll failed');
      console.error(`[${i}] upload`);
      const result = await cdpEval(ws, expr);
      if (!result?.ok) throw new Error(JSON.stringify(result));
      appendIndex(i);
      published++;
      console.error(`[${i}] OK ${result.title || ''}`);
      await new Promise((r) => setTimeout(r, 500));
    } catch (e) {
      failures.push({ index: i, err: String(e) });
      console.error(`[${i}] FAIL ${e}`);
    }
  }
  ws.close();
  const final = loadProgress();
  console.log(JSON.stringify({ published, failures, uploadedCount: final.uploaded.length }));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

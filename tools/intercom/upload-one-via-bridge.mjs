#!/usr/bin/env node
/**
 * Upload one index via file bridge for agent MCP driver.
 * Writes /tmp/upload-one-call.json; waits /tmp/upload-one-result.json
 * Phases: navigate | wait-editor | cdp | done
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');
const n = Number(process.argv[2]);
const CALL = '/tmp/upload-one-call.json';
const RES = '/tmp/upload-one-result.json';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const VIEW = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';

function rm(f) {
  try {
    fs.unlinkSync(f);
  } catch {}
}
function waitRes(ms = 300000) {
  const t = Date.now();
  while (Date.now() - t < ms) {
    if (fs.existsSync(RES)) {
      const v = JSON.parse(fs.readFileSync(RES, 'utf8'));
      rm(RES);
      return v;
    }
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  }
  throw new Error('timeout ' + n);
}
function ask(phase, payload) {
  rm(RES);
  fs.writeFileSync(CALL, JSON.stringify({ index: n, phase, payload }));
  return waitRes();
}

execSync(`node ${path.join(__dirname, 'prepare-nowait-cdp.mjs')} ${n}`, { cwd: root, stdio: 'pipe' });
const cdp = JSON.parse(fs.readFileSync(`/tmp/cdp-nowait-${n}.json`, 'utf8'));

ask('navigate', { url: URL, viewId: VIEW });
ask('wait-editor', {
  method: 'Runtime.evaluate',
  params: {
    expression:
      'new Promise((resolve, reject) => { const start = Date.now(); const check = () => { const t = document.querySelector(\'textarea[placeholder="Untitled public article"]\'); const b = document.querySelector(\'[role="textbox"]\'); if (t && b) resolve({ready:true}); else if (Date.now() - start > 60000) reject(new Error(\'timeout\')); else setTimeout(check, 500); }; check(); })',
    awaitPromise: true,
    returnByValue: true,
  },
  viewId: VIEW,
});
const last = ask('cdp', cdp);
const raw = JSON.stringify({ result: { value: last.result?.value ?? last } }).replace(/'/g, "'\\''");
const recOut = execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${raw}'`, {
  encoding: 'utf8',
  cwd: root,
}).trim();
fs.writeFileSync(CALL, JSON.stringify({ index: n, phase: 'done', result: JSON.parse(recOut.split('\n').pop()) }));
console.log(recOut.split('\n').pop());

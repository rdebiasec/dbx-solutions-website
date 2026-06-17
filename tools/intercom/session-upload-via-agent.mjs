#!/usr/bin/env node
/** Upload one index: prepare frags + invoke cursor agent for each CDP call. */
import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIEW_ID = 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c';
const URL =
  'https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false';
const n = Number(process.argv[2]);
const skip0 = process.argv[3] === 'skip0';
const root = path.resolve(__dirname, '../..');

function agentCdp(fragFile, label) {
  const payload = JSON.parse(fs.readFileSync(fragFile, 'utf8'));
  const prompt = [
    `Execute ONE browser_cdp CallMcpTool only.`,
    `viewId: ${VIEW_ID}`,
    `method: ${payload.method}`,
    `params: ${JSON.stringify(payload.params)}`,
    `Do not modify the params JSON. Report result.result.value only.`,
  ].join('\n');
  const r = spawnSync(
    'cursor',
    ['agent', '--print', '--force', '--workspace', root, prompt],
    { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024, timeout: 120000 },
  );
  if (r.status !== 0) {
    console.error(`FAIL ${label}`, r.stderr || r.stdout);
    return null;
  }
  try {
    const m = r.stdout.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : { raw: r.stdout.trim() };
  } catch {
    return { raw: r.stdout.trim() };
  }
}

execSync(`node ${path.join(__dirname, 'prepare-frag-payloads.mjs')} ${n}${skip0 ? ' skip0' : ''}`, {
  stdio: 'inherit',
  cwd: root,
});

console.log(`NAVIGATE ${URL}`);
const navPrompt = `browser_navigate to ${URL} viewId ${VIEW_ID}. Report ok.`;
spawnSync('cursor', ['agent', '--print', '--force', '--workspace', root, navPrompt], {
  stdio: 'inherit',
  timeout: 60000,
});

const stores = fs
  .readdirSync(`/tmp/session-mcp-${n}`)
  .filter((f) => f.startsWith('store-'))
  .map((f) => Number(f.replace('store-', '').replace('.json', '')))
  .sort((a, b) => a - b);

for (const i of stores) {
  const res = agentCdp(`/tmp/frag-${n}-${i}.json`, `store-${i}`);
  console.log(JSON.stringify({ step: 'store', i, res }));
}

const runRes = agentCdp(`/tmp/frag-${n}-run.json`, 'run');
console.log(JSON.stringify({ step: 'run', res: runRes }));

if (runRes) {
  try {
    execSync(`node ${path.join(__dirname, 'record-upload-result.mjs')} ${n} '${JSON.stringify(runRes).replace(/'/g, "'\\''")}'`, {
      stdio: 'inherit',
      cwd: root,
    });
  } catch (e) {
    console.error('record failed', e.message);
  }
}

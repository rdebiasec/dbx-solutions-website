#!/usr/bin/env node
/** Build short CDP loader from payload file (fragments to avoid MCP copy corruption). */
import fs from 'fs';

const payloadFile = process.argv[2];
const chunk = Number(process.argv[3] || 180);
const payload = JSON.parse(fs.readFileSync(payloadFile, 'utf8'));
const expr = payload.params.expression;
const parts = [];
for (let i = 0; i < expr.length; i += chunk) parts.push(expr.slice(i, i + chunk));
const loader = `(() => { const p = ${JSON.stringify(parts)}; return (0, eval)(p.join('')); })()`;
const out = {
  method: payload.method,
  params: { expression: loader, returnByValue: payload.params.returnByValue ?? true },
};
if (payload.params.awaitPromise) out.params.awaitPromise = true;
process.stdout.write(JSON.stringify(out));

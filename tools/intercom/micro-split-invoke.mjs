#!/usr/bin/env node
/** Split a CDP params JSON into tiny push steps (<900 bytes each) for safe MCP copy. */
import fs from 'fs';

const inFile = process.argv[2];
const outDir = process.argv[3];
const max = Number(process.argv[4] || 900);
const payload = JSON.parse(fs.readFileSync(inFile, 'utf8'));
const expr = payload.params.expression;
fs.mkdirSync(outDir, { recursive: true });
const chunk = 120;
const parts = [];
for (let i = 0; i < expr.length; i += chunk) parts.push(expr.slice(i, i + chunk));
const files = [];
parts.forEach((p, i) => {
  const isLast = i === parts.length - 1;
  const loader = isLast
    ? `(() => { window.__ce=(window.__ce||[]).concat([${JSON.stringify(p)}]); const src=window.__ce.join(''); delete window.__ce; return (0,eval)(src); })()`
    : `(() => { window.__ce=(window.__ce||[]).concat([${JSON.stringify(p)}]); return {ok:true,i:${i}}; })()`;
  const out = {
    method: payload.method,
    params: {
      expression: loader,
      returnByValue: true,
      ...(isLast && payload.params.awaitPromise ? { awaitPromise: true } : {}),
    },
  };
  const f = `${outDir}/micro-${i}.json`;
  fs.writeFileSync(f, JSON.stringify(out));
  files.push({ f, len: JSON.stringify(out).length });
});
console.log(JSON.stringify({ parts: parts.length, files }));

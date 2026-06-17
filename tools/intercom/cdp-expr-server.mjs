#!/usr/bin/env node
/** Serve CDP expressions for sessionStorage upload (avoids MCP copy corruption). */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.CDP_EXPR_PORT || 18765);

function getEmit(n) {
  const out = execSync(`node ${path.join(__dirname, 'emit-session-cdp.mjs')} ${n}`, {
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
  });
  return JSON.parse(out);
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const m = req.url?.match(/^\/(store|run|meta)\/(\d+)(?:\/(\d+))?$/);
  if (!m) {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  const [, kind, indexStr, storeStr] = m;
  const n = Number(indexStr);
  try {
    const emit = getEmit(n);
    if (kind === 'meta') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ index: n, partCount: emit.partCount, exprLen: emit.exprLen }));
      return;
    }
    if (kind === 'run') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(emit.runExpr);
      return;
    }
    const i = Number(storeStr);
    if (!emit.stores[i]) {
      res.writeHead(404);
      res.end('no store');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(emit.stores[i]);
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`cdp-expr-server listening on http://127.0.0.1:${port}`);
});

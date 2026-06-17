#!/usr/bin/env node
/** Serve fill JSON for compact CDP uploads. GET /fill/:index */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.FILL_SERVER_PORT || 18766);

function extractFill(n) {
  const payload = JSON.parse(fs.readFileSync(`/tmp/cdp-payload-${n}.json`, 'utf8'));
  const m = payload.expression.match(
    /window\.__intercomFill\((\{[\s\S]*?\})\);/,
  );
  if (!m) throw new Error('no fill json');
  return JSON.parse(m[1]);
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const m = req.url?.match(/^\/fill\/(\d+)$/);
  if (!m) {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  try {
    const data = extractFill(Number(m[1]));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } catch (e) {
    res.writeHead(500);
    res.end(String(e));
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`fill-server on http://127.0.0.1:${port}`);
});

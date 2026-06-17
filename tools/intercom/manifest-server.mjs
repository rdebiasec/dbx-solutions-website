#!/usr/bin/env node
/** Serves manifest entries at GET /:index for browser CDP fetch during upload. */
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-manifest.json'), 'utf8'));
const port = Number(process.env.INTERCOM_MANIFEST_PORT || 8765);

const server = http.createServer((req, res) => {
  const idx = Number(req.url?.replace(/^\//, '') ?? '');
  const item = manifest[idx];
  if (!Number.isInteger(idx) || !item) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found' }));
    return;
  }
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(
    JSON.stringify({
      title: item.title,
      description: item.description,
      content: item.content,
    }),
  );
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Manifest server http://127.0.0.1:${port}/:index (${manifest.length} entries)`);
});

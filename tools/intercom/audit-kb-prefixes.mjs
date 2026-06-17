#!/usr/bin/env node
/** Merge prefix search results into audit-ui-reality.json (browser agent fills searchResults). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-manifest.json'), 'utf8'));
const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));
const inFile = process.argv[2] || path.join(__dirname, 'audit-search-results.json');

const searchResults = fs.existsSync(inFile)
  ? JSON.parse(fs.readFileSync(inFile, 'utf8'))
  : {};

const allFound = new Set();
for (const [prefix, data] of Object.entries(searchResults)) {
  for (const t of data.titles || []) allFound.add(t);
}

const manifestTitles = manifest.map((m) => m.title);
const foundNormalized = [...allFound];
const missing = [];
for (let i = 0; i < manifest.length; i++) {
  const expected = manifest[i].title;
  const hit = foundNormalized.some(
    (f) => f === expected || f.replace(/\s+/g, ' ').includes(expected.slice(0, 30)),
  );
  if (!hit) missing.push({ index: i, title: expected });
}

const report = {
  checkedAt: new Date().toISOString(),
  trackerClaim: `${progress.uploaded.length}/84`,
  manifestTotal: 84,
  intercomArticlesLive: searchResults._meta?.articlesLive ?? null,
  intercomWebsiteSyncLive: searchResults._meta?.websiteSyncLive ?? 12,
  prefixCounts: Object.fromEntries(
    Object.entries(searchResults)
      .filter(([k]) => !k.startsWith('_'))
      .map(([k, v]) => [k, (v.titles || []).length]),
  ),
  uniqueBracketTitlesFound: foundNormalized.length,
  uniqueTitles: foundNormalized,
  missingFromSearch: missing,
  gap: 84 - foundNormalized.length,
  helpCenterCollections: searchResults._meta?.helpCenterCollections ?? 'unknown',
  corruptTitlesStillPresent: foundNormalized.filter((t) => /â|Ã|^\[ ES \]/.test(t)),
  emptyDrafts: searchResults._meta?.emptyDrafts ?? [],
};

const out = path.join(__dirname, 'audit-ui-reality.json');
fs.writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));

#!/usr/bin/env node
/**
 * Compare upload-manifest.json vs upload-progress.json for audit baseline.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-manifest.json'), 'utf8'));
const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));

const byCategory = {};
const byLocale = { en: [], es: [], pt: [] };
for (const [i, item] of manifest.entries()) {
  byCategory[item.category] = (byCategory[item.category] || 0) + 1;
  const loc = item.locale || 'en';
  if (byLocale[loc]) byLocale[loc].push({ index: i, title: item.title, category: item.category });
}

const report = {
  generatedAt: new Date().toISOString(),
  manifestTotal: manifest.length,
  progressMarked: progress.uploaded.length,
  byCategory,
  byLocaleCount: Object.fromEntries(Object.entries(byLocale).map(([k, v]) => [k, v.length])),
  expectedTitles: manifest.map((m) => m.title),
  duplicateTitleCandidates: findDupes(manifest.map((m) => m.title)),
  homeTitles: manifest.filter((m) => /home|inicio|início/i.test(m.title)).map((m) => m.title),
};

function findDupes(titles) {
  const norm = (t) => t.replace(/\s+/g, ' ').toLowerCase().replace(/—/g, '-');
  const groups = {};
  for (const t of titles) {
    const key = norm(t).replace(/\[en\]|\[es\]|\[pt\]/, '').slice(0, 40);
    groups[key] = groups[key] || [];
    groups[key].push(t);
  }
  return Object.values(groups).filter((g) => g.length > 1);
}

const out = path.join(__dirname, 'audit-expected.json');
fs.writeFileSync(out, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ out, ...report, byLocaleCount: report.byLocaleCount }, null, 2));

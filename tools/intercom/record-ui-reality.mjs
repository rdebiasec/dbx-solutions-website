#!/usr/bin/env node
/** Quick UI reality check notes — run after browser audit. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const progress = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-progress.json'), 'utf8'));

const report = {
  checkedAt: new Date().toISOString(),
  trackerClaim: `${progress.uploaded.length}/84`,
  intercomArticlesLive: '~16 (Knowledge Hub content sources, 2026-06-16 post-session)',
  intercomWebsiteSyncLive: 12,
  discrepancy: 'Tracker marks 84 uploaded but UI Articles source shows ~16 Live — append-progress ran without UI verification',
  index59Expected: '[ES] Site — Industrias — Copia completa de la página',
  index59FoundInSearch: false,
  corruptTitlesStillPresent: ['[ ES ] KB â Global â NavegaciÃ³n y contacto'],
  helpCenterCollections: 'not created — requires Set up Help Center wizard',
  emptyDraft: 'activeContentId=18504283 Untitled public article (Not live) — delete',
  action: 'Reset tracker to UI-verified only; re-upload missing with post-publish search verification',
};

const out = path.join(__dirname, 'audit-ui-reality.json');
fs.writeFileSync(out, JSON.stringify(report, null, 2) + '\n');

const p = progress;
p.note = `DISCREPANCY: tracker ${p.uploaded.length}/84 but Intercom ~16 Live. Re-verify each append. See audit-ui-reality.json`;
p.updatedAt = new Date().toISOString();
fs.writeFileSync(path.join(__dirname, 'upload-progress.json'), JSON.stringify(p, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));

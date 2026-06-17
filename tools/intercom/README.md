# Intercom Help Center upload

Manifest and CDP helpers for uploading `content/` files as **Public articles** in Fin AI → Content.

## Files

| File | Purpose |
|------|---------|
| `build-manifest.mjs` | Builds `upload-manifest.json` (84 entries) |
| `upload-manifest.json` | Title, description, locale, body per file |
| `cdp-scripts/NNN.js` | Browser CDP fill expression per index |
| `cdp-publish.js` | Click **Publish** in the article editor |
| `run-index.mjs` | `node run-index.mjs 0` → fill script for index 0 |

## Regenerate

```bash
node tools/intercom/build-manifest.mjs
```

## Browser upload (manual or agent)

1. Open: `https://app.intercom.com/a/apps/jqhtr1nj/automation/fin-ai-agent/content?activeContentType=article&editorMode=new&native_content=false`
2. Inject `cdp-fill-fn.js` once per session (`window.__intercomFill`)
3. CDP `Runtime.evaluate` with expression from `cdp-b64/NNN.txt` (or `node emit-fill-b64.mjs N`)
4. CDP evaluate `cdp-publish.js`
5. Re-open new-article URL for each entry (publish returns to content list)

**Note:** `fetch('http://127.0.0.1:8765/...')` is blocked by Intercom CSP — use embedded base64 (`emit-fill-b64.mjs`) instead.

**Large articles (~16KB+):** use `emit-session-cdp.mjs N` — stores expression chunks in `sessionStorage`, then evals in one `awaitPromise` call.

## Recommended collections

- **EN Content** — `[EN]` articles
- **ES Content** — `[ES]` articles  
- **PT Content** — `[PT]` articles

Consider uploading **KB sections + FAQs only** (42 files) first to avoid duplicate Fin training data vs raw site copy.

## API alternative

Set `INTERCOM_ACCESS_TOKEN` and use [Intercom Articles API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/articles/) for bulk create.

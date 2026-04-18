# DBX Solutions — Preview site (`site-v2`)

This folder is a **parallel copy** of the production Vite app ([`site/`](../site/)) updated with messaging and conversion changes from [`MARKETING_CONVERSION_ANALYSIS.md`](../MARKETING_CONVERSION_ANALYSIS.md). **Production deploys still build from [`site/`](../site/) only** until you promote.

## Run locally

```bash
cd site-v2
npm install   # once
npm run dev
```

Open **http://localhost:4174/** (port **4174** so you can run [`site/`](../site/) on **4173** at the same time).

## Build / preview production bundle

```bash
npm run build
npm run preview   # serves dist/ on port 4174 per vite.config.js
```

## CTA / copy audit (optional)

```bash
npm run audit:ctas
```

Prints booking-related strings from locale JSON and notes intended calendar vs `#contact` targets (see script output).

## Promote to production

1. QA `site-v2` in dev and preview builds.
2. Copy validated sources into [`site/`](../site/) (typically `src/`, `index.html`, `public/` if assets changed, and `scripts/` if build scripts changed).
3. From [`site/`](../site/): `npm ci && npm run build`.
4. Push to `main`; [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) deploys when **`site/**`** changes.

## WordPress theme

[`tools/wp/generate-block-theme.mjs`](../tools/wp/generate-block-theme.mjs) reads locale JSON from **`site/src/i18n/`**. After promoting to `site/`, regenerate the block theme so WordPress matches production copy.

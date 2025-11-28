## Deployment Targets

The build pipeline now understands two hosting contexts:

- **Custom domain (`dbx-solutions.com`):** default build (`npm run build`) emits root-relative assets so the bundle works when served from the apex domain or any local preview.
- **GitHub Pages (`https://rdebiasec.github.io/dbx-solutions-website/`):** `npm run build:gh-pages` sets `VITE_BASE_PATH=/dbx-solutions-website/`, ensuring scripts, CSS, and icons resolve correctly under the repository subpath.

`site/public/CNAME` (`dbx-solutions.com`) is copied into every `dist/` build so GitHub Pages keeps the custom-domain binding after each deploy.

## Deploying to GitHub Pages

1. **Install dependencies (once):**
   ```bash
   npm install
   ```
2. **Build for the repo path (auto-runs via predeploy):**
   ```bash
   npm run build:gh-pages
   ```
   The optimized assets land in `dist/`.
3. **Publish:**
   - Using the built-in script (recommended):
     ```bash
     npm run deploy
     ```
     `npm` runs `predeploy` first (same as `npm run build:gh-pages`), then publishes `dist/` to the `gh-pages` branch via [`gh-pages`](https://github.com/tschaub/gh-pages).
   - Manual copy: push the contents of `dist/` to your `gh-pages` branch (or `/docs` folder) and enable GitHub Pages in repository settings. Keep the `CNAME` file at the repo root to preserve the domain mapping.
   - GitHub Action: run `npm ci && npm run build:gh-pages`, then deploy `dist/` with `peaceiris/actions-gh-pages`.
   - GitHub Actions mirror: pushing directly to `gh-pages` also triggers `.github/workflows/deploy.yml`, which installs, builds with the correct `VITE_BASE_PATH`, and publishes the workflow artifact to GitHub Pages (Source must be set to “GitHub Actions” in repo settings).
4. **Verify both URLs:**
   - `https://rdebiasec.github.io/dbx-solutions-website/`
   - `https://dbx-solutions.com/` (after DNS/CDN propagation)

The project is fully static—no server-side dependencies are required.

> **DNS checklist:** Point the apex (`dbx-solutions.com`) A/ALIAS records to GitHub Pages (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and add `www` as a CNAME to `rdebiasec.github.io`. Keep `Enforce HTTPS` enabled in the repo settings so Pages provisions certificates for the custom domain.

> **Authentication tips:** If your shell does not have credentials cached, export `GH_TOKEN=<your PAT>` before running `npm run deploy`, or update the git remote to `https://<PAT>@github.com/rdebiasec/dbx-solutions-website.git`. Generate/delete PATs from GitHub `Settings → Developer settings → Personal access tokens`. Use fine-grained tokens scoped to this repo with `Contents: Read & Write`.

## Localization Workflow

- All copy lives under `src/i18n/content.en.json` (English) and `src/i18n/content.es.json` (Spanish). Update the English file first; the UI renders from whichever locale is active.
- To generate/update Spanish strings automatically, supply Google Cloud credentials and run:
  ```bash
  export GOOGLE_PROJECT_ID="your-project-id"
  export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account.json"
  npm install @google-cloud/translate   # required once if you want API support
  npm run i18n:translate
  ```
  If the credentials or dependency are missing, the script falls back silently—just edit `content.es.json` manually.
- During `npm run build`, `scripts/i18n-build.mjs` ensures both locale files exist; if Spanish is missing it copies English as a placeholder so the site still builds.
- At runtime, the site hydrates copy from the locale JSON, and visitors can switch languages via the header toggle (preference persists in `localStorage`).

## Responsive Testing

- The layout uses breakpoints at `1024px`, `900px`, `768px`, and `520px`. Navigation becomes a drawer below 900px; cards, timelines, and CTA forms stack in a single column under 768px.
- To test locally, run `npm run dev -- --host localhost --port 4173` and open Chrome/Edge DevTools → Responsive mode. Verify at least these presets: 1280px (desktop), 820px (tablet), 414px (iPhone), 360px (Android).
- Closing the mobile nav is supported via the toggle button, tapping any link, or tapping outside the drawer. Ensure `body.nav-open` drops on navigation to prevent scroll lock persisting.


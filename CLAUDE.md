# DBX Solutions Website — Project Guide (CLAUDE.md)

This file is the single onboarding reference for anyone (human or AI assistant)
working in this repository. It mirrors the UX/messaging/front-end standards in
`.cursor/rules/dbx-website-standards.mdc` and adds the practical commands for
local development, build, deploy, and security.

**Production source of truth: the `site/` folder only.** It is a static Vite
(vanilla JS) app deployed to GitHub Pages at the custom domain
`dbx-solutions.com`. Everything outside `site/` (content drafts, tooling,
experiments) is NOT shipped to production.

---

## 1. DBX Solutions Website Standards

### Positioning
DBX Solutions helps SMBs improve customer experience, automate repetitive
customer interactions, qualify leads, streamline workflows, and connect
AI-powered conversations with business tools.

Position the company as a practical AI partner, customer experience automation
company, conversational AI implementation partner, managed AI operations
provider, and business-first AI consultancy.

Avoid messaging that feels overly technical, futuristic, enterprise-only,
buzzword-heavy, experimental, or abstract.

### Messaging
Visitors should quickly understand what DBX Solutions does, who it helps, what
problems it solves, and why it matters.

Prefer clear business language, operational examples, customer outcomes, and
concise copy. Lead with faster responses, fewer missed leads, reduced repetitive
work, improved communication, workflow efficiency, scalable support, lead
qualification, and human-supervised AI.

Avoid vague AI terminology, unnecessary jargon, complex implementation language,
and technology-first explanations before business value is clear.

Position AI as supporting teams, improving operations, and helping customer
experience. Do not imply fully autonomous businesses, replacing all employees,
or uncontrolled automation.

### Design and UX
Maintain a dark theme, clean modern UI, strong readability, spacious layouts,
and a premium but approachable feel.

Avoid cyberpunk aesthetics, excessive animations, generic AI imagery, and visual
clutter.

Use strong hierarchy, clear section separation, scannable content, card-based
layouts, and mobile-first readability. Avoid large text blocks where possible.

CTAs should be consultative, business-focused, and low-pressure. Prefer:
"Book a Consultation", "Explore Solutions", "See How It Works", and
"Start With a Practical AI Consultation". Avoid generic CTA language like
"Submit", "Learn More", or "Contact" unless the context requires it.

### Content Standards
Reduce repetitive messaging across sections. Each section should have a unique
purpose.

Avoid overusing phrases such as "AI-powered", "smarter operations", "better
customer experience", "automation", and "practical AI".

Explicitly reference WhatsApp where appropriate, because it is a key DBX
Solutions positioning element.

Differentiate DBX Solutions as a long-term AI operations partner by
communicating monitoring, optimization, continuous improvement, operational
alignment, and workflow refinement without sounding overly technical.

### Technical / Editorial Standards
Before major changes, inspect the project structure, layout components, routing,
shared components, CSS/theme structure, i18n structure, and reusable UI systems.

Preserve bilingual support (ES/EN, plus PT entries), legal pages, routing,
responsiveness, accessibility features, and existing functionality. Do not create
unnecessary new pages.

Mobile UX must prioritize stacked cards, short text blocks, clean spacing, CTA
visibility, responsive timelines, and readable typography.

Before finalizing website changes, check duplicated messaging, visual
consistency, responsive behavior, CTA hierarchy, readability, accessibility
basics, broken links, console errors, and whether the homepage communicates value
quickly.

---

## 2. Getting Started (local dev)

### Prerequisites — Node 20 via nvm
CI builds on **Node 20**. The repo pins it in `.nvmrc` (contains `20`).

```bash
# from the repo root
nvm install   # installs the version in .nvmrc if needed
nvm use       # activates Node 20 (reads .nvmrc)
node -v       # should print v20.x
```

### Install & run
All app work happens inside `site/`.

```bash
cd site
npm ci                 # clean, lockfile-exact install
npm run dev            # dev server at http://localhost:4174
```

### Build
```bash
cd site
npm run build          # runs scripts/i18n-build.mjs then `vite build` → site/dist/
npm run preview        # serve the production build locally at http://localhost:4174
```

`npm run build` is `build:static`: it first generates i18n artifacts
(`node scripts/i18n-build.mjs`) and then runs `vite build`. The output in
`site/dist/` is a build artifact — **never commit `dist/`.**

---

## 3. Deploy

- Deployment is **automatic via GitHub Actions** (`.github/workflows/deploy.yml`).
- Any push to the `main` branch that touches `site/**` triggers a build on
  **Node 20** and publishes to GitHub Pages.
- The custom domain `dbx-solutions.com` is configured through `site/public/CNAME`
  (do not remove or change it unless the domain changes).
- Do **not** deploy by hand. Push to `main` and let CI build and publish.
- The next infrastructure step under consideration is a Cloudflare proxy in front
  of GitHub Pages ("ruta A": HSTS / WAF / security headers). That work is manual
  infrastructure and is tracked separately — do not attempt it from code here.

Workflow for every change:

```bash
git checkout -b my-change        # branch off main
# ...edit inside site/ ...
cd site && npm ci && npm run build   # verify the build passes locally
git add -- <only the files you changed>
git commit -m "Describe the change"
git push -u origin my-change     # open a PR into main; merge triggers deploy
```

---

## 4. Security & Integrity rules (do not regress)

The site was hardened (commits `bbe5c64`, `235a165`). Keep these invariants:

1. **CSP is injected by a Vite plugin.** The Content-Security-Policy and
   `referrer-policy` meta tags are generated by the `dbx-security-meta` plugin in
   `site/vite.config.js` (`buildCsp` is the single source of truth, applied to
   **every** HTML entry point). To allow a new third-party origin, edit the
   directives in `buildCsp` — do not hand-add CSP `<meta>` tags to individual HTML
   files, and do not weaken the policy (`object-src 'none'`,
   `frame-ancestors 'none'`, `base-uri 'self'`, `upgrade-insecure-requests` in
   prod).
2. **Never reintroduce `eval()`.** The i18n export scripts use `JSON.parse()`.
   Avoid `eval`, `new Function`, or equivalent dynamic code execution anywhere.
3. **Keep the root `.gitignore`.** It keeps `node_modules/`, `dist/`, local
   scratch, and Finder-duplicate junk (e.g. `index 2.html`) out of the repo. Do
   not commit `dist/`, build output, or scratch/experimental files.
4. **`/.well-known/security.txt`** exists — keep it current, don't delete it.
5. **CI supply-chain gate.** GitHub Actions are pinned to commit SHAs and CI runs
   `npm audit --omit=dev --audit-level=high`. Dependabot is enabled. Keep actions
   pinned to SHAs (not floating tags) and keep the audit gate.
6. **`site/` is the only production source.** Do not add new top-level site trees
   or page experiments to the production build. In particular, the build inputs in
   `site/vite.config.js` (`rollupOptions.input`) are the exact set of shipped
   pages — only add an entry when that page is finished and verified.

### Known WIP / do-not-ship notes
- There is an **unfinished `labs` page** (`site/labs/index.html` +
  `site/src/labs-entry.js`). Its build entry was **intentionally removed** from
  `site/vite.config.js` because committing it broke CI. **Do not re-add the labs
  entry** until the page is finished. Note that any navigation/link to `/labs/`
  in app code will 404 in production while the entry is absent.
- `site-v2/`, `site-v3/`, and `internal/` docs are experiments/notes and are
  **not** part of production.

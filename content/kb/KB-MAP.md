# DBX Solutions — Knowledge Base Map

Master index for section-based Q&A in **EN / ES / PT**.

**Last updated:** June 2026  
**Tone:** Plain language first. Technical terms only when the customer asks.

---

## How to use this KB

```
Customer question + language (EN / ES / PT)
      ↓
KB-MAP.md (page, anchor, or intent)
      ↓
content/kb/{locale}/sections/NN-*.md
      ↓
If needed: content/{locale}/*.md (full site copy)
      ↓
Cross-topic: content/faqs/{locale}-customer-faqs.md
```

| Layer | Path | Purpose |
|-------|------|---------|
| **Map** | `content/kb/KB-MAP.md` | Routing index |
| **Section Q&A** | `content/kb/{en,es,pt}/sections/` | Questions per website section |
| **Source content** | `content/{en,es,pt}/*.md` | Full site copy |
| **Topic FAQs** | `content/faqs/*-customer-faqs.md` | Grouped by customer intent |

---

## Language paths

| Locale | KB sections | Site content | Topic FAQs |
|--------|-------------|--------------|------------|
| English | `content/kb/en/sections/` | `content/en/` | `content/faqs/en-customer-faqs.md` |
| Español | `content/kb/es/sections/` | `content/es/` | `content/faqs/es-customer-faqs.md` |
| Português | `content/kb/pt/sections/` | `content/pt/` | `content/faqs/pt-customer-faqs.md` |

---

## Section IDs

| ID | Page | EN | ES | PT |
|----|------|----|----|-----|
| `kb.global` | Global | [en/sections/00-global.md](./en/sections/00-global.md) | [es/sections/00-global.md](./es/sections/00-global.md) | [pt/sections/00-global.md](./pt/sections/00-global.md) |
| `kb.home` | Home | [01-home](./en/sections/01-home.md) | [01-home](./es/sections/01-home.md) | [01-home](./pt/sections/01-home.md) |
| `kb.solutions` | Solutions | [02](./en/sections/02-solutions.md) | [02](./es/sections/02-solutions.md) | [02](./pt/sections/02-solutions.md) |
| `kb.services` | Services | [03](./en/sections/03-services.md) | [03](./es/sections/03-services.md) | [03](./pt/sections/03-services.md) |
| `kb.industries` | Industries | [04](./en/sections/04-industries.md) | [04](./es/sections/04-industries.md) | [04](./pt/sections/04-industries.md) |
| `kb.about` | About | [05](./en/sections/05-about.md) | [05](./es/sections/05-about.md) | [05](./pt/sections/05-about.md) |
| `kb.contact` | Contact | [06](./en/sections/06-contact.md) | [06](./es/sections/06-contact.md) | [06](./pt/sections/06-contact.md) |
| `kb.privacy` | Privacy | [07](./en/sections/07-legal-privacy.md) | [07](./es/sections/07-legal-privacy.md) | [07](./pt/sections/07-legal-privacy.md) |
| `kb.terms` | Terms | [08](./en/sections/08-legal-terms.md) | [08](./es/sections/08-legal-terms.md) | [08](./pt/sections/08-legal-terms.md) |
| `kb.sms` | SMS | [09](./en/sections/09-legal-sms.md) | [09](./es/sections/09-legal-sms.md) | [09](./pt/sections/09-legal-sms.md) |
| `kb.data` | Data Handling | [10](./en/sections/10-legal-data-handling.md) | [10](./es/sections/10-legal-data-handling.md) | [10](./pt/sections/10-legal-data-handling.md) |
| `kb.responsible-ai` | Responsible AI | [11](./en/sections/11-legal-responsible-ai.md) | [11](./es/sections/11-legal-responsible-ai.md) | [11](./pt/sections/11-legal-responsible-ai.md) |
| `kb.security` | Security | [12](./en/sections/12-legal-security-roadmap.md) | [12](./es/sections/12-legal-security-roadmap.md) | [12](./pt/sections/12-legal-security-roadmap.md) |

### Home block IDs

| ID | Anchor | File (all locales) |
|----|--------|-------------------|
| `kb.home.hero` | `#top` | `*/sections/01-home.md` § Hero |
| `kb.home.proof` | `#proof` | § Results |
| `kb.home.challenge` | `#challenge` | § Challenge |
| `kb.home.solution` | `#solutions` | § Solution |
| `kb.home.services` | `#services` | § Services |
| `kb.home.managed` | `#managed-ai-operations` | § Ongoing Support |
| `kb.home.process` | `#process` | § Process |
| `kb.home.industries` | `#industries` | § Industries |
| `kb.home.trust` | `#trust` | § Why DBX |
| `kb.home.faq` | `#faq` | § FAQ |

---

## Site URLs → KB (any locale)

| Page | URL |
|------|-----|
| Home | `/` |
| Solutions | `/solutions/` |
| Services | `/services/` |
| Industries | `/industries/` |
| About | `/about/` |
| Contact | `/contact/` |
| Privacy | `/privacy-policy/` |
| Terms | `/terms-of-service/` |
| SMS | `/sms-terms/` |
| Data Handling | `/data-handling-notice/` |
| Responsible AI | `/responsible-ai-policy/` |
| Security | `/security-roadmap/` |

---

## Intent routing

| Customer says… | Section file(s) |
|----------------|-----------------|
| Book / contact / email | `00-global`, `06-contact` |
| WhatsApp / slow replies | `01-home` (Hero, Challenge, Solution) |
| Replace team / human control | `01-home` § Solution, `11-legal-responsible-ai` |
| Services / what you offer | `03-services`, `02-solutions` |
| My industry | `04-industries` |
| Who are you | `05-about` |
| Price | `06-contact` (consultation only) |
| After launch | `01-home` § Ongoing Support |
| Privacy / SMS STOP | `07`, `09`, `10` |
| SOC 2 / certifications | `12-legal-security-roadmap` |
| Regulated business | `04-industries`, `11-legal-responsible-ai` |

---

## File tree

```
content/kb/
├── README.md
├── KB-MAP.md
├── en/sections/     ← 13 files (source for KB Q&A)
├── es/sections/     ← 13 files
└── pt/sections/     ← 13 files
```

---

## Maintenance

| Change | Action |
|--------|--------|
| Edit English KB | Update `content/kb/en/sections/*.md`, then sync ES/PT |
| Site copy changes | `content/en/*.md` → `node site/scripts/export-content-i18n.mjs` |
| New website section | Add `en/es/pt/sections/NN-*.md` + row in this map |

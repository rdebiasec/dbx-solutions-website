# DBX Knowledge Base

Section-aligned Q&A in **English, Spanish, and Portuguese**.

| Document | Purpose |
|----------|---------|
| **[KB-MAP.md](./KB-MAP.md)** | Master routing map — start here |
| **[en/sections/](./en/sections/)** | English Q&A |
| **[es/sections/](./es/sections/)** | Spanish Q&A |
| **[pt/sections/](./pt/sections/)** | Portuguese Q&A |

**Tone:** Plain language first. Technical detail only when asked.

**Regenerate ES/PT from EN** (after editing English only):

```bash
node site/scripts/export-kb-i18n.mjs   # machine pass — then review
```

For quality, edit `en/sections/` and re-translate ES/PT manually or re-run agents.

**Related:**
- Site copy: `content/{en,es,pt}/`
- Topic FAQs: `content/faqs/`

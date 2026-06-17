# DBX Solutions — Contenido del sitio web

Exportación estructurada del contenido del sitio de producción (`site/`), extraído de `site-app.js`, páginas legales y copy de formularios.

**Fuente:** https://dbx-solutions.com  
**Idiomas:** inglés (EN), español (ES) y portugués (PT) — siempre los tres  
**Fecha de exportación:** 15 de junio de 2026

## Estructura

Cada idioma tiene la misma estructura de 13 archivos:

| Archivo | Contenido |
|---------|-----------|
| `00-global.md` | Navegación, footer, contacto, CTAs globales |
| `01-home.md` | Página principal completa |
| `02-solutions.md` | Página Solutions |
| `03-services.md` | Página Services |
| `04-industries.md` | Página Industries |
| `05-about.md` | Página About |
| `06-contact.md` | Página Contact y formulario |
| `07-legal-privacy.md` | Privacy Policy |
| `08-legal-terms.md` | Terms of Service |
| `09-legal-sms.md` | SMS Terms |
| `10-legal-data-handling.md` | Data Handling Notice |
| `11-legal-responsible-ai.md` | Responsible AI Policy |
| `12-legal-security-roadmap.md` | Security Roadmap |

### Carpetas

| Carpeta | Rol |
|---------|-----|
| [en/](./en/) | Fuente principal (inglés) |
| [es/](./es/) | Español — generado + legal oficial |
| [pt/](./pt/) | Português — generado + legal oficial |
| [_legal/](./_legal/) | Textos legales oficiales (07–09) por idioma; no editar en es/pt directamente |

## FAQs para clientes

Preguntas por tema (EN / ES / PT): [faqs/](./faqs/)

## Knowledge Base (por sección del sitio)

Preguntas por sección en **EN / ES / PT**: [kb/en/sections/](./kb/en/sections/), [kb/es/sections/](./kb/es/sections/), [kb/pt/sections/](./kb/pt/sections/) — mapa: [kb/KB-MAP.md](./kb/KB-MAP.md)

## Regenerar traducciones

Después de editar `content/en/*.md`:

```bash
node site/scripts/export-content-i18n.mjs
```

Esto regenera `content/es/` y `content/pt/` automáticamente. Los archivos legales 07–09 se toman de `content/_legal/{es,pt}/` (textos oficiales del sitio).

## Notas de uso

- EN es la fuente de verdad para marketing; ES/PT usan los mapas de `site/src/i18n-runtime.js` y `site/src/i18n/pt-entries.js`.
- Legal 07–09: textos oficiales en `_legal/` (incluye secciones LGPD para PT y Ley 1581 para ES).
- CTAs principales → Google Calendar (Book a Consultation / Reservar una consulta / Agendar uma consulta).
- **Email:** contact@dbx-solutions.com · **Tel:** +1 (321) 287-4509

# Intercom Fin AI — Auditoría (16 jun 2026, UI-verified)

## Resumen ejecutivo

| Métrica | Manifest | Tracker | Intercom UI (real) | Gap |
|---------|----------|---------|-------------------|-----|
| Artículos manuales KB | **84** | **12/84** | **18 Live** (Articles source) | **66** faltan |
| Website sync | activo | — | **12 Live** | — |
| Borradores "Untitled" | 0 | — | **≥1** (18504283 Not live) | limpiar |
| Help Center / colecciones | EN / ES / PT | — | **Parcial** — English/General creado; ES/PT pendiente; HC **Not live** | — |

**Conclusión:** Solo contar `append-progress` tras búsqueda KB o subida del contador Live. Sesión 16 jun ~23:50 UTC: **idx 0** y **idx 2** subidos con verificación UI; Live **17→18**.

---

## Phase 1 — Audit reality (Knowledge Hub, `native_content=false`)

### Content sources (UI)

| Fuente | Live |
|--------|------|
| Articles · Snippets, public, internal, docs | **18 Live** |
| DBX Solutions website sync | **12 Live** |

### Búsqueda por prefijo

| Prefijo | Resultados observados |
|---------|----------------------|
| `[EN]` | 0 en búsqueda (ningún artículo EN bracket-titled live) |
| `[ES]` | Parcial — Inicio + corrupt Global + **Industrias (idx 59, nuevo)** |
| `[PT]` | Muy pocos / no encontrados por prefijo |
| `FAQ` | No indexados en búsqueda rápida |
| `Index` | No indexados |
| `Site —` | `[ES] Site — Industrias` confirmado post-upload |

**Títulos corruptos aún presentes:**
- `[ ES ] KB â Global â NavegaciÃ³n y contacto` → debe ser `[ES] KB — Global — Navegación y contacto` (manifest idx **13**)

**Index 59:** `[ES] Site — Industrias — Copia completa de la página` — **re-uploaded & verified** (Articles Live 16→17).

---

## Phase 2 — Re-upload protocol (validated)

1. `node tools/intercom/batch-cdp-payload.mjs N` → `/tmp/cdp-payload-N.json`
2. Navigate → new article URL (tab `glass-browser-20e98077-6681-4fca-9c31-1f93b221354c`)
3. `sleep 10` — close Preview panel if open
4. `browser_cdp Runtime.evaluate` with full payload (fill + open publish dialog)
5. **Publish UI clicks required:** radio **As an unlisted public article** → **Next** → **Publish** (CDP `.click()` on readonly radios fails)
6. **Verify:** Knowledge Hub search OR Articles Live count increases
7. **Only then:** `node tools/intercom/append-progress.mjs N`

**Artículos grandes (split):** idx **43, 56, 69** → `build-parts-steps.mjs` + `bridge-parts.mjs`

### Tracker reset (16 jun 23:43 UTC)

Índices UI-verificados en tracker: **0, 1, 2, 16, 25, 33, 59, 76, 77, 78, 79, 80** (12/84)

Pendientes: **72 índices** (0–83 menos los 12 verificados)

**Subidos esta sesión (verificados):** idx **0** `[EN] KB — Global — Navigation & Contact`, idx **2** `[EN] KB — Solutions — What We Help With`

---

## Phase 3 — Help Center

URL: https://app.intercom.com/a/apps/jqhtr1nj/settings/helpcenter/5228132/collections

| Estado | Detalle |
|--------|---------|
| Wizard | Ejecutado — colección **General** creada |
| Idiomas | Solo **English** visible; **Español** y **Português** pendientes (Add language en Configure and style) |
| Publicación | Help Center **Not live** |
| URL preview | `intercom.help/dbx-solutions/en` |

**Próximo paso HC:** Configure and style → add Spanish + Portuguese locales → rename/create collections **English**, **Español**, **Português** → publish Help Center.

---

## Priority fixes (sesión)

| Item | Estado |
|------|--------|
| Index **59** Industrias re-upload | ✅ Live (17 Articles) |
| Delete draft **18504283** | ⚠️ Pendiente — menú Delete no expuesto en automation |
| Fix corrupt `[ ES ] KB â Global` | ⚠️ Pendiente — renombrar vía editor idx 13 title |
| Reset tracker | ✅ 10/84 UI-verified |
| Help Center collections | ⚠️ Parcial (English/General only) |

---

## Reporte final

| | Count |
|---|------|
| **UI-verified Articles Live** | **18** |
| **Tracker** | **12/84** |
| **Gap (manifest − live)** | **66** |
| **HC status** | Setup started; Not live; EN only (ES/PT locales pending) |
| **Failures this session** | idx 2 first CDP attempt (truncated body + publish dialog stuck on Help Center) — recovered via full payload + UI clicks |

---

## Cómo continuar

```bash
# Ver realidad UI
cat tools/intercom/audit-ui-reality.json

# Reset conservador (si tracker vuelve a inflarse)
node tools/intercom/reset-progress-verified.mjs

# Siguiente upload con verificación
node tools/intercom/batch-cdp-payload.mjs 46
# → MCP navigate/sleep/cdp → search verify → append-progress.mjs 46
```

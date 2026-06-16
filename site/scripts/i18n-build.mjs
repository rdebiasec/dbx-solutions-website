/**
 * Pre-build i18n check. Live copy source: site-app.js + i18n-runtime.js + pt-entries.js.
 * Legacy content.en.json / content.es.json are archived — not required for build.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.join(__dirname, '..')

const required = [
  'src/site-app.js',
  'src/i18n-runtime.js',
  'src/i18n/pt-entries.js'
]

for (const rel of required) {
  const full = path.join(siteRoot, rel)
  try {
    await fs.access(full)
  } catch {
    throw new Error(`Missing required i18n source: ${rel}`)
  }
}

console.log('i18n prebuild OK (site-app.js + runtime catalogs)')

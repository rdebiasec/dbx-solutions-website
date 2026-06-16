/**
 * Legacy Google Translate helper for archived content JSON.
 * Live copy: edit site-app.js + i18n-runtime.js / pt-entries.js
 * Run: node scripts/seed-marketing-i18n.mjs for bulk marketing entries
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const archiveDir = path.join(__dirname, '../src/i18n/archive')
const enPath = path.join(archiveDir, 'content.en.json')
const esPath = path.join(archiveDir, 'content.es.json')

console.warn('translate.mjs targets archived JSON only. For live site copy, edit site-app.js and run seed-marketing-i18n.mjs.')

async function loadEnglish() {
  try {
    const raw = await fs.readFile(enPath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    console.error('Archived content.en.json not found. Skipping.')
    process.exit(0)
  }
}

async function translateText(text, target) {
  const projectId = process.env.GOOGLE_PROJECT_ID
  if (!projectId) return null
  const { TranslationServiceClient } = await import('@google-cloud/translate').catch(() => ({}))
  if (!TranslationServiceClient) return null
  const client = new TranslationServiceClient()
  const [response] = await client.translateText({
    parent: `projects/${projectId}/locations/global`,
    contents: [text],
    mimeType: 'text/plain',
    targetLanguageCode: target
  })
  return response.translations?.[0]?.translatedText ?? null
}

async function walkAndTranslate(obj, target) {
  if (typeof obj === 'string') {
    const translated = await translateText(obj, target)
    return translated ?? obj
  }
  if (Array.isArray(obj)) {
    return Promise.all(obj.map((item) => walkAndTranslate(item, target)))
  }
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const [key, value] of Object.entries(obj)) {
      out[key] = await walkAndTranslate(value, target)
    }
    return out
  }
  return obj
}

const en = await loadEnglish()
const es = await walkAndTranslate(en, 'es')
await fs.writeFile(esPath, JSON.stringify(es, null, 2))
console.log('Spanish content updated in archive/content.es.json')

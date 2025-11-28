import { promises as fs } from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = new URL('../src/i18n', import.meta.url)
const enPath = path.join(ROOT.pathname, 'content.en.json')
const esPath = path.join(ROOT.pathname, 'content.es.json')

async function loadEnglish() {
  const raw = await fs.readFile(enPath, 'utf-8')
  return JSON.parse(raw)
}

async function translateText(text, target) {
  const projectId = process.env.GOOGLE_PROJECT_ID
  if (!projectId) {
    return null
  }
  const { TranslationServiceClient } = await import('@google-cloud/translate').catch(
    () => ({})
  )
  if (!TranslationServiceClient) {
    return null
  }

  const client = new TranslationServiceClient()
  const location = 'global'

  const [response] = await client.translateText({
    parent: `projects/${projectId}/locations/${location}`,
    contents: [text],
    mimeType: 'text/plain',
    targetLanguageCode: target
  })

  return response.translations?.[0]?.translatedText ?? null
}

async function deepTranslate(obj) {
  if (typeof obj === 'string') {
    const translated = await translateText(obj, 'es')
    return translated ?? obj
  }

  if (Array.isArray(obj)) {
    const out = []
    for (const item of obj) {
      out.push(await deepTranslate(item))
    }
    return out
  }

  if (typeof obj === 'object' && obj !== null) {
    const out = {}
    for (const [key, value] of Object.entries(obj)) {
      out[key] = await deepTranslate(value)
    }
    return out
  }

  return obj
}

async function main() {
  const english = await loadEnglish()
  const translated = await deepTranslate(english)
  await fs.writeFile(esPath, JSON.stringify(translated, null, 2))
  console.log('Spanish content updated via translate.mjs')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


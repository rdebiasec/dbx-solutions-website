import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = new URL('../src/i18n', import.meta.url)
const enPath = path.join(ROOT.pathname, 'content.en.json')
const esPath = path.join(ROOT.pathname, 'content.es.json')

async function ensureFiles() {
  try {
    await fs.access(enPath)
  } catch {
    throw new Error('Missing English content file at src/i18n/content.en.json')
  }

  try {
    await fs.access(esPath)
  } catch {
    console.warn('Missing Spanish content; copying from English as fallback.')
    const en = await fs.readFile(enPath, 'utf-8')
    await fs.writeFile(esPath, en)
  }
}

await ensureFiles()


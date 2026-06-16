/**
 * Lightweight i18n QA audit for ES and PT catalogs + missing keys from site-app.js.
 * Run: node scripts/audit-i18n.mjs
 */
import fs from 'fs'
import vm from 'vm'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const allowIdentical = new Set(['WhatsApp', 'LinkedIn', 'CRM', 'SMS', 'STOP', 'HELP', 'Chat', 'Email', 'Legal', 'Audio', 'Video', 'E-commerce', 'online', 'WhatsApp · Chat · Email', 'CRM', 'Team inbox'])

const forbiddenInTranslation = /\b(agentic|agéntica|agéntico|intake|workflow|roadmap)\b/i
const spanishInPt = /\b(reales y|con el tiempo|horarios y|para tu |con tus |las respuestas se|los detalles de la|sin volver a escribir|preguntas frecuentes del programa|empieza con un canal)\b/i

function findSpanishBleedInPt(entries) {
  return entries.filter(([en, tr]) => en !== tr && spanishInPt.test(tr) && !spanishInPt.test(en))
}

function loadEsEntries() {
  const src = fs.readFileSync(path.join(root, 'src/i18n-runtime.js'), 'utf8')
  const block = src.match(/const esEntries = (\[[\s\S]*?\])\n\nconst localeCatalogs/)?.[1]
  if (!block) throw new Error('Could not parse esEntries')
  return vm.runInNewContext(block)
}

function findDuplicateKeys(entries) {
  const seen = new Map()
  const dups = []
  entries.forEach(([en], index) => {
    if (seen.has(en)) dups.push({ key: en, firstIndex: seen.get(en), secondIndex: index })
    else seen.set(en, index)
  })
  return dups
}

function findUntranslated(entries) {
  return entries.filter(([en, tr]) => en === tr && !allowIdentical.has(en))
}

function findForbiddenAnglicisms(entries) {
  return entries.filter(([en, tr]) => en !== tr && forbiddenInTranslation.test(tr) && !forbiddenInTranslation.test(en))
}

function extractQuotedStrings(filePath) {
  const src = fs.readFileSync(filePath, 'utf8')
  const strings = new Set()
  const patterns = [
    /'([^'\\]{4,})'/g,
    /"([^"\\]{4,})"/g,
    /`([^`\\]{4,})`/g
  ]
  for (const re of patterns) {
    let m
    while ((m = re.exec(src))) {
      const s = m[1].trim()
      if (/^[a-zA-Z]/.test(s) && !s.includes('${') && s.length < 300) strings.add(s)
    }
  }
  return [...strings]
}

function isTranslatableCandidate(s) {
  if (codeLikePattern.test(s)) return false
  if (s.split(' ').length < 2) return false
  if (!/[a-zA-Z]{3,}/.test(s)) return false
  return true
}

const codeLikePattern = /\b(btn|section|grid|chip|noopener|noreferrer|required>|option value|const |\\|\\||=>|outgoing|daily work|daily queue)\b/i

function report(title, items, formatter = (x) => x) {
  console.log(`\n## ${title} (${items.length})`)
  if (!items.length) {
    console.log('  OK')
    return false
  }
  for (const item of items.slice(0, 25)) {
    console.log(`  - ${formatter(item)}`)
  }
  if (items.length > 25) console.log(`  … and ${items.length - 25} more`)
  return true
}

const esEntries = loadEsEntries()
const { ptEntries } = await import('../src/i18n/pt-entries.js')

let failed = false
if (report('ES duplicate keys', findDuplicateKeys(esEntries), (d) => `${d.key.slice(0, 80)}`)) failed = true
if (report('PT duplicate keys', findDuplicateKeys(ptEntries), (d) => `${d.key.slice(0, 80)}`)) failed = true
if (report('PT untranslated', findUntranslated(ptEntries), ([en]) => en.slice(0, 90))) failed = true
if (report('ES untranslated', findUntranslated(esEntries), ([en]) => en.slice(0, 90))) failed = true
if (report('ES forbidden anglicisms in translation', findForbiddenAnglicisms(esEntries), ([en, tr]) => `${en.slice(0, 40)} → ${tr.slice(0, 60)}`)) failed = true
if (report('PT Spanish bleed in translation', findSpanishBleedInPt(ptEntries), ([en, tr]) => `${en.slice(0, 40)} → ${tr.slice(0, 60)}`)) failed = true

const esKeys = new Set(esEntries.map(([en]) => en))
const ptKeys = new Set(ptEntries.map(([en]) => en))
const appStrings = extractQuotedStrings(path.join(root, 'src/site-app.js'))
const missingEs = appStrings.filter((s) => isTranslatableCandidate(s) && !esKeys.has(s)).slice(0, 40)
const missingPt = appStrings.filter((s) => isTranslatableCandidate(s) && !ptKeys.has(s)).slice(0, 40)
if (report('Sample site-app strings missing ES (heuristic)', missingEs, (s) => s.slice(0, 90))) failed = true
if (report('Sample site-app strings missing PT (heuristic)', missingPt, (s) => s.slice(0, 90))) failed = true

console.log(`\nCatalog sizes: ES ${esEntries.length}, PT ${ptEntries.length}`)
process.exit(failed ? 1 : 0)

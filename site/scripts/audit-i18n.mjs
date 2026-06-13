/**
 * Lightweight i18n QA audit for ES and PT catalogs.
 * Run: node scripts/audit-i18n.mjs
 */
import fs from 'fs'
import vm from 'vm'

const allowIdentical = new Set(['WhatsApp', 'LinkedIn', 'CRM', 'SMS', 'STOP', 'HELP', 'Chat', 'Email', 'Legal', 'Audio', 'Video', 'E-commerce', 'online', 'WhatsApp · Chat · Email'])

function loadEsEntries() {
  const src = fs.readFileSync('src/i18n-runtime.js', 'utf8')
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

function findUntranslated(entries, locale) {
  return entries.filter(([en, tr]) => en === tr && !allowIdentical.has(en))
}

function findEnglishFragments(entries) {
  const pattern = /\b(the|and|your|that|with|from|this)\b/i
  return entries.filter(([en, tr]) => {
    if (en === tr) return false
    return pattern.test(tr) && tr.length > 25
  })
}

const esEntries = loadEsEntries()
const { ptEntries } = await import('../src/i18n/pt-entries.js')

let failed = false

function report(title, items, formatter = (x) => x) {
  console.log(`\n## ${title} (${items.length})`)
  if (!items.length) {
    console.log('  OK')
    return
  }
  failed = true
  for (const item of items.slice(0, 20)) {
    console.log(`  - ${formatter(item)}`)
  }
  if (items.length > 20) console.log(`  … and ${items.length - 20} more`)
}

report('ES duplicate keys', findDuplicateKeys(esEntries), (d) => `${d.key.slice(0, 80)} (indices ${d.firstIndex}, ${d.secondIndex})`)
report('PT duplicate keys', findDuplicateKeys(ptEntries), (d) => `${d.key.slice(0, 80)} (indices ${d.firstIndex}, ${d.secondIndex})`)
report('PT untranslated (same as EN)', findUntranslated(ptEntries, 'pt'), ([en]) => en.slice(0, 90))
report('ES untranslated (same as EN)', findUntranslated(esEntries, 'es'), ([en]) => en.slice(0, 90))
report('PT possible English fragments', findEnglishFragments(ptEntries, 'pt'), ([en, tr]) => `${en.slice(0, 50)} → ${tr.slice(0, 70)}`)
report('ES possible English fragments', findEnglishFragments(esEntries, 'es'), ([en, tr]) => `${en.slice(0, 50)} → ${tr.slice(0, 70)}`)

console.log(`\nCatalog sizes: ES ${esEntries.length}, PT ${ptEntries.length}`)
process.exit(failed ? 1 : 0)

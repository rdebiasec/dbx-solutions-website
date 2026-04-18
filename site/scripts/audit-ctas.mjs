/**
 * Prints a CTA / booking-string inventory from locale JSON and compares
 * social proof lists. Run: npm run audit:ctas
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const readJson = (name) =>
  JSON.parse(readFileSync(path.join(root, 'src', 'i18n', name), 'utf8'))

const bookingRe = /book|schedule|calendar|30\s*min|pick a time|call|reserv|agenda/i

function collectStrings(obj, prefix = '', out = []) {
  if (obj === null || obj === undefined) return out
  if (typeof obj === 'string') {
    if (bookingRe.test(obj)) out.push({ key: prefix, value: obj })
    return out
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => collectStrings(item, `${prefix}[${i}]`, out))
    return out
  }
  if (typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      const p = prefix ? `${prefix}.${k}` : k
      collectStrings(v, p, out)
    }
  }
  return out
}

function setOverlap(a, b) {
  const A = new Set(a)
  const B = new Set(b)
  const inter = [...A].filter((x) => B.has(x))
  return { onlyA: [...A].filter((x) => !B.has(x)), onlyB: [...B].filter((x) => !A.has(x)), intersection: inter }
}

const en = readJson('content.en.json')
const es = readJson('content.es.json')

console.log('=== Booking-related strings (EN) ===\n')
collectStrings(en).forEach(({ key, value }) => {
  console.log(`${key}\n  → ${value.slice(0, 120)}${value.length > 120 ? '…' : ''}`)
})

const trustList = en.trust?.industries || []
const marqueeList = en.proof?.marquee || []
const socialList = en.socialProof?.clients || []

console.log('\n=== Social proof list overlap (trust.industries vs proof.marquee) ===\n')
if (marqueeList.length) {
  const { intersection, onlyA, onlyB } = setOverlap(trustList, marqueeList)
  console.log(`trust only (${onlyA.length}):`, onlyA.join('; ') || '(none)')
  console.log(`marquee only (${onlyB.length}):`, onlyB.join('; ') || '(none)')
  console.log(`both (${intersection.length}):`, intersection.join('; ') || '(none)')
} else {
  console.log('proof.marquee empty or missing — marquee deduped in UI.')
}

if (socialList.length) {
  console.log('\nsocialProof.clients count:', socialList.length)
}

console.log('\n=== Static targets in main.js (verify in source) ===')
console.log('- Header CTA: #contact (Contact)')
console.log('- Hero primary: CALENDAR_URL')
console.log('- SMB primary: #contact (Get SMB Pricing)')
console.log('- Mid-page strip: #contact')
console.log('- Proof footer CTA: removed')
console.log('- Sticky: CALENDAR_URL')
console.log('- Contact card: CALENDAR_URL')
console.log('\nCalendar URL surfaces on page: hero, sticky, contact = 3.\n')

/**
 * CTA audit against live copy in site-app.js.
 * Run: npm run audit:ctas
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const src = readFileSync(path.join(root, 'src', 'site-app.js'), 'utf8')

const preferred = 'Book a Consultation'
const deprecated = ['Book a Free Consultation', 'Request Consultation']

const bookingRe = /book|schedule|calendar|consultation|reserv|agenda|solicit/i
const lines = src.split('\n')

console.log('=== Booking / consultation strings in site-app.js ===\n')
lines.forEach((line, i) => {
  if (bookingRe.test(line) && (line.includes("'") || line.includes('`'))) {
    const num = i + 1
    const bad = deprecated.find((d) => line.includes(d))
    const mark = bad ? ' ⚠️  non-standard' : line.includes(preferred) ? ' ✓' : ''
    console.log(`L${num}${mark}: ${line.trim().slice(0, 100)}`)
  }
})

const freeCount = (src.match(/Book a Free Consultation/g) || []).length
const requestCount = (src.match(/Request Consultation/g) || []).length
const preferredCount = (src.match(/Book a Consultation/g) || []).length

console.log('\n=== Summary ===')
console.log(`"Book a Consultation": ${preferredCount}`)
console.log(`"Book a Free Consultation": ${freeCount} (target: 0)`)
console.log(`"Request Consultation": ${requestCount} (target: 0)`)
console.log('\nHeader, sticky, and renderActions default should use "Book a Consultation".\n')

process.exit(freeCount + requestCount > 0 ? 1 : 0)

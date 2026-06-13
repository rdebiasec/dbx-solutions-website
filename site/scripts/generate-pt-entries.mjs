/**
 * Regenerate src/i18n/pt-entries.js from English keys in i18n-runtime esEntries.
 * Usage: node scripts/generate-pt-entries.mjs
 * After generation, always run: node scripts/apply-i18n-corrections.mjs
 */
import fs from 'fs'
import vm from 'vm'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const cache = new Map()

async function translateEnPt(text) {
  if (!text?.trim()) return text
  if (cache.has(text)) return cache.get(text)
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(text)}`
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url)
      const data = await res.json()
      const translated = data?.[0]?.map((part) => part[0]).join('')?.trim()
      if (translated) {
        cache.set(text, translated)
        return translated
      }
    } catch {
      /* retry */
    }
    await sleep(400)
  }
  cache.set(text, text)
  return text
}

function fixPt(text) {
  return text
    .replace(/\bPyMes\b/g, 'PMEs')
    .replace(/\bPyME\b/g, 'PME')
    .replace(/\bSMBs\b/g, 'PMEs')
    .replace(/\bSMB\b/g, 'PME')
    .replace(/\s+/g, ' ')
    .trim()
}

const manual = {
  'Home': 'Início',
  'Book a Free Consultation': 'Agende uma consulta grátis',
  'Explore Solutions': 'Explorar soluções',
  'Explore service': 'Explorar serviço',
  'Good if you': 'Ideal se',
  'What changes': 'O que melhora',
  'Start here': 'Comece aqui',
  'We run it with you': 'Operamos com você',
  'They write you': 'Clientes escrevem para você',
  'DBX replies': 'DBX responde',
  'You get the details': 'Você recebe os dados',
  'Your tools update': 'Suas ferramentas atualizam',
  'Your team closes': 'Sua equipe fecha',
  'Missed lead': 'Lead perdido',
  'Structured intake': 'Captação estruturada',
  'speaker': 'Alto-falante',
  'How DBX helps your business every day': 'Como o DBX ajuda sua empresa no dia a dia',
  "Tell us where you're stuck—we connect WhatsApp, your team, and the tools you already use.":
    'Diga onde você trava—conectamos WhatsApp, sua equipe e as ferramentas que você já usa.',
  'How DBX helps from first message to team action':
    'Como o DBX ajuda da primeira mensagem à ação da equipe',
  'DBX handles intake': 'DBX gerencia a entrada',
  'Agentic AI for Customers': 'IA agéntica para clientes',
  'Industries': 'Setores',
  'Explore Industries': 'Explorar setores'
}

const src = fs.readFileSync('src/i18n-runtime.js', 'utf8')
const block = src.match(/const esEntries = (\[[\s\S]*?\])\n\nconst localeCatalogs/)?.[1]
if (!block) throw new Error('Could not parse esEntries from i18n-runtime.js')

const esEntries = vm.runInNewContext(block)
const ptEntries = []

for (let i = 0; i < esEntries.length; i++) {
  const [en] = esEntries[i]
  process.stderr.write(`\r${i + 1}/${esEntries.length}`)
  let pt = manual[en]
  if (!pt) pt = fixPt(await translateEnPt(en))
  ptEntries.push([en, pt])
  await sleep(120)
}
process.stderr.write('\n')

fs.writeFileSync('src/i18n/pt-entries.js', `export const ptEntries = ${JSON.stringify(ptEntries, null, 2)}\n`)
console.log(`Wrote ${ptEntries.length} entries to src/i18n/pt-entries.js`)
console.log('Run: node scripts/apply-i18n-corrections.mjs')

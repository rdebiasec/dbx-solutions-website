/**
 * Generates content/es/*.md and content/pt/*.md from content/en/*.md
 * using i18n translation maps. Official legal pages (07–09) come from content/_legal/.
 *
 * Usage: node site/scripts/export-content-i18n.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ptEntries } from '../../site/src/i18n/pt-entries.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')
const enDir = path.join(root, 'content/en')
const legalDir = path.join(root, 'content/_legal')

const runtimePath = path.join(root, 'site/src/i18n-runtime.js')
const runtimeSource = fs.readFileSync(runtimePath, 'utf8')
const esMatch = runtimeSource.match(/const esEntries = (\[[\s\S]*?\n\])\s*\n/)
if (!esMatch) throw new Error('Could not parse esEntries from i18n-runtime.js')
const esEntries = eval(esMatch[1])

const OFFICIAL_LEGAL = ['07-legal-privacy.md', '08-legal-terms.md', '09-legal-sms.md']

const manualLabels = {
  es: {
    '# Global — Navigation, Footer & Contact': '# Global — Navegación, footer y contacto',
    '# Home': '# Inicio',
    '# Solutions': '# Soluciones',
    '# Services': '# Servicios',
    '# Industries': '# Industrias',
    '# About': '# Nosotros',
    '# Contact': '# Contacto',
    '# Privacy Policy': '# Política de Privacidad',
    '# Terms of Service': '# Términos de Servicio',
    '# SMS Terms': '# Términos SMS',
    '# Data Handling Notice': '# Aviso de Manejo de Datos',
    '# Responsible AI Policy': '# Política de IA Responsable',
    '# Security Roadmap': '# Hoja de Ruta de Seguridad',
    'Book a Consultation': 'Reservar una consulta',
    'See How It Works': 'Ver cómo funciona',
    'View Services': 'Ver servicios',
    'Explore Solutions': 'Explorar soluciones',
    'Contact Us': 'Contáctanos',
    'Email Us': 'Escríbenos',
    Home: 'Inicio',
    Solutions: 'Soluciones',
    Services: 'Servicios',
    Industries: 'Industrias',
    About: 'Nosotros',
    Contact: 'Contacto',
    'Privacy Policy': 'Política de Privacidad',
    'Terms of Service': 'Términos de Servicio',
    'SMS Terms': 'Términos SMS',
    'Data Handling Notice': 'Aviso de Manejo de Datos',
    'Responsible AI Policy': 'Política de IA Responsable',
    'Security Roadmap': 'Hoja de Ruta de Seguridad',
    'Language toggle': 'Cambiar idioma',
    'Toggle navigation': 'Abrir menú',
    'Thank you. We received your request and will follow up soon.':
      'Gracias. Recibimos su solicitud y le responderemos pronto.'
  },
  pt: {
    '# Global — Navigation, Footer & Contact': '# Global — Navegação, rodapé e contato',
    '# Home': '# Início',
    '# Solutions': '# Soluções',
    '# Services': '# Serviços',
    '# Industries': '# Setores',
    '# About': '# Sobre',
    '# Contact': '# Contato',
    '# Privacy Policy': '# Política de Privacidade',
    '# Terms of Service': '# Termos de Serviço',
    '# SMS Terms': '# Termos SMS',
    '# Data Handling Notice': '# Aviso de Tratamento de Dados',
    '# Responsible AI Policy': '# Política de IA Responsável',
    '# Security Roadmap': '# Roteiro de Segurança',
    'Book a Consultation': 'Agendar uma consulta',
    'See How It Works': 'Veja como funciona',
    'View Services': 'Ver serviços',
    'Explore Solutions': 'Explorar soluções',
    'Contact Us': 'Fale conosco',
    'Email Us': 'Envie um e-mail',
    Home: 'Início',
    Solutions: 'Soluções',
    Services: 'Serviços',
    Industries: 'Setores',
    About: 'Sobre',
    Contact: 'Contato',
    'Privacy Policy': 'Política de Privacidade',
    'Terms of Service': 'Termos de Serviço',
    'SMS Terms': 'Termos SMS',
    'Data Handling Notice': 'Aviso de Tratamento de Dados',
    'Responsible AI Policy': 'Política de IA Responsável',
    'Security Roadmap': 'Roteiro de Segurança',
    'Language toggle': 'Alternar idioma',
    'Toggle navigation': 'Abrir menu',
    'Thank you. We received your request and will follow up soon.':
      'Obrigado. Recebemos sua solicitação e entraremos em contato em breve.'
  }
}

function buildMap(entries) {
  return new Map(entries)
}

function translateContent(text, entryMap, labels) {
  let out = text
  const labelEntries = Object.entries(labels).sort((a, b) => b[0].length - a[0].length)
  for (const [en, localized] of labelEntries) {
    out = out.split(en).join(localized)
  }
  const sorted = [...entryMap.entries()].sort((a, b) => b[0].length - a[0].length)
  for (const [en, localized] of sorted) {
    if (out.includes(en)) out = out.split(en).join(localized)
  }
  return out
}

function exportLocale(locale, entryMap, labels) {
  const outDir = path.join(root, 'content', locale)
  fs.mkdirSync(outDir, { recursive: true })

  for (const file of fs.readdirSync(enDir).filter((f) => f.endsWith('.md'))) {
    let content
    const officialPath = path.join(legalDir, locale, file)
    if (OFFICIAL_LEGAL.includes(file) && fs.existsSync(officialPath)) {
      content = fs.readFileSync(officialPath, 'utf8')
    } else {
      const enContent = fs.readFileSync(path.join(enDir, file), 'utf8')
      content = translateContent(enContent, entryMap, labels)
    }
    fs.writeFileSync(path.join(outDir, file), content, 'utf8')
    console.log(`Wrote content/${locale}/${file}`)
  }
}

exportLocale('es', buildMap(esEntries), manualLabels.es)
exportLocale('pt', buildMap(ptEntries), manualLabels.pt)

console.log('Done — EN (source), ES, and PT content exported.')

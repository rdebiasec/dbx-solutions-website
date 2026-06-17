/**
 * Generates content/kb/{es,pt}/sections/*.md from content/kb/en/sections/*.md
 *
 * Usage: node site/scripts/export-kb-i18n.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ptEntries } from '../../site/src/i18n/pt-entries.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')
const enDir = path.join(root, 'content/kb/en/sections')

const runtimePath = path.join(root, 'site/src/i18n-runtime.js')
const runtimeSource = fs.readFileSync(runtimePath, 'utf8')
const esMatch = runtimeSource.match(/const esEntries = (\[[\s\S]*?\n\])\s*\n/)
if (!esMatch) throw new Error('Could not parse esEntries')
const esEntries = eval(esMatch[1])

const meta = {
  es: {
    '# Section Q&A — Global': '# Preguntas por sección — Global',
    '# Section Q&A — Home': '# Preguntas por sección — Inicio',
    '# Section Q&A — Solutions': '# Preguntas por sección — Soluciones',
    '# Section Q&A — Services': '# Preguntas por sección — Servicios',
    '# Section Q&A — Industries': '# Preguntas por sección — Industrias',
    '# Section Q&A — About': '# Preguntas por sección — Nosotros',
    '# Section Q&A — Contact': '# Preguntas por sección — Contacto',
    '# Section Q&A — Privacy Policy': '# Preguntas por sección — Política de Privacidad',
    '# Section Q&A — Terms of Service': '# Preguntas por sección — Términos de Servicio',
    '# Section Q&A — SMS Terms': '# Preguntas por sección — Términos SMS',
    '# Section Q&A — Data Handling Notice': '# Preguntas por sección — Aviso de Manejo de Datos',
    '# Section Q&A — Responsible AI Policy': '# Preguntas por sección — Política de IA Responsable',
    '# Section Q&A — Security Roadmap': '# Preguntas por sección — Hoja de Ruta de Seguridad',
    '**KB ID:**': '**ID KB:**',
    '**Source:**': '**Fuente:**',
    '**Site:**': '**Sitio:**',
    '**Effective:**': '**Vigencia:**',
    'All pages (header, footer, nav)': 'Todas las páginas (cabecera, pie, navegación)',
    '## Navigation & site': '## Navegación y sitio',
    '## Contact (global)': '## Contacto (global)',
    '## Footer': '## Pie de página',
    '## Page summaries (when someone lands on a subpage)': '## Resumen de páginas (cuando alguien entra a una subpágina)',
    '## Page hero': '## Hero de la página',
    '## What we help with (five areas)': '## En qué ayudamos (cinco áreas)',
    '## Page CTA': '## CTA de la página',
    '## Customer journey (visual flow)': '## Recorrido del cliente (flujo visual)',
    '## All six services (full detail)': '## Los seis servicios (detalle)',
    '## High-priority sectors': '## Sectores prioritarios',
    '## Additional sectors': '## Sectores adicionales',
    '## Regulated sectors': '## Sectores regulados',
    '## Mission': '## Misión',
    '## Approach': '## Enfoque',
    '## Values (five)': '## Valores (cinco)',
    '## Consultation options': '## Opciones de consulta',
    '## SMS on contact form': '## SMS en el formulario de contacto',
    '## Privacy on contact': '## Privacidad en el contacto',
    '## Pricing': '## Precios',
    '## Overview': '## Resumen',
    '## What we collect': '## Qué recopilamos',
    '## How we use it': '## Cómo lo usamos',
    '## SMS & cookies': '## SMS y cookies',
    '## Sharing & subprocessors': '## Compartir datos y encargados',
    '## Your rights': '## Sus derechos',
    '## Security & changes': '## Seguridad y cambios',
    '## Website purpose': '## Propósito del sitio',
    '## Results & accuracy': '## Resultados y exactitud',
    '## Acceptable use': '## Uso aceptable',
    '## Liability & law': '## Responsabilidad y ley',
    '## Program': '## Programa',
    '## Opt-in & opt-out': '## Suscripción y cancelación',
    '## Costs & delivery': '## Costos y entrega',
    '## Privacy': '## Privacidad',
    '## Scope': '## Alcance',
    '## Our approach': '## Nuestro enfoque',
    '## For prospects': '## Para prospectos',
    '## Working principles': '## Principios de trabajo',
    '## Humans & escalation': '## Personas y escalado',
    '## Regulated industries': '## Industrias reguladas',
    '## Improvement': '## Mejora continua',
    '## Roadmap items': '## Ítems del roadmap',
    '## Disclaimer': '## Aviso legal',
    '§ Hero': '§ Hero',
    '§ Results': '§ Resultados',
    '§ The Challenge': '§ El desafío',
    '§ The Solution': '§ La solución',
    '§ Services — home preview': '§ Servicios — vista en inicio',
    '§ Ongoing Support': '§ Soporte continuo',
    '§ Our Process': '§ Nuestro proceso',
    '§ Industries — home preview': '§ Industrias — vista en inicio',
    '§ Why DBX Solutions': '§ Por qué DBX Solutions',
    '§ FAQ on homepage': '§ FAQ en la página de inicio',
    '§ Final CTA': '§ CTA final',
    '**Q:': '**P:',
    '\nA:': '\nR:'
  },
  pt: {
    '# Section Q&A — Global': '# Perguntas por seção — Global',
    '# Section Q&A — Home': '# Perguntas por seção — Início',
    '# Section Q&A — Solutions': '# Perguntas por seção — Soluções',
    '# Section Q&A — Services': '# Perguntas por seção — Serviços',
    '# Section Q&A — Industries': '# Perguntas por seção — Setores',
    '# Section Q&A — About': '# Perguntas por seção — Sobre',
    '# Section Q&A — Contact': '# Perguntas por seção — Contato',
    '# Section Q&A — Privacy Policy': '# Perguntas por seção — Política de Privacidade',
    '# Section Q&A — Terms of Service': '# Perguntas por seção — Termos de Serviço',
    '# Section Q&A — SMS Terms': '# Perguntas por seção — Termos SMS',
    '# Section Q&A — Data Handling Notice': '# Perguntas por seção — Aviso de Tratamento de Dados',
    '# Section Q&A — Responsible AI Policy': '# Perguntas por seção — Política de IA Responsável',
    '# Section Q&A — Security Roadmap': '# Perguntas por seção — Roteiro de Segurança',
    '**KB ID:**': '**ID KB:**',
    '**Source:**': '**Fonte:**',
    '**Site:**': '**Site:**',
    '**Effective:**': '**Vigência:**',
    'All pages (header, footer, nav)': 'Todas as páginas (cabeçalho, rodapé, navegação)',
    '## Navigation & site': '## Navegação e site',
    '## Contact (global)': '## Contato (global)',
    '## Footer': '## Rodapé',
    '## Page summaries (when someone lands on a subpage)': '## Resumo das páginas (quando alguém entra em uma subpágina)',
    '## Page hero': '## Hero da página',
    '## What we help with (five areas)': '## No que ajudamos (cinco áreas)',
    '## Page CTA': '## CTA da página',
    '## Customer journey (visual flow)': '## Jornada do cliente (fluxo visual)',
    '## All six services (full detail)': '## Os seis serviços (detalhe)',
    '## High-priority sectors': '## Setores prioritários',
    '## Additional sectors': '## Setores adicionais',
    '## Regulated sectors': '## Setores regulados',
    '## Mission': '## Missão',
    '## Approach': '## Abordagem',
    '## Values (five)': '## Valores (cinco)',
    '## Consultation options': '## Opções de consulta',
    '## SMS on contact form': '## SMS no formulário de contato',
    '## Privacy on contact': '## Privacidade no contato',
    '## Pricing': '## Preços',
    '## Overview': '## Visão geral',
    '## What we collect': '## O que coletamos',
    '## How we use it': '## Como usamos',
    '## SMS & cookies': '## SMS e cookies',
    '## Sharing & subprocessors': '## Compartilhamento e operadores',
    '## Your rights': '## Seus direitos',
    '## Security & changes': '## Segurança e alterações',
    '## Website purpose': '## Finalidade do site',
    '## Results & accuracy': '## Resultados e precisão',
    '## Acceptable use': '## Uso aceitável',
    '## Liability & law': '## Responsabilidade e lei',
    '## Program': '## Programa',
    '## Opt-in & opt-out': '## Opt-in e opt-out',
    '## Costs & delivery': '## Custos e entrega',
    '## Privacy': '## Privacidade',
    '## Scope': '## Escopo',
    '## Our approach': '## Nossa abordagem',
    '## For prospects': '## Para prospects',
    '## Working principles': '## Princípios de trabalho',
    '## Humans & escalation': '## Pessoas e escalonamento',
    '## Regulated industries': '## Setores regulados',
    '## Improvement': '## Melhoria contínua',
    '## Roadmap items': '## Itens do roteiro',
    '## Disclaimer': '## Aviso legal',
    '§ The Challenge': '§ O desafio',
    '§ The Solution': '§ A solução',
    '§ Services — home preview': '§ Serviços — vista na página inicial',
    '§ Ongoing Support': '§ Suporte contínuo',
    '§ Our Process': '§ Nosso processo',
    '§ Industries — home preview': '§ Setores — vista na página inicial',
    '§ Why DBX Solutions': '§ Por que DBX Solutions',
    '§ FAQ on homepage': '§ FAQ na página inicial',
    '§ Final CTA': '§ CTA final',
    '**Q:': '**P:',
    '\nA:': '\nR:'
  }
}

const contentManual = {
  es: {
    'content/en/': 'content/es/',
    'Book a Consultation': 'Reservar una consulta',
    'Book a consultation': 'Reservar una consulta',
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
    'Start here': 'Empiece aquí',
    'We run it with you': 'Lo operamos con usted',
    'See How It Works': 'Ver cómo funciona',
    'View Services': 'Ver servicios',
    'Explore Solutions': 'Explorar soluciones'
  },
  pt: {
    'content/en/': 'content/pt/',
    'Book a Consultation': 'Agendar uma consulta',
    'Book a consultation': 'Agendar uma consulta',
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
    'Start here': 'Comece aqui',
    'We run it with you': 'Operamos com você',
    'See How It Works': 'Veja como funciona',
    'View Services': 'Ver serviços',
    'Explore Solutions': 'Explorar soluções'
  }
}

function buildMap(entries) {
  return new Map(entries)
}

function translate(text, entryMap, labels) {
  let out = text
  const all = Object.entries(labels).sort((a, b) => b[0].length - a[0].length)
  for (const [en, loc] of all) {
    out = out.split(en).join(loc)
  }
  const sorted = [...entryMap.entries()].sort((a, b) => b[0].length - a[0].length)
  for (const [en, loc] of sorted) {
    if (out.includes(en)) out = out.split(en).join(loc)
  }
  return out
}

function exportLocale(locale, entryMap) {
  const labels = { ...meta[locale], ...contentManual[locale] }
  const outDir = path.join(root, 'content/kb', locale, 'sections')
  fs.mkdirSync(outDir, { recursive: true })
  for (const file of fs.readdirSync(enDir).filter((f) => f.endsWith('.md'))) {
    const en = fs.readFileSync(path.join(enDir, file), 'utf8')
    fs.writeFileSync(path.join(outDir, file), translate(en, entryMap, labels), 'utf8')
    console.log(`Wrote content/kb/${locale}/sections/${file}`)
  }
}

exportLocale('es', buildMap(esEntries))
exportLocale('pt', buildMap(ptEntries))
console.log('Done — KB sections in EN, ES, PT.')

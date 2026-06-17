#!/usr/bin/env node
/**
 * Build Intercom upload manifest from content/ markdown files.
 * Output: tools/intercom/upload-manifest.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')
const contentRoot = path.join(root, 'content')
const out = path.join(__dirname, 'upload-manifest.json')

const files = []

function add(filePath, category, locale) {
  const base = path.basename(filePath, '.md')
  const text = fs.readFileSync(filePath, 'utf8')
  const h1 = (text.match(/^# (.+)$/m) || [])[1] || base
  const localeTag = locale.toUpperCase()
  let title = `[${localeTag}]`
  if (category === 'kb') {
    title += ` KB — ${h1.replace(/^(Section Q&A|Preguntas por sección|Perguntas por seção) — /, '')}`
  } else if (category === 'faq') {
    title += ' FAQ — Customer'
  } else if (category === 'site') {
    title += ` Site — ${h1}`
  } else {
    title += ` Index — ${h1}`
  }
  files.push({
    path: filePath,
    category,
    locale,
    title,
    description: `${category} / ${locale} / ${base}`,
    content: text
  })
}

for (const locale of ['en', 'es', 'pt']) {
  const dir = path.join(contentRoot, 'kb', locale, 'sections')
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) {
    add(path.join(dir, f), 'kb', locale)
  }
}

for (const locale of ['en', 'es', 'pt']) {
  add(path.join(contentRoot, 'faqs', `${locale}-customer-faqs.md`), 'faq', locale)
}

for (const locale of ['en', 'es', 'pt']) {
  for (const f of fs.readdirSync(path.join(contentRoot, locale)).filter((x) => x.endsWith('.md')).sort()) {
    add(path.join(contentRoot, locale, f), 'site', locale)
  }
}

for (const rel of ['kb/KB-MAP.md', 'README.md', 'faqs/README.md']) {
  add(path.join(contentRoot, rel), 'index', 'en')
}

fs.writeFileSync(out, JSON.stringify(files, null, 2))
console.log(`Wrote ${files.length} entries to ${out}`)

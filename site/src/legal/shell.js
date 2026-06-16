import { href } from './constants.js'
import { initIntercom } from '../intercom.js'
import { getLocale, setLocale, renderLangToggle, getHtmlLang } from '../i18n-runtime.js'
import { getLegalArticle } from './get-article.js'
import { setLegalMeta } from './set-legal-meta.js'

const NAV = [
  { hash: 'solutions/', key: 'solutions' },
  { hash: 'services/', key: 'services' },
  { hash: 'industries/', key: 'industries' },
  { hash: '#process', key: 'process' },
  { hash: '#trust', key: 'trust' },
  { hash: 'contact/', key: 'contact' }
]

const legalI18n = {
  en: {
    solutions: 'Solutions',
    services: 'Services',
    industries: 'Industries',
    process: 'How we work',
    trust: 'Trust',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    sms: 'SMS Terms',
    backHome: '← Back to home',
    toggleNav: 'Toggle navigation'
  },
  es: {
    solutions: 'Soluciones',
    services: 'Servicios',
    industries: 'Industrias',
    process: 'Cómo trabajamos',
    trust: 'Confianza',
    contact: 'Contacto',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    sms: 'Términos SMS',
    backHome: '← Volver al inicio',
    toggleNav: 'Alternar navegación'
  },
  pt: {
    solutions: 'Soluções',
    services: 'Serviços',
    industries: 'Indústrias',
    process: 'Como trabalhamos',
    trust: 'Confiança',
    contact: 'Contato',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
    sms: 'Termos SMS',
    backHome: '← Voltar ao início',
    toggleNav: 'Alternar navegação'
  }
}

function t(locale, key) {
  return legalI18n[locale]?.[key] ?? legalI18n.en[key] ?? key
}

function renderLegalHeader(locale) {
  const home = href('')
  return `
    <header>
      <div class="header-top">
        <a href="${home}" class="logo"><img src="${href('logo.png')}" alt="DBX Solutions" width="120" height="40" /></a>
        <nav id="primary-nav" aria-label="Primary">
          ${NAV.map((item) => `<a href="${item.hash.startsWith('#') ? `${home}${item.hash}` : href(item.hash)}">${t(locale, item.key)}</a>`).join('')}
        </nav>
        <div class="header-actions">
          ${renderLangToggle(locale)}
        </div>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
          <span class="sr-only">${t(locale, 'toggleNav')}</span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
        </button>
      </div>
    </header>
  `
}

function renderLegalChromeFooter(activePage, locale) {
  const p = href('privacy-policy/')
  const tUrl = href('terms-of-service/')
  const s = href('sms-terms/')
  return `
    <footer class="legal-doc-footer">
      <nav class="footer-legal" aria-label="Legal">
        <a href="${p}" ${activePage === 'privacy' ? 'aria-current="page"' : ''}>${t(locale, 'privacy')}</a>
        <a href="${tUrl}" ${activePage === 'terms' ? 'aria-current="page"' : ''}>${t(locale, 'terms')}</a>
        <a href="${s}" ${activePage === 'sms' ? 'aria-current="page"' : ''}>${t(locale, 'sms')}</a>
      </nav>
      <p class="legal-back-home"><a href="${href('')}">${t(locale, 'backHome')}</a></p>
    </footer>
  `
}

function bindMobileNav() {
  const navToggle = document.querySelector('.nav-toggle')
  const navElement = document.querySelector('header nav')
  const closeNav = () => {
    document.body.classList.remove('nav-open')
    navToggle?.setAttribute('aria-expanded', 'false')
  }
  navToggle?.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open')
    navToggle.setAttribute('aria-expanded', String(isOpen))
  })
  navElement?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 900px)').matches) closeNav()
    })
  })
}

function bindLegalLocaleToggle(type, activePage) {
  document.querySelectorAll('.lang-toggle-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const locale = event.currentTarget.dataset.locale
      if (!locale) return
      setLocale(locale)
      mountLegalPage({ activePage, type })
    })
  })
}

function renderLegalPage(activePage, type) {
  const locale = getLocale()
  setLegalMeta(type, locale)
  document.documentElement.lang = getHtmlLang(locale)

  const root = document.getElementById('legal-root')
  if (!root) return

  root.innerHTML = `
    <div class="wrapper legal-doc">
      ${renderLegalHeader(locale)}
      <main class="legal-main">
        <article class="legal-page">
          ${getLegalArticle(type, locale)}
        </article>
        ${renderLegalChromeFooter(activePage, locale)}
      </main>
    </div>
  `

  bindMobileNav()
  bindLegalLocaleToggle(type, activePage)
  initIntercom()
}

/**
 * @param {{ activePage: 'privacy' | 'terms' | 'sms', type: 'privacy' | 'terms' | 'sms' }} opts
 */
export function mountLegalPage(opts) {
  renderLegalPage(opts.activePage, opts.type)
}

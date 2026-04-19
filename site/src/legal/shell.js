import { href } from './constants.js'

const NAV = [
  { hash: '#process', label: 'How we work' },
  { hash: '#programs', label: 'Programs' },
  { hash: '#proof', label: 'Results' },
  { hash: '#contact', label: 'Contact' }
]

function renderLegalHeader() {
  const home = href('')
  return `
    <header>
      <div class="header-top">
        <a href="${home}" class="logo"><img src="${href('logo.png')}" alt="DBX Solutions" width="120" height="40" /></a>
        <nav id="primary-nav" aria-label="Primary">
          ${NAV.map((item) => `<a href="${home}${item.hash}">${item.label}</a>`).join('')}
        </nav>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
          <span class="sr-only">Toggle navigation</span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
        </button>
      </div>
    </header>
  `
}

function renderLegalChromeFooter(activePage) {
  const p = href('privacy-policy/')
  const t = href('terms-of-service/')
  const s = href('sms-terms/')
  return `
    <footer class="legal-doc-footer">
      <nav class="footer-legal" aria-label="Legal">
        <a href="${p}" ${activePage === 'privacy' ? 'aria-current="page"' : ''}>Privacy Policy</a>
        <a href="${t}" ${activePage === 'terms' ? 'aria-current="page"' : ''}>Terms of Service</a>
        <a href="${s}" ${activePage === 'sms' ? 'aria-current="page"' : ''}>SMS Terms</a>
      </nav>
      <p class="legal-back-home"><a href="${href('')}">← Back to home</a></p>
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

/**
 * @param {{ innerArticleHtml: string, activePage: 'privacy' | 'terms' | 'sms' }} opts
 */
export function mountLegalPage(opts) {
  const root = document.getElementById('legal-root')
  if (!root) return

  root.innerHTML = `
    <div class="wrapper legal-doc">
      ${renderLegalHeader()}
      <main class="legal-main">
        <article class="legal-page">
          ${opts.innerArticleHtml}
        </article>
        ${renderLegalChromeFooter(opts.activePage)}
      </main>
    </div>
  `

  bindMobileNav()
}

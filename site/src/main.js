import './style.css'
import en from './i18n/content.en.json'
import es from './i18n/content.es.json'
import { href } from './legal/constants.js'
import { smsConsentCheckboxHtml } from './sms-consent-copy.js'

const locales = { en, es }
const defaultLocale = 'en'
const storageKey = 'dbx-locale'

const navDefaults = {
  services: 'Solutions',
  growth: 'Growth',
  process: 'How we work',
  proof: 'Results',
  contact: 'Contact'
}

const labelDefaults = {
  valueEquation: 'WHAT YOU GET',
  timeToProd: 'TIME TO LIVE',
  stack: 'YOUR TOOLS',
  languageToggle: 'Language toggle'
}

const app = document.querySelector('#app')
const pad = (num) => String(num).padStart(2, '0')

const merge = (base, override) => ({ ...base, ...(override || {}) })

const CALENDAR_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ZsDyacDZ8oSqHZCMshx3wV8SzGw3MA9KL4hjcU3OIMLJ-3QFRfiV2OjLTn0nKqz526eI3zQk1?gv=true'

function getLocale() {
  const stored = localStorage.getItem(storageKey)
  if (stored && locales[stored]) return stored
  return defaultLocale
}

function setLocale(lang) {
  if (!locales[lang]) return
  localStorage.setItem(storageKey, lang)
  render(lang)
}

function renderLangToggle(labels, lang) {
  return `
    <div class="lang-toggle" aria-label="${labels.languageToggle}">
      <button class="${lang === 'en' ? 'active' : ''}" data-locale="en" type="button">
        EN 🇺🇸
      </button>
      <button class="${lang === 'es' ? 'active' : ''}" data-locale="es" type="button">
        ES 🇨🇴
      </button>
    </div>
  `
}

function renderHeader(nav, labels, lang) {
  return `
    <header>
      <div class="header-top">
        <a href="#top" class="logo"><img src="${href('logo.png')}" alt="DBX Solutions" /></a>
        <nav id="primary-nav">
          <a href="#programs">${nav.services}</a>
          <a href="#growth">${nav.growth}</a>
          <a href="#process">${nav.process}</a>
          <a href="#proof">${nav.proof}</a>
          <a href="#contact">${nav.contact}</a>
        </nav>
        <div class="header-cta">
          ${renderLangToggle(labels, lang)}
        </div>
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

function renderHero(t, labels) {
  return `
    <section class="hero" id="top">
      <div>
        <span class="eyebrow">${t.hero.eyebrow}</span>
        <h1>${t.hero.headline}</h1>
        <p>${t.hero.body}</p>
        <ul class="key-points">
          ${t.hero.points.map((item) => `<li>${item}</li>`).join('')}
        </ul>
        <div class="actions">
          <a class="btn btn-primary" href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">${t.hero.ctaPrimary}</a>
        </div>
        ${
          Array.isArray(t.hero.ctaBullets) && t.hero.ctaBullets.length
            ? `
        <div class="hero-cta-detail">
          ${t.hero.ctaCallIntro ? `<p class="hero-cta-intro">${t.hero.ctaCallIntro}</p>` : ''}
          <ul class="hero-cta-bullets list-dots">
            ${t.hero.ctaBullets.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>`
            : ''
        }
        <div class="value-equation">
          <div class="value-pill">
            <span>${labels.valueEquation}</span>
            <strong>${t.hero.value.equation}</strong>
          </div>
          <div class="value-pill">
            <span>${labels.timeToProd}</span>
            <strong>${t.hero.value.time}</strong>
          </div>
          <div class="value-pill">
            <span>${labels.stack}</span>
            <strong>${t.hero.value.stack}</strong>
          </div>
        </div>
        <p class="value-note"><strong>${t.hero.value.noteLabel}</strong> ${t.hero.value.noteText}</p>
      </div>
      <div class="hero-card hero-media-card">
        <div class="hero-media">
          <span class="media-eyebrow">${t.hero.media.eyebrow}</span>
          <h3>${t.hero.media.title}</h3>
          <p>${t.hero.media.body}</p>
          <div class="media-frame" role="img" aria-label="${t.hero.media.graphicLabel}">
            <svg viewBox="0 0 520 240" aria-hidden="true">
              <defs>
                <linearGradient id="media-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#4fd1c5" stop-opacity="0.9" />
                  <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.5" />
                </linearGradient>
                <linearGradient id="media-loop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#4fd1c5" stop-opacity="0.7" />
                  <stop offset="100%" stop-color="#22d3ee" stop-opacity="0.2" />
                </linearGradient>
              </defs>
              <rect x="16" y="24" width="488" height="170" rx="16" fill="rgba(255,255,255,0.04)" />
              <path d="M60 110 L460 110" stroke="url(#media-line)" stroke-width="3" stroke-linecap="round" />
              ${t.hero.media.stages
                .map(
                  (stage, index) => `
              <g>
                <circle cx="${60 + index * 100}" cy="110" r="16" fill="rgba(79, 209, 197, 0.2)" stroke="#4fd1c5" stroke-width="2" />
                <text x="${60 + index * 100}" y="155" text-anchor="middle" fill="rgba(238,241,255,0.78)" font-size="11" font-family="Manrope, sans-serif">${stage}</text>
              </g>`
                )
                .join('')}
            </svg>
          </div>
          <ul class="media-list">
            ${t.hero.media.steps.map((step) => `<li>${step}</li>`).join('')}
          </ul>
          <p class="media-caption">${t.hero.media.caption}</p>
        </div>
      </div>
    </section>
  `
}

function renderTrustBar(t) {
  if (!t.trust) return ''
  const clients = t.trust.industries ?? []
  if (!clients.length) return ''
  return `
    <section class="trust-bar" id="trust">
      <div class="trust-bar-label">${t.trust.label}</div>
      <div class="logo-strip">
        ${clients.map((item) => `<span class="logo-pill">${item}</span>`).join('')}
      </div>
    </section>
  `
}

function renderPrograms(t) {
  return `
    <section id="programs">
      <div class="section-heading">
        <span class="eyebrow">${t.services.eyebrow}</span>
        <h2>${t.services.title}</h2>
        <p>${t.services.description}</p>
      </div>
      <div class="services-grid">
        ${t.services.cards
          .map(
            (card, index) => `
        <article class="service-card">
          <div class="card-header">
            <div class="service-icon">${pad(index + 1)}</div>
            <span class="timeline-tag">${card.timeline}</span>
          </div>
          <h3>${card.title}</h3>
          <p>${card.description}</p>
          <div class="service-meta">
            <span><strong>${card.outputs}</strong></span>
            <span><strong>${card.artifacts}</strong></span>
            <span class="kpi-tag">${card.kpi}</span>
          </div>
          <details>
            <summary>${t.services.listLabel}</summary>
            <ul class="list-dots">
              ${card.items.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </details>
        </article>`
          )
          .join('')}
      </div>
    </section>
  `
}

function renderBusinessModel(t) {
  if (!t.model) return ''
  return `
    <section id="business-model" class="cta-panel">
      <span class="eyebrow">${t.model.eyebrow}</span>
      <h2>${t.model.title}</h2>
      <p>${t.model.intro}</p>
      <p>${t.model.body1}</p>
      <p>${t.model.body2}</p>
      <p class="urgency-note">${t.model.privacy}</p>
    </section>
  `
}

function renderGrowth(t) {
  if (!t.growth) return ''
  return `
    <section id="growth" class="cta-panel growth-section">
      <span class="eyebrow">${t.growth.eyebrow}</span>
      <h2>${t.growth.title}</h2>
      <p>${t.growth.intro}</p>
      <p>${t.growth.body1}</p>
      <p>${t.growth.body2}</p>
      <p>${t.growth.body3}</p>
    </section>
  `
}

function renderUseCases(t) {
  if (!t.useCases?.items?.length) return ''
  return `
    <section id="use-cases" class="use-cases-section">
      <div class="section-heading">
        <span class="eyebrow">${t.useCases.eyebrow}</span>
        <h2>${t.useCases.title}</h2>
        ${t.useCases.body ? `<p>${t.useCases.body}</p>` : ''}
      </div>
      <ul class="use-cases-list list-dots">
        ${t.useCases.items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </section>
  `
}

function renderProcess(t) {
  return `
    <section id="process" class="process-section">
      <div class="section-heading">
        <span class="eyebrow">${t.process.eyebrow}</span>
        <h2>${t.process.title}</h2>
        <p>${t.process.body}</p>
      </div>
      <div class="process-timeline">
        <div class="process-grid">
          ${t.process.steps
            .map(
              (step, index) => `
            <div class="step-card">
              <div class="step-number">${pad(index + 1)}</div>
              <div>
                <h4>${step.title}</h4>
                <p>${step.body}</p>
                <div class="milestone-chip">${step.chip}</div>
              </div>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>
  `
}

function renderProof(t) {
  return `
    <section id="proof">
      <div class="section-heading">
        <span class="eyebrow">${t.proof.eyebrow}</span>
        <h2>${t.proof.title}</h2>
      </div>
      <div class="proof-grid">
        <div>
          <div class="result-grid">
            ${t.proof.stats
              .map(
                (stat) => `
            <div class="stat">
              <strong>${stat.value}</strong>
              ${stat.label}
            </div>`
              )
              .join('')}
          </div>
        </div>
        <div class="testimonial-stack">
          ${t.proof.testimonials
            .map(
              (testimonial) => `
          <div class="testimonial-card">
            "${testimonial.quote}"
            <strong>${testimonial.author}</strong>
            ${testimonial.company ? `<span class="testimonial-company">${testimonial.company}</span>` : ''}
          </div>`
            )
            .join('')}
        </div>
      </div>
    </section>
  `
}

function renderContact(t) {
  const booking = t.contact.bookingNote
    ? `<p class="contact-booking-note"><a href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">${t.contact.bookingNote}</a></p>`
    : ''
  const privacyHref = href('privacy-policy/')
  const smsTermsHref = href('sms-terms/')
  const smsBlock = smsConsentCheckboxHtml(
    privacyHref,
    smsTermsHref,
    t.contact.form.smsConsentError || ''
  )
  return `
    <section id="contact" class="cta-panel">
      <span class="eyebrow">${t.contact.eyebrow}</span>
      <h2>${t.contact.title}</h2>
      <p>${t.contact.body}</p>
      ${t.contact.urgency ? `<p class="urgency-note">${t.contact.urgency}</p>` : ''}
      <div class="cta-grid cta-grid-single">
        <form class="lead-form">
          <div>
            <label for="lead-name">${t.contact.form.name}</label>
            <input id="lead-name" type="text" name="name" placeholder="${t.contact.form.placeholderName}" autocomplete="name" />
          </div>
          <div>
            <label for="lead-email">${t.contact.form.email}</label>
            <input id="lead-email" type="email" name="email" placeholder="${t.contact.form.placeholderEmail}" autocomplete="email" required />
          </div>
          <div>
            <label for="lead-phone">${t.contact.form.phone}</label>
            <input id="lead-phone" type="tel" name="phone" placeholder="${t.contact.form.placeholderPhone}" autocomplete="tel" inputmode="tel" />
          </div>
          ${smsBlock}
          ${
            Array.isArray(t.contact.form.challengeOptions)
              ? `
          <div>
            <label for="lead-challenge">${t.contact.form.challengeLabel}</label>
            <select id="lead-challenge" name="challenge">
              <option value="">${t.contact.form.challengePlaceholder}</option>
              ${t.contact.form.challengeOptions.map((opt) => `<option>${opt}</option>`).join('')}
            </select>
          </div>`
              : ''
          }
          <div>
            <label for="lead-initiative">${t.contact.form.message}</label>
            <textarea id="lead-initiative" name="message" placeholder="${t.contact.form.placeholderMessage}" rows="3"></textarea>
          </div>
          <button class="btn btn-primary" type="submit">${t.contact.form.submit}</button>
          ${booking}
        </form>
      </div>
      <div class="secondary-actions">
        ${t.contact.secondary
          .map(
            (item) => `
        <a class="secondary-link" href="${item.href}" target="_blank" rel="noopener noreferrer">${item.label}</a>`
          )
          .join('')}
      </div>
      <div class="contact-row">
        ${t.contact.contacts.map((info) => `<span>${info}</span>`).join('')}
      </div>
      <div class="contact-badges">
        ${t.contact.badges.map((badge) => `<span>${badge}</span>`).join('')}
      </div>
    </section>
  `
}

function renderFooter(t) {
  const p = href('privacy-policy/')
  const te = href('terms-of-service/')
  const s = href('sms-terms/')
  return `
    <footer>
      <nav class="footer-legal" aria-label="Legal">
        <a href="${p}">${t.footer.linkPrivacy}</a>
        <a href="${te}">${t.footer.linkTerms}</a>
        <a href="${s}">${t.footer.linkSms}</a>
      </nav>
      <div class="footer-meta">
        <span>${t.footer.notice}</span>
        <span>${t.footer.warning}</span>
      </div>
    </footer>
  `
}

function render(locale) {
  if (!app) return
  const t = locales[locale] || locales[defaultLocale]
  const nav = merge(navDefaults, merge(locales[defaultLocale].nav, t.nav))
  const labels = merge(labelDefaults, merge(locales[defaultLocale].labels, t.labels))

  app.innerHTML = `
    <div class="wrapper" data-locale="${locale}">
      ${renderHeader(nav, labels, locale)}
      ${renderHero(t, labels)}
      ${renderTrustBar(t)}
      ${renderPrograms(t)}
      ${renderGrowth(t)}
      ${renderProcess(t)}
      ${renderBusinessModel(t)}
      ${renderUseCases(t)}
      ${renderProof(t)}
      ${renderContact(t)}
      ${renderFooter(t)}
    </div>
`

  document.querySelectorAll('.lang-toggle button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const targetLocale = event.currentTarget?.dataset?.locale
      if (targetLocale) setLocale(targetLocale)
    })
  })

  const navToggle = document.querySelector('.nav-toggle')
  const navElement = document.querySelector('header nav')
  const wrapper = document.querySelector('.wrapper')

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
      if (window.matchMedia('(max-width: 900px)').matches) {
        closeNav()
      }
    })
  })

  wrapper?.addEventListener('click', (event) => {
    if (!document.body.classList.contains('nav-open')) return
    if (event.target.closest('header')) return
    closeNav()
  })

  bindLeadFormValidation()
}

function bindLeadFormValidation() {
  const form = document.querySelector('.lead-form')
  const phoneInput = document.getElementById('lead-phone')
  const smsCheckbox = document.getElementById('lead-sms-consent')
  const errEl = document.getElementById('lead-sms-consent-error')
  if (!form || !phoneInput || !smsCheckbox || !errEl) return

  const syncState = () => {
    const phone = phoneInput.value.trim()
    if (!phone || smsCheckbox.checked) {
      errEl.hidden = true
      smsCheckbox.removeAttribute('aria-invalid')
    }
  }

  phoneInput.addEventListener('input', syncState)
  smsCheckbox.addEventListener('change', syncState)

  form.addEventListener('submit', (event) => {
    const phone = phoneInput.value.trim()
    if (phone && !smsCheckbox.checked) {
      event.preventDefault()
      errEl.hidden = false
      smsCheckbox.setAttribute('aria-invalid', 'true')
      smsCheckbox.focus()
    }
  })
}

render(getLocale())

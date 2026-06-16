/** Canonical legal / business facts — single source of truth */
export const LEGAL_EFFECTIVE_DATE = 'February 23, 2026'
export const LEGAL_EFFECTIVE_DATES = {
  en: 'February 23, 2026',
  es: '23 de febrero de 2026',
  pt: '23 de fevereiro de 2026'
}

export function getLegalEffectiveDate(locale = 'en') {
  return LEGAL_EFFECTIVE_DATES[locale] ?? LEGAL_EFFECTIVE_DATES.en
}
export const COMPANY_LEGAL_NAME = 'DBX Solutions LLC'
export const CONTACT_EMAIL = 'contact@dbx-solutions.com'
/** Display format; same E.164 as +13212874509 */
export const CONTACT_PHONE_DISPLAY = '+1 (321) 287-4509'
export const SITE_URL = 'https://dbx-solutions.com'

/** Base path for router-less deploys (GitHub Pages subpath or `/`) */
export function baseUrl() {
  const b = import.meta.env.BASE_URL || '/'
  return b.endsWith('/') ? b : `${b}/`
}

export function href(path) {
  const root = baseUrl()
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${root}${clean}`
}

/** Shared Contact block for legal pages (no physical address) */
export function legalContactBlockHtml() {
  return `
    <p class="legal-contact-block">
      <strong>${COMPANY_LEGAL_NAME}</strong><br />
      <a href="${SITE_URL}">${SITE_URL}</a><br />
      <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a><br />
      <a href="tel:+13212874509">${CONTACT_PHONE_DISPLAY}</a>
    </p>
  `
}

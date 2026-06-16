import privacyEn from './articles/privacy.en.js'
import privacyEs from './articles/privacy.es.js'
import privacyPt from './articles/privacy.pt.js'
import termsEn from './articles/terms.en.js'
import termsEs from './articles/terms.es.js'
import termsPt from './articles/terms.pt.js'
import smsEn from './articles/sms.en.js'
import smsEs from './articles/sms.es.js'
import smsPt from './articles/sms.pt.js'

const catalog = {
  privacy: { en: privacyEn, es: privacyEs, pt: privacyPt },
  terms: { en: termsEn, es: termsEs, pt: termsPt },
  sms: { en: smsEn, es: smsEs, pt: smsPt }
}

/**
 * @param {'privacy' | 'terms' | 'sms'} type
 * @param {'en' | 'es' | 'pt'} locale
 */
export function getLegalArticle(type, locale) {
  const article = catalog[type]?.[locale] ?? catalog[type]?.en
  return article ? article() : ''
}

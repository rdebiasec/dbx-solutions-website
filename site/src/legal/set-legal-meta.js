import { getHtmlLang, updateHreflang } from '../i18n-runtime.js'

const legalPaths = {
  privacy: 'privacy-policy/',
  terms: 'terms-of-service/',
  sms: 'sms-terms/'
}

const metaByType = {
  privacy: {
    en: {
      title: 'Privacy Policy | DBX Solutions LLC',
      description:
        'Privacy Policy for DBX Solutions LLC, a Florida limited liability company. Information we collect, how we use it, SMS communications, subprocessors, and your choices.'
    },
    es: {
      title: 'Política de Privacidad | DBX Solutions LLC',
      description:
        'Política de Privacidad de DBX Solutions LLC. Información que recopilamos, uso, comunicaciones SMS, encargados del tratamiento y sus derechos, incluida la Ley 1581 de Colombia.'
    },
    pt: {
      title: 'Política de Privacidade | DBX Solutions LLC',
      description:
        'Política de Privacidade da DBX Solutions LLC. Informações que coletamos, uso, comunicações SMS, operadores e seus direitos, incluindo a LGPD.'
    }
  },
  terms: {
    en: {
      title: 'Terms of Service | DBX Solutions LLC',
      description:
        'Terms of Service for the DBX Solutions website. Website use, acceptable use, disclaimers, and governing law (Florida, United States).'
    },
    es: {
      title: 'Términos de Servicio | DBX Solutions LLC',
      description:
        'Términos de Servicio del sitio web de DBX Solutions. Uso del sitio, uso aceptable, exenciones de responsabilidad y ley aplicable (Florida, Estados Unidos).'
    },
    pt: {
      title: 'Termos de Serviço | DBX Solutions LLC',
      description:
        'Termos de Serviço do site da DBX Solutions. Uso do site, uso aceitável, isenções de responsabilidade e lei aplicável (Flórida, Estados Unidos).'
    }
  },
  sms: {
    en: {
      title: 'SMS Terms | DBX Solutions LLC',
      description:
        'SMS Terms for DBX Solutions. Automated text messages, TCPA and FTSA consent, opt-in, opt-out, message frequency, and carrier disclaimers.'
    },
    es: {
      title: 'Términos SMS | DBX Solutions LLC',
      description:
        'Términos SMS de DBX Solutions. Mensajes de texto automatizados, consentimiento, suscripción, cancelación, frecuencia y avisos de operadores.'
    },
    pt: {
      title: 'Termos SMS | DBX Solutions LLC',
      description:
        'Termos SMS da DBX Solutions. Mensagens de texto automatizadas, consentimento, opt-in, opt-out, frequência e avisos de operadoras.'
    }
  }
}

/**
 * @param {'privacy' | 'terms' | 'sms'} type
 * @param {'en' | 'es' | 'pt'} locale
 */
export function setLegalMeta(type, locale) {
  const meta = metaByType[type]?.[locale] ?? metaByType[type]?.en
  if (!meta) return

  document.title = meta.title
  document.documentElement.lang = getHtmlLang(locale)

  const description = document.querySelector('meta[name="description"]')
  if (description) description.setAttribute('content', meta.description)
  updateHreflang(legalPaths[type] || '')
}

/**
 * Canonical SMS opt-in checkbox label (English) — must match Privacy Policy, SMS Terms, and policies.
 * Links inserted on "Privacy Policy" and "SMS Terms" only.
 */
export function smsConsentCheckboxHtml(privacyHref, smsHref, consentErrorText, locale = 'en') {
  const label =
    locale === 'es'
      ? `Al marcar esta casilla, usted otorga consentimiento expreso previo por escrito para recibir mensajes de texto automatizados de DBX Solutions LLC relacionados con citas, servicios y soporte. La frecuencia de mensajes varía. Pueden aplicar tarifas de mensajes y datos. El consentimiento no es condición de compra. Responda STOP para cancelar y HELP para ayuda. Consulte la <a href="${privacyHref}">Política de Privacidad</a> y los <a href="${smsHref}">Términos SMS</a>.`
      : locale === 'pt'
        ? `Ao marcar esta caixa, você fornece consentimento expresso prévio por escrito para receber mensagens de texto automatizadas da DBX Solutions LLC relacionadas a consultas, serviços e suporte. A frequência de mensagens varia. Tarifas de mensagens e dados podem ser aplicadas. O consentimento não é condição de compra. Responda STOP para cancelar e HELP para ajuda. Consulte a <a href="${privacyHref}">Política de Privacidade</a> e os <a href="${smsHref}">Termos SMS</a>.`
        : `By checking this box, you provide prior express written consent to receive automated text messages from DBX Solutions LLC related to appointments, services, and support. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out and HELP for help. See <a href="${privacyHref}">Privacy Policy</a> and <a href="${smsHref}">SMS Terms</a>.`
  const errorText =
    locale === 'es'
      ? 'Confirme las preferencias de consentimiento SMS antes de enviar.'
      : locale === 'pt'
        ? 'Confirme as preferências de consentimento SMS antes de enviar.'
        : consentErrorText

  return `
    <div class="sms-consent-wrap">
      <label class="sms-consent" for="lead-sms-consent">
        <input type="checkbox" name="sms_consent" id="lead-sms-consent" />
        <span>${label}</span>
      </label>
      <p id="lead-sms-consent-error" class="field-error" role="alert" hidden>${errorText}</p>
    </div>
  `
}

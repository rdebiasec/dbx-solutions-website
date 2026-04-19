/**
 * Canonical SMS opt-in checkbox label (English) — must match Privacy Policy, SMS Terms, and policies.
 * Links inserted on "Privacy Policy" and "SMS Terms" only.
 */
export function smsConsentCheckboxHtml(privacyHref, smsHref, consentErrorText) {
  return `
    <div class="sms-consent-wrap">
      <label class="sms-consent" for="lead-sms-consent">
        <input type="checkbox" name="sms_consent" id="lead-sms-consent" />
        <span>By checking this box, you provide express written consent to receive SMS communications from DBX Solutions LLC related to appointments, services, and support. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out and HELP for help. See <a href="${privacyHref}">Privacy Policy</a> and <a href="${smsHref}">SMS Terms</a>.</span>
      </label>
      <p id="lead-sms-consent-error" class="field-error" role="alert" hidden>${consentErrorText}</p>
    </div>
  `
}

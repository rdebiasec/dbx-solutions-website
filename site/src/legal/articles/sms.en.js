import {
  COMPANY_LEGAL_NAME,
  getLegalEffectiveDate,
  href,
  legalContactBlockHtml
} from '../constants.js'

export default function smsEn() {
  const privacyHref = href('privacy-policy/')

  return `
    <h1>SMS Terms</h1>
    <p class="legal-effective"><strong>Effective Date: ${getLegalEffectiveDate('en')}</strong></p>
    <p>These SMS Terms describe how ${COMPANY_LEGAL_NAME}, a Florida limited liability company ("DBX Solutions," "we," "our," or "us"), communicates with individuals by <strong>automated text messages</strong> in connection with business inquiries, consultations, and services.</p>

    <h2>1. Program Description</h2>
    <p>If you provide your mobile number and opt in where required, you may receive SMS messages from DBX Solutions related to your interaction with our business.</p>
    <p>Messages may include:</p>
    <ul>
      <li>appointment reminders</li>
      <li>consultation or demo coordination</li>
      <li>support communications</li>
      <li>service-related updates</li>
    </ul>
    <p>We do not send unsolicited messages or use purchased, rented, or third-party contact lists.</p>

    <h2>2. Opt-In and Consent</h2>
    <p>By checking the SMS consent checkbox on our website (or otherwise providing your mobile number and affirming consent where required), you provide <strong>prior express written consent</strong> as defined under the U.S. Telephone Consumer Protection Act (TCPA) and the Florida Telemarketing Act (FTSA) to receive <strong>automated text messages</strong> from DBX Solutions at the number you provide.</p>
    <p>You provide consent to receive SMS messages by submitting your phone number through our website or other communication channels and, where applicable, selecting the opt-in checkbox. Electronic signatures and electronic consent under the U.S. E-SIGN Act satisfy the written consent requirement when you check the consent box.</p>
    <p>Consent is not a condition of purchase.</p>

    <h2>3. Message Frequency</h2>
    <p>Message frequency varies based on your interaction with us, your requests, and any active service engagement.</p>

    <h2>4. Message and Data Rates</h2>
    <p>Message and data rates may apply according to your wireless carrier plan. DBX Solutions is not responsible for these charges.</p>

    <h2>5. Opt-Out</h2>
    <p>You may opt out of SMS messages at any time by replying STOP to any message.</p>
    <p>After you opt out, you may receive a final confirmation message.</p>

    <h2>6. Help and Support</h2>
    <p>For assistance, reply HELP to any message or contact us directly:</p>
    ${legalContactBlockHtml()}

    <h2>7. Third-Party Providers and Carriers</h2>
    <p>SMS delivery is supported by third-party service providers and wireless carriers.</p>
    <p>Carriers are not liable for delayed or undelivered messages.</p>
    <p>DBX Solutions is not responsible for transmission delays or failures caused by carrier networks or third-party platforms.</p>

    <h2>8. Privacy</h2>
    <p>Information collected in connection with SMS communications is handled in accordance with our <a href="${privacyHref}">Privacy Policy</a>.</p>
    <p>We do not share mobile information with third parties or affiliates for their own marketing or promotional purposes.</p>

    <h2>9. Changes to These Terms</h2>
    <p>We may update these SMS Terms from time to time. When we do, we will revise the Effective Date above and post the updated version on this page.</p>
  `
}

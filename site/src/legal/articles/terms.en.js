import {
  COMPANY_LEGAL_NAME,
  getLegalEffectiveDate,
  href,
  legalContactBlockHtml
} from '../constants.js'

export default function termsEn() {
  const privacyHref = href('privacy-policy/')
  const smsTermsHref = href('sms-terms/')

  return `
    <h1>Terms of Service</h1>
    <p class="legal-effective"><strong>Effective Date: ${getLegalEffectiveDate('en')}</strong></p>
    <p>These Terms of Service ("Terms") govern your access to and use of the website of ${COMPANY_LEGAL_NAME}, a Florida limited liability company ("DBX Solutions," "we," "our," or "us") and related materials.</p>
    <p>By accessing or using this website, you agree to these Terms. If you do not agree, you should not use this website.</p>

    <h2>1. Website Purpose</h2>
    <p>This website is provided for general informational and business communication purposes. It describes DBX Solutions' services, approach, and ways to engage with us.</p>
    <p>Nothing on this website constitutes:</p>
    <ul>
      <li>a binding offer</li>
      <li>a guarantee of results</li>
      <li>legal, financial, or technical advice</li>
      <li>a formal client relationship</li>
    </ul>
    <p>All services are provided only under separate written agreements.</p>

    <h2>2. No Client Relationship</h2>
    <p>Submitting a form, sending an email, scheduling a call, or otherwise contacting DBX Solutions does not create a client, advisory, or contractual relationship.</p>
    <p>A formal relationship is established only through a signed agreement between DBX Solutions and a client.</p>

    <h2>3. Services and Results</h2>
    <p>DBX Solutions provides advisory, implementation, and support services related to customer experience, automation, and AI.</p>
    <p>Any examples, case studies, metrics, or testimonials presented on this website are for general informational purposes only.</p>
    <p>Actual results vary based on factors including:</p>
    <ul>
      <li>systems and tools in use</li>
      <li>data quality and availability</li>
      <li>internal processes</li>
      <li>team adoption and execution</li>
      <li>scope and timing of implementation</li>
    </ul>
    <p>No specific outcomes are guaranteed.</p>

    <h2>4. Accuracy of Information</h2>
    <p>We aim to keep information accurate and current, but we do not guarantee that all content is complete, current, or error-free.</p>
    <p>We may update, change, or remove content at any time without notice.</p>

    <h2>5. Acceptable Use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>use the website in violation of any law or regulation</li>
      <li>attempt unauthorized access to systems or data</li>
      <li>interfere with website functionality or security</li>
      <li>submit false or misleading information</li>
      <li>copy, scrape, or exploit content beyond normal business evaluation use</li>
    </ul>

    <h2>6. Intellectual Property</h2>
    <p>All website content, including text, design, structure, and materials, is owned by or licensed to DBX Solutions.</p>
    <p>You may use the website for internal evaluation or business consideration purposes only. No broader use or distribution is permitted without written consent.</p>

    <h2>7. Third-Party Services and Links</h2>
    <p>This website may reference or link to third-party tools, platforms, or websites.</p>
    <p>DBX Solutions does not control and is not responsible for:</p>
    <ul>
      <li>third-party content</li>
      <li>availability or performance</li>
      <li>privacy or security practices</li>
    </ul>
    <p>Use of third-party services is at your own risk.</p>

    <h2>8. Disclaimer of Warranties</h2>
    <p>This website is provided on an "as is" and "as available" basis.</p>
    <p>To the fullest extent permitted by law, DBX Solutions disclaims all warranties, including:</p>
    <ul>
      <li>accuracy or completeness</li>
      <li>availability or uptime</li>
      <li>fitness for a particular purpose</li>
      <li>non-infringement</li>
    </ul>

    <h2>9. Limitation of Liability</h2>
    <p>To the fullest extent permitted by law, DBX Solutions is not liable for any indirect, incidental, or consequential damages arising from or related to your use of this website.</p>
    <p>This includes, but is not limited to:</p>
    <ul>
      <li>loss of data</li>
      <li>loss of business or revenue</li>
      <li>service interruptions</li>
      <li>reliance on website content</li>
    </ul>

    <h2>10. Indemnification</h2>
    <p>You agree to indemnify and hold harmless DBX Solutions from any claims, damages, or expenses arising from:</p>
    <ul>
      <li>your misuse of the website</li>
      <li>your violation of these Terms</li>
      <li>your violation of applicable laws or third-party rights</li>
    </ul>

    <h2>11. Privacy and Communications</h2>
    <p>Your use of this website is also subject to our <a href="${privacyHref}">Privacy Policy</a> and <a href="${smsTermsHref}">SMS Terms</a>.</p>
    <p>If you provide your contact information, you agree that DBX Solutions may contact you regarding your inquiry, services, or related communications, subject to applicable consent requirements.</p>

    <h2>12. Changes to These Terms</h2>
    <p>We may update these Terms from time to time. When we do, we will revise the Effective Date above and post the updated version on this page.</p>

    <h2>13. Governing Law</h2>
    <p>These Terms are governed by the laws of the State of Florida and applicable United States laws, without regard to conflict-of-law principles.</p>
    <p>Any disputes shall be resolved in the appropriate courts located in Florida, unless otherwise agreed in writing.</p>

    <h2>14. Contact</h2>
    ${legalContactBlockHtml()}
  `
}

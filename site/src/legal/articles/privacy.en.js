import { COMPANY_LEGAL_NAME, getLegalEffectiveDate, href, legalContactBlockHtml } from '../constants.js'

export default function privacyEn() {
  return `
    <h1>Privacy Policy</h1>
    <p class="legal-effective"><strong>Effective Date: ${getLegalEffectiveDate('en')}</strong></p>
    <p>${COMPANY_LEGAL_NAME}, a Florida limited liability company ("DBX Solutions," "we," "our," or "us"), provides customer experience, automation, and AI-related advisory and implementation services for businesses. We respect your privacy and are committed to handling personal information responsibly.</p>
    <p>This Privacy Policy explains how we collect, use, disclose, and retain information when you visit our website, submit an inquiry, schedule a consultation, or otherwise interact with us.</p>

    <h2>1. Information We Collect</h2>
    <p>We may collect the following categories of information:</p>

    <h3>Information you provide directly</h3>
    <ul>
      <li>name</li>
      <li>email address</li>
      <li>phone number</li>
      <li>company name and related business details</li>
      <li>inquiry content and project-related information</li>
    </ul>

    <h3>Information collected automatically</h3>
    <p>When you visit our website, we may collect certain technical and usage data, such as:</p>
    <ul>
      <li>IP address</li>
      <li>browser type and version</li>
      <li>device type and operating system</li>
      <li>pages visited and time spent</li>
      <li>referring URLs and general interaction data</li>
    </ul>

    <h3>Communications data</h3>
    <p>We may retain records of communications when you contact us via email, phone, SMS, or our on-site messaging tools.</p>

    <h2>2. How We Use Information</h2>
    <p>We use information to:</p>
    <ul>
      <li>respond to inquiries and requests</li>
      <li>schedule consultations, demos, and follow-ups</li>
      <li>provide service-related communications</li>
      <li>improve our website, services, and operations</li>
      <li>maintain internal records and workflows</li>
      <li>protect our business and users</li>
      <li>comply with legal or regulatory obligations</li>
    </ul>
    <p>We may also use aggregated or de-identified data for internal analysis and improvement.</p>

    <h2>3. SMS Communications</h2>
    <p>If you provide your phone number and give appropriate consent where required, DBX Solutions may send SMS messages related to your interaction with our business.</p>
    <p>These messages may include:</p>
    <ul>
      <li>appointment reminders</li>
      <li>consultation or demo coordination</li>
      <li>support responses</li>
      <li>service-related updates</li>
    </ul>
    <p>Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase.</p>
    <p>You may opt out at any time by replying <strong>STOP</strong>. For assistance, reply <strong>HELP</strong> or contact us directly.</p>
    <p>No mobile information will be shared with third parties or affiliates for their own marketing or promotional purposes.</p>
    <p>Our website contact form delivers inquiries by email and does not store submissions on our servers. If you opt in to SMS through our checkbox, your consent preference is included in the message you send. We may retain evidence of SMS opt-in in our business communications where applicable, but we do not claim systematic consent-record retention for mailto-only form submissions.</p>

    <h2>4. Cookies and Analytics</h2>
    <p>We may use cookies and similar technologies to understand how visitors use our website and to improve performance and usability.</p>
    <p>You can control cookies through your browser settings. Disabling cookies may affect certain functionality.</p>

    <h2>5. How We Share Information</h2>
    <p>We do <strong>not sell personal information</strong>.</p>
    <p>We may share information with service providers that support our operations, including:</p>
    <ul>
      <li>hosting and infrastructure providers</li>
      <li>analytics tools</li>
      <li>communications and messaging platforms</li>
      <li>CRM and workflow systems</li>
    </ul>
    <p>These providers process information on our behalf as part of delivering services to us.</p>
    <p>We may also disclose information:</p>
    <ul>
      <li>when required by law or legal process</li>
      <li>to protect our rights, users, or business operations</li>
      <li>in connection with a merger, acquisition, or sale of assets</li>
    </ul>

    <h2>6. Subprocessors</h2>
    <p>We use trusted third-party subprocessors to operate our website and communications. Current categories include:</p>
    <ul>
      <li><strong>Intercom</strong> — customer messaging and support platform</li>
      <li><strong>Google Fonts</strong> — web font delivery when you load our site</li>
      <li>hosting, email, and infrastructure providers supporting site delivery</li>
    </ul>
    <p>These subprocessors process personal information only as needed to provide their services to us and are subject to contractual or policy obligations appropriate to their role.</p>

    <h2>7. International Data Transfers</h2>
    <p>DBX Solutions is based in the United States. Your information may be processed in the United States and in other countries where we or our service providers operate. Those countries may have data protection laws that differ from the laws where you live.</p>
    <p>Where required, we take reasonable steps designed to protect personal information transferred across borders, including contractual safeguards with service providers where appropriate.</p>

    <h2>8. Data Retention</h2>
    <p>We retain information only as long as reasonably necessary for:</p>
    <ul>
      <li>responding to inquiries</li>
      <li>maintaining business records</li>
      <li>supporting ongoing operations</li>
      <li>complying with legal obligations</li>
      <li>resolving disputes and enforcing agreements</li>
    </ul>
    <p>Retention periods may vary depending on the nature of the information.</p>

    <h2>9. Data Security</h2>
    <p>We use reasonable administrative and technical safeguards designed to protect information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

    <h2>10. Your Choices</h2>
    <p>You may contact us to:</p>
    <ul>
      <li>request access to or correction of your information</li>
      <li>request deletion of information, where applicable</li>
      <li>opt out of non-essential communications</li>
    </ul>
    <p>We will respond in accordance with applicable laws and operational requirements.</p>

    <h2>11. California Privacy Rights (CPRA)</h2>
    <p>If you are a California resident, you may have rights under the California Privacy Rights Act (CPRA), including the right to know categories of personal information collected, to request deletion or correction, and to opt out of certain sharing. We do not sell personal information and do not share personal information for cross-context behavioral advertising.</p>
    <p>To exercise applicable California rights, contact us using the details below. We will verify and respond as required by law.</p>

    <h2>12. Third-Party Services and Links</h2>
    <p>Our website may contain links to third-party websites or services. We are not responsible for their privacy practices or content. We encourage you to review their policies separately.</p>

    <h2>13. Changes to This Policy</h2>
    <p>We may update this Privacy Policy from time to time. When we do, we will revise the Effective Date above and post the updated version on this page.</p>

    <h2>14. Contact</h2>
    ${legalContactBlockHtml()}
  `
}

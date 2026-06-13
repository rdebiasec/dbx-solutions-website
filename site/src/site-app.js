import './style.css'
import { href, CONTACT_EMAIL } from './legal/constants.js'
import { smsConsentCheckboxHtml } from './sms-consent-copy.js'
import {
  bindLocaleToggle,
  getLocale,
  renderLangToggle,
  translateHtml,
  translateText
} from './i18n-runtime.js'

const CALENDAR_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ZsDyacDZ8oSqHZCMshx3wV8SzGw3MA9KL4hjcU3OIMLJ-3QFRfiV2OjLTn0nKqz526eI3zQk1?gv=true'

const nav = [
  { page: 'home', path: '', label: 'Home' },
  { page: 'solutionsPage', path: 'solutions/', label: 'Solutions' },
  { page: 'servicesPage', path: 'services/', label: 'Services' },
  { page: 'industriesPage', path: 'industries/', label: 'Industries' },
  { page: 'aboutPage', path: 'about/', label: 'About' },
  { page: 'contactPage', path: 'contact/', label: 'Contact' }
]

const legalLinks = [
  { path: 'privacy-policy/', label: 'Privacy Policy' },
  { path: 'terms-of-service/', label: 'Terms of Service' },
  { path: 'sms-terms/', label: 'SMS Terms' },
  { path: 'data-handling-notice/', label: 'Data Handling Notice' },
  { path: 'responsible-ai-policy/', label: 'Responsible AI Policy' },
  { path: 'security-roadmap/', label: 'Security Roadmap' }
]

const valuePoints = [
  {
    title: 'Verified Accuracy',
    body: 'Answers grounded in your specific business data for total precision.'
  },
  {
    title: 'Unified Channels',
    body: 'Connect everywhere: WhatsApp, SMS, Web, and Email in one place.'
  },
  {
    title: 'Integrated Workflows',
    body: 'Instant sync with your CRM, calendar, and team for zero-lag follow-up.'
  },
  {
    title: 'Smart Escalation',
    body: 'Seamless hand-offs to your team exactly when a human touch is needed.'
  }
]

const problems = [
  ['Slow responses', 'Customers move on when questions sit unanswered during busy hours or after closing.'],
  ['Repetitive questions', 'Your team spends time repeating answers that could be handled consistently.'],
  ['Missed leads', 'High-intent inquiries lose momentum when follow-up is delayed or incomplete.'],
  ['Disconnected tools', 'Conversation details often stay separate from the CRM, calendar, support desk, or team workflow.'],
  ['Limited team capacity', 'Growing demand creates more customer conversations than a lean team can manage manually.'],
  [
    'Customer frustration',
    'Slow or inconsistent replies erode trust—customers feel ignored even when your team is doing their best behind the scenes.'
  ]
]

const solutionStages = [
  {
    title: 'They message you',
    body: 'On WhatsApp, chat, and email—where they already are.'
  },
  {
    title: 'DBX answers first',
    body: 'Common questions handled with your business context, day or night.'
  },
  {
    title: 'Your tools stay current',
    body: 'CRM, calendar, and team alerts updated—no retyping.'
  },
  {
    title: 'Your team stays in control',
    body: 'People step in for judgment calls, follow-up, and closing.'
  }
]

const services = [
  {
    title: 'Agentic AI for Customers',
    icon: '01',
    core: true,
    badge: 'Priority focus',
    body: 'Agentic AI for WhatsApp, web chat, SMS, forms, and email—responds, qualifies, collects data, and routes follow-up to your team or CRM.',
    bestFor: 'Businesses that need dependable first-response coverage without adding complexity.',
    outcome: 'Clearer conversations and faster next steps, with handoff paths when people need to step in.',
    learnHref: 'services/'
  },
  {
    title: 'Lead Qualification Automation',
    icon: '02',
    core: true,
    badge: 'Priority focus',
    body: 'Structured intake flows that ask the right questions, capture buyer details, qualify fit, and route sales-ready leads with useful context.',
    bestFor: 'Teams receiving inquiries through WhatsApp, chat, forms, email, or booking requests.',
    outcome: 'More organized follow-up and cleaner information for sales conversations.',
    learnHref: 'solutions/'
  },
  {
    title: 'Customer Support Automation',
    icon: '03',
    body: 'Handle common questions, support intake, ticket routing, status updates, and escalation paths for routine customer needs.',
    bestFor: 'Support teams spending too much time on repeat requests and intake triage.',
    outcome: 'More consistent support coverage while the team focuses on higher-value issues.',
    learnHref: 'services/'
  },
  {
    title: 'CRM and Workflow Integration',
    icon: '04',
    body: 'Connect customer conversations with CRM records, calendars, support desks, internal notifications, and operational workflows.',
    bestFor: 'Businesses using multiple tools that do not communicate effectively.',
    outcome: 'Smoother handoffs, fewer manual updates, and better visibility into customer activity.',
    learnHref: 'solutions/'
  },
  {
    title: 'AI Strategy and Roadmapping',
    icon: '05',
    body: 'Review your customer journey, tools, team capacity, and operational goals to identify the best practical AI starting points.',
    bestFor: 'Businesses that want AI clarity before investing in implementation.',
    outcome: 'A focused roadmap tied to customer experience and operational value.',
    learnHref: 'contact/'
  },
  {
    title: 'Optimization and Continuous Improvement',
    icon: '06',
    core: true,
    badge: 'Managed partner',
    body: 'Review real conversations, improve responses, tune workflows, and expand useful improvements as your business changes.',
    bestFor: 'Businesses that want AI systems managed beyond launch.',
    outcome: 'Agentic AI stays accurate, useful, and aligned with customer behavior.',
    learnHref: '#managed-ai-operations'
  }
]

const benefits = [
  ['Faster response times', 'Give customers a useful answer or next step while intent is still high.'],
  ['Fewer missed opportunities', 'Capture and route inquiries before prospects lose interest or choose another provider.'],
  ['Reduced manual workload', 'Move repetitive questions, intake, and routing out of your team’s daily queue.'],
  ['More consistent customer communication', 'Keep answers clear, approved, and aligned across channels and team handoffs.'],
  ['Better operational visibility', 'Turn conversations into structured information your team can review and act on.'],
  ['Scalable support without immediate headcount growth', 'Handle more routine conversations while your team focuses on higher-value work.']
]

const managedOps = [
  ['Conversation quality review', 'Review real customer interactions to spot unclear answers, missed intent, and handoff improvements.'],
  ['Workflow monitoring', 'Track where workflows help, stall, or need adjustment as volume and customer behavior change.'],
  ['AI response improvement', 'Tune approved responses so agentic AI stays accurate, useful, and aligned with your business.'],
  ['Automation optimization', 'Refine intake steps, routing rules, and follow-up triggers based on what customers actually do.']
]

const processSteps = [
  {
    title: 'Discover',
    body: 'We review your customer journey, current tools, common customer interactions, team workflows, and business goals.',
    items: ['Identify customer experience gaps', 'Review repetitive tasks', 'Understand current systems', 'Define business priorities']
  },
  {
    title: 'Design',
    body: 'We map the right AI experience, conversation flows, automations, integrations, and success metrics.',
    items: ['Design customer interaction flows', 'Define automation logic', 'Plan handoffs to your team', 'Align with your brand voice']
  },
  {
    title: 'Implement',
    body: 'We build, configure, test, and launch the solution using your existing tools, workflows, and brand guidelines.',
    items: ['Configure agentic AI', 'Connect systems where needed', 'Test conversation quality', 'Prepare your team for launch']
  },
  {
    title: 'Optimize',
    body: 'We monitor performance, review user behavior, improve flows, and refine the solution as your business evolves.',
    items: ['Review performance data', 'Improve responses and flows', 'Adjust automation rules', 'Identify new opportunities']
  }
]

const industries = [
  {
    priority: true,
    title: 'Professional services',
    body: 'Automate intake, qualify inquiries, route prospects, and improve response times for consulting, legal, financial, and advisory teams.',
    example: 'Example: A firm captures project scope and timeline on WhatsApp, then routes qualified inquiries to the right advisor with full context.'
  },
  {
    priority: true,
    title: 'Healthcare and wellness clinics',
    body: 'Support appointment inquiries, FAQs, intake guidance, service information, and patient communication workflows.',
    example: 'Example: After-hours WhatsApp questions about hours, services, and booking get answered while urgent cases escalate to staff.'
  },
  {
    priority: true,
    title: 'Real estate teams',
    body: 'Qualify buyer and seller inquiries, answer common property questions, route leads, and support faster follow-up.',
    example: 'Example: A buyer asks about availability on WhatsApp; the agent collects budget and timeline before alerting the listing agent.'
  },
  {
    priority: true,
    title: 'Local service businesses',
    body: 'Automate quote requests, booking inquiries, service questions, and customer follow-ups for high-message-volume teams.',
    example: 'Example: Quote requests include service type, location, and photos so your team replies with accurate next steps, not repeat questions.'
  },
  {
    title: 'E-commerce',
    body: 'Support product questions, order-related inquiries, return guidance, and routine customer service requests.',
    example: 'Example: Order-status questions on WhatsApp pull structured details before a human steps in for exceptions.'
  },
  {
    title: 'Education and training',
    body: 'Answer program questions, qualify student or client interest, guide enrollment inquiries, and automate follow-up.',
    example: 'Example: Program FAQs and intake questions run on chat while enrollment-ready leads land in your CRM with notes.'
  },
  {
    title: 'Financial and advisory services',
    body: 'Improve inquiry handling, appointment requests, client intake, and customer communication with human oversight.',
    example: 'Example: General service questions are handled consistently; sensitive or compliance-related topics route to a human reviewer.'
  }
]

const trustPoints = [
  ['SMB-focused implementation', 'Solutions are designed for growing businesses that need practical value without enterprise-level complexity.'],
  ['Business-first design', 'We start with customer journeys, operational challenges, and business goals before recommending technology.'],
  ['Human-supervised AI', 'AI supports your team while escalation, review, and judgment remain available when needed.'],
  ['Integration-aware solutions', 'We consider how AI fits with your existing channels, workflows, CRM, and customer communication tools.'],
  ['Outcome-oriented delivery', 'Every solution connects to a business outcome such as better lead handling, support consistency, or reduced manual work.'],
  ['Continuous improvement', 'We help refine flows, responses, and automations as your business learns what works best.']
]

const proofHighlights = [
  ['Under 15 minutes', 'Typical first-response improvement on WhatsApp and chat after launch.'],
  ['Structured intake', 'Lead details captured before your team picks up the conversation.'],
  ['Human oversight', 'Escalation paths keep your team in control of important decisions.']
]

const faq = [
  ['What does DBX Solutions do?', 'DBX helps SMBs design, connect, monitor, and improve AI-assisted customer conversation systems around real business workflows.'],
  ['Can this work with WhatsApp?', 'Yes. WhatsApp can be part of the channel mix along with web chat, SMS, forms, and email, depending on your setup.'],
  ['Can humans take over conversations?', 'Yes. DBX designs escalation paths so your team can review, respond, or take over when a conversation needs human judgment.'],
  ['How long does implementation take?', 'Timing depends on scope, channels, and integrations. Many businesses start with one focused use case, then expand after launch.'],
  ['How are AI responses controlled?', 'Agentic AI is built around approved business information, clear rules, escalation paths, and ongoing quality review.'],
  ['Can DBX connect with our existing tools?', 'In many cases, yes. DBX can connect conversations with CRMs, calendars, support systems, forms, notifications, and workflow tools.'],
  ['Will AI replace our customer service team?', 'No. The goal is to support your team, reduce repetitive work, and keep people focused on higher-value customer needs.']
]

const pages = {
  home: {
    title: 'DBX Solutions | WhatsApp & AI Customer Experience for SMBs',
    description:
      'DBX Solutions helps growing businesses respond faster on WhatsApp, qualify leads, automate repetitive conversations, and connect customer interactions with the tools their teams already use.',
    hero: {
      eyebrow: 'WhatsApp & Customer Channels',
      headline:
        'Respond faster on WhatsApp and connect every conversation to your team—without hiring more staff.',
      body:
        'DBX implements and manages agentic AI for growing businesses—systems that respond, capture lead details, trigger follow-up in your CRM or team, and escalate when judgment matters. Not a traditional chatbot that only answers FAQs.',
      primary: 'Book a Free Consultation',
      secondary: 'See How It Works',
      secondaryHref: '#process'
    },
    blocks: [
      { type: 'proof' },
      { type: 'problem' },
      { type: 'solution' },
      { type: 'services' },
      { type: 'managedOps' },
      { type: 'process' },
      { type: 'industries' },
      { type: 'trust' },
      { type: 'faq' },
      {
        type: 'cta',
        final: true,
        title: 'Ready to improve WhatsApp response and lead follow-up?',
        body:
          'Book a free consultation. We will review your channels, identify the first workflow to improve, and outline three practical agentic AI opportunities for your business.',
        note: 'Serving businesses remotely across the U.S. and Latin America.',
        primary: 'Book a Free Consultation'
      }
    ]
  },
  solutionsPage: {
    title: 'DBX Solutions | WhatsApp & Customer Experience Solutions',
    description:
      'Practical solutions for WhatsApp response, lead qualification, support automation, workflow integration, and connected follow-up.',
    hero: {
      eyebrow: 'Solutions',
      headline: 'Practical solutions for WhatsApp, intake, and connected follow-up',
      body:
        'DBX helps growing businesses turn WhatsApp and other customer channels into faster responses, clearer lead intake, and workflows your team can act on—without adding headcount.',
      primary: 'Book a Free Consultation',
      secondary: 'View Services',
      secondaryHref: 'services/'
    },
    blocks: [
      { type: 'solutionsPage' },
      {
        type: 'cta',
        title: 'Not sure where AI fits first?',
        body: 'Start with one customer journey, one workflow, and one measurable business outcome.',
        note: 'We will help identify the practical opportunities before recommending technology.',
        secondary: 'View Services',
        secondaryHref: 'services/'
      }
    ]
  },
  servicesPage: {
    title: 'DBX Solutions | AI Services for Growing Businesses',
    description:
      'Services that help businesses move from AI interest to practical implementation around WhatsApp, customer experience, and workflow automation.',
    hero: {
      eyebrow: 'Services',
      headline: 'Services that make WhatsApp and customer AI practical',
      body:
        'From agentic AI on WhatsApp and chat to CRM integration and ongoing optimization—DBX implements services around how your team already works.',
      primary: 'Book a Free Consultation',
      secondary: 'Explore Solutions',
      secondaryHref: 'solutions/'
    },
    blocks: [
      { type: 'services', full: true },
      {
        type: 'cta',
        title: 'Not sure which service fits your business?',
        body: 'Book a consultation and we will help identify where AI can create the most practical value.',
        note: 'The first step is clarity, not complexity.',
        secondary: 'Explore Solutions',
        secondaryHref: 'solutions/'
      }
    ]
  },
  industriesPage: {
    title: 'DBX Solutions | AI Customer Experience by Industry',
    description:
      'Customer experience and WhatsApp automation for service businesses, clinics, real estate teams, local services, and more.',
    hero: {
      eyebrow: 'Industries',
      headline: 'Where WhatsApp and customer conversations drive revenue',
      body:
        'DBX helps growing businesses in service-heavy sectors respond faster on WhatsApp, qualify inquiries, and keep follow-up connected to the tools teams already use.',
      primary: 'Book a Free Consultation',
      secondary: 'View Services',
      secondaryHref: 'services/'
    },
    blocks: [
      { type: 'industries', full: true },
      {
        type: 'note',
        title: 'Responsible AI for regulated industries',
        body:
          'For healthcare, financial services, legal services, insurance, and other regulated industries, AI should support communication and workflow efficiency. It should not replace professional advice, compliance review, clinical judgment, legal judgment, or required human oversight.'
      },
      {
        type: 'cta',
        title: 'See how AI can support your customer journey.',
        body: 'Bring your current customer questions, channels, and workflow challenges. We will help map practical next steps.',
        note: 'Designed around your business, not a generic automation template.',
        secondary: 'View Services',
        secondaryHref: 'services/'
      }
    ]
  },
  aboutPage: {
    title: 'DBX Solutions | About',
    description:
      'DBX Solutions helps growing businesses turn AI into better customer experiences through practical, human-centered implementation.',
    hero: {
      eyebrow: 'About DBX Solutions',
      headline: 'Helping growing businesses turn AI into better customer experiences',
      body:
        'DBX Solutions was built to help small and mid-sized businesses adopt AI in a practical, human-centered, and business-focused way—with WhatsApp and customer channels at the center.',
      primary: 'Book a Free Consultation',
      secondary: 'Contact Us',
      secondaryHref: 'contact/'
    },
    blocks: [
      {
        type: 'textSplit',
        sections: [
          {
            title: 'Our mission',
            body:
              'Our mission is to make practical customer experience automation accessible for growing businesses. We help companies identify where agentic AI creates meaningful operational value, then design and implement solutions that fit their customer journey, tools, and team capacity.'
          },
          {
            title: 'Our approach',
            body:
              'We start with the business problem before choosing the technology. That means understanding customer interactions, internal workflows, current systems, and the outcomes that matter most. From there, we design systems that are clear, manageable, and built to improve over time.'
          }
        ]
      },
      {
        type: 'values',
        items: [
          ['Practical Over Complicated', 'We focus on AI use cases that solve real business problems.'],
          ['Human-Centered by Design', 'AI should support better customer and team experiences, not create confusion.'],
          ['Built Around Your Operations', 'Solutions should fit your workflows, tools, and customer journey.'],
          ['Outcome-Focused', 'Every implementation should connect to a measurable business goal.'],
          ['Designed to Evolve', 'AI systems improve through testing, feedback, and continuous optimization.']
        ]
      },
      {
        type: 'cta',
        title: 'Want to see how this applies to your business?',
        body: 'Book a free consultation to review your channels, workflows, and the first practical opportunity to improve.',
        note: 'No pressure—just a focused conversation about what would help your team most.',
        secondary: 'See How It Works',
        secondaryHref: '#process'
      }
    ]
  },
  dataHandlingPage: {
    title: 'DBX Solutions | Data Handling Notice',
    description:
      'How DBX Solutions approaches customer and business data in AI implementations, integrations, and ongoing operations.',
    hero: {
      eyebrow: 'Data handling',
      headline: 'Data Handling Notice',
      body:
        'DBX designs AI workflows around approved business information, controlled access, and clear limits on what systems process and store.',
      primary: 'Book a Free Consultation',
      secondary: 'Contact Us',
      secondaryHref: 'contact/'
    },
    blocks: [
      {
        type: 'note',
        title: 'Our approach',
        body:
          'DBX Solutions builds data handling practices around responsible use of customer information, business-specific knowledge sources, controlled access, and secure integration planning. Formal policy language may be updated as implementations and vendor requirements evolve.'
      },
      {
        type: 'policyList',
        title: 'What we prioritize',
        items: [
          'Using approved business content as the source for customer-facing answers',
          'Limiting access to systems and data required for each workflow',
          'Designing integrations so useful context reaches your CRM or team—not open-ended data exposure',
          'Documenting what is processed, stored, and retained per project scope',
          'Aligning with your privacy policy, SMS terms, and industry requirements where applicable'
        ]
      }
    ]
  },
  responsibleAiPage: {
    title: 'DBX Solutions | Responsible AI Policy',
    description:
      'How DBX Solutions applies human oversight, escalation paths, and approved business information in customer-facing AI.',
    hero: {
      eyebrow: 'Responsible AI',
      headline: 'Responsible AI Policy',
      body:
        'DBX implements agentic AI with clear escalation paths, approved business information, and human review—not unconstrained automation.',
      primary: 'Book a Free Consultation',
      secondary: 'Contact Us',
      secondaryHref: 'contact/'
    },
    blocks: [
      {
        type: 'policyList',
        title: 'Working principles',
        items: [
          'Accuracy and clarity over speed alone',
          'Human escalation for sensitive, uncertain, or high-stakes requests',
          'Clear limits on what AI can answer or act on',
          'Transparent use of approved business information',
          'Continuous improvement based on real customer interactions'
        ]
      },
      {
        type: 'note',
        title: 'Regulated industries',
        body:
          'For healthcare, financial services, legal, insurance, and other regulated contexts, AI supports communication and workflow efficiency. It does not replace professional advice, compliance review, clinical judgment, legal judgment, or required human oversight.'
      }
    ]
  },
  securityRoadmapPage: {
    title: 'DBX Solutions | Security Roadmap',
    description:
      'DBX Solutions security and compliance roadmap—presented as readiness work, not completed certifications unless formally obtained.',
    hero: {
      eyebrow: 'Security roadmap',
      headline: 'Security Roadmap',
      body:
        'DBX aligns operations with recognized security and responsible AI practices. Items below are roadmap or readiness work unless explicitly marked complete.',
      primary: 'Book a Free Consultation',
      secondary: 'Contact Us',
      secondaryHref: 'contact/'
    },
    blocks: [
      {
        type: 'roadmap',
        eyebrow: 'Roadmap / In progress',
        title: 'Security and compliance roadmap',
        body: 'These items reflect planned or in-progress alignment work—not claims of completed certification unless formally obtained.',
        items: [
          'SOC 2 Type I readiness',
          'SOC 2 Type II future readiness',
          'ISO/IEC 27001 alignment',
          'Data Processing Agreement readiness',
          'Privacy Policy and Terms of Service',
          'Internal data handling procedures',
          'Responsible AI usage policy',
          'Vendor security review process'
        ],
        disclaimer:
          'Certifications listed here are roadmap items only. DBX Solutions does not claim completed certification unless formally obtained and published.'
      }
    ]
  },
  contactPage: {
    title: 'DBX Solutions | Contact',
    description:
      'Book a consultation with DBX Solutions to review WhatsApp, lead intake, support automation, and practical AI opportunities for your business.',
    hero: {
      eyebrow: 'Contact',
      headline: 'Let’s review where WhatsApp and customer conversations are costing you time or leads',
      body:
        'Book on the calendar for the fastest response, or send a short request below. We will help identify the most practical first workflow to improve.',
      primary: 'Book a Free Consultation',
      secondary: 'Email Us',
      secondaryHref: `mailto:${CONTACT_EMAIL}`
    },
    blocks: [{ type: 'contact' }]
  }
}

function setMeta(page) {
  document.title = page.title
  const description = document.querySelector('meta[name="description"]')
  if (description) description.setAttribute('content', page.description)
}

function attrsForExternal(url) {
  return url.startsWith('http')
    ? ' target="_blank" rel="noopener noreferrer"'
    : ''
}

function route(path) {
  if (path === 'CALENDAR_URL') return CALENDAR_URL
  if (path?.startsWith('mailto:')) return path
  if (path?.startsWith('#')) {
    const base = href('')
    return `${base.endsWith('/') ? base.slice(0, -1) : base}${path}`
  }
  return href(path || '')
}

function renderActions(primaryLabel = 'Book a Free Consultation', secondaryLabel, secondaryHref) {
  const primary = route('CALENDAR_URL')
  return `
    <div class="actions">
      <a class="btn btn-primary" href="${primary}"${attrsForExternal(primary)}>${primaryLabel}</a>
      ${
        secondaryLabel
          ? `<a class="btn btn-secondary" href="${route(secondaryHref)}"${attrsForExternal(route(secondaryHref))}>${secondaryLabel}</a>`
          : ''
      }
    </div>
  `
}

function renderHeader(pageKey) {
  return `
    <header class="site-header">
      <a href="${href('')}" class="logo" aria-label="DBX Solutions home">
        <img src="${href('logo.png')}" alt="DBX Solutions" />
      </a>
      <nav id="primary-nav" aria-label="Primary navigation">
        ${nav
          .map(
            (item) =>
              `<a href="${href(item.path)}" ${item.page === pageKey ? 'aria-current="page"' : ''}>${item.label}</a>`
          )
          .join('')}
      </nav>
      <div class="header-actions">
        ${renderLangToggle(getLocale())}
        <a class="btn btn-primary header-book" href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">Book a Free Consultation</a>
      </div>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
        <span class="sr-only">Toggle navigation</span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
      </button>
    </header>
  `
}

function renderIosStatusBar() {
  return `
    <div class="ios-status-bar" aria-hidden="true">
      <span class="ios-status-time">9:41</span>
      <div class="ios-status-icons">
        <span class="ios-signal" aria-hidden="true"></span>
        <span class="ios-wifi" aria-hidden="true"></span>
        <span class="ios-battery" aria-hidden="true"><span class="ios-battery-level"></span></span>
      </div>
    </div>
  `
}

function renderHomeIndicator() {
  return `<div class="ios-home-indicator" aria-hidden="true"></div>`
}

function renderPhoneDevice(variant = 'booking') {
  const conversations = {
    status: [
      ['incoming', 'Can you check my order status?', '9:12 AM'],
      ['outgoing wide', 'Your order is packed and expected today between 2pm and 4pm.', '9:12 AM', '✓✓'],
      ['incoming compact', 'Can you notify my team too?', '9:13 AM'],
      ['outgoing', 'Done. I synced the update to your CRM and alerted your team.', '9:13 AM', '✓✓'],
      ['incoming compact', 'Perfect, thank you.', '9:14 AM'],
      ['outgoing compact', 'You are welcome. I will watch for delivery changes.', '9:14 AM', '✓✓']
    ]
  }

  const chatScreen = `
    <div class="whatsapp-preview">
      ${renderIosStatusBar()}
      <div class="whatsapp-header">
        <span class="wa-back" aria-hidden="true"></span>
        <div class="whatsapp-avatar" aria-hidden="true">
          <img src="${href('dbx-logo-avatar.png')}" alt="" />
        </div>
        <div class="whatsapp-header-copy">
          <strong>DBX Agent</strong>
          <span>online</span>
        </div>
        <div class="wa-toolbar" aria-hidden="true">
          <span class="wa-icon wa-icon-video"></span>
          <span class="wa-icon wa-icon-call"></span>
        </div>
      </div>

      <div class="whatsapp-chat" aria-label="Example WhatsApp customer conversation">
        <span class="whatsapp-day">Today</span>
        ${conversations.status
          .map(
            ([type, message, time, receipt]) => `
              <div class="whatsapp-bubble ${type}">
                <p>${message}</p>
                <time>${time}${receipt ? ` <span aria-hidden="true">${receipt}</span>` : ''}</time>
              </div>`
          )
          .join('')}
      </div>
      ${renderHomeIndicator()}
    </div>
  `

  const whatsappCallScreen = `
    <div class="phone-call-screen whatsapp-call-screen" aria-label="Example WhatsApp customer call screen">
      ${renderIosStatusBar()}
      <div class="whatsapp-call-notice" aria-hidden="true">
        <span class="whatsapp-call-lock"></span>
        <span>End-to-end encrypted</span>
      </div>
      <div class="whatsapp-call-identity">
        <div class="call-avatar whatsapp-call-avatar" aria-hidden="true">
          <img src="${href('dbx-logo-avatar.png')}" alt="" />
        </div>
        <strong>DBX Agent</strong>
        <span>00:38</span>
        <p>WhatsApp voice call</p>
      </div>
      <div class="call-controls whatsapp-call-controls" aria-hidden="true">
        <span class="call-control"><span class="control-icon icon-speaker"></span><small>speaker</small></span>
        <span class="call-control"><span class="control-icon icon-video"></span><small>video</small></span>
        <span class="call-control"><span class="control-icon icon-mic"></span><small>mute</small></span>
        <span class="call-control end"><span class="control-icon icon-phone-end"></span><small>end</small></span>
      </div>
      ${renderHomeIndicator()}
    </div>
  `

  const iphoneCallScreen = `
    <div class="phone-call-screen ios-call-screen" aria-label="Example iPhone customer call screen">
      ${renderIosStatusBar()}
      <div class="ios-call-identity">
        <div class="ios-call-avatar" aria-hidden="true">MG</div>
        <strong>Maria Gomez</strong>
        <p>mobile 00:51</p>
      </div>
      <div class="call-controls ios-call-controls" aria-hidden="true">
        <span class="call-control"><span class="control-icon icon-mic"></span><small>mute</small></span>
        <span class="call-control"><span class="control-icon icon-keypad"></span><small>keypad</small></span>
        <span class="call-control"><span class="control-icon icon-speaker"></span><small>speaker</small></span>
        <span class="call-control"><span class="control-icon icon-plus"></span><small>add</small></span>
        <span class="call-control"><span class="control-icon icon-video"></span><small>FaceTime</small></span>
        <span class="call-control"><span class="control-icon icon-contacts"></span><small>contacts</small></span>
        <span class="call-control end"><span class="control-icon icon-phone-end"></span></span>
      </div>
      ${renderHomeIndicator()}
    </div>
  `

  const screens = {
    status: chatScreen,
    booking: whatsappCallScreen,
    handoff: iphoneCallScreen
  }

  return `
    <div class="iphone-device iphone-device-${variant}">
      <span class="iphone-action-button" aria-hidden="true"></span>
      <span class="iphone-side-button iphone-side-button-left" aria-hidden="true"></span>
      <span class="iphone-side-button iphone-side-button-right" aria-hidden="true"></span>
      <div class="iphone-screen">
        <span class="iphone-island" aria-hidden="true"><span class="iphone-island-camera"></span></span>
        <div class="iphone-screen-glass" aria-hidden="true"></div>
        ${screens[variant] || chatScreen}
      </div>
    </div>
  `
}

function renderWorkflowVisual() {
  return `
    <aside class="workflow-visual" aria-label="Customer conversation and call previews">
      <div class="phone-stage">
        <div class="phone-stack">
          ${renderPhoneDevice('status')}
          ${renderPhoneDevice('booking')}
          ${renderPhoneDevice('handoff')}
        </div>
      </div>
    </aside>
  `
}

function renderValuePoints() {
  return `<ul class="value-points">${valuePoints
    .map(
      (item) => `<li>
        <strong>${item.title}</strong>
        <p>${item.body}</p>
      </li>`
    )
    .join('')}</ul>`
}

const pageSignals = {
  solutionsPage: 'WhatsApp, intake, and follow-up workflows.',
  servicesPage: 'Implementation tied to your channels and CRM.',
  industriesPage: 'Sector examples—not generic automation.',
  aboutPage: 'Practical AI with human oversight.',
  contactPage: 'Calendar for speed, form for a short note.',
  dataHandlingPage: 'Approved data sources and controlled access.',
  responsibleAiPage: 'Escalation paths and clear AI limits.',
  securityRoadmapPage: 'Roadmap items—not claimed certifications.'
}

function renderHero(page, pageKey) {
  if (page === pages.home) {
    return `
      <section class="hero home-hero" id="top">
        <div class="hero-copy">
          <span class="hero-eyebrow">${page.hero.eyebrow}</span>
          <h1>${page.hero.headline}</h1>
          <p>${page.hero.body}</p>
        </div>
        ${renderWorkflowVisual()}
        ${renderValuePoints()}
      </section>
    `
  }

  return `
    <section class="hero" id="top">
      <div class="hero-copy">
        <span class="eyebrow">${page.hero.eyebrow}</span>
        <h1>${page.hero.headline}</h1>
        <p>${page.hero.body}</p>
        ${page.hero.microcopy ? `<p class="hero-trust">${page.hero.microcopy}</p>` : ''}
        ${renderActions(page.hero.primary, page.hero.secondary, page.hero.secondaryHref)}
      </div>
      ${renderPageSignal(page.hero.eyebrow, pageKey)}
    </section>
  `
}

function renderPageSignal(label, pageKey) {
  const message = pageSignals[pageKey] || 'Practical AI mapped to your customer journey.'
  return `
    <aside class="page-signal" aria-label="${label} visual summary">
      <span>${label}</span>
      <strong>${message}</strong>
      <div class="signal-grid">
        <i></i><i></i><i></i><i></i>
      </div>
    </aside>
  `
}

function sectionHeading(eyebrow, title, body) {
  return `
    <div class="section-heading">
      <span class="eyebrow">${eyebrow}</span>
      <h2>${title}</h2>
      ${body ? `<p>${body}</p>` : ''}
    </div>
  `
}

function renderSimpleCards(items, className = 'card-grid') {
  return `<div class="${className}">${items
    .map(
      ([title, body], index) => `
        <article class="content-card">
          <span class="card-index">${String(index + 1).padStart(2, '0')}</span>
          <h3>${title}</h3>
          <p>${body}</p>
        </article>`
    )
    .join('')}</div>`
}

function renderChallengeVisual() {
  return `
    <div class="challenge-visual" aria-label="Fragmented customer follow-up flow">
      <div class="challenge-flow">
        <div class="challenge-flow-top">
          <div class="challenge-node challenge-node-start">
            <span class="challenge-node-dot" aria-hidden="true"></span>
            <span>Customer message</span>
          </div>
          <div class="challenge-connector challenge-connector-down" aria-hidden="true"></div>
          <div class="challenge-channels">WhatsApp · Chat · Email</div>
          <div class="challenge-connector challenge-connector-split" aria-hidden="true"></div>
        </div>
        <div class="challenge-tools">
          <div class="challenge-node challenge-node-tool">
            <span class="challenge-node-dot" aria-hidden="true"></span>
            <span>Team inbox</span>
          </div>
          <span class="challenge-break" aria-hidden="true">×</span>
          <div class="challenge-node challenge-node-tool">
            <span class="challenge-node-dot" aria-hidden="true"></span>
            <span>CRM</span>
          </div>
          <span class="challenge-break" aria-hidden="true">×</span>
          <div class="challenge-node challenge-node-tool">
            <span class="challenge-node-dot" aria-hidden="true"></span>
            <span>Calendar</span>
          </div>
          <span class="challenge-break" aria-hidden="true">×</span>
          <div class="challenge-node challenge-node-tool">
            <span class="challenge-node-dot" aria-hidden="true"></span>
            <span>Support desk</span>
          </div>
        </div>
        <div class="challenge-connector challenge-connector-down challenge-connector-muted" aria-hidden="true"></div>
        <div class="challenge-outcomes">
          <span class="challenge-outcome">Slow response</span>
          <span class="challenge-outcome">Lost context</span>
          <span class="challenge-outcome">Missed lead</span>
          <span class="challenge-outcome">Customer frustration</span>
        </div>
      </div>
    </div>
  `
}

function renderProblem() {
  return `
    <section id="challenge" class="challenge-section">
      ${sectionHeading(
        'The Challenge',
        'Customer demand grows faster than manual follow-up can keep up.',
        'For many SMBs, the issue is not effort. It is that conversations, customer details, and next steps are spread across busy people and disconnected tools.'
      )}
      <div class="challenge-panel">
        ${renderChallengeVisual()}
        <ul class="challenge-points">
          ${problems
            .map(
              ([title, body]) => `
                <li>
                  <strong>${title}</strong>
                  <span>${body}</span>
                </li>`
            )
            .join('')}
        </ul>
      </div>
    </section>
  `
}

function renderSolutionVisual() {
  return `
    <div class="solution-visual" aria-label="Connected customer-to-team workflow">
      <div class="solution-flow">
        <div class="solution-flow-top">
          <div class="solution-node solution-node-start">
            <span class="solution-node-dot" aria-hidden="true"></span>
            <span>Customer message</span>
          </div>
          <div class="solution-connector solution-connector-down" aria-hidden="true"></div>
          <div class="solution-channels">WhatsApp · Chat · Email</div>
          <div class="solution-connector solution-connector-down" aria-hidden="true"></div>
        </div>
        <div class="solution-node solution-node-hub">
          <span class="solution-node-dot" aria-hidden="true"></span>
          <span>DBX handles intake</span>
        </div>
        <div class="solution-connector solution-connector-down" aria-hidden="true"></div>
        <div class="solution-tools">
          <div class="solution-node solution-node-tool">
            <span class="solution-node-dot" aria-hidden="true"></span>
            <span>CRM</span>
          </div>
          <span class="solution-link" aria-hidden="true">✓</span>
          <div class="solution-node solution-node-tool">
            <span class="solution-node-dot" aria-hidden="true"></span>
            <span>Calendar</span>
          </div>
          <span class="solution-link" aria-hidden="true">✓</span>
          <div class="solution-node solution-node-tool">
            <span class="solution-node-dot" aria-hidden="true"></span>
            <span>Team alerts</span>
          </div>
        </div>
        <div class="solution-connector solution-connector-down solution-connector-accent" aria-hidden="true"></div>
        <div class="solution-node solution-node-human">
          <span class="solution-node-dot" aria-hidden="true"></span>
          <span>Your team in the loop</span>
        </div>
        <div class="solution-outcomes">
          <span class="solution-outcome">Faster reply</span>
          <span class="solution-outcome">Clear handoff</span>
          <span class="solution-outcome">No duplicate work</span>
        </div>
      </div>
    </div>
  `
}

function renderSolution() {
  return `
    <section id="solutions" class="section">
      ${sectionHeading(
        'The Solution',
        'Customer messages turn into team action—without the manual chaos.',
        'DBX connects how customers reach you with what your team needs to do next.'
      )}
      <div class="solution-panel">
        ${renderSolutionVisual()}
        <ul class="solution-stages">
          ${solutionStages
            .map(
              (stage) => `
                <li>
                  <strong>${stage.title}</strong>
                  <span>${stage.body}</span>
                </li>`
            )
            .join('')}
        </ul>
        <p class="solution-footnote">Human-supervised. Your tools. Your rules.</p>
      </div>
    </section>
  `
}

function renderServices(full = false) {
  return `
    <section id="services">
      ${sectionHeading(
        'Services',
        'AI solutions designed around your customer journey',
        'Each service starts with a clear operational need, then turns it into a customer-facing workflow your team can manage.'
      )}
      <div class="services-grid">
        ${services
          .map(
            (service, index) => `
              <article class="service-card ${service.core ? 'service-card-core' : ''}">
                <span class="service-icon" aria-hidden="true">${service.icon || String(index + 1).padStart(2, '0')}</span>
                ${service.badge ? `<span class="service-badge">${service.badge}</span>` : ''}
                <h3>${service.title}</h3>
                <p>${service.body}</p>
                <div class="service-meta">
                  <div><strong>Best for</strong><span>${service.bestFor}</span></div>
                  <div><strong>Business outcome</strong><span>${service.outcome}</span></div>
                </div>
                ${service.learnHref ? `<a class="learn-link" href="${route(service.learnHref)}">Explore service</a>` : ''}
              </article>`
          )
          .join('')}
      </div>
      ${full ? '' : ''}
    </section>
  `
}

function renderManagedOps() {
  return `
    <section id="managed-ai-operations" class="managed-section">
      ${sectionHeading(
        'Managed AI Operations',
        'Keep AI useful as your business changes.',
        'AI systems require ongoing review, tuning, monitoring, and refinement. DBX helps keep agentic AI accurate, useful, and aligned with evolving workflows and customer needs.'
      )}
      ${renderSimpleCards(managedOps, 'managed-grid')}
    </section>
  `
}

function renderBenefits() {
  return `
    <section id="benefits">
      ${sectionHeading(
        'Business Impact',
        'Operational improvements your team and customers can feel.',
        'DBX focuses on business outcomes that make customer communication clearer, follow-up easier, and support more scalable.'
      )}
      ${renderSimpleCards(benefits, 'benefit-grid')}
    </section>
  `
}

function renderProcess() {
  return `
    <section id="process" class="process-section">
      ${sectionHeading(
        'Our Process',
        'A simple path from AI idea to business impact',
        'DBX guides each project through a clear, low-risk process that starts with your customer journey and ends with ongoing operational improvement.'
      )}
      <div class="process-track">
        ${processSteps
          .map(
            (step, index) => `
              <article class="step-card">
                <span>${String(index + 1).padStart(2, '0')}</span>
                <h3>${step.title}</h3>
                <p>${step.body}</p>
                <ul>${step.items.map((item) => `<li>${item}</li>`).join('')}</ul>
              </article>`
          )
          .join('')}
      </div>
    </section>
  `
}

function renderIndustries(full = false) {
  const priorityIndustries = industries.filter((industry) => industry.priority)
  const additionalIndustries = industries.filter((industry) => !industry.priority)
  const industryCards = (items) =>
    items
      .map(
        (industry, index) => `
          <article class="content-card ${industry.priority ? 'priority-card' : ''}">
            <span class="card-index">${String(index + 1).padStart(2, '0')}</span>
            <h3>${industry.title}</h3>
            <p>${industry.body}</p>
            ${industry.example ? `<p class="industry-example">${industry.example}</p>` : ''}
          </article>`
      )
      .join('')

  return `
    <section id="industries">
      ${sectionHeading(
        'Industries',
        'Focused on SMB sectors where conversations drive revenue and service quality.',
        'DBX is especially useful for businesses that depend on fast inquiry handling, clear intake, reliable follow-up, and repeatable customer support.'
      )}
      <div class="industry-group">
        <h3>High-priority SMB sectors</h3>
        <div class="industry-grid priority-grid">${industryCards(priorityIndustries)}</div>
      </div>
      <div class="industry-group additional-group">
        <h3>Additional sectors</h3>
        <div class="industry-grid additional-grid">${industryCards(additionalIndustries)}</div>
      </div>
      ${full ? '' : ''}
    </section>
  `
}

function renderTrust() {
  return `
    <section id="trust" class="trust-section">
      ${sectionHeading(
        'Why DBX Solutions',
        'A practical partner for customer experience systems.',
        'We do not just launch agentic AI. We design, connect, monitor, and improve customer experience systems around your real business operations.'
      )}
      ${renderSimpleCards(trustPoints, 'trust-grid')}
    </section>
  `
}

function renderFaq() {
  return `
    <section id="faq" class="faq-section">
      ${sectionHeading('FAQ', 'Questions businesses ask before adopting AI')}
      <div class="faq-list">
        ${faq
          .map(
            ([question, answer]) => `
              <details>
                <summary>${question}</summary>
                <p>${answer}</p>
              </details>`
          )
          .join('')}
      </div>
    </section>
  `
}

function renderProof() {
  return `
    <section id="proof" class="proof-section">
      ${sectionHeading(
        'Results',
        'Practical improvements businesses can measure',
        'DBX focuses on measurable outcomes—response speed, cleaner intake, and follow-up your team can use.'
      )}
      <div class="proof-panel">
        <ul class="proof-outcomes" aria-label="Typical outcomes after launch">
          ${proofHighlights
            .map(
              ([title, body]) => `
                <li>
                  <strong>${title}</strong>
                  <span>${body}</span>
                </li>`
            )
            .join('')}
        </ul>
      </div>
    </section>
  `
}

function renderCta(block) {
  const primary = block.primary || 'Book a Free Consultation'
  const secondary = block.secondary || 'Explore Solutions'
  const secondaryHref = block.secondaryHref || 'solutions/'
  return `
    <section class="cta-panel ${block.final ? 'final-cta' : ''}">
      <span class="eyebrow">${block.final ? 'Next Step' : 'Start Practical'}</span>
      <h2>${block.title}</h2>
      <p>${block.body}</p>
      ${block.final ? renderActions(primary) : renderActions(primary, secondary, secondaryHref)}
      <p class="cta-note">${block.note}</p>
    </section>
  `
}

function renderPolicyList(block) {
  return `
    <section class="policy-list-section">
      <h2>${block.title}</h2>
      <ul class="policy-list">
        ${block.items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </section>
  `
}

function renderRoadmap(block) {
  return `
    <section class="roadmap-section">
      ${sectionHeading(block.eyebrow, block.title, block.body)}
      <ul class="policy-list roadmap-list">
        ${block.items.map((item) => `<li>${item}</li>`).join('')}
      </ul>
      <p class="section-note">${block.disclaimer}</p>
    </section>
  `
}

function renderSolutionsPage() {
  return `
    <section id="solution-categories">
      ${sectionHeading(
        'Solution Categories',
        'Five ways DBX Solutions turns customer communication into smoother operations',
        'Each solution starts with a real business workflow, then applies AI where it improves speed, consistency, visibility, or follow-up.'
      )}
      ${renderSimpleCards([
        ['Agentic AI for Customers', 'Agentic AI across WhatsApp, web chat, SMS, and email for service inquiries, intake, appointments, and follow-up.'],
        ['Lead Qualification Automation', 'Ask qualifying questions, categorize inquiries, route leads to the right person, trigger follow-up workflows, and connect with CRM records.'],
        ['Customer Support Automation', 'Support intake, common issue guidance, ticket routing, knowledge base assistance, and escalation to human support.'],
        ['Workflow and CRM Integration', 'CRM updates, internal notifications, task creation, lead routing, booking workflows, and support handoffs.'],
        ['AI Strategy and Implementation', 'AI opportunity assessment, customer journey mapping, automation planning, tool selection support, and an implementation roadmap.']
      ])}
    </section>
  `
}

function renderTextSplit(block) {
  return `
    <section class="text-split">
      ${block.sections.map((item) => `<article><h2>${item.title}</h2><p>${item.body}</p></article>`).join('')}
    </section>
  `
}

function renderValues(block) {
  return `
    <section id="values">
      ${sectionHeading('Values', 'How we approach practical AI adoption')}
      ${renderSimpleCards(block.items, 'value-grid')}
    </section>
  `
}

function renderNote(block) {
  return `
    <section class="note-panel">
      <h2>${block.title}</h2>
      <p>${block.body}</p>
    </section>
  `
}

function renderContact() {
  const fields = [
    ['name', 'Name', 'text', 'Your name'],
    ['email', 'Business email', 'email', 'name@company.com'],
    ['phone', 'Phone or WhatsApp', 'tel', '+1 (555) 000-0000']
  ]
  const options = [
    'Customer response times',
    'Lead qualification',
    'Customer support automation',
    'Workflow integration',
    'AI strategy',
    'Not sure yet'
  ]
  return `
    <section id="contact" class="contact-layout">
      <div>
        ${sectionHeading(
          'Request Consultation',
          'Book a consultation or send a quick request.',
          'Prefer the fastest path? Use the calendar. Only need a short note? The form takes under a minute.'
        )}
        <div class="contact-options">
          <a href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">Book directly on the calendar</a>
          <a href="mailto:${CONTACT_EMAIL}">Email ${CONTACT_EMAIL}</a>
        </div>
      </div>
      <form class="lead-form">
        ${fields
          .map(
            ([name, label, type, placeholder]) => `
              <label for="${name}">${label}
                <input id="${name}" name="${name}" type="${type}" placeholder="${placeholder}" ${name === 'email' ? 'required' : ''} />
              </label>`
          )
          .join('')}
        <label for="goal">What are you looking to improve?
          <select id="goal" name="goal" required>
            <option value="">Select one</option>
            ${options.map((option) => `<option>${option}</option>`).join('')}
          </select>
        </label>
        <label class="full-field" for="message">Message <span class="field-optional">(optional)</span>
          <textarea id="message" name="message" rows="4" placeholder="Share your main channel, common questions, or follow-up challenge."></textarea>
        </label>
        ${smsConsentCheckboxHtml(href('privacy-policy/'), href('sms-terms/'), 'Please confirm SMS consent preferences before submitting.', getLocale())}
        <button class="btn btn-primary" type="submit">Request Consultation</button>
        <p class="form-confirmation" hidden>Thank you. Your request has been captured for follow-up.</p>
      </form>
    </section>
  `
}

function renderBlock(block) {
  if (block.type === 'proof') return renderProof()
  if (block.type === 'problem') return renderProblem()
  if (block.type === 'solution') return renderSolution()
  if (block.type === 'services') return renderServices(block.full)
  if (block.type === 'managedOps') return renderManagedOps()
  if (block.type === 'benefits') return renderBenefits()
  if (block.type === 'process') return renderProcess()
  if (block.type === 'industries') return renderIndustries(block.full)
  if (block.type === 'trust') return renderTrust()
  if (block.type === 'faq') return renderFaq()
  if (block.type === 'cta') return renderCta(block)
  if (block.type === 'solutionsPage') return renderSolutionsPage()
  if (block.type === 'textSplit') return renderTextSplit(block)
  if (block.type === 'values') return renderValues(block)
  if (block.type === 'note') return renderNote(block)
  if (block.type === 'contact') return renderContact()
  if (block.type === 'policyList') return renderPolicyList(block)
  if (block.type === 'roadmap') return renderRoadmap(block)
  return ''
}

function renderFooter() {
  return `
    <footer>
      <div>
        <a href="${href('')}" class="footer-logo"><img src="${href('logo.png')}" alt="DBX Solutions" /></a>
        <p>DBX Solutions helps growing businesses turn WhatsApp and customer conversations into faster responses, qualified leads, and connected follow-up workflows.</p>
        <strong>Practical AI for customer experience and operations.</strong>
      </div>
      <nav aria-label="Footer navigation">
        ${nav.map((item) => `<a href="${href(item.path)}">${item.label}</a>`).join('')}
        <span class="footer-heading">Legal</span>
        ${legalLinks.map((item) => `<a href="${href(item.path)}">${item.label}</a>`).join('')}
      </nav>
      <div class="footer-cta">
        <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
        <a href="https://www.linkedin.com/in/ricardo-de-biase" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span>Serving SMBs remotely across the U.S. and Latin America.</span>
      </div>
    </footer>
  `
}

function bindInteractions(app, pageKey) {
  const navToggle = document.querySelector('.nav-toggle')
  navToggle?.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open')
    navToggle.setAttribute('aria-expanded', String(isOpen))
  })

  document.querySelectorAll('#primary-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open')
      navToggle?.setAttribute('aria-expanded', 'false')
    })
  })

  bindLocaleToggle(pageKey, mountPage)

  app.querySelector('.lead-form')?.addEventListener('submit', (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const phone = String(data.get('phone') || '').trim()
    const consent = form.querySelector('#lead-sms-consent')
    const consentError = form.querySelector('#lead-sms-consent-error')

    if (phone && consent && !consent.checked) {
      if (consentError) consentError.hidden = false
      consent?.focus()
      return
    }

    if (consentError) consentError.hidden = true

    const subject = encodeURIComponent(`Consultation request: ${data.get('goal') || 'General'}`)
    const body = encodeURIComponent(
      [
        `Name: ${data.get('name') || ''}`,
        `Email: ${data.get('email') || ''}`,
        `Phone/WhatsApp: ${phone || 'Not provided'}`,
        `Goal: ${data.get('goal') || ''}`,
        '',
        String(data.get('message') || '')
      ].join('\n')
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    const confirmation = form.querySelector('.form-confirmation')
    if (confirmation) confirmation.hidden = false
  })
}

export function mountPage(pageKey) {
  const app = document.querySelector('#app')
  const page = pages[pageKey]
  if (!app || !page) return
  const locale = getLocale()

  document.documentElement.lang = locale
  setMeta(page)
  document.title = translateText(document.title, locale)
  const description = document.querySelector('meta[name="description"]')
  if (description) description.setAttribute('content', translateText(description.getAttribute('content'), locale))
  const html = `
    <div class="wrapper ${pageKey === 'home' ? 'home-wrapper' : ''}">
      ${renderHeader(pageKey)}
      <main>
        ${renderHero(page, pageKey)}
        ${page.blocks.map(renderBlock).join('')}
      </main>
      ${renderFooter()}
      <a class="mobile-sticky-cta" href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">Book a Free Consultation</a>
    </div>
  `
  app.innerHTML = translateHtml(html, locale)
  bindInteractions(app, pageKey)
}

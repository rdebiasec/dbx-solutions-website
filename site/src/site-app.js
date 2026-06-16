import './style.css'
import { href, CONTACT_EMAIL } from './legal/constants.js'
import { smsConsentCheckboxHtml } from './sms-consent-copy.js'
import {
  bindLocaleToggle,
  getHtmlLang,
  getLocale,
  renderLangToggle,
  translateHtml,
  translateText,
  updateHreflang
} from './i18n-runtime.js'
import { initIntercom } from './intercom.js'

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
    title: 'Answers from your real info',
    body: 'Replies use your prices, hours, and services—not generic guesses.'
  },
  {
    title: 'WhatsApp, chat, and email together',
    body: 'Meet customers on the channels they already use.'
  },
  {
    title: 'Your CRM stays updated',
    body: 'What they said shows up in your tools without retyping.'
  },
  {
    title: 'Your team steps in when it matters',
    body: 'People take over for judgment calls and closing.'
  }
]

const problems = [
  ['Slow responses', 'Customers move on when questions sit unanswered during busy hours or after closing.'],
  ['Repetitive questions', 'Your team spends time repeating answers that could be handled consistently.'],
  ['Missed leads', 'High-intent inquiries lose momentum when follow-up is delayed or incomplete.'],
  ['Disconnected tools', 'Conversation details often stay separate from the CRM, calendar, support queue, or your team\'s daily work.'],
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
    title: 'Reply on WhatsApp and chat',
    icon: '01',
    core: true,
    badge: 'Start here',
    body: 'Answer common questions fast, even after hours. Your team takes over when a person needs to decide.',
    goodIf: 'Customers write you and answers take too long.',
    outcome: 'Fewer missed messages. Clearer next steps.',
    learnHref: 'services/'
  },
  {
    title: 'Sort leads before your team follows up',
    icon: '02',
    core: true,
    badge: 'Start here',
    body: 'Ask the right questions first so your team calls back with context—not from scratch.',
    goodIf: 'You get inquiries but follow-up feels messy.',
    outcome: 'Better leads, less back-and-forth.',
    learnHref: 'solutions/'
  },
  {
    title: 'Handle repeat questions without burning out your team',
    icon: '03',
    body: 'Common support questions get a consistent answer. Tricky cases go to a person.',
    goodIf: 'Your team answers the same things all day.',
    outcome: 'More time for real problems.'
  },
  {
    title: 'Update your CRM without retyping everything',
    icon: '04',
    body: 'What the customer said shows up in your CRM, calendar, or team alerts—automatically.',
    goodIf: 'Info lives in chats and never makes it to your tools.',
    outcome: 'Less duplicate work. Everyone sees the same picture.'
  },
  {
    title: 'Know where to start with AI',
    icon: '05',
    body: 'We look at how customers reach you today and pick practical first steps—no big vague project.',
    goodIf: 'You want AI help but do not know what to do first.',
    outcome: 'A clear plan you can act on.'
  },
  {
    title: 'We keep improving it with you',
    icon: '06',
    core: true,
    badge: 'We run it with you',
    body: 'After launch, we review real conversations and adjust so it stays useful as your business changes.',
    goodIf: 'You do not want a one-time setup that goes stale.',
    outcome: 'Answers stay useful. Processes stay up to date.',
    learnHref: '#managed-ai-operations'
  }
]

const benefits = [
  ['Faster response times', 'Give customers a useful answer or next step while intent is still high.'],
  ['Fewer missed opportunities', 'Capture and route inquiries before prospects lose interest or choose another provider.'],
  ['Reduced manual workload', 'Move repetitive questions and routing out of your team\'s daily queue.'],
  ['More consistent customer communication', 'Keep answers clear, approved, and aligned across channels and team handoffs.'],
  ['Better operational visibility', 'Turn conversations into structured information your team can review and act on.'],
  ['More conversations without hiring first', 'Handle more routine messages while your team focuses on higher-value work.']
]

const managedOpsLoop = ['Launch', 'Review chats', 'Adjust', 'Improve']

const managedOpsStages = [
  {
    num: '01',
    title: 'Review real chats',
    body: 'Catch confusing replies or bad handoffs before they cost you sales.'
  },
  {
    num: '02',
    title: 'See what is working',
    body: 'Spot repeat questions and where your team still loses time.'
  },
  {
    num: '03',
    title: 'Update your answers',
    body: 'Refresh prices, hours, services, and tone when your business changes.'
  },
  {
    num: '04',
    title: 'Improve follow-up',
    body: 'Fix routes so no lead sits waiting without a next step.'
  }
]

const processSteps = [
  {
    title: 'Discover',
    body: 'We review how customers reach you, the tools you use, repeat questions, and what outcomes matter most.',
    items: ['Map where replies slow down', 'Review repetitive tasks', 'Understand current systems', 'Pick business priorities']
  },
  {
    title: 'Design',
    body: 'We map replies, handoffs, and connections to your CRM or team—aligned with how you already work.',
    items: ['Design conversation flows', 'Set up handoff rules', 'Plan team alerts', 'Align with your brand voice']
  },
  {
    title: 'Implement',
    body: 'We build, test, and launch on your channels using your existing tools and guidelines.',
    items: ['Set up WhatsApp and chat replies', 'Connect systems where needed', 'Test conversation quality', 'Prepare your team for launch']
  },
  {
    title: 'Optimize',
    body: 'We review real conversations, improve answers, and refine follow-up as your business changes.',
    items: ['Review real chats', 'Improve responses and routes', 'Adjust handoff rules', 'Spot new opportunities']
  }
]

const industries = [
  {
    priority: true,
    title: 'Professional services',
    body: 'Capture project scope on WhatsApp, qualify inquiries faster, and hand off to the right advisor with context.',
    example: 'Example: A firm collects scope and timeline on WhatsApp, then routes qualified inquiries to the right advisor with full context.'
  },
  {
    priority: true,
    title: 'Healthcare and wellness clinics',
    body: 'Answer after-hours questions about hours and services, guide booking inquiries, and escalate urgent cases to staff.',
    example: 'Example: After-hours WhatsApp questions about hours, services, and booking get answered while urgent cases escalate to staff.'
  },
  {
    priority: true,
    title: 'Real estate teams',
    body: 'Qualify buyers and sellers on WhatsApp, answer property FAQs, and alert the listing advisor with budget and timing.',
    example: 'Example: A buyer asks about availability on WhatsApp; details are collected before the listing advisor is alerted.'
  },
  {
    priority: true,
    title: 'Local service businesses',
    body: 'Collect quote details—service type, location, photos—so your team replies with accurate next steps, not repeat questions.',
    example: 'Example: Quote requests include service type, location, and photos so your team replies with accurate next steps, not repeat questions.'
  },
  {
    title: 'E-commerce',
    body: 'Handle product and order questions on WhatsApp and bring structured details before a person handles exceptions.',
    example: 'Example: Order-status questions on WhatsApp pull structured details before a human steps in for exceptions.'
  },
  {
    title: 'Education and training',
    body: 'Answer program FAQs, qualify interest, and land enrollment-ready leads in your CRM with notes.',
    example: 'Example: Program FAQs run on chat while enrollment-ready leads land in your CRM with notes.'
  },
  {
    title: 'Financial and advisory services',
    body: 'Handle general service questions consistently; route sensitive or compliance topics to a human reviewer.',
    example: 'Example: General service questions are handled consistently; sensitive or compliance-related topics route to a human reviewer.'
  }
]

const trustPoints = [
  ['Built for growing businesses', 'Practical help without enterprise-level complexity or long consulting projects.'],
  ['Business first', 'We start with how customers reach you and what your team needs—not with a technology pitch.'],
  ['Human-supervised AI', 'AI supports your team while escalation, review, and judgment stay available when needed.'],
  ['Fits your existing tools', 'We connect WhatsApp, chat, CRM, and alerts to how you already work.'],
  ['Tied to real outcomes', 'Every project links to faster replies, cleaner follow-up, or less repeat work.'],
  ['Improves after launch', 'We review real conversations and adjust answers and routes over time.']
]

const proofHighlights = [
  ['Under 15 minutes', 'Typical first-response improvement on WhatsApp and chat after launch.'],
  ['Clear capture upfront', 'Lead details collected before your team picks up the conversation.'],
  ['Human oversight', 'Escalation paths keep your team in control of important decisions.']
]

const faq = [
  ['What does DBX Solutions do?', 'DBX helps growing businesses reply faster on WhatsApp, qualify leads, reduce repeat questions, and connect conversations to the tools your team already uses.'],
  ['Can this work with WhatsApp?', 'Yes. WhatsApp can be part of the mix along with web chat, SMS, forms, and email, depending on your setup.'],
  ['Can humans take over conversations?', 'Yes. DBX designs escalation paths so your team can review, respond, or take over when judgment matters.'],
  ['How long does implementation take?', 'Timing depends on scope and integrations. Many businesses start with one focused use case, then expand after launch.'],
  ['How are AI responses controlled?', 'Replies are built from approved business information, clear rules, escalation paths, and ongoing review of real chats.'],
  ['Can DBX connect with our existing tools?', 'In many cases, yes. DBX can connect conversations with CRMs, calendars, support tools, forms, and team alerts.'],
  ['Will AI replace our customer service team?', 'No. The goal is to support your team, reduce repetitive work, and keep people focused on higher-value customer needs.']
]

const pages = {
  home: {
    title: 'DBX Solutions | WhatsApp & AI Customer Experience for SMBs',
    description:
      'DBX Solutions helps growing businesses respond faster on WhatsApp, qualify leads, automate repetitive conversations, and connect customer interactions with the tools their teams already use.',
    hero: {
      headline:
        'Respond faster on WhatsApp and connect every conversation to your team—without hiring more staff.',
      body:
        'DBX replies on WhatsApp, captures lead details, updates your CRM or team, and brings people in when judgment matters—not a FAQ-only chatbot.',
      primary: 'Book a Consultation',
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
          'Book a consultation. We will review your channels, identify the first improvement to make, and outline three practical next steps for your business.',
        note: 'Serving businesses remotely across the U.S. and Latin America.',
        primary: 'Book a Consultation'
      }
    ]
  },
  solutionsPage: {
    title: 'DBX Solutions | WhatsApp & Customer Experience Solutions',
    description:
      'Practical help for WhatsApp replies, lead qualification, repeat questions, and connected follow-up for growing businesses.',
    hero: {
      eyebrow: 'Solutions',
      headline: 'Practical help for WhatsApp, lead capture, and follow-up',
      body:
        'DBX helps growing businesses turn WhatsApp and other channels into faster replies, clearer lead capture, and next steps your team can act on—without hiring more staff.',
      primary: 'Book a Consultation',
      secondary: 'View Services',
      secondaryHref: 'services/'
    },
    blocks: [
      { type: 'solutionsPage' },
      {
        type: 'cta',
        title: 'Not sure what to fix first on WhatsApp?',
        body: 'Start with one channel, one repeated question, and one follow-up gap.',
        note: 'We will help identify practical opportunities before recommending technology.',
        secondary: 'View Services',
        secondaryHref: 'services/'
      }
    ]
  },
  servicesPage: {
    title: 'DBX Solutions | AI Services for Growing Businesses',
    description:
      'Services that help businesses improve WhatsApp, customer conversations, and day-to-day follow-up—with ongoing support after launch.',
    hero: {
      eyebrow: 'Services',
      headline: 'Services that make WhatsApp and customer AI practical',
      body:
        'From WhatsApp and chat replies to CRM sync and ongoing support after launch—DBX implements around how your team already works.',
      primary: 'Book a Consultation',
      secondary: 'Explore Solutions',
      secondaryHref: 'solutions/'
    },
    blocks: [
      { type: 'services', full: true },
      {
        type: 'cta',
        title: 'Want a clear starting point?',
        body: 'Book a consultation and we will map the first conversation or follow-up to improve on your channels.',
        note: 'Most teams start with one channel, not a big project.',
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
      primary: 'Book a Consultation',
      secondary: 'View Services',
      secondaryHref: 'services/'
    },
    blocks: [
      { type: 'industries', full: true },
      {
        type: 'note',
        title: 'Regulated sectors',
        body:
          'For healthcare, financial services, legal, insurance, and other regulated industries, AI should support communication efficiency—not replace professional advice, compliance review, clinical judgment, legal judgment, or required human oversight. Read our Responsible AI Policy for more detail.'
      },
      {
        type: 'cta',
        title: 'See how WhatsApp follow-up could work in your sector',
        body: 'Bring your channels, common questions, and follow-up challenges. We will help map practical next steps.',
        note: 'Designed around your business, not a generic template.',
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
      primary: 'Book a Consultation',
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
              'We make practical customer communication help accessible for growing businesses. We find where faster replies and cleaner follow-up would help most, then design and implement around your tools and team capacity.'
          },
          {
            title: 'Our approach',
            body:
              'We start with the business problem before choosing technology. That means understanding how customers reach you, what your team repeats daily, and the outcomes that matter—then building something clear that improves over time.'
          }
        ]
      },
      {
        type: 'values',
        items: [
          ['We keep it practical', 'We focus on use cases that solve real business problems.'],
          ['People stay in the loop', 'AI should support customers and your team—not create confusion.'],
          ['Built around how you work', 'Solutions should fit your tools and daily routines.'],
          ['Tied to a real goal', 'Every implementation should connect to a measurable business outcome.'],
          ['Improves after launch', 'We review real chats and adjust answers and routes over time.']
        ]
      },
      {
        type: 'cta',
        title: 'Want to see how this applies to your business?',
        body: 'Book a consultation to review your channels and the first practical improvement to make.',
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
        'DBX designs customer flows around approved business information, controlled access, and clear limits on what systems process and store. For website visitor data, see our Privacy Policy.',
      primary: 'Book a Consultation',
      secondary: 'Contact Us',
      secondaryHref: 'contact/'
    },
    blocks: [
      {
        type: 'note',
        title: 'Our approach',
        body:
          'DBX Solutions builds data handling practices for client implementations—approved content sources, controlled access, and secure integration planning. This notice covers project work, not website privacy (see Privacy Policy).'
      },
      {
        type: 'policyList',
        title: 'What we prioritize',
        items: [
          'Using approved business content as the source for customer-facing answers',
          'Limiting access to systems and data required for each customer flow',
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
        'DBX implements customer-facing AI with clear escalation paths, approved business information, and human review—not unconstrained automation.',
      primary: 'Book a Consultation',
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
        'DBX aligns operations with recognized security practices. Items below are roadmap or readiness work unless explicitly marked complete. We document planned vs. completed work so you know what is in progress.',
      primary: 'Book a Consultation',
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
      'Book a consultation with DBX Solutions to review WhatsApp, lead capture, support automation, and practical AI opportunities for your business.',
    hero: {
      eyebrow: 'Contact',
      headline: 'Let’s review where WhatsApp and customer conversations are costing you time or leads',
      body:
        'Book on the calendar for the fastest response, or send a short request below. We will help identify the most practical first improvement to make.',
      primary: 'Book a Consultation',
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

function renderActions(primaryLabel = 'Book a Consultation', secondaryLabel, secondaryHref) {
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
        <a class="btn btn-primary header-book" href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">Book a Consultation</a>
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
  solutionsPage: 'WhatsApp replies, lead capture, and follow-up.',
  servicesPage: 'Implementation tied to your channels and CRM.',
  industriesPage: 'Sector examples—not one-size-fits-all templates.',
  aboutPage: 'Practical help with people in the loop.',
  contactPage: 'Calendar for speed, form for a short note.',
  dataHandlingPage: 'How we handle data in client projects.',
  responsibleAiPage: 'Escalation paths and clear AI limits.',
  securityRoadmapPage: 'Planned work—not claimed certifications.'
}

function renderHero(page, pageKey) {
  if (page === pages.home) {
    return `
      <section class="hero home-hero" id="top">
        <div class="hero-copy">
          ${page.hero.eyebrow ? `<span class="hero-eyebrow">${page.hero.eyebrow}</span>` : ''}
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
  const message = pageSignals[pageKey] || 'Practical help mapped to how customers reach you.'
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
          <span>DBX captures what they need</span>
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

function renderServicesVisual() {
  return `
    <div class="services-visual" aria-label="How DBX helps from first message to team action">
      <div class="services-journey">
        <div class="services-journey-step">
          <span class="services-journey-dot" aria-hidden="true"></span>
          <span>They write you</span>
        </div>
        <span class="services-journey-arrow" aria-hidden="true">→</span>
        <div class="services-journey-step services-journey-step-hub">
          <span class="services-journey-dot" aria-hidden="true"></span>
          <span>DBX replies</span>
        </div>
        <span class="services-journey-arrow" aria-hidden="true">→</span>
        <div class="services-journey-step">
          <span class="services-journey-dot" aria-hidden="true"></span>
          <span>You get the details</span>
        </div>
        <span class="services-journey-arrow" aria-hidden="true">→</span>
        <div class="services-journey-step">
          <span class="services-journey-dot" aria-hidden="true"></span>
          <span>Your tools update</span>
        </div>
        <span class="services-journey-arrow" aria-hidden="true">→</span>
        <div class="services-journey-step">
          <span class="services-journey-dot" aria-hidden="true"></span>
          <span>Your team closes</span>
        </div>
      </div>
    </div>
  `
}

function renderServices() {
  return `
    <section id="services" class="section">
      ${sectionHeading(
        'Services',
        'How DBX helps your business every day',
        'Tell us where you\'re stuck—we connect WhatsApp, your team, and the tools you already use.'
      )}
      <div class="services-panel">
        ${renderServicesVisual()}
        <ul class="services-stages">
          ${services
            .map(
              (service) => `
                <li class="services-stage ${service.core ? 'services-stage-core' : ''}">
                  <span class="services-stage-num" aria-hidden="true">${service.icon}</span>
                  <div class="services-stage-content">
                    <div class="services-stage-head">
                      <strong>${service.title}</strong>
                      ${service.badge ? `<span class="services-stage-badge">${service.badge}</span>` : ''}
                    </div>
                    <p>${service.body}</p>
                    <div class="services-stage-chips">
                      <span class="services-chip"><em>Good if you</em> ${service.goodIf}</span>
                      <span class="services-chip services-chip-outcome"><em>What changes</em> ${service.outcome}</span>
                    </div>
                    ${service.learnHref ? `<a class="learn-link" href="${route(service.learnHref)}">Explore service</a>` : ''}
                  </div>
                </li>`
            )
            .join('')}
        </ul>
      </div>
    </section>
  `
}

function renderManagedOpsVisual() {
  return `
    <div class="managed-visual" aria-label="Ongoing support cycle from launch to improvement">
      <div class="managed-loop">
        ${managedOpsLoop
          .map(
            (label, index) => `
          ${index > 0 ? '<span class="managed-loop-arrow" aria-hidden="true">→</span>' : ''}
          <div class="managed-loop-step${index === 0 ? ' managed-loop-step-start' : index === managedOpsLoop.length - 1 ? ' managed-loop-step-end' : ''}">
            <span class="managed-loop-dot" aria-hidden="true"></span>
            <span>${label}</span>
          </div>`
          )
          .join('')}
      </div>
    </div>
  `
}

function renderManagedOps() {
  return `
    <section id="managed-ai-operations" class="section managed-section">
      ${sectionHeading(
        'Ongoing support',
        'AI does not stop working after launch day.',
        'After WhatsApp and your flows go live, most SMB owners worry about outdated replies, stuck leads, or losing control. DBX stays with you to review, adjust, and improve—without you watching everything alone.'
      )}
      <div class="managed-panel">
        ${renderManagedOpsVisual()}
        <ul class="managed-stages">
          ${managedOpsStages
            .map(
              (stage) => `
            <li class="managed-stage">
              <span class="managed-stage-num" aria-hidden="true">${stage.num}</span>
              <div class="managed-stage-content">
                <strong>${stage.title}</strong>
                <p>${stage.body}</p>
              </div>
            </li>`
            )
            .join('')}
        </ul>
        <p class="managed-footnote">Human-supervised. Your tools. Your rules.</p>
      </div>
    </section>
  `
}

function renderBenefits() {
  return `
    <section id="benefits">
      ${sectionHeading(
        'Business Impact',
        'Operational improvements your team and customers can feel.',
        'DBX focuses on outcomes your team and customers can feel—clearer replies, easier follow-up, and less repeat work.'
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
        'DBX guides each project through a clear, low-risk path—from how customers reach you to ongoing improvement after launch.'
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
        'DBX is especially useful for businesses that depend on fast replies, clear capture, reliable follow-up, and consistent answers.'
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
        'A practical partner for growing businesses—not a one-time setup shop.',
        'We stay with you after launch—reviewing chats, adjusting answers, and improving follow-up around how your business actually runs.'
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
        'DBX focuses on measurable outcomes—response speed, clearer capture, and follow-up your team can use.'
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
  const primary = block.primary || 'Book a Consultation'
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
  const solutionItems = services.slice(0, 5)
  return `
    <section id="what-we-help-with">
      ${sectionHeading(
        'What we help with',
        'Five practical ways to improve WhatsApp and follow-up',
        'Each starts with a real customer moment—not a technology catalog.'
      )}
      <div class="services-panel">
        ${renderServicesVisual()}
        <ul class="services-stages">
          ${solutionItems
            .map(
              (service) => `
                <li class="services-stage ${service.core ? 'services-stage-core' : ''}">
                  <span class="services-stage-num" aria-hidden="true">${service.icon}</span>
                  <div class="services-stage-content">
                    <div class="services-stage-head">
                      <strong>${service.title}</strong>
                      ${service.badge ? `<span class="services-stage-badge">${service.badge}</span>` : ''}
                    </div>
                    <p>${service.body}</p>
                    <div class="services-stage-chips">
                      <span class="services-chip"><em>Good if you</em> ${service.goodIf}</span>
                      <span class="services-chip services-chip-outcome"><em>What changes</em> ${service.outcome}</span>
                    </div>
                  </div>
                </li>`
            )
            .join('')}
        </ul>
      </div>
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
    'Slow replies on WhatsApp',
    'Leads not followed up',
    'Same questions all day',
    'Info stuck in chats',
    'Not sure where to start'
  ]
  const privacyHref = href('privacy-policy/')
  return `
    <section id="contact" class="contact-layout">
      <div>
        ${sectionHeading(
          'Book a Consultation',
          'Book a consultation or send a quick request.',
          'Prefer the fastest path? Use the calendar. Only need a short note? The form takes under a minute.'
        )}
        <p class="contact-privacy-notice">By submitting this form, you agree that DBX Solutions LLC may process your information to respond to your request, as described in our <a href="${privacyHref}">Privacy Policy</a>. SMS consent applies only if you provide a phone number and opt in.</p>
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
        <button class="btn btn-primary" type="submit">Book a Consultation</button>
        <p class="form-confirmation" hidden>Thank you. We received your request and will follow up soon.</p>
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
        <p>DBX Solutions helps growing businesses reply faster on WhatsApp, qualify leads, and keep follow-up connected to the tools teams already use.</p>
        <strong>Practical help for customer conversations and operations.</strong>
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
        <p class="footer-cookie-note">We use cookies and chat tools to improve your experience. See our <a href="${href('privacy-policy/')}">Privacy Policy</a>.</p>
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

    const locale = getLocale()
    const mailLabels =
      locale === 'es'
        ? { subject: 'Solicitud de consulta', name: 'Nombre', email: 'Correo', phone: 'Teléfono/WhatsApp', goal: 'Objetivo', none: 'No indicado' }
        : locale === 'pt'
          ? { subject: 'Solicitação de consulta', name: 'Nome', email: 'E-mail', phone: 'Telefone/WhatsApp', goal: 'Objetivo', none: 'Não informado' }
          : { subject: 'Consultation request', name: 'Name', email: 'Email', phone: 'Phone/WhatsApp', goal: 'Goal', none: 'Not provided' }

    const subject = encodeURIComponent(`${mailLabels.subject}: ${data.get('goal') || 'General'}`)
    const body = encodeURIComponent(
      [
        `${mailLabels.name}: ${data.get('name') || ''}`,
        `${mailLabels.email}: ${data.get('email') || ''}`,
        `${mailLabels.phone}: ${phone || mailLabels.none}`,
        `${mailLabels.goal}: ${data.get('goal') || ''}`,
        '',
        String(data.get('message') || '')
      ].join('\n')
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    const confirmation = form.querySelector('.form-confirmation')
    if (confirmation) confirmation.hidden = false
  })
}

const pagePaths = {
  home: '',
  solutionsPage: 'solutions/',
  servicesPage: 'services/',
  industriesPage: 'industries/',
  aboutPage: 'about/',
  contactPage: 'contact/',
  dataHandlingPage: 'data-handling-notice/',
  responsibleAiPage: 'responsible-ai-policy/',
  securityRoadmapPage: 'security-roadmap/'
}

export function mountPage(pageKey) {
  const app = document.querySelector('#app')
  const page = pages[pageKey]
  if (!app || !page) return
  const locale = getLocale()

  document.documentElement.lang = getHtmlLang(locale)
  setMeta(page)
  updateHreflang(pagePaths[pageKey] || '')
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
      <a class="mobile-sticky-cta" href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">${translateText('Book a Consultation', locale)}</a>
    </div>
  `
  app.innerHTML = translateHtml(html, locale)
  bindInteractions(app, pageKey)
  initIntercom()
}

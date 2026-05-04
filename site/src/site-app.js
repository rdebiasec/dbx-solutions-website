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
  'Support answers with approved context',
  'Lead intake across WhatsApp, chat, SMS, forms, and email',
  'CRM, calendar, and team follow-up workflows',
  'Human review and escalation when it matters'
]

const problems = [
  ['Slow responses', 'Customers move on when questions sit unanswered during busy hours or after closing.'],
  ['Repetitive questions', 'Your team spends time repeating answers that could be handled consistently.'],
  ['Missed leads', 'High-intent inquiries lose momentum when follow-up is delayed or incomplete.'],
  ['Disconnected tools', 'Conversation details often stay separate from the CRM, calendar, support desk, or team workflow.'],
  ['Limited team capacity', 'Growing demand creates more customer conversations than a lean team can manage manually.']
]

const solutionArchitecture = [
  {
    title: 'Customer Channels',
    body: 'Customers reach out through the channels they already use.',
    items: ['WhatsApp', 'Web chat', 'SMS', 'Forms', 'Email']
  },
  {
    title: 'DBX AI Assistant',
    body: 'The assistant answers common questions, qualifies intent, collects details, and routes the next step.',
    items: ['Answer', 'Qualify', 'Collect', 'Route']
  },
  {
    title: 'Business Systems',
    body: 'Useful customer context moves into the tools your team uses to manage work.',
    items: ['CRM', 'Calendar', 'Support desk', 'Team notifications']
  },
  {
    title: 'Human Team',
    body: 'People stay in control for follow-up, exceptions, decisions, and customer relationships.',
    items: ['Review', 'Follow up', 'Close', 'Support']
  }
]

const services = [
  {
    title: 'AI Customer Assistants',
    icon: '01',
    core: true,
    badge: 'Priority focus',
    body: 'Customer-facing assistants for WhatsApp, web chat, SMS, forms, and email that answer common questions and guide people to the right next step.',
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
    learnHref: 'process/'
  },
  {
    title: 'Optimization and Continuous Improvement',
    icon: '06',
    core: true,
    badge: 'Managed partner',
    body: 'Review real conversations, improve responses, tune workflows, and expand useful improvements as your business changes.',
    bestFor: 'Businesses that want AI systems managed beyond launch.',
    outcome: 'AI assistants stay accurate, useful, and aligned with customer behavior.',
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
  ['AI response improvement', 'Tune approved responses so assistants stay accurate, useful, and aligned with your business.'],
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
    items: ['Configure AI assistants', 'Connect systems where needed', 'Test conversation quality', 'Prepare your team for launch']
  },
  {
    title: 'Optimize',
    body: 'We monitor performance, review user behavior, improve flows, and refine the solution as your business evolves.',
    items: ['Review performance data', 'Improve responses and flows', 'Adjust automation rules', 'Identify new opportunities']
  }
]

const industries = [
  { priority: true, title: 'Professional services', body: 'Automate intake, qualify inquiries, route prospects, and improve response times for consulting, legal, financial, and advisory teams.' },
  { priority: true, title: 'Healthcare and wellness clinics', body: 'Support appointment inquiries, FAQs, intake guidance, service information, and patient communication workflows.' },
  { priority: true, title: 'Real estate teams', body: 'Qualify buyer and seller inquiries, answer common property questions, route leads, and support faster follow-up.' },
  { priority: true, title: 'Local service businesses', body: 'Automate quote requests, booking inquiries, service questions, and customer follow-ups for high-message-volume teams.' },
  { title: 'E-commerce', body: 'Support product questions, order-related inquiries, return guidance, and routine customer service requests.' },
  { title: 'Education and training', body: 'Answer program questions, qualify student or client interest, guide enrollment inquiries, and automate follow-up.' },
  { title: 'Financial and advisory services', body: 'Improve inquiry handling, appointment requests, client intake, and customer communication with human oversight.' }
]

const trustPoints = [
  ['SMB-focused implementation', 'Solutions are designed for growing businesses that need practical value without enterprise-level complexity.'],
  ['Business-first design', 'We start with customer journeys, operational challenges, and business goals before recommending technology.'],
  ['Human-supervised AI', 'AI supports your team while escalation, review, and judgment remain available when needed.'],
  ['Integration-aware solutions', 'We consider how AI fits with your existing channels, workflows, CRM, and customer communication tools.'],
  ['Outcome-oriented delivery', 'Every solution connects to a business outcome such as better lead handling, support consistency, or reduced manual work.'],
  ['Continuous improvement', 'We help refine flows, responses, and automations as your business learns what works best.']
]

const faq = [
  ['What does DBX Solutions do?', 'DBX helps SMBs design, connect, monitor, and improve AI-assisted customer conversation systems around real business workflows.'],
  ['Can this work with WhatsApp?', 'Yes. WhatsApp can be part of the channel mix along with web chat, SMS, forms, and email, depending on your setup.'],
  ['Can humans take over conversations?', 'Yes. DBX designs escalation paths so your team can review, respond, or take over when a conversation needs human judgment.'],
  ['How long does implementation take?', 'Timing depends on scope, channels, and integrations. Many businesses start with one focused use case, then expand after launch.'],
  ['How are AI responses controlled?', 'Assistants are built around approved business information, clear rules, escalation paths, and ongoing quality review.'],
  ['Can DBX connect with our existing tools?', 'In many cases, yes. DBX can connect conversations with CRMs, calendars, support systems, forms, notifications, and workflow tools.'],
  ['Will AI replace our customer service team?', 'No. The goal is to support your team, reduce repetitive work, and keep people focused on higher-value customer needs.']
]

const pages = {
  home: {
    title: 'DBX Solutions | AI-Powered Customer Experience for SMBs',
    description:
      'DBX Solutions helps small and mid-sized businesses automate customer conversations, improve response times, qualify leads, and streamline operations with practical AI-powered solutions.',
    hero: {
      eyebrow: 'AI-Powered Customer Experience',
      headline: 'Never miss a customer conversation again.',
      body:
        'DBX Solutions helps growing SMBs respond faster, qualify leads, automate repetitive conversations, and connect customer interactions with the tools your team already uses.',
      primary: 'Book a Consultation',
      secondary: 'See How It Works',
      secondaryHref: '#process',
      microcopy: 'Practical AI for customer support, lead engagement, workflow automation, and smarter business operations.'
    },
    blocks: [
      { type: 'problem' },
      { type: 'solution' },
      { type: 'services' },
      {
        type: 'cta',
        title: 'Explore the first customer workflow worth improving.',
        body:
          'We can help identify where customer response, intake, qualification, or follow-up should become clearer first.',
        note: 'A practical consultation keeps the first implementation focused.',
        secondary: 'See How It Works',
        secondaryHref: '#process'
      },
      { type: 'managedOps' },
      {
        type: 'cta',
        title: 'Keep your AI assistant useful after launch.',
        body:
          'Managed AI Operations gives your business ongoing review, tuning, and improvement as conversations and workflows evolve.',
        note: 'AI works best when it is monitored, measured, and improved.'
      },
      { type: 'benefits' },
      { type: 'process' },
      {
        type: 'cta',
        title: 'Map your first AI workflow with DBX.',
        body:
          'Bring your current customer channels, common questions, and follow-up process. We will help turn them into a practical implementation path.',
        note: 'Guided adoption makes AI feel lower-risk and easier to manage.',
        secondary: 'Start With a Practical AI Consultation',
        secondaryHref: 'CALENDAR_URL'
      },
      { type: 'industries' },
      { type: 'trust' },
      { type: 'faq' },
      {
        type: 'cta',
        final: true,
        title: 'Start with a practical AI consultation.',
        body:
          'DBX Solutions helps SMBs improve customer conversations, qualify leads, automate repetitive work, and connect AI with real business operations.',
        note: 'Designed for growing businesses that want clearer customer communication and practical AI implementation.'
      }
    ]
  },
  solutionsPage: {
    title: 'DBX Solutions | AI-Powered Solutions for Customer Experience',
    description:
      'AI-powered solutions for customer experience, lead qualification, support automation, workflow integration, and business operations.',
    hero: {
      eyebrow: 'Solutions',
      headline: 'AI-powered solutions for customer experience and business automation',
      body:
        'DBX Solutions helps growing businesses automate customer interactions, qualify leads, support customers, and connect workflows using practical AI systems.',
      primary: 'Book a Consultation',
      secondary: 'View Services',
      secondaryHref: 'services/'
    },
    blocks: [
      { type: 'solutionsPage' },
      {
        type: 'cta',
        title: 'Not sure where AI fits first?',
        body: 'Start with one customer journey, one workflow, and one measurable business outcome.',
        note: 'We will help identify the practical opportunities before recommending technology.'
      }
    ]
  },
  securityPage: {
    title: 'DBX Solutions | Responsible AI Implementation',
    description:
      'Practical AI implementation with human oversight, workflow awareness, and responsible customer communication.',
    hero: {
      eyebrow: 'Responsible AI',
      headline: 'AI that supports customer experience with clear human oversight',
      body:
        'DBX Solutions helps businesses use AI in controlled, useful ways that fit their workflows, brand voice, and customer expectations.',
      primary: 'Book a Consultation',
      secondary: 'Contact Us',
      secondaryHref: 'contact/'
    },
    blocks: [{ type: 'trust' }, { type: 'cta', title: 'Want a responsible AI starting point?', body: 'We can review your customer journey and identify where automation can support your team without replacing required human judgment.', note: 'Practical AI should improve clarity, not add risk.' }]
  },
  packagesPage: {
    title: 'DBX Solutions | AI Services',
    description:
      'Explore DBX Solutions services for AI customer assistants, lead qualification, support automation, workflow integration, strategy, and optimization.',
    hero: {
      eyebrow: 'Services',
      headline: 'Start with the service that matches your customer journey',
      body:
        'DBX Solutions designs AI services around your business needs, workflows, customer channels, and operational goals.',
      primary: 'Book a Consultation',
      secondary: 'View Services',
      secondaryHref: 'services/'
    },
    blocks: [{ type: 'services', full: true }, { type: 'cta', title: 'Need help choosing the right starting point?', body: 'Book a consultation and we will identify the most practical first AI opportunity for your business.', note: 'Start focused, then expand based on what works.' }]
  },
  processPage: {
    title: 'DBX Solutions | AI Implementation Process',
    description:
      'A practical implementation process for moving from AI opportunity to customer experience and workflow impact.',
    hero: {
      eyebrow: 'Process',
      headline: 'A simple path from AI idea to business impact',
      body:
        'We understand your customer journey first, then design, implement, and optimize AI-powered systems that fit your operations.',
      primary: 'Book a Consultation',
      secondary: 'Contact Us',
      secondaryHref: 'contact/'
    },
    blocks: [{ type: 'process' }, { type: 'cta', title: 'Ready to map your first AI workflow?', body: 'Let’s review where response speed, lead handling, support automation, or workflow integration can create practical value.', note: 'A focused consultation keeps implementation realistic.' }]
  },
  servicesPage: {
    title: 'DBX Solutions | AI Services for SMBs',
    description:
      'Services that help businesses move from AI interest to practical implementation around customer experience and workflow automation.',
    hero: {
      eyebrow: 'Services',
      headline: 'Services that make AI practical for your business',
      body:
        'DBX Solutions helps businesses move from AI interest to AI implementation with services designed around customer experience, automation, workflow integration, and operational improvement.',
      primary: 'Book a Consultation',
      secondary: 'Explore Solutions',
      secondaryHref: 'solutions/'
    },
    blocks: [
      { type: 'services', full: true },
      {
        type: 'cta',
        title: 'Not sure which service fits your business?',
        body: 'Book a consultation and we will help identify where AI can create the most practical value.',
        note: 'The first step is clarity, not complexity.'
      }
    ]
  },
  industriesPage: {
    title: 'DBX Solutions | AI Customer Experience by Industry',
    description:
      'AI customer experience solutions for service-driven SMBs, local businesses, professional teams, clinics, real estate teams, and more.',
    hero: {
      eyebrow: 'Industries',
      headline: 'AI customer experience solutions for growing businesses',
      body:
        'From service businesses to professional teams, DBX Solutions helps SMBs improve how they respond, qualify, support, and communicate with customers.',
      primary: 'Book a Consultation',
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
        note: 'Designed around your business, not a generic automation template.'
      }
    ]
  },
  aboutPage: {
    title: 'DBX Solutions | About',
    description:
      'DBX Solutions helps SMBs turn AI into better customer experiences through practical, human-centered implementation.',
    hero: {
      eyebrow: 'About DBX Solutions',
      headline: 'Helping SMBs turn AI into better customer experiences',
      body:
        'DBX Solutions was built to help small and mid-sized businesses adopt AI in a practical, human-centered, and business-focused way.',
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
              'Our mission is to make AI-powered customer experience accessible and useful for growing businesses. We help companies identify where AI can create meaningful operational value, then design and implement solutions that fit their customer journey, tools, and team capacity.'
          },
          {
            title: 'Our approach',
            body:
              'We start with the business problem before choosing the technology. That means understanding customer interactions, internal workflows, current systems, and the outcomes that matter most. From there, we design AI-powered solutions that are clear, manageable, and built to improve over time.'
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
      }
    ]
  },
  contactPage: {
    title: 'DBX Solutions | Contact',
    description:
      'Request a consultation with DBX Solutions to identify practical AI opportunities for customer experience and workflow automation.',
    hero: {
      eyebrow: 'Contact',
      headline: 'Let’s explore how AI can improve your customer experience',
      body:
        'Tell us about your business, your customer journey, and the operational challenges you want to improve. DBX Solutions will help identify practical AI opportunities that fit your goals.',
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

function renderWorkflowVisual() {
  const steps = [
    ['Customer message', 'WhatsApp, chat, SMS, form, or email inquiry arrives.'],
    ['DBX AI Assistant', 'Qualifies, answers, collects details, and routes.'],
    ['Workflow automation', 'Creates the next step in your business process.'],
    ['CRM or team follow-up', 'Your team gets context to close, support, or review.']
  ]
  return `
    <aside class="workflow-visual" aria-label="Customer communication workflow visualization">
      <div class="orbit-glow"></div>
      <div class="visual-kicker">Customer conversations connected to business operations</div>
      <div class="channel-stack" aria-hidden="true">
        <span>WhatsApp</span>
        <span>Web chat</span>
        <span>SMS</span>
      </div>
      <div class="message-card customer">
        <span>Incoming</span>
        <strong>“Can I get pricing and availability on WhatsApp?”</strong>
      </div>
      <div class="ai-core">
        <span>DBX AI Assistant</span>
        <strong>Qualify, answer, route</strong>
      </div>
      <div class="message-card workflow">
        <span>Automation</span>
        <strong>CRM update, booking step, or support route</strong>
      </div>
      <div class="message-card team">
        <span>Team handoff</span>
        <strong>Lead summary sent with owner and next step</strong>
      </div>
      <div class="system-stack" aria-hidden="true">
        <span>CRM</span>
        <span>Calendar</span>
        <span>Team alerts</span>
      </div>
      <div class="workflow-line">
        ${steps.map(([title, body], index) => `<div><b>${index + 1}</b><strong>${title}</strong><span>${body}</span></div>`).join('')}
      </div>
    </aside>
  `
}

function renderHero(page) {
  return `
    <section class="hero" id="top">
      <div class="hero-copy">
        <span class="eyebrow">${page.hero.eyebrow}</span>
        <h1>${page.hero.headline}</h1>
        <p>${page.hero.body}</p>
        ${page.hero.microcopy ? `<p class="hero-trust">${page.hero.microcopy}</p>` : ''}
        ${renderActions(page.hero.primary, page.hero.secondary, page.hero.secondaryHref)}
        ${
          page === pages.home
            ? `<ul class="value-points">${valuePoints.map((item) => `<li>${item}</li>`).join('')}</ul>`
            : ''
        }
      </div>
      ${page === pages.home ? renderWorkflowVisual() : renderPageSignal(page.hero.eyebrow)}
    </section>
  `
}

function renderPageSignal(label) {
  return `
    <aside class="page-signal" aria-label="${label} visual summary">
      <span>${label}</span>
      <strong>Practical AI, mapped to your customer journey.</strong>
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

function renderProblem() {
  return `
    <section id="challenge">
      ${sectionHeading(
        'The Challenge',
        'Customer demand grows faster than manual follow-up can keep up.',
        'For many SMBs, the issue is not effort. It is that conversations, customer details, and next steps are spread across busy people and disconnected tools.'
      )}
      ${renderSimpleCards(problems)}
    </section>
  `
}

function renderSolution() {
  return `
    <section id="solutions" class="solution-section">
      <div>
        ${sectionHeading(
          'The Solution',
          'Customer experience automation connected to real business operations.',
        'DBX Solutions designs customer conversation systems that collect the right information, trigger the right workflow, and give your team useful context.'
        )}
        <p class="section-note">The result is a practical bridge between customer communication and the work your team already needs to do.</p>
      </div>
      <div class="architecture-flow" aria-label="DBX customer experience automation architecture">
        ${solutionArchitecture
          .map(
            (layer, index) => `
              <article class="architecture-card">
                <span class="card-index">${String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>${layer.title}</h3>
                  <p>${layer.body}</p>
                  <ul>${layer.items.map((item) => `<li>${item}</li>`).join('')}</ul>
                </div>
              </article>`
          )
          .join('')}
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
      ${full ? '' : `<div class="section-actions">${renderActions('Book a Consultation', 'Explore Solutions', 'solutions/')}</div>`}
    </section>
  `
}

function renderManagedOps() {
  return `
    <section id="managed-ai-operations" class="managed-section">
      ${sectionHeading(
        'Managed AI Operations',
        'Keep AI useful as your business changes.',
        'AI systems require ongoing review, tuning, monitoring, and refinement. DBX helps keep assistants accurate, useful, and aligned with evolving workflows and customer needs.'
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
      ${full ? '' : `<div class="section-actions">${renderActions('Book a Consultation', 'Explore Industries', 'industries/')}</div>`}
    </section>
  `
}

function renderTrust() {
  return `
    <section id="trust" class="trust-section">
      ${sectionHeading(
        'Why DBX Solutions',
        'A practical partner for customer experience systems.',
        'We do not just launch AI assistants. We design, connect, monitor, and improve customer experience systems around your real business operations.'
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

function renderCta(block) {
  const secondary = block.secondary || 'Explore Solutions'
  const secondaryHref = block.secondaryHref || 'solutions/'
  return `
    <section class="cta-panel ${block.final ? 'final-cta' : ''}">
      <span class="eyebrow">${block.final ? 'Next Step' : 'Start Practical'}</span>
      <h2>${block.title}</h2>
      <p>${block.body}</p>
      ${renderActions(block.final ? 'Start With a Practical AI Consultation' : 'Book a Consultation', secondary, secondaryHref)}
      <p class="cta-note">${block.note}</p>
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
        ['Conversational AI Assistants', 'Website chat assistants, FAQ automation, service inquiry support, customer intake, appointment guidance, and product or service recommendations.'],
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
    ['firstName', 'First name', 'text', 'First name'],
    ['lastName', 'Last name', 'text', 'Last name'],
    ['email', 'Business email', 'email', 'name@company.com'],
    ['company', 'Company name', 'text', 'Company'],
    ['phone', 'Phone number', 'tel', '+1 (555) 000-0000'],
    ['website', 'Website', 'url', 'https://company.com']
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
          'Use the form below to request a consultation or ask a question.',
          'Not sure where to start? That is exactly what the consultation is for. We will help identify where AI can create the most practical value for your business.'
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
        <label class="full-field" for="message">Message
          <textarea id="message" name="message" rows="5" placeholder="Tell us about your customer journey, tools, or operational challenge."></textarea>
        </label>
        ${smsConsentCheckboxHtml(href('privacy-policy/'), href('sms-terms/'), 'Please confirm SMS consent preferences before submitting.')}
        <button class="btn btn-primary" type="submit">Request Consultation</button>
        <p class="form-confirmation" hidden>Thank you. Your request has been captured for follow-up.</p>
      </form>
    </section>
  `
}

function renderBlock(block) {
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
  return ''
}

function renderFooter() {
  return `
    <footer>
      <div>
        <a href="${href('')}" class="footer-logo"><img src="${href('logo.png')}" alt="DBX Solutions" /></a>
        <p>DBX Solutions helps small and mid-sized businesses turn customer conversations into clearer support, qualified leads, and connected follow-up workflows.</p>
        <strong>Practical AI for SMB customer experience and operations.</strong>
      </div>
      <nav aria-label="Footer navigation">
        ${nav.map((item) => `<a href="${href(item.path)}">${item.label}</a>`).join('')}
        <span class="footer-heading">Legal</span>
        ${legalLinks.map((item) => `<a href="${href(item.path)}">${item.label}</a>`).join('')}
      </nav>
      <div class="footer-cta">
        <a class="btn btn-primary" href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">Book a Consultation</a>
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
    const confirmation = event.currentTarget.querySelector('.form-confirmation')
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
    <div class="wrapper">
      ${renderHeader(pageKey)}
      <main>
        ${renderHero(page)}
        ${page.blocks.map(renderBlock).join('')}
      </main>
      ${renderFooter()}
      <a class="mobile-sticky-cta" href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">Book a Consultation</a>
    </div>
  `
  app.innerHTML = translateHtml(html, locale)
  bindInteractions(app, pageKey)
}

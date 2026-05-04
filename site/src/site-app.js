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

const valuePoints = [
  'Respond faster to customers',
  'Reduce repetitive manual work',
  'Capture and qualify more leads',
  'Connect conversations with business tools'
]

const problems = [
  ['Slow Response Times', 'Customers expect quick answers. When teams are busy, delayed responses can lead to missed opportunities and lower satisfaction.'],
  ['Repetitive Customer Questions', 'Teams spend valuable time answering the same questions across email, chat, forms, and other customer communication channels.'],
  ['Missed Leads and Follow-Ups', 'Without automated qualification and routing, interested prospects can fall through the cracks before the team responds.'],
  ['Disconnected Tools', 'Customer conversations, CRM data, support requests, and internal workflows are often spread across systems that do not work smoothly together.'],
  ['Limited Team Capacity', 'Growing businesses need better customer experience, but hiring more people is not always the fastest or most efficient solution.']
]

const solutionPillars = [
  ['Conversational AI', 'AI assistants that answer questions, guide customers, collect information, and support conversations across digital channels.'],
  ['Customer Experience Automation', 'Automated flows that improve speed, consistency, and service quality across common customer interactions.'],
  ['Workflow Integration', 'Connected systems that move customer information between tools, teams, and processes more efficiently.'],
  ['AI Strategy and Implementation', 'Practical guidance and implementation support to help your business adopt AI with clarity, control, and measurable purpose.']
]

const services = [
  {
    title: 'AI Customer Assistants',
    body: 'Create intelligent assistants that answer common questions, guide customers, collect information, and support your team across digital channels.',
    bestFor: 'Businesses that want faster customer responses and more consistent communication.',
    outcome: 'Reduce repetitive inquiries while improving the customer experience.'
  },
  {
    title: 'Lead Qualification Automation',
    body: 'Use AI-powered conversation flows to capture prospect details, qualify interest, ask the right questions, and route leads to the right next step.',
    bestFor: 'Businesses that receive inquiries through forms, chat, email, social channels, or booking requests.',
    outcome: 'Improve lead response speed and reduce missed sales opportunities.'
  },
  {
    title: 'Customer Support Automation',
    body: 'Automate common support interactions, frequently asked questions, intake forms, ticket routing, and customer updates.',
    bestFor: 'Teams that spend too much time on repetitive support requests.',
    outcome: 'Lower manual workload while improving support consistency.'
  },
  {
    title: 'CRM and Workflow Integration',
    body: 'Connect customer conversations with CRM records, internal workflows, notifications, and business systems so teams have better context and fewer manual steps.',
    bestFor: 'Businesses using multiple tools that do not communicate effectively.',
    outcome: 'Create smoother handoffs and cleaner operational processes.'
  },
  {
    title: 'AI Strategy and Roadmapping',
    body: 'Assess your current customer journey and identify practical AI opportunities that align with your business goals, tools, team, and budget.',
    bestFor: 'Businesses that want to adopt AI but need a clear plan before implementation.',
    outcome: 'Move from AI uncertainty to a focused, actionable roadmap.'
  },
  {
    title: 'Optimization and Continuous Improvement',
    body: 'Review performance, improve conversation flows, refine automations, and adapt systems as customer needs and business processes evolve.',
    bestFor: 'Businesses that want AI systems to improve over time.',
    outcome: 'Keep automation useful, accurate, and aligned with business growth.'
  }
]

const benefits = [
  ['Faster Response Times', 'Help customers get answers quickly, even when your team is busy or outside normal business hours.'],
  ['Fewer Missed Opportunities', 'Capture, qualify, and route inquiries before prospects lose interest or move on.'],
  ['Reduced Manual Workload', 'Automate repetitive questions, intake steps, and routine follow-ups so your team can focus on higher-value work.'],
  ['Better Customer Satisfaction', 'Create a more consistent and responsive experience across customer touchpoints.'],
  ['More Consistent Communication', 'Ensure customers receive clear, accurate, and brand-aligned responses throughout their journey.'],
  ['Scalable Support', 'Handle more conversations and requests without immediately increasing headcount.'],
  ['Improved Operational Visibility', 'Connect conversations and workflows so teams have better context and fewer information gaps.'],
  ['Practical AI Adoption', 'Use AI where it supports real business outcomes instead of chasing trends or adding unnecessary tools.']
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
  ['Professional Services', 'Automate intake questions, qualify inquiries, route prospects, and improve response times for consulting, legal, financial, and advisory firms.'],
  ['Healthcare and Wellness Clinics', 'Support appointment inquiries, FAQs, intake guidance, service information, and patient communication workflows.'],
  ['Real Estate Teams', 'Qualify buyer and seller inquiries, answer property-related questions, route leads, and support faster follow-up.'],
  ['Local Service Businesses', 'Automate quote requests, booking inquiries, service questions, and customer follow-ups for businesses with high call or message volume.'],
  ['E-Commerce Businesses', 'Support product questions, order-related inquiries, return guidance, and customer service automation.'],
  ['Education and Training Providers', 'Answer program questions, qualify student or client interest, guide enrollment inquiries, and automate follow-up.'],
  ['Financial and Advisory Services', 'Improve inquiry handling, appointment requests, client intake, and customer communication while maintaining a professional experience.']
]

const trustPoints = [
  ['SMB-Focused', 'Solutions are designed for growing businesses that need practical impact without enterprise-level complexity.'],
  ['Business-First Approach', 'We start with your customer journey, operational challenges, and business goals before recommending technology.'],
  ['Human Oversight', 'AI is designed to support your team, not replace judgment where human review, escalation, or expertise is needed.'],
  ['Integration-Aware', 'We consider how AI fits with your existing tools, workflows, CRM, and customer communication channels.'],
  ['Outcome-Oriented', 'Every solution is tied to a business purpose such as faster response, better support, improved lead handling, or reduced manual work.'],
  ['Built to Improve', 'AI systems should evolve. We help refine flows, responses, and automations as your business learns what works best.']
]

const faq = [
  ['What does DBX Solutions do?', 'DBX Solutions helps small and mid-sized businesses use AI to improve customer experience, automate repetitive interactions, qualify leads, support customers, and streamline workflows.'],
  ['Is this only for large companies?', 'No. DBX Solutions is focused on practical AI solutions for SMBs. The goal is to help growing businesses use AI in ways that are useful, manageable, and aligned with their operations.'],
  ['Can AI work with our existing tools?', 'In many cases, yes. DBX Solutions can help connect AI-powered customer interactions with tools such as CRMs, forms, support systems, scheduling platforms, and workflow tools depending on your current setup.'],
  ['Do we need technical knowledge to use these solutions?', 'No. DBX Solutions handles the strategy, design, implementation, and optimization. The goal is to make AI easier for your business to adopt and manage.'],
  ['Can humans still review or take over conversations?', 'Yes. Human oversight is an important part of responsible AI implementation. AI can support common interactions while allowing your team to review, respond, or take over when needed.'],
  ['How long does implementation take?', 'Timing depends on the complexity of the solution, the number of workflows, and the tools involved. A focused implementation can often begin with a clearly defined use case, then expand over time.'],
  ['What types of customer interactions can be automated?', 'Common examples include FAQs, lead qualification, appointment requests, intake questions, quote requests, support triage, follow-ups, and routing inquiries to the right person or system.'],
  ['Will AI replace our customer service team?', 'The goal is not to replace your team. The goal is to reduce repetitive work, improve response speed, and help your team focus on higher-value conversations.'],
  ['How do we get started?', 'Start with a consultation. DBX Solutions will review your business goals, customer journey, current tools, and operational challenges to identify the best AI opportunities.']
]

const pages = {
  home: {
    title: 'DBX Solutions | AI-Powered Customer Experience for SMBs',
    description:
      'DBX Solutions helps small and mid-sized businesses automate customer conversations, improve response times, qualify leads, and streamline operations with practical AI-powered solutions.',
    hero: {
      eyebrow: 'AI-Powered Customer Experience',
      headline: 'AI-Powered Customer Experience for Growing SMBs',
      body:
        'DBX Solutions helps small and mid-sized businesses automate customer conversations, improve response times, and create smarter customer journeys without adding operational complexity.',
      primary: 'Book a Consultation',
      secondary: 'Explore Solutions',
      secondaryHref: 'solutions/',
      microcopy: 'Practical AI solutions designed for real business operations, not generic automation.'
    },
    blocks: [
      { type: 'problem' },
      { type: 'solution' },
      { type: 'services' },
      { type: 'benefits' },
      { type: 'process' },
      { type: 'industries' },
      { type: 'trust' },
      {
        type: 'cta',
        title: 'Ready to improve your customer experience with practical AI?',
        body:
          'Let’s identify where automation can help your business respond faster, serve customers better, and operate more efficiently.',
        note: 'No generic AI pitch. Just a focused conversation about your business, your customer journey, and where AI can create real value.'
      },
      { type: 'faq' },
      {
        type: 'cta',
        final: true,
        title: 'Build a smarter customer experience without overwhelming your team.',
        body:
          'DBX Solutions helps SMBs use AI in practical, useful, and scalable ways. Start with a focused conversation and discover where automation can create real value for your business.',
        note: 'Designed for growing businesses that want better customer experience, smarter workflows, and practical AI implementation.'
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
  const steps = ['Customer message', 'AI assistant', 'Workflow automation', 'CRM / team follow-up']
  return `
    <aside class="workflow-visual" aria-label="Customer communication workflow visualization">
      <div class="orbit-glow"></div>
      <div class="message-card customer">
        <span>Incoming</span>
        <strong>“Can I get pricing and availability?”</strong>
      </div>
      <div class="ai-core">
        <span>DBX AI</span>
        <strong>Qualify, answer, route</strong>
      </div>
      <div class="message-card team">
        <span>Team handoff</span>
        <strong>Lead summary sent with next step</strong>
      </div>
      <div class="workflow-line">
        ${steps.map((step, index) => `<div><b>${index + 1}</b><span>${step}</span></div>`).join('')}
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
        'Customer expectations are rising. Manual processes are slowing businesses down.',
        'Many growing businesses rely on small teams, disconnected tools, and manual follow-ups to manage customer conversations. As demand increases, response times slow down, leads get missed, and teams spend too much time on repetitive tasks.'
      )}
      ${renderSimpleCards(problems)}
    </section>
  `
}

function renderSolution() {
  return `
    <section id="solutions" class="split-section">
      <div>
        ${sectionHeading(
          'The Solution',
          'Smarter customer conversations. Simpler business operations.',
          'DBX Solutions designs and implements AI-powered customer experience systems that help businesses respond faster, support customers more consistently, and streamline the way work moves across teams and tools.'
        )}
        <p class="section-note">Instead of adding more complexity, we help your business use AI where it creates real operational value: customer communication, lead qualification, support automation, workflow integration, and process improvement.</p>
      </div>
      ${renderSimpleCards(solutionPillars, 'pillar-grid')}
    </section>
  `
}

function renderServices(full = false) {
  return `
    <section id="services">
      ${sectionHeading(
        'Services',
        'AI solutions designed around your customer journey',
        'Every business has different customer touchpoints, tools, and operational challenges. DBX Solutions helps identify where AI can make the greatest impact, then designs solutions that fit your workflows, team capacity, and business goals.'
      )}
      <div class="services-grid">
        ${services
          .map(
            (service, index) => `
              <article class="service-card">
                <span class="card-index">${String(index + 1).padStart(2, '0')}</span>
                <h3>${service.title}</h3>
                <p>${service.body}</p>
                <div class="service-meta">
                  <div><strong>Best for</strong><span>${service.bestFor}</span></div>
                  <div><strong>Business outcome</strong><span>${service.outcome}</span></div>
                </div>
              </article>`
          )
          .join('')}
      </div>
      ${full ? '' : `<div class="section-actions">${renderActions('Book a Consultation', 'View All Services', 'services/')}</div>`}
    </section>
  `
}

function renderBenefits() {
  return `
    <section id="benefits">
      ${sectionHeading(
        'Business Impact',
        'Built to improve customer experience without overwhelming your team',
        'AI should make business operations easier, not more complicated. DBX Solutions focuses on practical improvements that help teams work faster, respond better, and create a more consistent experience for customers.'
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
        'DBX Solutions uses a practical implementation process designed to understand your business first, then build AI-powered customer experience solutions that fit your operations.'
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
  return `
    <section id="industries">
      ${sectionHeading(
        'Use Cases',
        'AI customer experience solutions for service-driven businesses',
        'DBX Solutions helps SMBs across industries improve how they communicate with customers, manage inquiries, and automate repetitive interactions.'
      )}
      ${renderSimpleCards(industries, 'industry-grid')}
      ${full ? '' : `<div class="section-actions">${renderActions('Book a Consultation', 'Explore Industries', 'industries/')}</div>`}
    </section>
  `
}

function renderTrust() {
  return `
    <section id="trust" class="trust-section">
      ${sectionHeading(
        'Why DBX Solutions',
        'Practical AI implementation with a human-centered approach',
        'Successful AI adoption is not just about technology. It requires clear strategy, thoughtful design, reliable implementation, and ongoing improvement.'
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
  return `
    <section class="cta-panel ${block.final ? 'final-cta' : ''}">
      <span class="eyebrow">${block.final ? 'Next Step' : 'Start Practical'}</span>
      <h2>${block.title}</h2>
      <p>${block.body}</p>
      ${renderActions('Book a Consultation', 'Contact Us', 'contact/')}
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
        <p>DBX Solutions helps small and mid-sized businesses improve customer experience, automate repetitive interactions, and streamline operations with practical AI-powered solutions.</p>
        <strong>Practical AI for better customer experience and smarter business operations.</strong>
      </div>
      <nav aria-label="Footer navigation">
        ${nav.map((item) => `<a href="${href(item.path)}">${item.label}</a>`).join('')}
        <a href="${href('privacy-policy/')}">Privacy Policy</a>
        <a href="${href('terms-of-service/')}">Terms of Service</a>
      </nav>
      <div class="footer-cta">
        <a class="btn btn-primary" href="${CALENDAR_URL}" target="_blank" rel="noopener noreferrer">Book a Consultation</a>
        <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
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
    </div>
  `
  app.innerHTML = translateHtml(html, locale)
  bindInteractions(app, pageKey)
}

import{g as b,a as O,t as B,r as z,b as F,c as N,h as U,i as j,d as P,e as _,f as V}from"./consent-CgNdn57c.js";import{C as S,h as m}from"./constants-DkjYvpf9.js";function Y(e,t,s,o="en"){return`
    <div class="sms-consent-wrap">
      <label class="sms-consent" for="lead-sms-consent">
        <input type="checkbox" name="sms_consent" id="lead-sms-consent" />
        <span>${o==="es"?`Al marcar esta casilla, usted otorga consentimiento expreso previo por escrito para recibir mensajes de texto automatizados de DBX Solutions LLC relacionados con citas, servicios y soporte. La frecuencia de mensajes varía. Pueden aplicar tarifas de mensajes y datos. El consentimiento no es condición de compra. Responda STOP para cancelar y HELP para ayuda. Consulte la <a href="${e}">Política de Privacidad</a> y los <a href="${t}">Términos SMS</a>.`:o==="pt"?`Ao marcar esta caixa, você fornece consentimento expresso prévio por escrito para receber mensagens de texto automatizadas da DBX Solutions LLC relacionadas a consultas, serviços e suporte. A frequência de mensagens varia. Tarifas de mensagens e dados podem ser aplicadas. O consentimento não é condição de compra. Responda STOP para cancelar e HELP para ajuda. Consulte a <a href="${e}">Política de Privacidade</a> e os <a href="${t}">Termos SMS</a>.`:`By checking this box, you provide prior express written consent to receive automated text messages from DBX Solutions LLC related to appointments, services, and support. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out and HELP for help. See <a href="${e}">Privacy Policy</a> and <a href="${t}">SMS Terms</a>.`}</span>
      </label>
      <p id="lead-sms-consent-error" class="field-error" role="alert" hidden>${o==="es"?"Confirme las preferencias de consentimiento SMS antes de enviar.":o==="pt"?"Confirme as preferências de consentimento SMS antes de enviar.":s}</p>
    </div>
  `}function G(e=document){const t=e.querySelector(".mobile-sticky-cta"),s=e.querySelector("main .hero .btn-primary");t&&s&&"IntersectionObserver"in window?new IntersectionObserver(([d])=>{t.classList.toggle("is-available",!d.isIntersecting)}).observe(s):t&&t.classList.add("is-available");const o=[...e.querySelectorAll('[data-motion="reveal"]')];if(!o.length)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver"in window)){o.forEach(c=>c.classList.add("is-signal-visible"));return}const a=new IntersectionObserver(c=>{c.forEach(d=>{d.isIntersecting&&(d.target.classList.add("is-signal-visible"),a.unobserve(d.target))})},{threshold:.14});o.forEach(c=>a.observe(c))}const D="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ZsDyacDZ8oSqHZCMshx3wV8SzGw3MA9KL4hjcU3OIMLJ-3QFRfiV2OjLTn0nKqz526eI3zQk1?gv=true",u="Schedule a diagnostic",R=[{page:"servicesPage",path:"services/",label:"How We Help"},{page:"solutionsPage",path:"solutions/",label:"Examples"},{page:"labsPage",path:"labs/",label:"DBX Labs"},{page:"aboutPage",path:"about/",label:"About"}],Z=[{path:"privacy-policy/",label:"Privacy Policy"},{path:"terms-of-service/",label:"Terms of Service"},{path:"sms-terms/",label:"SMS Terms"},{path:"data-handling-notice/",label:"Data Handling Notice"},{path:"responsible-ai-policy/",label:"Responsible AI Policy"},{path:"security-roadmap/",label:"Security Roadmap"}],Q=[...R,{page:"industriesPage",path:"industries/",label:"Industries"},{page:"productsPage",path:"packages/",label:"Products and initiatives"},{page:"contactPage",path:"contact/",label:"Contact"}],J=[["Missed follow-up leaves money on the table","A good opportunity can disappear between messages, notes, and the next task."],["Copying information raises operating costs","Your team spends paid time moving the same details between chats, spreadsheets, email, and the CRM."],["Document work uses expensive professional time","Skilled people spend hours finding, comparing, and organizing information before they can make a decision."]],K=[{title:"A request arrives",body:"Through WhatsApp, chat, email, or a form—the channels people already use."},{title:"The information is organized",body:"The workflow collects the details needed for a useful next step."},{title:"Your tools stay current",body:"When technically possible, the approved details reach your CRM, calendar, or team alerts."},{title:"Your team stays in control",body:"People step in for judgment calls, follow-up, and closing."}],ee=[["Customer conversations","Organize requests from WhatsApp, chat, email, or forms and route the next step to the right person."],["Document-heavy professional work","Prepare, compare, and organize information while the professional keeps review and final judgment."],["Connected tools and follow-up","When technically possible, move approved information into the CRM, calendar, support tool, or team alert without retyping it."]],L=[{title:"Find where time or money is being lost",icon:"01",core:!0,badge:"Start here",body:"We look for repeated work, slow responses, missed follow-up, and other places where a better process could lower cost or protect revenue.",goodIf:"You want AI to help but are not sure which problem is worth paying to solve.",outcome:"One business goal, a starting measure, and a clear reason to act.",learnHref:"services/"},{title:"Build a clear AI plan around one goal",icon:"02",core:!0,badge:"Product delivery",body:"We explain the work in business language, define what is included, and match the AI to your information, people, and way of working.",goodIf:"You need a simple scope, a clear investment path, and no technical guesswork.",outcome:"A practical plan with a defined price, responsibility, and result to measure.",learnHref:"packages/"},{title:"Connect AI to the tools you already pay for",icon:"03",body:"When possible, we connect AI with your CRM, forms, calendars, databases, support tools, and existing systems.",goodIf:"Your team pays for useful tools but still copies information or loses context between them.",outcome:"Less manual work without the cost and disruption of replacing everything."},{title:"Test before risking customer trust",icon:"04",body:"We test common requests, difficult cases, access, wrong answers, and the moments when a person must take over.",goodIf:"The work affects customers, professionals, money, or important decisions.",outcome:"Clear limits and fewer avoidable mistakes before customers depend on it."},{title:"Make it easy for your team to use",icon:"05",body:"We prepare the people, responsibilities, help paths, and simple instructions needed to use the solution in real work.",goodIf:"You do not want to pay for technology that your team cannot use confidently.",outcome:"A practical launch with clear ownership and less confusion."},{title:"Measure the result and improve it",icon:"06",core:!0,badge:"We run it with you",body:"After launch, we compare the result with the starting measure and review cost, exceptions, changes, and opportunities to improve.",goodIf:"You want to know whether the plan is paying for itself before spending more.",outcome:"Evidence to keep, change, or expand the plan based on business value.",learnHref:"#managed-ai-operations"}],te=[["Faster response times","Give customers a useful answer or next step while intent is still high."],["Fewer missed opportunities","Capture and route inquiries before prospects lose interest or choose another provider."],["Reduced manual workload","Move repetitive questions and routing out of your team's daily queue."],["More consistent customer communication","Keep answers clear, approved, and aligned across channels and team handoffs."],["Better operational visibility","Turn conversations into structured information your team can review and act on."],["More conversations without hiring first","Handle more routine messages while your team focuses on higher-value work."]],E=["Launch","Review chats","Adjust","Improve"],se=[{num:"01",title:"Review real chats",body:"Catch confusing replies or bad handoffs before they cost you sales."},{num:"02",title:"See what is working",body:"Spot repeat questions and where your team still loses time."},{num:"03",title:"Update your answers",body:"Refresh prices, hours, services, and tone when your business changes."},{num:"04",title:"Improve follow-up",body:"Fix routes so no lead sits waiting without a next step."}],oe=[{title:"Choose the money goal",body:"Decide whether the first goal is to reduce operating time, avoid missed sales, improve follow-up, or handle more work.",items:["Choose one costly problem","Name the person responsible","Agree on the business result","Keep the first scope small"]},{title:"Measure how it works today",body:"Record the current time, delays, repeated work, or missed follow-up so there is a fair starting point for comparison.",items:["Count time and repeated steps","Review delays and mistakes","Choose a simple measure","Define what success means"]},{title:"Put AI to work",body:"We handle the technology, connect the necessary tools, test difficult cases, and prepare your team to use it.",items:["Set up the AI","Connect only what is needed","Test before launch","Keep people in control"]},{title:"Compare cost and result",body:"Review what changed, what it cost, and whether the benefit is strong enough to keep improving or expand.",items:["Compare with the starting measure","Review cost and value","Fix what is not working","Expand only with evidence"]}],W=[{priority:!0,title:"Professional services",body:"Structure intake, document review, research, comparisons, and follow-up while professionals retain judgment.",example:"Example: A request arrives conversationally, becomes a structured case, and reaches the right professional with context."},{priority:!0,title:"Legal teams",body:"Assist with document-intensive analysis, clause comparison, information organization, and controlled research.",example:"Example: AI prepares a structured analysis while the lawyer reviews the sources, applies legal judgment, and approves the work."},{priority:!0,title:"Accounting and advisory",body:"Support repeatable intake, reconciliation preparation, document organization, and analytical workflows.",example:"Example: Records are classified and exceptions are surfaced before the accountant performs professional review."},{priority:!0,title:"Customer operations",body:"Collect quote details—service type, location, photos—so your team replies with accurate next steps, not repeat questions.",example:"Example: WhatsApp intake captures the request, structures the data, updates the CRM, and routes exceptions to a person."},{title:"Content operations",body:"Create, review, organize, and learn from repeatable generative content workflows.",example:"Example: A structured brief guides asset generation, review, reporting, and reuse across a campaign."},{title:"Education and training",body:"Make AI knowledge easier to understand while supporting program intake, guidance, and learning workflows.",example:"Example: AprendoIA.com translates complex AI concepts into simple, engaging learning for everyday users."},{title:"Public and administrative workflows",body:"Guide users through repeatable applications and requests when documented requirements and suitable APIs are available.",example:"Example: A conversational intake produces a structured application for review and submission through an available system."}],ae=[["Built for growing businesses","Practical help without enterprise-level complexity or long consulting projects."],["Business first","We start with how customers reach you and what your team needs—not with a technology pitch."],["Human-supervised AI","AI supports your team while escalation, review, and judgment stay available when needed."],["Fits your existing tools","We connect WhatsApp, chat, CRM, and alerts to how you already work."],["Tied to real outcomes","Every project links to faster replies, cleaner follow-up, or less repeat work."],["Improves after launch","We review real conversations and adjust answers and routes over time."]],ne=[["Repeatable use cases","We focus on workflows that can be tested, measured, and improved before they are productized."],["Controlled outputs","Approved information, structured outputs, rules, and evaluations reduce unsupported responses."],["Human judgment retained","Professionals review sensitive, uncertain, or high-impact decisions."]],re=[{value:"40% vs. 11.9%",title:"Small businesses are still behind",body:"Across OECD countries, 40% of large companies used AI, compared with 11.9% of businesses with 10–49 employees.",meaning:"The practical opportunity is to start small with one process that saves time or improves follow-up.",source:"OECD, 2025",sourceUrl:"https://doi.org/10.1787/426399c1-en"},{value:"66%",title:"AI usually supports people",body:"Among U.S. businesses using AI, 66% reported using it only to help people perform tasks; only 2% reported AI-related employment decreases.",meaning:"The goal is to help the current team handle more useful work while people keep judgment and control.",source:"U.S. Census Bureau working paper, 2026",sourceUrl:"https://www.census.gov/library/working-papers/2026/adrm/CES-WP-26-25.html"}],ie=[["How can DBX help my business financially?","We first look for work that consumes paid time, slows sales, loses follow-up, or limits how much your team can handle. Then we use AI only where it can support a measurable business goal."],["How will I know if the plan is working?","Before launch, we agree on a starting measure such as time spent, response speed, completed follow-up, or work handled. After launch, we compare the result with that starting point."],["Do I need to understand AI or technology?","No. You explain the business problem in your language. DBX handles the necessary AI, connections, testing, and technical details."],["What will it cost?","The price depends on the goal, product, connections, usage, and support required. We define the scope and price before you commit, then start with a size you can evaluate."],["Can DBX work with WhatsApp?","Yes. WhatsApp remains an important channel alongside web chat, SMS, forms, email, APIs, and existing business systems."],["Can DBX connect with the tools we already use?","When technically possible, we connect with CRMs, calendars, support tools, APIs, databases, and older business systems."],["Will AI replace our people?","The first goal is to help the team you already have handle more useful work. People keep judgment, review, and responsibility where they are needed."]],q=[{status:"Service example",title:"Customer conversations and follow-up",body:"Turn WhatsApp, chat, email, forms, and customer requests into organized information, next steps, and clear handoffs to your team.",audience:"For growing businesses that need faster service, lead intake, and follow-up."},{status:"Pilot",title:"LexiaTek",body:"Helps legal teams read, compare, and organize document-heavy work while the lawyer reviews the sources and makes the final decision.",audience:"A related legal technology venture and a working example of the DBX Labs model."},{status:"Concept",title:"GABS — Generative Artistic Business Systems",body:"A concept for a platform intended to make content easier to create, review, organize, and reuse through a repeatable process.",audience:"For businesses, professionals, creators, and agencies that need repeatable content operations."},{status:"Paused",title:"AprendoIA.com",body:"A paused concept for accessible AI education in Colombia. No program or availability is currently being offered.",audience:"Availability and program details would be announced only after they are confirmed."},{status:"Exploration",title:"Help for document-heavy professional work",body:"Support for accounting, document review, comparison, research, and other repeated tasks that take professional time.",audience:"An exploration to be evaluated with domain professionals who would define the rules and retain final judgment."},{status:"Research",title:"Guided applications and public requests",body:"Research into whether guided conversations can help collect information for applications and permits when documented requirements and suitable systems are available.",audience:"A DBX Labs research direction for repeatable public and administrative processes."}],le=[["Find the problem","Choose work that costs time, repeats often, and has a clear owner."],["Make the process clear","Define what information is needed, what a good result looks like, and where a person decides."],["Build the solution","Connect AI with the information, tools, APIs, and systems the work needs."],["Test the difficult cases","Check wrong answers, missing information, unusual requests, access, and human handoffs."],["Try it in real work","Run a controlled pilot with the professionals and teams who own the process."],["Turn it into a product","Package what works so it can be set up and supported for more customers."]],T=[{name:"Ricardo De Biase",role:"Founder & Managing Lead — Portfolio and Operations",experience:"Leads portfolio and operations.",profile:"https://www.linkedin.com/in/ricardo-de-biase/"},{name:"Michele Aguilar",role:"Executive Owner / Group Lead — Legal, Contracts & Human Resources",experience:"Leads legal, contracts, and people operations.",profile:""},{name:"Alejandro Aguilar",role:"Group Lead — Architecture, Product, Engineering & Integrations",experience:"Leads architecture, product, engineering, and integrations.",profile:"https://www.linkedin.com/in/carlosalejandroaguilar/"},{name:"Juan R. Berrios",role:"Group Lead — Solutions, Support & Customer Delivery",experience:"Leads solutions, support, and customer delivery.",profile:"https://www.linkedin.com/in/juan-r-berrios-89910879/"},{name:"Sanjeet Sanda",role:"Group Lead — Cloud, Platform, Security & Resilience",experience:"Leads cloud, platform, security, and resilience.",profile:"https://www.linkedin.com/in/sanjeetsanda/"}],H={home:{title:"DBX Solutions | Practical AI for Small and Midsize Businesses",description:"DBX Solutions helps small and midsize businesses reduce repetitive work with practical AI connected to the tools they already use.",hero:{eyebrow:"Practical AI for small and midsize businesses",headline:"Keep work moving—without adding more to your team.",body:"DBX identifies a repetitive task that consumes time or slows follow-up, connects AI to the tools you already use, and tests it with your team. Start with one process, measure the result, and expand only if it works.",microcopy:"Tell us which process repeats or gets stuck. We will review whether there is a useful, measurable first step.",primary:u,secondary:"See how it works",secondaryHref:"#services"},blocks:[{type:"problem"},{type:"services"},{type:"useCasesPreview"},{type:"enterpriseValue"},{type:"labsSeal"},{type:"faq"},{type:"cta",final:!0,title:"Start with one repeated task worth improving",body:"Bring the task, the tools involved, and what slows the work today. We will help define a practical first step and a result your team can evaluate.",note:"One task. One starting measure. One clear next decision.",primary:u}]},solutionsPage:{title:"DBX Solutions | Practical AI Use Cases",description:"Practical AI use cases for customer operations, professional work, integrations, and repeatable business workflows.",hero:{eyebrow:"Solutions",headline:"See where practical AI can reduce repeated work",body:"These are examples to evaluate with your team—not promises that every process should be automated or that every result is already proven.",primary:u,secondary:"See how we help",secondaryHref:"services/"},blocks:[{type:"solutionsPage"},{type:"cta",title:"Not sure which process to improve first?",body:"Start with one repeated task, one clear owner, and one result your team can evaluate.",note:"We will help identify practical opportunities before recommending technology.",secondary:"View Services",secondaryHref:"services/"}]},servicesPage:{title:"DBX Solutions | How We Make AI Work in Your Business",description:"See how DBX finds a useful starting point, connects the tools you already use, tests the solution, and keeps it useful.",hero:{eyebrow:"How it works",headline:"Start with one task. Keep what already works.",body:"We help you choose a useful process, set up the solution, connect your tools, test it with your team, and improve it after launch.",primary:u,secondary:"See Examples",secondaryHref:"solutions/"},blocks:[{type:"enterpriseValue"},{type:"services",full:!0},{type:"managedOps"},{type:"cta",title:"What would you like to make easier?",body:"Tell us what your team repeats today. We will help you identify a clear first step.",note:"Keep your current tools. Start small. Expand when it works.",secondary:"See Examples",secondaryHref:"solutions/"}]},productsPage:{title:"DBX Solutions | AI Products and Initiatives",description:"Explore DBX products and initiatives for conversational operations, legal work, content, education, and knowledge workers.",hero:{eyebrow:"Products",headline:"Products and initiatives at clearly labeled stages",body:"DBX Labs builds focused solutions, validates them with domain experts, and productizes the workflows that can be deployed repeatedly and supported responsibly.",primary:u,secondary:"See How It Works",secondaryHref:"services/"},blocks:[{type:"products"},{type:"pricingNote"},{type:"cta",title:"Which product or workflow fits your organization?",body:"We will clarify readiness, implementation scope, integrations, and the human review required before recommending a path.",note:"Status is shown openly: service example, pilot, concept, paused, exploration, or research.",secondary:"View Services",secondaryHref:"services/"}]},labsPage:{title:"DBX Labs | The Product Factory of DBX Solutions",description:"DBX Labs turns real, repeatable business needs into practical AI products that can be set up, supported, and improved.",hero:{eyebrow:"DBX Labs",headline:"From a real need to a repeatable AI product",body:"DBX Labs is the product factory of DBX Solutions. We structure the work, connect AI with trusted knowledge and tools, evaluate the risks, validate with people who own the process, and productize what proves useful.",primary:u,secondary:"Explore Products",secondaryHref:"packages/"},blocks:[{type:"labsProcess"},{type:"controlModel"},{type:"products",preview:!0},{type:"cta",title:"Have a repetitive process that should work better?",body:"Bring the process owner, sample inputs, expected outputs, and the exceptions that require human judgment.",note:"A concept becomes a product only after controlled validation.",secondary:"View Services",secondaryHref:"services/"}]},industriesPage:{title:"DBX Solutions | Practical AI by Industry",description:"Practical AI for legal work, customer operations, education, local services, and other document-heavy or regulated work.",hero:{eyebrow:"Industries",headline:"Where repeatable work, knowledge, and customer needs meet",body:"DBX focuses on processes with clear inputs, repeatable steps, measurable outputs, and defined moments for professional judgment. These are illustrative examples to evaluate—not claims of completed DBX implementations or guaranteed results.",primary:u,secondary:"View Services",secondaryHref:"services/"},blocks:[{type:"industries",full:!0},{type:"note",title:"Regulated sectors",body:"For healthcare, financial services, legal, insurance, and other regulated industries, AI should support communication efficiency—not replace professional advice, compliance review, clinical judgment, legal judgment, or required human oversight. Read our Responsible AI Policy for more detail."},{type:"cta",title:"See how a controlled AI workflow could work in your sector",body:"Bring the process, common inputs, expected result, and exceptions. We will help map practical next steps.",note:"Designed around your business, not a generic template.",secondary:"View Services",secondaryHref:"services/"}]},aboutPage:{title:"DBX Solutions | About",description:"DBX Solutions helps growing businesses turn AI into better customer experiences through practical, human-centered implementation.",hero:{eyebrow:"About DBX Solutions",headline:"Big-company experience, made useful for growing businesses",body:"Our leadership covers portfolio operations, legal and people operations, product and engineering, customer delivery, cloud, and security. DBX applies that combined perspective to planning, testing, access, operations, and human responsibility.",primary:u,secondary:"Contact Us",secondaryHref:"contact/"},blocks:[{type:"textSplit",sections:[{title:"Our mission",body:"We democratize practical AI for small and mid-sized businesses by turning repeatable needs into accessible products and supported implementations."},{title:"Our approach",body:"We begin with the business process, structure the information, connect the right tools, define human responsibility, and improve the solution with measured evidence."}]},{type:"enterpriseValue"},{type:"leadership"},{type:"values",items:[["We keep it practical","We focus on use cases that solve real business problems."],["People stay in the loop","AI should support customers and your team—not create confusion."],["Built around how you work","Solutions should fit your tools and daily routines."],["Tied to a real goal","Every implementation should connect to a measurable business outcome."],["Improves after launch","We review real chats and adjust answers and routes over time."]]},{type:"cta",title:"Want to see how this applies to your business?",body:"Schedule a diagnostic to review your channels and identify the first practical improvement to make.",note:"No pressure—just a focused conversation about what would help your team most.",secondary:"See How It Works",secondaryHref:"#process"}]},dataHandlingPage:{title:"DBX Solutions | Data Handling Notice",description:"How DBX Solutions approaches customer and business data in AI implementations, integrations, and ongoing operations.",hero:{eyebrow:"Data handling",headline:"Data Handling Notice",body:"DBX designs customer flows around approved business information, controlled access, and clear limits on what systems process and store. For website visitor data, see our Privacy Policy.",primary:u,secondary:"Contact Us",secondaryHref:"contact/"},blocks:[{type:"note",title:"Our approach",body:"DBX Solutions builds data handling practices for client implementations—approved content sources, controlled access, and secure integration planning. This notice covers project work, not website privacy (see Privacy Policy)."},{type:"policyList",title:"What we prioritize",items:["Using approved business content as the source for customer-facing answers","Limiting access to systems and data required for each customer flow","Designing integrations so useful context reaches your CRM or team—not open-ended data exposure","Documenting what is processed, stored, and retained per project scope","Aligning with your privacy policy, SMS terms, and industry requirements where applicable"]}]},responsibleAiPage:{title:"DBX Solutions | Responsible AI Policy",description:"How DBX Solutions applies human oversight, escalation paths, and approved business information in customer-facing AI.",hero:{eyebrow:"Responsible AI",headline:"Responsible AI Policy",body:"DBX implements customer-facing AI with clear escalation paths, approved business information, and human review—not unconstrained automation.",primary:u,secondary:"Contact Us",secondaryHref:"contact/"},blocks:[{type:"policyList",title:"Working principles",items:["Accuracy and clarity over speed alone","Human escalation for sensitive, uncertain, or high-stakes requests","Clear limits on what AI can answer or act on","Transparent use of approved business information","Continuous improvement based on real customer interactions"]},{type:"note",title:"Regulated industries",body:"For healthcare, financial services, legal, insurance, and other regulated contexts, AI supports communication and workflow efficiency. It does not replace professional advice, compliance review, clinical judgment, legal judgment, or required human oversight."}]},securityRoadmapPage:{title:"DBX Solutions | Security Roadmap",description:"DBX Solutions security and compliance roadmap—presented as readiness work, not completed certifications unless formally obtained.",hero:{eyebrow:"Security roadmap",headline:"Security Roadmap",body:"DBX aligns operations with recognized security practices. Items below are roadmap or readiness work unless explicitly marked complete. We document planned vs. completed work so you know what is in progress.",primary:u,secondary:"Contact Us",secondaryHref:"contact/"},blocks:[{type:"roadmap",eyebrow:"Roadmap / In progress",title:"Security and compliance roadmap",body:"These items reflect planned or in-progress alignment work—not claims of completed certification unless formally obtained.",items:["SOC 2 Type I readiness","SOC 2 Type II future readiness","ISO/IEC 27001 alignment","Data Processing Agreement readiness","Privacy Policy and Terms of Service","Internal data handling procedures","Responsible AI usage policy","Vendor security review process"],disclaimer:"Certifications listed here are roadmap items only. DBX Solutions does not claim completed certification unless formally obtained and published."}]},contactPage:{title:"DBX Solutions | Contact",description:"Schedule a diagnostic with DBX Solutions to review one repeatable workflow, integration, or practical AI opportunity.",hero:{eyebrow:"Contact",headline:"Let’s review one repeated task worth improving",body:"Use the calendar to schedule a diagnostic, or prepare a short email request below. We will review the task, the tools involved, and a result worth measuring.",microcopy:"A conversation does not create a contract or commit you to a project.",primary:u,secondary:"Email Us",secondaryHref:`mailto:${S}`},blocks:[{type:"contact"}]}};function ce(e,t){document.title=e.title;const s=document.querySelector('meta[name="description"]');s&&s.setAttribute("content",e.description);const o=Ge[t]||"",r=new URL(o,"https://dbx-solutions.com/").href;let a=document.querySelector('link[rel="canonical"]');a||(a=document.createElement("link"),a.rel="canonical",document.head.appendChild(a)),a.href=r;const c={"og:type":"website","og:title":e.title,"og:description":e.description,"og:url":r};Object.entries(c).forEach(([d,x])=>{let n=document.querySelector(`meta[property="${d}"]`);n||(n=document.createElement("meta"),n.setAttribute("property",d),document.head.appendChild(n)),n.setAttribute("content",x)})}function X(e){return e.startsWith("http")?' target="_blank" rel="noopener noreferrer"':""}function y(e){if(e==="CALENDAR_URL")return D;if(e?.startsWith("mailto:"))return e;if(e?.startsWith("#")){const t=m("");return`${t.endsWith("/")?t.slice(0,-1):t}${e}`}return m(e||"")}function C(e=u,t,s){const o=y("CALENDAR_URL"),r=u;return`
    <div class="actions">
      <a class="btn btn-primary" data-track="schedule_click" data-cta-id="primary" href="${o}"${X(o)}>${r}</a>
      ${t?`<a class="btn btn-secondary" href="${y(s)}"${X(y(s))}>${t}</a>`:""}
    </div>
  `}function de(e){return`
    <header class="site-header">
      <a href="${m("")}" class="logo" aria-label="DBX Solutions home">
        <img src="${m("logo.png")}" alt="DBX Solutions" />
      </a>
      <nav id="primary-nav" aria-label="Primary navigation">
        ${R.map(t=>`<a href="${m(t.path)}" ${t.page===e?'aria-current="page"':""}>${t.label}</a>`).join("")}
      </nav>
      <div class="header-actions">
        ${_(b())}
        <a class="btn btn-primary header-book" href="${D}" target="_blank" rel="noopener noreferrer">${u}</a>
      </div>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
        <span class="sr-only">Toggle navigation</span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
      </button>
    </header>
  `}const pe={solutionsPage:"Repeatable use cases with people in control.",productsPage:"A portfolio with openly labeled maturity.",servicesPage:"Implementation tied to your systems and operation.",industriesPage:"Sector workflows—not one-size-fits-all templates.",labsPage:"Discover. Structure. Build. Evaluate. Productize.",aboutPage:"Experienced leaders across the full product lifecycle.",contactPage:"Calendar for speed, form for a short note.",dataHandlingPage:"How we handle data in client projects.",responsibleAiPage:"Escalation paths and clear AI limits.",securityRoadmapPage:"Planned work—not claimed certifications."};function ue(e,t){return e===H.home?`
      <section class="hero home-hero signal-hero" id="top">
        <div class="hero-copy" data-motion="reveal">
          ${e.hero.eyebrow?`<span class="hero-eyebrow">${e.hero.eyebrow}</span>`:""}
          <h1>${e.hero.headline}</h1>
          <p>${e.hero.body}</p>
          ${e.hero.microcopy?`<p class="hero-trust">${e.hero.microcopy}</p>`:""}
          ${C(e.hero.primary,e.hero.secondary,e.hero.secondaryHref)}
        </div>
        ${me()}
      </section>
    `:`
    <section class="hero" id="top">
      <div class="hero-copy">
        <span class="eyebrow">${e.hero.eyebrow}</span>
        <h1>${e.hero.headline}</h1>
        <p>${e.hero.body}</p>
        ${e.hero.microcopy?`<p class="hero-trust">${e.hero.microcopy}</p>`:""}
        ${C(e.hero.primary,e.hero.secondary,e.hero.secondaryHref)}
      </div>
      ${he(e.hero.eyebrow,t)}
    </section>
  `}function me(){return`
    <aside class="signal-diagnostic" aria-labelledby="signal-diagnostic-title" data-motion="reveal">
      <span class="signal-diagnostic-kicker">Explore before scheduling</span>
      <h2 id="signal-diagnostic-title">Where does work get stuck most often?</h2>
      <div class="signal-diagnostic-options" role="radiogroup" aria-label="Choose a repeated-work example">
        <button type="button" role="radio" data-diagnostic-option="followup" aria-checked="true" tabindex="0">Customer follow-up</button>
        <button type="button" role="radio" data-diagnostic-option="documents" aria-checked="false" tabindex="-1">Document-heavy work</button>
        <button type="button" role="radio" data-diagnostic-option="systems" aria-checked="false" tabindex="-1">Information between systems</button>
      </div>
      <p class="signal-diagnostic-result" data-diagnostic-result aria-live="polite">Possible first step: review where the next customer contact is lost and which tool should receive it.</p>
      <div class="signal-path" aria-label="Illustrative path from friction to a human decision">
        <div class="signal-bubble signal-bubble-friction" data-motion="signal"><span>01</span><strong>Work stalls</strong></div>
        <i aria-hidden="true"></i>
        <div class="signal-bubble signal-bubble-dbx" data-motion="signal"><span>02</span><strong>DBX organizes</strong></div>
        <i aria-hidden="true"></i>
        <div class="signal-bubble signal-bubble-human" data-motion="signal"><span>03</span><strong>Your team decides</strong></div>
      </div>
      <p class="signal-example-note">Illustrative example—the scope depends on the process and available systems.</p>
    </aside>
  `}function he(e,t){const s=pe[t]||"Practical help mapped to how customers reach you.";return`
    <aside class="page-signal" aria-label="${e} visual summary">
      <span>${e}</span>
      <strong>${s}</strong>
      <div class="signal-grid">
        <i></i><i></i><i></i><i></i>
      </div>
    </aside>
  `}function i(e,t,s){return`
    <div class="section-heading">
      <span class="eyebrow">${e}</span>
      <h2>${t}</h2>
      ${s?`<p>${s}</p>`:""}
    </div>
  `}function A(e,t="card-grid"){return`<div class="${t}">${e.map(([s,o],r)=>`
        <article class="content-card">
          <span class="card-index">${String(r+1).padStart(2,"0")}</span>
          <h3>${s}</h3>
          <p>${o}</p>
        </article>`).join("")}</div>`}function ge(){return`
    <section id="challenge" class="challenge-section signal-friction-section" data-motion="reveal">
      ${i("What gets stuck today","Small delays become expensive when they repeat","Slow responses, missed follow-up, and repeated copying can increase cost or let a useful opportunity disappear.")}
      <div class="signal-friction-layout">
        <p class="signal-friction-statement">Before choosing technology, identify the moment when work stops moving.</p>
        <ol class="challenge-points signal-friction-list">
          ${J.map(([e,t],s)=>`
                <li>
                  <span class="signal-friction-number">${String(s+1).padStart(2,"0")}</span>
                  <strong>${e}</strong>
                  <span>${t}</span>
                </li>`).join("")}
        </ol>
      </div>
    </section>
  `}function ye(){return`
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
  `}function fe(){return`
    <section id="solutions" class="section">
      ${i("The Solution","Customer messages turn into team action—without the manual chaos.","DBX connects how customers reach you with what your team needs to do next.")}
      <div class="solution-panel">
        ${ye()}
        <ul class="solution-stages">
          ${K.map(e=>`
                <li>
                  <strong>${e.title}</strong>
                  <span>${e.body}</span>
                </li>`).join("")}
        </ul>
        <p class="solution-footnote">Human-supervised. Your tools. Your rules.</p>
      </div>
    </section>
  `}function we(){return`
    <section id="examples" class="section signal-examples-section" data-motion="reveal">
      ${i("See the work move","Three useful scenarios to explore first","Choose a recognizable situation and follow it from the request to the human decision. These are examples to evaluate, not promised results.")}
      ${A(ee,"card-grid")}
      <p class="section-more"><a class="learn-link" href="${y("solutions/")}">See more examples</a></p>
    </section>
  `}function M(){return`
    <div class="services-visual" aria-label="How DBX turns one money goal into a measurable AI plan">
      <div class="services-journey">
        <div class="services-journey-step">
          <span class="services-journey-dot" aria-hidden="true"></span>
          <span>Find the goal</span>
        </div>
        <span class="services-journey-arrow" aria-hidden="true">→</span>
        <div class="services-journey-step services-journey-step-hub">
          <span class="services-journey-dot" aria-hidden="true"></span>
          <span>Measure today</span>
        </div>
        <span class="services-journey-arrow" aria-hidden="true">→</span>
        <div class="services-journey-step">
          <span class="services-journey-dot" aria-hidden="true"></span>
          <span>Set up AI</span>
        </div>
        <span class="services-journey-arrow" aria-hidden="true">→</span>
        <div class="services-journey-step">
          <span class="services-journey-dot" aria-hidden="true"></span>
          <span>Test</span>
        </div>
        <span class="services-journey-arrow" aria-hidden="true">→</span>
        <div class="services-journey-step">
          <span class="services-journey-dot" aria-hidden="true"></span>
          <span>Measure results</span>
        </div>
      </div>
    </div>
  `}function ve(e=!1){const t=e?L:L.slice(0,3);if(!e){const s=[["Diagnose","Choose one repeated task and define why it is worth improving."],["Connect","Use only the approved information and tools the process needs."],["Test","Try the workflow with the team and keep clear human limits."],["Measure","Compare the result with the starting point before expanding."]];return`
      <section id="services" class="section signal-method-section" data-motion="reveal">
        ${i("A practical route","Diagnose. Connect. Test. Measure.","The method moves from one business friction to a decision your team can evaluate—without buying more technology than the work needs.")}
        <ol class="signal-method-timeline">
          ${s.map(([o,r],a)=>`<li data-motion="reveal"><span>0${a+1}</span><strong>${o}</strong><p>${r}</p></li>`).join("")}
        </ol>
        <p class="section-more"><a class="learn-link" href="${y("services/")}">View how DBX helps</a></p>
      </section>
    `}return`
    <section id="services" class="section">
      ${i("A clear plan for your money and your business","First choose what should cost less or produce more","We define the business goal, measure how it works today, and use only the AI and technology needed to improve it.")}
      <div class="services-panel">
        ${M()}
        <ul class="services-stages">
          ${t.map(s=>`
                <li class="services-stage ${s.core?"services-stage-core":""}">
                  <span class="services-stage-num" aria-hidden="true">${s.icon}</span>
                  <div class="services-stage-content">
                    <div class="services-stage-head">
                      <strong>${s.title}</strong>
                      ${s.badge?`<span class="services-stage-badge">${s.badge}</span>`:""}
                    </div>
                    <p>${s.body}</p>
                    <div class="services-stage-chips">
                      <span class="services-chip"><em>Good if you</em> ${s.goodIf}</span>
                      <span class="services-chip services-chip-outcome"><em>What changes</em> ${s.outcome}</span>
                    </div>
                    ${s.learnHref?`<a class="learn-link" href="${y(s.learnHref)}">Explore service</a>`:""}
                  </div>
                </li>`).join("")}
        </ul>
        ${e?"":`<p class="section-more"><a class="learn-link" href="${y("services/")}">View all services</a></p>`}
      </div>
    </section>
  `}function be(){return`
    <div class="managed-visual" aria-label="Ongoing support cycle from launch to improvement">
      <div class="managed-loop">
        ${E.map((e,t)=>`
          ${t>0?'<span class="managed-loop-arrow" aria-hidden="true">→</span>':""}
          <div class="managed-loop-step${t===0?" managed-loop-step-start":t===E.length-1?" managed-loop-step-end":""}">
            <span class="managed-loop-dot" aria-hidden="true"></span>
            <span>${e}</span>
          </div>`).join("")}
      </div>
    </div>
  `}function $e(){return`
    <section id="managed-ai-operations" class="section managed-section">
      ${i("Ongoing support","AI does not stop working after launch day.","After WhatsApp and your flows go live, most SMB owners worry about outdated replies, stuck leads, or losing control. DBX stays with you to review, adjust, and improve—without you watching everything alone.")}
      <div class="managed-panel">
        ${be()}
        <ul class="managed-stages">
          ${se.map(e=>`
            <li class="managed-stage">
              <span class="managed-stage-num" aria-hidden="true">${e.num}</span>
              <div class="managed-stage-content">
                <strong>${e.title}</strong>
                <p>${e.body}</p>
              </div>
            </li>`).join("")}
        </ul>
        <p class="managed-footnote">Human-supervised. Your tools. Your rules.</p>
      </div>
    </section>
  `}function ke(){return`
    <section id="benefits">
      ${i("Business Impact","Operational improvements your team and customers can feel.","DBX focuses on outcomes your team and customers can feel—clearer replies, easier follow-up, and less repeat work.")}
      ${A(te,"benefit-grid")}
    </section>
  `}function Se(){return`
    <section id="process" class="process-section">
      ${i("A simple and measurable plan","Know the goal, cost, and result before you grow the plan","Start small, compare the result with the starting point, and spend more only when the numbers and business value make sense.")}
      <div class="process-track">
        ${oe.map((e,t)=>`
              <article class="step-card">
                <span>${String(t+1).padStart(2,"0")}</span>
                <h3>${e.title}</h3>
                <p>${e.body}</p>
                <ul>${e.items.map(s=>`<li>${s}</li>`).join("")}</ul>
              </article>`).join("")}
      </div>
    </section>
  `}function Ae(e=!1){const t=W.filter(r=>r.priority),s=W.filter(r=>!r.priority),o=r=>r.map((a,c)=>`
          <article class="content-card ${a.priority?"priority-card":""}">
            <span class="card-index">${String(c+1).padStart(2,"0")}</span>
            <h3>${a.title}</h3>
            <p>${a.body}</p>
            ${a.example?`<p class="industry-example">${a.example}</p>`:""}
          </article>`).join("");return`
    <section id="industries">
      ${i("Industries","Focused on sectors with repeatable work and clear professional responsibility.","DBX is especially useful when natural-language requests can become structured inputs, controlled actions, and reviewable outputs.")}
      <div class="industry-group">
        <h3>Priority sectors and workflows</h3>
        <div class="industry-grid priority-grid">${o(t)}</div>
      </div>
      ${e?`<div class="industry-group additional-group">
        <h3>Additional sectors</h3>
        <div class="industry-grid additional-grid">${o(s)}</div>
      </div>`:`<p class="section-more"><a class="learn-link" href="${y("industries/")}">View all industries</a></p>`}
    </section>
  `}function xe(){return`
    <section id="trust" class="trust-section">
      ${i("Why DBX Solutions","Accessible AI backed by product, delivery, and operational leadership.","DBX combines practical products with hands-on setup and ongoing improvement around how your organization actually works.")}
      ${A(ae,"trust-grid")}
    </section>
  `}function Pe(){return`
    <section id="faq" class="faq-section">
      ${i("FAQ","Simple answers about money, results, and AI")}
      <div class="faq-list">
        ${ie.map(([e,t])=>`
              <details>
                <summary>${e}</summary>
                <p>${t}</p>
              </details>`).join("")}
      </div>
    </section>
  `}function Ie(){return`
    <section id="proof" class="proof-section">
      ${i("Results","Designed for evidence, control, and repeatability","We do not publish unsupported performance claims. Each implementation defines the quality, operational, and business measures it must prove.")}
      <div class="proof-panel">
        <ul class="proof-outcomes" aria-label="Typical outcomes after launch">
          ${ne.map(([e,t])=>`
                <li>
                  <strong>${e}</strong>
                  <span>${t}</span>
                </li>`).join("")}
        </ul>
      </div>
    </section>
  `}function Ce(){return`
    <section id="market-evidence" class="market-evidence-section">
      ${i("Why consider AI now","A small team can produce more without making the business more complicated","The data shows that smaller businesses still use AI less than large companies and that most business use supports people rather than replacing them. These are market statistics, not DBX results.")}
      <div class="market-stat-grid">
        ${re.map(e=>`
          <article class="market-stat-card">
            <strong class="market-stat-value">${e.value}</strong>
            <h3>${e.title}</h3>
            <p>${e.body}</p>
            <p class="market-stat-meaning">${e.meaning}</p>
            <a href="${e.sourceUrl}" target="_blank" rel="noopener noreferrer">Source: ${e.source}</a>
          </article>
        `).join("")}
      </div>
    </section>
  `}function De(){return`
    <section id="enterprise-practices" class="enterprise-practices-section signal-control-section" data-motion="reveal">
      ${i("People stay in control","AI prepares the work. People keep the important decisions.","The workflow can organize approved information and prepare a next step. Your team retains review, judgment, and responsibility.")}
      <div class="signal-control-split">
        <article>
          <span class="signal-control-label">AI prepares</span>
          <h3>Organizes repeatable work</h3>
          <ul><li>Uses approved business information</li><li>Prepares the next step</li><li>Connects tools when technically possible</li></ul>
        </article>
        <article>
          <span class="signal-control-label">People decide</span>
          <h3>Keep judgment and responsibility</h3>
          <ul><li>Review sensitive or unusual cases</li><li>Communicate with customers</li><li>Approve important actions</li></ul>
        </article>
      </div>
    </section>
  `}function Be(){return`
    <section class="labs-seal-section">
      <span class="eyebrow">Built by DBX Labs</span>
      <h2>We structure and test the technology behind repeatable solutions</h2>
      <p>DBX Labs explores repeated business needs, builds controlled workflows, and tests what proves useful before it can become a supported product.</p>
      <p class="section-more"><a class="learn-link" href="${y("labs/")}">See how DBX Labs works</a></p>
    </section>
  `}function Le(){return`
    <section id="dbx-labs" class="labs-intro-section">
      ${i("DBX Labs","The product factory behind every repeatable DBX solution","DBX Labs starts with a real operational need, structures the work, connects AI with approved knowledge and tools, validates the result, and productizes what proves useful.")}
      <div class="labs-model" aria-label="DBX Labs productization model">
        <strong>Real need</strong><span aria-hidden="true">→</span>
        <strong>Controlled workflow</strong><span aria-hidden="true">→</span>
        <strong>Validated pilot</strong><span aria-hidden="true">→</span>
        <strong>Repeatable product</strong><span aria-hidden="true">→</span>
        <strong>Launch and support</strong>
      </div>
      <p class="section-more"><a class="learn-link" href="${y("labs/")}">See how DBX Labs works</a></p>
    </section>
  `}function je(e=!1){const t=e?q.slice(0,4):q;return`
    <section id="products" class="products-section">
      ${i("Products and initiatives","Built from needs we can understand, test, and repeat","We label the maturity of every offering openly so clients can distinguish what is available from what is still being validated or developed.")}
      <div class="product-grid">
        ${t.map(s=>`
          <article class="product-card">
            <span class="product-status">${s.status}</span>
            <h3>${s.title}</h3>
            <p>${s.body}</p>
            <p class="product-audience">${s.audience}</p>
          </article>
        `).join("")}
      </div>
      ${e?`<p class="section-more"><a class="learn-link" href="${y("packages/")}">Explore the full portfolio</a></p>`:""}
    </section>
  `}function Ee(){return`
    <section id="labs-process">
      ${i("Productization process","A disciplined path from idea to supported product","A concept does not become a product because it uses AI. It becomes a product after the workflow, boundaries, evidence, and operating responsibilities are clear.")}
      ${A(le,"labs-stage-grid")}
    </section>
  `}function We(){const e=[["Natural conversation in","People explain what they need without learning a rigid technical interface."],["Structured data and rules","The workflow validates required information, permitted actions, and known exceptions."],["Grounded tools and knowledge","AI uses approved sources, APIs, and systems appropriate to the use case."],["Controlled output","Results follow a defined format and include the context a reviewer needs."],["Human responsibility","Professionals retain review, judgment, and approval when the risk requires it."],["Continuous evaluation","Quality, exceptions, changes, cost, and residual risk are reviewed after launch."]];return`
    <section id="control-model">
      ${i("Controlled AI","Free-form human needs in. Structured, reviewable work out.","DBX designs for reduced unsupported output—not impossible promises of zero error. The level of control and human review follows the risk of the workflow.")}
      ${A(e,"control-grid")}
    </section>
  `}function qe(){return`
    <section id="channels" class="channel-section">
      ${i("WhatsApp and the channels your customers already use","Turn more messages into timely answers and clear next steps","AI can capture what the customer needs, organize the information, update your tools, and alert the right person so opportunities do not sit waiting.")}
      <div class="channel-strip" aria-label="Supported channel and system categories">
        <span>WhatsApp</span><span>Web chat</span><span>Email</span><span>SMS</span><span>Forms</span><span>CRM</span><span>APIs</span><span>Legacy systems</span>
      </div>
    </section>
  `}function Te(e=!1){const t=T;return`
    <section id="leadership" class="leadership-section">
      ${i("Leadership","Experienced people for decisions that affect your customers and your money","DBX brings together business, legal, product, customer service, cloud, and security experience so the plan considers both the financial goal and the technology needed to support it.")}
      <div class="leadership-grid">
        ${t.map(s=>`
          <article class="leader-card">
            <h3>${s.name}</h3>
            <strong>${s.role}</strong>
            <p>${s.experience}</p>
            ${s.profile?`<a href="${s.profile}" target="_blank" rel="noopener noreferrer">Professional profile</a>`:""}
          </article>
        `).join("")}
      </div>
      <p class="leadership-disclaimer">Professional affiliations describe individual experience only. They do not imply sponsorship, partnership, or endorsement of DBX Solutions by the organizations named.</p>
    </section>
  `}function Xe(){return`
    <section class="note-panel pricing-note">
      <h2>Pricing designed around a sustainable scope</h2>
      <p>Final pricing depends on the selected product, implementation scope, integrations, usage, support, and managed operations. DBX will publish package prices only after those inclusions and limits are approved.</p>
      <p>Until then, a consultation will separate product access, implementation, variable usage, and ongoing support so the commercial scope is clear.</p>
    </section>
  `}function Re(e){const t=e.primary||u,s=e.secondary||"Explore Solutions",o=e.secondaryHref||"solutions/";return`
    <section class="cta-panel ${e.final?"final-cta":""}">
      <span class="eyebrow">${e.final?"Next Step":"Start Practical"}</span>
      <h2>${e.title}</h2>
      <p>${e.body}</p>
      ${e.final?C(t):C(t,s,o)}
      <p class="cta-note">${e.note}</p>
    </section>
  `}function He(e){return`
    <section class="policy-list-section">
      <h2>${e.title}</h2>
      <ul class="policy-list">
        ${e.items.map(t=>`<li>${t}</li>`).join("")}
      </ul>
    </section>
  `}function Me(e){return`
    <section class="roadmap-section">
      ${i(e.eyebrow,e.title,e.body)}
      <ul class="policy-list roadmap-list">
        ${e.items.map(t=>`<li>${t}</li>`).join("")}
      </ul>
      <p class="section-note">${e.disclaimer}</p>
    </section>
  `}function Oe(){const e=L.slice(0,5);return`
    <section id="what-we-help-with">
      ${i("What we help with","Five practical ways to improve WhatsApp and follow-up","Each starts with a real customer moment—not a technology catalog.")}
      <div class="services-panel">
        ${M()}
        <ul class="services-stages">
          ${e.map(t=>`
                <li class="services-stage ${t.core?"services-stage-core":""}">
                  <span class="services-stage-num" aria-hidden="true">${t.icon}</span>
                  <div class="services-stage-content">
                    <div class="services-stage-head">
                      <strong>${t.title}</strong>
                      ${t.badge?`<span class="services-stage-badge">${t.badge}</span>`:""}
                    </div>
                    <p>${t.body}</p>
                    <div class="services-stage-chips">
                      <span class="services-chip"><em>Good if you</em> ${t.goodIf}</span>
                      <span class="services-chip services-chip-outcome"><em>What changes</em> ${t.outcome}</span>
                    </div>
                  </div>
                </li>`).join("")}
        </ul>
      </div>
    </section>
  `}function ze(e){return`
    <section class="text-split">
      ${e.sections.map(t=>`<article><h2>${t.title}</h2><p>${t.body}</p></article>`).join("")}
    </section>
  `}function Fe(e){return`
    <section id="values">
      ${i("Values","How we approach practical AI adoption")}
      ${A(e.items,"value-grid")}
    </section>
  `}function Ne(e){return`
    <section class="note-panel">
      <h2>${e.title}</h2>
      <p>${e.body}</p>
    </section>
  `}function Ue(){const e=[["name","Name","text","Your name","name"],["email","Business email","email","name@company.com","email"],["phone","Phone or WhatsApp","tel","+1 (555) 000-0000","tel"]],t=["Explore a DBX product","Automate a repeatable workflow","Connect AI with existing systems","Improve WhatsApp or customer operations","Not sure where to start"],s=m("privacy-policy/");return`
    <section id="contact" class="contact-layout">
      <div>
        ${i("Schedule a diagnostic","Choose the calendar or prepare a short email request.","The diagnostic reviews one repeated task, the tools involved, and a result worth measuring. The form below prepares an email; your request is complete only after you send that email.")}
        <p class="contact-privacy-notice">By submitting this form, you agree that DBX Solutions LLC may process your information to respond to your request, as described in our <a href="${s}">Privacy Policy</a>. SMS consent applies only if you provide a phone number and opt in.</p>
        <div class="contact-options">
          <a data-track="schedule_click" data-cta-id="contact-calendar" href="${D}" target="_blank" rel="noopener noreferrer">Schedule directly on the calendar</a>
          <a href="mailto:${S}">Email ${S}</a>
        </div>
      </div>
      <form class="lead-form">
        ${e.map(([o,r,a,c,d])=>`
              <label for="${o}">${r}
                <input id="${o}" name="${o}" type="${a}" autocomplete="${d}" placeholder="${c}" ${o==="name"||o==="email"?"required":""} />
              </label>`).join("")}
        <label for="goal">What are you looking to improve?
          <select id="goal" name="goal" required>
            <option value="">Select one</option>
            ${t.map(o=>`<option>${o}</option>`).join("")}
          </select>
        </label>
        <label class="full-field" for="message">Message <span class="field-optional">(optional)</span>
          <textarea id="message" name="message" rows="4" placeholder="Share your main channel, common questions, or follow-up challenge."></textarea>
        </label>
        ${Y(m("privacy-policy/"),m("sms-terms/"),"Please confirm SMS consent preferences before submitting.",b())}
        <button class="btn btn-primary" type="submit">Prepare email request</button>
        <p class="form-confirmation" role="status" hidden>Your email app is opening. Send the prepared email to complete your request; DBX has not received it yet.</p>
      </form>
    </section>
  `}function _e(e){return e.type==="proof"?Ie():e.type==="marketEvidence"?Ce():e.type==="enterpriseValue"?De():e.type==="labsSeal"?Be():e.type==="labsIntro"?Le():e.type==="products"?je(e.preview):e.type==="labsProcess"?Ee():e.type==="controlModel"?We():e.type==="channel"?qe():e.type==="leadership"?Te(e.preview):e.type==="pricingNote"?Xe():e.type==="problem"?ge():e.type==="solution"?fe():e.type==="useCasesPreview"?we():e.type==="services"?ve(e.full):e.type==="managedOps"?$e():e.type==="benefits"?ke():e.type==="process"?Se():e.type==="industries"?Ae(e.full):e.type==="trust"?xe():e.type==="faq"?Pe():e.type==="cta"?Re(e):e.type==="solutionsPage"?Oe():e.type==="textSplit"?ze(e):e.type==="values"?Fe(e):e.type==="note"?Ne(e):e.type==="contact"?Ue():e.type==="policyList"?He(e):e.type==="roadmap"?Me(e):""}function Ve(){return`
    <footer>
      <div>
        <a href="${m("")}" class="footer-logo"><img src="${m("logo.png")}" alt="DBX Solutions" /></a>
        <p>DBX helps small and midsize businesses reduce repeated work by starting with one task, keeping people in control, and measuring before expanding.</p>
        <strong>One task. One starting measure. One clear next decision.</strong>
      </div>
      <nav aria-label="Footer navigation">
        ${Q.map(e=>`<a href="${m(e.path)}">${e.label}</a>`).join("")}
        <span class="footer-heading">Legal</span>
        ${Z.map(e=>`<a href="${m(e.path)}">${e.label}</a>`).join("")}
      </nav>
      <div class="footer-cta">
        <a href="mailto:${S}">${S}</a>
        <a href="https://www.linkedin.com/in/ricardo-de-biase" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span>Serving SMBs remotely across the U.S. and Latin America.</span>
        <p class="footer-cookie-note">We use cookies and chat tools to improve your experience. See our <a href="${m("privacy-policy/")}">Privacy Policy</a>.</p>
      </div>
    </footer>
  `}function Ye(e,t){const s=document.querySelector(".nav-toggle");s?.addEventListener("click",()=>{const n=document.body.classList.toggle("nav-open");s.setAttribute("aria-expanded",String(n))}),document.querySelectorAll("#primary-nav a").forEach(n=>{n.addEventListener("click",()=>{document.body.classList.remove("nav-open"),s?.setAttribute("aria-expanded","false")})}),V(t,Ze,({from:n,to:g})=>{P("language_select",{from:n,to:g,page:t})});const o={followup:"Possible first step: review where the next customer contact is lost and which tool should receive it.",documents:"Possible first step: choose one frequent document and separate automated preparation from professional review.",systems:"Possible first step: locate where information is copied again and confirm whether an integration is technically possible."},r=e.querySelector("[data-diagnostic-result]"),a=[...e.querySelectorAll("[data-diagnostic-option]")],c=(n,g=!1)=>{a.forEach(l=>{const v=l===n;l.setAttribute("aria-checked",String(v)),l.tabIndex=v?0:-1}),r&&(r.textContent=B(o[n.dataset.diagnosticOption],b())),P("diagnostic_select",{page:t,locale:b(),scenario:n.dataset.diagnosticOption}),g&&n.focus()};a.forEach((n,g)=>{n.addEventListener("click",()=>c(n)),n.addEventListener("keydown",l=>{if(!["ArrowRight","ArrowDown","ArrowLeft","ArrowUp"].includes(l.key))return;l.preventDefault();const v=l.key==="ArrowRight"||l.key==="ArrowDown"?1:-1;c(a[(g+v+a.length)%a.length],!0)})});const d=e.querySelector(".impact-carousel");if(d){const n=d.querySelector("[data-impact-track]"),g=d.querySelector("[data-impact-viewport]"),l=[...d.querySelectorAll("[data-impact-slide]")],v=[...d.querySelectorAll("[data-impact-dot]")],I=d.querySelector(".impact-carousel-count");let h=0;const p=f=>{h=(f+l.length)%l.length,n&&(n.style.transform=`translateX(-${h*100}%)`),l.forEach((w,$)=>{const k=$===h;w.classList.toggle("is-active",k),w.setAttribute("aria-hidden",String(!k))}),v.forEach((w,$)=>{const k=$===h;w.classList.toggle("is-active",k),w.setAttribute("aria-pressed",String(k)),w.tabIndex=k?0:-1}),I&&(I.textContent=`${h+1} / ${l.length}`)};d.querySelector("[data-impact-prev]")?.addEventListener("click",()=>p(h-1)),d.querySelector("[data-impact-next]")?.addEventListener("click",()=>p(h+1)),v.forEach((f,w)=>f.addEventListener("click",()=>p(w))),g?.addEventListener("keydown",f=>{f.key==="ArrowLeft"&&p(h-1),f.key==="ArrowRight"&&p(h+1),f.key==="Home"&&p(0),f.key==="End"&&p(l.length-1)})}e.querySelector(".lead-form")?.addEventListener("submit",n=>{n.preventDefault();const g=n.currentTarget,l=new FormData(g),v=String(l.get("phone")||"").trim(),I=g.querySelector("#lead-sms-consent"),h=b(),p=h==="es"?{subject:"Solicitud de consulta",name:"Nombre",email:"Correo",phone:"Teléfono/WhatsApp",goal:"Objetivo",sms:"Consentimiento SMS",yes:"Sí",no:"No",none:"No indicado"}:h==="pt"?{subject:"Solicitação de consulta",name:"Nome",email:"E-mail",phone:"Telefone/WhatsApp",goal:"Objetivo",sms:"Consentimento SMS",yes:"Sim",no:"Não",none:"Não informado"}:{subject:"Consultation request",name:"Name",email:"Email",phone:"Phone/WhatsApp",goal:"Goal",sms:"SMS consent",yes:"Yes",no:"No",none:"Not provided"},f=encodeURIComponent(`${p.subject}: ${l.get("goal")||"General"}`),w=encodeURIComponent([`${p.name}: ${l.get("name")||""}`,`${p.email}: ${l.get("email")||""}`,`${p.phone}: ${v||p.none}`,`${p.sms}: ${I?.checked?p.yes:p.no}`,`${p.goal}: ${l.get("goal")||""}`,"",String(l.get("message")||"")].join(`
`));window.location.href=`mailto:${S}?subject=${f}&body=${w}`,P("lead_form_email_prepare",{page:t,locale:h});const $=g.querySelector(".form-confirmation");$&&($.hidden=!1)});const x=e.querySelector(".lead-form");x?.addEventListener("input",()=>{x.dataset.started!=="true"&&(x.dataset.started="true",P("lead_form_start",{page:t,locale:b()}))})}const Ge={home:"",solutionsPage:"solutions/",productsPage:"packages/",servicesPage:"services/",industriesPage:"industries/",labsPage:"labs/",aboutPage:"about/",contactPage:"contact/",dataHandlingPage:"data-handling-notice/",responsibleAiPage:"responsible-ai-policy/",securityRoadmapPage:"security-roadmap/"};function Ze(e){const t=document.querySelector("#app"),s=H[e];if(!t||!s)return;const o=b();document.documentElement.lang=O(o),ce(s,e),document.title=B(document.title,o);const r=document.querySelector('meta[name="description"]');r&&r.setAttribute("content",B(r.getAttribute("content"),o));const a=`
    <div class="wrapper ${e==="home"?"home-wrapper":""}">
      ${de(e)}
      <main>
        ${ue(s,e)}
        ${s.blocks.map(_e).join("")}
      </main>
      ${Ve()}
      <a class="mobile-sticky-cta" data-track="schedule_click" data-cta-id="mobile-sticky" href="${D}" target="_blank" rel="noopener noreferrer">${u}</a>
      ${z(m("privacy-policy/"))}
    </div>
  `;t.innerHTML=F(a,o),Ye(t,e),G(t),N({onExperienceAllowed:j}),U()&&j(),t.querySelectorAll("[data-track]").forEach(c=>{c.addEventListener("click",()=>{P(c.dataset.track,{page:e,locale:o,cta_id:c.dataset.ctaId||"unspecified"})})})}export{Ze as m};

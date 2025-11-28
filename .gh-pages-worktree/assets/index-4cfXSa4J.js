(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(o){if(o.ep)return;o.ep=!0;const t=i(o);fetch(o.href,t)}})();const h={services:"Services",solutions:"Use Cases",smb:"SMB Programs",process:"Process",proof:"Results",contact:"Contact"},f={valueEquation:"VALUE EQUATION",timeToProd:"TIME TO PROD",stack:"STACK",languageToggle:"Language toggle"},S={eyebrow:"GENAI CX SOLUTIONS",headline:"Design, build, run, and measure AI-powered service journeys.",body:"DBX Solutions is a CX consultancy that plugs in as a full-service task force for enterprise and high-growth SMB service organizations, bringing a distributed bench of architects, engineers, and operators spanning discovery, implementation, and post-launch governance.",points:["Conversational + agentic AI across voice and digital channels","Enterprise-grade rigor sized for Fortune 50 and SMB orgs alike","CRM, CCaaS, and custom data integrations without handoffs","Governance playbooks that keep adoption on track"],ctaPrimary:"Book a Working Session",ctaSecondary:"Download Capability Brief",value:{equation:"Strategy × Delivery × Governance",time:"< 6 weeks",stack:"OpenAI, AWS, Salesforce, Genesys",noteLabel:"Time to Prod",noteText:"= kickoff to production release of the first automation wave."},stats:[{label:"CX architecture",value:"15+ yrs"},{label:"Faster automation rollouts",value:"30%"},{label:"Reduced ramp-to-value",value:"20%"}],badges:["GenAI & agentic design","CRM + CCaaS integration","LATAM & North America delivery","SMB accelerators","Multilanguage support","Measurable business outcomes"],utility:"Enterprise + SMB CX programs delivered across NA · LATAM · EMEA.",bookNow:"Book now"},k={label:"Programs delivered for leaders in:",industries:["Financial Services","Healthcare","Retail & DTC","Travel","Public Sector"]},A={eyebrow:"WHAT WE DELIVER",title:"Three service pillars that keep CX modernization moving.",description:"Each pillar is modular—engage DBX Solutions for the full lifecycle or plug specific gaps inside your existing program.",listLabel:"Playbook includes",cards:[{title:"Advisory Lab",description:"Strategy, discovery, and ROI modeling to rank automation bets.",timeline:"0–4 weeks",outputs:"GenAI opportunity map, prioritized backlog",artifacts:"Governance guardrails, integration blueprint",kpi:"Roadmap confidence +30%",items:["Executive workshops & customer journey mapping","Tech stack audits & integration roadmaps","Proof-of-concept design with safety rails"]},{title:"Build Studio",description:"Hands-on design and implementation across voice + digital channels.",timeline:"4–12 weeks",outputs:"Production-ready flows, observability stack",artifacts:"Safety cases, data contracts, QA scorecards",kpi:"Automation velocity +40%",items:["Bot dialog + agent copilot development","CRM, CCaaS, data layer integration","Instrumentation, analytics, and QA"]},{title:"Operate Office",description:"Post-launch governance, enablement, and optimization.",timeline:"Quarterly",outputs:"Runbooks, maturity dashboards, enablement loops",artifacts:"KPI cockpit, escalation paths, training kits",kpi:"Adoption lift +25%",items:["Runbooks, training, and change management","Health checks & ROI tracking","Fractional PS leadership & escalation support"]}]},$={eyebrow:"SOLUTION MENU",title:"Packaged outcomes you can mix and match.",description:"Each card represents a repeatable play honed across enterprises. Use them as-is or as a starting point for your unique use cases.",cards:[{pill:"Deflect & Resolve",timeline:"Pilot: 8 weeks",title:"Automated service desk",body:"Voice and digital flows that authenticate customers, surface answers, and escalate with full context.",kpi:"FCR +18%"},{pill:"Revenue Assist",timeline:"Launch: 6 weeks",title:"Guided selling & retention",body:"Agentic copilots that recommend offers, coach agents, and trigger workflows inside CRM.",kpi:"Upsell +12%"},{pill:"Operations",timeline:"Rollout: 10 weeks",title:"Back-office automation",body:"Case triage, data collection, and notifications spanning ERP, ticketing, and custom APIs.",kpi:"Manual effort −35%"},{pill:"Voice of Customer",timeline:"Sprint: 5 weeks",title:"Feedback & analytics",body:"Survey orchestration, insight pipelines, and KPI dashboards tied to business impact.",kpi:"Insight latency −50%"}]},w={eyebrow:"SMB PROGRAMS",title:"Accelerators sized for small & mid-market teams.",description:"Modular engagements designed for lean CX, RevOps, and support teams that need enterprise-grade guardrails without enterprise overhead.",cards:[{pill:"CX Starter Pack",title:"90-day automation lift",body:"Rapid discovery, pre-built intent libraries, and packaged integrations that snap into HubSpot, Zendesk, or Freshworks.",timeline:"Fixed scope · 12 weeks"},{pill:"Co-managed Launch",title:"Shared delivery pod",body:"Blend your internal ops team with DBX engineers to design, build, and govern cross-channel AI journeys.",timeline:"Dedicated pod"},{pill:"Growth Retainer",title:"Fractional PS + analytics",body:"Monthly sprints that prioritize roadmap health, KPI instrumentation, and change management for evolving SMB orgs.",timeline:"Monthly subscription"}],ctaPrimary:"Review SMB accelerators",ctaSecondary:"Email SMB brief"},C={eyebrow:"INDUSTRY PLAYBOOKS",title:"Use-case blueprints for your vertical.",cards:[{pill:"Financial Services",timeline:"Audit-ready",title:"Fraud triage + secure messaging",body:"Loan status, collections coaching, fraud triage, and encrypted client servicing with audit trails.",kpi:"Chargeback time −42%",compliance:"Compliance: PCI, SOC2",stack:["Salesforce","Genesys","Azure OpenAI"]},{pill:"Healthcare",timeline:"HIPAA safe",title:"Care navigation copilots",body:"Intake, benefits checks, Rx reminders, and omnichannel patient routing with PHI guardrails.",kpi:"No-show rate −18%",compliance:"Compliance: HIPAA, HITRUST",stack:["Twilio","Epic","Bedrock"]},{pill:"Retail & DTC",timeline:"Peak ready",title:"Conversational commerce",body:"Order management, loyalty, warranties, and guided selling tied to live inventory.",kpi:"AOV +9%",compliance:"Compliance: GDPR, CCPA",stack:["Shopify","Klaviyo","OpenAI"]},{pill:"Travel & Hospitality",timeline:"Multilingual",title:"Irregular ops control tower",body:"Itinerary servicing, disruption comms, and loyalty concierge with 24/7 agent assist.",kpi:"Rebooking time −55%",compliance:"Compliance: DOT, GDPR",stack:["ServiceNow","Five9","Vertex AI"]}]},I={eyebrow:"ENGAGEMENT MODEL",title:"Four tightly managed phases.",body:"No handoffs. DBX Solutions stays accountable from kickoff through adoption.",steps:[{title:"Discovery",body:"Interviews, data diagnostics, and ROI scoring to stack-rank opportunities.",chip:"Signals locked in 10 days"},{title:"Design",body:"Journey flows, safety rails, and proof points validated with stakeholders.",chip:"POC evidence pack"},{title:"Build & Integrate",body:"Implementation across channels, data, and tooling with observability baked in.",chip:"Observability + QA stack"},{title:"Measure & Adopt",body:"Enablement, runbooks, and governance cadences that institutionalize outcomes and prep the next wave.",chip:"Quarterly business reviews"}],optionsEyebrow:"ENGAGEMENT OPTIONS",optionsTitle:"Plug DBX Solutions where you need it.",options:[{title:"Acceleration Sprint",body:"3-week war room to unblock or relaunch a stalled CX GenAI initiative.",tag:"Fixed fee",kpi:"Delivery: 15 days"},{title:"Fractional PS Lead",body:"Part-time Professional Services leadership to steer roadmap + governance.",tag:"Monthly retainer",kpi:"20 hrs / month"},{title:"Launch Assurance",body:"Readiness reviews, risk desk, and day-0 response plan for enterprise launches.",tag:"2-week block",kpi:"Audit scorecard"},{title:"Advisory Retainer",body:"Quarterly strategic partner for roadmap prioritization and exec reporting.",tag:"Quarterly",kpi:"CXO-ready decks"}]},P={eyebrow:"RESULTS & TRUST",title:"Proof that the work lands.",stats:[{value:"4.8 / 5",label:"Avg. stakeholder rating"},{value:"90%+",label:"NPS maintained across programs"},{value:"10 weeks",label:"Typical pilot-to-launch timeline"},{value:"3 regions",label:"LATAM · NA · EMEA delivery"}],marquee:["Fortune 50 Retail","Global Telco","LATAM Fintech","Healthcare Network","Travel Super-App","Public Sector PMO"],testimonials:[{quote:"DBX unified sales engineering, delivery, and customer success into one motion. We launched our AI messaging program faster than expected and finally have governance we can trust.",author:"VP, Customer Experience — Global Retailer"},{quote:"They parachuted into a stalled automation program and had our compliance, data, and CX teams aligned in two working sessions. The pilot hit 28% deflection without harming CSAT.",author:"Head of Contact Center — Digital Bank"}]},E={introEyebrow:"LEAD CONSULTANT",name:"Ricardo De Biase",body:"Solutions Architect & Professional Services leader with a foundation in network engineering and a decade delivering AI-powered CX for enterprises across the Americas and EMEA.",badges:["AWS SA Pro","MCSE","Genesys PS","ITIL"],bullets:["Architected AI + automation programs since 2012","Master’s in IT Management; dual Bachelor’s in IT and Networking","AWS Certified Solutions Architect & MCSE (Windows Server)","Comfortable in English, Spanish, and Portuguese engagements"],cta:"Download creds deck →",whyEyebrow:"WHY DBX SOLUTIONS",why:["One accountable lead from discovery through adoption","Enterprise rigor with boutique speed","Platform-agnostic across CRMs, CCaaS, GenAI stacks, and bespoke apps","Global-ready delivery for multilingual, regulated environments"]},T={eyebrow:"NEXT STEP",title:"Ready to design your next automation wave?",body:"Drop a quick brief or grab time directly. Every inquiry routes to DBX Solutions and gets a response within one business day.",form:{name:"Full name",email:"Work email",message:"Initiative / challenge",placeholderName:"Alex Rivera",placeholderEmail:"alex@brand.com",placeholderMessage:"e.g., Launch a multilingual agentic copilot across chat + voice.",submit:"Send project brief"},calendly:{eyebrow:"LIVE CALENDAR",title:"45-min working session",body:"Embed a Calendly slot here to let buyers book instantly. Slots show real-time availability synced to your primary calendar.",cta:"Open Calendly"},secondary:[{label:"WhatsApp",href:"https://wa.me/13212874509"},{label:"Email",href:"mailto:rdebiasec@gmail.com"},{label:"LinkedIn DM",href:"https://www.linkedin.com/in/ricardo-de-biase"}],contacts:["Orlando, FL · GMT-5","rdebiasec@gmail.com","+1 (321) 287-4509","linkedin.com/in/ricardo-de-biase"],badges:["AWS Partner","Salesforce Consultant","NVIDIA Inception","Genesys PS Ally"]},R={notice:"© 2025 DBX Solutions — Mock Preview",warning:"Delete when finalized · No production assets"},O={nav:h,labels:f,hero:S,trust:k,services:A,solutions:$,smb:w,industries:C,process:I,proof:P,founder:E,contact:T,footer:R},M={services:"Servicios",solutions:"Casos de uso",smb:"Programas SMB",process:"Proceso",proof:"Resultados",contact:"Contacto"},L={valueEquation:"ECUACIÓN DE VALOR",timeToProd:"TIME TO PROD",stack:"STACK",languageToggle:"Selector de idioma"},D={eyebrow:"SOLUCIONES GENAI CX",headline:"Diseña, implementa, opera y mide recorridos de servicio potenciados por IA.",body:"DBX Solutions se integra como una fuerza de tareas CX de servicio completo para organizaciones empresariales y SMB de alto crecimiento, aportando un equipo distribuido de arquitectos, ingenieros y operadores que cubre descubrimiento, implementación y gobernanza post-lanzamiento.",points:["IA conversacional y agentica en canales de voz y digitales","Rigor empresarial dimensionado tanto para Fortune 50 como para SMB","Integraciones CRM, CCaaS y datos personalizados sin transferencias","Playbooks de gobernanza que mantienen la adopción encaminada"],ctaPrimary:"Agenda sesión",ctaSecondary:"Descarga brief",value:{equation:"Estrategia × Entrega × Gobernanza",time:"< 6 semanas",stack:"OpenAI, AWS, Salesforce, Genesys",noteLabel:"Time to Prod",noteText:"= tiempo entre kickoff y la primera ola de automatización en producción."},stats:[{label:"Arquitectura CX",value:"15+ años"},{label:"Implementaciones más rápidas",value:"30%"},{label:"Reducción de ramp-up",value:"20%"}],badges:["Diseño GenAI y agentico","Integración CRM + CCaaS","Entrega LATAM & Norteamérica","Aceleradores SMB","Soporte multilenguaje","Resultados medibles"],utility:"Programas CX para empresas y SMB en NA · LATAM · EMEA.",bookNow:"Reservar"},N={label:"Programas entregados para líderes en:",industries:["Servicios financieros","Salud","Retail & DTC","Viajes","Sector público"]},B={eyebrow:"QUÉ ENTREGAMOS",title:"Tres pilares que impulsan la modernización CX.",description:"Cada pilar es modular: contrata a DBX Solutions para el ciclo completo o cubre huecos específicos en tu programa.",listLabel:"Incluye",cards:[{title:"Advisory Lab",description:"Estrategia, descubrimiento y modelado ROI para priorizar apuestas.",timeline:"0–4 semanas",outputs:"Mapa de oportunidades GenAI, backlog priorizado",artifacts:"Guardarraíles de gobernanza, blueprint de integración",kpi:"Confianza en roadmap +30%",items:["Workshops ejecutivos y mapeo de journeys","Auditorías de stack tecnológico","Diseño de POC con medidas de seguridad"]},{title:"Build Studio",description:"Diseño e implementación práctica en canales de voz y digitales.",timeline:"4–12 semanas",outputs:"Flujos listos para producción, observabilidad",artifacts:"Casos de seguridad, contratos de datos, QA scorecards",kpi:"Velocidad de automatización +40%",items:["Desarrollo de bots y copilotos","Integración CRM, CCaaS y datos","Instrumentación, analítica y QA"]},{title:"Operate Office",description:"Gobernanza post-lanzamiento, habilitación y optimización.",timeline:"Trimestral",outputs:"Runbooks, tableros de madurez e iteraciones",artifacts:"Cockpit de KPI, rutas de escalamiento, kits de entrenamiento",kpi:"Adopción +25%",items:["Runbooks, training y gestión del cambio","Health checks y seguimiento ROI","Liderazgo PS fraccional"]}]},z={eyebrow:"PORTAFOLIO DE SOLUCIONES",title:"Resultados empaquetados combinables.",description:"Cada tarjeta representa un play repetible perfeccionado en grandes empresas.",cards:[{pill:"Deflect & Resolve",timeline:"Piloto: 8 semanas",title:"Mesa de servicio automatizada",body:"Flujos que autentican, entregan respuestas y escalan con contexto completo.",kpi:"FCR +18%"},{pill:"Revenue Assist",timeline:"Lanzamiento: 6 semanas",title:"Venta guiada y retención",body:"Copilotos que recomiendan ofertas, entrenan agentes y ejecutan flujos en CRM.",kpi:"Upsell +12%"},{pill:"Operations",timeline:"Despliegue: 10 semanas",title:"Automatización back-office",body:"Triaging de casos, captura de datos y notificaciones en ERP, tickets y APIs.",kpi:"Esfuerzo manual −35%"},{pill:"Voice of Customer",timeline:"Sprint: 5 semanas",title:"Feedback y analítica",body:"Orquestación de encuestas, pipelines de insights y dashboards ligados al negocio.",kpi:"Latencia de insights −50%"}]},q={eyebrow:"PROGRAMAS SMB",title:"Aceleradores para equipos pequeños y medianos.",description:"Compromisos modulares para CX, RevOps y soporte con recursos ajustados.",cards:[{pill:"CX Starter Pack",title:"Impulso de 90 días",body:"Descubrimiento rápido, librerías de intents y paquetes para HubSpot, Zendesk o Freshworks.",timeline:"Alcance fijo · 12 semanas"},{pill:"Co-managed Launch",title:"Pod de entrega compartido",body:"Mezcla tu equipo interno con ingenieros DBX para diseñar y gobernar journeys.",timeline:"Pod dedicado"},{pill:"Growth Retainer",title:"PS fraccional + analítica",body:"Sprints mensuales que priorizan roadmap, métricas y cambio organizacional.",timeline:"Suscripción mensual"}],ctaPrimary:"Revisar aceleradores SMB",ctaSecondary:"Enviar brief SMB"},j={eyebrow:"PLAYBOOKS POR INDUSTRIA",title:"Blueprints para tu vertical.",cards:[{pill:"Servicios financieros",timeline:"Listo para auditoría",title:"Triage de fraude + mensajería segura",body:"Estatus de préstamos, coaching de cobranzas y servicio cifrado con trazabilidad.",kpi:"Tiempo de chargeback −42%",compliance:"Cumplimiento: PCI, SOC2",stack:["Salesforce","Genesys","Azure OpenAI"]},{pill:"Salud",timeline:"Seguro HIPAA",title:"Copilotos de navegación de atención",body:"Intake, verificación de beneficios, recordatorios y routing omnicanal con PHI protegido.",kpi:"No-show −18%",compliance:"Cumplimiento: HIPAA, HITRUST",stack:["Twilio","Epic","Bedrock"]},{pill:"Retail & DTC",timeline:"Listo para picos",title:"Comercio conversacional",body:"Gestión de pedidos, lealtad y garantías conectadas a inventario en tiempo real.",kpi:"Ticket promedio +9%",compliance:"Cumplimiento: GDPR, CCPA",stack:["Shopify","Klaviyo","OpenAI"]},{pill:"Viajes & Hospitalidad",timeline:"Multilenguaje",title:"Control tower para irregularidades",body:"Atención de itinerarios, comunicaciones por disrupciones y concierge de lealtad 24/7.",kpi:"Tiempo de rebooking −55%",compliance:"Cumplimiento: DOT, GDPR",stack:["ServiceNow","Five9","Vertex AI"]}]},G={eyebrow:"MODELO DE EJECUCIÓN",title:"Cuatro fases controladas al detalle.",body:"Sin handoffs. DBX Solutions mantiene la responsabilidad de principio a fin.",steps:[{title:"Discovery",body:"Entrevistas, diagnósticos de datos y priorización ROI.",chip:"Signals listos en 10 días"},{title:"Design",body:"Flujos, guardarraíles y POCs validados con stakeholders.",chip:"Paquete de evidencia POC"},{title:"Build & Integrate",body:"Implementación multicanal con observabilidad integrada.",chip:"Stack de observabilidad + QA"},{title:"Measure & Adopt",body:"Enablement, runbooks y gobernanza para fijar resultados y preparar la siguiente ola.",chip:"Quarterly Business Reviews"}],optionsEyebrow:"OPCIONES DE PARTICIPACIÓN",optionsTitle:"Integra DBX Solutions donde haga falta.",options:[{title:"Acceleration Sprint",body:"War room de 3 semanas para desbloquear iniciativas CX GenAI.",tag:"Tarifa fija",kpi:"Entrega: 15 días"},{title:"Fractional PS Lead",body:"Liderazgo PS part-time para guiar roadmap y gobernanza.",tag:"Retainer mensual",kpi:"20 h / mes"},{title:"Launch Assurance",body:"Revisiones de readiness, risk desk y plan día 0.",tag:"Bloque de 2 semanas",kpi:"Scorecard de auditoría"},{title:"Advisory Retainer",body:"Socio estratégico trimestral para priorizar roadmap y reportes ejecutivos.",tag:"Trimestral",kpi:"Decks listos para C-level"}]},X={eyebrow:"RESULTADOS & CONFIANZA",title:"Evidencia de impacto real.",stats:[{value:"4.8 / 5",label:"Calificación promedio de stakeholders"},{value:"90%+",label:"NPS mantenido"},{value:"10 semanas",label:"Piloto a lanzamiento típico"},{value:"3 regiones",label:"LATAM · NA · EMEA"}],marquee:["Retail Fortune 50","Telco global","Fintech LATAM","Red de salud","Super-App de viajes","PMO sector público"],testimonials:[{quote:"DBX alineó ingeniería, delivery y customer success. Lanzamos IA conversacional antes de lo planeado con gobernanza confiable.",author:"VP CX — Retail global"},{quote:"Reactivaron un programa detenido y en dos sesiones alinearon compliance, datos y CX. Logramos 28% de deflexión sin afectar CSAT.",author:"Head de Contact Center — Banco digital"}]},F={introEyebrow:"CONSULTOR PRINCIPAL",name:"Ricardo De Biase",body:"Arquitecto de soluciones y líder PS con base en ingeniería de redes y una década entregando CX impulsado por IA en Américas y EMEA.",badges:["AWS SA Pro","MCSE","Genesys PS","ITIL"],bullets:["Arquitecto de programas IA + automatización desde 2012","Maestría en IT Management; doble licenciatura en TI y Redes","Certificado AWS SA & MCSE","Cubre proyectos en inglés, español y portugués"],cta:"Descargar credenciales →",whyEyebrow:"POR QUÉ DBX SOLUTIONS",why:["Un responsable de descubrimiento a adopción","Rigor enterprise con velocidad boutique","Agnóstico a plataformas (CRM, CCaaS, GenAI)","Entrega global en entornos regulados"]},x={eyebrow:"PRÓXIMO PASO",title:"¿Listo para diseñar tu próxima ola de automatización?",body:"Envíanos un brief o agenda directo. Cada solicitud recibe respuesta en un día hábil.",form:{name:"Nombre completo",email:"Correo corporativo",message:"Iniciativa / reto",placeholderName:"Alex Rivera",placeholderEmail:"alex@marca.com",placeholderMessage:"Ej.: Copiloto agentico multilenguaje en chat + voz.",submit:"Enviar brief"},calendly:{eyebrow:"CALENDARIO EN VIVO",title:"Sesión de trabajo 45 min",body:"Inserta Calendly para reservar al instante con disponibilidad real.",cta:"Abrir Calendly"},secondary:[{label:"WhatsApp",href:"https://wa.me/13212874509"},{label:"Email",href:"mailto:rdebiasec@gmail.com"},{label:"LinkedIn",href:"https://www.linkedin.com/in/ricardo-de-biase"}],contacts:["Orlando, FL · GMT-5","rdebiasec@gmail.com","+1 (321) 287-4509","linkedin.com/in/ricardo-de-biase"],badges:["AWS Partner","Consultor Salesforce","NVIDIA Inception","Genesys PS Ally"]},U={notice:"© 2025 DBX Solutions — Vista previa",warning:"Eliminar al finalizar · No usar en producción"},H={nav:M,labels:L,hero:D,trust:N,services:B,solutions:z,smb:q,industries:j,process:G,proof:X,founder:F,contact:x,footer:U},r={en:O,es:H},d="en",b="dbx-locale",V={services:"Services",solutions:"Use Cases",smb:"SMB Programs",process:"Process",proof:"Results",contact:"Contact"},W={valueEquation:"VALUE EQUATION",timeToProd:"TIME TO PROD",stack:"STACK",languageToggle:"Language toggle"},g=document.querySelector("#app"),p=e=>String(e).padStart(2,"0"),c=(e,a)=>({...e,...a||{}});function Q(){const e=localStorage.getItem(b);return e&&r[e]?e:d}function K(e){r[e]&&(localStorage.setItem(b,e),v(e))}function _(e,a){return`
    <div class="lang-toggle" aria-label="${e.languageToggle}">
      <button class="${a==="en"?"active":""}" data-locale="en" type="button">
        EN 🇺🇸
      </button>
      <button class="${a==="es"?"active":""}" data-locale="es" type="button">
        ES 🇨🇴
      </button>
    </div>
  `}function Y(e,a,i,s){return`
    <header>
      <span class="logo">DBX SOLUTIONS</span>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
        <span class="sr-only">Toggle navigation</span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
        <span class="nav-toggle-bar"></span>
      </button>
      <nav id="primary-nav">
        <a href="#services">${e.services}</a>
        <a href="#solutions">${e.solutions}</a>
        <a href="#smb">${e.smb}</a>
        <a href="#process">${e.process}</a>
        <a href="#proof">${e.proof}</a>
        <a href="#contact">${e.contact}</a>
      </nav>
      <div class="header-actions">
        <a class="btn btn-primary header-book" href="https://calendly.com/rdebiase/45min" target="_blank" rel="noopener noreferrer">${i.bookNow}</a>
        ${_(a,s)}
      </div>
    </header>
  `}function Z(e,a){return`
    <section class="hero" id="top">
      <div>
        <span class="eyebrow">${e.hero.eyebrow}</span>
        <h1>${e.hero.headline}</h1>
        <p>${e.hero.body}</p>
        <ul class="key-points">
          ${e.hero.points.map(i=>`<li>${i}</li>`).join("")}
        </ul>
        <div class="actions">
          <a class="btn btn-primary" href="https://calendly.com/rdebiase/45min" target="_blank" rel="noopener noreferrer">${e.hero.ctaPrimary}</a>
          <a class="btn btn-secondary" href="#contact">${e.hero.ctaSecondary}</a>
        </div>
        <div class="value-equation">
          <div class="value-pill">
            <span>${a.valueEquation}</span>
            <strong>${e.hero.value.equation}</strong>
          </div>
          <div class="value-pill">
            <span>${a.timeToProd}</span>
            <strong>${e.hero.value.time}</strong>
          </div>
          <div class="value-pill">
            <span>${a.stack}</span>
            <strong>${e.hero.value.stack}</strong>
          </div>
        </div>
        <p class="value-note"><strong>${e.hero.value.noteLabel}</strong> ${e.hero.value.noteText}</p>
      </div>
      <div class="hero-card">
        <div class="stat-grid">
          ${e.hero.stats.map(i=>`
          <div class="stat">
            <strong>${i.value}</strong>
            ${i.label}
          </div>`).join("")}
        </div>
        <div class="badge-grid">
          ${e.hero.badges.map(i=>`<span class="badge">${i}</span>`).join("")}
        </div>
      </div>
    </section>
  `}function J(e){return`
    <section class="trust-bar">
      <p style="color:var(--muted);">${e.trust.label}</p>
      <div class="logo-strip">
        ${e.trust.industries.map(a=>`<span class="logo-pill">${a}</span>`).join("")}
      </div>
    </section>
  `}function ee(e){return`
    <section id="services">
      <div class="section-heading">
        <span class="eyebrow">${e.services.eyebrow}</span>
        <h2>${e.services.title}</h2>
        <p>${e.services.description}</p>
      </div>
      <div class="services-grid">
        ${e.services.cards.map((a,i)=>`
        <article class="service-card">
          <div class="card-header">
            <div class="service-icon">${p(i+1)}</div>
            <span class="timeline-tag">${a.timeline}</span>
          </div>
          <h3>${a.title}</h3>
          <p>${a.description}</p>
          <div class="service-meta">
            <span><strong>${a.outputs}</strong></span>
            <span><strong>${a.artifacts}</strong></span>
            <span class="kpi-tag">${a.kpi}</span>
          </div>
          <details>
            <summary>${e.services.listLabel}</summary>
            <ul class="list-dots">
              ${a.items.map(s=>`<li>${s}</li>`).join("")}
            </ul>
          </details>
        </article>`).join("")}
      </div>
    </section>
  `}function ae(e){return`
    <section id="solutions">
      <div class="section-heading">
        <span class="eyebrow">${e.solutions.eyebrow}</span>
        <h2>${e.solutions.title}</h2>
        <p>${e.solutions.description}</p>
      </div>
      <div class="card-grid solution-grid">
        ${e.solutions.cards.map(a=>`
        <article class="card">
          <div class="card-header">
            <span class="pill">${a.pill}</span>
            <span class="timeline-tag">${a.timeline}</span>
          </div>
          <h4>${a.title}</h4>
          <p>${a.body}</p>
          <span class="kpi-tag">${a.kpi}</span>
        </article>`).join("")}
      </div>
    </section>
  `}function ie(e){return`
    <section id="smb">
      <div class="section-heading">
        <span class="eyebrow">${e.smb.eyebrow}</span>
        <h2>${e.smb.title}</h2>
        <p>${e.smb.description}</p>
      </div>
      <div class="card-grid">
        ${e.smb.cards.map(a=>`
        <article class="card">
          <span class="pill">${a.pill}</span>
          <h4>${a.title}</h4>
          <p>${a.body}</p>
          <span class="timeline-tag">${a.timeline}</span>
        </article>`).join("")}
      </div>
      <div class="actions" style="margin-top:1.75rem;">
        <a class="btn btn-primary" href="https://calendly.com/rdebiase/45min" target="_blank" rel="noopener noreferrer">${e.smb.ctaPrimary}</a>
        <a class="btn btn-secondary" href="mailto:rdebiasec@gmail.com">${e.smb.ctaSecondary}</a>
      </div>
    </section>
  `}function oe(e){return`
    <section id="industries">
      <div class="section-heading">
        <span class="eyebrow">${e.industries.eyebrow}</span>
        <h2>${e.industries.title}</h2>
      </div>
      <div class="case-grid">
        ${e.industries.cards.map((a,i)=>`
        <article class="case-card" data-slide="${p(i+1)}">
          <div class="card-header">
            <span class="pill">${a.pill}</span>
            <span class="timeline-tag">${a.timeline}</span>
          </div>
          <h4>${a.title}</h4>
          <p>${a.body}</p>
          <div class="case-meta">
            <span class="kpi-tag">${a.kpi}</span>
            <span>${a.compliance}</span>
          </div>
          <div class="stack-logos">
            ${a.stack.map(s=>`<span>${s}</span>`).join("")}
          </div>
        </article>`).join("")}
      </div>
    </section>
  `}function te(e){return`
    <section id="process" class="two-col">
      <div>
        <div class="section-heading">
          <span class="eyebrow">${e.process.eyebrow}</span>
          <h2>${e.process.title}</h2>
          <p>${e.process.body}</p>
        </div>
        <div class="process-timeline">
          <div class="process-grid">
            ${e.process.steps.map((a,i)=>`
            <div class="step-card">
              <div class="step-number">${p(i+1)}</div>
              <div>
                <h4>${a.title}</h4>
                <p>${a.body}</p>
                <div class="milestone-chip">${a.chip}</div>
              </div>
            </div>`).join("")}
          </div>
        </div>
      </div>
      <div>
        <div class="section-heading">
          <span class="eyebrow">${e.process.optionsEyebrow}</span>
          <h2>${e.process.optionsTitle}</h2>
        </div>
        <div class="card" style="gap:1rem;">
          <div class="engage-table">
            ${e.process.options.map(a=>`
            <div class="engage-row">
              <div>
                <strong>${a.title}</strong>
                <p>${a.body}</p>
              </div>
              <div>
                <span class="timeline-tag">${a.tag}</span>
                <span class="kpi-tag">${a.kpi}</span>
              </div>
            </div>`).join("")}
          </div>
        </div>
      </div>
    </section>
  `}function se(e){const a=e.proof.marquee.concat(e.proof.marquee);return`
    <section id="proof">
      <div class="section-heading">
        <span class="eyebrow">${e.proof.eyebrow}</span>
        <h2>${e.proof.title}</h2>
      </div>
      <div class="proof-grid">
        <div>
          <div class="result-grid">
            ${e.proof.stats.map(i=>`
            <div class="stat">
              <strong>${i.value}</strong>
              ${i.label}
            </div>`).join("")}
          </div>
          <div class="logo-marquee" aria-label="Client marquee">
            <div class="marquee-track">
              ${a.map(i=>`<span>${i}</span>`).join("")}
            </div>
          </div>
        </div>
        <div class="testimonial-stack">
          ${e.proof.testimonials.map(i=>`
          <div class="testimonial-card">
            “${i.quote}”
            <strong>${i.author}</strong>
          </div>`).join("")}
        </div>
      </div>
    </section>
  `}function ne(e){return`
    <section id="founder" class="two-col">
      <div class="founder-card">
        <div class="founder-header">
          <div class="headshot-placeholder">RDB</div>
  <div>
            <span class="eyebrow">${e.founder.introEyebrow}</span>
            <h3>${e.founder.name}</h3>
          </div>
        </div>
        <p>${e.founder.body}</p>
        <div class="credential-badges">
          ${e.founder.badges.map(a=>`<span>${a}</span>`).join("")}
        </div>
        <ul class="list-dots">
          ${e.founder.bullets.map(a=>`<li>${a}</li>`).join("")}
        </ul>
        <a class="founder-cta" href="#contact">${e.founder.cta}</a>
      </div>
    <div class="card">
        <span class="eyebrow">${e.founder.whyEyebrow}</span>
        <ul class="list-dots">
          ${e.founder.why.map(a=>`<li>${a}</li>`).join("")}
        </ul>
      </div>
    </section>
  `}function re(e){return`
    <section id="contact" class="cta-panel">
      <span class="eyebrow">${e.contact.eyebrow}</span>
      <h2>${e.contact.title}</h2>
      <p>${e.contact.body}</p>
      <div class="cta-grid">
        <form class="lead-form">
          <div>
            <label for="lead-name">${e.contact.form.name}</label>
            <input id="lead-name" type="text" name="name" placeholder="${e.contact.form.placeholderName}" autocomplete="name" />
          </div>
          <div>
            <label for="lead-email">${e.contact.form.email}</label>
            <input id="lead-email" type="email" name="email" placeholder="${e.contact.form.placeholderEmail}" autocomplete="email" />
          </div>
          <div>
            <label for="lead-initiative">${e.contact.form.message}</label>
            <textarea id="lead-initiative" name="message" placeholder="${e.contact.form.placeholderMessage}"></textarea>
          </div>
          <button class="btn btn-primary" type="submit">${e.contact.form.submit}</button>
        </form>
        <div class="calendly-frame">
          <span class="eyebrow" style="margin-bottom:0;">${e.contact.calendly.eyebrow}</span>
          <h3 style="margin:0;">${e.contact.calendly.title}</h3>
          <p style="color:var(--muted);">${e.contact.calendly.body}</p>
          <a class="btn btn-secondary" href="https://calendly.com/rdebiase/45min" target="_blank" rel="noopener noreferrer">${e.contact.calendly.cta}</a>
        </div>
      </div>
      <div class="secondary-actions">
        ${e.contact.secondary.map(a=>`
        <a class="secondary-link" href="${a.href}" target="_blank" rel="noopener noreferrer">${a.label}</a>`).join("")}
      </div>
      <div class="contact-row">
        ${e.contact.contacts.map(a=>`<span>${a}</span>`).join("")}
      </div>
      <div class="contact-badges">
        ${e.contact.badges.map(a=>`<span>${a}</span>`).join("")}
    </div>
    </section>
  `}function le(e){return`
    <footer>
      <span>${e.footer.notice}</span>
      <span>${e.footer.warning}</span>
    </footer>
  `}function v(e){if(!g)return;const a=r[e]||r[d],i=c(V,c(r[d].nav,a.nav)),s=c(W,c(r[d].labels,a.labels));g.innerHTML=`
    <div class="wrapper" data-locale="${e}">
      ${Y(i,s,a.hero,e)}
      ${Z(a,s)}
      ${J(a)}
      ${ee(a)}
      ${ae(a)}
      ${ie(a)}
      ${oe(a)}
      ${te(a)}
      ${se(a)}
      ${ne(a)}
      ${re(a)}
      ${le(a)}
  </div>
`,document.querySelectorAll(".lang-toggle button").forEach(n=>{n.addEventListener("click",y=>{const m=y.currentTarget?.dataset?.locale;m&&K(m)})});const o=document.querySelector(".nav-toggle"),t=document.querySelector("header nav"),l=document.querySelector(".wrapper"),u=()=>{document.body.classList.remove("nav-open"),o?.setAttribute("aria-expanded","false")};o?.addEventListener("click",()=>{const n=document.body.classList.toggle("nav-open");o.setAttribute("aria-expanded",String(n))}),t?.querySelectorAll("a").forEach(n=>{n.addEventListener("click",()=>{window.matchMedia("(max-width: 900px)").matches&&u()})}),l?.addEventListener("click",n=>{document.body.classList.contains("nav-open")&&(n.target.closest("header")||u())})}v(Q());

const storageKey = 'dbx-locale'
const defaultLocale = 'en'

const esEntries = [
  ['Home', 'Inicio'],
  ['Solutions', 'Soluciones'],
  ['Services', 'Servicios'],
  ['Industries', 'Industrias'],
  ['About', 'Acerca de'],
  ['Contact', 'Contacto'],
  ['Book a Consultation', 'Agenda una Consulta'],
  ['Explore Solutions', 'Explorar Soluciones'],
  ['View Services', 'Ver Servicios'],
  ['View All Services', 'Ver Todos los Servicios'],
  ['Explore Industries', 'Explorar Industrias'],
  ['Contact Us', 'Contáctanos'],
  ['Email Us', 'Enviar Email'],
  ['Next Step', 'Siguiente Paso'],
  ['Start Practical', 'Empieza de forma práctica'],
  ['AI-Powered Customer Experience', 'Experiencia del Cliente con IA'],
  ['AI-Powered Customer Experience for Growing SMBs', 'Experiencia del Cliente con IA para SMBs en crecimiento'],
  [
    'DBX Solutions helps small and mid-sized businesses automate customer conversations, improve response times, and create smarter customer journeys without adding operational complexity.',
    'DBX Solutions ayuda a pequeñas y medianas empresas a automatizar conversaciones con clientes, mejorar tiempos de respuesta y crear recorridos más inteligentes sin agregar complejidad operativa.'
  ],
  [
    'Practical AI solutions designed for real business operations, not generic automation.',
    'Soluciones prácticas de IA diseñadas para operaciones reales, no automatización genérica.'
  ],
  ['Respond faster to customers', 'Responder más rápido a los clientes'],
  ['Reduce repetitive manual work', 'Reducir trabajo manual repetitivo'],
  ['Capture and qualify more leads', 'Capturar y calificar más prospectos'],
  ['Connect conversations with business tools', 'Conectar conversaciones con herramientas del negocio'],
  ['The Challenge', 'El Reto'],
  [
    'Customer expectations are rising. Manual processes are slowing businesses down.',
    'Las expectativas de los clientes están subiendo. Los procesos manuales están frenando a las empresas.'
  ],
  [
    'Many growing businesses rely on small teams, disconnected tools, and manual follow-ups to manage customer conversations. As demand increases, response times slow down, leads get missed, and teams spend too much time on repetitive tasks.',
    'Muchas empresas en crecimiento dependen de equipos pequeños, herramientas desconectadas y seguimientos manuales para gestionar conversaciones. A medida que aumenta la demanda, las respuestas se retrasan, se pierden prospectos y el equipo dedica demasiado tiempo a tareas repetitivas.'
  ],
  ['Slow Response Times', 'Tiempos de respuesta lentos'],
  [
    'Customers expect quick answers. When teams are busy, delayed responses can lead to missed opportunities and lower satisfaction.',
    'Los clientes esperan respuestas rápidas. Cuando el equipo está ocupado, las demoras pueden generar oportunidades perdidas y menor satisfacción.'
  ],
  ['Repetitive Customer Questions', 'Preguntas repetitivas de clientes'],
  [
    'Teams spend valuable time answering the same questions across email, chat, forms, and other customer communication channels.',
    'Los equipos invierten tiempo valioso respondiendo las mismas preguntas por email, chat, formularios y otros canales.'
  ],
  ['Missed Leads and Follow-Ups', 'Prospectos y seguimientos perdidos'],
  [
    'Without automated qualification and routing, interested prospects can fall through the cracks before the team responds.',
    'Sin calificación y enrutamiento automatizados, los prospectos interesados pueden perderse antes de que el equipo responda.'
  ],
  ['Disconnected Tools', 'Herramientas desconectadas'],
  [
    'Customer conversations, CRM data, support requests, and internal workflows are often spread across systems that do not work smoothly together.',
    'Las conversaciones, los datos del CRM, las solicitudes de soporte y los flujos internos suelen estar repartidos en sistemas que no trabajan bien juntos.'
  ],
  ['Limited Team Capacity', 'Capacidad limitada del equipo'],
  [
    'Growing businesses need better customer experience, but hiring more people is not always the fastest or most efficient solution.',
    'Las empresas en crecimiento necesitan una mejor experiencia de cliente, pero contratar más personas no siempre es la solución más rápida o eficiente.'
  ],
  ['The Solution', 'La Solución'],
  ['Smarter customer conversations. Simpler business operations.', 'Conversaciones más inteligentes. Operaciones más simples.'],
  [
    'DBX Solutions designs and implements AI-powered customer experience systems that help businesses respond faster, support customers more consistently, and streamline the way work moves across teams and tools.',
    'DBX Solutions diseña e implementa sistemas de experiencia del cliente con IA que ayudan a responder más rápido, dar soporte más consistente y mejorar cómo el trabajo se mueve entre equipos y herramientas.'
  ],
  [
    'Instead of adding more complexity, we help your business use AI where it creates real operational value: customer communication, lead qualification, support automation, workflow integration, and process improvement.',
    'En vez de agregar complejidad, ayudamos a usar IA donde crea valor operativo real: comunicación con clientes, calificación de prospectos, automatización de soporte, integración de workflows y mejora de procesos.'
  ],
  ['Conversational AI', 'IA conversacional'],
  [
    'AI assistants that answer questions, guide customers, collect information, and support conversations across digital channels.',
    'Asistentes de IA que responden preguntas, guían clientes, recopilan información y apoyan conversaciones en canales digitales.'
  ],
  ['Customer Experience Automation', 'Automatización de experiencia del cliente'],
  [
    'Automated flows that improve speed, consistency, and service quality across common customer interactions.',
    'Flujos automatizados que mejoran velocidad, consistencia y calidad de servicio en interacciones comunes.'
  ],
  ['Workflow Integration', 'Integración de flujos de trabajo'],
  [
    'Connected systems that move customer information between tools, teams, and processes more efficiently.',
    'Sistemas conectados que mueven información de clientes entre herramientas, equipos y procesos con mayor eficiencia.'
  ],
  ['AI Strategy and Implementation', 'Estrategia e implementación de IA'],
  [
    'Practical guidance and implementation support to help your business adopt AI with clarity, control, and measurable purpose.',
    'Guía práctica y soporte de implementación para adoptar IA con claridad, control y propósito medible.'
  ],
  ['AI solutions designed around your customer journey', 'Soluciones de IA diseñadas alrededor del recorrido del cliente'],
  [
    'Every business has different customer touchpoints, tools, and operational challenges. DBX Solutions helps identify where AI can make the greatest impact, then designs solutions that fit your workflows, team capacity, and business goals.',
    'Cada empresa tiene puntos de contacto, herramientas y retos operativos diferentes. DBX Solutions ayuda a identificar dónde la IA puede generar mayor impacto y diseña soluciones que encajan con tus flujos, capacidad del equipo y metas.'
  ],
  ['AI Customer Assistants', 'Asistentes de IA para clientes'],
  [
    'Create intelligent assistants that answer common questions, guide customers, collect information, and support your team across digital channels.',
    'Crea asistentes inteligentes que responden preguntas comunes, guían clientes, recopilan información y apoyan a tu equipo en canales digitales.'
  ],
  ['Lead Qualification Automation', 'Automatización de calificación de prospectos'],
  [
    'Use AI-powered conversation flows to capture prospect details, qualify interest, ask the right questions, and route leads to the right next step.',
    'Usa flujos conversacionales con IA para capturar detalles, calificar interés, hacer las preguntas correctas y dirigir cada prospecto al siguiente paso.'
  ],
  ['Customer Support Automation', 'Automatización de soporte al cliente'],
  [
    'Automate common support interactions, frequently asked questions, intake forms, ticket routing, and customer updates.',
    'Automatiza interacciones comunes de soporte, preguntas frecuentes, formularios de intake, enrutamiento de tickets y actualizaciones al cliente.'
  ],
  ['CRM and Workflow Integration', 'Integración de CRM y flujos de trabajo'],
  ['AI Strategy and Roadmapping', 'Estrategia y roadmap de IA'],
  ['Optimization and Continuous Improvement', 'Optimización y mejora continua'],
  ['Best for', 'Ideal para'],
  ['Business outcome', 'Resultado de negocio'],
  ['Business Impact', 'Impacto de Negocio'],
  ['Built to improve customer experience without overwhelming your team', 'Diseñado para mejorar la experiencia sin abrumar al equipo'],
  ['Faster Response Times', 'Respuestas más rápidas'],
  ['Fewer Missed Opportunities', 'Menos oportunidades perdidas'],
  ['Reduced Manual Workload', 'Menor carga manual'],
  ['Better Customer Satisfaction', 'Mayor satisfacción del cliente'],
  ['More Consistent Communication', 'Comunicación más consistente'],
  ['Scalable Support', 'Soporte escalable'],
  ['Improved Operational Visibility', 'Mejor visibilidad operativa'],
  ['Practical AI Adoption', 'Adopción práctica de IA'],
  ['Our Process', 'Nuestro Proceso'],
  ['A simple path from AI idea to business impact', 'Un camino simple desde la idea de IA hasta impacto de negocio'],
  ['Discover', 'Descubrir'],
  ['Design', 'Diseñar'],
  ['Implement', 'Implementar'],
  ['Optimize', 'Optimizar'],
  ['Use Cases', 'Casos de Uso'],
  ['AI customer experience solutions for service-driven businesses', 'Soluciones de experiencia del cliente con IA para negocios de servicios'],
  ['Professional Services', 'Servicios profesionales'],
  ['Healthcare and Wellness Clinics', 'Clínicas de salud y bienestar'],
  ['Real Estate Teams', 'Equipos inmobiliarios'],
  ['Local Service Businesses', 'Negocios locales de servicios'],
  ['E-Commerce Businesses', 'E-commerce'],
  ['Education and Training Providers', 'Educación y capacitación'],
  ['Financial and Advisory Services', 'Servicios financieros y de asesoría'],
  ['Why DBX Solutions', 'Por qué DBX Solutions'],
  ['Practical AI implementation with a human-centered approach', 'Implementación práctica de IA con un enfoque humano'],
  ['SMB-Focused', 'Enfocado en SMBs'],
  ['Business-First Approach', 'Enfoque primero en el negocio'],
  ['Human Oversight', 'Supervisión humana'],
  ['Integration-Aware', 'Consciente de integraciones'],
  ['Outcome-Oriented', 'Orientado a resultados'],
  ['Built to Improve', 'Diseñado para mejorar'],
  ['Questions businesses ask before adopting AI', 'Preguntas que hacen las empresas antes de adoptar IA'],
  ['Ready to improve your customer experience with practical AI?', '¿Listo para mejorar la experiencia del cliente con IA práctica?'],
  [
    'Let’s identify where automation can help your business respond faster, serve customers better, and operate more efficiently.',
    'Identifiquemos dónde la automatización puede ayudar a tu negocio a responder más rápido, servir mejor a los clientes y operar con más eficiencia.'
  ],
  [
    'No generic AI pitch. Just a focused conversation about your business, your customer journey, and where AI can create real value.',
    'Sin discurso genérico de IA. Solo una conversación enfocada sobre tu negocio, el recorrido del cliente y dónde la IA puede crear valor real.'
  ],
  ['Build a smarter customer experience without overwhelming your team.', 'Construye una experiencia de cliente más inteligente sin abrumar a tu equipo.'],
  ['Solutions that make AI practical for your business', 'Servicios que hacen la IA práctica para tu negocio'],
  ['Helping SMBs turn AI into better customer experiences', 'Ayudamos a SMBs a convertir IA en mejores experiencias de cliente'],
  ['Let’s explore how AI can improve your customer experience', 'Exploremos cómo la IA puede mejorar tu experiencia del cliente'],
  ['Request Consultation', 'Solicitar Consulta'],
  ['First name', 'Nombre'],
  ['Last name', 'Apellido'],
  ['Business email', 'Email de negocio'],
  ['Company name', 'Empresa'],
  ['Phone number', 'Teléfono'],
  ['Website', 'Sitio web'],
  ['What are you looking to improve?', '¿Qué quieres mejorar?'],
  ['Select one', 'Selecciona una opción'],
  ['Customer response times', 'Tiempos de respuesta al cliente'],
  ['Workflow integration', 'Integración de workflows'],
  ['AI strategy', 'Estrategia de IA'],
  ['Not sure yet', 'Aún no estoy seguro'],
  ['Message', 'Mensaje'],
  ['Book directly on the calendar', 'Agenda directamente en el calendario'],
  ['Thank you. Your request has been captured for follow-up.', 'Gracias. Tu solicitud fue capturada para seguimiento.'],
  ['Privacy Policy', 'Política de Privacidad'],
  ['Terms of Service', 'Términos de Servicio'],
  ['Customer message', 'Mensaje del cliente'],
  ['AI assistant', 'Asistente de IA'],
  ['Workflow automation', 'Automatización de workflow'],
  ['CRM / team follow-up', 'CRM / seguimiento del equipo'],
  ['Incoming', 'Entrada'],
  ['Team handoff', 'Traspaso al equipo'],
  ['Qualify, answer, route', 'Califica, responde, enruta'],
  ['Lead summary sent with next step', 'Resumen del prospecto enviado con siguiente paso']
]

const translations = new Map(esEntries)

export function getLocale() {
  const stored = localStorage.getItem(storageKey)
  return stored === 'es' ? 'es' : defaultLocale
}

export function translateText(value, locale = getLocale()) {
  if (locale !== 'es' || !value) return value
  let translated = value
  const sorted = [...translations.entries()].sort((a, b) => b[0].length - a[0].length)
  sorted.forEach(([source, target]) => {
    translated = translated.split(source).join(target)
  })
  return translated
}

export function translateHtml(html, locale = getLocale()) {
  return translateText(html, locale)
}

export function renderLangToggle(locale = getLocale()) {
  return `
    <div class="lang-toggle" aria-label="Language">
      <button class="${locale === 'en' ? 'active' : ''}" data-locale="en" type="button">EN</button>
      <button class="${locale === 'es' ? 'active' : ''}" data-locale="es" type="button">ES</button>
    </div>
  `
}

export function bindLocaleToggle(pageKey, mountPage) {
  document.querySelectorAll('.lang-toggle button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const locale = event.currentTarget.dataset.locale
      if (!locale) return
      localStorage.setItem(storageKey, locale)
      mountPage(pageKey)
    })
  })
}


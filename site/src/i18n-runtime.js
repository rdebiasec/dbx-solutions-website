const storageKey = 'dbx-locale'
const defaultLocale = 'en'
/** Add 'pt' and ptEntries to localeCatalogs when Brazilian Portuguese launches */
const supportedLocales = ['en', 'es']
const localeLabels = { en: 'EN', es: 'ES', pt: 'PT' }

const esEntries = [
  ['Home', 'Inicio'],
  ['Solutions', 'Soluciones'],
  ['Services', 'Servicios'],
  ['Industries', 'Industrias'],
  ['About', 'Acerca de'],
  ['Contact', 'Contacto'],
  ['Book a Consultation', 'Agenda una Consulta'],
  ['Book a Free Consultation', 'Agenda una Consulta Gratis'],
  ['Explore Solutions', 'Explorar Soluciones'],
  ['Explore service', 'Explorar servicio'],
  ['View Services', 'Ver Servicios'],
  ['View All Services', 'Ver Todos los Servicios'],
  ['Explore Industries', 'Explorar Industrias'],
  ['Contact Us', 'Contáctanos'],
  ['Email Us', 'Enviar Email'],
  ['Next Step', 'Siguiente Paso'],
  ['Start Practical', 'Empieza de forma práctica'],
  ['DBX Solutions | WhatsApp & AI Customer Experience for SMBs', 'DBX Solutions | WhatsApp y experiencia del cliente con IA para PyMes'],
  ['DBX Solutions | AI-Powered Customer Experience for SMBs', 'DBX Solutions | WhatsApp y experiencia del cliente con IA para PyMes'],
  ['AI-Powered Customer Experience', 'Experiencia del Cliente con IA'],
  ['AI-Powered Customer Experience for Growing SMBs', 'Experiencia del Cliente con IA para PyMes en crecimiento'],
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
    'Agentic AI that answers questions, takes action, collects information, and supports conversations across digital channels.',
    'IA agéntica que responde preguntas, actúa, recopila información y apoya conversaciones en canales digitales.'
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
  ['Agentic AI for Customers', 'IA agéntica para clientes'],
  ['AI Customer Assistants', 'IA agéntica para clientes'],
  [
    'Agentic AI for WhatsApp, web chat, SMS, forms, and email that takes action—answers, qualifies, collects data, and routes follow-up. Not a scripted FAQ chatbot.',
    'IA agéntica para WhatsApp, chat web, SMS, formularios y email que actúa: responde, califica, recopila datos y enruta el seguimiento. No es un chatbot de preguntas frecuentes.'
  ],
  [
    'Create intelligent assistants that answer common questions, guide customers, collect information, and support your team across digital channels.',
    'IA agéntica que responde preguntas comunes, guía clientes, recopila información y activa el siguiente paso en tus canales digitales.'
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
  ['SMB-Focused', 'Enfocado en PyMes'],
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
  ['Helping SMBs turn AI into better customer experiences', 'Ayudamos a PyMes a convertir IA en mejores experiencias de cliente'],
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
  ['DBX AI Agent', 'Agente IA de DBX'],
  ['DBX Agent', 'Agente DBX'],
  ['AI assistant', 'Agente de IA'],
  ['DBX AI Assistant', 'Agente IA de DBX'],
  ['DBX Assistant', 'Agente DBX'],
  ['Workflow automation', 'Automatización de workflow'],
  ['CRM / team follow-up', 'CRM / seguimiento del equipo'],
  ['Incoming', 'Entrada'],
  ['Team handoff', 'Traspaso al equipo'],
  ['Qualify, answer, route', 'Califica, responde, enruta'],
  ['Lead summary sent with next step', 'Resumen del prospecto enviado con siguiente paso'],
  ['WhatsApp & Customer Channels', 'WhatsApp y canales del cliente'],
  [
    'Respond faster on WhatsApp and connect every conversation to your team—without hiring more staff.',
    'Responde más rápido en WhatsApp y conecta cada conversación con tu equipo, sin contratar más personal.'
  ],
  [
    'DBX implements and manages agentic AI for growing businesses—systems that respond, capture lead details, trigger follow-up in your CRM or team, and escalate when judgment matters. Not a traditional chatbot that only answers FAQs.',
    'DBX implementa y opera IA agéntica para negocios en crecimiento: sistemas que responden, capturan datos del prospecto, activan seguimiento en tu CRM o equipo y escalan cuando hace falta criterio humano. No es un chatbot tradicional que solo responde preguntas frecuentes.'
  ],
  ['WhatsApp, SMS, web chat, and email', 'WhatsApp, SMS, chat web y email'],
  ['Faster first response, including after hours', 'Primera respuesta más rápida, también fuera de horario'],
  ['Your team steps in when judgment matters', 'Tu equipo interviene cuando importa el criterio humano'],
  ['Results', 'Resultados'],
  ['Practical improvements businesses can measure', 'Mejoras prácticas que los negocios pueden medir'],
  [
    'DBX focuses on agentic AI that takes action—response speed, cleaner intake, and follow-up your team can use. Not traditional chatbot demos.',
    'DBX se enfoca en IA agéntica que actúa: velocidad de respuesta, intake más claro y seguimiento que tu equipo puede usar. No son demos de chatbot tradicional.'
  ],
  [
    'Free consultations include a channel review and three practical agentic AI opportunities.',
    'Las consultas gratis incluyen revisión de canales y tres oportunidades prácticas de IA agéntica.'
  ],
  ['Under 15 minutes', 'Menos de 15 minutos'],
  [
    'Typical first-response improvement on WhatsApp and chat after launch.',
    'Mejora típica en la primera respuesta por WhatsApp y chat después del lanzamiento.'
  ],
  ['Structured intake', 'Intake estructurado'],
  [
    'Lead details captured before your team picks up the conversation.',
    'Datos del prospecto capturados antes de que tu equipo retome la conversación.'
  ],
  ['Human oversight', 'Supervisión humana'],
  [
    'Escalation paths keep your team in control of important decisions.',
    'Rutas de escalamiento mantienen a tu equipo al control de decisiones importantes.'
  ],
  [
    'DBX helped us organize WhatsApp inquiries and give the team useful context before follow-up. Responses got faster without adding headcount.',
    'DBX nos ayudó a organizar consultas de WhatsApp y dar contexto útil al equipo antes del seguimiento. Las respuestas fueron más rápidas sin aumentar personal.'
  ],
  ['Operations Lead', 'Líder de operaciones'],
  ['U.S. services business', 'Negocio de servicios en EE. UU.'],
  [
    'Free consultation includes a review of your customer channels and three practical automation opportunities.',
    'La consulta gratis incluye revisión de tus canales de clientes y tres oportunidades prácticas de automatización.'
  ],
  [
    'Identify the first WhatsApp workflow worth improving.',
    'Identifica el primer flujo de WhatsApp que vale la pena mejorar.'
  ],
  [
    'Bring your current channels, common questions, and follow-up process. We will show you where response, intake, or qualification should become clearer first.',
    'Trae tus canales actuales, preguntas comunes y proceso de seguimiento. Te mostraremos dónde conviene aclarar primero la respuesta, el intake o la calificación.'
  ],
  [
    'Every consultation includes three practical automation opportunities for your business.',
    'Cada consulta incluye tres oportunidades prácticas de automatización para tu negocio.'
  ],
  ['Review My WhatsApp Workflow', 'Revisar mi flujo de WhatsApp'],
  [
    'A focused 30-minute consultation reviews your customer journey, tools, and the operational gap costing you leads or response time.',
    'Una consulta enfocada de 30 minutos revisa tu recorrido del cliente, herramientas y la brecha operativa que te cuesta prospectos o tiempo de respuesta.'
  ],
  [
    'Start with one workflow, then expand based on what works.',
    'Empieza con un flujo y luego expande según lo que funcione.'
  ],
  ['Book a 30-Minute Consultation', 'Agendar consulta de 30 minutos'],
  ['Ready to improve WhatsApp response and lead follow-up?', '¿Listo para mejorar la respuesta en WhatsApp y el seguimiento de prospectos?'],
  [
    'Book a free consultation. We will review your channels, identify the first workflow to improve, and outline three practical agentic AI opportunities for your business.',
    'Agenda una consulta gratis. Revisaremos tus canales, identificaremos el primer flujo a mejorar y delinearemos tres oportunidades prácticas de IA agéntica para tu negocio.'
  ],
  [
    'DBX Solutions helps growing businesses improve customer conversations on WhatsApp and other channels, qualify leads, reduce repetitive work, and connect AI with real operations.',
    'DBX Solutions ayuda a negocios en crecimiento a mejorar conversaciones en WhatsApp y otros canales, calificar prospectos, reducir trabajo repetitivo y conectar IA con operaciones reales.'
  ],
  [
    'DBX Solutions helps growing businesses respond faster on WhatsApp, qualify leads, automate repetitive conversations, and connect customer interactions with the tools their teams already use.',
    'DBX Solutions ayuda a negocios en crecimiento a responder más rápido en WhatsApp, calificar prospectos, automatizar conversaciones repetitivas y conectar interacciones con clientes a las herramientas que su equipo ya usa.'
  ],
  [
    'Book a consultation or send a quick request.',
    'Agenda una consulta o envía una solicitud breve.'
  ],
  [
    'Prefer the fastest path? Use the calendar. Only need a short note? The form takes under a minute.',
    '¿Prefieres el camino más rápido? Usa el calendario. ¿Solo una nota breve? El formulario toma menos de un minuto.'
  ],
  ['Name', 'Nombre'],
  ['Your name', 'Tu nombre'],
  ['Phone or WhatsApp', 'Teléfono o WhatsApp'],
  ['(optional)', '(opcional)'],
  [
    'Share your main channel, common questions, or follow-up challenge.',
    'Comparte tu canal principal, preguntas comunes o reto de seguimiento.'
  ],
  [
    'Let’s review where WhatsApp and customer conversations are costing you time or leads',
    'Revisemos dónde WhatsApp y las conversaciones con clientes te cuestan tiempo o prospectos'
  ],
  [
    'Book on the calendar for the fastest response, or send a short request below. We will help identify the most practical first workflow to improve.',
    'Agenda en el calendario para la respuesta más rápida, o envía una solicitud breve abajo. Te ayudaremos a identificar el primer flujo práctico a mejorar.'
  ],
  [
    'DBX Solutions helps growing businesses turn WhatsApp and customer conversations into faster responses, qualified leads, and connected follow-up workflows.',
    'DBX Solutions ayuda a negocios en crecimiento a convertir WhatsApp y conversaciones con clientes en respuestas más rápidas, prospectos calificados y seguimiento conectado.'
  ],
  ['Practical AI for customer experience and operations.', 'IA práctica para experiencia del cliente y operaciones.'],
  [
    'Book a consultation with DBX Solutions to review WhatsApp, lead intake, support automation, and practical AI opportunities for your business.',
    'Agenda una consulta con DBX Solutions para revisar WhatsApp, intake de prospectos, automatización de soporte y oportunidades prácticas de IA para tu negocio.'
  ],
  ['Can you check my order status and send the latest delivery update?', '¿Puedes revisar el estado de mi pedido y enviarme la actualización de entrega?'],
  ['Can you check my order status?', '¿Puedes revisar el estado de mi pedido?'],
  [
    'I found your order. It is packed, assigned to delivery, and expected today between 2pm and 4pm.',
    'Encontré tu pedido. Está empacado, asignado para entrega y se espera hoy entre 2pm y 4pm.'
  ],
  [
    'Your order is packed and expected today between 2pm and 4pm.',
    'Tu pedido está empacado y se espera hoy entre 2pm y 4pm.'
  ],
  ['Can you notify my team too?', '¿También puedes avisar a mi equipo?'],
  ['Done. I synced the update to your CRM and sent the team alert with the customer note.', 'Listo. Sincronicé la actualización con tu CRM y envié la alerta al equipo con la nota del cliente.'],
  ['Done. I synced the update to your CRM and alerted your team.', 'Listo. Sincronicé la actualización con tu CRM y avisé a tu equipo.'],
  ['Perfect, thank you.', 'Perfecto, gracias.'],
  ['You are welcome. I will watch for delivery changes and update the record if anything shifts.', 'Con gusto. Vigilaré cambios de entrega y actualizaré el registro si algo cambia.'],
  ['You are welcome. I will watch for delivery changes.', 'Con gusto. Vigilaré cambios de entrega.'],
  ['online now', 'en línea ahora'],
  ['online', 'en línea'],
  ['add', 'agregar'],
  ['Today', 'Hoy'],
  ['End-to-end encrypted', 'Cifrado de extremo a extremo'],
  ['WhatsApp voice call', 'Llamada de voz de WhatsApp'],
  ['Audio', 'Audio'],
  ['Video', 'Video'],
  ['Mute', 'Silenciar'],
  ['End', 'Finalizar'],
  ['mobile 00:51', 'móvil 00:51'],
  ['mute', 'silenciar'],
  ['keypad', 'teclado'],
  ['speaker', 'altavoz'],
  ['add call', 'agregar llamada'],
  ['contacts', 'contactos'],
  [
    'From answering repetitive questions to chasing down leads, we take the "busy" out of business. It’s enterprise-grade automation that actually feels like help.',
    'IA práctica para soporte al cliente, engagement de prospectos, automatización de workflows y operaciones más inteligentes.'
  ],
  ['See How It Works', 'Ver cómo funciona'],
  ['Customer support automation', 'Automatización de soporte al cliente'],
  ['Lead engagement and qualification', 'Engagement y calificación de prospectos'],
  ['Workflow and CRM integration', 'Integración de CRM y workflows'],
  ['Human-supervised AI operations', 'Operaciones de IA con supervisión humana'],
  ['Slow responses', 'Respuestas lentas'],
  ['Customers move on when questions sit unanswered during busy hours or after closing.', 'Los clientes avanzan con otra opción cuando sus preguntas quedan sin respuesta en horas ocupadas o fuera de horario.'],
  ['Repetitive questions', 'Preguntas repetitivas'],
  ['Your team spends time repeating answers that could be handled consistently.', 'Tu equipo dedica tiempo a repetir respuestas que podrían manejarse de forma consistente.'],
  ['Missed leads', 'Prospectos perdidos'],
  ['High-intent inquiries lose momentum when follow-up is delayed or incomplete.', 'Las consultas con alta intención pierden impulso cuando el seguimiento es lento o incompleto.'],
  ['Disconnected tools', 'Herramientas desconectadas'],
  ['Conversation details often stay separate from the CRM, calendar, support desk, or team workflow.', 'Los detalles de las conversaciones suelen quedar separados del CRM, calendario, mesa de soporte o workflow del equipo.'],
  ['Limited team capacity', 'Capacidad limitada del equipo'],
  ['Growing demand creates more customer conversations than a lean team can manage manually.', 'La demanda creciente genera más conversaciones de las que un equipo pequeño puede manejar manualmente.'],
  ['Customer experience automation connected to real business operations.', 'Automatización de experiencia del cliente conectada a operaciones reales.'],
  [
    'DBX Solutions is not just another AI chat layer. We design customer conversation systems that collect the right information, trigger the right workflow, and give your team useful context.',
    'DBX Solutions no es solo otra capa de chat con IA. Diseñamos sistemas de conversación que recopilan la información correcta, activan el workflow adecuado y dan contexto útil al equipo.'
  ],
  [
    'The result is a practical operations layer for customer support, lead engagement, workflow automation, and smarter follow-up.',
    'El resultado es una capa operativa práctica para soporte, engagement de prospectos, automatización de workflows y seguimiento más inteligente.'
  ],
  ['Customer Channels', 'Canales del cliente'],
  ['WhatsApp, web chat, SMS, forms, and email.', 'WhatsApp, chat web, SMS, formularios y email.'],
  ['WhatsApp', 'WhatsApp'],
  ['Web chat', 'Chat web'],
  ['Forms', 'Formularios'],
  ['Email', 'Email'],
  ['Answers, qualifies, collects information, and routes each conversation.', 'Responde, califica, recopila información y enruta cada conversación.'],
  ['Answer', 'Responder'],
  ['Qualify', 'Calificar'],
  ['Collect', 'Recopilar'],
  ['Route', 'Enrutar'],
  ['Business Systems', 'Sistemas del negocio'],
  ['Connects customer context to your CRM, calendar, support desk, and team notifications.', 'Conecta el contexto del cliente con CRM, calendario, soporte y notificaciones del equipo.'],
  ['Calendar', 'Calendario'],
  ['Support desk', 'Mesa de soporte'],
  ['Team notifications', 'Notificaciones del equipo'],
  ['Human Team', 'Equipo humano'],
  ['Your team reviews, follows up, closes opportunities, and supports customers when human judgment matters.', 'Tu equipo revisa, da seguimiento, cierra oportunidades y atiende clientes cuando se necesita criterio humano.'],
  ['Review', 'Revisar'],
  ['Follow up', 'Dar seguimiento'],
  ['Close', 'Cerrar'],
  ['Support', 'Atender'],
  ['Managed AI Operations', 'Operaciones Gestionadas de IA'],
  ['Launch is only the beginning.', 'El lanzamiento es solo el comienzo.'],
  [
    'AI systems need ongoing review, tuning, and improvement. DBX helps keep your agentic AI accurate, useful, and aligned with your business as customer behavior and workflows change.',
    'Los sistemas de IA necesitan revisión, ajuste y mejora continua. DBX ayuda a mantener tu IA agéntica precisa, útil y alineada con el negocio a medida que cambian los clientes y workflows.'
  ],
  ['Conversation quality review', 'Revisión de calidad conversacional'],
  ['Workflow performance monitoring', 'Monitoreo de desempeño de workflows'],
  ['AI response improvement', 'Mejora de respuestas de IA'],
  ['New automation opportunities', 'Nuevas oportunidades de automatización'],
  ['Operational improvements your team and customers can feel.', 'Mejoras operativas que tu equipo y tus clientes pueden sentir.'],
  ['Faster response times', 'Tiempos de respuesta más rápidos'],
  ['Fewer missed opportunities', 'Menos oportunidades perdidas'],
  ['Reduced manual workload', 'Menor carga manual'],
  ['More consistent customer communication', 'Comunicación con clientes más consistente'],
  ['Better operational visibility', 'Mejor visibilidad operativa'],
  ['Scalable support without immediate headcount growth', 'Soporte escalable sin aumentar personal de inmediato'],
  ['Industries', 'Industrias'],
  ['High-priority SMB sectors', 'Sectores PyMes prioritarios'],
  ['Additional sectors', 'Sectores adicionales'],
  ['Professional services', 'Servicios profesionales'],
  ['Healthcare and wellness clinics', 'Clínicas de salud y bienestar'],
  ['Real estate teams', 'Equipos inmobiliarios'],
  ['Local service businesses', 'Negocios locales de servicios'],
  ['E-commerce', 'E-commerce'],
  ['Education and training', 'Educación y capacitación'],
  ['Financial and advisory services', 'Servicios financieros y de asesoría'],
  ['A practical partner for customer experience systems.', 'Un socio práctico para sistemas de experiencia del cliente.'],
  [
    'We do not just launch agentic AI. We design, connect, monitor, and improve customer experience systems around your real business operations.',
    'No solo lanzamos IA agéntica. Diseñamos, conectamos, monitoreamos y mejoramos sistemas de experiencia del cliente alrededor de tus operaciones reales.'
  ],
  [
    'We do not just launch AI assistants. We design, connect, monitor, and improve customer experience systems around your real business operations.',
    'No solo lanzamos IA agéntica. Diseñamos, conectamos, monitoreamos y mejoramos sistemas de experiencia del cliente alrededor de tus operaciones reales.'
  ],
  ['SMB-focused implementation', 'Implementación enfocada en PyMes'],
  ['Business-first design', 'Diseño primero en el negocio'],
  ['Human-supervised AI', 'IA supervisada por humanos'],
  ['Integration-aware solutions', 'Soluciones conscientes de integraciones'],
  ['Outcome-oriented delivery', 'Entrega orientada a resultados'],
  ['Continuous improvement', 'Mejora continua'],
  ['Can this work with WhatsApp?', '¿Puede funcionar con WhatsApp?'],
  ['Can humans take over conversations?', '¿Los humanos pueden tomar control de conversaciones?'],
  ['How are AI responses controlled?', '¿Cómo se controlan las respuestas de IA?'],
  ['What does DBX Solutions do?', '¿Qué hace DBX Solutions?'],
  ['How long does implementation take?', '¿Cuánto tarda la implementación?'],
  ['Will AI replace our customer service team?', '¿La IA reemplazará a nuestro equipo de atención al cliente?'],
  ['Start With a Practical AI Consultation', 'Empieza con una consulta práctica de IA'],
  ['Start with a practical AI consultation.', 'Empieza con una consulta práctica de IA.'],
  ['LinkedIn', 'LinkedIn'],
  ['Serving SMBs remotely across the U.S. and Latin America.', 'Atendemos PyMes de forma remota en EE. UU. y Latinoamérica.'],
  ['Serving businesses remotely across the U.S. and Latin America.', 'Atendemos negocios de forma remota en EE. UU. y Latinoamérica.'],
  ['Verified Accuracy', 'Precisión Verificada'],
  [
    'Answers grounded in your specific business data for total precision.',
    'Respuestas basadas en los datos específicos de tu negocio para máxima precisión.'
  ],
  ['Unified Channels', 'Canales Unificados'],
  [
    'Connect everywhere: WhatsApp, SMS, Web, and Email in one place.',
    'Conecta en todas partes: WhatsApp, SMS, web y email en un solo lugar.'
  ],
  ['Integrated Workflows', 'Workflows Integrados'],
  [
    'Instant sync with your CRM, calendar, and team for zero-lag follow-up.',
    'Sincronización instantánea con tu CRM, calendario y equipo para seguimiento sin demoras.'
  ],
  ['Smart Escalation', 'Escalamiento Inteligente'],
  [
    'Seamless hand-offs to your team exactly when a human touch is needed.',
    'Traspasos fluidos a tu equipo justo cuando se necesita intervención humana.'
  ],
  ['SMS Terms', 'Términos SMS'],
  ['Data Handling Notice', 'Aviso de Manejo de Datos'],
  ['Responsible AI Policy', 'Política de IA Responsable'],
  ['Security Roadmap', 'Roadmap de Seguridad'],
  ['Legal', 'Legal'],
  ['Priority focus', 'Enfoque prioritario'],
  ['Managed partner', 'Socio gestionado'],
  ['Support answers with approved context', 'Respuestas de soporte con contexto aprobado'],
  [
    'Lead intake across WhatsApp, chat, SMS, forms, and email',
    'Intake de prospectos en WhatsApp, chat, SMS, formularios y email'
  ],
  [
    'CRM, calendar, and team follow-up workflows',
    'Workflows de CRM, calendario y seguimiento del equipo'
  ],
  [
    'Human review and escalation when it matters',
    'Revisión humana y escalamiento cuando importa'
  ],
  [
    'Customer conversations connected to business operations',
    'Conversaciones con clientes conectadas a operaciones del negocio'
  ],
  ['Team alerts', 'Alertas del equipo'],
  [
    'Customer demand grows faster than manual follow-up can keep up.',
    'La demanda de clientes crece más rápido de lo que el seguimiento manual puede sostener.'
  ],
  [
    'For many SMBs, the issue is not effort. It is that conversations, customer details, and next steps are spread across busy people and disconnected tools.',
    'Para muchas PyMes, el problema no es falta de esfuerzo. Es que las conversaciones, datos del cliente y siguientes pasos están repartidos entre personas ocupadas y herramientas desconectadas.'
  ],
  [
    'DBX Solutions designs customer conversation systems that collect the right information, trigger the right workflow, and give your team useful context.',
    'DBX Solutions diseña sistemas de conversación con clientes que recopilan la información correcta, activan el workflow adecuado y dan contexto útil al equipo.'
  ],
  [
    'The result is a practical bridge between customer communication and the work your team already needs to do.',
    'El resultado es un puente práctico entre la comunicación con clientes y el trabajo que tu equipo ya necesita hacer.'
  ],
  [
    'Customers reach out through the channels they already use.',
    'Los clientes escriben por los canales que ya usan.'
  ],
  [
    'The agent answers common questions, qualifies intent, collects details, triggers follow-up, and updates your tools when needed.',
    'El agente responde preguntas comunes, califica intención, recopila detalles, activa el seguimiento y actualiza tus herramientas cuando hace falta.'
  ],
  [
    'The assistant answers common questions, qualifies intent, collects details, and routes the next step.',
    'El agente responde preguntas comunes, califica intención, recopila detalles y enruta el siguiente paso.'
  ],
  [
    'Useful customer context moves into the tools your team uses to manage work.',
    'El contexto útil del cliente se mueve a las herramientas que tu equipo usa para gestionar el trabajo.'
  ],
  [
    'People stay in control for follow-up, exceptions, decisions, and customer relationships.',
    'Las personas mantienen el control del seguimiento, excepciones, decisiones y relaciones con clientes.'
  ],
  [
    'Each service starts with a clear operational need, then turns it into a customer-facing workflow your team can manage.',
    'Cada servicio empieza con una necesidad operativa clara y la convierte en un workflow de cara al cliente que tu equipo puede gestionar.'
  ],
  [
    'Customer-facing assistants for WhatsApp, web chat, SMS, forms, and email that answer common questions and guide people to the right next step.',
    'IA agéntica de cara al cliente para WhatsApp, chat web, SMS, formularios y email que actúa y guía al siguiente paso correcto.'
  ],
  [
    'Businesses that need dependable first-response coverage without adding complexity.',
    'Negocios que necesitan cobertura confiable de primera respuesta sin agregar complejidad.'
  ],
  [
    'Clearer conversations and faster next steps, with handoff paths when people need to step in.',
    'Conversaciones más claras y siguientes pasos más rápidos, con rutas de traspaso cuando una persona debe intervenir.'
  ],
  [
    'Structured intake flows that ask the right questions, capture buyer details, qualify fit, and route sales-ready leads with useful context.',
    'Flujos de intake estructurados que hacen las preguntas correctas, capturan datos del comprador, califican fit y enrutan prospectos listos con contexto útil.'
  ],
  [
    'Teams receiving inquiries through WhatsApp, chat, forms, email, or booking requests.',
    'Equipos que reciben consultas por WhatsApp, chat, formularios, email o solicitudes de reserva.'
  ],
  [
    'More organized follow-up and cleaner information for sales conversations.',
    'Seguimiento más organizado e información más limpia para conversaciones comerciales.'
  ],
  [
    'Handle common questions, support intake, ticket routing, status updates, and escalation paths for routine customer needs.',
    'Maneja preguntas comunes, intake de soporte, ruteo de tickets, actualizaciones de estado y escalamiento para necesidades rutinarias.'
  ],
  [
    'Support teams spending too much time on repeat requests and intake triage.',
    'Equipos de soporte que dedican demasiado tiempo a solicitudes repetidas y triage de intake.'
  ],
  [
    'More consistent support coverage while the team focuses on higher-value issues.',
    'Cobertura de soporte más consistente mientras el equipo se enfoca en temas de mayor valor.'
  ],
  [
    'Smoother handoffs, fewer manual updates, and better visibility into customer activity.',
    'Traspasos más fluidos, menos actualizaciones manuales y mejor visibilidad sobre la actividad del cliente.'
  ],
  [
    'Connect customer conversations with CRM records, calendars, support desks, internal notifications, and operational workflows.',
    'Conecta conversaciones con clientes con registros de CRM, calendarios, mesas de soporte, notificaciones internas y workflows operativos.'
  ],
  [
    'Businesses using multiple tools that do not communicate effectively.',
    'Empresas que usan varias herramientas que no se comunican de forma efectiva.'
  ],
  [
    'Review your customer journey, tools, team capacity, and operational goals to identify the best practical AI starting points.',
    'Revisa tu recorrido del cliente, herramientas, capacidad del equipo y metas operativas para identificar los mejores puntos de partida prácticos para IA.'
  ],
  [
    'Businesses that want AI clarity before investing in implementation.',
    'Empresas que quieren claridad sobre IA antes de invertir en implementación.'
  ],
  [
    'A focused roadmap tied to customer experience and operational value.',
    'Un roadmap enfocado ligado a experiencia del cliente y valor operativo.'
  ],
  [
    'Review real conversations, improve responses, tune workflows, and expand useful improvements as your business changes.',
    'Revisa conversaciones reales, mejora respuestas, ajusta workflows y expande mejoras útiles a medida que cambia tu negocio.'
  ],
  [
    'Review real customer interactions to spot unclear answers, missed intent, and handoff improvements.',
    'Revisa interacciones reales con clientes para detectar respuestas poco claras, intención perdida y mejoras de traspaso.'
  ],
  [
    'Tune approved responses so agentic AI stays accurate, useful, and aligned with your business.',
    'Ajusta respuestas aprobadas para que la IA agéntica se mantenga precisa, útil y alineada con tu negocio.'
  ],
  ['Workflow monitoring', 'Monitoreo de workflows'],
  [
    'Track where workflows help, stall, or need adjustment as volume and customer behavior change.',
    'Monitorea dónde los workflows ayudan, se traban o necesitan ajustes cuando cambian el volumen y el comportamiento del cliente.'
  ],
  ['Automation optimization', 'Optimización de automatización'],
  [
    'Refine intake steps, routing rules, and follow-up triggers based on what customers actually do.',
    'Refina pasos de intake, reglas de ruteo y activadores de seguimiento según lo que los clientes realmente hacen.'
  ],
  ['Keep AI useful as your business changes.', 'Mantén la IA útil a medida que cambia tu negocio.'],
  [
    'AI systems require ongoing review, tuning, monitoring, and refinement. DBX helps keep agentic AI accurate, useful, and aligned with evolving workflows and customer needs.',
    'Los sistemas de IA requieren revisión, ajuste, monitoreo y refinamiento continuo. DBX ayuda a mantener la IA agéntica precisa, útil y alineada con workflows y necesidades de clientes en evolución.'
  ],
  [
    'AI systems require ongoing review, tuning, monitoring, and refinement. DBX helps keep assistants accurate, useful, and aligned with evolving workflows and customer needs.',
    'Los sistemas de IA requieren revisión, ajuste, monitoreo y refinamiento continuo. DBX ayuda a mantener la IA agéntica precisa, útil y alineada con workflows y necesidades de clientes en evolución.'
  ],
  [
    'DBX guides each project through a clear, low-risk process that starts with your customer journey and ends with ongoing operational improvement.',
    'DBX guía cada proyecto con un proceso claro y de bajo riesgo que empieza con tu recorrido del cliente y termina con mejora operativa continua.'
  ],
  [
    'A practical consultation keeps the first implementation focused.',
    'Una consulta práctica mantiene enfocada la primera implementación.'
  ],
  [
    'Managed AI Operations gives your business ongoing review, tuning, and improvement as conversations and workflows evolve.',
    'Operaciones Gestionadas de IA le da a tu negocio revisión, ajuste y mejora continua a medida que evolucionan las conversaciones y workflows.'
  ],
  [
    'Keep your AI assistant useful after launch.',
    'Mantén tu IA agéntica útil después del lanzamiento.'
  ],
  [
    'Agentic AI stays accurate, useful, and aligned with customer behavior.',
    'La IA agéntica se mantiene precisa, útil y alineada con el comportamiento del cliente.'
  ],
  [
    'AI works best when it is monitored, measured, and improved.',
    'La IA funciona mejor cuando se monitorea, se mide y se mejora.'
  ],
  [
    'DBX focuses on business outcomes that make customer communication clearer, follow-up easier, and support more scalable.',
    'DBX se enfoca en resultados de negocio que hacen la comunicación con clientes más clara, el seguimiento más fácil y el soporte más escalable.'
  ],
  [
    'Give customers a useful answer or next step while intent is still high.',
    'Da a los clientes una respuesta útil o un siguiente paso mientras la intención sigue alta.'
  ],
  [
    'Capture and route inquiries before prospects lose interest or choose another provider.',
    'Captura y enruta consultas antes de que los prospectos pierdan interés o elijan otro proveedor.'
  ],
  [
    'Move repetitive questions, intake, and routing out of your team’s daily queue.',
    'Saca preguntas repetitivas, intake y ruteo de la cola diaria de tu equipo.'
  ],
  [
    'Keep answers clear, approved, and aligned across channels and team handoffs.',
    'Mantén respuestas claras, aprobadas y alineadas entre canales y traspasos del equipo.'
  ],
  [
    'Turn conversations into structured information your team can review and act on.',
    'Convierte conversaciones en información estructurada que tu equipo puede revisar y accionar.'
  ],
  [
    'Handle more routine conversations while your team focuses on higher-value work.',
    'Maneja más conversaciones rutinarias mientras tu equipo se enfoca en trabajo de mayor valor.'
  ],
  [
    'We review your customer journey, current tools, common customer interactions, team workflows, and business goals.',
    'Revisamos tu recorrido del cliente, herramientas actuales, interacciones comunes, workflows del equipo y metas del negocio.'
  ],
  ['Identify customer experience gaps', 'Identificar brechas de experiencia del cliente'],
  ['Review repetitive tasks', 'Revisar tareas repetitivas'],
  ['Understand current systems', 'Entender sistemas actuales'],
  ['Define business priorities', 'Definir prioridades del negocio'],
  [
    'We map the right AI experience, conversation flows, automations, integrations, and success metrics.',
    'Mapeamos la experiencia de IA correcta, flujos conversacionales, automatizaciones, integraciones y métricas de éxito.'
  ],
  ['Design customer interaction flows', 'Diseñar flujos de interacción con clientes'],
  ['Define automation logic', 'Definir lógica de automatización'],
  ['Plan handoffs to your team', 'Planificar traspasos a tu equipo'],
  ['Align with your brand voice', 'Alinear con la voz de tu marca'],
  [
    'We build, configure, test, and launch the solution using your existing tools, workflows, and brand guidelines.',
    'Construimos, configuramos, probamos y lanzamos la solución usando tus herramientas, workflows y guías de marca existentes.'
  ],
  ['Configure agentic AI', 'Configurar IA agéntica'],
  ['Configure AI assistants', 'Configurar IA agéntica'],
  ['Connect systems where needed', 'Conectar sistemas donde sea necesario'],
  ['Test conversation quality', 'Probar la calidad conversacional'],
  ['Prepare your team for launch', 'Preparar a tu equipo para el lanzamiento'],
  [
    'We monitor performance, review user behavior, improve flows, and refine the solution as your business evolves.',
    'Monitoreamos el desempeño, revisamos comportamiento de usuarios, mejoramos flujos y refinamos la solución a medida que evoluciona tu negocio.'
  ],
  ['Review performance data', 'Revisar datos de desempeño'],
  ['Improve responses and flows', 'Mejorar respuestas y flujos'],
  ['Adjust automation rules', 'Ajustar reglas de automatización'],
  ['Identify new opportunities', 'Identificar nuevas oportunidades'],
  [
    'Map your first AI workflow with DBX.',
    'Mapea tu primer workflow de IA con DBX.'
  ],
  [
    'Bring your current customer channels, common questions, and follow-up process. We will help turn them into a practical implementation path.',
    'Trae tus canales actuales, preguntas comunes y proceso de seguimiento. Te ayudaremos a convertirlos en una ruta de implementación práctica.'
  ],
  [
    'Guided adoption makes AI feel lower-risk and easier to manage.',
    'La adopción guiada hace que la IA se sienta menos riesgosa y más fácil de gestionar.'
  ],
  [
    'Explore the first customer workflow worth improving.',
    'Explora el primer workflow de cliente que vale la pena mejorar.'
  ],
  [
    'We can help identify where customer response, intake, qualification, or follow-up should become clearer first.',
    'Podemos ayudar a identificar dónde conviene aclarar primero la respuesta, intake, calificación o seguimiento al cliente.'
  ],
  [
    'DBX helps SMBs design, connect, monitor, and improve AI-assisted customer conversation systems around real business workflows.',
    'DBX ayuda a PyMes a diseñar, conectar, monitorear y mejorar sistemas de conversación asistidos por IA alrededor de workflows reales.'
  ],
  [
    'DBX Solutions helps SMBs improve customer conversations, qualify leads, automate repetitive work, and connect AI with real business operations.',
    'DBX Solutions ayuda a PyMes a mejorar conversaciones con clientes, calificar prospectos, automatizar trabajo repetitivo y conectar IA con operaciones reales del negocio.'
  ],
  [
    'Designed for growing businesses that want clearer customer communication and practical AI implementation.',
    'Diseñado para negocios en crecimiento que quieren comunicación con clientes más clara e implementación práctica de IA.'
  ],
  [
    'Focused on SMB sectors where conversations drive revenue and service quality.',
    'Enfocado en sectores PyMes donde las conversaciones impulsan ingresos y calidad de servicio.'
  ],
  [
    'DBX is especially useful for businesses that depend on fast inquiry handling, clear intake, reliable follow-up, and repeatable customer support.',
    'DBX es especialmente útil para negocios que dependen de manejo rápido de consultas, intake claro, seguimiento confiable y soporte repetible.'
  ],
  [
    'Automate intake, qualify inquiries, route prospects, and improve response times for consulting, legal, financial, and advisory teams.',
    'Automatiza intake, califica consultas, enruta prospectos y mejora tiempos de respuesta para equipos de consultoría, legales, financieros y de asesoría.'
  ],
  [
    'Support appointment inquiries, FAQs, intake guidance, service information, and patient communication workflows.',
    'Atiende consultas de citas, FAQs, guía de intake, información de servicios y workflows de comunicación con pacientes.'
  ],
  [
    'Qualify buyer and seller inquiries, answer common property questions, route leads, and support faster follow-up.',
    'Califica consultas de compradores y vendedores, responde preguntas comunes sobre propiedades, enruta leads y apoya seguimiento más rápido.'
  ],
  [
    'Automate quote requests, booking inquiries, service questions, and customer follow-ups for high-message-volume teams.',
    'Automatiza solicitudes de cotización, consultas de reserva, preguntas de servicio y seguimientos para equipos con alto volumen de mensajes.'
  ],
  [
    'Support product questions, order-related inquiries, return guidance, and routine customer service requests.',
    'Atiende preguntas de producto, consultas de pedidos, guía de devoluciones y solicitudes rutinarias de servicio al cliente.'
  ],
  [
    'Answer program questions, qualify student or client interest, guide enrollment inquiries, and automate follow-up.',
    'Responde preguntas de programas, califica interés de estudiantes o clientes, guía consultas de inscripción y automatiza seguimiento.'
  ],
  [
    'Improve inquiry handling, appointment requests, client intake, and customer communication with human oversight.',
    'Mejora el manejo de consultas, solicitudes de citas, intake de clientes y comunicación con supervisión humana.'
  ],
  [
    'Solutions are designed for growing businesses that need practical value without enterprise-level complexity.',
    'Las soluciones están diseñadas para negocios en crecimiento que necesitan valor práctico sin complejidad empresarial.'
  ],
  [
    'We start with customer journeys, operational challenges, and business goals before recommending technology.',
    'Empezamos con recorridos de cliente, retos operativos y metas del negocio antes de recomendar tecnología.'
  ],
  [
    'AI supports your team while escalation, review, and judgment remain available when needed.',
    'La IA apoya a tu equipo mientras el escalamiento, la revisión y el criterio humano siguen disponibles cuando se necesitan.'
  ],
  [
    'We consider how AI fits with your existing channels, workflows, CRM, and customer communication tools.',
    'Consideramos cómo la IA encaja con tus canales, workflows, CRM y herramientas de comunicación existentes.'
  ],
  [
    'Every solution connects to a business outcome such as better lead handling, support consistency, or reduced manual work.',
    'Cada solución se conecta con un resultado de negocio como mejor manejo de leads, consistencia de soporte o menor trabajo manual.'
  ],
  [
    'We help refine flows, responses, and automations as your business learns what works best.',
    'Ayudamos a refinar flujos, respuestas y automatizaciones a medida que tu negocio aprende qué funciona mejor.'
  ],
  [
    'Agentic AI is built around approved business information, clear rules, escalation paths, and ongoing quality review.',
    'La IA agéntica se construye con información aprobada del negocio, reglas claras, rutas de escalamiento y revisión continua de calidad.'
  ],
  [
    'Assistants are built around approved business information, clear rules, escalation paths, and ongoing quality review.',
    'La IA agéntica se construye con información aprobada del negocio, reglas claras, rutas de escalamiento y revisión continua de calidad.'
  ],
  [
    'Yes. WhatsApp can be part of the channel mix along with web chat, SMS, forms, and email, depending on your setup.',
    'Sí. WhatsApp puede ser parte de la mezcla de canales junto con chat web, SMS, formularios y email, según tu configuración.'
  ],
  [
    'Yes. DBX designs escalation paths so your team can review, respond, or take over when a conversation needs human judgment.',
    'Sí. DBX diseña rutas de escalamiento para que tu equipo pueda revisar, responder o tomar control cuando una conversación requiere criterio humano.'
  ],
  [
    'Timing depends on scope, channels, and integrations. Many businesses start with one focused use case, then expand after launch.',
    'El tiempo depende del alcance, canales e integraciones. Muchas empresas empiezan con un caso de uso enfocado y luego expanden después del lanzamiento.'
  ],
  [
    'Can DBX connect with our existing tools?',
    '¿DBX puede conectarse con nuestras herramientas actuales?'
  ],
  [
    'In many cases, yes. DBX can connect conversations with CRMs, calendars, support systems, forms, notifications, and workflow tools.',
    'En muchos casos, sí. DBX puede conectar conversaciones con CRMs, calendarios, sistemas de soporte, formularios, notificaciones y herramientas de workflow.'
  ],
  [
    'No. The goal is to support your team, reduce repetitive work, and keep people focused on higher-value customer needs.',
    'No. El objetivo es apoyar a tu equipo, reducir trabajo repetitivo y mantener a las personas enfocadas en necesidades de clientes de mayor valor.'
  ],
  [
    'DBX Solutions helps small and mid-sized businesses turn customer conversations into clearer support, qualified leads, and connected follow-up workflows.',
    'DBX Solutions ayuda a pequeñas y medianas empresas a convertir conversaciones con clientes en soporte más claro, prospectos calificados y workflows de seguimiento conectados.'
  ],
  ['Practical solutions for WhatsApp, intake, and connected follow-up', 'Soluciones prácticas para WhatsApp, intake y seguimiento conectado'],
  [
    'DBX helps growing businesses turn WhatsApp and other customer channels into faster responses, clearer lead intake, and workflows your team can act on—without adding headcount.',
    'DBX ayuda a negocios en crecimiento a convertir WhatsApp y otros canales en respuestas más rápidas, intake de prospectos más claro y workflows accionables—sin contratar más personal.'
  ],
  ['Services that make WhatsApp and customer AI practical', 'Servicios que hacen práctica la IA de clientes en WhatsApp'],
  [
    'From agentic AI on WhatsApp and chat to CRM integration and ongoing optimization—DBX implements services around how your team already works.',
    'Desde IA agéntica en WhatsApp y chat hasta integración con CRM y optimización continua—DBX implementa servicios alrededor de cómo tu equipo ya trabaja.'
  ],
  ['Where WhatsApp and customer conversations drive revenue', 'Donde WhatsApp y las conversaciones con clientes impulsan ingresos'],
  [
    'DBX helps growing businesses in service-heavy sectors respond faster on WhatsApp, qualify inquiries, and keep follow-up connected to the tools teams already use.',
    'DBX ayuda a negocios en sectores de servicios a responder más rápido en WhatsApp, calificar consultas y mantener el seguimiento conectado a las herramientas que el equipo ya usa.'
  ],
  ['Helping growing businesses turn AI into better customer experiences', 'Ayudando a negocios en crecimiento a convertir IA en mejores experiencias de cliente'],
  [
    'DBX Solutions was built to help small and mid-sized businesses adopt AI in a practical, human-centered, and business-focused way—with WhatsApp and customer channels at the center.',
    'DBX Solutions nació para ayudar a PyMes a adoptar IA de forma práctica, centrada en personas y en el negocio, con WhatsApp y canales del cliente en el centro.'
  ],
  ['Want to see how this applies to your business?', '¿Quieres ver cómo aplica a tu negocio?'],
  [
    'Book a free consultation to review your channels, workflows, and the first practical opportunity to improve.',
    'Agenda una consulta gratis para revisar tus canales, workflows y la primera oportunidad práctica de mejora.'
  ],
  ['No pressure—just a focused conversation about what would help your team most.', 'Sin presión—solo una conversación enfocada en lo que más ayudaría a tu equipo.'],
  ['DBX focuses on measurable outcomes—response speed, cleaner intake, and follow-up your team can use.', 'DBX se enfoca en resultados medibles—velocidad de respuesta, intake más claro y seguimiento que tu equipo puede usar.'],
  ['Outcomes vary by channel volume, workflow scope, and how systems connect to your team.', 'Los resultados varían según volumen de canales, alcance del workflow y cómo los sistemas se conectan con tu equipo.'],
  ['Illustrative scenario', 'Escenario ilustrativo'],
  ['Service business with WhatsApp intake', 'Negocio de servicios con intake por WhatsApp'],
  [
    'Organizing WhatsApp inquiries gave the team useful context before follow-up. Responses got faster without adding headcount.',
    'Organizar consultas de WhatsApp dio contexto útil al equipo antes del seguimiento. Las respuestas fueron más rápidas sin aumentar personal.'
  ],
  ['WhatsApp, intake, and follow-up workflows.', 'WhatsApp, intake y workflows de seguimiento.'],
  ['Implementation tied to your channels and CRM.', 'Implementación ligada a tus canales y CRM.'],
  ['Sector examples—not generic automation.', 'Ejemplos por sector—no automatización genérica.'],
  ['Calendar for speed, form for a short note.', 'Calendario para rapidez, formulario para una nota breve.'],
  ['Approved data sources and controlled access.', 'Fuentes de datos aprobadas y acceso controlado.'],
  ['Escalation paths and clear AI limits.', 'Rutas de escalamiento y límites claros de IA.'],
  ['Roadmap items—not claimed certifications.', 'Ítems de roadmap—no certificaciones declaradas.'],
  ['Data handling', 'Manejo de datos'],
  ['Data Handling Notice', 'Aviso de manejo de datos'],
  [
    'DBX designs AI workflows around approved business information, controlled access, and clear limits on what systems process and store.',
    'DBX diseña workflows de IA con información aprobada del negocio, acceso controlado y límites claros sobre qué procesan y almacenan los sistemas.'
  ],
  ['Responsible AI Policy', 'Política de IA responsable'],
  [
    'DBX implements agentic AI with clear escalation paths, approved business information, and human review—not unconstrained automation.',
    'DBX implementa IA agéntica con rutas de escalamiento claras, información aprobada del negocio y revisión humana—no automatización sin límites.'
  ],
  ['Security Roadmap', 'Roadmap de seguridad'],
  [
    'DBX aligns operations with recognized security and responsible AI practices. Items below are roadmap or readiness work unless explicitly marked complete.',
    'DBX alinea operaciones con prácticas reconocidas de seguridad e IA responsable. Los ítems son trabajo de roadmap o preparación salvo que se indique lo contrario.'
  ],
  ['Our approach', 'Nuestro enfoque'],
  ['What we prioritize', 'Qué priorizamos'],
  ['Working principles', 'Principios de trabajo'],
  ['Security roadmap', 'Roadmap de seguridad'],
  ['Roadmap / In progress', 'Roadmap / En progreso'],
  ['Security and compliance roadmap', 'Roadmap de seguridad y cumplimiento'],
  [
    'By checking this box, you provide express written consent to receive SMS communications from DBX Solutions LLC related to appointments, services, and support. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out and HELP for help. See Privacy Policy and SMS Terms.',
    'Al marcar esta casilla, das consentimiento expreso por escrito para recibir comunicaciones SMS de DBX Solutions LLC relacionadas con citas, servicios y soporte. La frecuencia de mensajes varía. Pueden aplicar tarifas de mensajes y datos. El consentimiento no es condición de compra. Responde STOP para cancelar y HELP para ayuda. Consulta la Política de Privacidad y los Términos SMS.'
  ],
  [
    'Example: A firm captures project scope and timeline on WhatsApp, then routes qualified inquiries to the right advisor with full context.',
    'Ejemplo: Una firma captura alcance y plazos del proyecto en WhatsApp, luego enruta consultas calificadas al asesor correcto con contexto completo.'
  ],
  [
    'Example: After-hours WhatsApp questions about hours, services, and booking get answered while urgent cases escalate to staff.',
    'Ejemplo: Preguntas por WhatsApp fuera de horario sobre horarios, servicios y reservas se responden mientras casos urgentes escalan al equipo.'
  ],
  [
    'Example: A buyer asks about availability on WhatsApp; the agent collects budget and timeline before alerting the listing agent.',
    'Ejemplo: Un comprador pregunta disponibilidad por WhatsApp; el agente recopila presupuesto y plazos antes de alertar al agente de la propiedad.'
  ],
  [
    'Example: Quote requests include service type, location, and photos so your team replies with accurate next steps, not repeat questions.',
    'Ejemplo: Solicitudes de cotización incluyen tipo de servicio, ubicación y fotos para que tu equipo responda con pasos precisos, no preguntas repetidas.'
  ],
  [
    'Example: Order-status questions on WhatsApp pull structured details before a human steps in for exceptions.',
    'Ejemplo: Preguntas de estado de pedido en WhatsApp recopilan detalles estructurados antes de que una persona intervenga en excepciones.'
  ],
  [
    'Example: Program FAQs and intake questions run on chat while enrollment-ready leads land in your CRM with notes.',
    'Ejemplo: FAQs del programa e intake en chat mientras prospectos listos para inscripción llegan al CRM con notas.'
  ],
  [
    'Example: General service questions are handled consistently; sensitive or compliance-related topics route to a human reviewer.',
    'Ejemplo: Preguntas generales se manejan de forma consistente; temas sensibles o de cumplimiento se enrutan a un revisor humano.'
  ],
  [
    'Agentic AI for WhatsApp, web chat, SMS, forms, and email—responds, qualifies, collects data, and routes follow-up to your team or CRM.',
    'IA agéntica para WhatsApp, chat web, SMS, formularios y email—responde, califica, recopila datos y enruta el seguimiento a tu equipo o CRM.'
  ],
  ['Customer message', 'Mensaje del cliente'],
  ['WhatsApp · Chat · Email', 'WhatsApp · Chat · Email'],
  ['Team inbox', 'Bandeja del equipo'],
  ['CRM', 'CRM'],
  ['Calendar', 'Calendario'],
  ['Support desk', 'Mesa de soporte'],
  ['Slow response', 'Respuesta lenta'],
  ['Lost context', 'Contexto perdido'],
  ['Missed lead', 'Prospecto perdido'],
  ['Customer frustration', 'Frustración del cliente'],
  ['Slow responses', 'Respuestas lentas'],
  [
    'Customers move on when questions sit unanswered during busy hours or after closing.',
    'Los clientes avanzan con otra opción cuando sus preguntas quedan sin respuesta en horas ocupadas o fuera de horario.'
  ],
  ['Repetitive questions', 'Preguntas repetitivas'],
  [
    'Your team spends time repeating answers that could be handled consistently.',
    'Tu equipo dedica tiempo a repetir respuestas que podrían manejarse de forma consistente.'
  ],
  ['Missed leads', 'Prospectos perdidos'],
  [
    'High-intent inquiries lose momentum when follow-up is delayed or incomplete.',
    'Las consultas con alta intención pierden impulso cuando el seguimiento es lento o incompleto.'
  ],
  ['Disconnected tools', 'Herramientas desconectadas'],
  [
    'Conversation details often stay separate from the CRM, calendar, support desk, or team workflow.',
    'Los detalles de las conversaciones suelen quedar separados del CRM, calendario, mesa de soporte o workflow del equipo.'
  ],
  ['Limited team capacity', 'Capacidad limitada del equipo'],
  [
    'Growing demand creates more customer conversations than a lean team can manage manually.',
    'La demanda creciente genera más conversaciones de las que un equipo pequeño puede manejar manualmente.'
  ],
  [
    'Slow or inconsistent replies erode trust—customers feel ignored even when your team is doing their best behind the scenes.',
    'Las respuestas lentas o inconsistentes erosionan la confianza: el cliente siente que lo ignoran, aunque tu equipo esté haciendo su mejor esfuerzo.'
  ],
  [
    'Customer demand grows faster than manual follow-up can keep up.',
    'La demanda de clientes crece más rápido de lo que el seguimiento manual puede sostener.'
  ],
  [
    'For many SMBs, the issue is not effort. It is that conversations, customer details, and next steps are spread across busy people and disconnected tools.',
    'Para muchas PyMes, el problema no es falta de esfuerzo. Es que las conversaciones, datos del cliente y siguientes pasos están repartidos entre personas ocupadas y herramientas desconectadas.'
  ],
  [
    'Customer messages turn into team action—without the manual chaos.',
    'Los mensajes del cliente se convierten en acción del equipo—sin el caos manual.'
  ],
  [
    'DBX connects how customers reach you with what your team needs to do next.',
    'DBX conecta cómo te contactan con lo que tu equipo necesita hacer después.'
  ],
  ['They message you', 'Te escriben'],
  [
    'On WhatsApp, chat, and email—where they already are.',
    'Por WhatsApp, chat y email, donde ya están.'
  ],
  ['DBX answers first', 'DBX responde primero'],
  [
    'Common questions handled with your business context, day or night.',
    'Preguntas frecuentes con el contexto de tu negocio, de día o de noche.'
  ],
  ['Your tools stay current', 'Tus herramientas al día'],
  [
    'CRM, calendar, and team alerts updated—no retyping.',
    'CRM, calendario y avisos al equipo, sin volver a escribir todo.'
  ],
  ['Your team stays in control', 'Tu equipo sigue al mando'],
  [
    'People step in for judgment calls, follow-up, and closing.',
    'Las personas entran en decisiones, seguimiento y cierre.'
  ],
  [
    'Connected customer-to-team workflow',
    'Flujo conectado del cliente al equipo'
  ],
  ['DBX handles intake', 'DBX gestiona la entrada'],
  ['Team alerts', 'Avisos al equipo'],
  ['Your team in the loop', 'Tu equipo en el circuito'],
  ['Faster reply', 'Respuesta más rápida'],
  ['Clear handoff', 'Traspaso claro'],
  ['No duplicate work', 'Sin trabajo duplicado'],
  [
    'Human-supervised. Your tools. Your rules.',
    'Supervisión humana. Tus herramientas. Tus reglas.'
  ],
  ['Chat', 'Chat']
]

const localeCatalogs = {
  es: esEntries
  // pt: ptEntries
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function buildLocaleEngine(entries) {
  const map = new Map(entries)
  const pattern = new RegExp(
    [...map.keys()].sort((a, b) => b.length - a.length).map(escapeRegExp).join('|'),
    'g'
  )
  return { map, pattern }
}

const localeEngines = Object.fromEntries(
  Object.entries(localeCatalogs).map(([code, entries]) => [code, buildLocaleEngine(entries)])
)

export function getLocale() {
  const stored = localStorage.getItem(storageKey)
  return supportedLocales.includes(stored) ? stored : defaultLocale
}

export function translateText(value, locale = getLocale()) {
  if (locale === defaultLocale || !value) return value
  const engine = localeEngines[locale]
  if (!engine) return value
  return value.replace(engine.pattern, (match) => engine.map.get(match) || match)
}

export function translateHtml(html, locale = getLocale()) {
  return translateText(html, locale)
}

export function renderLangToggle(locale = getLocale()) {
  return `
    <div class="lang-toggle" aria-label="Language">
      ${supportedLocales
        .map(
          (code) =>
            `<button class="${locale === code ? 'active' : ''}" data-locale="${code}" type="button">${localeLabels[code] || code.toUpperCase()}</button>`
        )
        .join('')}
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


/**
 * Appends marketing i18n entries for site-app.js rewrites.
 * Run: node scripts/seed-marketing-i18n.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import vm from 'vm'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const newEntries = [
  ['Book a Consultation', 'Agendar consulta'],
  ['Answers from your real info', 'Respuestas con tu información real'],
  ['Replies use your prices, hours, and services—not generic guesses.', 'Respuestas con tus precios, horarios y servicios—no suposiciones genéricas.'],
  ['WhatsApp, chat, and email together', 'WhatsApp, chat y correo juntos'],
  ['Meet customers on the channels they already use.', 'Atiende en los canales que tus clientes ya usan.'],
  ['Your CRM stays updated', 'Tu CRM se mantiene actualizado'],
  ['What they said shows up in your tools without retyping.', 'Lo que dijeron aparece en tus herramientas sin volver a escribir.'],
  ['Your team steps in when it matters', 'Tu equipo entra cuando importa'],
  ['People take over for judgment calls and closing.', 'Las personas toman decisiones y cierres importantes.'],
  ['Conversation details often stay separate from the CRM, calendar, support queue, or your team\'s daily work.', 'Los detalles de la conversación quedan separados del CRM, calendario, cola de soporte o el trabajo diario de tu equipo.'],
  ['More conversations without hiring first', 'Más conversaciones sin contratar primero'],
  ['Handle more routine messages while your team focuses on higher-value work.', 'Atiende más mensajes rutinarios mientras tu equipo se enfoca en trabajo de mayor valor.'],
  ['We review how customers reach you, the tools you use, repeat questions, and what outcomes matter most.', 'Revisamos cómo te contactan, las herramientas que usas, preguntas repetidas y qué resultados importan.'],
  ['Map where replies slow down', 'Ubicar dónde se demoran las respuestas'],
  ['Pick business priorities', 'Definir prioridades del negocio'],
  ['We map replies, handoffs, and connections to your CRM or team—aligned with how you already work.', 'Mapeamos respuestas, traspasos y conexiones con tu CRM o equipo—alineados con cómo ya trabajas.'],
  ['Set up handoff rules', 'Definir reglas de traspaso'],
  ['Plan team alerts', 'Planear alertas al equipo'],
  ['We build, test, and launch on your channels using your existing tools and guidelines.', 'Construimos, probamos y lanzamos en tus canales con tus herramientas y lineamientos.'],
  ['Set up WhatsApp and chat replies', 'Configurar respuestas en WhatsApp y chat'],
  ['We review real conversations, improve answers, and refine follow-up as your business changes.', 'Revisamos conversas reales, mejoramos respuestas y refinamos el seguimiento según cambia tu negocio.'],
  ['Review real chats', 'Revisar chats reales'],
  ['Spot new opportunities', 'Detectar nuevas oportunidades'],
  ['Capture project scope on WhatsApp, qualify inquiries faster, and hand off to the right advisor with context.', 'Captura el alcance del proyecto en WhatsApp, califica consultas más rápido y traspasa al asesor correcto con contexto.'],
  ['Answer after-hours questions about hours and services, guide booking inquiries, and escalate urgent cases to staff.', 'Responde preguntas fuera de horario, orienta reservas y escala casos urgentes al equipo.'],
  ['Qualify buyers and sellers on WhatsApp, answer property FAQs, and alert the listing advisor with budget and timing.', 'Califica compradores y vendedores en WhatsApp, responde preguntas frecuentes y alerta al asesor con presupuesto y plazos.'],
  ['Collect quote details—service type, location, photos—so your team replies with accurate next steps, not repeat questions.', 'Recopila datos de cotización—tipo de servicio, ubicación, fotos—para que tu equipo responda con pasos claros.'],
  ['Handle product and order questions on WhatsApp and bring structured details before a person handles exceptions.', 'Atiende preguntas de productos y pedidos en WhatsApp y organiza detalles antes de que una persona maneje excepciones.'],
  ['Answer program FAQs, qualify interest, and land enrollment-ready leads in your CRM with notes.', 'Responde preguntas del programa, califica interés y deja prospectos listos en tu CRM con notas.'],
  ['Handle general service questions consistently; route sensitive or compliance topics to a human reviewer.', 'Responde preguntas generales con consistencia; deriva temas sensibles o de cumplimiento a una persona.'],
  ['Built for growing businesses', 'Hecho para negocios en crecimiento'],
  ['Practical help without enterprise-level complexity or long consulting projects.', 'Ayuda práctica sin complejidad empresarial ni proyectos de consultoría largos.'],
  ['Business first', 'El negocio primero'],
  ['We start with how customers reach you and what your team needs—not with a technology pitch.', 'Empezamos por cómo te contactan y qué necesita tu equipo—no por una venta tecnológica.'],
  ['Fits your existing tools', 'Encaja con tus herramientas actuales'],
  ['We connect WhatsApp, chat, CRM, and alerts to how you already work.', 'Conectamos WhatsApp, chat, CRM y alertas con cómo ya trabajas.'],
  ['Tied to real outcomes', 'Vinculado a resultados reales'],
  ['Every project links to faster replies, cleaner follow-up, or less repeat work.', 'Cada proyecto apunta a respuestas más rápidas, mejor seguimiento o menos trabajo repetido.'],
  ['Improves after launch', 'Mejora después del lanzamiento'],
  ['We review real conversations and adjust answers and routes over time.', 'Revisamos conversas reales y ajustamos respuestas y rutas con el tiempo.'],
  ['Clear capture upfront', 'Captura clara desde el inicio'],
  ['DBX helps growing businesses reply faster on WhatsApp, qualify leads, reduce repeat questions, and connect conversations to the tools your team already uses.', 'DBX ayuda a negocios en crecimiento a responder más rápido en WhatsApp, calificar prospectos, reducir preguntas repetidas y conectar conversaciones con las herramientas que tu equipo ya usa.'],
  ['Replies are built from approved business information, clear rules, escalation paths, and ongoing review of real chats.', 'Las respuestas se basan en información aprobada, reglas claras, rutas de escalamiento y revisión continua de chats reales.'],
  ['DBX can connect conversations with CRMs, calendars, support tools, forms, and team alerts.', 'DBX puede conectar conversaciones con CRM, calendarios, herramientas de soporte, formularios y alertas al equipo.'],
  ['DBX replies on WhatsApp, captures lead details, updates your CRM or team, and brings people in when judgment matters—not a FAQ-only chatbot.', 'DBX responde en WhatsApp, captura datos del prospecto, actualiza tu CRM o equipo y trae a las personas cuando importa el criterio—no es un chatbot de solo preguntas frecuentes.'],
  ['Book a consultation. We will review your channels, identify the first improvement to make, and outline three practical next steps for your business.', 'Agenda una consulta. Revisaremos tus canales, identificaremos la primera mejora y propondremos tres pasos prácticos para tu negocio.'],
  ['Practical help for WhatsApp replies, lead qualification, repeat questions, and connected follow-up for growing businesses.', 'Ayuda práctica para respuestas en WhatsApp, calificación de prospectos, preguntas repetidas y seguimiento conectado.'],
  ['Practical help for WhatsApp, lead capture, and follow-up', 'Ayuda práctica para WhatsApp, captación y seguimiento'],
  ['DBX helps growing businesses turn WhatsApp and other channels into faster replies, clearer lead capture, and next steps your team can act on—without hiring more staff.', 'DBX ayuda a negocios en crecimiento a lograr respuestas más rápidas, captación más clara y pasos que tu equipo puede ejecutar—sin contratar más personal.'],
  ['Not sure what to fix first on WhatsApp?', '¿No sabes qué arreglar primero en WhatsApp?'],
  ['Start with one channel, one repeated question, and one follow-up gap.', 'Empieza con un canal, una pregunta repetida y una brecha de seguimiento.'],
  ['Services that help businesses improve WhatsApp, customer conversations, and day-to-day follow-up—with ongoing support after launch.', 'Servicios para mejorar WhatsApp, conversaciones con clientes y seguimiento diario—con apoyo continuo después del lanzamiento.'],
  ['From WhatsApp and chat replies to CRM sync and ongoing support after launch—DBX implements around how your team already works.', 'Desde respuestas en WhatsApp y chat hasta sincronización con CRM y apoyo continuo—DBX implementa según cómo ya trabaja tu equipo.'],
  ['Want a clear starting point?', '¿Quieres un punto de partida claro?'],
  ['Book a consultation and we will map the first conversation or follow-up to improve on your channels.', 'Agenda una consulta y mapearemos la primera conversación o seguimiento a mejorar en tus canales.'],
  ['Most teams start with one channel, not a big project.', 'La mayoría empieza con un canal, no con un proyecto grande.'],
  ['Regulated sectors', 'Sectores regulados'],
  ['For healthcare, financial services, legal, insurance, and other regulated industries, AI should support communication efficiency—not replace professional advice, compliance review, clinical judgment, legal judgment, or required human oversight. Read our Responsible AI Policy for more detail.', 'En salud, finanzas, legal, seguros y otros sectores regulados, la IA debe apoyar la comunicación—no reemplazar asesoría profesional, cumplimiento, criterio clínico o legal, ni la supervisión humana requerida. Lee nuestra Política de IA Responsable.'],
  ['See how WhatsApp follow-up could work in your sector', 'Mira cómo el seguimiento en WhatsApp podría funcionar en tu sector'],
  ['Bring your channels, common questions, and follow-up challenges. We will help map practical next steps.', 'Trae tus canales, preguntas frecuentes y retos de seguimiento. Te ayudamos a mapear pasos prácticos.'],
  ['Designed around your business, not a generic template.', 'Diseñado para tu negocio, no una plantilla genérica.'],
  ['We make practical customer communication help accessible for growing businesses. We find where faster replies and cleaner follow-up would help most, then design and implement around your tools and team capacity.', 'Hacemos accesible la ayuda práctica en comunicación con clientes. Identificamos dónde más ayudan respuestas rápidas y mejor seguimiento, y diseñamos según tus herramientas y capacidad del equipo.'],
  ['We start with the business problem before choosing technology. That means understanding how customers reach you, what your team repeats daily, and the outcomes that matter—then building something clear that improves over time.', 'Empezamos por el problema del negocio antes de elegir tecnología: cómo te contactan, qué repite tu equipo y qué resultados importan—luego construimos algo claro que mejora con el tiempo.'],
  ['We keep it practical', 'Lo mantenemos práctico'],
  ['People stay in the loop', 'Las personas siguen en control'],
  ['Built around how you work', 'Hecho según cómo trabajas'],
  ['Tied to a real goal', 'Vinculado a un objetivo real'],
  ['Improves after launch', 'Mejora después del lanzamiento'],
  ['We review real chats and adjust answers and routes over time.', 'Revisamos chats reales y ajustamos respuestas y rutas con el tiempo.'],
  ['Book a consultation to review your channels and the first practical improvement to make.', 'Agenda una consulta para revisar tus canales y la primera mejora práctica.'],
  ['DBX designs customer flows around approved business information, controlled access, and clear limits on what systems process and store. For website visitor data, see our Privacy Policy.', 'DBX diseña flujos con información aprobada, acceso controlado y límites claros. Para datos del sitio web, consulta nuestra Política de Privacidad.'],
  ['DBX Solutions builds data handling practices for client implementations—approved content sources, controlled access, and secure integration planning. This notice covers project work, not website privacy (see Privacy Policy).', 'DBX define prácticas de manejo de datos en implementaciones para clientes—fuentes aprobadas, acceso controlado e integración segura. Este aviso cubre proyectos, no la privacidad del sitio (ver Política de Privacidad).'],
  ['Limiting access to systems and data required for each customer flow', 'Limitar el acceso a sistemas y datos necesarios para cada flujo con el cliente'],
  ['DBX implements customer-facing AI with clear escalation paths, approved business information, and human review—not unconstrained automation.', 'DBX implementa IA orientada al cliente con rutas de escalamiento, información aprobada y revisión humana—no automatización sin límites.'],
  ['DBX aligns operations with recognized security practices. Items below are roadmap or readiness work unless explicitly marked complete. We document planned vs. completed work so you know what is in progress.', 'DBX alinea operaciones con prácticas de seguridad reconocidas. Los ítems son trabajo planificado o en curso salvo que se indique lo contrario.'],
  ['What we help with', 'En qué ayudamos'],
  ['Five practical ways to improve WhatsApp and follow-up', 'Cinco formas prácticas de mejorar WhatsApp y el seguimiento'],
  ['Each starts with a real customer moment—not a technology catalog.', 'Cada una empieza con un momento real del cliente—no un catálogo tecnológico.'],
  ['By submitting this form, you agree that DBX Solutions LLC may process your information to respond to your request, as described in our Privacy Policy. SMS consent applies only if you provide a phone number and opt in.', 'Al enviar este formulario, autorizas a DBX Solutions LLC a tratar tu información para responder tu solicitud, según nuestra Política de Privacidad. El consentimiento SMS aplica solo si indicas teléfono y marcas la casilla.'],
  ['Slow replies on WhatsApp', 'Respuestas lentas en WhatsApp'],
  ['Leads not followed up', 'Prospectos sin seguimiento'],
  ['Same questions all day', 'Las mismas preguntas todo el día'],
  ['Info stuck in chats', 'Información atrapada en chats'],
  ['Not sure where to start', 'No sé por dónde empezar'],
  ['Thank you. We received your request and will follow up soon.', 'Gracias. Recibimos tu solicitud y te contactaremos pronto.'],
  ['DBX Solutions helps growing businesses reply faster on WhatsApp, qualify leads, and keep follow-up connected to the tools teams already use.', 'DBX ayuda a negocios en crecimiento a responder más rápido en WhatsApp, calificar prospectos y mantener el seguimiento conectado a las herramientas del equipo.'],
  ['Practical help for customer conversations and operations.', 'Ayuda práctica para conversaciones con clientes y operaciones.'],
  ['We use cookies and chat tools to improve your experience. See our Privacy Policy.', 'Usamos cookies y herramientas de chat para mejorar tu experiencia. Consulta nuestra Política de Privacidad.'],
  ['Legal', 'Legal'],
  ['DBX captures what they need', 'DBX captura lo que necesitan'],
  ['We stay with you after launch—reviewing chats, adjusting answers, and improving follow-up around how your business actually runs.', 'Nos quedamos contigo después del lanzamiento—revisando chats, ajustando respuestas y mejorando el seguimiento según cómo opera tu negocio.'],
  ['A practical partner for growing businesses—not a one-time setup shop.', 'Un socio práctico para negocios en crecimiento—no una configuración de una sola vez.'],
  ['DBX focuses on measurable outcomes—response speed, clearer capture, and follow-up your team can use.', 'DBX se enfoca en resultados medibles—velocidad de respuesta, captura más clara y seguimiento que tu equipo puede usar.'],
  ['DBX guides each project through a clear, low-risk path—from how customers reach you to ongoing improvement after launch.', 'DBX guía cada proyecto por un camino claro y de bajo riesgo—desde cómo te contactan hasta la mejora continua después del lanzamiento.'],
  ['DBX is especially useful for businesses that depend on fast replies, clear capture, reliable follow-up, and consistent answers.', 'DBX es especialmente útil para negocios que dependen de respuestas rápidas, captura clara, seguimiento confiable y respuestas consistentes.'],
  ['WhatsApp replies, lead capture, and follow-up.', 'Respuestas en WhatsApp, captación y seguimiento.'],
  ['Sector examples—not one-size-fits-all templates.', 'Ejemplos por sector—no plantillas genéricas.'],
  ['Practical help with people in the loop.', 'Ayuda práctica con personas en control.'],
  ['How we handle data in client projects.', 'Cómo manejamos datos en proyectos con clientes.'],
  ['Planned work—not claimed certifications.', 'Trabajo planificado—no certificaciones declaradas.'],
  ['Practical help mapped to how customers reach you.', 'Ayuda práctica según cómo te contactan tus clientes.']
]

function loadEsEntries() {
  const src = fs.readFileSync(path.join(root, 'src/i18n-runtime.js'), 'utf8')
  const block = src.match(/const esEntries = (\[[\s\S]*?\])\n\nconst localeCatalogs/)?.[1]
  if (!block) throw new Error('Could not parse esEntries')
  return vm.runInNewContext(block)
}

function appendEntries(filePath, varName, entries, newPairs) {
  let src = fs.readFileSync(filePath, 'utf8')
  const existing = new Set(entries.map(([en]) => en))
  const toAdd = newPairs.filter(([en]) => !existing.has(en))
  if (!toAdd.length) {
    console.log(`No new entries for ${varName}`)
    return
  }
  const formatted = toAdd.map(([en, tr]) => `  [\n    ${JSON.stringify(en)},\n    ${JSON.stringify(tr)}\n  ]`).join(',\n')
  src = src.replace(
    new RegExp(`(const ${varName} = \\[)`),
    `$1\n${formatted},`
  )
  fs.writeFileSync(filePath, src)
  console.log(`Added ${toAdd.length} entries to ${varName}`)
}

const esEntries = loadEsEntries()
appendEntries(path.join(root, 'src/i18n-runtime.js'), 'esEntries', esEntries, newEntries)

// PT: use fix-i18n-gaps.mjs for Brazilian Portuguese entries (do not auto-translate from ES).
console.log('For PT entries, run: node scripts/fix-i18n-gaps.mjs')

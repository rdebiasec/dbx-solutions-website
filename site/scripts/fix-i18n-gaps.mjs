/**
 * Apply ES/PT translation fixes and fill catalog gaps.
 * Run: node scripts/fix-i18n-gaps.mjs
 */
import fs from 'fs'
import vm from 'vm'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

/** @type {[string, string, string][]} en, es, pt */
const triples = [
  ['Book a Consultation', 'Agendar consulta', 'Agendar consulta'],
  ['Answers from your real info', 'Respuestas con tu información real', 'Respostas com suas informações reais'],
  [
    'Replies use your prices, hours, and services—not generic guesses.',
    'Respuestas con tus precios, horarios y servicios—no suposiciones genéricas.',
    'Respostas com seus preços, horários e serviços—não suposições genéricas.'
  ],
  ['WhatsApp, chat, and email together', 'WhatsApp, chat y correo juntos', 'WhatsApp, chat e e-mail juntos'],
  [
    'Meet customers on the channels they already use.',
    'Atiende en los canales que tus clientes ya usan.',
    'Atenda nos canais que seus clientes já usam.'
  ],
  ['Your CRM stays updated', 'Tu CRM se mantiene actualizado', 'Seu CRM permanece atualizado'],
  [
    'What they said shows up in your tools without retyping.',
    'Lo que dijeron aparece en tus herramientas sin volver a escribir.',
    'O que disseram aparece nas suas ferramentas sem redigitar.'
  ],
  ['Your team steps in when it matters', 'Tu equipo entra cuando importa', 'Sua equipe entra quando importa'],
  [
    'People take over for judgment calls and closing.',
    'Las personas toman decisiones y cierres importantes.',
    'Pessoas assumem decisões importantes e fechamentos.'
  ],
  [
    "Conversation details often stay separate from the CRM, calendar, support queue, or your team's daily work.",
    'Los detalles de la conversación quedan separados del CRM, calendario, cola de soporte o el trabajo diario de tu equipo.',
    'Os detalhes da conversa ficam separados do CRM, calendário, fila de suporte ou do trabalho diário da sua equipe.'
  ],
  ['More conversations without hiring first', 'Más conversaciones sin contratar primero', 'Mais conversas sem contratar antes'],
  [
    'Handle more routine messages while your team focuses on higher-value work.',
    'Atiende más mensajes rutinarios mientras tu equipo se enfoca en trabajo de mayor valor.',
    'Atenda mais mensagens rotineiras enquanto sua equipe foca em trabalho de maior valor.'
  ],
  [
    'We review how customers reach you, the tools you use, repeat questions, and what outcomes matter most.',
    'Revisamos cómo te contactan, las herramientas que usas, preguntas repetidas y qué resultados importan.',
    'Analisamos como os clientes chegam até você, as ferramentas que usa, perguntas repetidas e quais resultados importam.'
  ],
  ['Map where replies slow down', 'Ubicar dónde se demoran las respuestas', 'Mapear onde as respostas demoram'],
  ['Pick business priorities', 'Definir prioridades del negocio', 'Definir prioridades do negócio'],
  [
    'We map replies, handoffs, and connections to your CRM or team—aligned with how you already work.',
    'Mapeamos respuestas, traspasos y conexiones con tu CRM o equipo—alineados con cómo ya trabajas.',
    'Mapeamos respostas, transferências e conexões com seu CRM ou equipe—alinhados à forma como você já trabalha.'
  ],
  ['Set up handoff rules', 'Definir reglas de traspaso', 'Definir regras de transferência'],
  ['Plan team alerts', 'Planear alertas al equipo', 'Planejar alertas para a equipe'],
  [
    'We build, test, and launch on your channels using your existing tools and guidelines.',
    'Construimos, probamos y lanzamos en tus canales con tus herramientas y lineamientos.',
    'Construímos, testamos e lançamos nos seus canais com suas ferramentas e diretrizes.'
  ],
  ['Set up WhatsApp and chat replies', 'Configurar respuestas en WhatsApp y chat', 'Configurar respostas no WhatsApp e chat'],
  [
    'We review real conversations, improve answers, and refine follow-up as your business changes.',
    'Revisamos conversas reales, mejoramos respuestas y refinamos el seguimiento según cambia tu negocio.',
    'Revisamos conversas reais, melhoramos respostas e refinamos o acompanhamento conforme seu negócio muda.'
  ],
  ['Review real chats', 'Revisar chats reales', 'Revisar conversas reais'],
  ['Spot new opportunities', 'Detectar nuevas oportunidades', 'Identificar novas oportunidades'],
  [
    'Capture project scope on WhatsApp, qualify inquiries faster, and hand off to the right advisor with context.',
    'Captura el alcance del proyecto en WhatsApp, califica consultas más rápido y traspasa al asesor correcto con contexto.',
    'Capture o escopo do projeto no WhatsApp, qualifique consultas mais rápido e encaminhe ao assessor certo com contexto.'
  ],
  [
    'Answer after-hours questions about hours and services, guide booking inquiries, and escalate urgent cases to staff.',
    'Responde preguntas fuera de horario, orienta reservas y escala casos urgentes al equipo.',
    'Responda perguntas fora do horário, oriente reservas e escale casos urgentes para a equipe.'
  ],
  [
    'Qualify buyers and sellers on WhatsApp, answer property FAQs, and alert the listing advisor with budget and timing.',
    'Califica compradores y vendedores en WhatsApp, responde preguntas frecuentes y alerta al asesor con presupuesto y plazos.',
    'Qualifique compradores e vendedores no WhatsApp, responda FAQs e alerte o assessor com orçamento e prazos.'
  ],
  [
    'Collect quote details—service type, location, photos—so your team replies with accurate next steps, not repeat questions.',
    'Recopila datos de cotización—tipo de servicio, ubicación, fotos—para que tu equipo responda con pasos claros.',
    'Colete dados de orçamento—tipo de serviço, local, fotos—para sua equipe responder com próximos passos claros.'
  ],
  [
    'Handle product and order questions on WhatsApp and bring structured details before a person handles exceptions.',
    'Atiende preguntas de productos y pedidos en WhatsApp y organiza detalles antes de que una persona maneje excepciones.',
    'Atenda perguntas de produtos e pedidos no WhatsApp e organize detalhes antes de uma pessoa tratar exceções.'
  ],
  [
    'Answer program FAQs, qualify interest, and land enrollment-ready leads in your CRM with notes.',
    'Responde preguntas del programa, califica interés y deja prospectos listos en tu CRM con notas.',
    'Responda FAQs do programa, qualifique interesse e leve leads prontos para matrícula ao CRM com anotações.'
  ],
  [
    'Handle general service questions consistently; route sensitive or compliance topics to a human reviewer.',
    'Responde preguntas generales con consistencia; deriva temas sensibles o de cumplimiento a una persona.',
    'Responda perguntas gerais com consistência; encaminhe temas sensíveis ou de conformidade a uma pessoa.'
  ],
  ['Built for growing businesses', 'Hecho para negocios en crecimiento', 'Feito para negócios em crescimento'],
  [
    'Practical help without enterprise-level complexity or long consulting projects.',
    'Ayuda práctica sin complejidad empresarial ni proyectos de consultoría largos.',
    'Ajuda prática sem complexidade empresarial nem projetos longos de consultoria.'
  ],
  ['Business first', 'El negocio primero', 'O negócio em primeiro lugar'],
  [
    'We start with how customers reach you and what your team needs—not with a technology pitch.',
    'Empezamos por cómo te contactan y qué necesita tu equipo—no por una venta tecnológica.',
    'Começamos por como os clientes chegam até você e o que sua equipe precisa—não por um discurso tecnológico.'
  ],
  ['Fits your existing tools', 'Encaja con tus herramientas actuales', 'Encaixa nas suas ferramentas atuais'],
  [
    'We connect WhatsApp, chat, CRM, and alerts to how you already work.',
    'Conectamos WhatsApp, chat, CRM y alertas con cómo ya trabajas.',
    'Conectamos WhatsApp, chat, CRM e alertas à forma como você já trabalha.'
  ],
  ['Tied to real outcomes', 'Vinculado a resultados reales', 'Vinculado a resultados reais'],
  [
    'Every project links to faster replies, cleaner follow-up, or less repeat work.',
    'Cada proyecto apunta a respuestas más rápidas, mejor seguimiento o menos trabajo repetido.',
    'Cada projeto aponta para respostas mais rápidas, acompanhamento mais limpo ou menos trabalho repetido.'
  ],
  ['Improves after launch', 'Mejora después del lanzamiento', 'Melhora após o lançamento'],
  [
    'We review real conversations and adjust answers and routes over time.',
    'Revisamos conversas reales y ajustamos respuestas y rutas con el tiempo.',
    'Revisamos conversas reais e ajustamos respostas e rotas ao longo do tempo.'
  ],
  ['Clear capture upfront', 'Captura clara desde el inicio', 'Captura clara desde o início'],
  [
    'DBX helps growing businesses reply faster on WhatsApp, qualify leads, reduce repeat questions, and connect conversations to the tools your team already uses.',
    'DBX ayuda a negocios en crecimiento a responder más rápido en WhatsApp, calificar prospectos, reducir preguntas repetidas y conectar conversaciones con las herramientas que tu equipo ya usa.',
    'A DBX ajuda negócios em crescimento a responder mais rápido no WhatsApp, qualificar leads, reduzir perguntas repetidas e conectar conversas às ferramentas que sua equipe já usa.'
  ],
  [
    'Replies are built from approved business information, clear rules, escalation paths, and ongoing review of real chats.',
    'Las respuestas se basan en información aprobada, reglas claras, rutas de escalamiento y revisión continua de chats reales.',
    'As respostas usam informações aprovadas do negócio, regras claras, caminhos de escalonamento e revisão contínua de conversas reais.'
  ],
  [
    'DBX can connect conversations with CRMs, calendars, support tools, forms, and team alerts.',
    'DBX puede conectar conversaciones con CRM, calendarios, herramientas de soporte, formularios y alertas al equipo.',
    'A DBX pode conectar conversas com CRMs, calendários, ferramentas de suporte, formulários e alertas da equipe.'
  ],
  [
    'DBX replies on WhatsApp, captures lead details, updates your CRM or team, and brings people in when judgment matters—not a FAQ-only chatbot.',
    'DBX responde en WhatsApp, captura datos del prospecto, actualiza tu CRM o equipo y trae a las personas cuando importa el criterio—no es un chatbot de solo preguntas frecuentes.',
    'A DBX responde no WhatsApp, captura dados do lead, atualiza seu CRM ou equipe e traz pessoas quando o julgamento humano importa—não é um chatbot só de FAQ.'
  ],
  [
    'Book a consultation. We will review your channels, identify the first improvement to make, and outline three practical next steps for your business.',
    'Agenda una consulta. Revisaremos tus canales, identificaremos la primera mejora y propondremos tres pasos prácticos para tu negocio.',
    'Agende uma consulta. Analisaremos seus canais, identificaremos a primeira melhoria e delinearemos três próximos passos práticos para seu negócio.'
  ],
  [
    'Practical help for WhatsApp replies, lead qualification, repeat questions, and connected follow-up for growing businesses.',
    'Ayuda práctica para respuestas en WhatsApp, calificación de prospectos, preguntas repetidas y seguimiento conectado.',
    'Ajuda prática para respostas no WhatsApp, qualificação de leads, perguntas repetidas e acompanhamento conectado.'
  ],
  [
    'Practical help for WhatsApp, lead capture, and follow-up',
    'Ayuda práctica para WhatsApp, captación y seguimiento',
    'Ajuda prática para WhatsApp, captura de leads e acompanhamento'
  ],
  [
    'DBX helps growing businesses turn WhatsApp and other channels into faster replies, clearer lead capture, and next steps your team can act on—without hiring more staff.',
    'DBX ayuda a negocios en crecimiento a lograr respuestas más rápidas, captación más clara y pasos que tu equipo puede ejecutar—sin contratar más personal.',
    'A DBX ajuda negócios em crescimento a obter respostas mais rápidas, captura mais clara e próximos passos que sua equipe pode executar—sem contratar mais pessoas.'
  ],
  ['Not sure what to fix first on WhatsApp?', '¿No sabes qué arreglar primero en WhatsApp?', 'Não sabe o que corrigir primeiro no WhatsApp?'],
  [
    'Start with one channel, one repeated question, and one follow-up gap.',
    'Empieza con un canal, una pregunta repetida y una brecha de seguimiento.',
    'Comece com um canal, uma pergunta repetida e uma lacuna de acompanhamento.'
  ],
  [
    'Services that help businesses improve WhatsApp, customer conversations, and day-to-day follow-up—with ongoing support after launch.',
    'Servicios para mejorar WhatsApp, conversaciones con clientes y seguimiento diario—con apoyo continuo después del lanzamiento.',
    'Serviços para melhorar WhatsApp, conversas com clientes e acompanhamento diário—com suporte contínuo após o lançamento.'
  ],
  [
    'From WhatsApp and chat replies to CRM sync and ongoing support after launch—DBX implements around how your team already works.',
    'Desde respuestas en WhatsApp y chat hasta sincronización con CRM y apoyo continuo—DBX implementa según cómo ya trabaja tu equipo.',
    'De respostas no WhatsApp e chat à sincronização com CRM e suporte contínuo—a DBX implementa conforme sua equipe já trabalha.'
  ],
  ['Want a clear starting point?', '¿Quieres un punto de partida claro?', 'Quer um ponto de partida claro?'],
  [
    'Book a consultation and we will map the first conversation or follow-up to improve on your channels.',
    'Agenda una consulta y mapearemos la primera conversación o seguimiento a mejorar en tus canales.',
    'Agende uma consulta e mapearemos a primeira conversa ou acompanhamento a melhorar nos seus canais.'
  ],
  ['Most teams start with one channel, not a big project.', 'La mayoría empieza con un canal, no con un proyecto grande.', 'A maioria começa com um canal, não com um projeto grande.'],
  ['Regulated sectors', 'Sectores regulados', 'Setores regulados'],
  [
    'For healthcare, financial services, legal, insurance, and other regulated industries, AI should support communication efficiency—not replace professional advice, compliance review, clinical judgment, legal judgment, or required human oversight. Read our Responsible AI Policy for more detail.',
    'En salud, finanzas, legal, seguros y otros sectores regulados, la IA debe apoyar la comunicación—no reemplazar asesoría profesional, cumplimiento, criterio clínico o legal, ni la supervisión humana requerida. Lee nuestra Política de IA Responsable.',
    'Em saúde, finanças, jurídico, seguros e outros setores regulados, a IA deve apoiar a comunicação—não substituir assessoria profissional, conformidade, julgamento clínico ou jurídico, nem supervisão humana exigida. Leia nossa Política de IA Responsável.'
  ],
  [
    'See how WhatsApp follow-up could work in your sector',
    'Mira cómo el seguimiento en WhatsApp podría funcionar en tu sector',
    'Veja como o acompanhamento no WhatsApp pode funcionar no seu setor'
  ],
  [
    'Bring your channels, common questions, and follow-up challenges. We will help map practical next steps.',
    'Trae tus canales, preguntas frecuentes y retos de seguimiento. Te ayudamos a mapear pasos prácticos.',
    'Traga seus canais, perguntas frequentes e desafios de acompanhamento. Ajudamos a mapear próximos passos práticos.'
  ],
  [
    'Designed around your business, not a generic template.',
    'Diseñado para tu negocio, no una plantilla genérica.',
    'Projetado para seu negócio, não um modelo genérico.'
  ],
  [
    'We make practical customer communication help accessible for growing businesses. We find where faster replies and cleaner follow-up would help most, then design and implement around your tools and team capacity.',
    'Hacemos accesible la ayuda práctica en comunicación con clientes. Identificamos dónde más ayudan respuestas rápidas y mejor seguimiento, y diseñamos según tus herramientas y capacidad del equipo.',
    'Tornamos acessível ajuda prática em comunicação com clientes. Identificamos onde respostas mais rápidas e acompanhamento mais limpo mais ajudam e projetamos conforme suas ferramentas e capacidade da equipe.'
  ],
  [
    'We start with the business problem before choosing technology. That means understanding how customers reach you, what your team repeats daily, and the outcomes that matter—then building something clear that improves over time.',
    'Empezamos por el problema del negocio antes de elegir tecnología: cómo te contactan, qué repite tu equipo y qué resultados importan—luego construimos algo claro que mejora con el tiempo.',
    'Começamos pelo problema do negócio antes de escolher tecnologia: como os clientes chegam, o que sua equipe repete diariamente e quais resultados importam—depois construímos algo claro que melhora com o tempo.'
  ],
  ['We keep it practical', 'Lo mantenemos práctico', 'Mantemos o foco prático'],
  ['People stay in the loop', 'Las personas siguen en control', 'As pessoas permanecem no controle'],
  ['Built around how you work', 'Hecho según cómo trabajas', 'Feito conforme você trabalha'],
  ['Tied to a real goal', 'Vinculado a un objetivo real', 'Vinculado a um objetivo real'],
  [
    'Book a consultation to review your channels and the first practical improvement to make.',
    'Agenda una consulta para revisar tus canales y la primera mejora práctica.',
    'Agende uma consulta para revisar seus canais e a primeira melhoria prática.'
  ],
  [
    'DBX designs customer flows around approved business information, controlled access, and clear limits on what systems process and store. For website visitor data, see our Privacy Policy.',
    'DBX diseña flujos con información aprobada, acceso controlado y límites claros. Para datos del sitio web, consulta nuestra Política de Privacidad.',
    'A DBX projeta fluxos com informações aprovadas, acesso controlado e limites claros. Para dados de visitantes do site, consulte nossa Política de Privacidade.'
  ],
  [
    'DBX Solutions builds data handling practices for client implementations—approved content sources, controlled access, and secure integration planning. This notice covers project work, not website privacy (see Privacy Policy).',
    'DBX define prácticas de manejo de datos en implementaciones para clientes—fuentes aprobadas, acceso controlado e integración segura. Este aviso cubre proyectos, no la privacidad del sitio (ver Política de Privacidad).',
    'A DBX define práticas de tratamento de dados em implementações para clientes—fontes aprovadas, acesso controlado e integração segura. Este aviso cobre projetos, não a privacidade do site (ver Política de Privacidade).'
  ],
  [
    'Limiting access to systems and data required for each customer flow',
    'Limitar el acceso a sistemas y datos necesarios para cada flujo con el cliente',
    'Limitar o acesso a sistemas e dados necessários para cada fluxo com o cliente'
  ],
  [
    'DBX implements customer-facing AI with clear escalation paths, approved business information, and human review—not unconstrained automation.',
    'DBX implementa IA orientada al cliente con rutas de escalamiento, información aprobada y revisión humana—no automatización sin límites.',
    'A DBX implementa IA voltada ao cliente com caminhos de escalonamento, informações aprovadas e revisão humana—não automação sem limites.'
  ],
  [
    'DBX aligns operations with recognized security practices. Items below are roadmap or readiness work unless explicitly marked complete. We document planned vs. completed work so you know what is in progress.',
    'DBX alinea operaciones con prácticas de seguridad reconocidas. Los ítems son trabajo planificado o en curso salvo que se indique lo contrario.',
    'A DBX alinha operações a práticas de segurança reconhecidas. Os itens abaixo são trabalho planejado ou em andamento, salvo indicação em contrário.'
  ],
  ['What we help with', 'En qué ayudamos', 'No que ajudamos'],
  [
    'Five practical ways to improve WhatsApp and follow-up',
    'Cinco formas prácticas de mejorar WhatsApp y el seguimiento',
    'Cinco formas práticas de melhorar WhatsApp e acompanhamento'
  ],
  [
    'Each starts with a real customer moment—not a technology catalog.',
    'Cada una empieza con un momento real del cliente—no un catálogo tecnológico.',
    'Cada uma começa com um momento real do cliente—não um catálogo tecnológico.'
  ],
  [
    'By submitting this form, you agree that DBX Solutions LLC may process your information to respond to your request, as described in our Privacy Policy. SMS consent applies only if you provide a phone number and opt in.',
    'Al enviar este formulario, autorizas a DBX Solutions LLC a tratar tu información para responder tu solicitud, según nuestra Política de Privacidad. El consentimiento SMS aplica solo si indicas teléfono y marcas la casilla.',
    'Ao enviar este formulário, você concorda que a DBX Solutions LLC pode tratar suas informações para responder sua solicitação, conforme nossa Política de Privacidade. O consentimento SMS aplica-se somente se você informar telefone e marcar a opção.'
  ],
  ['Slow replies on WhatsApp', 'Respuestas lentas en WhatsApp', 'Respostas lentas no WhatsApp'],
  ['Leads not followed up', 'Prospectos sin seguimiento', 'Leads sem acompanhamento'],
  ['Same questions all day', 'Las mismas preguntas todo el día', 'As mesmas perguntas o dia todo'],
  ['Info stuck in chats', 'Información atrapada en chats', 'Informação presa nas conversas'],
  ['Not sure where to start', 'No sé por dónde empezar', 'Não sei por onde começar'],
  [
    'Thank you. We received your request and will follow up soon.',
    'Gracias. Recibimos tu solicitud y te contactaremos pronto.',
    'Obrigado. Recebemos sua solicitação e entraremos em contato em breve.'
  ],
  [
    'DBX Solutions helps growing businesses reply faster on WhatsApp, qualify leads, and keep follow-up connected to the tools teams already use.',
    'DBX ayuda a negocios en crecimiento a responder más rápido en WhatsApp, calificar prospectos y mantener el seguimiento conectado a las herramientas del equipo.',
    'A DBX ajuda negócios em crescimento a responder mais rápido no WhatsApp, qualificar leads e manter o acompanhamento conectado às ferramentas que as equipes já usam.'
  ],
  [
    'Practical help for customer conversations and operations.',
    'Ayuda práctica para conversaciones con clientes y operaciones.',
    'Ajuda prática para conversas com clientes e operações.'
  ],
  [
    'We use cookies and chat tools to improve your experience. See our',
    'Usamos cookies y herramientas de chat para mejorar tu experiencia. Consulta nuestra',
    'Usamos cookies e ferramentas de chat para melhorar sua experiência. Consulte nossa'
  ],
  ['DBX captures what they need', 'DBX captura lo que necesitan', 'A DBX captura o que precisam'],
  [
    'We stay with you after launch—reviewing chats, adjusting answers, and improving follow-up around how your business actually runs.',
    'Nos quedamos contigo después del lanzamiento—revisando chats, ajustando respuestas y mejorando el seguimiento según cómo opera tu negocio.',
    'Ficamos com você após o lançamento—revisando conversas, ajustando respostas e melhorando o acompanhamento conforme seu negócio opera.'
  ],
  [
    'A practical partner for growing businesses—not a one-time setup shop.',
    'Un socio práctico para negocios en crecimiento—no una configuración de una sola vez.',
    'Um parceiro prático para negócios em crescimento—não uma configuração única.'
  ],
  [
    'DBX focuses on measurable outcomes—response speed, clearer capture, and follow-up your team can use.',
    'DBX se enfoca en resultados medibles—velocidad de respuesta, captura más clara y seguimiento que tu equipo puede usar.',
    'A DBX foca em resultados mensuráveis—velocidade de resposta, captura mais clara e acompanhamento que sua equipe pode usar.'
  ],
  [
    'DBX guides each project through a clear, low-risk path—from how customers reach you to ongoing improvement after launch.',
    'DBX guía cada proyecto por un camino claro y de bajo riesgo—desde cómo te contactan hasta la mejora continua después del lanzamiento.',
    'A DBX guia cada projeto por um caminho claro e de baixo risco—de como os clientes chegam até a melhoria contínua após o lançamento.'
  ],
  [
    'DBX is especially useful for businesses that depend on fast replies, clear capture, reliable follow-up, and consistent answers.',
    'DBX es especialmente útil para negocios que dependen de respuestas rápidas, captura clara, seguimiento confiable y respuestas consistentes.',
    'A DBX é especialmente útil para negócios que dependem de respostas rápidas, captura clara, acompanhamento confiável e respostas consistentes.'
  ],
  [
    'WhatsApp replies, lead capture, and follow-up.',
    'Respuestas en WhatsApp, captación y seguimiento.',
    'Respostas no WhatsApp, captura de leads e acompanhamento.'
  ],
  [
    'Implementation tied to your channels and CRM.',
    'Implementación ligada a tus canales y CRM.',
    'Implementação ligada aos seus canais e CRM.'
  ],
  [
    'Sector examples—not one-size-fits-all templates.',
    'Ejemplos por sector—no plantillas genéricas.',
    'Exemplos por setor—não modelos únicos para todos.'
  ],
  [
    'Practical help with people in the loop.',
    'Ayuda práctica con personas en control.',
    'Ajuda prática com pessoas no controle.'
  ],
  [
    'Calendar for speed, form for a short note.',
    'Calendario para rapidez, formulario para una nota breve.',
    'Calendário para rapidez, formulário para uma nota breve.'
  ],
  [
    'How we handle data in client projects.',
    'Cómo manejamos datos en proyectos con clientes.',
    'Como tratamos dados em projetos com clientes.'
  ],
  [
    'Escalation paths and clear AI limits.',
    'Rutas de escalamiento y límites claros de IA.',
    'Caminhos de escalonamento e limites claros de IA.'
  ],
  [
    'Planned work—not claimed certifications.',
    'Trabajo planificado—no certificaciones declaradas.',
    'Trabalho planejado—não certificações declaradas.'
  ],
  [
    'Practical help mapped to how customers reach you.',
    'Ayuda práctica según cómo te contactan tus clientes.',
    'Ajuda prática conforme como os clientes chegam até você.'
  ],
  // Page titles
  [
    'DBX Solutions | WhatsApp & Customer Experience Solutions',
    'DBX Solutions | Soluciones de WhatsApp y experiencia del cliente',
    'DBX Solutions | Soluções de WhatsApp e experiência do cliente'
  ],
  [
    'DBX Solutions | AI Services for Growing Businesses',
    'DBX Solutions | Servicios de IA para negocios en crecimiento',
    'DBX Solutions | Serviços de IA para negócios em crescimento'
  ],
  [
    'DBX Solutions | AI Customer Experience by Industry',
    'DBX Solutions | Experiencia del cliente con IA por industria',
    'DBX Solutions | Experiência do cliente com IA por setor'
  ],
  ['DBX Solutions | About', 'DBX Solutions | Acerca de', 'DBX Solutions | Sobre'],
  [
    'DBX Solutions | Data Handling Notice',
    'DBX Solutions | Aviso de manejo de datos',
    'DBX Solutions | Aviso de tratamento de dados'
  ],
  [
    'DBX Solutions | Responsible AI Policy',
    'DBX Solutions | Política de IA responsable',
    'DBX Solutions | Política de IA responsável'
  ],
  [
    'DBX Solutions | Security Roadmap',
    'DBX Solutions | Plan de seguridad',
    'DBX Solutions | Plano de segurança'
  ],
  ['DBX Solutions | Contact', 'DBX Solutions | Contacto', 'DBX Solutions | Contato'],
  // Meta descriptions
  [
    'Customer experience and WhatsApp automation for service businesses, clinics, real estate teams, local services, and more.',
    'Experiencia del cliente y automatización en WhatsApp para negocios de servicios, clínicas, inmobiliarias, servicios locales y más.',
    'Experiência do cliente e automação no WhatsApp para empresas de serviços, clínicas, imobiliárias, serviços locais e mais.'
  ],
  [
    'DBX Solutions helps growing businesses turn AI into better customer experiences through practical, human-centered implementation.',
    'DBX Solutions ayuda a negocios en crecimiento a convertir la IA en mejores experiencias del cliente con implementación práctica y centrada en las personas.',
    'A DBX Solutions ajuda negócios em crescimento a transformar IA em melhores experiências do cliente com implementação prática e centrada nas pessoas.'
  ],
  [
    'How DBX Solutions approaches customer and business data in AI implementations, integrations, and ongoing operations.',
    'Cómo DBX Solutions aborda los datos de clientes y del negocio en implementaciones de IA, integraciones y operaciones continuas.',
    'Como a DBX Solutions aborda dados de clientes e do negócio em implementações de IA, integrações e operações contínuas.'
  ],
  [
    'How DBX Solutions applies human oversight, escalation paths, and approved business information in customer-facing AI.',
    'Cómo DBX Solutions aplica supervisión humana, rutas de escalamiento e información aprobada del negocio en IA de cara al cliente.',
    'Como a DBX Solutions aplica supervisão humana, caminhos de escalonamento e informações aprovadas do negócio em IA voltada ao cliente.'
  ],
  [
    'DBX Solutions security and compliance roadmap—presented as readiness work, not completed certifications unless formally obtained.',
    'Plan de seguridad y cumplimiento de DBX Solutions—presentado como trabajo de preparación, no certificaciones completadas salvo obtención formal.',
    'Plano de segurança e conformidade da DBX Solutions—apresentado como trabalho de preparação, não certificações concluídas salvo obtenção formal.'
  ],
  [
    'Book a consultation with DBX Solutions to review WhatsApp, lead capture, support automation, and practical AI opportunities for your business.',
    'Agenda una consulta con DBX Solutions para revisar WhatsApp, captación de prospectos, automatización de soporte y oportunidades prácticas de IA para tu negocio.',
    'Agende uma consulta com a DBX Solutions para revisar WhatsApp, captura de leads, automação de suporte e oportunidades práticas de IA para seu negócio.'
  ],
  // About & policy body
  ['Our mission', 'Nuestra misión', 'Nossa missão'],
  ['About DBX Solutions', 'Acerca de DBX Solutions', 'Sobre a DBX Solutions'],
  [
    'Helping growing businesses turn AI into better customer experiences',
    'Ayudar a negocios en crecimiento a convertir la IA en mejores experiencias del cliente',
    'Ajudar negócios em crescimento a transformar IA em melhores experiências do cliente'
  ],
  [
    'DBX Solutions was built to help small and mid-sized businesses adopt AI in a practical, human-centered, and business-focused way—with WhatsApp and customer channels at the center.',
    'DBX Solutions nació para ayudar a pequeñas y medianas empresas a adoptar IA de forma práctica, centrada en las personas y en el negocio—con WhatsApp y los canales de clientes en el centro.',
    'A DBX Solutions foi criada para ajudar pequenas e médias empresas a adotar IA de forma prática, centrada nas pessoas e no negócio—com WhatsApp e canais de clientes no centro.'
  ],
  [
    'No pressure—just a focused conversation about what would help your team most.',
    'Sin presión—solo una conversación enfocada en lo que más ayudaría a tu equipo.',
    'Sem pressão—apenas uma conversa focada no que mais ajudaria sua equipe.'
  ],
  [
    'We will help identify practical opportunities before recommending technology.',
    'Te ayudaremos a identificar oportunidades prácticas antes de recomendar tecnología.',
    'Ajudaremos a identificar oportunidades práticas antes de recomendar tecnologia.'
  ],
  [
    'Services that make WhatsApp and customer AI practical',
    'Servicios que hacen prácticos WhatsApp y la IA para clientes',
    'Serviços que tornam práticos WhatsApp e IA para clientes'
  ],
  [
    'Where WhatsApp and customer conversations drive revenue',
    'Donde las conversaciones en WhatsApp impulsan ingresos',
    'Onde conversas no WhatsApp impulsionam receita'
  ],
  [
    'DBX helps growing businesses in service-heavy sectors respond faster on WhatsApp, qualify inquiries, and keep follow-up connected to the tools teams already use.',
    'DBX ayuda a negocios en crecimiento en sectores de servicios a responder más rápido en WhatsApp, calificar consultas y mantener el seguimiento conectado a las herramientas del equipo.',
    'A DBX ajuda negócios em crescimento em setores de serviços a responder mais rápido no WhatsApp, qualificar consultas e manter o acompanhamento conectado às ferramentas da equipe.'
  ],
  [
    "Let's review where WhatsApp and customer conversations are costing you time or leads",
    'Revisemos dónde WhatsApp y las conversaciones con clientes te cuestan tiempo o prospectos',
    'Vamos revisar onde WhatsApp e conversas com clientes estão custando tempo ou leads'
  ],
  [
    'Book on the calendar for the fastest response, or send a short request below. We will help identify the most practical first improvement to make.',
    'Agenda en el calendario para la respuesta más rápida, o envía una solicitud breve abajo. Te ayudaremos a identificar la primera mejora práctica.',
    'Agende no calendário para resposta mais rápida ou envie uma solicitação breve abaixo. Ajudaremos a identificar a primeira melhoria prática.'
  ],
  ['Email Us', 'Escríbenos', 'Envie e-mail'],
  ['Data handling', 'Manejo de datos', 'Tratamento de dados'],
  ['Using approved business content as the source for customer-facing answers', 'Usar contenido aprobado del negocio como fuente para respuestas al cliente', 'Usar conteúdo aprovado do negócio como fonte para respostas ao cliente'],
  [
    'Designing integrations so useful context reaches your CRM or team—not open-ended data exposure',
    'Diseñar integraciones para que el contexto útil llegue a tu CRM o equipo—no exposición abierta de datos',
    'Projetar integrações para que contexto útil chegue ao CRM ou equipe—não exposição aberta de dados'
  ],
  [
    'Documenting what is processed, stored, and retained per project scope',
    'Documentar qué se procesa, almacena y conserva según el alcance del proyecto',
    'Documentar o que é processado, armazenado e retido conforme o escopo do projeto'
  ],
  [
    'Aligning with your privacy policy, SMS terms, and industry requirements where applicable',
    'Alinear con tu política de privacidad, términos SMS y requisitos del sector cuando aplique',
    'Alinhar com sua política de privacidade, termos SMS e requisitos do setor quando aplicável'
  ],
  ['Accuracy and clarity over speed alone', 'Precisión y claridad por encima de solo velocidad', 'Precisão e clareza acima de apenas velocidade'],
  [
    'Human escalation for sensitive, uncertain, or high-stakes requests',
    'Escalamiento humano para solicitudes sensibles, inciertas o de alto impacto',
    'Escalonamento humano para solicitações sensíveis, incertas ou de alto impacto'
  ],
  ['Clear limits on what AI can answer or act on', 'Límites claros sobre qué puede responder o hacer la IA', 'Limites claros sobre o que a IA pode responder ou fazer'],
  [
    'Transparent use of approved business information',
    'Uso transparente de información aprobada del negocio',
    'Uso transparente de informações aprovadas do negócio'
  ],
  [
    'Continuous improvement based on real customer interactions',
    'Mejora continua basada en interacciones reales con clientes',
    'Melhoria contínua baseada em interações reais com clientes'
  ],
  [
    'For healthcare, financial services, legal, insurance, and other regulated contexts, AI supports communication and workflow efficiency. It does not replace professional advice, compliance review, clinical judgment, legal judgment, or required human oversight.',
    'En salud, finanzas, legal, seguros y otros contextos regulados, la IA apoya la comunicación y la eficiencia operativa. No reemplaza asesoría profesional, revisión de cumplimiento, criterio clínico o legal, ni supervisión humana requerida.',
    'Em saúde, finanças, jurídico, seguros e outros contextos regulados, a IA apoia comunicação e eficiência operacional. Não substitui assessoria profissional, revisão de conformidade, julgamento clínico ou jurídico, nem supervisão humana exigida.'
  ],
  ['Regulated industries', 'Industrias reguladas', 'Setores regulados'],
  ['Roadmap / In progress', 'Plan / En curso', 'Plano / Em andamento'],
  [
    'Security and compliance roadmap',
    'Plan de seguridad y cumplimiento',
    'Plano de segurança e conformidade'
  ],
  [
    'These items reflect planned or in-progress alignment work—not claims of completed certification unless formally obtained.',
    'Estos ítems reflejan trabajo planificado o en curso—no afirmaciones de certificación completada salvo obtención formal.',
    'Estes itens refletem trabalho planejado ou em andamento—não alegações de certificação concluída salvo obtenção formal.'
  ],
  ['SOC 2 Type I readiness', 'Preparación SOC 2 Tipo I', 'Preparação SOC 2 Tipo I'],
  ['SOC 2 Type II future readiness', 'Preparación futura SOC 2 Tipo II', 'Preparação futura SOC 2 Tipo II'],
  ['ISO/IEC 27001 alignment', 'Alineación ISO/IEC 27001', 'Alinhamento ISO/IEC 27001'],
  ['Data Processing Agreement readiness', 'Preparación de acuerdo de tratamiento de datos', 'Preparação de acordo de tratamento de dados'],
  ['Privacy Policy and Terms of Service', 'Política de Privacidad y Términos de Servicio', 'Política de Privacidade e Termos de Serviço'],
  ['Internal data handling procedures', 'Procedimientos internos de manejo de datos', 'Procedimentos internos de tratamento de dados'],
  ['Responsible AI usage policy', 'Política de uso responsable de IA', 'Política de uso responsável de IA'],
  ['Vendor security review process', 'Proceso de revisión de seguridad de proveedores', 'Processo de revisão de segurança de fornecedores'],
  [
    'Certifications listed here are roadmap items only. DBX Solutions does not claim completed certification unless formally obtained and published.',
    'Las certificaciones listadas son ítems de plan únicamente. DBX Solutions no declara certificación completada salvo obtención y publicación formal.',
    'As certificações listadas são itens de plano apenas. A DBX Solutions não declara certificação concluída salvo obtenção e publicação formal.'
  ],
  ['Select one', 'Selecciona una', 'Selecione uma'],
  ['Your name', 'Tu nombre', 'Seu nome'],
  ['Business email', 'Correo empresarial', 'E-mail comercial'],
  ['Phone or WhatsApp', 'Teléfono o WhatsApp', 'Telefone ou WhatsApp'],
  ['What are you looking to improve?', '¿Qué quieres mejorar?', 'O que você quer melhorar?'],
  ['Book directly on the calendar', 'Agenda directamente en el calendario', 'Agende diretamente no calendário'],
  [
    'Please confirm SMS consent preferences before submitting.',
    'Confirme sus preferencias de consentimiento SMS antes de enviar.',
    'Confirme suas preferências de consentimento SMS antes de enviar.'
  ],
  [
    'How we approach practical AI adoption',
    'Cómo abordamos la adopción práctica de IA',
    'Como abordamos a adoção prática de IA'
  ]
]

function loadEsEntries() {
  const src = fs.readFileSync(path.join(root, 'src/i18n-runtime.js'), 'utf8')
  const block = src.match(/const esEntries = (\[[\s\S]*?\])\n\nconst localeCatalogs/)?.[1]
  return { src, entries: vm.runInNewContext(block) }
}

function loadPtEntries() {
  const src = fs.readFileSync(path.join(root, 'src/i18n/pt-entries.js'), 'utf8')
  const block = src.match(/export const ptEntries = (\[[\s\S]*\])\n/)?.[1]
  return { src, entries: vm.runInNewContext(block) }
}

function dedupeEntries(entries) {
  const map = new Map()
  const order = []
  for (const [en, tr] of entries) {
    if (!map.has(en)) order.push(en)
    map.set(en, tr)
  }
  return order.map((en) => [en, map.get(en)])
}

function applyTriples(entries, triples, col) {
  const map = new Map(entries)
  let updated = 0
  let added = 0
  for (const row of triples) {
    const en = row[0]
    const tr = row[col]
    if (map.has(en)) {
      if (map.get(en) !== tr) {
        map.set(en, tr)
        updated++
      }
    } else {
      map.set(en, tr)
      added++
    }
  }
  const ordered = []
  const seen = new Set()
  for (const [en] of entries) {
    if (!seen.has(en) && map.has(en)) {
      ordered.push([en, map.get(en)])
      seen.add(en)
    }
  }
  for (const [en, tr] of map) {
    if (!seen.has(en)) ordered.push([en, tr])
  }
  return { entries: dedupeEntries(ordered), updated, added }
}

function formatEntries(entries) {
  return entries
    .map(([en, tr]) => `  [\n    ${JSON.stringify(en)},\n    ${JSON.stringify(tr)}\n  ]`)
    .join(',\n')
}

const { src: esSrc, entries: esEntries } = loadEsEntries()
const esResult = applyTriples(esEntries, triples, 1)
const newEsBlock = formatEntries(esResult.entries)
const newEsSrc = esSrc.replace(/const esEntries = \[[\s\S]*?\]\n\nconst localeCatalogs/, `const esEntries = [\n${newEsBlock}\n]\n\nconst localeCatalogs`)
fs.writeFileSync(path.join(root, 'src/i18n-runtime.js'), newEsSrc)

const { src: ptSrc, entries: ptEntries } = loadPtEntries()
const ptResult = applyTriples(ptEntries, triples, 2)
const newPtBlock = formatEntries(ptResult.entries)
const newPtSrc = ptSrc.replace(/export const ptEntries = \[[\s\S]*\]\n/, `export const ptEntries = [\n${newPtBlock}\n]\n`)
fs.writeFileSync(path.join(root, 'src/i18n/pt-entries.js'), newPtSrc)

console.log(`ES: ${esResult.updated} updated, ${esResult.added} added`)
console.log(`PT: ${ptResult.updated} updated, ${ptResult.added} added`)

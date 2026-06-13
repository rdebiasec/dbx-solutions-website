/**
 * Apply manual spelling and translation fixes to PT catalog.
 * ES fixes should be edited directly in i18n-runtime.js (avoid blind string replace).
 * Run: node scripts/apply-i18n-corrections.mjs
 */
import fs from 'fs'

const keyMigrations = {
  'DBX focuses on business outcomes that make customer communication clearer, follow-up easier, and support more scalable.':
    'DBX focuses on business outcomes that make customer communication clearer, follow-up easier, and make support more scalable.'
}

const ptCorrections = {
  'Home': 'Início',
  'Missed lead': 'Lead perdido',
  'Structured intake': 'Captação estruturada',
  'speaker': 'Alto-falante',
  'Design': 'Concepção',
  'Route': 'Encaminhar',
  'Follow up': 'Acompanhar',
  'Review': 'Revisar',
  'Mute': 'Silenciar',
  'End': 'Encerrar',
  'Industries': 'Setores',
  'Explore Industries': 'Explorar setores',
  'Why DBX Solutions': 'Por que a DBX Solutions',
  'What does DBX Solutions do?': 'O que a DBX Solutions faz?',
  'Integration-Aware': 'Integração desde o início',
  'Integration-aware solutions': 'Soluções pensadas para integração',
  'Privacy Policy': 'Política de Privacidade',
  'Best for': 'Ideal para',
  'Start Practical': 'Comece de forma prática',
  'Smart Escalation': 'Escalonamento inteligente',
  'Chat': 'Chat',
  'DBX AI Agent': 'Agente de IA da DBX',
  'DBX AI Assistant': 'Assistente de IA da DBX',
  'Book a Free Consultation': 'Agende uma consulta grátis',
  'They write you': 'Clientes escrevem para você',
  'Good if you': 'Ideal se',
  'Tell us where you\'re stuck—we connect WhatsApp, your team, and the tools you already use.':
    'Diga onde você trava—conectamos WhatsApp, sua equipe e as ferramentas que você já usa.',
  'DBX handles intake': 'DBX gerencia a entrada',
  'For many SMBs, the issue is not effort. It is that conversations, customer details, and next steps are spread across busy people and disconnected tools.':
    'Para muitas PMEs, o problema não é falta de esforço. É que conversas, dados dos clientes e próximos passos ficam espalhados entre pessoas ocupadas e ferramentas desconectadas.',
  'DBX Solutions designs customer conversation systems that collect the right information, trigger the right workflow, and give your team useful context.':
    'A DBX Solutions cria sistemas de conversa com clientes que coletam as informações certas, acionam o fluxo correto e dão contexto útil à sua equipe.',
  'Support answers with approved context': 'Respostas com contexto aprovado',
  'Your team steps in when judgment matters': 'Sua equipe entra quando o critério humano importa',
  'Seamless handoffs to your team exactly when a human touch is needed.':
    'Repasse fluido para sua equipe exatamente quando o toque humano é necessário.',
  'DBX implements and manages agentic AI for growing businesses—systems that respond, capture lead details, trigger follow-up in your CRM or team, and escalate when judgment matters. Not a traditional chatbot that only answers FAQs.':
    'A DBX implementa e opera IA agéntica para empresas em crescimento—sistemas que respondem, capturam dados de leads, acionam o acompanhamento no CRM ou na equipe e escalam quando o critério humano importa. Não é um chatbot tradicional que só responde perguntas frequentes.',
  'DBX focuses on agentic AI that takes action—response speed, cleaner intake, and follow-up your team can use. Not traditional chatbot demos.':
    'A DBX foca em IA agéntica que age—velocidade de resposta, captação mais clara e acompanhamento que sua equipe pode usar. Não são demonstrações de chatbot tradicional.',
  'DBX focuses on measurable outcomes—response speed, cleaner intake, and follow-up your team can use.':
    'A DBX foca em resultados mensuráveis—velocidade de resposta, captação mais clara e acompanhamento que sua equipe pode usar.',
  'Agentic AI for Customers': 'IA agéntica para clientes',
  'Agentic AI that answers questions, takes action, collects information, and supports conversations across digital channels.':
    'IA agéntica que responde perguntas, age, coleta informações e apoia conversas em canais digitais.',
  'Agentic AI for WhatsApp, web chat, SMS, forms, and email that takes action—answers, qualifies, collects data, and routes follow-up. Not a scripted FAQ chatbot.':
    'IA agéntica para WhatsApp, chat na web, SMS, formulários e e-mail que age—responde, qualifica, coleta dados e encaminha o acompanhamento. Não é um chatbot de FAQ com respostas pré-definidas.',
  'Agentic AI for WhatsApp, web chat, SMS, forms, and email—responds, qualifies, collects data, and routes follow-up to your team or CRM.':
    'IA agéntica para WhatsApp, chat na web, SMS, formulários e e-mail—responde, qualifica, coleta dados e encaminha o acompanhamento para sua equipe ou CRM.',
  'Agentic AI stays accurate, useful, and aligned with customer behavior.':
    'A IA agéntica permanece precisa, útil e alinhada com o comportamento do cliente.',
  'Agentic AI is built around approved business information, clear rules, escalation paths, and ongoing quality review.':
    'A IA agéntica é construída com base em informações comerciais aprovadas, regras claras, caminhos de escalonamento e revisão contínua de qualidade.',
  'Use AI-powered conversation flows to capture prospect details, qualify interest, ask the right questions, and route leads to the right next step.':
    'Utilize fluxos de conversa com IA para capturar detalhes de prospects, qualificar interesse, fazer as perguntas certas e encaminhar leads para a próxima etapa.',
  'From answering repetitive questions to chasing down leads, we take the "busy" out of business. It’s enterprise-grade automation that actually feels like help.':
    'De responder perguntas repetitivas a acompanhar leads, tiramos a "correria" do dia a dia. É automação de nível empresarial que realmente ajuda.',
  'Support appointment inquiries, FAQs, intake guidance, service information, and patient communication workflows.':
    'Atenda consultas de agendamento, FAQs, orientações de captação, informações de serviço e fluxos de comunicação com pacientes.',
  'Reply on WhatsApp and chat': 'Respostas no WhatsApp e no chat',
  'Configure agentic AI': 'Configurar IA agéntica',
  'Free consultations include a channel review and three practical agentic AI opportunities.':
    'As consultas gratuitas incluem uma análise dos canais e três oportunidades práticas de IA agéntica.',
  'Book a free consultation. We will review your channels, identify the first workflow to improve, and outline three practical agentic AI opportunities for your business.':
    'Agende uma consulta gratuita. Analisaremos seus canais, identificaremos o primeiro fluxo de trabalho a melhorar e delinearemos três oportunidades práticas de IA agéntica para o seu negócio.',
  'Every business has different customer touchpoints, tools, and operational challenges. DBX Solutions helps identify where AI can make the greatest impact, then designs solutions that fit your workflows, team capacity, and business goals.':
    'Cada empresa tem diferentes pontos de contato com o cliente, ferramentas e desafios operacionais. A DBX Solutions ajuda a identificar onde a IA pode gerar o maior impacto e, em seguida, projeta soluções que se adaptam aos seus fluxos de trabalho, capacidade da equipe e objetivos de negócios.',
  'DBX focuses on business outcomes that make customer communication clearer, follow-up easier, and make support more scalable.':
    'A DBX se concentra em resultados de negócios que tornam a comunicação com o cliente mais clara, o acompanhamento mais fácil e o suporte mais escalável.',
  'Connects customer context to your CRM, calendar, support desk, and team notifications.':
    'Conecta o contexto do cliente ao seu CRM, calendário, central de atendimento e notificações da equipe.',
  'Automate intake, qualify inquiries, route prospects, and improve response times for consulting, legal, financial, and advisory teams.':
    'Automatize a captação, qualifique consultas, encaminhe prospects e melhore os tempos de resposta para equipes de consultoria, jurídicas, financeiras e de assessoria.',
  'Example: A buyer asks about availability on WhatsApp; the agent collects budget and timeline before alerting the listing agent.':
    'Exemplo: um comprador pergunta sobre disponibilidade no WhatsApp; o agente coleta orçamento e cronograma antes de alertar o corretor responsável pelo imóvel.',
  'By checking this box, you provide express written consent to receive SMS communications from DBX Solutions LLC related to appointments, services, and support. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out and HELP for help. See Privacy Policy and SMS Terms.':
    'Ao marcar esta caixa, você fornece consentimento expresso por escrito para receber comunicações SMS da DBX Solutions LLC relacionadas a compromissos, serviços e suporte. A frequência das mensagens varia. Podem ser cobradas tarifas de mensagens e dados. O consentimento não é uma condição de compra. Responda STOP para cancelar e HELP para obter ajuda. Consulte a Política de Privacidade e os Termos de SMS.',
  'We monitor performance, review user behavior, improve flows, and refine the solution as your business evolves.':
    'Monitoramos o desempenho, analisamos o comportamento dos usuários, melhoramos os fluxos e refinamos a solução à medida que seu negócio evolui.',
  'Bring your current channels, common questions, and follow-up process. We will show you where response, intake, or qualification should become clearer first.':
    'Traga seus canais atuais, perguntas comuns e processo de acompanhamento. Mostraremos onde a resposta, a captação ou a qualificação devem ficar mais claras primeiro.',
  'Support teams spend too much time on repeat requests and intake triage.':
    'As equipes de suporte gastam muito tempo em solicitações repetidas e triagem de captação.',
  'Tune approved responses so agentic AI stays accurate, useful, and aligned with your business.':
    'Ajuste as respostas aprovadas para que a IA agéntica permaneça precisa, útil e alinhada com o seu negócio.',
  'AI systems require review, tuning, monitoring, and continuous refinement. DBX helps keep agentic AI accurate, useful, and aligned with evolving workflows and customer needs.':
    'Os sistemas de IA exigem revisão, ajuste, monitoramento e refinamento contínuos. A DBX ajuda a manter a IA agéntica precisa, útil e alinhada com os fluxos de trabalho em evolução e as necessidades dos clientes.',
  'AI systems need review, tuning, and continuous improvement. DBX helps keep your agentic AI accurate, useful, and aligned with your business as customer behavior and workflows change.':
    'Os sistemas de IA precisam de revisão, ajuste e melhoria contínuas. A DBX ajuda a manter sua IA agéntica precisa, útil e alinhada com seus negócios à medida que o comportamento do cliente e os fluxos de trabalho mudam.',
  'From agentic AI on WhatsApp and chat to CRM integration and ongoing optimization, DBX implements services the way your team already works.':
    'Desde IA agéntica no WhatsApp e chat até integração de CRM e otimização contínua, a DBX implementa serviços de acordo com o modo como sua equipe já trabalha.',
  'Example: Program FAQs and intake questions run on chat while enrollment-ready leads land in your CRM with notes.':
    'Exemplo: FAQs do programa e perguntas de captação rodam no chat enquanto leads prontos para inscrição chegam ao seu CRM com notas.',
  'We can help identify where response, intake, qualification, or customer follow-up should become clearer first.':
    'Podemos ajudar a identificar onde a resposta, a captação, a qualificação ou o acompanhamento do cliente devem ficar mais claros primeiro.',
  'Automate common support interactions, frequently asked questions, intake forms, ticket routing, and customer updates.':
    'Automatize interações comuns de suporte, perguntas frequentes, formulários de captação, encaminhamento de tickets e atualizações de clientes.'
}

function applyRegexFixes(text) {
  return text
    .replace(/\u200b/g, '')
    .replace(/ingestão mais limpa/gi, 'captação mais clara')
    .replace(/Ingestão estruturada/gi, 'Captação estruturada')
    .replace(/\badmissão\b/gi, 'captação')
    .replace(/julgamento humano/gi, 'critério humano')
    .replace(/julgamento é importante/gi, 'o critério humano importa')
    .replace(/julgamento importa/gi, 'critério humano importa')
    .replace(/IA de agência/gi, 'IA agéntica')
    .replace(/IA da agência/gi, 'IA agéntica')
    .replace(/IA agente\b/gi, 'IA agéntica')
    .replace(/\bAgentic AI\b/g, 'IA agéntica')
    .replace(/\bA Agentic AI\b/g, 'A IA agéntica')
    .replace(/Liderança perdida/gi, 'Lead perdido')
    .replace(/Apoie respostas com contexto aprovado/gi, 'Respostas com contexto aprovado')
    .replace(/Serve para você se/gi, 'Ideal se')
    .replace(/Eles te escrevem/gi, 'Clientes escrevem para você')
    .replace(/ quando o julgamento /gi, ' quando o critério humano ')
    .replace(/precisar de julgamento /gi, 'precisar de critério humano ')
    .replace(/para julgamento,/gi, 'para critério humano,')
    .replace(/ e o julgamento /gi, ' e o critério humano ')
    .replace(/Monitorizamos/g, 'Monitoramos')
    .replace(/\butilizadores\b/gi, 'usuários')
    .replace(/\bnum caminho\b/gi, 'em um caminho')
    .replace(/\bo seu negócio\b/gi, 'seu negócio')
    .replace(/\bon-line\b/gi, 'online')
    .replace(/Bater papo/gi, 'Chat')
    .replace(/demos de chatbot/gi, 'demonstrações de chatbot')
    .replace(/com script/gi, 'com respostas pré-definidas')
    .replace(/Apoie consultas de consultas/gi, 'Atenda consultas de agendamento')
    .replace(/equipes de consultoria, jurídicas, financeiras e de consultoria/gi,
      'equipes de consultoria, jurídicas, financeiras e de assessoria')
    .replace(/agente de listagem/gi, 'corretor responsável pelo imóvel')
    .replace(/suporte técnico/gi, 'central de atendimento')
    .replace(/palestrante/gi, 'Alto-falante')
    .replace(/^Lar$/i, 'Início')
}

function applyCorrections(entries, corrections) {
  const seen = new Map()
  for (const [en, tr] of entries) {
    const key = keyMigrations[en] ?? en
    let next = corrections[key] ?? tr
    next = applyRegexFixes(next)
    seen.set(key, next)
  }
  return [...seen.entries()]
}

const { ptEntries } = await import('../src/i18n/pt-entries.js')
const fixedPt = applyCorrections(ptEntries, ptCorrections)
fs.writeFileSync(
  'src/i18n/pt-entries.js',
  `export const ptEntries = ${JSON.stringify(fixedPt, null, 2)}\n`
)

console.log(`Applied PT i18n corrections (${fixedPt.length} entries).`)

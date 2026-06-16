import { COMPANY_LEGAL_NAME, getLegalEffectiveDate, legalContactBlockHtml } from '../constants.js'

export default function privacyPt() {
  return `
    <h1>Política de Privacidade</h1>
    <p class="legal-effective"><strong>Data de vigência: ${getLegalEffectiveDate('pt')}</strong></p>
    <p>A ${COMPANY_LEGAL_NAME}, sociedade de responsabilidade limitada constituída no estado da Flórida, Estados Unidos ("DBX Solutions", "nós" ou "nosso"), oferece serviços de consultoria e implementação em experiência do cliente, automação e inteligência artificial para empresas. Respeitamos a sua privacidade e estamos comprometidos em tratar informações pessoais de forma responsável.</p>
    <p>Esta Política de Privacidade explica como coletamos, usamos, divulgamos e retemos informações quando você visita nosso site, envia uma consulta, agenda uma reunião ou interage conosco de outra forma.</p>

    <h2>1. Informações que coletamos</h2>
    <p>Podemos coletar as seguintes categorias de informações:</p>

    <h3>Informações fornecidas diretamente por você</h3>
    <ul>
      <li>nome</li>
      <li>endereço de e-mail</li>
      <li>número de telefone</li>
      <li>nome da empresa e dados comerciais relacionados</li>
      <li>conteúdo da consulta e informações do projeto</li>
    </ul>

    <h3>Informações coletadas automaticamente</h3>
    <p>Quando você visita nosso site, podemos coletar dados técnicos e de uso, como:</p>
    <ul>
      <li>endereço IP</li>
      <li>tipo e versão do navegador</li>
      <li>tipo de dispositivo e sistema operacional</li>
      <li>páginas visitadas e tempo de permanência</li>
      <li>URLs de referência e interações gerais</li>
    </ul>

    <h3>Dados de comunicações</h3>
    <p>Podemos reter registros de comunicações quando você nos contata por e-mail, telefone, SMS ou ferramentas de mensagens no site.</p>

    <h2>2. Como usamos as informações</h2>
    <p>Utilizamos as informações para:</p>
    <ul>
      <li>responder consultas e solicitações</li>
      <li>agendar consultas, demonstrações e acompanhamentos</li>
      <li>enviar comunicações relacionadas a serviços</li>
      <li>melhorar nosso site, serviços e operações</li>
      <li>manter registros internos e fluxos de trabalho</li>
      <li>proteger nosso negócio e os usuários</li>
      <li>cumprir obrigações legais ou regulatórias</li>
    </ul>
    <p>Também podemos usar dados agregados ou desidentificados para análise interna e melhoria.</p>

    <h2>3. Comunicações SMS</h2>
    <p>Se você fornecer seu número de telefone e der o consentimento apropriado quando exigido, a DBX Solutions pode enviar mensagens SMS relacionadas à sua interação comercial conosco.</p>
    <p>Essas mensagens podem incluir:</p>
    <ul>
      <li>lembretes de consultas</li>
      <li>coordenação de consultas ou demonstrações</li>
      <li>respostas de suporte</li>
      <li>atualizações relacionadas a serviços</li>
    </ul>
    <p>A frequência das mensagens varia. Tarifas de mensagens e dados podem ser aplicadas. O consentimento não é condição de compra.</p>
    <p>Você pode cancelar a qualquer momento respondendo <strong>STOP</strong>. Para assistência, responda <strong>HELP</strong> ou entre em contato conosco.</p>
    <p>Não compartilharemos informações móveis com terceiros ou afiliados para fins próprios de marketing ou promoção.</p>
    <p>O formulário de contato do nosso site envia consultas por e-mail e não armazena envios em nossos servidores. Se você optar por SMS por meio da caixa de seleção correspondente, sua preferência de consentimento é incluída na mensagem enviada. Podemos reter evidência do opt-in SMS em nossas comunicações comerciais quando aplicável, mas não afirmamos retenção sistemática de registros de consentimento para formulários que utilizam apenas e-mail.</p>

    <h2>4. Cookies e analítica</h2>
    <p>Podemos usar cookies e tecnologias similares para entender como os visitantes usam nosso site e melhorar desempenho e usabilidade.</p>
    <p>Você pode controlar cookies nas configurações do navegador. Desativá-los pode afetar certas funcionalidades.</p>

    <h2>5. Como compartilhamos informações</h2>
    <p><strong>Não vendemos informações pessoais</strong>.</p>
    <p>Podemos compartilhar informações com prestadores de serviços que apoiam nossas operações, incluindo:</p>
    <ul>
      <li>provedores de hospedagem e infraestrutura</li>
      <li>ferramentas de analítica</li>
      <li>plataformas de comunicação e mensagens</li>
      <li>sistemas de CRM e fluxos de trabalho</li>
    </ul>
    <p>Esses prestadores processam informações em nosso nome como parte da prestação de serviços.</p>
    <p>Também podemos divulgar informações:</p>
    <ul>
      <li>quando exigido por lei ou processo legal</li>
      <li>para proteger nossos direitos, usuários ou operações</li>
      <li>em conexão com fusão, aquisição ou venda de ativos</li>
    </ul>

    <h2>6. Operadores e subprocessadores</h2>
    <p>Utilizamos operadores de confiança para operar nosso site e comunicações. As categorias atuais incluem:</p>
    <ul>
      <li><strong>Intercom</strong> — plataforma de mensagens e suporte ao cliente (operador)</li>
      <li><strong>Google Fonts</strong> — entrega de fontes web ao carregar nosso site</li>
      <li>provedores de hospedagem, e-mail e infraestrutura que suportam a entrega do site</li>
    </ul>
    <p>Esses operadores processam informações pessoais apenas na medida necessária para prestar seus serviços e estão sujeitos a obrigações contratuais ou de política adequadas ao seu papel.</p>

    <h2>7. Transferências internacionais de dados</h2>
    <p>A DBX Solutions está sediada nos Estados Unidos. Suas informações podem ser processadas nos Estados Unidos e em outros países onde operamos ou onde nossos prestadores operam. Esses países podem ter leis de proteção de dados diferentes das do seu país.</p>
    <p>Quando exigido, adotamos medidas razoáveis destinadas a proteger informações transferidas internacionalmente, incluindo salvaguardas contratuais com prestadores quando apropriado.</p>

    <h2>8. Retenção de dados</h2>
    <p>Retemos informações apenas pelo tempo razoavelmente necessário para:</p>
    <ul>
      <li>responder consultas</li>
      <li>manter registros comerciais</li>
      <li>apoiar operações em curso</li>
      <li>cumprir obrigações legais</li>
      <li>resolver disputas e fazer cumprir acordos</li>
    </ul>
    <p>Os prazos de retenção podem variar conforme a natureza das informações.</p>

    <h2>9. Segurança dos dados</h2>
    <p>Implementamos salvaguardas administrativas e técnicas razoáveis destinadas a proteger informações. No entanto, nenhum método de transmissão ou armazenamento é completamente seguro e não podemos garantir segurança absoluta.</p>

    <h2>10. Suas opções</h2>
    <p>Você pode entrar em contato conosco para:</p>
    <ul>
      <li>solicitar acesso ou correção de suas informações</li>
      <li>solicitar exclusão de informações, quando aplicável</li>
      <li>cancelar comunicações não essenciais</li>
    </ul>
    <p>Responderemos conforme as leis aplicáveis e requisitos operacionais.</p>

    <h2>11. Direitos sob a LGPD (Lei nº 13.709/2018)</h2>
    <p>Se você for titular de dados no Brasil, esta seção complementa o disposto acima conforme a Lei Geral de Proteção de Dados (LGPD).</p>
    <ul>
      <li><strong>Controlador:</strong> ${COMPANY_LEGAL_NAME}, responsável pelas decisões referentes ao tratamento de dados pessoais.</li>
      <li><strong>Encarregado (DPO):</strong> para exercer seus direitos ou esclarecer dúvidas sobre tratamento de dados, entre em contato pelo e-mail indicado abaixo.</li>
      <li><strong>Base legal:</strong> o tratamento pode ocorrer com base no consentimento, execução de contrato, legítimo interesse ou cumprimento de obrigação legal, conforme aplicável.</li>
      <li><strong>Direitos do titular (Art. 18):</strong> confirmação da existência de tratamento; acesso; correção; anonimização, bloqueio ou eliminação; portabilidade; eliminação de dados tratados com consentimento; informação sobre compartilhamento; revogação do consentimento; e oposição a tratamentos irregulares.</li>
      <li><strong>Operadores:</strong> utilizamos prestadores como a Intercom como operadores, que tratam dados pessoais em nosso nome e conforme nossas instruções.</li>
      <li><strong>ANPD:</strong> você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (<a href="https://www.gov.br/anpd" target="_blank" rel="noopener noreferrer">www.gov.br/anpd</a>).</li>
    </ul>

    <h2>12. Serviços de terceiros e links</h2>
    <p>Nosso site pode conter links para sites ou serviços de terceiros. Não somos responsáveis por suas práticas de privacidade ou conteúdo. Recomendamos revisar suas políticas separadamente.</p>

    <h2>13. Alterações nesta política</h2>
    <p>Podemos atualizar esta Política de Privacidade periodicamente. Quando o fizermos, revisaremos a data de vigência acima e publicaremos a versão atualizada nesta página.</p>

    <h2>14. Contato</h2>
    ${legalContactBlockHtml()}
  `
}

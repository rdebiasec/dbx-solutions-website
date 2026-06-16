import {
  COMPANY_LEGAL_NAME,
  getLegalEffectiveDate,
  href,
  legalContactBlockHtml
} from '../constants.js'

export default function smsPt() {
  const privacyHref = href('privacy-policy/')

  return `
    <h1>Termos SMS</h1>
    <p class="legal-effective"><strong>Data de vigência: ${getLegalEffectiveDate('pt')}</strong></p>
    <p>Estes Termos SMS descrevem como a ${COMPANY_LEGAL_NAME}, sociedade de responsabilidade limitada constituída no estado da Flórida, Estados Unidos ("DBX Solutions", "nós" ou "nosso"), se comunica com indivíduos por <strong>mensagens de texto automatizadas</strong> em conexão com consultas comerciais, reuniões e serviços.</p>

    <h2>1. Descrição do programa</h2>
    <p>Se você fornecer seu número de celular e aceitar o opt-in quando exigido, poderá receber mensagens SMS da DBX Solutions relacionadas à sua interação comercial conosco.</p>
    <p>As mensagens podem incluir:</p>
    <ul>
      <li>lembretes de consultas</li>
      <li>coordenação de consultas ou demonstrações</li>
      <li>comunicações de suporte</li>
      <li>atualizações relacionadas a serviços</li>
    </ul>
    <p>Não enviamos mensagens não solicitadas nem utilizamos listas de contatos compradas, alugadas ou de terceiros.</p>

    <h2>2. Opt-in e consentimento</h2>
    <p>Ao marcar a caixa de consentimento SMS em nosso site (ou ao fornecer seu número de celular e confirmar o consentimento quando exigido), você fornece <strong>consentimento prévio expresso por escrito</strong> conforme a Telephone Consumer Protection Act (TCPA) dos EUA e a Florida Telemarketing Act (FTSA) para receber <strong>mensagens de texto automatizadas</strong> da DBX Solutions no número fornecido.</p>
    <p>Você fornece consentimento para receber mensagens SMS ao enviar seu número de telefone por meio de nosso site ou outros canais de comunicação e, quando aplicável, ao selecionar a caixa de opt-in. Assinaturas eletrônicas e consentimento eletrônico sob a E-SIGN Act dos EUA satisfazem o requisito de consentimento por escrito quando você marca a caixa de consentimento.</p>
    <p>O consentimento não é condição de compra.</p>

    <h2>3. Frequência de mensagens</h2>
    <p>A frequência das mensagens varia conforme sua interação conosco, suas solicitações e qualquer compromisso de serviço ativo.</p>

    <h2>4. Tarifas de mensagens e dados</h2>
    <p>Tarifas de mensagens e dados podem ser aplicadas conforme o plano da sua operadora. A DBX Solutions não é responsável por esses encargos.</p>

    <h2>5. Opt-out</h2>
    <p>Você pode cancelar mensagens SMS a qualquer momento respondendo STOP a qualquer mensagem.</p>
    <p>Após o cancelamento, você pode receber uma mensagem final de confirmação.</p>

    <h2>6. Ajuda e suporte</h2>
    <p>Para assistência, responda HELP a qualquer mensagem ou entre em contato conosco:</p>
    ${legalContactBlockHtml()}

    <h2>7. Provedores de terceiros e operadoras</h2>
    <p>A entrega de SMS é suportada por provedores de serviços de terceiros e operadoras de telefonia móvel.</p>
    <p>As operadoras não são responsáveis por mensagens atrasadas ou não entregues.</p>
    <p>A DBX Solutions não é responsável por atrasos ou falhas de transmissão causados por redes de operadoras ou plataformas de terceiros.</p>

    <h2>8. Privacidade</h2>
    <p>As informações coletadas em conexão com comunicações SMS são tratadas conforme nossa <a href="${privacyHref}">Política de Privacidade</a>.</p>
    <p>Não compartilhamos informações móveis com terceiros ou afiliados para fins próprios de marketing ou promoção.</p>

    <h2>9. Alterações nestes Termos</h2>
    <p>Podemos atualizar estes Termos SMS periodicamente. Quando o fizermos, revisaremos a data de vigência acima e publicaremos a versão atualizada nesta página.</p>
  `
}

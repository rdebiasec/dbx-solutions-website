import {
  COMPANY_LEGAL_NAME,
  getLegalEffectiveDate,
  href,
  legalContactBlockHtml
} from '../constants.js'

export default function termsPt() {
  const privacyHref = href('privacy-policy/')
  const smsTermsHref = href('sms-terms/')

  return `
    <h1>Termos de Serviço</h1>
    <p class="legal-effective"><strong>Data de vigência: ${getLegalEffectiveDate('pt')}</strong></p>
    <p>Estes Termos de Serviço ("Termos") regem seu acesso e uso do site da ${COMPANY_LEGAL_NAME} ("DBX Solutions", "nós" ou "nosso") e materiais relacionados.</p>
    <p>Ao acessar ou usar este site, você concorda com estes Termos. Se não concordar, não deve usar este site.</p>

    <h2>1. Finalidade do site</h2>
    <p>Este site é fornecido para fins informativos gerais e de comunicação comercial. Descreve os serviços, a abordagem e as formas de interagir com a DBX Solutions.</p>
    <p>Nada neste site constitui:</p>
    <ul>
      <li>uma oferta vinculante</li>
      <li>garantia de resultados</li>
      <li>assessoria legal, financeira ou técnica</li>
      <li>relação formal de cliente</li>
    </ul>
    <p>Todos os serviços são prestados somente sob acordos escritos separados.</p>

    <h2>2. Ausência de relação de cliente</h2>
    <p>Enviar um formulário, e-mail, agendar uma ligação ou entrar em contato de outra forma não cria relação de cliente, assessoria ou contratual.</p>
    <p>Uma relação formal é estabelecida apenas por acordo assinado entre a DBX Solutions e o cliente.</p>

    <h2>3. Serviços e resultados</h2>
    <p>A DBX Solutions oferece serviços de consultoria, implementação e suporte relacionados a experiência do cliente, automação e inteligência artificial.</p>
    <p>Quaisquer exemplos, estudos de caso, métricas ou depoimentos neste site têm fins informativos gerais.</p>
    <p>Os resultados reais variam conforme fatores como:</p>
    <ul>
      <li>sistemas e ferramentas em uso</li>
      <li>qualidade e disponibilidade de dados</li>
      <li>processos internos</li>
      <li>adoção e execução da equipe</li>
      <li>escopo e prazos de implementação</li>
    </ul>
    <p>Nenhum resultado específico é garantido.</p>

    <h2>4. Precisão das informações</h2>
    <p>Buscamos manter informações precisas e atualizadas, mas não garantimos que todo o conteúdo seja completo, atual ou livre de erros.</p>
    <p>Podemos atualizar, alterar ou remover conteúdo a qualquer momento sem aviso prévio.</p>

    <h2>5. Uso aceitável</h2>
    <p>Você concorda em não:</p>
    <ul>
      <li>usar o site em violação de leis ou regulamentos</li>
      <li>tentar acesso não autorizado a sistemas ou dados</li>
      <li>interferir na funcionalidade ou segurança do site</li>
      <li>enviar informações falsas ou enganosas</li>
      <li>copiar, extrair ou explorar conteúdo além do uso normal de avaliação comercial</li>
    </ul>

    <h2>6. Propriedade intelectual</h2>
    <p>Todo o conteúdo do site, incluindo texto, design, estrutura e materiais, é de propriedade ou licenciado à DBX Solutions.</p>
    <p>Você pode usar o site apenas para avaliação interna ou consideração comercial. Uso ou distribuição mais ampla não é permitida sem consentimento escrito.</p>

    <h2>7. Serviços de terceiros e links</h2>
    <p>Este site pode referenciar ou linkar ferramentas, plataformas ou sites de terceiros.</p>
    <p>A DBX Solutions não controla nem é responsável por:</p>
    <ul>
      <li>conteúdo de terceiros</li>
      <li>disponibilidade ou desempenho</li>
      <li>práticas de privacidade ou segurança</li>
    </ul>
    <p>O uso de serviços de terceiros é por sua conta e risco.</p>

    <h2>8. Isenção de garantias</h2>
    <p>Este site é fornecido "no estado em que se encontra" e "conforme disponível".</p>
    <p>Na máxima extensão permitida por lei, a DBX Solutions renuncia a todas as garantias, incluindo:</p>
    <ul>
      <li>precisão ou integridade</li>
      <li>disponibilidade ou tempo de atividade</li>
      <li>adequação a um propósito particular</li>
      <li>não violação</li>
    </ul>

    <h2>9. Limitação de responsabilidade</h2>
    <p>Na máxima extensão permitida por lei, a DBX Solutions não será responsável por danos indiretos, incidentais ou consequenciais decorrentes de ou relacionados ao seu uso deste site.</p>
    <p>Isso inclui, entre outros:</p>
    <ul>
      <li>perda de dados</li>
      <li>perda de negócios ou receita</li>
      <li>interrupções de serviço</li>
      <li>confiança no conteúdo do site</li>
    </ul>

    <h2>10. Indenização</h2>
    <p>Você concorda em indenizar e isentar a DBX Solutions de reclamações, danos ou despesas decorrentes de:</p>
    <ul>
      <li>uso indevido do site</li>
      <li>violação destes Termos</li>
      <li>violação de leis aplicáveis ou direitos de terceiros</li>
    </ul>

    <h2>11. Privacidade e comunicações</h2>
    <p>Seu uso deste site também está sujeito à nossa <a href="${privacyHref}">Política de Privacidade</a> e aos <a href="${smsTermsHref}">Termos SMS</a>.</p>
    <p>Se você fornecer informações de contato, concorda que a DBX Solutions possa contatá-lo sobre sua consulta, serviços ou comunicações relacionadas, sujeito aos requisitos de consentimento aplicáveis.</p>

    <h2>12. Alterações nestes Termos</h2>
    <p>Podemos atualizar estes Termos periodicamente. Quando o fizermos, revisaremos a data de vigência acima e publicaremos a versão atualizada nesta página.</p>

    <h2>13. Lei aplicável</h2>
    <p>Estes Termos são regidos pelas leis do Estado da Flórida e pelas leis aplicáveis dos Estados Unidos, sem considerar princípios de conflito de leis.</p>
    <p>Quaisquer disputas serão resolvidas nos tribunais competentes localizados na Flórida, salvo acordo escrito em contrário.</p>

    <h2>14. Contato</h2>
    ${legalContactBlockHtml()}
  `
}

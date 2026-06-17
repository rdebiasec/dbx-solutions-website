(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/kb/pt/sections/09-legal-sms.md","category":"kb","locale":"pt","title":"[PT] KB — Termos de SMS","description":"kb / pt / 09-legal-sms","content":"# Perguntas por seção — Termos de SMS\n\n**KB ID:** `kb.sms`  \n**Source:** `content/pt/09-legal-sms.md`  \n**Site:** `/sms-terms/`\n\n---\n\n## Programa\n\n**P: Que tipos de SMS posso receber da DBX?**  \n**R:** Mensagens automáticas relacionadas à sua interação com a empresa — lembretes de agendamento, coordenação de consulta, suporte ou atualizações de serviço.\n\n**P: Vocês enviam spam ou compram listas de telefone?**  \n**R:** Não enviamos mensagens não solicitadas e não usamos listas de contatos compradas ou alugadas.\n\n---\n\n## Opt-in e opt-out\n\n**P: Como concordo em receber SMS?**  \n**R:** Marcando a caixa de consentimento de SMS no formulário (ou fornecendo seu número e confirmando consentimento quando exigido). O consentimento não é obrigatório para comprar serviços.\n\n**P: Como paro de receber SMS?**  \n**R:** Responda **STOP** a qualquer mensagem. Você pode receber uma confirmação final.\n\n**P: Como peço ajuda sobre SMS?**  \n**R:** Responda **HELP** ou fale com contact@dbx-solutions.com / +1 (321) 287-4509.\n\n---\n\n## Custos e entrega\n\n**P: Mensagens de texto são gratuitas?**  \n**R:** Podem ser cobradas tarifas de mensagem e dados pela sua operadora. A DBX não cobra essas taxas.\n\n**P: E se um SMS não chegar?**  \n**R:** A entrega depende de operadoras e provedores terceiros. A DBX não é responsável por atrasos ou falhas das operadoras.\n\n---\n\n## Privacidade\n\n**P: Vocês compartilham meu número de celular para marketing?**  \n**R:** Não — não compartilhamos informações móveis com terceiros ou afiliados para marketing próprio deles.\n\n**P: Onde os dados de SMS são tratados?**  \n**R:** Conforme nossa Política de Privacidade em dbx-solutions.com/privacy-policy/\n"};
  const title = document.querySelector('textarea[placeholder="Untitled public article"]');
  const desc = document.querySelector('textarea[placeholder="Describe your article to help it get found"]');
  const body = document.querySelector('[role="textbox"]');
  if (!title || !body) return {ok:false, err:'missing fields'};
  title.value = data.title;
  title.dispatchEvent(new Event('input', {bubbles:true}));
  title.dispatchEvent(new Event('change', {bubbles:true}));
  if (desc) { desc.value = data.description; desc.dispatchEvent(new Event('input', {bubbles:true})); }
  body.focus(); body.innerHTML='';
  for (const line of data.content.split('\n')) { const p=document.createElement('p'); p.textContent=line||' '; body.appendChild(p); }
  body.dispatchEvent(new Event('input', {bubbles:true}));
  const pub=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Publish');
  return {ok:true, title:title.value, bodyLen:body.innerText.length, publishDisabled: pub?.disabled};
})()
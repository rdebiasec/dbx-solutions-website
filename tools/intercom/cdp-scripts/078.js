(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/pt/10-legal-data-handling.md","category":"site","locale":"pt","title":"[PT] Site — Aviso de Tratamento de Dados","description":"site / pt / 10-legal-data-handling","content":"# Aviso de Tratamento de Dados\n\n## SEO\n\n- **Title:** DBX Soluções | Aviso de Tratamento de Dados\n- **Description:** How DBX Soluções approaches customer and business data in AI implementations, integrations, and ongoing operations.\n\n## Hero\n\n**Eyebrow:** Tratamento de dados  \n**Headline:** Aviso de Tratamento de Dados  \n**Body:** DBX designs customer flows around approved business information, controlled access, and clear limits on what systems process and store. For website visitor data, see our Política de Privacidade.\n\n**Primary CTA:** Agendar uma consulta  \n**Secondary CTA:** Fale conosco → `/contact/`\n\n---\n\n## Nossa abordagem\n\nDBX Soluções builds data handling practices for client implementations—approved content sources, controlled access, and secure integration planning. This notice covers project work, not website privacy (see Política de Privacidade).\n\n---\n\n## O que priorizamos\n\n1. Usar conteúdo aprovado do negócio como fonte para respostas ao cliente\n2. Limitar o acesso a sistemas e dados necessários para cada fluxo com o cliente\n3. Projetar integrações para que contexto útil chegue ao CRM ou equipe—não exposição aberta de dados\n4. Documentar o que é processado, armazenado e retido conforme o escopo do projeto\n5. Alinhar com sua política de privacidade, termos SMS e requisitos do setor quando aplicável\n"};
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
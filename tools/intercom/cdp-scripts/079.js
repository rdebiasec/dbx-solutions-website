(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/pt/11-legal-responsible-ai.md","category":"site","locale":"pt","title":"[PT] Site — Política de IA Responsável","description":"site / pt / 11-legal-responsible-ai","content":"# Política de IA Responsável\n\n## SEO\n\n- **Title:** DBX Soluções | Política de IA Responsável\n- **Description:** How DBX Soluções applies human oversight, escalation paths, and approved business information in customer-facing AI.\n\n## Hero\n\n**Eyebrow:** Responsible AI  \n**Headline:** Política de IA Responsável  \n**Body:** A DBX implementa IA voltada ao cliente com caminhos de escalonamento, informações aprovadas e revisão humana—não automação sem limites.\n\n**Primary CTA:** Agendar uma consulta  \n**Secondary CTA:** Fale conosco → `/contact/`\n\n---\n\n## Princípios de funcionamento\n\n1. Precisão e clareza acima de apenas velocidade\n2. Escalonamento humano para solicitações sensíveis, incertas ou de alto impacto\n3. Limites claros sobre o que a IA pode responder ou fazer\n4. Uso transparente de informações aprovadas do negócio\n5. Melhoria contínua baseada em interações reais com clientes\n\n---\n\n## Setores regulados\n\nEm saúde, finanças, jurídico, seguros e outros contextos regulados, a IA apoia comunicação e eficiência operacional. Não substitui assessoria profissional, revisão de conformidade, julgamento clínico ou jurídico, nem supervisão humana exigida.\n"};
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
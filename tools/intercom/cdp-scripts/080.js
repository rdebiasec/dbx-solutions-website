(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/pt/12-legal-security-roadmap.md","category":"site","locale":"pt","title":"[PT] Site — Roteiro de Segurança","description":"site / pt / 12-legal-security-roadmap","content":"# Roteiro de Segurança\n\n## SEO\n\n- **Title:** DBX Soluções | Roteiro de Segurança\n- **Description:** DBX Soluções security and compliance roadmap—presented as readiness work, not completed certifications unless formally obtained.\n\n## Hero\n\n**Eyebrow:** Roteiro de segurança  \n**Headline:** Roteiro de Segurança  \n**Body:** A DBX alinha operações a práticas de segurança reconhecidas. Os itens abaixo são trabalho planejado ou em andamento, salvo indicação em contrário.\n\n**Primary CTA:** Agendar uma consulta  \n**Secondary CTA:** Fale conosco → `/contact/`\n\n---\n\n## Plano de segurança e conformidade\n\n**Eyebrow:** Plano / Em andamento  \n**Description:** Estes itens refletem trabalho planejado ou em andamento—não alegações de certificação concluída salvo obtenção formal.\n\n### Roadmap items\n\n- Preparação SOC 2 Tipo I\n- Preparação futura SOC 2 Tipo II\n- Alinhamento ISO/IEC 27001\n- Preparação de acordo de tratamento de dados\n- Política de Privacidade and Termos de Serviço\n- Procedimentos internos de tratamento de dados\n- Política de uso responsável de IA\n- Processo de revisão de segurança de fornecedores\n\n### Disclaimer\n\nCertifications listed here are roadmap items only. DBX Soluções does not claim completed certification unless formally obtained and published.\n"};
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
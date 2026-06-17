(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/es/11-legal-responsible-ai.md","category":"site","locale":"es","title":"[ES] Site — Política de IA Responsable","description":"site / es / 11-legal-responsible-ai","content":"# Política de IA Responsable\n\n## SEO\n\n- **Title:** DBX Soluciones | Política de IA Responsable\n- **Description:** How DBX Soluciones applies human oversight, escalation paths, and approved business information in customer-facing AI.\n\n## Hero\n\n**Eyebrow:** Responsible AI  \n**Headline:** Política de IA Responsable  \n**Body:** DBX implementa IA orientada al cliente con rutas de escalamiento, información aprobada y revisión humana—no automatización sin límites.\n\n**Primary CTA:** Reservar una consulta  \n**Secondary CTA:** Contáctanos → `/contact/`\n\n---\n\n## Principios de trabajo\n\n1. Precisión y claridad por encima de solo velocidad\n2. Escalamiento humano para solicitudes sensibles, inciertas o de alto impacto\n3. Límites claros sobre qué puede responder o hacer la IA\n4. Uso transparente de información aprobada del negocio\n5. Mejora continua basada en interacciones reales con clientes\n\n---\n\n## Industrias reguladas\n\nEn salud, finanzas, legal, seguros y otros contextos regulados, la IA apoya la comunicación y la eficiencia operativa. No reemplaza asesoría profesional, revisión de cumplimiento, criterio clínico o legal, ni supervisión humana requerida.\n"};
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
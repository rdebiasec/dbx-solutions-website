(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/es/12-legal-security-roadmap.md","category":"site","locale":"es","title":"[ES] Site — Hoja de Ruta de Seguridad","description":"site / es / 12-legal-security-roadmap","content":"# Hoja de Ruta de Seguridad\n\n## SEO\n\n- **Title:** DBX Soluciones | Hoja de Ruta de Seguridad\n- **Description:** DBX Soluciones security and compliance roadmap—presented as readiness work, not completed certifications unless formally obtained.\n\n## Hero\n\n**Eyebrow:** Roadmap de seguridad  \n**Headline:** Hoja de Ruta de Seguridad  \n**Body:** DBX alinea operaciones con prácticas de seguridad reconocidas. Los ítems son trabajo planificado o en curso salvo que se indique lo contrario.\n\n**Primary CTA:** Reservar una consulta  \n**Secondary CTA:** Contáctanos → `/contact/`\n\n---\n\n## Plan de seguridad y cumplimiento\n\n**Eyebrow:** Plan / En curso  \n**Description:** Estos ítems reflejan trabajo planificado o en curso—no afirmaciones de certificación completada salvo obtención formal.\n\n### Roadmap items\n\n- Preparación SOC 2 Tipo I\n- Preparación futura SOC 2 Tipo II\n- Alineación ISO/IEC 27001\n- Preparación de acuerdo de tratamiento de datos\n- Política de Privacidad and Términos de Servicio\n- Procedimientos internos de manejo de datos\n- Política de uso responsable de IA\n- Proceso de revisión de seguridad de proveedores\n\n### Disclaimer\n\nCertifications listed here are roadmap items only. DBX Soluciones does not claim completed certification unless formally obtained and published.\n"};
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
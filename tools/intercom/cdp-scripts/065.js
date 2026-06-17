(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/es/10-legal-data-handling.md","category":"site","locale":"es","title":"[ES] Site — Aviso de Manejo de Datos","description":"site / es / 10-legal-data-handling","content":"# Aviso de Manejo de Datos\n\n## SEO\n\n- **Title:** DBX Soluciones | Aviso de Manejo de Datos\n- **Description:** How DBX Soluciones approaches customer and business data in AI implementations, integrations, and ongoing operations.\n\n## Hero\n\n**Eyebrow:** Manejo de datos  \n**Headline:** Aviso de Manejo de Datos  \n**Body:** DBX designs customer flows around approved business information, controlled access, and clear limits on what systems process and store. For website visitor data, see our Política de Privacidad.\n\n**Primary CTA:** Reservar una consulta  \n**Secondary CTA:** Contáctanos → `/contact/`\n\n---\n\n## Nuestro enfoque\n\nDBX Soluciones builds data handling practices for client implementations—approved content sources, controlled access, and secure integration planning. This notice covers project work, not website privacy (see Política de Privacidad).\n\n---\n\n## Qué priorizamos\n\n1. Usar contenido aprobado del negocio como fuente para respuestas al cliente\n2. Limitar el acceso a sistemas y datos necesarios para cada flujo con el cliente\n3. Diseñar integraciones para que el contexto útil llegue a tu CRM o equipo—no exposición abierta de datos\n4. Documentar qué se procesa, almacena y conserva según el alcance del proyecto\n5. Alinear con tu política de privacidad, términos SMS y requisitos del sector cuando aplique\n"};
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
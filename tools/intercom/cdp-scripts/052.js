(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/en/10-legal-data-handling.md","category":"site","locale":"en","title":"[EN] Site — Data Handling Notice","description":"site / en / 10-legal-data-handling","content":"# Data Handling Notice\n\n## SEO\n\n- **Title:** DBX Solutions | Data Handling Notice\n- **Description:** How DBX Solutions approaches customer and business data in AI implementations, integrations, and ongoing operations.\n\n## Hero\n\n**Eyebrow:** Data handling  \n**Headline:** Data Handling Notice  \n**Body:** DBX designs customer flows around approved business information, controlled access, and clear limits on what systems process and store. For website visitor data, see our Privacy Policy.\n\n**Primary CTA:** Book a Consultation  \n**Secondary CTA:** Contact Us → `/contact/`\n\n---\n\n## Our approach\n\nDBX Solutions builds data handling practices for client implementations—approved content sources, controlled access, and secure integration planning. This notice covers project work, not website privacy (see Privacy Policy).\n\n---\n\n## What we prioritize\n\n1. Using approved business content as the source for customer-facing answers\n2. Limiting access to systems and data required for each customer flow\n3. Designing integrations so useful context reaches your CRM or team—not open-ended data exposure\n4. Documenting what is processed, stored, and retained per project scope\n5. Aligning with your privacy policy, SMS terms, and industry requirements where applicable\n"};
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
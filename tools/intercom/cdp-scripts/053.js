(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/en/11-legal-responsible-ai.md","category":"site","locale":"en","title":"[EN] Site — Responsible AI Policy","description":"site / en / 11-legal-responsible-ai","content":"# Responsible AI Policy\n\n## SEO\n\n- **Title:** DBX Solutions | Responsible AI Policy\n- **Description:** How DBX Solutions applies human oversight, escalation paths, and approved business information in customer-facing AI.\n\n## Hero\n\n**Eyebrow:** Responsible AI  \n**Headline:** Responsible AI Policy  \n**Body:** DBX implements customer-facing AI with clear escalation paths, approved business information, and human review—not unconstrained automation.\n\n**Primary CTA:** Book a Consultation  \n**Secondary CTA:** Contact Us → `/contact/`\n\n---\n\n## Working principles\n\n1. Accuracy and clarity over speed alone\n2. Human escalation for sensitive, uncertain, or high-stakes requests\n3. Clear limits on what AI can answer or act on\n4. Transparent use of approved business information\n5. Continuous improvement based on real customer interactions\n\n---\n\n## Regulated industries\n\nFor healthcare, financial services, legal, insurance, and other regulated contexts, AI supports communication and workflow efficiency. It does not replace professional advice, compliance review, clinical judgment, legal judgment, or required human oversight.\n"};
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
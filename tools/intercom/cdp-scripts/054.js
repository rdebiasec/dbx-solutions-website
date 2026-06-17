(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/en/12-legal-security-roadmap.md","category":"site","locale":"en","title":"[EN] Site — Security Roadmap","description":"site / en / 12-legal-security-roadmap","content":"# Security Roadmap\n\n## SEO\n\n- **Title:** DBX Solutions | Security Roadmap\n- **Description:** DBX Solutions security and compliance roadmap—presented as readiness work, not completed certifications unless formally obtained.\n\n## Hero\n\n**Eyebrow:** Security roadmap  \n**Headline:** Security Roadmap  \n**Body:** DBX aligns operations with recognized security practices. Items below are roadmap or readiness work unless explicitly marked complete. We document planned vs. completed work so you know what is in progress.\n\n**Primary CTA:** Book a Consultation  \n**Secondary CTA:** Contact Us → `/contact/`\n\n---\n\n## Security and compliance roadmap\n\n**Eyebrow:** Roadmap / In progress  \n**Description:** These items reflect planned or in-progress alignment work—not claims of completed certification unless formally obtained.\n\n### Roadmap items\n\n- SOC 2 Type I readiness\n- SOC 2 Type II future readiness\n- ISO/IEC 27001 alignment\n- Data Processing Agreement readiness\n- Privacy Policy and Terms of Service\n- Internal data handling procedures\n- Responsible AI usage policy\n- Vendor security review process\n\n### Disclaimer\n\nCertifications listed here are roadmap items only. DBX Solutions does not claim completed certification unless formally obtained and published.\n"};
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
(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/kb/en/sections/10-legal-data-handling.md","category":"kb","locale":"en","title":"[EN] KB — Data Handling Notice","description":"kb / en / 10-legal-data-handling","content":"# Section Q&A — Data Handling Notice\n\n**KB ID:** `kb.data`  \n**Source:** `content/en/10-legal-data-handling.md`  \n**Site:** `/data-handling-notice/`\n\n---\n\n## Scope\n\n**Q: What is the Data Handling Notice for?**  \nA: How we approach customer and business data in **client projects**—implementations, integrations, and ongoing operations. Website visitor privacy is in the Privacy Policy.\n\n**Q: Is this the same as the Privacy Policy?**  \nA: Related but different. Privacy Policy = website visitors. Data Handling Notice = how we design data practices in projects we build for clients.\n\n---\n\n## Our approach\n\n**Q: How do you handle data in client work?**  \nA: We use approved business content as the source for answers, limit access to what each flow needs, design integrations so useful context reaches your team—not open-ended exposure, document what is processed per project, and align with your policies and industry rules where applicable.\n\n**Q: Do you use random internet data for customer answers?**  \nA: No—customer-facing answers come from approved business information you control.\n\n**Q: Who can access data in a project?**  \nA: Only what is required for each customer flow—we design with controlled access in mind.\n\n---\n\n## For prospects\n\n**Q: Will you process my customers' data if we hire you?**  \nA: Scope is defined per project. We document what is processed, stored, and retained for that engagement.\n\n**Q: Can you align with our privacy policy?**  \nA: Yes—we aim to align with your privacy policy, SMS terms, and industry requirements where applicable.\n"};
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
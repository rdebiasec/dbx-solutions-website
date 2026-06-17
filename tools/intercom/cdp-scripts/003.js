(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/kb/en/sections/03-services.md","category":"kb","locale":"en","title":"[EN] KB — Services","description":"kb / en / 03-services","content":"# Section Q&A — Services\n\n**KB ID:** `kb.services`  \n**Source:** `content/en/03-services.md`  \n**Site:** `/services/`\n\n---\n\n## Page hero\n\n**Q: What is the Services page about?**  \nA: How we make WhatsApp and customer help practical—from chat replies to syncing with your tools and supporting you after launch.\n\n**Q: How is Services different from Solutions?**  \nA: Solutions describes *what* we help with; Services describes *how we implement* it around how your team already works.\n\n---\n\n## Customer journey (visual flow)\n\n**Q: What is the journey you show on the Services page?**  \nA: They write you → DBX replies → You get the details → Your tools update → Your team closes.\n\n---\n\n## All six services (full detail)\n\n**Q: List all services on the Services page.**  \nA: (1) Reply on WhatsApp and chat, (2) Sort leads before follow-up, (3) Handle repeat questions, (4) Update CRM without retyping, (5) Know where to start with AI, (6) Keep improving it with you.\n\n**Q: Which services have a \"Start here\" badge?**  \nA: WhatsApp/chat replies and lead sorting.\n\n**Q: What does the ongoing service (\"We run it with you\") include?**  \nA: After launch we review real conversations and adjust so it stays useful—not a one-time setup that goes stale.\n\n**Q: Do most clients buy all six at once?**  \nA: Most teams start with one channel or one problem, not a big project.\n\n---\n\n## Page CTA\n\n**Q: I want a clear starting point—what do you recommend?**  \nA: Book a consultation. We map the first conversation or follow-up to improve on your channels.\n"};
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
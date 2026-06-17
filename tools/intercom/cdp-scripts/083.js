(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/faqs/README.md","category":"index","locale":"en","title":"[EN] Index — Customer FAQs — Index","description":"index / en / README","content":"# Customer FAQs — Index\n\nPlain-language answers grouped **by customer topic** (not by website section).\n\nFor **section-aligned** Q&A in EN / ES / PT, use the [Knowledge Base](../kb/KB-MAP.md).\n\n| Type | Path | Use when… |\n|------|------|-----------|\n| Topic FAQs | `content/faqs/` | Customer asks a general question |\n| Section KB | `content/kb/sections/` | You know which page/section they are on |\n| KB map | `content/kb/KB-MAP.md` | Routing / chatbot / support workflow |\n\n| Language | File |\n|----------|------|\n| English | [en-customer-faqs.md](./en-customer-faqs.md) |\n| Español | [es-customer-faqs.md](./es-customer-faqs.md) |\n| Português | [pt-customer-faqs.md](./pt-customer-faqs.md) |\n\n## Source sections\n\nEach FAQ group maps to exported content:\n\n| FAQ section | Content source |\n|-------------|----------------|\n| What DBX does | `01-home`, `05-about` |\n| WhatsApp & channels | `01-home`, `02-solutions` |\n| Services & daily help | `03-services`, `02-solutions` |\n| Your team & control | `01-home`, `11-legal-responsible-ai` |\n| Tools & setup | `01-home`, `03-services` |\n| Getting started | `01-home` (process), `06-contact` |\n| Who it's for | `04-industries` |\n| After launch | `01-home` (ongoing support) |\n| Trust & safety | `07–12` legal pages |\n| Working with DBX | `06-contact`, `05-about` |\n"};
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
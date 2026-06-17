(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/kb/en/sections/05-about.md","category":"kb","locale":"en","title":"[EN] KB — About","description":"kb / en / 05-about","content":"# Section Q&A — About\n\n**KB ID:** `kb.about`  \n**Source:** `content/en/05-about.md`  \n**Site:** `/about/`\n\n---\n\n## Page hero\n\n**Q: What is DBX Solutions in one sentence?**  \nA: We help growing businesses turn AI into better customer experiences in a practical, human-centered way—with WhatsApp and customer channels at the center.\n\n---\n\n## Mission\n\n**Q: What is your mission?**  \nA: Make practical customer communication help accessible for growing businesses—find where faster replies and cleaner follow-up help most, then build around your tools and team capacity.\n\n---\n\n## Approach\n\n**Q: How do you approach projects?**  \nA: Business problem first, technology second. We learn how customers reach you, what your team repeats daily, and what outcomes matter—then build something clear that improves over time.\n\n---\n\n## Values (five)\n\n**Q: What are DBX values?**  \nA: (1) Keep it practical, (2) People stay in the loop, (3) Built around how you work, (4) Tied to a real goal, (5) Improves after launch.\n\n**Q: What does \"people stay in the loop\" mean?**  \nA: AI should support customers and your team—not create confusion or replace judgment.\n\n**Q: Do you promise measurable outcomes?**  \nA: Yes—every implementation should connect to something you can notice: faster replies, cleaner follow-up, or less repeat work.\n\n---\n\n## Page CTA\n\n**Q: Is the About consultation high pressure?**  \nA: No—we describe it as a focused conversation about what would help your team most, with no pressure.\n"};
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
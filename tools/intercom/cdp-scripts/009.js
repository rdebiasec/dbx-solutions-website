(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/kb/en/sections/09-legal-sms.md","category":"kb","locale":"en","title":"[EN] KB — SMS Terms","description":"kb / en / 09-legal-sms","content":"# Section Q&A — SMS Terms\n\n**KB ID:** `kb.sms`  \n**Source:** `content/en/09-legal-sms.md`  \n**Site:** `/sms-terms/`\n\n---\n\n## Program\n\n**Q: What SMS messages might I receive from DBX?**  \nA: Automated texts related to your business interaction—appointment reminders, consultation coordination, support, or service updates.\n\n**Q: Do you send spam or buy phone lists?**  \nA: No unsolicited messages and no purchased or rented contact lists.\n\n---\n\n## Opt-in & opt-out\n\n**Q: How do I agree to receive texts?**  \nA: Check the SMS consent box on our form (or provide your number and affirm consent where required). Consent is not required to purchase services.\n\n**Q: How do I stop texts?**  \nA: Reply **STOP** to any message. You may get one final confirmation.\n\n**Q: How do I get help with SMS?**  \nA: Reply **HELP** or contact contact@dbx-solutions.com / +1 (321) 287-4509.\n\n---\n\n## Costs & delivery\n\n**Q: Are text messages free?**  \nA: Message and data rates from your carrier may apply. DBX does not charge those fees.\n\n**Q: What if a text does not arrive?**  \nA: Delivery depends on carriers and third-party providers. DBX is not responsible for carrier delays or failures.\n\n---\n\n## Privacy\n\n**Q: Do you share my mobile number for marketing?**  \nA: No—we do not share mobile information with third parties or affiliates for their own marketing.\n\n**Q: Where is SMS data handled?**  \nA: Per our Privacy Policy at dbx-solutions.com/privacy-policy/\n"};
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
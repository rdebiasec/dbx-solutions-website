(() => {
  const data = {"path":"/Users/ricardodebiase/Documents/dbx-solutions-website/content/kb/pt/sections/05-about.md","category":"kb","locale":"pt","title":"[PT] KB — Sobre","description":"kb / pt / 05-about","content":"# Perguntas por seção — Sobre\n\n**KB ID:** `kb.about`  \n**Source:** `content/pt/05-about.md`  \n**Site:** `/about/`\n\n---\n\n## Hero da página\n\n**P: O que é a DBX Solutions em uma frase?**  \n**R:** Ajudamos empresas em crescimento a transformar IA em experiências melhores para o cliente de forma prática e humana, com WhatsApp e canais de atendimento no centro.\n\n---\n\n## Missão\n\n**P: Qual é a missão de vocês?**  \n**R:** Tornar o apoio prático na comunicação com clientes acessível para empresas em crescimento — identificar onde respostas rápidas e follow-up organizado geram mais valor, e construir isso em cima das suas ferramentas e da capacidade do seu time.\n\n---\n\n## Abordagem\n\n**P: Como vocês conduzem os projetos?**  \n**R:** Primeiro o problema de negócio, depois a tecnologia. Entendemos como os clientes chegam até você, o que seu time repete no dia a dia e quais resultados importam — então criamos algo claro e que melhora ao longo do tempo.\n\n---\n\n## Valores (cinco)\n\n**P: Quais são os valores da DBX?**  \n**R:** (1) Manter tudo prático, (2) Pessoas no controle, (3) Construído no seu jeito de trabalhar, (4) Ligado a objetivo real, (5) Melhoria após o lançamento.\n\n**P: O que significa \"pessoas no controle\"?**  \n**R:** A IA deve apoiar clientes e equipe — não gerar confusão nem substituir julgamento humano.\n\n**P: Vocês prometem resultados mensuráveis?**  \n**R:** Sim — toda implementação deve se conectar a algo que você percebe: respostas mais rápidas, follow-up mais limpo ou menos trabalho repetitivo.\n\n---\n\n## CTA da página\n\n**P: A consulta da página Sobre é de alta pressão?**  \n**R:** Não — apresentamos como uma conversa objetiva para entender o que mais ajudaria seu time, sem pressão.\n"};
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
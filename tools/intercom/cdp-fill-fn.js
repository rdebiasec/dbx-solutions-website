window.__intercomFill = function (data) {
  const title = document.querySelector('textarea[placeholder="Untitled public article"]');
  const desc = document.querySelector('textarea[placeholder="Describe your article to help it get found"]');
  const body = document.querySelector('[role="textbox"]');
  if (!title || !body) return { ok: false, err: 'missing fields' };
  title.value = data.title;
  title.dispatchEvent(new Event('input', { bubbles: true }));
  title.dispatchEvent(new Event('change', { bubbles: true }));
  if (desc) {
    desc.value = data.description;
    desc.dispatchEvent(new Event('input', { bubbles: true }));
  }
  body.focus();
  body.innerHTML = '';
  for (const line of data.content.split('\n')) {
    const p = document.createElement('p');
    p.textContent = line || ' ';
    body.appendChild(p);
  }
  body.dispatchEvent(new Event('input', { bubbles: true }));
  const pub = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Publish');
  return { ok: true, title: title.value, bodyLen: body.innerText.length, publishDisabled: pub?.disabled };
};

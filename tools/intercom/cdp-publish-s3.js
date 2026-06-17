(async () => {
  await new Promise((r) => setTimeout(r, 550));
  const confirm = [...document.querySelectorAll('button')].filter(
    (b) => b.textContent.trim() === 'Publish' && !b.disabled,
  );
  const pubBtn = confirm[confirm.length - 1];
  if (!pubBtn) return { ok: false, step: 3, err: 'no confirm publish' };
  pubBtn.click();
  return { ok: true, step: 3 };
})()

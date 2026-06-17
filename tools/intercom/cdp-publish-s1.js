(() => {
  const btn = [...document.querySelectorAll('button')].find(
    (b) => b.textContent.trim() === 'Publish' && !b.disabled,
  );
  if (!btn) return { ok: false, step: 1, err: 'no enabled Publish' };
  btn.click();
  return { ok: true, step: 1 };
})()

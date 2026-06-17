(async () => {
  const idx = INDEX_PLACEHOLDER;
  const r = await fetch('http://127.0.0.1:8765/' + idx);
  if (!r.ok) return { ok: false, err: 'fetch ' + r.status, idx };
  const data = await r.json();
  if (typeof window.__intercomFill !== 'function') return { ok: false, err: 'no fill fn', idx };
  const fill = window.__intercomFill(data);
  const btn = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Publish');
  if (!btn) return { ...fill, idx, publish: { ok: false, err: 'no btn' } };
  if (btn.disabled) return { ...fill, idx, publish: { ok: false, err: 'disabled' } };
  btn.click();
  return { ...fill, idx, publish: { ok: true } };
})()

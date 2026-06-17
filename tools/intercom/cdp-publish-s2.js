(async () => {
  await new Promise((r) => setTimeout(r, 800));
  const clickBtn = (text, partial = false) => {
    const btn = [...document.querySelectorAll('button, [role="button"], a')].find((b) => {
      const t = (b.textContent || '').trim();
      return partial ? t.includes(text) : t === text;
    });
    if (!btn || btn.disabled) return { ok: false, err: `no btn: ${text}` };
    btn.click();
    return { ok: true, text };
  };
  const el = [...document.querySelectorAll('[role="radio"], label, div, span')].find((e) =>
    /unlisted public article/i.test(e.textContent || ''),
  );
  if (!el) return { ok: false, step: 2, err: 'no radio' };
  (el.closest('label') || el).click();
  const waitForNext = async () => {
    const deadline = Date.now() + 2500;
    while (Date.now() < deadline) {
      const btn = [...document.querySelectorAll('button, [role="button"], a')].find((b) => {
        const t = (b.textContent || '').trim();
        return t === 'Next' && !b.disabled;
      });
      if (btn) return btn;
      await new Promise((r) => setTimeout(r, 200));
    }
    return null;
  };
  await new Promise((r) => setTimeout(r, 350));
  const nextBtn = await waitForNext();
  if (!nextBtn) return { ok: false, step: 2, err: 'Next not enabled' };
  nextBtn.click();
  return { ok: true, text: 'Next' };
})()

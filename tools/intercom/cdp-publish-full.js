(async () => {
  const clickBtn = (text, partial = false) => {
    const btn = [...document.querySelectorAll('button, [role="button"], a')].find((b) => {
      const t = (b.textContent || '').trim();
      return partial ? t.includes(text) : t === text;
    });
    if (!btn || btn.disabled) return { ok: false, err: `no btn: ${text}` };
    btn.click();
    return { ok: true, text };
  };

  const clickRadio = (pattern) => {
    const el = [...document.querySelectorAll('[role="radio"], label, div, span')].find((e) =>
      pattern.test(e.textContent || '')
    );
    if (!el) return { ok: false, err: `no radio: ${pattern}` };
    (el.closest('label') || el).click();
    return { ok: true };
  };

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const step1Btn = [...document.querySelectorAll('button')].find(
    (b) => b.textContent.trim() === 'Publish' && !b.disabled
  );
  if (!step1Btn) return { ok: false, step: 1, err: 'no enabled Publish' };
  step1Btn.click();

  await wait(700);
  clickRadio(/unlisted public article/i);
  await wait(400);
  clickBtn('Next');
  await wait(600);
  const confirm = [...document.querySelectorAll('button')].filter(
    (b) => b.textContent.trim() === 'Publish' && !b.disabled
  );
  const pubBtn = confirm[confirm.length - 1];
  if (pubBtn) pubBtn.click();
  else return { ok: false, step: 3, err: 'no confirm publish' };

  await wait(2500);
  const maybeLater = [...document.querySelectorAll('button, a')].find((b) =>
    /maybe later/i.test((b.textContent || '').trim())
  );
  if (maybeLater) maybeLater.click();

  return { ok: true, step: 'done' };
})()

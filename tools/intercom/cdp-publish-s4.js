(async () => {
  await new Promise((r) => setTimeout(r, 2200));
  const maybeLater = [...document.querySelectorAll('button, a')].find((b) =>
    /maybe later/i.test((b.textContent || '').trim()),
  );
  if (maybeLater) maybeLater.click();
  return { ok: true, step: 'done' };
})()

#!/usr/bin/env node
/** CDP cleanup: delete Untitled drafts + duplicate [EN] KB — Home (keep longest title). */
export const cleanupExpr = `(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const clickBtn = (text, partial = false) => {
    const btn = [...document.querySelectorAll('button,[role="button"],a')].find((b) => {
      const t = (b.textContent || '').trim();
      return partial ? t.includes(text) : t === text;
    });
    if (!btn) return { ok: false, err: 'no btn: ' + text };
    btn.click();
    return { ok: true };
  };

  const rows = [...document.querySelectorAll('[data-testid],tr,li,div')].filter((el) => {
    const t = (el.textContent || '').trim();
    return t.includes('Untitled public article') || t.includes('[EN] KB — Home');
  });

  const deleted = { untitled: 0, homeDupes: 0 };
  const errors = [];

  const homeArticles = [];
  for (const el of [...document.querySelectorAll('a,button,div,span')]) {
    const t = (el.textContent || '').trim();
    if (t.startsWith('[EN] KB — Home')) {
      homeArticles.push({ el, t, len: t.length });
    }
  }
  homeArticles.sort((a, b) => b.len - a.len);
  const keepHome = homeArticles[0]?.t || null;
  const dupeHomes = homeArticles.slice(1);

  async function openRowMenu(textMatch) {
    const row = [...document.querySelectorAll('a,div,li')].find((el) =>
      (el.textContent || '').includes(textMatch)
    );
    if (!row) return { ok: false, err: 'no row' };
    row.click();
    await wait(400);
    const more = [...document.querySelectorAll('button')].find((b) =>
      /more|⋯|options/i.test(b.getAttribute('aria-label') || b.textContent || '')
    );
    if (more) more.click();
    await wait(300);
    return { ok: true };
  }

  for (let i = 0; i < 20; i++) {
    const untitled = [...document.querySelectorAll('a,div,span')].find((el) =>
      (el.textContent || '').trim() === 'Untitled public article'
    );
    if (!untitled) break;
    untitled.click();
    await wait(500);
    const del = clickBtn('Delete', true);
    if (!del.ok) {
      errors.push({ type: 'untitled', err: del.err });
      break;
    }
    await wait(400);
    clickBtn('Delete', false) || clickBtn('Confirm', true);
    await wait(800);
    deleted.untitled++;
    if (location.href.includes('content?')) {
      await wait(500);
    }
  }

  for (const dupe of dupeHomes) {
    try {
      dupe.el.click();
      await wait(500);
      clickBtn('Delete', true);
      await wait(400);
      clickBtn('Delete', false) || clickBtn('Confirm', true);
      await wait(800);
      deleted.homeDupes++;
    } catch (e) {
      errors.push({ type: 'home', title: dupe.t, err: String(e) });
    }
  }

  return {
    ok: true,
    deleted,
    keepHome,
    dupeHomeCount: dupeHomes.length,
    errors,
    url: location.href,
  };
})()`;

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(cleanupExpr);
}

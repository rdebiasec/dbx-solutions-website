#!/usr/bin/env node
/** Open Intercom public article editor from content list. */
const expr = `(() => {
  const h = [...document.querySelectorAll('h4')].find((e) => e.textContent.trim() === 'Public article');
  if (h) {
    (h.closest('a,button,[role=button]') || h.parentElement).click();
    return { ok: true, clicked: true };
  }
  const tb = document.querySelector('[role="textbox"]');
  const title = document.querySelector('textarea[placeholder="Untitled public article"]');
  if (tb && title) return { ok: true, alreadyOpen: true };
  return { ok: false, err: 'no public article card' };
})()`;
console.log(
  JSON.stringify({
    method: 'Runtime.evaluate',
    params: { expression: expr, returnByValue: true },
    viewId: 'glass-browser-20e98077-6681-4fca-9c31-1f93b221354c',
  }),
);

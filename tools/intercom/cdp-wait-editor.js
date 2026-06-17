#!/usr/bin/env node
/** CDP wait-for-editor expression (no eval). */
process.stdout.write(`(async () => {
  await new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (document.querySelector('textarea[placeholder="Untitled public article"]')) resolve(true);
      else if (Date.now() - start > 20000) reject(new Error('timeout'));
      else setTimeout(check, 200);
    };
    check();
  });
  return { ok: true };
})()`);

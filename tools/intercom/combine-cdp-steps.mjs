#!/usr/bin/env node
/** Combine CDP steps from upload-steps-N.json into pre-fill and post-fill groups */
import fs from 'fs';
const n = Number(process.argv[2]);
const plan = JSON.parse(fs.readFileSync(`/tmp/upload-steps-${n}.json`, 'utf8'));
const cdps = plan.steps.filter((s) => s.action === 'cdp');
const fillIdx = plan.steps.findIndex((s) => s.action === 'fill_title');
const bodyIdx = plan.steps.findIndex((s) => s.action === 'cdp' && s.awaitPromise && plan.steps.indexOf(s) > fillIdx);
const pre = cdps.filter((s) => {
  const i = plan.steps.indexOf(s);
  return i < fillIdx || (i > fillIdx && i < bodyIdx);
});
const post = cdps.filter((s) => plan.steps.indexOf(s) > bodyIdx);
const bodyFill = bodyIdx >= 0 ? plan.steps[bodyIdx].expression : null;

const wrap = (exprs) =>
  `(async()=>{ const results=[]; ${exprs.map((e, i) => `try{results[${i}]=await (${e});}catch(err){return {ok:false,step:${i},err:String(err)};}`).join('')} return {ok:true,results}; })()`;

const out = {
  index: n,
  title: plan.title,
  preTitle: wrap(pre.map((s) => s.expression)),
  bodyFill: bodyFill ? `(async()=>{ try{ return await (${bodyFill}); }catch(err){return {ok:false,err:String(err)};} })()` : null,
  postFill: wrap(post.map((s) => s.expression)),
};
fs.writeFileSync(`/tmp/combined-cdp-${n}.json`, JSON.stringify(out));
console.log(JSON.stringify({ index: n, preTitleLen: out.preTitle.length, bodyFill: !!out.bodyFill, postLen: out.postFill.length, title: out.title }));

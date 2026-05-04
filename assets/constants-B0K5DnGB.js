(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const d="February 23, 2026",a="DBX Solutions LLC",i="contact@dbx-solutions.com",u="+1 (321) 287-4509",l="https://dbx-solutions.com";function f(){return"/".endsWith("/")?"/":"//"}function p(r){const o=f(),s=r.startsWith("/")?r.slice(1):r;return`${o}${s}`}function m(){return`
    <p class="legal-contact-block">
      <strong>${a}</strong><br />
      <a href="${l}">${l}</a><br />
      <a href="mailto:${i}">${i}</a><br />
      <a href="tel:+13212874509">${u}</a>
    </p>
  `}export{i as C,d as L,a,p as h,m as l};

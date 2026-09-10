(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const i={en:"February 23, 2026",es:"23 de febrero de 2026",pt:"23 de fevereiro de 2026"};function p(r="en"){return i[r]??i.en}const u="DBX Solutions LLC",l="contact@dbx-solutions.com",f="+1 (321) 287-4509",a="https://dbx-solutions.com";function d(){return"/".endsWith("/")?"/":"//"}function b(r){const o=d(),n=r.startsWith("/")?r.slice(1):r;return`${o}${n}`}function m(){return`
    <p class="legal-contact-block">
      <strong>${u}</strong><br />
      <a href="${a}">${a}</a><br />
      <a href="mailto:${l}">${l}</a><br />
      <a href="tel:+13212874509">${f}</a>
    </p>
  `}export{l as C,u as a,p as g,b as h,m as l};

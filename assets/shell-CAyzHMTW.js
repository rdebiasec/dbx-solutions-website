import{h as r}from"./constants-JzEbBYJV.js";import{i as n}from"./intercom-DIzKIbEm.js";const o=[{hash:"solutions/",label:"Solutions"},{hash:"services/",label:"Services"},{hash:"industries/",label:"Industries"},{hash:"#process",label:"How we work"},{hash:"#trust",label:"Trust"},{hash:"contact/",label:"Contact"}];function l(){const a=r("");return`
    <header>
      <div class="header-top">
        <a href="${a}" class="logo"><img src="${r("logo.png")}" alt="DBX Solutions" width="120" height="40" /></a>
        <nav id="primary-nav" aria-label="Primary">
          ${o.map(e=>`<a href="${e.hash.startsWith("#")?`${a}${e.hash}`:r(e.hash)}">${e.label}</a>`).join("")}
        </nav>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
          <span class="sr-only">Toggle navigation</span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
        </button>
      </div>
    </header>
  `}function c(a){const e=r("privacy-policy/"),t=r("terms-of-service/"),s=r("sms-terms/");return`
    <footer class="legal-doc-footer">
      <nav class="footer-legal" aria-label="Legal">
        <a href="${e}" ${a==="privacy"?'aria-current="page"':""}>Privacy Policy</a>
        <a href="${t}" ${a==="terms"?'aria-current="page"':""}>Terms of Service</a>
        <a href="${s}" ${a==="sms"?'aria-current="page"':""}>SMS Terms</a>
      </nav>
      <p class="legal-back-home"><a href="${r("")}">← Back to home</a></p>
    </footer>
  `}function i(){const a=document.querySelector(".nav-toggle"),e=document.querySelector("header nav"),t=()=>{document.body.classList.remove("nav-open"),a?.setAttribute("aria-expanded","false")};a?.addEventListener("click",()=>{const s=document.body.classList.toggle("nav-open");a.setAttribute("aria-expanded",String(s))}),e?.querySelectorAll("a").forEach(s=>{s.addEventListener("click",()=>{window.matchMedia("(max-width: 900px)").matches&&t()})})}function g(a){const e=document.getElementById("legal-root");e&&(e.innerHTML=`
    <div class="wrapper legal-doc">
      ${l()}
      <main class="legal-main">
        <article class="legal-page">
          ${a.innerArticleHtml}
        </article>
        ${c(a.activePage)}
      </main>
    </div>
  `,i(),n())}export{g as m};

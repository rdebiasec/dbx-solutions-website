import{h as r}from"./constants-DiCqhfnd.js";const s=[{hash:"#solutions",label:"Solutions"},{hash:"#services",label:"Services"},{hash:"#benefits",label:"Benefits"},{hash:"#process",label:"How we work"},{hash:"#trust",label:"Trust"},{hash:"#contact",label:"Contact"}];function o(){const a=r("");return`
    <header>
      <div class="header-top">
        <a href="${a}" class="logo"><img src="${r("logo.png")}" alt="DBX Solutions" width="120" height="40" /></a>
        <nav id="primary-nav" aria-label="Primary">
          ${s.map(e=>`<a href="${a}${e.hash}">${e.label}</a>`).join("")}
        </nav>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
          <span class="sr-only">Toggle navigation</span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
          <span class="nav-toggle-bar"></span>
        </button>
      </div>
    </header>
  `}function l(a){const e=r("privacy-policy/"),n=r("terms-of-service/"),t=r("sms-terms/");return`
    <footer class="legal-doc-footer">
      <nav class="footer-legal" aria-label="Legal">
        <a href="${e}" ${a==="privacy"?'aria-current="page"':""}>Privacy Policy</a>
        <a href="${n}" ${a==="terms"?'aria-current="page"':""}>Terms of Service</a>
        <a href="${t}" ${a==="sms"?'aria-current="page"':""}>SMS Terms</a>
      </nav>
      <p class="legal-back-home"><a href="${r("")}">← Back to home</a></p>
    </footer>
  `}function c(){const a=document.querySelector(".nav-toggle"),e=document.querySelector("header nav"),n=()=>{document.body.classList.remove("nav-open"),a?.setAttribute("aria-expanded","false")};a?.addEventListener("click",()=>{const t=document.body.classList.toggle("nav-open");a.setAttribute("aria-expanded",String(t))}),e?.querySelectorAll("a").forEach(t=>{t.addEventListener("click",()=>{window.matchMedia("(max-width: 900px)").matches&&n()})})}function g(a){const e=document.getElementById("legal-root");e&&(e.innerHTML=`
    <div class="wrapper legal-doc">
      ${o()}
      <main class="legal-main">
        <article class="legal-page">
          ${a.innerArticleHtml}
        </article>
        ${l(a.activePage)}
      </main>
    </div>
  `,c())}export{g as m};

document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
});

const targetDate = new Date("2026-10-15T09:00:00").getTime();
function updateCountdown() {
  const diff = Math.max(0, targetDate - Date.now());
  const s = Math.floor(diff/1000);
  const set = (id, value) => { const el=document.getElementById(id); if(el) el.textContent=String(value).padStart(2,"0"); };
  set("days", Math.floor(s/86400)); set("hours", Math.floor(s%86400/3600)); set("minutes", Math.floor(s%3600/60)); set("seconds", s%60);
}
setInterval(updateCountdown,1000); updateCountdown();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggle = document.querySelector("#theme-toggle");
  const saved = localStorage.getItem("theme") || "light";
  root.setAttribute("data-theme", saved);
  if (toggle) toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next); localStorage.setItem("theme", next);
  });
  const header = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 80);
    const top = document.querySelector("#back-to-top");
    if (top) top.classList.toggle("show", window.scrollY > 300);
  });
  const menu = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (menu && links) menu.addEventListener("click", () => links.classList.toggle("open"));
  const top = document.querySelector("#back-to-top");
  if (top) top.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el=entry.target, target=Number(el.dataset.target); let n=0;
    const timer=setInterval(()=>{ n += Math.ceil(target/40); if(n>=target){n=target;clearInterval(timer)} el.textContent=n.toLocaleString("fr-FR");},30);
    observer.unobserve(el);
  }), {threshold:.4});
  counters.forEach(el=>observer.observe(el));
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){entry.target.classList.add("visible"); reveal.unobserve(entry.target);}
  }), {threshold:.15});
  document.querySelectorAll(".reveal").forEach(el=>reveal.observe(el));
});

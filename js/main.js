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

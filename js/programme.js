document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const days = document.querySelectorAll(".day-content");
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active")); days.forEach(d => d.classList.remove("active"));
    tab.classList.add("active"); document.getElementById(tab.dataset.day).classList.add("active");
  }));
});

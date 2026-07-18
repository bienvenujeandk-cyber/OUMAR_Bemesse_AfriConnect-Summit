document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".speaker-card");
  filters.forEach(filter => filter.addEventListener("click", () => {
    filters.forEach(f => f.classList.remove("active")); filter.classList.add("active");
    const selected = filter.dataset.filter;
    cards.forEach(card => card.style.display = selected === "Tous" || card.dataset.category === selected ? "" : "none");
  }));
});

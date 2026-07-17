// ============================================================
//  Clientele Page — Industry Filter Logic
// ============================================================
(function () {
  "use strict";

  const tabs  = document.querySelectorAll(".clientele-tab-btn");
  const cards = document.querySelectorAll(".clientele-logo-card");

  if (!tabs.length || !cards.length) return;

  function showCard(card) {
    card.style.display   = "";
    card.style.opacity   = "0";
    card.style.transform = "scale(0.95)";
    requestAnimationFrame(() => {
      card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      card.style.opacity    = "1";
      card.style.transform  = "scale(1)";
    });
  }

  function hideCard(card) {
    card.style.transition = "none";
    card.style.opacity    = "0";
    card.style.transform  = "scale(0.95)";
    card.style.display    = "none";
  }

  function applyFilter(filter) {
    cards.forEach(card => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        showCard(card);
      } else {
        hideCard(card);
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      tabs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      applyFilter(this.getAttribute("data-filter"));
    });
  });

  applyFilter("all");
})();

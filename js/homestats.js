(function () {
  /* ==========================================================================
     Stats count-up animation. Numbers animate from 0 to their target value
     once the section scrolls into view (runs only once). The "PAN India"
     stat is plain text and is skipped automatically since it has no
     data-stat-target.
     ========================================================================== */

  const section = document.getElementById("stats");
  if (!section) return;

  const numberEls = Array.from(section.querySelectorAll("[data-stat-target]"));

  function formatNumber(value) {
    return Math.round(value).toLocaleString("en-IN");
  }

  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-stat-target"), 10);
    const suffix = el.getAttribute("data-stat-suffix") || "";
    if (Number.isNaN(target)) return;

    const duration = 1600; // ms
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo — fast start, gentle settle, feels premium rather than mechanical
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = target * eased;

      el.textContent = formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatNumber(target) + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  function runAllCounts() {
    numberEls.forEach((el) => animateCount(el));
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("is-in-view");
            runAllCounts();
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(section);
  } else {
    // Fallback for browsers without IntersectionObserver support.
    section.classList.add("is-in-view");
    numberEls.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-stat-target"), 10);
      const suffix = el.getAttribute("data-stat-suffix") || "";
      if (!Number.isNaN(target)) el.textContent = formatNumber(target) + suffix;
    });
  }
})();

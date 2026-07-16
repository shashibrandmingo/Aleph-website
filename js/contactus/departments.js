(function () {
  /* ==========================================================================
     Connect With The Right Department — scroll-triggered entrance.
     Cards and the banner already have a load-time fade-up animation via
     CSS; this adds a re-triggerable scroll reveal so the section animates
     in when it actually enters the viewport (not just on page load),
     consistent with the other sections on this site.
     ========================================================================== */

  const section = document.getElementById("departments");
  if (!section) return;

  const animatedEls = section.querySelectorAll(
    ".dept-header, .dept-card, .dept-banner",
  );

  if (!("IntersectionObserver" in window)) {
    // Fallback: nothing to do — the CSS load-time animation already
    // handles this fine on browsers without IntersectionObserver.
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  animatedEls.forEach((el) => {
    // Pause the CSS animation until the element is actually visible, then
    // let the existing @keyframes play once it scrolls into view.
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
})();

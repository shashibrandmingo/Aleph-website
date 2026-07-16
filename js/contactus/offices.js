(function () {


  const section = document.getElementById("offices");
  if (!section) return;

  const animatedEls = section.querySelectorAll(
    ".off-header, .off-card, .off-banner",
  );

  if (!("IntersectionObserver" in window)) return;

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
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });
})();

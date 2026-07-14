(function () {
  /* ==========================================================================
     Flip cards work via CSS :hover / :focus-within on desktop (mouse) out of
     the box. This script adds equivalent behavior for touch devices, where
     there's no real ":hover", plus wires up the back-arrow button so tapping
     it flips the card back to the front instead of navigating.
     ========================================================================== */

  const cards = document.querySelectorAll(".service-card");

  function isTouchDevice() {
    return window.matchMedia("(hover: none)").matches;
  }

  cards.forEach((card) => {
    const backBtn = card.querySelector(".service-back-btn");

    // Tap-to-flip on touch devices: first tap flips the card, a second tap
    // elsewhere (outside the card) flips it back. Desktop keeps the native
    // CSS hover behavior and ignores this entirely.
    card.addEventListener("click", (e) => {
      if (!isTouchDevice()) return;

      // If the tap landed on an actual link/button inside the card, let it
      // behave normally instead of hijacking the tap for flipping.
      const isInteractive = e.target.closest("a, button");
      if (isInteractive && !e.target.closest(".service-back-btn")) return;

      if (e.target.closest(".service-back-btn")) {
        e.preventDefault();
        card.classList.remove("is-flipped");
        return;
      }

      if (!card.classList.contains("is-flipped")) {
        e.preventDefault();
        // Close any other open card first so only one is flipped at a time.
        cards.forEach((c) => {
          if (c !== card) c.classList.remove("is-flipped");
        });
        card.classList.add("is-flipped");
      }
    });
  });

  // Tapping anywhere outside all cards closes any flipped card (touch only).
  document.addEventListener("click", (e) => {
    if (!isTouchDevice()) return;
    const tappedInsideCard = e.target.closest(".service-card");
    if (!tappedInsideCard) {
      cards.forEach((c) => c.classList.remove("is-flipped"));
    }
  });

  /* ---------- "View All Services" button ---------- */
  // Wire this up to wherever your full services page/section lives.
  // Right now it points at #all-services if that element exists on the
  // page, and otherwise just logs — replace the body of this handler with
  // your real navigation (e.g. window.location.href = "/services").
  const viewAllBtn = document.querySelector(".btn-view-all");
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
      const target = document.getElementById("all-services");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // TODO: replace with your actual destination, e.g.:
        // window.location.href = "/services";
        console.log(
          "View All Services clicked — set a real destination in services.js",
        );
      }
    });
  }
})();

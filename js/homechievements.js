/* ==========================================================================
   OUR ACHIEVEMENTS — SLIDER LOGIC
   Seamless infinite loop (forward AND backward) using head/tail clones,
   so the deck never "snaps back to slide 1" — it just keeps flowing,
   one card at a time, continuously. Autoplay + arrows + dots + swipe/drag,
   all in sync. Production-ready, no external dependencies.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     1) DATA — every certificate in /image/achievements.
     Update the `img` path/name here if a filename in your folder differs.
     --------------------------------------------------------------------- */
  const ACHIEVEMENTS = [
    {
      img: "image/achievements/All India Furnanace Association Certificate.jpeg", // TODO: confirm exact filename
      tag: "AIFA",
      title: "All India Furnace Association Certificate",
      desc: "Recognized member of the All India Furnace Association for manufacturing excellence.",
    },
    {
      img: "image/achievements/bis-registration-certificate.webp",
      tag: "BIS",
      title: "BIS Registration Certificate",
      desc: "Certified under the Bureau of Indian Standards for product quality compliance.",
    },
    {
      img: "image/achievements/bis-registration-certificate2.webp",
      tag: "BIS",
      title: "BIS Registration Certificate II",
      desc: "Additional BIS registration certifying compliance across product categories.",
    },
    {
      img: "image/achievements/bis-registration-certificate3.webp",
      tag: "BIS",
      title: "BIS Registration Certificate III",
      desc: "Extended BIS registration certificate for continued quality assurance.",
    },
    {
      img: "image/achievements/biscertificate.webp",
      tag: "BIS",
      title: "BIS Certification",
      desc: "Official Bureau of Indian Standards certification mark of quality.",
    },
    {
      img: "image/achievements/CII-membership-certificate.jpg",
      tag: "CII",
      title: "CII Membership Certificate",
      desc: "Member of the Confederation of Indian Industry for the financial year 2024-25.",
    },
    {
      img: "image/achievements/ciicertificate.webp",
      tag: "CII",
      title: "CII Certificate",
      desc: "Recognized membership certificate from the Confederation of Indian Industry.",
    },
    {
      img: "image/achievements/FICCI-certificate.jpg",
      tag: "FICCI",
      title: "FICCI Certificate",
      desc: "Registered member of the Federation of Indian Chambers of Commerce & Industry.",
    },
    {
      img: "image/achievements/fosg.webp",
      tag: "FOSG",
      title: "FOSG Membership",
      desc: "Federation of Safety Glass member, upholding industry safety standards.",
    },
    {
      img: "image/achievements/fosgcertificate.webp",
      tag: "FOSG",
      title: "FOSG Certificate",
      desc: "Certified member of the Federation of Safety Glass industry body.",
    },
    {
      img: "image/achievements/goverment-of-india.webp",
      tag: "GOI",
      title: "Government of India Recognition",
      desc: "Official recognition certificate issued by the Government of India.",
    },
    {
      img: "image/achievements/ifcomacertificate.webp",
      tag: "IFCOMA",
      title: "IFCOMA Certificate",
      desc: "Member of the Indian Float glass & Component Manufacturers Association.",
    },
    {
      img: "image/achievements/indian-standards-of-glass.webp",
      tag: "ISGMA",
      title: "Indian Standards of Glass",
      desc: "Certified compliance with Indian glass manufacturing standards.",
    },
    {
      img: "image/achievements/isdacertificate.webp",
      tag: "ISDA",
      title: "ISDA Certificate",
      desc: "Recognized member of the Indian Safety Door Association.",
    },
    {
      img: "image/achievements/ISO-9001-certification.webp",
      tag: "ISO",
      title: "ISO 9001 Certification",
      desc: "Certified for quality management systems under the ISO 9001 standard.",
    },
    {
      img: "image/achievements/rocertificate.webp",
      tag: "ROC",
      title: "Registrar of Companies Certificate",
      desc: "Official incorporation certificate issued by the Registrar of Companies.",
    },
  ];

  const AUTOPLAY_MS = 2800; // gap between each auto-advance
  const TRANSITION_MS = 650; // must match .achv-track transition duration in CSS

  /* ---------------------------------------------------------------------
     2) DOM refs
     --------------------------------------------------------------------- */
  const track = document.getElementById("achvTrack");
  const dotsWrap = document.getElementById("achvDots");
  const prevBtn = document.getElementById("achvPrev");
  const nextBtn = document.getElementById("achvNext");
  const sliderEl = document.getElementById("achvSlider");
  const viewport = sliderEl ? sliderEl.querySelector(".achv-viewport") : null;

  if (!track || !sliderEl || !viewport) return; // section not on this page

  /* ---------------------------------------------------------------------
     3) Responsive "per view" count — must match the CSS breakpoints
     in achievements.css (.achv-slide width rules).
     --------------------------------------------------------------------- */
  function getPerView() {
    const w = window.innerWidth;
    if (w <= 560) return 1;
    if (w <= 860) return 2;
    if (w <= 1180) return 3;
    return 4;
  }

  let perView = getPerView();
  const total = ACHIEVEMENTS.length;

  let currentIndex = 0; // index within the cloned track (set in build())
  let isAnimating = false;
  let autoplayTimer = null;
  let dots = [];

  function slideMarkup(item) {
    return (
      '<div class="achv-slide">' +
      '<div class="achv-card">' +
      '<div class="achv-card-image">' +
      '<img src="' +
      item.img +
      '" alt="' +
      item.title +
      '" loading="lazy" draggable="false">' +
      "</div>" +
      '<div class="achv-card-body">' +
      '<span class="achv-card-tag">' +
      item.tag +
      "</span>" +
      '<h3 class="achv-card-title">' +
      item.title +
      "</h3>" +
      '<div class="achv-card-divider"></div>' +
      '<p class="achv-card-desc">' +
      item.desc +
      "</p>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  /* ---------------------------------------------------------------------
     4) Build track: [tail-clones][real slides][head-clones]
     A full perView set of clones on each side guarantees the loop is
     seamless no matter how many cards are visible at once.
     --------------------------------------------------------------------- */
  function build() {
    perView = getPerView();

    const headClones = ACHIEVEMENTS.slice(0, perView); // clones of first N (appended at end)
    const tailClones = ACHIEVEMENTS.slice(-perView); // clones of last N (prepended at start)

    const html =
      tailClones.map(slideMarkup).join("") +
      ACHIEVEMENTS.map(slideMarkup).join("") +
      headClones.map(slideMarkup).join("");

    track.innerHTML = html;
    track.style.width = (100 / perView) * (total + perView * 2) + "%";

    const slides = track.querySelectorAll(".achv-slide");
    slides.forEach((s) => {
      s.style.width = 100 / (total + perView * 2) + "%";
    });

    currentIndex = perView; // first real slide
    jumpTo(currentIndex, false);
    buildDots();
  }

  /* ---------------------------------------------------------------------
     5) Position the track
     --------------------------------------------------------------------- */
  function setTransform(withTransition) {
    track.classList.toggle("no-transition", !withTransition);
    const slideWidthPct = 100 / (total + perView * 2);
    const offset = currentIndex * slideWidthPct;
    track.style.transform = "translateX(-" + offset + "%)";
  }

  function jumpTo(index, animate) {
    currentIndex = index;
    setTransform(animate);
    updateActiveDot();
  }

  /* ---------------------------------------------------------------------
     6) Dots — one per real slide, so the active dot always matches
     exactly which card is currently leading the viewport.
     --------------------------------------------------------------------- */
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    dots = [];
    for (let i = 0; i < total; i++) {
      const b = document.createElement("button");
      b.className = "achv-dot-btn";
      b.type = "button";
      b.setAttribute("aria-label", "Go to slide " + (i + 1));
      b.addEventListener("click", function () {
        goToRealIndex(i);
        restartAutoplay();
      });
      dotsWrap.appendChild(b);
      dots.push(b);
    }
    updateActiveDot();
  }

  function updateActiveDot() {
    if (!dots.length) return;
    const realIndex = (((currentIndex - perView) % total) + total) % total;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === realIndex));
  }

  function goToRealIndex(realIdx) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = perView + realIdx;
    setTransform(true);
  }

  /* ---------------------------------------------------------------------
     7) Next / Prev — always moves exactly ONE card, with seamless
     infinite wrap in both directions.
     --------------------------------------------------------------------- */
  function next() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex += 1;
    setTransform(true);
  }

  function prev() {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex -= 1;
    setTransform(true);
  }

  track.addEventListener("transitionend", function (e) {
    if (e.propertyName && e.propertyName !== "transform") return;
    isAnimating = false;

    const lastRealIndex = perView + total - 1;
    const firstCloneIndex = perView + total; // start of head clones

    if (currentIndex >= firstCloneIndex) {
      // Scrolled onto the appended head-clones -> silently rewind
      // to the matching real slide with no transition (invisible jump).
      const overshoot = currentIndex - firstCloneIndex;
      jumpTo(perView + overshoot, false);
    } else if (currentIndex < perView) {
      // Scrolled onto prepended tail-clones -> silently forward-wind.
      const under = perView - currentIndex;
      jumpTo(lastRealIndex - under + 1, false);
    }
    updateActiveDot();
  });

  /* ---------------------------------------------------------------------
     8) Autoplay — continuous forward loop, one card at a time,
     pauses cleanly on hover/focus/touch/drag and resumes after.
     --------------------------------------------------------------------- */
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, AUTOPLAY_MS);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
  function restartAutoplay() {
    startAutoplay();
  }

  sliderEl.addEventListener("mouseenter", stopAutoplay);
  sliderEl.addEventListener("mouseleave", startAutoplay);
  sliderEl.addEventListener("focusin", stopAutoplay);
  sliderEl.addEventListener("focusout", startAutoplay);

  /* ---------------------------------------------------------------------
     9) Arrow controls
     --------------------------------------------------------------------- */
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      next();
      restartAutoplay();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prev();
      restartAutoplay();
    });
  }

  /* ---------------------------------------------------------------------
     10) Unified pointer drag / touch swipe support
     Works smoothly for mouse-drag on desktop AND touch-swipe on mobile,
     with the track visually following the finger/cursor in real time
     (no transition while dragging), then snapping to the next/prev
     card with the normal smooth transition on release.
     --------------------------------------------------------------------- */
  let isDragging = false;
  let dragStartX = 0;
  let dragDeltaX = 0;
  let viewportWidth = 0;
  let baseOffsetPct = 0;

  function slideWidthPercent() {
    return 100 / (total + perView * 2);
  }

  function pointerDown(clientX) {
    if (isAnimating) return;
    isDragging = true;
    dragStartX = clientX;
    dragDeltaX = 0;
    viewportWidth = viewport.getBoundingClientRect().width || 1;
    baseOffsetPct = currentIndex * slideWidthPercent();
    track.classList.add("no-transition");
    stopAutoplay();
  }

  function pointerMove(clientX) {
    if (!isDragging) return;
    dragDeltaX = clientX - dragStartX;
    const deltaPct = (dragDeltaX / viewportWidth) * (100 / perView);
    track.style.transform = "translateX(-" + (baseOffsetPct - deltaPct) + "%)";
  }

  function pointerUp() {
    if (!isDragging) return;
    isDragging = false;

    const threshold = viewportWidth * 0.12; // ~12% of viewport width to trigger a swipe
    track.classList.remove("no-transition");

    if (Math.abs(dragDeltaX) > threshold) {
      if (dragDeltaX < 0) next();
      else prev();
    } else {
      // Not enough movement — snap back to current slide smoothly.
      setTransform(true);
    }
    startAutoplay();
  }

  // Touch events (mobile)
  viewport.addEventListener(
    "touchstart",
    function (e) {
      pointerDown(e.touches[0].clientX);
    },
    { passive: true },
  );
  viewport.addEventListener(
    "touchmove",
    function (e) {
      pointerMove(e.touches[0].clientX);
    },
    { passive: true },
  );
  viewport.addEventListener("touchend", pointerUp);
  viewport.addEventListener("touchcancel", pointerUp);

  // Mouse events (desktop drag)
  viewport.addEventListener("mousedown", function (e) {
    e.preventDefault();
    pointerDown(e.clientX);
  });
  window.addEventListener("mousemove", function (e) {
    if (isDragging) pointerMove(e.clientX);
  });
  window.addEventListener("mouseup", function () {
    if (isDragging) pointerUp();
  });

  /* ---------------------------------------------------------------------
     11) Keyboard accessibility
     --------------------------------------------------------------------- */
  sliderEl.setAttribute("tabindex", "0");
  sliderEl.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      next();
      restartAutoplay();
    } else if (e.key === "ArrowLeft") {
      prev();
      restartAutoplay();
    }
  });

  /* ---------------------------------------------------------------------
     12) Resize handling — rebuild clone structure if perView changes
     --------------------------------------------------------------------- */
  let resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const newPerView = getPerView();
      if (newPerView !== perView) {
        build();
      }
    }, 150);
  });

  /* ---------------------------------------------------------------------
     13) Init
     --------------------------------------------------------------------- */
  build();
  startAutoplay();
})();

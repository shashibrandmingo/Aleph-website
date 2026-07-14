(function () {
  "use strict";

  const AUTOPLAY_MS = 5000;
  const DRAG_THRESHOLD_RATIO = 0.18; // fraction of slide width to trigger a slide change
  const TRANSITION_MS = 700; // must match the CSS transition duration used below

  /* -----------------------------------------------------------------
     1) DOM references
  ----------------------------------------------------------------- */
  const els = {
    trackWrap: document.getElementById("testimonialsTrackWrap"),
    track: document.getElementById("testimonialsTrack"),
    dotsEl: document.getElementById("testimonialsDots"),
  };

  const slideEls = Array.from(
    els.track.querySelectorAll(".testimonials-slide"),
  );
  const dotEls = Array.from(els.dotsEl.querySelectorAll(".testimonials-dot"));

  const REAL_COUNT = dotEls.length; // number of real (non-clone) slides
  // Slot 0 = clone-of-last, slot 1..REAL_COUNT = real slides,
  // slot REAL_COUNT+1 = clone-of-first.
  let currentSlot = 1;
  let autoplayTimer = null;

  /* -----------------------------------------------------------------
     2) State guards
     isAnimating prevents a new transition (autoplay, drag-release, or
     dot click) from starting while a previous one is still finishing.
     This is what eliminates the "fast flash / blank" bug: without it,
     an interrupted CSS transition can restart mid-flight and skip
     frames, which looked like a sudden speed-up followed by a blank
     gap.
  ----------------------------------------------------------------- */
  let isAnimating = false;
  let isDragging = false;

  /* -----------------------------------------------------------------
     3) Core: move the track to a given slot
  ----------------------------------------------------------------- */
  function realIndexForSlot(slot) {
    return (slot - 1 + REAL_COUNT) % REAL_COUNT;
  }

  function applyActiveStates(slot) {
    const realIndex = realIndexForSlot(slot);
    dotEls.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === realIndex);
    });
    slideEls.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === slot);
    });
  }

  function goToSlot(slot, animate) {
    currentSlot = slot;
    els.track.style.transition = animate
      ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`
      : "none";
    els.track.style.transform = `translateX(-${currentSlot * 100}%)`;
    applyActiveStates(currentSlot);

    if (animate) {
      isAnimating = true;
    }
  }

  // After a real (animated) transition lands on a clone slot, snap
  // instantly (no transition) to the matching real slot on the other
  // side. This is what makes last -> first feel like continuous
  // forward motion instead of a jump back.
  els.track.addEventListener("transitionend", (e) => {
    if (e.target !== els.track || e.propertyName !== "transform") return;

    isAnimating = false;

    if (currentSlot === REAL_COUNT + 1) {
      goToSlot(1, false); // clone-of-first -> real first
    } else if (currentSlot === 0) {
      goToSlot(REAL_COUNT, false); // clone-of-last -> real last
    }
  });

  function nextSlide() {
    if (isAnimating || isDragging) return;
    goToSlot(currentSlot + 1, true);
  }

  function prevSlide() {
    if (isAnimating || isDragging) return;
    goToSlot(currentSlot - 1, true);
  }

  /* -----------------------------------------------------------------
     4) Dots — click to jump straight to a given real slide
  ----------------------------------------------------------------- */
  dotEls.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      if (isAnimating || isDragging) return;
      goToSlot(i + 1, true);
      restartAutoplay();
    });
  });

  /* -----------------------------------------------------------------
     5) Autoplay
  ----------------------------------------------------------------- */
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  function restartAutoplay() {
    startAutoplay();
  }

  els.trackWrap.addEventListener("mouseenter", stopAutoplay);
  els.trackWrap.addEventListener("mouseleave", () => {
    if (!isDragging) startAutoplay();
  });

  /* -----------------------------------------------------------------
     6) Manual drag support — mouse (desktop) + touch (mobile/tablet).
     The track follows the pointer live, so content is always visible
     mid-drag. On release, it resolves to the nearest slot using the
     live drag position (not a stale index), which is what keeps
     boundary-crossing drags (last slide -> first slide) smooth.
  ----------------------------------------------------------------- */
  let dragStartX = 0;
  let dragDeltaX = 0;
  let trackWidthPx = 0;

  function currentBaseOffsetPx() {
    return currentSlot * trackWidthPx;
  }

  function dragStart(clientX) {
    // Never start a drag while a transition is still animating — wait
    // for it to settle first so the drag always begins from a stable,
    // correctly-measured position. This is the key fix for the
    // fast-flash/blank bug: a drag could previously interrupt an
    // in-flight transition and desync the track's actual rendered
    // position from what the code thought currentSlot was.
    if (isAnimating) return;

    isDragging = true;
    dragStartX = clientX;
    dragDeltaX = 0;
    trackWidthPx = els.trackWrap.getBoundingClientRect().width;
    els.trackWrap.classList.add("is-dragging");
    els.track.style.transition = "none";
    stopAutoplay();
  }

  function dragMove(clientX) {
    if (!isDragging) return;
    dragDeltaX = clientX - dragStartX;
    const offset = currentBaseOffsetPx() - dragDeltaX;
    els.track.style.transform = `translateX(${-offset}px)`;
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    els.trackWrap.classList.remove("is-dragging");

    const movedRatio = trackWidthPx ? dragDeltaX / trackWidthPx : 0;

    let targetSlot = currentSlot;
    if (movedRatio < -DRAG_THRESHOLD_RATIO) {
      targetSlot = currentSlot + 1;
    } else if (movedRatio > DRAG_THRESHOLD_RATIO) {
      targetSlot = currentSlot - 1;
    }

    // Animate from the live drag position to the resolved target slot.
    // goToSlot sets the transform in the same unit (percentage) each
    // time, so the browser always has a single, uninterrupted
    // transition to run — no competing/overlapping transitions, which
    // is what previously caused the sudden speed-up.
    goToSlot(targetSlot, true);

    startAutoplay();
  }

  // Mouse (desktop) drag
  els.trackWrap.addEventListener("mousedown", (e) => {
    e.preventDefault();
    dragStart(e.clientX);
  });
  window.addEventListener("mousemove", (e) => {
    if (isDragging) dragMove(e.clientX);
  });
  window.addEventListener("mouseup", dragEnd);
  window.addEventListener("blur", dragEnd);

  // Touch (mobile/tablet) drag
  els.trackWrap.addEventListener(
    "touchstart",
    (e) => dragStart(e.touches[0].clientX),
    { passive: true },
  );
  els.trackWrap.addEventListener(
    "touchmove",
    (e) => dragMove(e.touches[0].clientX),
    { passive: true },
  );
  els.trackWrap.addEventListener("touchend", dragEnd);
  els.trackWrap.addEventListener("touchcancel", dragEnd);

  // If the viewport resizes (e.g. rotating a device), re-snap cleanly
  // to the current slot instead of leaving a stale pixel transform.
  window.addEventListener("resize", () => {
    if (!isDragging && !isAnimating) goToSlot(currentSlot, false);
  });

  /* -----------------------------------------------------------------
     7) Init — start on the first real slide, no animation
  ----------------------------------------------------------------- */
  goToSlot(1, false);
  startAutoplay();
})();

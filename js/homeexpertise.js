(function () {
  const root = document.querySelector("[data-expertise-slider]");
  if (!root) return;

  const track = root.querySelector("[data-expertise-track]");
  const prevBtn = root.querySelector("[data-expertise-prev]");
  const nextBtn = root.querySelector("[data-expertise-next]");
  const dotsWrap = document.querySelector("[data-expertise-dots]");
  const originalItems = Array.from(track.children);
  const originalCount = originalItems.length;

  if (!originalCount) return;

  let itemsPerView = getItemsPerView();
  let cloneCount = itemsPerView; // clones needed on each side
  let currentIndex = 0; // index within the cloned track (starts after the leading clones)
  let isAnimating = false;
  let autoplayTimer = null;
  let isDragging = false;
  let dragStartX = 0;
  let dragDeltaX = 0;
  let trackStartTransform = 0;

  function getItemsPerView() {
    const w = window.innerWidth;
    if (w <= 560) return 1;
    if (w <= 900) return 2;
    if (w <= 1180) return 3;
    return 4;
  }

  /* ---------- Build the track: [clones of tail] + [real items] + [clones of head] ---------- */
  function buildTrack() {
    track.innerHTML = "";
    cloneCount = Math.min(itemsPerView, originalCount);

    const headClones = originalItems
      .slice(0, cloneCount)
      .map((el) => el.cloneNode(true));
    const tailClones = originalItems
      .slice(originalCount - cloneCount)
      .map((el) => el.cloneNode(true));

    tailClones.forEach((el) => {
      el.setAttribute("aria-hidden", "true");
      el.setAttribute("tabindex", "-1");
      track.appendChild(el);
    });
    originalItems.forEach((el) => track.appendChild(el));
    headClones.forEach((el) => {
      el.setAttribute("aria-hidden", "true");
      el.setAttribute("tabindex", "-1");
      track.appendChild(el);
    });

    currentIndex = cloneCount; // first real item now sits at this index
  }

  function getStep() {
    const firstCard = track.children[0];
    if (!firstCard) return 0;
    const itemRect = firstCard.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return itemRect.width + gap;
  }

  function setTransform(index, animate) {
    const offset = -(index * getStep());
    track.style.transition = animate
      ? "transform 0.55s cubic-bezier(0.65, 0, 0.35, 1)"
      : "none";
    track.style.transform = `translateX(${offset}px)`;
  }

  function realIndexFromTrackIndex(trackIndex) {
    // Maps a track-index (which includes leading clones) back to the
    // 0-based index within the *original* items, for dot syncing.
    const zeroBased = trackIndex - cloneCount;
    const mod = ((zeroBased % originalCount) + originalCount) % originalCount;
    return mod;
  }

  function goToTrackIndex(trackIndex, animate = true) {
    currentIndex = trackIndex;
    setTransform(currentIndex, animate);
    updateDots();
  }

  function next() {
    if (isAnimating) return;
    isAnimating = true;
    goToTrackIndex(currentIndex + 1, true);
  }

  function prev() {
    if (isAnimating) return;
    isAnimating = true;
    goToTrackIndex(currentIndex - 1, true);
  }

  // After each animated move, check whether we've slid onto a clone.
  // If so, silently snap to the matching real position with no transition
  // so the loop feels continuous instead of restarting.
  track.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    isAnimating = false;

    const lastRealTrackIndex = cloneCount + originalCount - 1;
    if (currentIndex > lastRealTrackIndex) {
      // Landed in the trailing (head) clone zone — snap back to the
      // matching real index near the start.
      const overshoot = currentIndex - lastRealTrackIndex;
      goToTrackIndex(cloneCount + overshoot - 1, false);
    } else if (currentIndex < cloneCount) {
      // Landed in the leading (tail) clone zone — snap forward to the
      // matching real index near the end.
      const undershoot = cloneCount - currentIndex;
      goToTrackIndex(lastRealTrackIndex - undershoot + 1, false);
    }
  });

  function goToRealIndex(realIndex) {
    if (isAnimating) return;
    isAnimating = true;
    goToTrackIndex(cloneCount + realIndex, true);
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    if (originalCount <= itemsPerView) {
      dotsWrap.style.display = "none";
      return;
    }
    dotsWrap.style.display = "flex";
    for (let i = 0; i < originalCount; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "expertise-dot";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => {
        goToRealIndex(i);
        restartAutoplay();
      });
      dotsWrap.appendChild(dot);
    }
    updateDots();
  }

  function updateDots() {
    if (!dotsWrap) return;
    const activeReal = realIndexFromTrackIndex(currentIndex);
    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.classList.toggle("is-active", i === activeReal);
    });
  }

  function startAutoplay() {
    stopAutoplay();
    if (originalCount <= itemsPerView) return;
    autoplayTimer = setInterval(next, 4200);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
  function restartAutoplay() {
    startAutoplay();
  }

  /* ---------- Manual prev/next controls ---------- */
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prev();
      restartAutoplay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      next();
      restartAutoplay();
    });
  }

  /* ---------- Drag / swipe support (mouse + touch) ---------- */
  function onDragStart(clientX) {
    if (isAnimating) return;
    isDragging = true;
    dragStartX = clientX;
    dragDeltaX = 0;
    stopAutoplay();
    track.classList.add("is-dragging");
    const style = getComputedStyle(track);
    const matrix = new DOMMatrixReadOnly(style.transform);
    trackStartTransform = matrix.m41 || 0;
  }
  function onDragMove(clientX) {
    if (!isDragging) return;
    dragDeltaX = clientX - dragStartX;
    track.style.transform = `translateX(${trackStartTransform + dragDeltaX}px)`;
  }
  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove("is-dragging");
    const step = getStep();
    const threshold = step * 0.2;
    if (dragDeltaX < -threshold) {
      next();
    } else if (dragDeltaX > threshold) {
      prev();
    } else {
      goToTrackIndex(currentIndex, true);
    }
    restartAutoplay();
  }

  track.addEventListener("mousedown", (e) => {
    e.preventDefault();
    onDragStart(e.clientX);
  });
  window.addEventListener("mousemove", (e) => onDragMove(e.clientX));
  window.addEventListener("mouseup", onDragEnd);

  track.addEventListener(
    "touchstart",
    (e) => onDragStart(e.touches[0].clientX),
    {
      passive: true,
    },
  );
  track.addEventListener("touchmove", (e) => onDragMove(e.touches[0].clientX), {
    passive: true,
  });
  track.addEventListener("touchend", onDragEnd);

  // Pause autoplay while the pointer is hovering the slider (desktop nicety)
  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", restartAutoplay);

  /* ---------- Responsive re-layout ---------- */
  function handleResize() {
    const newItemsPerView = getItemsPerView();
    if (newItemsPerView === itemsPerView) {
      // Item width still changed (viewport resized within the same
      // breakpoint) — just re-snap to the current real position.
      goToTrackIndex(currentIndex, false);
      return;
    }
    itemsPerView = newItemsPerView;
    const activeReal = realIndexFromTrackIndex(currentIndex);
    buildTrack();
    buildDots();
    goToTrackIndex(cloneCount + activeReal, false);
  }
  window.addEventListener("resize", handleResize);

  /* ---------- Scroll-triggered entrance animation ---------- */
  // Adds .is-in-view to the section once it scrolls into the viewport,
  // which the CSS uses to fade/slide the header and cards into place.
  const sectionEl = document.getElementById("expertise");
  if (sectionEl && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionEl.classList.add("is-in-view");
            observer.unobserve(sectionEl);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(sectionEl);
  } else if (sectionEl) {
    // Fallback for browsers without IntersectionObserver support.
    sectionEl.classList.add("is-in-view");
  }

  /* ---------- Init ---------- */
  buildTrack();
  buildDots();
  goToTrackIndex(cloneCount, false);
  startAutoplay();
})();

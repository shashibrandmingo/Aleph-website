(function () {
  function initSlider(root) {
    const track = root.querySelector("[data-ue-track]");
    const key = root.getAttribute("data-ue-slider");
    const dotsWrap = document.querySelector(`[data-ue-dots="${key}"]`);
    const prevBtn = root.querySelector(`[data-ue-prev="${key}"]`);
    const nextBtn = root.querySelector(`[data-ue-next="${key}"]`);
    const items = Array.from(track.children);

    if (!items.length) return;

    let itemsPerView = getItemsPerView();
    let currentIndex = 0;
    let maxIndex = Math.max(0, items.length - itemsPerView);
    let autoplayTimer = null;
    let isDragging = false;
    let dragStartX = 0;
    let dragDeltaX = 0;
    let trackStartTransform = 0;

    function getItemsPerView() {
      const w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 1180) return 2;
      return 3;
    }

    function getStep() {
      // Width of one item including the gap, measured live so it always
      // matches the current responsive layout.
      const itemRect = items[0].getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      return itemRect.width + gap;
    }

    function clampIndex(i) {
      return Math.max(0, Math.min(i, maxIndex));
    }

    function goTo(index, animate = true) {
      currentIndex = clampIndex(index);
      const offset = -(currentIndex * getStep());
      track.style.transition = animate
        ? "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)"
        : "none";
      track.style.transform = `translateX(${offset}px)`;
      updateDots();
      updateNavButtons();
    }

    function next() {
      goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    }

    function prev() {
      goTo(currentIndex <= 0 ? maxIndex : currentIndex - 1);
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      const dotCount = maxIndex + 1;
      if (dotCount <= 1) {
        dotsWrap.style.display = "none";
        return;
      }
      dotsWrap.style.display = "flex";
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "ue-dot";
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        dot.addEventListener("click", () => {
          goTo(i);
          restartAutoplay();
        });
        dotsWrap.appendChild(dot);
      }
      updateDots();
    }

    function updateDots() {
      if (!dotsWrap) return;
      Array.from(dotsWrap.children).forEach((dot, i) => {
        dot.classList.toggle("is-active", i === currentIndex);
      });
    }

    function updateNavButtons() {
      // With looping enabled (prev/next wrap around) the buttons stay
      // enabled whenever there's more than one slide to move to.
      const hasMultipleSlides = maxIndex > 0;
      if (prevBtn) prevBtn.disabled = !hasMultipleSlides;
      if (nextBtn) nextBtn.disabled = !hasMultipleSlides;
    }

    function startAutoplay() {
      stopAutoplay();
      if (maxIndex <= 0) return;
      autoplayTimer = setInterval(next, 4500);
    }
    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    function restartAutoplay() {
      startAutoplay();
    }

    /* ---------- Manual prev / next buttons ---------- */
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
        goTo(currentIndex + 1);
      } else if (dragDeltaX > threshold) {
        goTo(currentIndex - 1);
      } else {
        goTo(currentIndex);
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
      { passive: true },
    );
    track.addEventListener(
      "touchmove",
      (e) => onDragMove(e.touches[0].clientX),
      { passive: true },
    );
    track.addEventListener("touchend", onDragEnd);

    // Pause autoplay while the pointer is hovering the card (desktop nicety)
    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", restartAutoplay);

    /* ---------- Responsive re-layout ---------- */
    function handleResize() {
      const newItemsPerView = getItemsPerView();
      itemsPerView = newItemsPerView;
      maxIndex = Math.max(0, items.length - itemsPerView);
      buildDots();
      goTo(clampIndex(currentIndex), false);
    }
    window.addEventListener("resize", handleResize);

    /* ---------- Init ---------- */
    buildDots();
    updateNavButtons();
    goTo(0, false);
    startAutoplay();
  }

  document.querySelectorAll("[data-ue-slider]").forEach(initSlider);
})();

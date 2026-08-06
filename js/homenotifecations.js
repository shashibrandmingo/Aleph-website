(function () {
  function initSlider(root) {
    const track = root.querySelector("[data-ue-track]");
    const key = root.getAttribute("data-ue-slider");
    const dotsWrap = document.querySelector(`[data-ue-dots="${key}"]`);
    const prevBtn = root.querySelector(`[data-ue-prev="${key}"]`);
    const nextBtn = root.querySelector(`[data-ue-next="${key}"]`);
    
    // Save original items
    const originalItems = Array.from(track.children).filter(
      (el) => !el.classList.contains("ue-clone")
    );
    if (!originalItems.length) return;

    let itemsPerView = getItemsPerView();
    let userIndex = 0;
    let totalRealItems = originalItems.length;
    let maxUserIndex = Math.max(0, totalRealItems - itemsPerView);
    let autoplayTimer = null;
    let isDragging = false;
    let dragStartX = 0;
    let dragDeltaX = 0;
    let trackStartTransform = 0;
    let isTransitioning = false;

    function getItemsPerView() {
      const w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 1180) return 2;
      return 3;
    }

    function setupClones() {
      // Remove existing clones
      Array.from(track.querySelectorAll(".ue-clone")).forEach((el) => el.remove());

      itemsPerView = getItemsPerView();
      maxUserIndex = Math.max(0, totalRealItems - itemsPerView);

      if (totalRealItems <= itemsPerView) return;

      // Clone first itemsPerView items and append
      for (let i = 0; i < itemsPerView; i++) {
        const clone = originalItems[i % totalRealItems].cloneNode(true);
        clone.classList.add("ue-clone");
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      }

      // Clone last itemsPerView items and prepend
      for (let i = 0; i < itemsPerView; i++) {
        const idx = (totalRealItems - 1 - i + totalRealItems) % totalRealItems;
        const clone = originalItems[idx].cloneNode(true);
        clone.classList.add("ue-clone");
        clone.setAttribute("aria-hidden", "true");
        track.insertBefore(clone, track.firstChild);
      }
    }

    function getStep() {
      const firstItem = track.children[0];
      if (!firstItem) return 0;
      const itemRect = firstItem.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      return itemRect.width + gap;
    }

    function getDomIndex(uIdx) {
      const clonePrependCount = totalRealItems > itemsPerView ? itemsPerView : 0;
      return uIdx + clonePrependCount;
    }

    function goTo(index, animate = true) {
      if (isTransitioning && animate) return;
      userIndex = index;
      const step = getStep();
      const domIdx = getDomIndex(userIndex);
      const offset = -(domIdx * step);

      if (animate) {
        isTransitioning = true;
        track.style.transition = "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)";
      } else {
        track.style.transition = "none";
      }

      track.style.transform = `translateX(${offset}px)`;
      updateDots();
      updateNavButtons();
    }

    // Handle seamless reset on transition end
    track.addEventListener("transitionend", (e) => {
      if (e.target !== track) return;
      isTransitioning = false;

      if (totalRealItems <= itemsPerView) return;

      const numSlides = maxUserIndex + 1; // total positions

      if (userIndex >= numSlides) {
        // We scrolled past the end into appended clones
        userIndex = userIndex % numSlides;
        track.style.transition = "none";
        const offset = -(getDomIndex(userIndex) * getStep());
        track.style.transform = `translateX(${offset}px)`;
        void track.offsetHeight; // force reflow
      } else if (userIndex < 0) {
        // We scrolled before start into prepended clones
        userIndex = (userIndex % numSlides + numSlides) % numSlides;
        track.style.transition = "none";
        const offset = -(getDomIndex(userIndex) * getStep());
        track.style.transform = `translateX(${offset}px)`;
        void track.offsetHeight; // force reflow
      }
    });

    function next() {
      goTo(userIndex + 1, true);
    }

    function prev() {
      goTo(userIndex - 1, true);
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      const dotCount = maxUserIndex + 1;
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
          goTo(i, true);
          restartAutoplay();
        });
        dotsWrap.appendChild(dot);
      }
      updateDots();
    }

    function updateDots() {
      if (!dotsWrap) return;
      const numSlides = maxUserIndex + 1;
      const activeIdx = (userIndex % numSlides + numSlides) % numSlides;
      Array.from(dotsWrap.children).forEach((dot, i) => {
        dot.classList.toggle("is-active", i === activeIdx);
      });
    }

    function updateNavButtons() {
      const hasMultipleSlides = maxUserIndex > 0;
      if (prevBtn) prevBtn.disabled = !hasMultipleSlides;
      if (nextBtn) nextBtn.disabled = !hasMultipleSlides;
    }

    function startAutoplay() {
      stopAutoplay();
      if (maxUserIndex <= 0) return;
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

    /* ---------- Drag / swipe support ---------- */
    function onDragStart(clientX) {
      if (isTransitioning) return;
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
        goTo(userIndex + 1, true);
      } else if (dragDeltaX > threshold) {
        goTo(userIndex - 1, true);
      } else {
        goTo(userIndex, true);
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
      { passive: true }
    );
    track.addEventListener(
      "touchmove",
      (e) => onDragMove(e.touches[0].clientX),
      { passive: true }
    );
    track.addEventListener("touchend", onDragEnd);

    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", restartAutoplay);

    /* ---------- Responsive re-layout ---------- */
    function handleResize() {
      setupClones();
      buildDots();
      goTo(userIndex, false);
    }
    window.addEventListener("resize", handleResize);

    /* ---------- Init ---------- */
    setupClones();
    buildDots();
    updateNavButtons();
    goTo(0, false);
    startAutoplay();
  }

  document.querySelectorAll("[data-ue-slider]").forEach(initSlider);
})();

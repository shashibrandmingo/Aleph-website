(function () {
  function initFoundersSlider(section) {
    const track = section.querySelector("[data-fm-track]");
    const originalSlides = Array.from(track.children);
    const dotsWrap = section.querySelector("[data-fm-dots]");

    if (!originalSlides.length) return;

    const realCount = originalSlides.length;

    let slides = originalSlides;
    let hasClone = false;

    if (realCount > 1) {
      const firstClone = originalSlides[0].cloneNode(true);
      firstClone.setAttribute("aria-hidden", "true");
      firstClone.classList.remove("is-active");
      track.appendChild(firstClone);
      slides = Array.from(track.children);
      hasClone = true;
    }

    let currentIndex = 0;
    let autoplayTimer = null;
    let isTransitioning = false;

    function setTrackPosition(index, animate) {
      track.style.transition = animate
        ? "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)"
        : "none";
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    function setActiveVisual(realIndex) {
      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === realIndex);
      });
      updateDots(realIndex % realCount);
      if (section.classList.contains("is-visible")) {
        runCountersIn(slides[realIndex]);
      }
    }

    function goTo(targetRealIndex) {
      const normalized = (targetRealIndex + realCount) % realCount;
      currentIndex = normalized;
      setTrackPosition(currentIndex, true);
      setActiveVisual(currentIndex);
    }

    function next() {
      if (isTransitioning) return;
      const nextIndex = currentIndex + 1;
      setTrackPosition(nextIndex, true);
      setActiveVisual(nextIndex % realCount);

      if (hasClone && nextIndex === realCount) {
        isTransitioning = true;
        const onEnd = () => {
          track.removeEventListener("transitionend", onEnd);
          setTrackPosition(0, false);
          void track.offsetWidth;
          currentIndex = 0;
          isTransitioning = false;
        };
        track.addEventListener("transitionend", onEnd);
      } else {
        currentIndex = nextIndex % realCount;
      }
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      if (realCount <= 1) {
        dotsWrap.style.display = "none";
        return;
      }
      for (let i = 0; i < realCount; i++) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "fm-dot";
        dot.setAttribute("aria-label", `Go to founder ${i + 1}`);
        dot.addEventListener("click", () => {
          goTo(i);
          restartAutoplay();
        });
        dotsWrap.appendChild(dot);
      }
      updateDots(0);
    }

    function updateDots(activeRealIndex) {
      if (!dotsWrap) return;
      Array.from(dotsWrap.children).forEach((dot, i) => {
        dot.classList.toggle("is-active", i === activeRealIndex);
      });
    }

    function startAutoplay() {
      stopAutoplay();
      if (realCount <= 1) return;
      autoplayTimer = setInterval(next, 6000);
    }
    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    function restartAutoplay() {
      startAutoplay();
    }

    section.addEventListener("mouseenter", stopAutoplay);
    section.addEventListener("mouseleave", restartAutoplay);

    let isDragging = false;
    let dragStartX = 0;
    let dragDeltaX = 0;

    function onDragStart(clientX) {
      if (isTransitioning) return;
      isDragging = true;
      dragStartX = clientX;
      dragDeltaX = 0;
      stopAutoplay();
      track.style.transition = "none";
    }
    function onDragMove(clientX) {
      if (!isDragging) return;
      dragDeltaX = clientX - dragStartX;
      const base = -currentIndex * section.offsetWidth;
      track.style.transform = `translateX(${base + dragDeltaX}px)`;
    }
    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      const threshold = section.offsetWidth * 0.15;
      if (dragDeltaX < -threshold) {
        next();
      } else if (dragDeltaX > threshold) {
        goTo(currentIndex - 1);
      } else {
        setTrackPosition(currentIndex, true);
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

    function animateCount(el) {
      const target = parseInt(el.getAttribute("data-fm-count"), 10) || 0;
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1400;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = `${value}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      }
      requestAnimationFrame(tick);
    }

    function runCountersIn(slide) {
      if (!slide) return;
      const counters = slide.querySelectorAll("[data-fm-count]");
      counters.forEach((el) => {
        if (el.dataset.fmCounted) return;
        el.dataset.fmCounted = "true";
        animateCount(el);
      });
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              section.classList.add("is-visible");
              runCountersIn(slides[currentIndex]);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 },
      );
      observer.observe(section);
    } else {
      section.classList.add("is-visible");
      runCountersIn(slides[currentIndex]);
    }

    buildDots();
    setTrackPosition(0, false);
    setActiveVisual(0);
    startAutoplay();
  }

  document.querySelectorAll(".fm-section").forEach(initFoundersSlider);
})();

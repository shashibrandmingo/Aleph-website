(function () {
  "use strict";

  /* -----------------------------------------------------------------
     1) CLIENT LOGOS — point these at your real logo files.
     Update the base path below if your project structure differs.
  ----------------------------------------------------------------- */
  const LOGO_BASE_PATH = "image/client-logo/";

  const clients = [
    { name: "Client 1", img: LOGO_BASE_PATH + "c1.webp" },
    { name: "Client 2", img: LOGO_BASE_PATH + "c2.webp" },
    { name: "Client 3", img: LOGO_BASE_PATH + "c3.webp" },
    { name: "Client 4", img: LOGO_BASE_PATH + "c4.webp" },
    { name: "Client 5", img: LOGO_BASE_PATH + "c5.webp" },
    { name: "Client 6", img: LOGO_BASE_PATH + "c6.webp" },
    { name: "Client 7", img: LOGO_BASE_PATH + "c7.webp" },
    { name: "Client 8", img: LOGO_BASE_PATH + "c8.webp" },
  ];

  const PX_PER_SECOND = 45; // autoplay speed
  const RESUME_DELAY_MS = 1200; // pause-after-drag before autoplay resumes

  /* -----------------------------------------------------------------
     2) DOM references
  ----------------------------------------------------------------- */
  const els = {
    viewport: document.getElementById("clientsViewport"),
    track: document.getElementById("clientsTrack"),
  };

  /* -----------------------------------------------------------------
     3) State
  ----------------------------------------------------------------- */
  let setWidth = 0; // width of one full logo set (px)
  let position = 0; // current scroll offset (px), always 0..setWidth
  let isDragging = false;
  let dragStartX = 0;
  let dragStartPosition = 0;
  let resumeTimer = null;
  let autoplayPaused = false;
  let rafId = null;
  let lastFrameTime = null;

  /* -----------------------------------------------------------------
     4) Build one card's markup
  ----------------------------------------------------------------- */
  function cardHTML(client) {
    return `
      <div class="clients-card">
        <img src="${client.img}" alt="${client.name} logo" loading="lazy" draggable="false" />
      </div>
    `;
  }

  /* -----------------------------------------------------------------
     5) Render the track with the logo set duplicated exactly once,
     so wrapping the scroll position at setWidth is seamless.
  ----------------------------------------------------------------- */
  function renderTrack() {
    const setHTML = clients.map(cardHTML).join("");
    els.track.innerHTML = setHTML + setHTML;
  }

  /* -----------------------------------------------------------------
     6) Apply the current position to the track, keeping it wrapped
     within [0, setWidth) so the duplicated set makes the loop seamless
     in both scroll directions.
  ----------------------------------------------------------------- */
  function applyPosition() {
    if (setWidth > 0) {
      position = ((position % setWidth) + setWidth) % setWidth;
    }
    els.track.style.transform = `translateX(${-position}px)`;
  }

  /* -----------------------------------------------------------------
     7) Measure one full logo-set width (including gaps)
  ----------------------------------------------------------------- */
  function measure() {
    const cards = els.track.querySelectorAll(".clients-card");
    if (!cards.length) return;

    const trackStyles = getComputedStyle(els.track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || "20");

    let width = 0;
    for (let i = 0; i < clients.length; i++) {
      width += cards[i].getBoundingClientRect().width + gap;
    }
    setWidth = width;
    applyPosition();
  }

  /* -----------------------------------------------------------------
     8) Autoplay loop (requestAnimationFrame, framerate-independent)
  ----------------------------------------------------------------- */
  function frame(now) {
    if (lastFrameTime === null) lastFrameTime = now;
    const deltaSeconds = (now - lastFrameTime) / 1000;
    lastFrameTime = now;

    if (!isDragging && !autoplayPaused && setWidth > 0) {
      position += PX_PER_SECOND * deltaSeconds;
      applyPosition();
    }

    rafId = requestAnimationFrame(frame);
  }

  /* -----------------------------------------------------------------
     9) Drag (mouse) + swipe (touch) support
  ----------------------------------------------------------------- */
  function startDrag(clientX) {
    isDragging = true;
    dragStartX = clientX;
    dragStartPosition = position;
    autoplayPaused = true;
    clearTimeout(resumeTimer);
    els.track.classList.add("is-dragging");
  }

  function moveDrag(clientX) {
    if (!isDragging) return;
    const delta = clientX - dragStartX;
    position = dragStartPosition - delta;
    applyPosition();
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    els.track.classList.remove("is-dragging");

    // Resume autoplay after a short pause so the drag feels intentional
    // rather than being immediately overridden.
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      autoplayPaused = false;
    }, RESUME_DELAY_MS);
  }

  // Mouse events
  els.track.addEventListener("mousedown", (e) => {
    e.preventDefault();
    startDrag(e.clientX);
  });
  window.addEventListener("mousemove", (e) => {
    if (isDragging) moveDrag(e.clientX);
  });
  window.addEventListener("mouseup", endDrag);

  // Touch events
  els.track.addEventListener(
    "touchstart",
    (e) => {
      startDrag(e.touches[0].clientX);
    },
    { passive: true },
  );
  els.track.addEventListener(
    "touchmove",
    (e) => {
      moveDrag(e.touches[0].clientX);
    },
    { passive: true },
  );
  els.track.addEventListener("touchend", endDrag);
  els.track.addEventListener("touchcancel", endDrag);

  // Pause on hover (desktop), resume on mouse leave — but only if the
  // visitor isn't actively dragging (handled separately above).
  els.viewport.addEventListener("mouseenter", () => {
    autoplayPaused = true;
  });
  els.viewport.addEventListener("mouseleave", () => {
    if (!isDragging) {
      clearTimeout(resumeTimer);
      autoplayPaused = false;
    }
  });

  /* -----------------------------------------------------------------
     10) Re-measure on resize (debounced) so the loop stays seamless
     at every viewport size
  ----------------------------------------------------------------- */
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(measure, 150);
  });

  /* -----------------------------------------------------------------
     11) Init
  ----------------------------------------------------------------- */
  renderTrack();
  requestAnimationFrame(() => {
    measure();
    rafId = requestAnimationFrame(frame);
  });
})();

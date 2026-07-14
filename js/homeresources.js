(function () {
  "use strict";

  const topics = [
    {
      label: "BIS Updates",
      icon: "fa-regular fa-square-check",
      topic: "bis",
      active: true,
    },
    { label: "CDSCO", icon: "fa-solid fa-link", topic: "cdsco" },
    { label: "WPC", icon: "fa-solid fa-star", topic: "wpc" },
    { label: "TEC", icon: "fa-regular fa-square", topic: "tec" },
    { label: "EMI/EMC", icon: "fa-solid fa-plus", topic: "emiemc" },
    { label: "ISO Standards", icon: "fa-solid fa-shield-halved", topic: "iso" },
  ];

  /* -----------------------------------------------------------------
     2) "ALL TOPICS" DROPDOWN MENU — the full category list plus the
     two special links you asked for. Items with an "href" navigate to
     that URL; items without one are treated as in-page filters and
     just get marked active (edit hrefs below once your category pages
     are ready — e.g. "Services.html?cat=bis").
  ----------------------------------------------------------------- */
  const allTopicsMenu = [
    { label: "Show All", href: "#", active: true },
    { label: "General", href: "#" },
    { label: "BIS", href: "#" },
    { label: "WPC", href: "#" },
    { label: "ISI Mark", href: "#" },
    { label: "Hallmark", href: "#" },
    { label: "CE", href: "#" },
    { label: "E-Waste", href: "#" },
    { label: "CDSCO", href: "#" },
    { label: "BEE", href: "#" },
    { label: "TEC", href: "#" },
    { label: "BIS-CRS", href: "#" },
    { label: "BIS-ISI", href: "#" },
    { label: "EPR", href: "#" },
    { type: "divider" },
    {
      label: "Completed Projects",
      href: "https://alephindia.in/licence-granted.php",
      icon: "fa-solid fa-arrow-up-right-from-square",
      isLink: true,
    },
    {
      label: "Blog Post",
      href: "https://alephindia.in/blog.php",
      icon: "fa-solid fa-arrow-up-right-from-square",
      isLink: true,
    },
  ];

  /* -----------------------------------------------------------------
     3) ARTICLE CARDS — the cards themselves are static HTML in
     resources-section.html (.stack-card-node elements inside
     #swipeStackDeck), matching the reference structure. To add, remove,
     or edit an article, edit that markup directly — image, badge text,
     title, description, date, and read time all live there.
  ----------------------------------------------------------------- */

  /* -----------------------------------------------------------------
     4) DOM references
  ----------------------------------------------------------------- */
  const els = {
    topicsEl: document.getElementById("resourcesTopics"),
    allTopicsWrap: document.getElementById("resourcesAllTopicsWrap"),
    allTopicsBtn: document.getElementById("resourcesAllTopicsBtn"),
    allTopicsMenuEl: document.getElementById("resourcesAllTopicsMenu"),
  };

  /* -----------------------------------------------------------------
     5) Render topic chips (colorful icons via data-topic attribute,
     which resources-section.css maps to a unique accent color)
  ----------------------------------------------------------------- */
  function renderTopics() {
    if (!els.topicsEl) return;
    els.topicsEl.innerHTML = "";

    topics.forEach((topic) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className =
        "resources-topic-chip" + (topic.active ? " is-active" : "");
      if (topic.topic) chip.setAttribute("data-topic", topic.topic);
      chip.innerHTML = `<i class="${topic.icon}"></i> ${topic.label}`;

      chip.addEventListener("click", () => {
        els.topicsEl
          .querySelectorAll(".resources-topic-chip")
          .forEach((el) => el.classList.remove("is-active"));
        chip.classList.add("is-active");
      });

      els.topicsEl.appendChild(chip);
    });
  }

  /* -----------------------------------------------------------------
     6) Render "All Topics" dropdown menu + open/close behaviour
  ----------------------------------------------------------------- */
  function renderAllTopicsMenu() {
    if (!els.allTopicsMenuEl) return;
    els.allTopicsMenuEl.innerHTML = "";

    // Small "Categories" label at the top for extra polish
    const label = document.createElement("div");
    label.className = "resources-alltopics-menu-label";
    label.textContent = "Filter by Category";
    els.allTopicsMenuEl.appendChild(label);

    // Scrollable zone holds every entry up to (but not including) the
    // trailing divider + external links, so those stay pinned/visible
    // instead of scrolling out of view.
    const scrollZone = document.createElement("div");
    scrollZone.className = "resources-alltopics-scroll";

    const footer = document.createElement("div");
    footer.className = "resources-alltopics-footer";

    let inFooter = false;

    function makeItemLink(item) {
      const link = document.createElement("a");
      link.className =
        "resources-alltopics-item" +
        (item.active ? " is-active" : "") +
        (item.isLink ? " resources-alltopics-item--link" : "");
      link.href = item.href || "#";
      if (item.isLink) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      const dot = item.isLink
        ? ""
        : `<span class="resources-alltopics-item-dot"></span>`;
      const iconHtml = item.icon ? `<i class="${item.icon}"></i>` : "";

      link.innerHTML = `${dot}<span>${item.label}</span>${iconHtml}`;

      link.addEventListener("click", () => {
        if (!item.isLink) {
          els.allTopicsMenuEl
            .querySelectorAll(".resources-alltopics-item")
            .forEach((el) => el.classList.remove("is-active"));
          link.classList.add("is-active");
          closeAllTopicsMenu();
        }
      });

      return link;
    }

    allTopicsMenu.forEach((item) => {
      if (item.type === "divider") {
        inFooter = true;
        return;
      }

      const link = makeItemLink(item);
      if (inFooter) footer.appendChild(link);
      else scrollZone.appendChild(link);
    });

    els.allTopicsMenuEl.appendChild(scrollZone);
    els.allTopicsMenuEl.appendChild(footer);
  }

  function openAllTopicsMenu() {
    els.allTopicsWrap.classList.add("is-open");
    els.allTopicsBtn.setAttribute("aria-expanded", "true");
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscKey);
  }

  function closeAllTopicsMenu() {
    els.allTopicsWrap.classList.remove("is-open");
    els.allTopicsBtn.setAttribute("aria-expanded", "false");
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("keydown", handleEscKey);
  }

  function handleOutsideClick(e) {
    if (!els.allTopicsWrap.contains(e.target)) closeAllTopicsMenu();
  }

  function handleEscKey(e) {
    if (e.key === "Escape") closeAllTopicsMenu();
  }

  function initAllTopicsDropdown() {
    if (!els.allTopicsBtn) return;
    els.allTopicsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = els.allTopicsWrap.classList.contains("is-open");
      if (isOpen) closeAllTopicsMenu();
      else openAllTopicsMenu();
    });
  }

  /* ========================================================================
     7) SWIPE STACK CARDS ENGINE
     ------------------------------------------------------------------------
     Matches the reference "swipe stack" behavior: the cards already exist
     as static HTML (.stack-card-node elements inside #swipeStackDeck) with
     a --card-index custom property controlling their stacked offset.
     Advancing to the next card: the active card's --card-index is 0.

     - Clicking the circular button on the active card (or pressing the
       Right arrow key) advances to the next card: the current front card
       plays an exit-left animation, then gets physically moved to the end
       of the deck in the DOM and every card's --card-index / .active-front
       state is recalculated.
     - Dragging/swiping the active card left does the same thing; dragging
       right goes to the previous card (moves the last card to the front,
       with an exit-right animation played on the card that was in front).
     - Dots underneath mirror the active card and let you jump directly to
       any card, rotating in whichever direction is shorter.
     ========================================================================== */

  function initSwipeStackEngine() {
    const deckContainer = document.getElementById("swipeStackDeck");
    const dotsRow = document.getElementById("stackDotsRow");
    if (!deckContainer) return;

    let cardNodes = Array.from(
      deckContainer.querySelectorAll(".stack-card-node"),
    );
    if (!cardNodes.length) return;

    let executionMutex = false; // prevents overlapping animations
    let dotEls = [];

    /* -------- Re-index + re-render active/inactive state -------- */
    function reindexCards() {
      cardNodes.forEach((card, index) => {
        card.style.setProperty("--card-index", index);
        card.classList.toggle("active-front", index === 0);
      });
      updateDots();
    }

    /* -------- Dots -------- */
    function buildDots() {
      if (!dotsRow) return;
      dotsRow.innerHTML = "";
      if (cardNodes.length <= 1) {
        dotsRow.style.display = "none";
        return;
      }
      dotsRow.style.display = "flex";
      dotEls = cardNodes.map((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "stack-dot";
        dot.setAttribute("aria-label", `Go to article ${i + 1}`);
        dot.setAttribute("data-dot-for", String(i));
        dot.addEventListener("click", () => {
          // Look up the target card by its stable id at click time —
          // cardNodes gets reordered after every navigation, so capturing
          // cardNodes[i] up front would go stale after the first move.
          const target = cardNodes.find(
            (c) => c.getAttribute("data-card-id") === String(i),
          );
          if (target) goToCard(target);
        });
        dotsRow.appendChild(dot);
        return dot;
      });
      updateDots();
    }

    function updateDots() {
      if (!dotEls.length) return;
      const activeId = cardNodes[0].getAttribute("data-card-id");
      dotEls.forEach((dot) => {
        dot.classList.toggle(
          "is-active",
          dot.getAttribute("data-dot-for") === activeId,
        );
      });
    }

    // Tag every card with a stable id (its original order) so dots can
    // always tell which one is currently active even after the physical
    // DOM order changes.
    cardNodes.forEach((card, i) =>
      card.setAttribute("data-card-id", String(i)),
    );

    /* -------- Advance to next card (button, left-drag, ArrowRight) -------- */
    function cycleNext() {
      if (executionMutex || cardNodes.length <= 1) return;
      executionMutex = true;

      const currentFrontNode = cardNodes[0];
      currentFrontNode.classList.remove("swipe-exit-reverse");
      currentFrontNode.classList.add("swipe-exit-active");

      window.setTimeout(() => {
        currentFrontNode.classList.remove("swipe-exit-active", "active-front");
        currentFrontNode.style.removeProperty("--res-drag");
        deckContainer.appendChild(currentFrontNode);

        cardNodes.push(cardNodes.shift());
        reindexCards();

        executionMutex = false;
      }, 500);
    }

    /* -------- Go back to previous card (right-drag, dot, ArrowLeft) -------- */
    function cyclePrev() {
      if (executionMutex || cardNodes.length <= 1) return;
      executionMutex = true;

      const currentFrontNode = cardNodes[0];
      const incomingNode = cardNodes[cardNodes.length - 1];

      // Play the outgoing card sliding away to the right while the
      // incoming card (already positioned behind everything) becomes
      // active — CSS transition on --card-index handles the slide-in.
      currentFrontNode.classList.add("swipe-exit-reverse");

      window.setTimeout(() => {
        currentFrontNode.classList.remove("swipe-exit-reverse", "active-front");
        currentFrontNode.style.removeProperty("--res-drag");

        // Move the last card to the front of the DOM order.
        deckContainer.insertBefore(incomingNode, deckContainer.firstChild);
        cardNodes.unshift(cardNodes.pop());
        reindexCards();

        executionMutex = false;
      }, 500);
    }

    /* -------- Bring an arbitrary card straight to the front (dots) -------- */
    function goToCard(targetCard) {
      if (executionMutex) return;
      const targetPos = cardNodes.indexOf(targetCard);
      if (targetPos <= 0) return;
      executionMutex = true;

      // Rotate in whichever direction is shorter so it always feels like
      // a natural forward/backward motion rather than spinning through
      // every card in between.
      const forwardSteps = targetPos;
      const backwardSteps = cardNodes.length - targetPos;
      const goingForward = forwardSteps <= backwardSteps;

      const currentFrontNode = cardNodes[0];
      currentFrontNode.classList.add(
        goingForward ? "swipe-exit-active" : "swipe-exit-reverse",
      );

      window.setTimeout(() => {
        currentFrontNode.classList.remove(
          "swipe-exit-active",
          "swipe-exit-reverse",
          "active-front",
        );
        currentFrontNode.style.removeProperty("--res-drag");

        if (goingForward) {
          cardNodes = cardNodes
            .slice(targetPos)
            .concat(cardNodes.slice(0, targetPos));
        } else {
          cardNodes = cardNodes
            .slice(cardNodes.length - backwardSteps)
            .concat(cardNodes.slice(0, cardNodes.length - backwardSteps));
        }
        cardNodes.forEach((c) => deckContainer.appendChild(c));
        reindexCards();

        executionMutex = false;
      }, 500);
    }

    /* -------- Click on the circular action button -------- */
    deckContainer.addEventListener("click", (event) => {
      const trigger = event.target.closest(".stack-action-swipe-btn");
      if (
        trigger &&
        trigger.closest(".stack-card-node").classList.contains("active-front")
      ) {
        cycleNext();
      }
    });

    /* -------- Drag / swipe support (mouse + touch, active card only) --------
       Equivalent to the button: drag left advances, drag right goes back.
       Works alongside the button without conflicting with it. */
    let dragState = null;

    function getClientX(e) {
      if (e.touches && e.touches.length) return e.touches[0].clientX;
      if (e.changedTouches && e.changedTouches.length)
        return e.changedTouches[0].clientX;
      return e.clientX;
    }

    function onPointerDown(e) {
      if (executionMutex) return;
      // Never start a drag from the action button itself — let its click
      // handler fire normally.
      if (e.target.closest(".stack-action-swipe-btn")) return;

      const frontCard = cardNodes[0];
      if (!frontCard.contains(e.target)) return;

      if (e.type === "mousedown") e.preventDefault();

      dragState = { startX: getClientX(e), deltaX: 0, frontCard, moved: false };
      deckContainer.classList.add("is-dragging");

      window.addEventListener("mousemove", onPointerMove);
      window.addEventListener("mouseup", onPointerUp);
      window.addEventListener("touchmove", onPointerMove, { passive: true });
      window.addEventListener("touchend", onPointerUp);
    }

    function onPointerMove(e) {
      if (!dragState) return;
      const x = getClientX(e);
      dragState.deltaX = x - dragState.startX;
      if (Math.abs(dragState.deltaX) > 4) dragState.moved = true;
      dragState.frontCard.style.setProperty(
        "--res-drag",
        dragState.deltaX + "px",
      );
    }

    function onPointerUp() {
      if (!dragState) return;
      const { deltaX, frontCard, moved } = dragState;

      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      deckContainer.classList.remove("is-dragging");

      const threshold = Math.min(120, deckContainer.offsetWidth * 0.14);

      if (moved) {
        const suppressClick = (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          frontCard.removeEventListener("click", suppressClick, true);
        };
        frontCard.addEventListener("click", suppressClick, true);
      }

      if (deltaX <= -threshold) {
        cycleNext();
      } else if (deltaX >= threshold) {
        cyclePrev();
      } else {
        frontCard.style.removeProperty("--res-drag");
      }

      dragState = null;
    }

    deckContainer.addEventListener("mousedown", onPointerDown);
    deckContainer.addEventListener("touchstart", onPointerDown, {
      passive: true,
    });

    /* -------- Keyboard support -------- */
    deckContainer.setAttribute("tabindex", "0");
    deckContainer.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") cycleNext();
      if (e.key === "ArrowLeft") cyclePrev();
    });

    buildDots();
    reindexCards();
  }

  /* -----------------------------------------------------------------
     8) Init
  ----------------------------------------------------------------- */
  renderTopics();
  renderAllTopicsMenu();
  initAllTopicsDropdown();
  initSwipeStackEngine();
})();

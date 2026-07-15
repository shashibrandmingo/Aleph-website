/* ==========================================================================
   POPUP.JS
   Owns the single office-info popup element: filling its content from an
   office record, positioning it next to that office's marker on screen,
   and animating it open/closed. Never touches Three.js directly — it
   only asks globe.js (via the position getter passed in) for where the
   marker currently sits on screen.
   ========================================================================== */

/**
 * @param {HTMLElement} popupEl - the popup container (.globe-popup)
 * @param {HTMLElement} stageEl - the globe stage wrapper the popup is
 *        absolutely positioned within
 * @param {(officeId: string) => {x:number, y:number, visible:boolean}|null} getMarkerScreenPosition
 */
export class Popup {
  constructor(popupEl, stageEl, getMarkerScreenPosition) {
    this.popupEl = popupEl;
    this.stageEl = stageEl;
    this.getMarkerScreenPosition = getMarkerScreenPosition;

    this.currentOffice = null;
    this._isOpen = false;
    this._followRaf = null;

    this.closeBtn = popupEl.querySelector(".globe-popup__close");
    this.iconEl = popupEl.querySelector(".globe-popup__icon");
    this.nameEl = popupEl.querySelector(".globe-popup__name");
    this.locationEl = popupEl.querySelector(".globe-popup__location");
    this.phoneEl = popupEl.querySelector(".globe-popup__phone");
    this.phoneLink = popupEl.querySelector(".globe-popup__phone-link");
    this.emailEl = popupEl.querySelector(".globe-popup__email");
    this.viewBtn = popupEl.querySelector(".globe-popup__view-btn");

    this.closeBtn.addEventListener("click", () => {
      this.close();
      this.onCloseRequested?.();
    });
  }

  /**
   * @param {object} office - full office record from office-data.js
   * @param {() => void} onViewDetails - called when "View Office Details" is clicked
   */
  open(office, onViewDetails) {
    this.currentOffice = office;
    this._isOpen = true;

    const isHead = office.type === "head";
    this.iconEl.innerHTML = isHead
      ? '<i class="fa-solid fa-building"></i>'
      : '<i class="fa-solid fa-location-dot"></i>';
    this.iconEl.classList.toggle("is-head", isHead);
    this.iconEl.classList.toggle("is-branch", !isHead);

    this.nameEl.textContent = office.name;
    this.locationEl.textContent = `${office.city}, ${office.country}`;
    this.phoneEl.textContent = office.phone;
    this.phoneLink.href = `tel:${office.phone.replace(/[^+\d]/g, "")}`;

    // Email — show it only if it exists
    if (this.emailEl) {
      this.emailEl.textContent = office.email;
      this.emailEl.href = `mailto:${office.email}`;
      this.emailEl.style.display = office.email ? "block" : "none";
    }

    this.viewBtn.onclick = () => onViewDetails?.(office);

    this.popupEl.classList.add("is-open");
    this.popupEl.setAttribute("aria-hidden", "false");

    this._startFollowing();
  }

  close() {
    this._isOpen = false;
    this.popupEl.classList.remove("is-open");
    this.popupEl.setAttribute("aria-hidden", "true");
    this._stopFollowing();
  }

  isOpen() {
    return this._isOpen;
  }

  /**
   * Keeps the popup pinned next to its marker every frame while open,
   * since the globe is continuously rotating (auto-rotate or drag).
   * Hides the popup smoothly if the marker rotates to the back of the
   * globe, and shows it again once it comes back around.
   */
  _startFollowing() {
    this._stopFollowing();
    const step = () => {
      if (!this._isOpen || !this.currentOffice) return;
      const pos = this.getMarkerScreenPosition(this.currentOffice.id);
      if (pos) {
        this._positionAt(pos.x, pos.y);
        this.popupEl.classList.toggle("is-back-facing", !pos.visible);
      }
      this._followRaf = requestAnimationFrame(step);
    };
    this._followRaf = requestAnimationFrame(step);
  }

  _stopFollowing() {
    if (this._followRaf) {
      cancelAnimationFrame(this._followRaf);
      this._followRaf = null;
    }
  }

  /**
   * Positions the popup so its left-pointing arrow tip sits at the
   * marker's screen coordinates, flipping to the other side near the
   * stage edges so it never renders off-screen.
   */
  _positionAt(markerX, markerY) {
    const stageRect = this.stageEl.getBoundingClientRect();
    const popupRect = this.popupEl.getBoundingClientRect();
    const popupWidth = popupRect.width || 260;
    const popupHeight = popupRect.height || 140;

    const gap = 20;
    let placeRight = markerX + gap + popupWidth <= stageRect.width;
    let left = placeRight ? markerX + gap : markerX - gap - popupWidth;

    // Clamp horizontally so the card never spills outside the stage.
    left = Math.max(8, Math.min(left, stageRect.width - popupWidth - 8));

    let top = markerY - popupHeight * 0.35; // Slight upward bias for visual balance
    top = Math.max(8, Math.min(top, stageRect.height - popupHeight - 8));

    this.popupEl.style.left = `${left}px`;
    this.popupEl.style.top = `${top}px`;
    this.popupEl.classList.toggle("arrow-left", placeRight);
    this.popupEl.classList.toggle("arrow-right", !placeRight);
  }
}

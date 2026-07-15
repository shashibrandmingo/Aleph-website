/* ==========================================================================
   MAIN.JS
   Entry point. Wires office-data.js -> globe.js -> popup.js together and
   drives the interactions described in the brief:
   - Head Office popup open by default on load
   - Clicking a marker opens its popup (closing whichever was open)
   - Clicking a country button rotates the globe there, activates the
     marker, opens its popup, and highlights the button
   ========================================================================== */

import { Globe } from "./globe.js";
import { Popup } from "./Popup.js";
import {
  OFFICES,
  HEAD_OFFICE,
  getOfficeById,
  getCountryList,
  getOfficesByCountry,
} from "./office-data.js";

/* -----------------------------------------------------------------
   DOM references
----------------------------------------------------------------- */
const stageEl = document.getElementById("gpGlobeStage");
const canvasEl = document.getElementById("gpGlobeCanvas");
const popupEl = document.getElementById("gpPopup");
const countryButtonsEl = document.getElementById("gpCountryButtons");
const countryFooterEl = document.getElementById("gpCountryFooterList");
const mapsButton = document.getElementById("gpMapsButton");

/* -----------------------------------------------------------------
   State
----------------------------------------------------------------- */
let activeOfficeId = null;

/* -----------------------------------------------------------------
   1) Build the globe. onMarkerClicked below is the single entry point
   for "an office became active" regardless of whether that happened
   via a 3D marker click or a country button click.
----------------------------------------------------------------- */
const globe = new Globe(canvasEl, stageEl, (officeId) => {
  if (officeId) {
    // Do not rotate the earth when a marker is clicked directly
    activateOffice(officeId, { rotate: false });
  } else {
    popup.close();
    setActiveCountryButton(null);
    globe.setActiveMarker(null);
  }
});

/* -----------------------------------------------------------------
   2) Build the popup, wired to ask the globe where the active
   marker currently sits on screen every frame.
----------------------------------------------------------------- */
const popup = new Popup(popupEl, stageEl, (officeId) =>
  globe.getMarkerScreenPosition(officeId),
);

/* -----------------------------------------------------------------
   3) Core interaction: activate a given office everywhere at once —
   marker highlight, popup content, and (optionally) camera rotation
   + country-button highlight. This is the one function every
   entry point (marker click, country click, initial load) calls.
----------------------------------------------------------------- */
function activateOffice(officeId, { rotate = true, snap = false } = {}) {
  const office = getOfficeById(officeId);
  if (!office) return;

  activeOfficeId = officeId;

  globe.setActiveMarker(officeId);
  if (rotate) {
    globe.focusOnOffice(officeId, snap);
  }

  popup.open(office, (o) => {
    // Redirect to office details page
    window.location.href = `/contact-us.html?office=${o.id}`;
  });

  setActiveCountryButton(office.country);
}

/* -----------------------------------------------------------------
   4) Country buttons — generated from office-data.js, never
   hardcoded. Clicking one focuses the globe on that country's first
   office (typically its only office, except India which has several
   — clicking "India" focuses the Head Office specifically).
----------------------------------------------------------------- */
function renderCountryButtons() {
  const countries = getCountryList();
  const VISIBLE_COUNT = 7; // matches the reference's row before "More"

  countryButtonsEl.innerHTML = "";

  countries.forEach((c, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gp-country-btn";
    btn.dataset.country = c.country;
    btn.textContent = c.country;
    btn.hidden = index >= VISIBLE_COUNT;

    btn.addEventListener("click", () => {
      const officesInCountry = getOfficesByCountry(c.country);
      // Prefer the head office if this country has one, else its first office.
      const target =
        officesInCountry.find((o) => o.type === "head") || officesInCountry[0];
      if (target) activateOffice(target.id, { rotate: true });
    });

    countryButtonsEl.appendChild(btn);
  });

  if (countries.length > VISIBLE_COUNT) {
    const moreBtn = document.createElement("button");
    moreBtn.type = "button";
    moreBtn.className = "gp-country-btn gp-country-btn--more";
    moreBtn.innerHTML = `More <i class="fa-solid fa-chevron-down"></i>`;
    moreBtn.addEventListener("click", () => {
      const hidden = countryButtonsEl.querySelectorAll("button[hidden]");
      hidden.forEach((b) => (b.hidden = false));
      moreBtn.remove();
    });
    countryButtonsEl.appendChild(moreBtn);
  }

  // Footer summary line, e.g. "India · USA · Germany · ... · and more"
  const names = countries.slice(0, 6).map((c) => c.country);
  const suffix = countries.length > 6 ? " · and more" : "";
  countryFooterEl.textContent = names.join(" · ") + suffix;
}

function setActiveCountryButton(country) {
  countryButtonsEl.querySelectorAll(".gp-country-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.country === country);
  });
}

/* -----------------------------------------------------------------
   5) "View On Google Maps" — opens a maps search centered on the
   currently active office (falls back to the Head Office).
----------------------------------------------------------------- */
mapsButton.addEventListener("click", (e) => {
  const office = getOfficeById(activeOfficeId) || HEAD_OFFICE;
  if (office) {
    e.currentTarget.href = `https://www.google.com/maps?q=${office.lat},${office.lng}`;
  }
});

/* -----------------------------------------------------------------
   6) Init
----------------------------------------------------------------- */
renderCountryButtons();

// Head Office popup is open by default on load, per the brief.
if (HEAD_OFFICE) {
  // Give the globe one frame to size/render before opening the popup,
  // so its first screen-position read is accurate.
  requestAnimationFrame(() => {
    // Focus on head office on initial load so it's centered instantly
    activateOffice(HEAD_OFFICE.id, { rotate: true, snap: true });
  });
}

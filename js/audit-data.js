/* ==========================================================================
   INTERNATIONAL AUDITS DATA & RENDERING SYSTEM (audit-data.js)
   ========================================================================== */

// 1. Audit Cards Data Array - Add or remove audit cards easily here!
const auditsData = [
  {
    id: 1,
    country: "Thailand",
    flagCode: "th",
    image: "image/audit/Thailandsep01.webp",
    highlightText: "Polypropylene",
    beforeText: "Successful completion of BIS audit for ",
    afterText: ", one of Thailand's leading Polypropylene manufacturers.",
    readMoreLink: "#"
  },
  {
    id: 2,
    country: "Kazakhstan",
    flagCode: "kz",
    image: "image/audit/Kazakhstan01.webp",
    highlightText: "Ferro-Chromium",
    beforeText: "Successful completion of BIS audit for ",
    afterText: ", one of Kazakhstan's leading Ferroalloy producers.",
    readMoreLink: "#"
  },
  {
    id: 3,
    country: "Vietnam",
    flagCode: "vn",
    image: "image/audit/Vietnamjune.webp",
    highlightText: "VinaOne Steel",
    beforeText: "Successful completion of BIS audit for ",
    afterText: ", one of Vietnam's leading steel manufacturers.",
    readMoreLink: "#"
  }
];

// 2. Rendering Function - Automatically generates the HTML grid from the auditsData array
function renderAuditCards() {
  const gridContainer = document.getElementById("audit-cards-grid");
  if (!gridContainer) return;

  gridContainer.innerHTML = ""; // Clear existing placeholder content

  auditsData.forEach(audit => {
    // Generate real flag image HTML
    const flagHTML = getFlagHTML(audit.flagCode, audit.country);

    const cardHTML = `
      <div class="audit-card">
        <div class="audit-card-image-wrapper">
          <img src="${audit.image}" alt="${audit.country} Audit group photo" class="audit-card-img">
          <div class="audit-country-badge">
            <span class="country-flag">${flagHTML}</span>
            <span class="country-name">${audit.country}</span>
          </div>
        </div>
        <div class="audit-card-body">
          <div class="audit-check-row">
            <div class="audit-check-icon">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <p class="audit-card-text">
              ${audit.beforeText}<strong>${audit.highlightText}</strong>${audit.afterText}
            </p>
          </div>
          <a href="javascript:void(0)" class="audit-card-link" onclick="openAuditModal(${audit.id})">
            <span>Read More</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `;
    gridContainer.innerHTML += cardHTML;
  });
}

// 3. Modal Popup Control Functions
function openAuditModal(id) {
  const audit = auditsData.find(item => item.id === id);
  if (!audit) return;

  const modal = document.getElementById("audit-modal");
  const modalFlag = document.getElementById("modal-flag");
  const modalCountry = document.getElementById("modal-country");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");

  if (!modal || !modalFlag || !modalCountry || !modalImage || !modalDescription) return;

  // Set modal elements
  modalFlag.innerHTML = getFlagHTML(audit.flagCode, audit.country);
  modalCountry.innerText = audit.country;
  modalImage.src = audit.image;
  modalImage.alt = `${audit.country} Audit image`;
  modalDescription.innerHTML = `${audit.beforeText}<strong>${audit.highlightText}</strong>${audit.afterText}`;

  // Open modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

function closeAuditModal() {
  const modal = document.getElementById("audit-modal");
  if (!modal) return;

  modal.classList.remove("active");
  document.body.style.overflow = ""; // Restore background scroll
}

// Setup modal event listeners
document.addEventListener("DOMContentLoaded", () => {
  renderAuditCards();

  const modal = document.getElementById("audit-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeAuditModal);
  }

  if (modal) {
    // Close when clicking outside modal box
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeAuditModal();
      }
    });
  }

  // Close when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeAuditModal();
    }
  });
});

// Helper function to return HTML for flag images using public flag CDN
function getFlagHTML(countryCode, countryName) {
  const code = countryCode.toLowerCase();
  return `<img src="https://flagcdn.com/w40/${code}.png" alt="${countryName} flag" class="country-flag-img">`;
}

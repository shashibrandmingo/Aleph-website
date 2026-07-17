/* ==========================================================================
   LATEST GOVERNMENT NOTIFICATIONS DATA & TIMELINE (notification-data.js)
   ========================================================================== */

// 1. Notifications Data Array - Easily append new notifications here!
const notificationsData = [
  {
    id: 1,
    ministryKey: "steel",
    ministryName: "Ministry of Steel",
    category: "QCO Update",
    title: "BIS Quality Control Order for Animal Feeds and Feed Ingredients (Measures for Supplementing Cattle Feeds)",
    desc: "The Ministry of Fisheries, Animal Husbandry and Dairying has issued a draft notification, known as the Animal Feeds and Feed Ingredients (Quality Control) Order, 2024. Stakeholders are invited to share feedback on these measures to regulate standard quality controls.",
    fullText: "The Ministry of Fisheries, Animal Husbandry and Dairying has issued a draft notification, known as the Animal Feeds and Feed Ingredients (Quality Control) Order, 2024.\n\nIn exercise of the powers conferred by the Bureau of Indian Standards (BIS) Act, this order mandates conformity with IS 2052 (Compounded Feeds for Cattle) to ensure appropriate nutritional value and chemical safety. All manufacturers must obtain the official ISI mark certification before placing products on the Indian market. Exceptions and transition periods are detailed in the gazette publication.",
    date: "16 Dec 2024",
    time: "11:30 AM",
    isNew: true,
    icon: "fa-solid fa-file-invoice",
    colorTheme: "blue"
  },
  {
    id: 2,
    ministryKey: "steel",
    ministryName: "Ministry of Steel",
    category: "WTO Update",
    title: "BIS Quality Control Order for Animal Feeds and Feed Ingredients (Oilcake as Livestock Feed Ingredient)",
    desc: "The Ministry of Fisheries, Animal Husbandry and Dairying has issued a draft notification, known as the Animal Feeds and Feed Ingredients (Quality Control) Order, 2024. This regulates import standards and local feed requirements.",
    fullText: "The Ministry of Fisheries, Animal Husbandry and Dairying has issued a draft notification, known as the Animal Feeds and Feed Ingredients (Quality Control) Order, 2024.\n\nThis specific addendum regulates feed parameters for Oilcake (cottonseed, groundnut, mustard, coconut, linseed, sesame, safflower, and soy meal) used as livestock feed ingredients under WTO standards. The order has been shared with member nations for trade impact analysis. Indian custom officials will verify compliance certificates matching IS standards.",
    date: "16 Dec 2024",
    time: "10:15 AM",
    isNew: true,
    icon: "fa-solid fa-globe",
    colorTheme: "green"
  },
  {
    id: 3,
    ministryKey: "steel",
    ministryName: "Ministry of Steel",
    category: "Notification",
    title: "Public Consultation on Draft QCO for Steel Products",
    desc: "The Ministry of Steel has released a draft Quality Control Order (QCO) for steel products. Stakeholders are invited to submit their comments and suggestions to regulate standard quality controls.",
    fullText: "The Ministry of Steel has released a draft Quality Control Order (QCO) for steel products. Stakeholders are invited to submit their comments and suggestions.\n\nThis order covers key structural steel parameters, plates, and wire products to align with BIS standard certifications. The implementation of this regulation aims to enforce high quality metrics in heavy constructions. Comments should be submitted within 45 days from the date of publishing.",
    date: "15 Dec 2024",
    time: "04:45 PM",
    isNew: true,
    icon: "fa-solid fa-bullhorn",
    colorTheme: "purple"
  },
  {
    id: 4,
    ministryKey: "textiles",
    ministryName: "Ministry of Textiles",
    category: "QCO Update",
    title: "Quality Control Order for Protective Textiles (Geotextiles & Fire-resistant Items)",
    desc: "The Ministry of Textiles has introduced quality control regulations for geotextiles, industrial fabrics, and safety gear to ensure compliance with quality regulations.",
    fullText: "The Ministry of Textiles has introduced quality control regulations for geotextiles, industrial fabrics, and safety gear.\n\nTo raise the standard quality index, these technical textiles must comply with IS 16391 (Geotextiles for filtration) and IS 15748 (Protective clothing against heat and flame). Foreign and domestic manufacturers must apply for BIS product licensing before distribution.",
    date: "12 Dec 2024",
    time: "09:00 AM",
    isNew: false,
    icon: "fa-solid fa-file-invoice",
    colorTheme: "blue"
  },
  {
    id: 5,
    ministryKey: "commerce",
    ministryName: "Ministry of Commerce & Industry",
    category: "WTO Update",
    title: "Technical Barriers to Trade (TBT) Notification on Household Electrical Appliances",
    desc: "The Department for Promotion of Industry and Internal Trade (DPIIT) notified the WTO of new safety limits on household cooking appliances to match safety parameters.",
    fullText: "The Department for Promotion of Industry and Internal Trade (DPIIT) notified the WTO of new safety limits on household cooking appliances.\n\nThe draft standards apply to microwave ovens, induction cookers, and heating plates, aligning them with IS 302 safety compliance. International manufacturers must register under the CRS scheme of BIS.",
    date: "10 Dec 2024",
    time: "02:30 PM",
    isNew: false,
    icon: "fa-solid fa-globe",
    colorTheme: "green"
  },
  {
    id: 6,
    ministryKey: "chemicals",
    ministryName: "Dept of Chemicals & Petrochemicals",
    category: "Notification",
    title: "Extension of Implementation Date for QCO on Polyethylene & Polyester Products",
    desc: "The Department of Chemicals and Petrochemicals has extended the enforcement timeline for quality control checks on imported polyethylene grades.",
    fullText: "The Department of Chemicals and Petrochemicals has extended the enforcement timeline for quality control checks on imported polyethylene grades.\n\nManufacturers get an extra 6 months to implement the testing infrastructure required by IS 7328 and IS 12247. Custom officials have been notified of this extension window.",
    date: "08 Dec 2024",
    time: "11:15 AM",
    isNew: false,
    icon: "fa-solid fa-bullhorn",
    colorTheme: "purple"
  },
  {
    id: 7,
    ministryKey: "heavy-ind",
    ministryName: "Ministry of Heavy Industries",
    category: "QCO Update",
    title: "Safety Standards for Heavy Machinery and Industrial Equipment",
    desc: "The Ministry of Heavy Industries mandates compliance tests for diesel engines, motor pumps, and structural turbines under ISI standards.",
    fullText: "The Ministry of Heavy Industries mandates compliance tests for diesel engines, motor pumps, and structural turbines.\n\nAll machinery placed in high-exposure operations must possess ISI markings. The QCO aims to minimize operational accidents and maintain high eco-safety standards.",
    date: "05 Dec 2024",
    time: "03:15 PM",
    isNew: false,
    icon: "fa-solid fa-file-invoice",
    colorTheme: "blue"
  },
  {
    id: 8,
    ministryKey: "mines",
    ministryName: "Ministry of Mines",
    category: "Notification",
    title: "Mandatory Quality Check on Aluminum and Copper Ingots",
    desc: "The Ministry of Mines has notified all custom houses that imported metal alloys and wire bars must match standard purity margins.",
    fullText: "The Ministry of Mines has notified all custom houses that imported metal alloys and wire bars must match standard purity margins.\n\nIn conformity with IS 206 for aluminum and IS 191 for copper, raw materials must undergo testing at BIS-approved laboratories before release.",
    date: "01 Dec 2024",
    time: "10:30 AM",
    isNew: false,
    icon: "fa-solid pointer-events-none fa-bullhorn",
    colorTheme: "purple"
  },
  {
    id: 9,
    ministryKey: "env",
    ministryName: "Ministry of Environment & Forests",
    category: "QCO Update",
    title: "Eco-Labeling and Biodegradability Rules for Single-use Plastic Alternatives",
    desc: "The Ministry of Environment, Forest & Climate Change introduces new certifications for compostable polymer materials.",
    fullText: "The Ministry of Environment, Forest & Climate Change introduces new certifications for compostable polymer materials.\n\nAlternative packagings must undergo certification matching IS 17088 (Specifications for compostable plastics) to be eligible for manufacturing permissions.",
    date: "28 Nov 2024",
    time: "04:15 PM",
    isNew: false,
    icon: "fa-solid fa-file-invoice",
    colorTheme: "blue"
  },
  {
    id: 10,
    ministryKey: "new-energy",
    ministryName: "Ministry of New & Renewable Energy",
    category: "WTO Update",
    title: "Quality Control Guidelines on Solar PV Modules & Inverters",
    desc: "The Ministry of New & Renewable Energy notifications declare safety testing parameters for critical grid photovoltaic equipment.",
    fullText: "The Ministry of New & Renewable Energy notifications declare safety testing parameters for critical grid photovoltaic equipment.\n\nUnder WTO trade guidelines, modules must pass IS 14286 standards. Custom clearances will only pass if products carry active registration serials.",
    date: "25 Nov 2024",
    time: "12:00 PM",
    isNew: false,
    icon: "fa-solid fa-globe",
    colorTheme: "green"
  }
];

// 2. Ministry Categories Mapping
const ministriesList = [
  { key: "all", name: "All Ministries", icon: "fa-solid fa-building-columns" },
  { key: "steel", name: "Ministry of Steel", icon: "fa-solid fa-industry" },
  { key: "textiles", name: "Ministry of Textiles", icon: "fa-solid fa-scissors" },
  { key: "commerce", name: "Ministry of Commerce & Industry", icon: "fa-solid fa-briefcase" },
  { key: "chemicals", name: "Dept of Chemicals & Petrochemicals", icon: "fa-solid fa-flask" },
  { key: "heavy-ind", name: "Ministry of Heavy Industries", icon: "fa-solid fa-gears" },
  { key: "mines", name: "Ministry of Mines", icon: "fa-solid fa-gem" },
  { key: "env", name: "Ministry of Env, Forest & Climate Change", icon: "fa-solid fa-leaf" },
  { key: "new-energy", name: "Ministry of New & Renewable Energy", icon: "fa-solid fa-sun" }
];

// Pagination & Filtering State variables
let currentMinistry = "all";
let searchQuery = "";
let currentPage = 1;
const itemsPerPage = 4; // Display 4 cards per page

// Bookmarked / Saved Items set
let savedNotifications = new Set();

// 3. Render Sidebar List
function renderSidebar() {
  const sidebarContainer = document.getElementById("notif-ministry-list");
  if (!sidebarContainer) return;

  sidebarContainer.innerHTML = "";

  ministriesList.forEach(min => {
    // Calculate counts matching filters
    const count = min.key === "all" 
      ? notificationsData.length 
      : notificationsData.filter(n => n.ministryKey === min.key).length;

    const isActive = currentMinistry === min.key ? "active" : "";

    const itemHTML = `
      <li class="notif-ministry-item ${isActive}" onclick="filterByMinistry('${min.key}')">
        <div class="notif-ministry-item-left">
          <i class="${min.icon}"></i>
          <span>${min.name}</span>
        </div>
        <span class="badge">${min.key === "all" ? "All" : count}</span>
      </li>
    `;
    sidebarContainer.innerHTML += itemHTML;
  });
}

// 4. Render Grid Cards & Pagination
function renderNotifications() {
  const cardsContainer = document.getElementById("notif-cards-wrapper");
  const countLabel = document.getElementById("notif-results-count");
  const paginationContainer = document.getElementById("notif-pagination");

  if (!cardsContainer || !countLabel || !paginationContainer) return;

  // Filter dataset by search input and ministry selection
  let filteredData = notificationsData.filter(item => {
    const matchesMinistry = currentMinistry === "all" || item.ministryKey === currentMinistry;
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ministryName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesMinistry && matchesSearch;
  });

  // Calculate pages
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  // Slice list
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = Math.min(startIdx + itemsPerPage, totalItems);
  const pageItems = filteredData.slice(startIdx, endIdx);

  // Update counts
  if (totalItems === 0) {
    countLabel.innerText = "No notifications found";
  } else {
    countLabel.innerText = `Showing ${startIdx + 1} to ${endIdx} of ${totalItems} notifications`;
  }

  // Render cards
  cardsContainer.innerHTML = "";
  if (pageItems.length === 0) {
    cardsContainer.innerHTML = `
      <div class="notif-empty-state">
        <i class="fa-solid fa-magnifying-glass-minus"></i>
        <p>No results match your search parameters. Try adjusting filters.</p>
      </div>
    `;
  } else {
    pageItems.forEach(item => {
      const isSavedClass = savedNotifications.has(item.id) ? "saved" : "";
      const bookmarkIcon = savedNotifications.has(item.id) ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark";
      const newBadgeHTML = item.isNew ? `<span class="notif-status-badge theme-${item.colorTheme}">New</span>` : "";

      const cardHTML = `
        <div class="notif-timeline-item fade-in">

          <!-- Timeline Column: vertical line + coloured dot -->
          <div class="notif-timeline-col">
            <div class="notif-dot dot-${item.colorTheme}"></div>
          </div>

          <!-- Card -->
          <div class="notif-card theme-${item.colorTheme}">

            <!-- Left Icon Box -->
            <div class="notif-icon-box">
              <i class="${item.icon}"></i>
            </div>

            <!-- Central Text block -->
            <div class="notif-content-block">
              <span class="notif-category-tag">${item.category}</span>
              <h3 class="notif-card-title">${item.title}</h3>
              <p class="notif-card-desc">${item.desc}</p>
              <a href="javascript:void(0)" class="notif-read-more" onclick="openDetailsModal(${item.id})">
                Read More <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            <!-- Right Meta column -->
            <div class="notif-meta-block">
              <button class="notif-bookmark-btn ${isSavedClass}" onclick="toggleBookmark(${item.id})" aria-label="Bookmark notification">
                <i class="${bookmarkIcon}"></i>
              </button>
              <span class="notif-meta-item">
                <i class="fa-regular fa-calendar"></i> ${item.date}
              </span>
              <span class="notif-meta-item">
                <i class="fa-regular fa-clock"></i> ${item.time}
              </span>
              ${newBadgeHTML}
            </div>
          </div>
        </div>
      `;
      cardsContainer.innerHTML += cardHTML;
    });
  }

  // Render pagination controls
  paginationContainer.innerHTML = "";
  if (totalPages > 1) {
    // Back button
    const prevDisabled = currentPage === 1 ? "disabled" : "";
    paginationContainer.innerHTML += `
      <button class="notif-page-btn" ${prevDisabled} onclick="changePage(${currentPage - 1})">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    `;

    for (let p = 1; p <= totalPages; p++) {
      const activeClass = currentPage === p ? "active" : "";
      paginationContainer.innerHTML += `
        <button class="notif-page-btn ${activeClass}" onclick="changePage(${p})">${p}</button>
      `;
    }

    // Forward button
    const nextDisabled = currentPage === totalPages ? "disabled" : "";
    paginationContainer.innerHTML += `
      <button class="notif-page-btn" ${nextDisabled} onclick="changePage(${currentPage + 1})">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    `;
  }
}

// 5. Actions / Filter Functions
window.filterByMinistry = function(key) {
  currentMinistry = key;
  currentPage = 1;
  renderSidebar();
  renderNotifications();
};

window.changePage = function(pageNumber) {
  currentPage = pageNumber;
  renderNotifications();
  // Scroll to top of timeline container
  const mainSec = document.querySelector(".notification-main-section");
  if (mainSec) {
    mainSec.scrollIntoView({ behavior: "smooth" });
  }
};

window.toggleBookmark = function(id) {
  if (savedNotifications.has(id)) {
    savedNotifications.delete(id);
  } else {
    savedNotifications.add(id);
  }
  renderNotifications();
};

// 6. Modal details overlay setup
window.openDetailsModal = function(id) {
  const item = notificationsData.find(n => n.id === id);
  if (!item) return;

  // Check if modal containers already exist in DOM, if not create dynamically
  let detailsModal = document.getElementById("notif-details-modal");
  if (!detailsModal) {
    detailsModal = document.createElement("div");
    detailsModal.id = "notif-details-modal";
    detailsModal.className = "details-modal-overlay";
    
    // Inject styling directly or let layout css manage it. We'll add markup.
    detailsModal.innerHTML = `
      <div class="details-modal-box">
        <button class="details-modal-close" onclick="closeDetailsModal()">&times;</button>
        <div class="details-modal-header">
          <span class="modal-tag" id="modal-item-tag"></span>
          <span class="modal-ministry" id="modal-item-ministry"></span>
        </div>
        <h3 class="details-modal-title" id="modal-item-title"></h3>
        <div class="details-modal-meta">
          <span><i class="fa-regular fa-calendar"></i> <span id="modal-item-date"></span></span>
          <span><i class="fa-regular fa-clock"></i> <span id="modal-item-time"></span></span>
        </div>
        <div class="details-modal-body" id="modal-item-body"></div>
      </div>
    `;
    document.body.appendChild(detailsModal);

    // Style for details-modal-overlay dynamically in CSS later, but let's declare basics for safety:
    const style = document.createElement("style");
    style.innerHTML = `
      .details-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(15, 23, 42, 0.7);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease;
      }
      .details-modal-overlay.active {
        opacity: 1;
        pointer-events: auto;
      }
      .details-modal-box {
        background-color: #ffffff;
        border-radius: 20px;
        width: 90%;
        max-width: 650px;
        padding: 2rem;
        box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        position: relative;
        transform: scale(0.95);
        transition: transform 0.25s ease;
      }
      .details-modal-overlay.active .details-modal-box {
        transform: scale(1);
      }
      .details-modal-close {
        position: absolute;
        top: 1rem;
        right: 1.25rem;
        background: transparent;
        border: none;
        font-size: 2rem;
        color: #94a3b8;
        cursor: pointer;
        line-height: 1;
      }
      .details-modal-close:hover {
        color: #ef4444;
      }
      .details-modal-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
      }
      .modal-tag {
        font-family: var(--font-secondary), sans-serif;
        font-size: 0.7rem;
        font-weight: 800;
        text-transform: uppercase;
        padding: 0.15rem 0.5rem;
        border-radius: 4px;
        letter-spacing: 0.05em;
      }
      .theme-blue .modal-tag { background-color: #eff6ff; color: #2563eb; }
      .theme-green .modal-tag { background-color: #f0fdf4; color: #16a34a; }
      .theme-purple .modal-tag { background-color: #faf5ff; color: #9333ea; }
      
      .modal-ministry {
        font-family: var(--font-secondary), sans-serif;
        font-size: 0.75rem;
        font-weight: 600;
        color: #64748b;
      }
      .details-modal-title {
        font-family: var(--font-primary), sans-serif;
        font-size: 1.15rem;
        font-weight: 800;
        color: #0f172a;
        line-height: 1.35;
        margin: 0 0 1rem 0;
      }
      .details-modal-meta {
        display: flex;
        gap: 1rem;
        color: #64748b;
        font-family: var(--font-secondary), sans-serif;
        font-size: 0.75rem;
        margin-bottom: 1.25rem;
        border-bottom: 1px solid #e2e8f0;
        padding-bottom: 0.75rem;
      }
      .details-modal-meta i {
        color: #94a3b8;
      }
      .details-modal-body {
        font-family: var(--font-secondary), sans-serif;
        font-size: 0.85rem;
        color: #475569;
        line-height: 1.6;
        white-space: pre-line;
      }
    `;
    document.head.appendChild(style);
  }

  // Populate data
  document.getElementById("modal-item-tag").innerText = item.category;
  document.getElementById("modal-item-ministry").innerText = item.ministryName;
  document.getElementById("modal-item-title").innerText = item.title;
  document.getElementById("modal-item-date").innerText = item.date;
  document.getElementById("modal-item-time").innerText = item.time;
  document.getElementById("modal-item-body").innerText = item.fullText;

  // Set style themes
  const modalBox = detailsModal.querySelector(".details-modal-box");
  modalBox.className = `details-modal-box theme-${item.colorTheme}`;

  // Open modal
  detailsModal.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeDetailsModal = function() {
  const detailsModal = document.getElementById("notif-details-modal");
  if (detailsModal) {
    detailsModal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

// Event Listeners setup
document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  renderNotifications();

  // Search input handler
  const searchInput = document.getElementById("notif-search-input");
  const searchBtn = document.getElementById("notif-search-btn");

  const runSearch = () => {
    if (searchInput) {
      searchQuery = searchInput.value;
      currentPage = 1;
      renderNotifications();
    }
  };

  if (searchBtn) {
    searchBtn.addEventListener("click", runSearch);
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        runSearch();
      }
    });
  }

  // Close details modal on esc or background click
  document.addEventListener("click", (e) => {
    const modal = document.getElementById("notif-details-modal");
    if (modal && e.target === modal) {
      closeDetailsModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDetailsModal();
    }
  });
});

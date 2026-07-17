/* ==========================================================================
   IMAGE GALLERY DATA & FILTERING SYSTEM (gallery-data.js)
   ========================================================================== */

// 1. Categories / Filter Tabs Configuration - Add, edit, or remove tabs easily!
const categoriesData = [
  { id: "all", label: "All Photos", icon: "fa-solid fa-grip" },
  { id: "meetings", label: "Client Meetings", icon: "fa-solid fa-user-group" },
  { id: "events", label: "Team Events", icon: "fa-solid fa-users-gear" },
  { id: "celebrations", label: "Celebrations", icon: "fa-solid fa-champagne-glasses" },
  { id: "achievements", label: "Achievements", icon: "fa-solid fa-trophy" },
  { id: "workplace", label: "Workplace", icon: "fa-solid fa-building" }
];

// 2. Gallery Photos Data Array - Change images, titles, years, or categories easily!
const galleryItems = [
  {
    id: 1,
    category: "celebrations",
    title: "Annual Celebration 2024",
    image: "image/image-gallery/may_2026.webp",
    icon: "fa-solid fa-calendar-days"
  },
  {
    id: 2,
    category: "meetings",
    title: "Client Meeting",
    image: "image/image-gallery/may_2026.webp",
    icon: "fa-solid fa-user-group"
  },
  {
    id: 3,
    category: "events",
    title: "Team Gathering",
    image: "image/image-gallery/may_2026.webp",
    icon: "fa-solid fa-users"
  },
  {
    id: 4,
    category: "events",
    title: "Annual Offsite 2024",
    image: "image/image-gallery/may_2026.webp",
    icon: "fa-solid fa-building"
  },
  {
    id: 5,
    category: "celebrations",
    title: "Independence Day Celebration",
    image: "image/image-gallery/may_2026.webp",
    icon: "fa-solid fa-flag"
  },
  {
    id: 6,
    category: "achievements",
    title: "Excellence Award",
    image: "image/image-gallery/may_2026.webp",
    icon: "fa-solid fa-trophy"
  },
  {
    id: 7,
    category: "meetings",
    title: "Audit Completion",
    image: "image/image-gallery/may_2026.webp",
    icon: "fa-solid fa-shield-halved"
  },
  {
    id: 8,
    category: "workplace",
    title: "Our Team",
    image: "image/image-gallery/may_2026.webp",
    icon: "fa-solid fa-user-tie"
  },
  {
    id: 9,
    category: "celebrations",
    title: "Holi Celebration",
    image: "image/image-gallery/may_2026.webp",
    icon: "fa-solid fa-wand-magic-sparkles"
  }
];

let activeCategory = "all";

// 3. Render Filter Tabs Dynamically
function renderTabs() {
  const tabsContainer = document.getElementById("gallery-tabs-container");
  if (!tabsContainer) return;

  tabsContainer.innerHTML = ""; // Clear placeholders

  categoriesData.forEach(tab => {
    const isActive = tab.id === activeCategory ? "active" : "";
    const tabHTML = `
      <button class="gallery-tab-btn ${isActive}" data-category="${tab.id}">
        <i class="${tab.icon}"></i>
        <span>${tab.label}</span>
      </button>
    `;
    tabsContainer.innerHTML += tabHTML;
  });

  // Attach click listeners to tabs
  const tabButtons = tabsContainer.querySelectorAll(".gallery-tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active status
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter grid
      activeCategory = btn.getAttribute("data-category");
      filterGalleryGrid();
    });
  });
}

// 4. Filter and Render Photo Grid Cards
function filterGalleryGrid() {
  const gridContainer = document.getElementById("gallery-photos-grid");
  if (!gridContainer) return;

  // Filter items
  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  // Apply smooth fade transition effect
  gridContainer.style.opacity = "0.2";
  gridContainer.style.transform = "translateY(5px)";

  setTimeout(() => {
    gridContainer.innerHTML = ""; // Clear existing grid cards

    if (filteredItems.length === 0) {
      gridContainer.innerHTML = `
        <div class="gallery-empty-state">
          <i class="fa-regular fa-image"></i>
          <p>No photos available in this category yet.</p>
        </div>
      `;
    } else {
      filteredItems.forEach(item => {
        const cardHTML = `
          <div class="gallery-photo-card fade-in">
            <div class="gallery-photo-img-wrapper">
              <img src="${item.image}" alt="${item.title}" class="gallery-photo-img">
              <div class="gallery-photo-tag-overlay">
                <div class="tag-icon-circle">
                  <i class="${item.icon}"></i>
                </div>
                <div class="tag-text-block">
                  <h5>${item.title}</h5>
                  
                </div>
              </div>
            </div>
          </div>
        `;
        gridContainer.innerHTML += cardHTML;
      });
    }

    // Restore opacity and slide up
    gridContainer.style.opacity = "1";
    gridContainer.style.transform = "translateY(0)";
  }, 200);
}

// 5. Initialize gallery on load
document.addEventListener("DOMContentLoaded", () => {
  renderTabs();
  filterGalleryGrid();
});

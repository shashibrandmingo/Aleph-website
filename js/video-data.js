/* ==========================================================================
   VIDEOS & TUTORIALS DATA & LIGHTBOX SYSTEM (video-data.js)
   ========================================================================== */

// 1. Videos Data Array - Easily add, edit, or remove videos here!
const videosData = [
  {
    id: 1,
    title: "BIS Certification Made Simple",
    desc: "Understand the basics of BIS certification and its importance for your business.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "22:15",
    thumbTitle: "BIS CERTIFICATION",
    thumbSub: "MADE SIMPLE"
  },
  {
    id: 2,
    title: "BIS Registration Process Explained",
    desc: "Step-by-step overview of the BIS registration process for manufacturers.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "20:42",
    thumbTitle: "BIS REGISTRATION",
    thumbSub: "PROCESS EXPLAINED"
  },
  {
    id: 3,
    title: "IS Mark Certification - A Complete Guide",
    desc: "Learn about ISI Mark certification, requirements, and key benefits.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "20:31",
    thumbTitle: "IS MARK CERTIFICATION",
    thumbSub: "A COMPLETE GUIDE"
  },
  {
    id: 4,
    title: "Product Testing and Lab Requirements",
    desc: "Know about BIS approved labs, testing process, and documentation.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "16:08",
    thumbTitle: "PRODUCT TESTING",
    thumbSub: "AND LAB REQUIREMENTS"
  },
  {
    id: 5,
    title: "Quality Control Order (QCO) Explained",
    desc: "Detailed discussion on QCO, certification process, and compliance requirements.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "19:27",
    thumbTitle: "QUALITY CONTROL ORDER",
    thumbSub: "(QCO) EXPLAINED"
  },
  {
    id: 6,
    title: "BIS Scheme-I Certification Overview",
    desc: "An overview of Scheme-I certification and product conformity assessment.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "15:36",
    thumbTitle: "BIS SCHEME-I",
    thumbSub: "CERTIFICATION OVERVIEW"
  },
  {
    id: 7,
    title: "Compliance and Legal Requirements",
    desc: "Understand the legal framework and compliance for BIS certified products.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "21:14",
    thumbTitle: "COMPLIANCE AND",
    thumbSub: "LEGAL REQUIREMENTS"
  },
  {
    id: 8,
    title: "BIS Certificate Validity & Renewal Process",
    desc: "Learn how to renew your BIS certificate and maintain compliance.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "14:52",
    thumbTitle: "BIS CERTIFICATE",
    thumbSub: "VALIDITY & RENEWAL"
  },
  {
    id: 9,
    title: "How to Apply for BIS Certificate Online",
    desc: "Step-by-step guide to applying for BIS certificate through the online portal.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "17:45",
    thumbTitle: "HOW TO APPLY FOR",
    thumbSub: "BIS CERTIFICATE ONLINE"
  },
  {
    id: 10,
    title: "Documentation Requirements for BIS",
    desc: "List of essential documents required for various BIS certification schemes.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "13:33",
    thumbTitle: "DOCUMENTATION",
    thumbSub: "REQUIREMENTS FOR BIS"
  },
  {
    id: 11,
    title: "BIS for Imported Products",
    desc: "Requirements and process for obtaining BIS certification for imported products.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "16:20",
    thumbTitle: "BIS FOR IMPORTED",
    thumbSub: "PRODUCTS"
  },
  {
    id: 12,
    title: "Webinar: BIS Standards for Electronics",
    desc: "Expert webinar on BIS standards applicable to electronic products.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "28:35",
    thumbTitle: "WEBINAR",
    thumbSub: "BIS ELECTRONICS STANDARDS"
  },
  {
    id: 13,
    title: "FMCS Certification Process",
    desc: "Complete guide on Foreign Manufacturers Certification Scheme (FMCS) of BIS.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "18:40",
    thumbTitle: "FMCS CERTIFICATION",
    thumbSub: "COMPLETE PROCESS"
  },
  {
    id: 14,
    title: "Market Surveillance & Enforcement",
    desc: "How BIS conducts market surveillance and enforces quality control orders.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "12:15",
    thumbTitle: "MARKET SURVEILLANCE",
    thumbSub: "& ENFORCEMENT"
  },
  {
    id: 15,
    title: "Standardization in Digital Era",
    desc: "BIS initiatives in standardizing emerging digital technologies.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "25:10",
    thumbTitle: "STANDARDIZATION IN",
    thumbSub: "THE DIGITAL ERA"
  },
  {
    id: 16,
    title: "Quality Ecosystem of India",
    desc: "Webinar on strengthening the national standards and quality ecosystem.",
    youtubeId: "iRvmQ3zOmRI",
    duration: "30:15",
    thumbTitle: "QUALITY ECOSYSTEM",
    thumbSub: "OF INDIA WEBINAR"
  }
];

// 2. Rendering Function - Automatically generates the HTML grid from the videosData array
function renderVideosGrid() {
  const gridContainer = document.getElementById("videos-grid");
  if (!gridContainer) return;

  gridContainer.innerHTML = ""; // Clear placeholders

  videosData.forEach(video => {
    // We build a beautifully styled card.
    // If the user uploads thumbnails, they can map them, else CSS creates the exact mockup layout representation!
    const cardHTML = `
      <div class="video-card" onclick="openVideoModal('${video.youtubeId}', '${video.title}')">
        <div class="video-thumb-wrapper">
          <img class="video-thumb-img" src="https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg" alt="${video.title}">
          <div class="video-play-overlay">
            <div class="video-play-icon">
              <i class="fa-solid fa-play"></i>
            </div>
          </div>
          <div class="video-duration-badge">${video.duration}</div>
        </div>
        <div class="video-card-body">
          <h4>${video.title}</h4>
          <p>${video.desc}</p>
        </div>
      </div>
    `;
    gridContainer.innerHTML += cardHTML;
  });
}

// 3. Video Modal Control Functions
function openVideoModal(youtubeId, title) {
  const modal = document.getElementById("video-modal");
  const iframe = document.getElementById("video-iframe");
  const modalTitle = document.getElementById("video-modal-title");

  if (!modal || !iframe || !modalTitle) return;

  // Load YouTube link with autoplay enabled
  iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
  modalTitle.innerText = title;

  // Open modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Disable scroll
}

function closeVideoModal() {
  const modal = document.getElementById("video-modal");
  const iframe = document.getElementById("video-iframe");

  if (!modal || !iframe) return;

  modal.classList.remove("active");
  iframe.src = ""; // Unload video source to stop sound immediately
  document.body.style.overflow = ""; // Enable scroll
}

// Setup Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  renderVideosGrid();

  const modal = document.getElementById("video-modal");
  const closeBtn = document.getElementById("video-modal-close");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeVideoModal);
  }

  if (modal) {
    // Close when clicking background outside iframe player box
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeVideoModal();
      }
    });
  }

  // Close when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeVideoModal();
    }
  });
});

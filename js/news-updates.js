/* ==========================================================================
   NEWS & UPDATES - INTERACTIVE PAGINATION & CATEGORY FILTERING
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const pagePills = document.querySelectorAll('.pagination-page-pill');
  const paginationInfo = document.querySelector('.pagination-info-text');
  const newsList = document.querySelector('.news-horizontal-list');
  const categoryItems = document.querySelectorAll('.category-list-item');

  if (!newsList) return;

  // Mock News Data for Page Switching
  const newsDatabase = {
    1: [
      {
        badge: 'BIS',
        img: 'image/blog-listing/blog-1.png',
        title: 'DPIIT Notifies Transition Facilitation (Quality Control) Order, 2026 to enhance India\'s manufacturing ecosystem',
        desc: 'The Department for Promotion of Industry and Internal Trade (DPIIT), in the Ministry of Commerce and Industry, has announced the Transition Facilitation (Quality Control) Order...',
        readTime: '2 Min Read',
        date: '26 Jun 2026'
      },
      {
        badge: 'ISI Mark',
        img: 'image/blog-listing/blog-2.png',
        title: 'CML Number Check - How to Check Online Original ISI CML Number ?',
        desc: 'BIS has issued a new update related to the CML number. Learn how to verify it and get a step-by-step guide to confirm the original licence number of any product...',
        readTime: '2 Min Read',
        date: '10 Jun 2026'
      },
      {
        badge: 'BIS',
        img: 'image/blog-listing/blog-3.png',
        title: 'ALL INDIA FIRST LICENCE for IS 405 (Part 1): 1992',
        desc: 'Aleph INDIA has become India\'s first consulting firm to achieve the \'ALL INDIA FIRST LICENCE for IS 405 (Part 1): 1992\' for its esteemed client. This significant achievement...',
        readTime: '2 Min Read',
        date: '06 Jun 2026'
      }
    ],
    2: [
      {
        badge: 'CDSCO',
        img: 'image/blog-listing/blog-4.png',
        title: 'CDSCO Medical Device Regulatory Amendments 2026',
        desc: 'Central Drugs Standard Control Organisation releases updated compliance mandate for Class B & Class C medical equipment manufacturing and import approvals...',
        readTime: '3 Min Read',
        date: '02 Jun 2026'
      },
      {
        badge: 'WPC',
        img: 'image/blog-listing/blog-1.png',
        title: 'WPC Wireless Planning Committee Clearance Process',
        desc: 'Simplified ETA approval guidelines published by the Ministry of Communications for Bluetooth, Wi-Fi, and IoT wireless products in India...',
        readTime: '4 Min Read',
        date: '28 May 2026'
      },
      {
        badge: 'E-Waste',
        img: 'image/blog-listing/blog-2.png',
        title: 'E-Waste Management Rules 2026 - Extended Producer Responsibility (EPR)',
        desc: 'Central Pollution Control Board mandates strict digital target tracking for electronic hardware importers under new EPR guidelines...',
        readTime: '3 Min Read',
        date: '20 May 2026'
      }
    ],
    3: [
      {
        badge: 'CE Mark',
        img: 'image/blog-listing/blog-3.png',
        title: 'CE Marking Guidelines for Exporting Electrical Goods to European Union',
        desc: 'Comprehensive compliance roadmap for Indian manufacturers targeting EU export markets with mandatory CE safety standards...',
        readTime: '5 Min Read',
        date: '15 May 2026'
      },
      {
        badge: 'Hallmark',
        img: 'image/blog-listing/blog-4.png',
        title: 'Mandatory Precious Metal Hallmarking Enforcement Guidelines',
        desc: 'Bureau of Indian Standards updates HUID registration protocols for gold and silver jewelers across tier-1 and tier-2 cities...',
        readTime: '2 Min Read',
        date: '08 May 2026'
      },
      {
        badge: 'BIS',
        img: 'image/blog-listing/blog-1.png',
        title: 'Revised Quality Control Orders (QCO) for Steel Products',
        desc: 'Ministry of Steel extends compliance deadline while enforcing mandatory BIS certification for structural steel imports...',
        readTime: '3 Min Read',
        date: '01 May 2026'
      }
    ]
  };

  let currentPage = 1;

  function renderPage(pageNumber) {
    currentPage = pageNumber;
    const pageCards = newsDatabase[pageNumber] || newsDatabase[1];

    // Remove existing card elements
    const existingCards = newsList.querySelectorAll('.horizontal-news-card');
    existingCards.forEach(card => card.remove());

    // Render new cards
    pageCards.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'horizontal-news-card';
      article.style.animation = `fadeInUp 0.35s ease forwards ${index * 0.08}s`;

      article.innerHTML = `
        <div class="card-thumbnail-side">
            <span class="card-red-badge">${item.badge}</span>
            <img src="${item.img}" alt="${item.title}" class="card-thumbnail-img">
        </div>
        <div class="card-content-side">
            <h3 class="horizontal-news-title">${item.title}</h3>
            <p class="horizontal-news-desc">${item.desc}</p>
            <div class="card-bottom-meta-row">
                <a href="#" class="card-read-more-link">
                    <span>Read More</span>
                    <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
                <div class="card-time-date-meta">
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 16 14"></polyline></svg>
                        <span>${item.readTime}</span>
                    </div>
                    <div class="meta-item">
                        <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span>${item.date}</span>
                    </div>
                </div>
            </div>
        </div>
      `;

      // Insert before pagination wrapper
      const paginationWrapper = newsList.querySelector('.news-pagination-wrapper');
      newsList.insertBefore(article, paginationWrapper);
    });

    // Update pagination info text
    const startCount = (pageNumber - 1) * 3 + 1;
    const endCount = startCount + pageCards.length - 1;
    if (paginationInfo) {
      paginationInfo.textContent = `Showing ${startCount} to ${endCount} of 120 updates`;
    }

    // Scroll smoothly to top of news section
    const newsSection = document.querySelector('.news-updates-2nd-section');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Handle Pagination Clicks
  pagePills.forEach((pill) => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const pageText = pill.textContent.trim();

      if (pill.getAttribute('aria-label') === 'Next Page' || pageText.includes('→')) {
        const nextPage = currentPage < 3 ? currentPage + 1 : 1;
        updateActivePill(nextPage);
        renderPage(nextPage);
        return;
      }

      const pageNum = parseInt(pageText, 10);
      if (!isNaN(pageNum)) {
        updateActivePill(pageNum);
        renderPage(pageNum <= 3 ? pageNum : ((pageNum - 1) % 3) + 1);
      }
    });
  });

  function updateActivePill(activeNum) {
    pagePills.forEach((p) => {
      p.classList.remove('active');
      const val = parseInt(p.textContent.trim(), 10);
      if (val === activeNum) {
        p.classList.add('active');
      }
    });
  }

  // Sidebar Category Filter Clicks
  categoryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      categoryItems.forEach(c => c.classList.remove('active'));
      item.classList.add('active');
      renderPage(1);
      updateActivePill(1);
    });
  });
});

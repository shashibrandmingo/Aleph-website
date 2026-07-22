/* ==========================================================================
   WEBINARS & SEMINARS - INTERACTIVE LOAD MORE & YOUTUBE MODAL SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const videoModal = document.getElementById('youtubeVideoModal');
  const closeBtn = document.getElementById('closeVideoModal');
  const iframe = document.getElementById('youtubeIframe');

  // Helper to open modal for video card
  function openVideoModal(videoId) {
    if (!videoModal || !iframe) return;
    const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.setAttribute('src', embedUrl);
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Attach click listener to video cards
  function attachVideoClickHandlers() {
    const videoCards = document.querySelectorAll('.js-play-video:not(.js-bound)');
    videoCards.forEach(card => {
      card.classList.add('js-bound');
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const videoId = card.getAttribute('data-video-id') || 'M7lc1UVf-VE';
        openVideoModal(videoId);
      });
    });
  }

  attachVideoClickHandlers();

  // Close Video Modal Function
  function closeModal() {
    if (!videoModal || !iframe) return;
    videoModal.classList.remove('active');
    iframe.setAttribute('src', '');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- DYNAMIC LOAD MORE UPCOMING WEBINARS (3 MORE CARDS) ---
  const btnLoadUpcoming = document.getElementById('btnLoadUpcoming');
  const upcomingCardsGrid = document.getElementById('upcomingCardsGrid');

  if (btnLoadUpcoming && upcomingCardsGrid) {
    let upcomingLoaded = false;

    const extraUpcomingData = [
      {
        month: 'AUG',
        day: '05',
        img: 'image/blog-listing/blog-4.png',
        title: 'QCO & BIS Mandatory Certification Standards',
        subtitle: 'Key Guidelines for Chemical & Electrical Manufacturers',
        time: '02:00 PM - 03:30 PM IST',
        speakerImg: 'author/author-1.png',
        speakerName: 'Dr. Alok Verma',
        speakerRole: 'Regulatory Lead'
      },
      {
        month: 'AUG',
        day: '18',
        img: 'image/blog-listing/blog-1.png',
        title: 'WPC ETA Wireless & Telecom Approvals',
        subtitle: 'Navigating Frequency Approvals in India',
        time: '11:00 AM - 12:30 PM IST',
        speakerImg: 'author/author-2.png',
        speakerName: 'Ms. Priya Soni',
        speakerRole: 'Telecom Compliance Expert'
      },
      {
        month: 'SEP',
        day: '02',
        img: 'image/blog-listing/blog-2.png',
        title: 'Medical Devices CDSCO Licensing Masterclass',
        subtitle: 'Streamlining Import & Class A-D Registrations',
        time: '04:00 PM - 05:30 PM IST',
        speakerImg: 'author/author-3.png',
        speakerName: 'Mr. Rajesh Kumar',
        speakerRole: 'CDSCO Specialist'
      }
    ];

    btnLoadUpcoming.addEventListener('click', (e) => {
      e.preventDefault();
      if (upcomingLoaded) {
        // Toggle view less
        const newCards = upcomingCardsGrid.querySelectorAll('.extra-upcoming-card');
        newCards.forEach(c => c.remove());
        btnLoadUpcoming.textContent = 'View All Upcoming Sessions →';
        upcomingLoaded = false;
        return;
      }

      extraUpcomingData.forEach(item => {
        const cardHtml = `
          <article class="upcoming-card extra-upcoming-card" style="animation: fadeInUp 0.4s ease forwards;">
              <div class="upcoming-card-cover">
                  <div class="date-badge-box">
                      <span class="date-month">${item.month}</span>
                      <span class="date-day">${item.day}</span>
                  </div>
                  <img src="${item.img}" alt="${item.title}">
              </div>
              <div class="upcoming-card-body">
                  <h3 class="upcoming-title">${item.title}</h3>
                  <p class="upcoming-subtitle">${item.subtitle}</p>

                  <div class="upcoming-meta-row">
                      <div class="meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          <span>${item.time}</span>
                      </div>
                      <div class="meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                          <span>Live Webinar</span>
                      </div>
                  </div>

                  <div class="speaker-profile-row">
                      <img src="${item.speakerImg}" alt="${item.speakerName}" class="speaker-avatar" onerror="this.src='image/fab-iocn.png'">
                      <div class="speaker-info">
                          <span class="speaker-name">${item.speakerName}</span>
                          <span class="speaker-role">${item.speakerRole}</span>
                      </div>
                  </div>

                  <a href="Contact-US.html" class="btn-register-card">
                      <span>Register Now</span>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
              </div>
          </article>
        `;
        upcomingCardsGrid.insertAdjacentHTML('beforeend', cardHtml);
      });

      btnLoadUpcoming.textContent = 'Show Less Upcoming Sessions ↑';
      upcomingLoaded = true;
    });
  }

  // --- DYNAMIC LOAD MORE PAST WEBINARS (4 MORE VIDEO CARDS) ---
  const btnLoadPast = document.getElementById('btnLoadPast');
  const pastCardsGrid = document.getElementById('pastCardsGrid');

  if (btnLoadPast && pastCardsGrid) {
    let pastLoaded = false;

    const extraPastData = [
      {
        videoId: 'M7lc1UVf-VE',
        img: 'image/blog-listing/blog-3.png',
        title: 'Global Supply Chain Risks & Mitigation Strategies',
        duration: '42:15',
        date: 'Jan 15, 2024'
      },
      {
        videoId: 'eng6x3K6fLg',
        img: 'image/blog-listing/blog-4.png',
        title: 'CE Marking & European Union Conformity Directives',
        duration: '56:20',
        date: 'Dec 10, 2023'
      },
      {
        videoId: 'L_LUpnjgPso',
        img: 'image/blog-listing/blog-1.png',
        title: 'Cross-Border E-Commerce Tariff & Tax Regulations',
        duration: '39:45',
        date: 'Nov 28, 2023'
      },
      {
        videoId: 'YQHsXMglC9A',
        img: 'image/blog-listing/blog-2.png',
        title: 'ISO 9001 & ISO 13485 Quality Audit Best Practices',
        duration: '47:30',
        date: 'Oct 14, 2023'
      }
    ];

    btnLoadPast.addEventListener('click', (e) => {
      e.preventDefault();
      if (pastLoaded) {
        // Toggle view less
        const newCards = pastCardsGrid.querySelectorAll('.extra-past-card');
        newCards.forEach(c => c.remove());
        btnLoadPast.textContent = 'View All Past Sessions →';
        pastLoaded = false;
        return;
      }

      extraPastData.forEach(item => {
        const cardHtml = `
          <article class="past-card js-play-video extra-past-card" data-video-id="${item.videoId}" style="animation: fadeInUp 0.4s ease forwards;">
              <div class="past-card-cover">
                  <img src="${item.img}" alt="${item.title}">
                  <div class="play-button-overlay">
                      <div class="play-circle-badge">
                          <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      </div>
                  </div>
                  <span class="video-duration-badge">${item.duration}</span>
              </div>
              <div class="past-card-body">
                  <h3 class="past-title">${item.title}</h3>
                  <div class="past-footer-meta">
                      <span class="past-date">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                          ${item.date}
                      </span>
                      <span class="watch-now-btn">Watch Now →</span>
                  </div>
              </div>
          </article>
        `;
        pastCardsGrid.insertAdjacentHTML('beforeend', cardHtml);
      });

      // Bind click handlers to newly inserted video cards
      attachVideoClickHandlers();

      btnLoadPast.textContent = 'Show Less Past Sessions ↑';
      pastLoaded = true;
    });
  }
});

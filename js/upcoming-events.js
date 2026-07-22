document.addEventListener('DOMContentLoaded', () => {
  const loadMoreBtn = document.getElementById('load-more-events-btn');
  const eventsContainer = document.querySelector('.events-grid-container');

  if (!loadMoreBtn || !eventsContainer) return;

  // Additional 6 events data batch
  const additionalEvents = [
    {
      theme: 'theme-blue',
      badgeClass: 'badge-blue',
      btnClass: 'btn-blue',
      dateDays: '10 - 12',
      dateMonth: 'SEP',
      dateYear: '2026',
      logoBold: 'GL',
      logoRest: ' Global<br>Logistics Expo',
      tagline: 'Connecting international supply chains and smart logistics.',
      category: 'Exhibition',
      title: 'Global Supply Chain & Logistics Summit 2026',
      location: 'Bombay Exhibition Centre, Mumbai, India',
    },
    {
      theme: 'theme-purple',
      badgeClass: 'badge-purple',
      btnClass: 'btn-purple',
      dateDays: '18 - 20',
      dateMonth: 'SEP',
      dateYear: '2026',
      logoBold: 'PH',
      logoRest: ' PharmaTech<br>Asia 2026',
      tagline: 'Next-gen pharmaceutical compliance & machinery.',
      category: 'Trade Show',
      title: 'PharmaTech & Regulatory Standards Asia',
      location: 'HITEX Exhibition Center, Hyderabad, India',
    },
    {
      theme: 'theme-teal',
      badgeClass: 'badge-teal',
      btnClass: 'btn-teal',
      dateDays: '25 - 27',
      dateMonth: 'SEP',
      dateYear: '2026',
      logoBold: 'EV',
      logoRest: ' Green EV<br>Expo 2026',
      tagline: 'Accelerating electric mobility & battery safety standards.',
      category: 'Conference',
      title: 'International EV & Battery Technology Expo',
      location: 'Pragati Maidan, New Delhi, India',
    },
    {
      theme: 'theme-darkblue',
      badgeClass: 'badge-blue',
      btnClass: 'btn-blue',
      dateDays: '08 - 10',
      dateMonth: 'OCT',
      dateYear: '2026',
      logoBold: 'CLOUD',
      logoRest: '<br>Security Forum',
      tagline: 'Enterprise cloud infrastructure and data privacy rules.',
      category: 'Summit',
      title: 'Cloud Security & Compliance Forum 2026',
      location: 'Bangalore International Exhibition Centre, India',
    },
    {
      theme: 'theme-orange',
      badgeClass: 'badge-orange',
      btnClass: 'btn-orange',
      dateDays: '15 - 17',
      dateMonth: 'OCT',
      dateYear: '2026',
      logoBold: 'MED',
      logoRest: ' MedDevice<br>Expo 2026',
      tagline: 'Pioneering medical device standards & CDSCO compliance.',
      category: 'Exhibition',
      title: 'Medical Devices & Standards Expo 2026',
      location: 'Chennai Trade Centre, Chennai, India',
    },
    {
      theme: 'theme-cyber',
      badgeClass: 'badge-blue',
      btnClass: 'btn-blue',
      dateDays: '24 - 26',
      dateMonth: 'OCT',
      dateYear: '2026',
      logoBold: 'ROBOT',
      logoRest: '<br>Automation 2026',
      tagline: 'Industrial robotics, BIS standards and smart factories.',
      category: 'Conference',
      title: 'Robotics & Industrial Automation Summit',
      location: 'Yashobhoomi International Convention Centre, Dwarka, Delhi',
    },
  ];

  let loadCount = 0;

  loadMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const btnSpan = loadMoreBtn.querySelector('span');
    const originalText = btnSpan.textContent;
    btnSpan.textContent = 'Loading Events...';
    loadMoreBtn.style.pointerEvents = 'none';

    setTimeout(() => {
      additionalEvents.forEach((ev) => {
        const article = document.createElement('article');
        article.className = `event-card-item ${ev.theme} event-card-new-loaded`;

        article.innerHTML = `
                    <div class="event-banner-header">
                        <div class="event-date-box">
                            <span class="date-days">${ev.dateDays}</span>
                            <span class="date-month">${ev.dateMonth}</span>
                            <span class="date-year">${ev.dateYear}</span>
                        </div>
                        <div class="event-banner-info">
                            <h4 class="banner-title"><span class="logo-bold">${ev.logoBold}</span>${ev.logoRest}</h4>
                            <p class="banner-tagline">${ev.tagline}</p>
                        </div>
                        <button type="button" class="bookmark-star-btn" aria-label="Bookmark">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </button>
                    </div>
                    <div class="event-card-content">
                        <span class="event-tag-badge ${ev.badgeClass}">${ev.category}</span>
                        <h3 class="event-title">${ev.title}</h3>
                        <div class="event-location-row">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>${ev.location}</span>
                        </div>
                        <a href="#" class="view-details-btn ${ev.btnClass}">
                            <span>View Details</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </a>
                    </div>
                `;

        eventsContainer.appendChild(article);
      });

      loadCount++;
      btnSpan.textContent = 'View All Events';
      loadMoreBtn.style.pointerEvents = 'auto';

      if (loadCount >= 2) {
        btnSpan.textContent = 'All Events Loaded';
        loadMoreBtn.style.opacity = '0.7';
        loadMoreBtn.style.cursor = 'default';
        loadMoreBtn.style.pointerEvents = 'none';
      }
    }, 350);
  });
});

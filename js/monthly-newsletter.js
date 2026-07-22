/* ==========================================================================
   MONTHLY NEWSLETTER - SORT DROPDOWN & INTERACTIVE PAGINATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const sortWrapper = document.getElementById('sortWrapper');
  const sortTrigger = document.getElementById('sortDropdownTrigger');
  const selectedText = document.getElementById('selectedSortText');
  const sortItems = document.querySelectorAll('.sort-option-item');
  const newslettersList = document.querySelector('.horizontal-newsletters-list');
  const pageCircleBtns = document.querySelectorAll('.page-circle-btn');

  if (!newslettersList) return;

  // Newsletter Database across pages
  const newsletterDatabase = {
    1: [
      {
        theme: 'theme-blue',
        month: 'OCTOBER',
        year: '2022',
        title: 'Monthly Newsletter – October 2022',
        desc: 'Key updates, regulatory changes and important announcements from Aleph India.',
        date: '31 Oct 2022'
      },
      {
        theme: 'theme-teal',
        month: 'SEPTEMBER',
        year: '2022',
        title: 'Monthly Newsletter – September 2022',
        desc: 'Key updates, regulatory changes and important announcements from Aleph India.',
        date: '30 Sep 2022'
      },
      {
        theme: 'theme-orange',
        month: 'AUGUST',
        year: '2022',
        title: 'Monthly Newsletter – August 2022',
        desc: 'Key updates, regulatory changes and important announcements from Aleph India.',
        date: '31 Aug 2022'
      },
      {
        theme: 'theme-purple',
        month: 'JULY',
        year: '2022',
        title: 'Monthly Newsletter – July 2022',
        desc: 'Key updates, regulatory changes and important announcements from Aleph India.',
        date: '31 Jul 2022'
      }
    ],
    2: [
      {
        theme: 'theme-blue',
        month: 'JUNE',
        year: '2022',
        title: 'Monthly Newsletter – June 2022',
        desc: 'New Quality Control Orders for electrical appliances and medical devices compliance standards.',
        date: '30 Jun 2022'
      },
      {
        theme: 'theme-teal',
        month: 'MAY',
        year: '2022',
        title: 'Monthly Newsletter – May 2022',
        desc: 'WPC Wireless Planning Committee clearance process and ETA approval guidelines.',
        date: '31 May 2022'
      },
      {
        theme: 'theme-orange',
        month: 'APRIL',
        year: '2022',
        title: 'Monthly Newsletter – April 2022',
        desc: 'E-Waste Extended Producer Responsibility (EPR) digital target tracking updates.',
        date: '30 Apr 2022'
      },
      {
        theme: 'theme-purple',
        month: 'MARCH',
        year: '2022',
        title: 'Monthly Newsletter – March 2022',
        desc: 'Bureau of Indian Standards precious metal hallmarking guidelines for jewellers.',
        date: '31 Mar 2022'
      }
    ],
    3: [
      {
        theme: 'theme-blue',
        month: 'FEBRUARY',
        year: '2022',
        title: 'Monthly Newsletter – February 2022',
        desc: 'CDSCO medical device registration amendments and Class B certification rules.',
        date: '28 Feb 2022'
      },
      {
        theme: 'theme-teal',
        month: 'JANUARY',
        year: '2022',
        title: 'Monthly Newsletter – January 2022',
        desc: 'Start of the new year regulatory roundup and mandatory BIS product compliance checklist.',
        date: '31 Jan 2022'
      },
      {
        theme: 'theme-orange',
        month: 'DECEMBER',
        year: '2021',
        title: 'Monthly Newsletter – December 2021',
        desc: 'Year-end regulatory review and upcoming 2022 Quality Control Orders implementation timeline.',
        date: '31 Dec 2021'
      },
      {
        theme: 'theme-purple',
        month: 'NOVEMBER',
        year: '2021',
        title: 'Monthly Newsletter – November 2021',
        desc: 'Detailed breakdown of All India First Licences awarded by Aleph India.',
        date: '30 Nov 2021'
      }
    ]
  };

  let currentPage = 1;

  // Toggle Dropdown Menu Open/Close
  if (sortTrigger && sortWrapper) {
    sortTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      sortWrapper.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!sortWrapper.contains(e.target)) {
        sortWrapper.classList.remove('open');
      }
    });

    sortItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        sortItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const labelText = item.textContent.trim();
        selectedText.textContent = labelText;
        sortWrapper.classList.remove('open');

        const sortType = item.getAttribute('data-sort');
        sortNewsletters(sortType);
      });
    });
  }

  function renderNewsletterPage(pageNum) {
    currentPage = pageNum;
    const pageData = newsletterDatabase[pageNum] || newsletterDatabase[1];

    newslettersList.innerHTML = '';

    pageData.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = `newsletter-row-card ${item.theme}`;
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
      card.style.transition = 'all 0.3s ease';

      card.innerHTML = `
        <div class="newsletter-date-block ${item.theme}">
            <div class="date-text-wrap">
                <span class="month-label">${item.month}</span>
                <span class="year-label">${item.year}</span>
            </div>
            <div class="calendar-glass-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
                </svg>
            </div>
        </div>

        <div class="newsletter-info-side">
            <h3 class="newsletter-item-title">${item.title}</h3>
            <p class="newsletter-item-desc">${item.desc}</p>
        </div>

        <div class="newsletter-meta-side">
            <div class="pub-date">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span>${item.date}</span>
            </div>
        </div>

        <div class="newsletter-action-side">
            <a href="#" class="btn-view-pdf ${item.theme}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                <span>View PDF</span>
            </a>
        </div>
      `;

      newslettersList.appendChild(card);

      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, idx * 70);
    });

    // Scroll to top of newsletter list section
    const listSection = document.querySelector('.newsletter-list-section');
    if (listSection) {
      listSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Handle Pagination Circle Button Clicks
  pageCircleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      if (btn.classList.contains('next-btn')) {
        const nextPage = currentPage < 3 ? currentPage + 1 : 1;
        updateActivePageBtn(nextPage);
        renderNewsletterPage(nextPage);
        return;
      }

      const pageNum = parseInt(btn.textContent.trim(), 10);
      if (!isNaN(pageNum)) {
        updateActivePageBtn(pageNum);
        renderNewsletterPage(pageNum <= 3 ? pageNum : ((pageNum - 1) % 3) + 1);
      }
    });
  });

  function updateActivePageBtn(targetNum) {
    pageCircleBtns.forEach(b => {
      b.classList.remove('active');
      if (parseInt(b.textContent.trim(), 10) === targetNum) {
        b.classList.add('active');
      }
    });
  }

  function sortNewsletters(type) {
    const cards = Array.from(newslettersList.querySelectorAll('.newsletter-row-card'));
    
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      card.style.transition = 'all 0.25s ease';
    });

    setTimeout(() => {
      if (type === 'oldest') {
        cards.reverse();
      } else if (type === 'popular') {
        cards.sort((a, b) => a.className.localeCompare(b.className));
      } else if (type === 'downloaded') {
        cards.sort((a, b) => b.className.localeCompare(a.className));
      }

      cards.forEach((card, idx) => {
        newslettersList.appendChild(card);
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, idx * 60);
      });
    }, 200);
  }
});

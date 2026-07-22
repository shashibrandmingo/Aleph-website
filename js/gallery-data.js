/* ==========================================================================
   IMAGE GALLERY DATA & FILTERING SYSTEM (gallery-data.js)
   ========================================================================== */

// 1. Categories / Filter Tabs Configuration
const categoriesData = [
  { id: "all",           label: "All Photos",       icon: "fa-solid fa-grip" },
  { id: "meetings",      label: "Client Meetings",   icon: "fa-solid fa-user-group" },
  { id: "events",        label: "Team Events",       icon: "fa-solid fa-users-gear" },
  { id: "celebrations",  label: "Celebrations",      icon: "fa-solid fa-champagne-glasses" },
  { id: "achievements",  label: "Achievements",      icon: "fa-solid fa-trophy" },
  { id: "workplace",     label: "Workplace",         icon: "fa-solid fa-building" }
];

// 2. Gallery Photos — All images with month/year labels and descriptions
const galleryItems = [
  // 2026
  { id: 1,  category: "events",        date: "May 2026",       image: "image/image-gallery/may_2026.webp",                              description: "Aleph India hosted an exciting office party at the club, creating an evening filled with fun, music, and celebration. It was a night of great entertainment, delicious food, and lively conversations. Everyone who attended had a fantastic time dancing, socializing, and enjoying the perfect party ambiance." },
  { id: 2,  category: "events",        date: "May 2026",       image: "image/image-gallery/image/may_2026 (1).webp",                    description: "It was a privilege to host Mr. Vishnu Gupta, Former Scientist ‘G’ & Deputy Director General, Bureau of Indian Standards. He shared valuable insights on the difference between client needs and expectations, highlighting that needs are met through compliance, while expectations require commitment and continuous improvement. He also emphasized the importance of learning from challenges, documenting observations, and refining processes step by step. His guidance reinforced that sustainable growth comes through discipline, learning, and a mindset of continual improvement." },
  { id: 3,  category: "events",        date: "April 2026",     image: "image/image-gallery/image/apr_2026.webp",                        description: "Aleph India recently hosted a heartwarming food distribution event for children at a local school, reflecting its commitment to social responsibility. Just as we celebrate sports and teamwork within the organization, we also believe in giving back to the community. The joy and smiles shared during the event were truly uplifting, reminding us of the profound impact of compassion, care, and unity. It was a meaningful initiative that reinforced our values and strengthened our connection with the community." },
  { id: 4,  category: "events",        date: "May 2026",     image: "image/image-gallery/image/mar_2026.webp",                        description: "Aleph India hosted a vibrant Holi celebration at the office, bringing together colors, joy, and festive spirit. The day was filled with laughter, music, and a strong sense of togetherness. Employees enthusiastically participated, playing with colors, enjoying delicious treats, and celebrating the occasion in a lively and cheerful atmosphere. It was a memorable event that strengthened team bonding and spread happiness across the workplace." },
  // Celebrations
  { id: 5,  category: "celebrations",  date: "January 2025",   image: "image/image-gallery/image/10_jan.webp",                          description: "Aleph India recently held its annual meeting, bringing the entire team together to review the year’s achievements. During the event, employees were recognized and awarded for their outstanding performance and dedication. The awards ceremony highlighted individual contributions and motivated the team to continue striving for excellence in the coming year." },
  { id: 6,  category: "celebrations",  date: "August 2024",    image: "image/image-gallery/image/15_aug.webp",                          description: "Happy Independence Day! Aleph India proudly celebrated India's 78th Independence Day with patriotic fervor and team pride." },
  { id: 7,  category: "celebrations",  date: "November 2024",  image: "image/image-gallery/image/15_nov.webp",                          description: "A joyful November celebration bringing the Aleph India team together to mark another milestone in our journey." },
  { id: 8,  category: "celebrations",  date: "October 2024",   image: "image/image-gallery/image/15_oct.webp",                          description: "October festivities at Aleph India — our team celebrated with warmth, laughter, and the spirit of togetherness." },
  { id: 9,  category: "celebrations",  date: "September 2024", image: "image/image-gallery/image/15_sep.webp",                          description: "September celebrations marked yet another joyful chapter in our team's journey, filled with gratitude and camaraderie." },
  { id: 10, category: "celebrations",  date: "December 2024",  image: "image/image-gallery/image/25_dec.webp",                          description: "Merry Christmas from Aleph India! Our team rang in the festive season with cheer, gifts, and heartfelt celebrations." },
  { id: 11, category: "celebrations",  date: "March 2024",     image: "image/image-gallery/image/alephindia-holi.webp",                 description: "Happy Holi! The Aleph India family celebrated the festival of colors with vibrant energy, laughter, and togetherness." },
  { id: 12, category: "celebrations",  date: "March 2024",     image: "image/image-gallery/image/aleph-india-womens-day.webp",          description: "Celebrating International Women's Day at Aleph India — honoring the incredible women who inspire and lead our team every day." },
  { id: 13, category: "celebrations",  date: "October 2024",   image: "image/image-gallery/image/Navaratri-festival.jpg",               description: "Navratri celebrations at Aleph India — nine nights of devotion, dance, and joy shared with our wonderful team family." },
  { id: 14, category: "celebrations",  date: "November 2024",  image: "image/image-gallery/image/diwali.webp",                          description: "Happy Diwali! Aleph India celebrated the festival of lights with decoration, sweets, and the warmth of our team spirit." },
  { id: 15, category: "celebrations",  date: "December 2024",  image: "image/image-gallery/image/alephindia-party.webp",                description: "Year-end celebrations at Aleph India — a beautiful evening of gratitude, fun, and farewell to a remarkable year." },
  { id: 16, category: "celebrations",  date: "December 2023",  image: "image/image-gallery/image/musicevent01.webp",                    description: "A musical evening that brought the Aleph India team together — celebrating culture, creativity, and the joy of performance." },
  { id: 40, category: "celebrations",  date: "2024",           image: "image/image-gallery/image/ajay-sir-birthday.jpg",                description: "Wishing Ajay Sir a very happy birthday! The team gathered to celebrate with warmth and heartfelt wishes." },
  { id: 41, category: "celebrations",  date: "2024",           image: "image/image-gallery/image/sunil-sir-birthday.png",               description: "Happy Birthday to Sunil Sir! The Aleph India team came together to celebrate this special day with joy and cheer." },
  { id: 42, category: "celebrations",  date: "2024",           image: "image/image-gallery/image/sristi-mam-work-anniversary.jpg",      description: "Congratulations to Sristi Ma'am on her work anniversary! Celebrating her dedication and invaluable contribution to the team." },
  // Team Events
  { id: 17, category: "events",        date: "June 2024",      image: "image/image-gallery/image/june_yoga.webp",                       description: "International Yoga Day at Aleph India — our team embraced wellness, mindfulness, and the power of yoga together." },
  { id: 18, category: "events",        date: "July 2024",      image: "image/image-gallery/image/july_emo.webp",                        description: "A memorable July team event celebrating camaraderie, achievements, and the collective spirit of the Aleph India family." },
  { id: 19, category: "events",        date: "2024",           image: "image/image-gallery/image/office-trip.webp",                     description: "An exciting team outing that brought us closer — exploring together, creating memories, and building a stronger bond." },
  { id: 20, category: "events",        date: "2024",           image: "image/image-gallery/image/office-party.webp",                    description: "Office party time! The Aleph India team let loose and celebrated with great food, music, and unforgettable moments." },
  { id: 21, category: "events",        date: "2024",           image: "image/image-gallery/image/sportsday.webp",                       description: "Sports Day at Aleph India — a day of fun, fitness, healthy competition, and team spirit that everyone thoroughly enjoyed." },
  { id: 22, category: "events",        date: "2024",           image: "image/image-gallery/image/alephindia-socialwork.webp",           description: "Giving back to the community — Aleph India's social work initiative, reflecting our commitment to making a positive difference." },
  { id: 23, category: "events",        date: "2024",           image: "image/image-gallery/image/plantation.jpeg",                      description: "Green initiative! The Aleph India team participated in a tree plantation drive, contributing to a healthier and greener future." },
  { id: 24, category: "events",        date: "2024",           image: "image/image-gallery/image/swach-bharat-aleph-india.jpg",          description: "Swachh Bharat Abhiyan — Aleph India took an active part in the cleanliness drive, supporting a cleaner and better India." },
  { id: 25, category: "events",        date: "2024",           image: "image/image-gallery/image/quarterlymeeting.jpeg",                description: "Quarterly review meeting — our leadership and team came together to assess progress, share insights, and plan for growth." },
  // Workplace / Health
  { id: 26, category: "workplace",     date: "2024",           image: "image/image-gallery/image/Health-Check-up.webp",                 description: "Aleph India's annual health check-up camp — ensuring the well-being of every team member with comprehensive medical screenings." },
  { id: 27, category: "workplace",     date: "2024",           image: "image/image-gallery/image/health-checkup.png",                   description: "Team health and wellness initiative — because a healthy team is a happy and productive team at Aleph India." },
  { id: 28, category: "workplace",     date: "2024",           image: "image/image-gallery/image/eye-checkup01.webp",                   description: "Eye care check-up camp organized for our team — Aleph India's commitment to the holistic health of every employee." },
  { id: 29, category: "workplace",     date: "2024",           image: "image/image-gallery/image/soft-skill-training.png",              description: "Soft skills training session — empowering our team with communication, leadership, and professional development skills." },
  { id: 43, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g1.webp",                              description: "A glimpse into our dynamic workplace — where collaboration, innovation, and dedication come together every day." },
  { id: 44, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g2.webp",                              description: "Our team at work — focused, driven, and committed to delivering the highest standards of compliance and consulting." },
  { id: 45, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g3.webp",                              description: "Behind every successful project is a dedicated team — here's a look at the people who make Aleph India great." },
  { id: 46, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g4.webp",                              description: "Teamwork in action at Aleph India — our collaborative culture drives excellence in everything we do." },
  { id: 47, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g6.webp",                              description: "A snapshot of our vibrant office culture — where every team member contributes to our shared mission and vision." },
  { id: 48, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g8.webp",                              description: "Dedication and passion at Aleph India — our team's commitment to quality is evident in every interaction and deliverable." },
  { id: 49, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g9.webp",                              description: "The Aleph India team in action — bringing expertise, energy, and enthusiasm to every challenge we face." },
  { id: 50, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g11.webp",                             description: "Our workplace moments — capturing the spirit of a team that values integrity, growth, and mutual respect." },
  { id: 51, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g12.webp",                             description: "Aleph India's work culture in focus — a team united by purpose and driven by the passion to serve clients worldwide." },
  { id: 52, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g13.webp",                             description: "Every day is a new opportunity at Aleph India — our team embraces challenges with a positive and solutions-driven mindset." },
  { id: 53, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g14.webp",                             description: "Proud moments from our workplace — where talent meets opportunity and hard work leads to meaningful impact." },
  { id: 54, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g15.webp",                             description: "Collaboration at its finest — the Aleph India team working together to solve complex compliance challenges for clients." },
  { id: 55, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g16.webp",                             description: "A team that learns together grows together — continuous development is at the heart of what we do at Aleph India." },
  { id: 56, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g17.webp",                             description: "Our office is more than a workspace — it's where ideas are born, relationships are built, and success is achieved together." },
  { id: 57, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g18.webp",                             description: "Moments of focus and teamwork at Aleph India — our team's dedication is what sets us apart in the industry." },
  { id: 58, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g19.webp",                             description: "The faces behind Aleph India's success — a diverse, skilled, and committed team working with one shared goal." },
  { id: 59, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g20.webp",                             description: "Showcasing the Aleph India spirit — a workplace culture built on trust, transparency, and a drive for continuous excellence." },
  { id: 60, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g21.webp",                             description: "From boardrooms to field visits — Aleph India's team is always ready to deliver expert guidance wherever it's needed." },
  { id: 61, category: "workplace",     date: "2024",           image: "image/image-gallery/image/g22.webp",                             description: "A glimpse of the hard work and heart that goes into every project — Aleph India's team is truly its greatest strength." },
  // Achievements
  { id: 30, category: "achievements",  date: "2024",           image: "image/image-gallery/image/Employee-of-the-Quarter2024.png",      description: "Recognizing excellence within our team — the Employee of the Quarter award celebrates outstanding performance and dedication." },
  { id: 31, category: "achievements",  date: "October 2024",   image: "image/image-gallery/image/employees-of-quarter-october.webp",   description: "Employee of the Quarter — October 2024. Congratulations to our outstanding performer for their exceptional contributions!" },
  { id: 32, category: "achievements",  date: "Q1 2024",        image: "image/image-gallery/image/employees-of-the-quarter-1.webp",     description: "Q1 2024 Employee of the Quarter — honoring the standout performer whose hard work and dedication inspired the entire team." },
  { id: 33, category: "achievements",  date: "Q2 2024",        image: "image/image-gallery/image/employees-of-the-quarter-2.webp",     description: "Q2 2024 Employee of the Quarter — recognizing commitment, excellence, and the relentless pursuit of quality in every task." },
  { id: 34, category: "achievements",  date: "Q3 2024",        image: "image/image-gallery/image/employees-of-the-quarter-3.webp",     description: "Q3 2024 Employee of the Quarter — a well-deserved recognition for a team member who consistently goes above and beyond." },
  { id: 35, category: "achievements",  date: "January 2024",   image: "image/image-gallery/image/employees-of-the-quarter-jan.webp",   description: "Employee of the Quarter — January 2024. Starting the year with a celebration of excellence and hard work at Aleph India." },
  { id: 36, category: "achievements",  date: "July 2024",      image: "image/image-gallery/image/employees-of-the-quarter-july.webp",  description: "Employee of the Quarter — July 2024. Celebrating a team member whose remarkable performance made a lasting impact." },
  { id: 37, category: "achievements",  date: "2024",           image: "image/image-gallery/image/employees-of-the-quarter.webp",       description: "The Employee of the Quarter award at Aleph India — our way of recognizing the people who make a real difference every day." },
  // Meetings
  { id: 38, category: "meetings",      date: "2024",           image: "image/image-gallery/image/korea-testing.webp",                  description: "International collaboration — Aleph India's engagement with Korean testing authorities, expanding our global compliance network." },
  { id: 39, category: "meetings",      date: "2024",           image: "image/image-gallery/image/in.png",                              description: "A key client meeting at Aleph India — building partnerships, understanding requirements, and delivering tailored compliance solutions." }
];

let activeCategory = "all";

// 3. Render Filter Tabs
function renderTabs() {
  const tabsContainer = document.getElementById("gallery-tabs-container");
  if (!tabsContainer) return;

  tabsContainer.innerHTML = "";

  categoriesData.forEach(tab => {
    const isActive = tab.id === activeCategory ? "active" : "";
    tabsContainer.innerHTML += `
      <button class="gallery-tab-btn ${isActive}" data-category="${tab.id}">
        <i class="${tab.icon}"></i>
        <span>${tab.label}</span>
      </button>
    `;
  });

  const tabButtons = tabsContainer.querySelectorAll(".gallery-tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category");
      filterGalleryGrid();
    });
  });
}

// 4. Render Photo Grid — only date badge, no title text
function filterGalleryGrid() {
  const gridContainer = document.getElementById("gallery-photos-grid");
  if (!gridContainer) return;

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  gridContainer.style.opacity = "0.2";
  gridContainer.style.transform = "translateY(5px)";

  setTimeout(() => {
    gridContainer.innerHTML = "";

    if (filteredItems.length === 0) {
      gridContainer.innerHTML = `
        <div class="gallery-empty-state">
          <i class="fa-regular fa-image"></i>
          <p>No photos available in this category yet.</p>
        </div>
      `;
    } else {
      filteredItems.forEach((item, idx) => {
        gridContainer.innerHTML += `
          <div class="gallery-photo-card fade-in" data-index="${idx}" style="cursor:pointer">
            <div class="gallery-photo-img-wrapper">
              <img src="${item.image}" alt="${item.date}" class="gallery-photo-img" loading="lazy">
              <div class="gallery-photo-tag-overlay">
                <div class="tag-icon-circle">
                  <i class="fa-solid fa-calendar-days"></i>
                </div>
                <div class="tag-text-block">
                  <span class="gallery-date-label">${item.date}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      // Attach click handlers after cards are rendered
      setTimeout(() => {
        const cards = gridContainer.querySelectorAll('.gallery-photo-card');
        cards.forEach(card => {
          card.addEventListener('click', () => {
            openLightbox(filteredItems, parseInt(card.getAttribute('data-index')));
          });
        });
      }, 210);
    }

    gridContainer.style.opacity = "1";
    gridContainer.style.transform = "translateY(0)";
  }, 200);
}

// 5. Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderTabs();
  filterGalleryGrid();
  initLightbox();
});

/* ==========================================================================
   GALLERY LIGHTBOX (Our-Team style slider)
   ========================================================================== */

let lbItems = [];
let lbActiveIndex = 0;

function openLightbox(items, startIndex) {
  lbItems = items;
  lbActiveIndex = startIndex;

  // Build all slides
  const track = document.getElementById('gal-lightbox-track');
  track.innerHTML = '';

  items.forEach((item, idx) => {
    const catLabel = item.category.charAt(0).toUpperCase() + item.category.slice(1);
    const slide = document.createElement('div');
    slide.className = 'gal-lb-slide' + (idx === startIndex ? ' active' : '');
    slide.setAttribute('data-index', idx);
    slide.innerHTML = `
      <div class="gal-lb-slide-img-wrap">
        <img src="${item.image}" alt="${item.date}" loading="lazy">
      </div>
      ${item.description ? `<div class="gal-lb-slide-desc">${item.description}</div>` : ''}
    `;
    // Click on non-active slides to navigate
    slide.addEventListener('click', () => {
      if (!slide.classList.contains('active')) goToSlide(idx);
    });
    track.appendChild(slide);
  });

  // Open overlay
  document.getElementById('gal-lightbox-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  updateSlider();
}

function goToSlide(index) {
  lbActiveIndex = Math.max(0, Math.min(index, lbItems.length - 1));
  updateSlider();
}

function updateSlider() {
  requestAnimationFrame(() => {
    const track = document.getElementById('gal-lightbox-track');
    const slides = track.querySelectorAll('.gal-lb-slide');
    const counter = document.getElementById('gal-lightbox-counter');
    const prevBtn = document.getElementById('gal-lb-prev');
    const nextBtn = document.getElementById('gal-lb-next');

    // Update active class
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === lbActiveIndex);
    });

    // Center the active slide in viewport
    const slideW = slides[0] ? slides[0].offsetWidth : 520;
    const gap = 28;
    const viewportW = track.parentElement ? track.parentElement.offsetWidth : window.innerWidth;
    const offset = (viewportW / 2) - (lbActiveIndex * (slideW + gap)) - (slideW / 2);
    track.style.transform = `translateX(${offset}px)`;

    // Counter
    if (counter) counter.textContent = `${lbActiveIndex + 1} / ${lbItems.length}`;

    // Arrow state
    if (prevBtn) prevBtn.classList.toggle('disabled', lbActiveIndex === 0);
    if (nextBtn) nextBtn.classList.toggle('disabled', lbActiveIndex === lbItems.length - 1);
  });
}

function closeLightbox() {
  document.getElementById('gal-lightbox-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initLightbox() {
  // Close button
  document.getElementById('gal-lightbox-close').addEventListener('click', closeLightbox);

  // Click overlay backdrop to close
  document.getElementById('gal-lightbox-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('gal-lightbox-overlay')) closeLightbox();
  });

  // Nav arrows
  document.getElementById('gal-lb-prev').addEventListener('click', () => goToSlide(lbActiveIndex - 1));
  document.getElementById('gal-lb-next').addEventListener('click', () => goToSlide(lbActiveIndex + 1));

  // Keyboard
  document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('gal-lightbox-overlay');
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  goToSlide(lbActiveIndex - 1);
    if (e.key === 'ArrowRight') goToSlide(lbActiveIndex + 1);
    if (e.key === 'Escape')     closeLightbox();
  });
}

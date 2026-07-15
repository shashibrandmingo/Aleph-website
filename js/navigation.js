/**
 * Aleph INDIA Website - Navigation & Router JS
 * Provides sticky header, mobile drawer controls, active state styling,
 * and a smooth, flicker-free SPA-style PJAX page transitions.
 */

// Load the Service dropdown content configuration dynamically
(function() {
  const script = document.createElement('script');
  script.src = 'js/service-dropdown.js';
  script.async = false;
  document.head.appendChild(script);
})();

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initSearchToggle();
  initMobileMenu();
  updateActiveLinks();
  initPJAX();
  initDropdownClicks();
});

// 1. Sticky Header
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header || header.dataset.stickyInitialized) return;
  header.dataset.stickyInitialized = 'true';
  
  const topBar = document.querySelector('.top-bar');
  const mainBar = document.querySelector('.main-nav-bar');
  const stickyThreshold = topBar ? topBar.offsetHeight + 10 : 50;
  const headerHeight = header.offsetHeight;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > stickyThreshold) {
      if (!header.classList.contains('is-sticky')) {
        header.classList.add('is-sticky');
        document.body.style.paddingTop = `${headerHeight}px`;
      }
    } else {
      if (header.classList.contains('is-sticky')) {
        header.classList.remove('is-sticky');
        document.body.style.paddingTop = '0';
      }
    }
  });
}

// 2. Search Toggle
function initSearchToggle() {
  const searchContainer = document.getElementById('search-container-wrapper');
  const searchToggle = document.getElementById('search-toggle-btn');
  const searchInput = document.getElementById('search-input-field');
  
  if (!searchToggle || !searchContainer || !searchInput || searchToggle.dataset.searchInitialized) return;
  searchToggle.dataset.searchInitialized = 'true';
  
  searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (!searchContainer.classList.contains('active')) {
      searchContainer.classList.add('active');
      searchInput.focus();
    } else {
      const query = searchInput.value.trim();
      if (query) {
        alert(`Searching for: ${query}`);
        // Perform actual search search logic here if needed
      } else {
        searchContainer.classList.remove('active');
      }
    }
  });
  
  // Close search input on click outside
  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
      searchContainer.classList.remove('active');
    }
  });
  
  // Support press Enter to search
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        alert(`Searching for: ${query}`);
      }
    }
  });
}

// 3. Mobile Menu (Hamburger Drawer & Accordions)
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-drawer-overlay');
  
  if (!toggleBtn || !drawer || !overlay || toggleBtn.dataset.menuInitialized) return;
  toggleBtn.dataset.menuInitialized = 'true';
  
  function toggleMobileMenu() {
    toggleBtn.classList.toggle('active');
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  }
  
  function closeMobileMenu() {
    toggleBtn.classList.remove('active');
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  }
  
  toggleBtn.addEventListener('click', toggleMobileMenu);
  overlay.addEventListener('click', closeMobileMenu);
  
  // Mobile Submenu Accordions
  const accordionLinks = drawer.querySelectorAll('.mobile-nav-link');
  accordionLinks.forEach(link => {
    // Only target links that have a sibling submenu
    const submenu = link.nextElementSibling;
    if (submenu && submenu.classList.contains('mobile-submenu')) {
      link.addEventListener('click', (e) => {
        // Prevent navigation for the parent item to allow expanding the menu
        e.preventDefault();
        
        // Close other open submenus first
        accordionLinks.forEach(otherLink => {
          if (otherLink !== link && otherLink.classList.contains('open')) {
            otherLink.classList.remove('open');
          }
        });
        
        link.classList.toggle('open');
      });
    }
  });
  
  // Expose close helper globally
  window.closeMobileMenu = closeMobileMenu;
}

// 4. Update Active Link Highlight based on current path
function updateActiveLinks() {
  let path = window.location.pathname;
  let page = path.split("/").pop();
  
  if (page === "" || page === "index.html" || page === "/") {
    page = "index.html";
  }
  
  const decodedPage = decodeURIComponent(page);
  
  // Define page groups matching their main category
  const servicePages = ["Services.html", "Services-details.html", "Product-Pages.html", "QCO-Pages.html"];
  const aboutPages = ["About-Us.html", "Our-Team.html", "Achievements-and-Awards.html", "Association.html", "Management-Desk.html", "Media-Presence.html"];
  const resourcePages = ["Blog-Listing.html", "Blog-Detail-Pages.html", "News-Updates.html", "Latest-Notification.html", "Upcoming-Events.html", "Webinar-Seminar.html", "Monthly-Newsletter.html", "QCO-WTO-Order.html", "Careers.html"];
  const portfolioPages = ["Clientele.html", "International-Audits.html", "Gallery.html", "Videos-and-Tutorials.html"];
  const contactPages = ["Contact-US.html", "Feedback-Concerns.html"];
  
  let category = "index";
  if (servicePages.includes(decodedPage)) category = "services";
  else if (aboutPages.includes(decodedPage)) category = "about";
  else if (resourcePages.includes(decodedPage)) category = "update";
  else if (portfolioPages.includes(decodedPage)) category = "portfolio";
  else if (contactPages.includes(decodedPage)) category = "contact";
  
  // Update Desktop Menu Active Style
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('data-page') === category) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // Update Mobile Menu Active Style
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    const parentItem = link.closest('.mobile-nav-item');
    if (link.getAttribute('data-mobile-page') === category) {
      link.classList.add('active');
      
      // Auto-open active submenu on mobile
      const submenu = link.nextElementSibling;
      if (submenu && submenu.classList.contains('mobile-submenu')) {
        link.classList.add('open');
      }
    } else {
      link.classList.remove('active');
    }
  });
  
  // Highlight individual sub-menu items
  const allSubmenuItems = document.querySelectorAll('.dropdown-item, .mobile-submenu-item');
  allSubmenuItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && (href === decodedPage || decodeURIComponent(href) === decodedPage)) {
      item.classList.add('active');
      item.style.color = 'var(--primary)';
      item.style.fontWeight = '600';
    } else {
      item.classList.remove('active');
      item.style.color = '';
      item.style.fontWeight = '';
    }
  });
}

// 5. Flicker-Free PJAX Router
function initPJAX() {
  if (window.pjaxInitialized) return;
  window.pjaxInitialized = true;
  
  // Catch link click event on document level
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Ignore internal page section jumps, javascript calls, external sites, mail/phone, or new tab links
    if (!href || 
        href.startsWith('#') || 
        href.startsWith('javascript:') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') || 
        link.getAttribute('target') === '_blank') {
      return;
    }
    
    // Parse URL relative to window
    const targetUrl = new URL(link.href, window.location.href);
    
    // Check if it is a different domain
    if (targetUrl.origin !== window.location.origin) {
      return;
    }
    
    // CORS prevents fetch on local file:// paths, fallback to normal navigation if so
    if (window.location.protocol === 'file:') {
      return;
    }
    
    e.preventDefault();
    performPJAXNavigation(targetUrl.href);
  });
  
  // Handle back/forward history navigation
  window.addEventListener('popstate', () => {
    performPJAXNavigation(window.location.href, false);
  });
}

function performPJAXNavigation(url, pushToHistory = true) {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) {
    window.location.href = url;
    return;
  }
  
  // Fade out main content
  mainContent.classList.add('page-fade-out');
  
  // Close mobile menu if it is open
  if (window.closeMobileMenu) {
    window.closeMobileMenu();
  }
  
  // Fetch new page content
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then(htmlString => {
      const parser = new DOMParser();
      const newDocument = parser.parseFromString(htmlString, 'text/html');
      const newMainContent = newDocument.getElementById('main-content');
      
      if (!newMainContent) {
        // Fallback if target page has no #main-content
        window.location.href = url;
        return;
      }
      
      // Temporarily disable transitions during style recalculations and stylesheet swaps
      document.documentElement.classList.add('no-transitions');
      
      // Start loading new stylesheets and create a minimum transition delay (150ms)
      const stylesheetLoadPromise = updateStylesheets(newDocument);
      const transitionDelayPromise = new Promise(resolve => setTimeout(resolve, 150));
      
      // Wait for both new stylesheets to load and the fade-out to finish
      Promise.all([stylesheetLoadPromise, transitionDelayPromise])
        .then(() => {
          // Swap core content
          mainContent.innerHTML = newMainContent.innerHTML;
          
          // Update browser tab title
          document.title = newDocument.title;
          
          // Update address bar history
          if (pushToHistory) {
            history.pushState({}, '', url);
          }
          
          // Re-evaluate active link markers in header
          updateActiveLinks();
          
          // Scroll view back to top
          window.scrollTo({ top: 0, behavior: 'instant' });
          
          // Force layout reflow to apply styling immediately and prevent transition jumps
          void document.documentElement.offsetHeight;
          
          // Fade content back in
          mainContent.classList.remove('page-fade-out');
          
          // Fire loaded events on new content
          retriggerInit();
          
          // Safely re-enable transitions after browser has had a moment to paint the new DOM
          setTimeout(() => {
            document.documentElement.classList.remove('no-transitions');
          }, 50);
        })
        .catch(err => {
          console.warn('Stylesheets sync failed. Swapping content anyway.', err);
          mainContent.innerHTML = newMainContent.innerHTML;
          document.title = newDocument.title;
          if (pushToHistory) history.pushState({}, '', url);
          updateActiveLinks();
          window.scrollTo({ top: 0, behavior: 'instant' });
          mainContent.classList.remove('page-fade-out');
          retriggerInit();
          document.documentElement.classList.remove('no-transitions');
        });
    })
    .catch(error => {
      console.warn('Flicker-free navigation failed. Loading page normally.', error);
      window.location.href = url;
    });
}

// Helper to sync stylesheets dynamically between PJAX page loads and return a Promise that resolves when new styles load
function updateStylesheets(newDoc) {
  const currentLinks = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'));
  const newLinks = Array.from(newDoc.head.querySelectorAll('link[rel="stylesheet"]'));

  // Get absolute/resolved href values for comparison
  const currentHrefs = currentLinks.map(link => link.href);
  const newHrefs = newLinks.map(link => link.href);

  // Identify stylesheets to load and remove
  const linksToLoad = newLinks.filter(link => !currentHrefs.includes(link.href));
  const linksToRemove = currentLinks.filter(link => !newHrefs.includes(link.href) && !link.href.includes('fonts.googleapis') && !link.href.includes('cdnjs.cloudflare'));

  // Create loading promises for new stylesheets
  const loadPromises = linksToLoad.map(link => {
    return new Promise((resolve) => {
      const clonedLink = link.cloneNode(true);
      clonedLink.onload = () => resolve();
      clonedLink.onerror = () => resolve(); // Resolve anyway on error to prevent blocking page transitions
      document.head.appendChild(clonedLink);
    });
  });

  // Resolve after new sheets are loaded, then remove old sheets to avoid unstyled moments
  return Promise.all(loadPromises).then(() => {
    linksToRemove.forEach(link => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    });
  });
}

// Retrigger init functions for newly loaded content if needed
function retriggerInit() {
  // If the page needs form event binding, slider init, or analytics triggers, hook it here.
  document.dispatchEvent(new Event('DOMContentLoaded'));
}

// 6. Close dropdowns on link click (with force-hide)
function initDropdownClicks() {
  const navItems = document.querySelectorAll('.nav-item');
  if (navItems.length === 0 || window.dropdownClicksInitialized) return;
  window.dropdownClicksInitialized = true;
  
  // Click listener inside dropdowns
  document.addEventListener('click', (e) => {
    const dropdownLink = e.target.closest('.dropdown-item, .mega-link-item');
    if (dropdownLink) {
      const dropdown = dropdownLink.closest('.dropdown-menu, .mega-menu');
      if (dropdown) {
        dropdown.classList.add('force-hide');
      }
    }
  });
  
  // Mouseleave listener to remove force-hide class
  navItems.forEach(item => {
    item.addEventListener('mouseleave', () => {
      const dropdown = item.querySelector('.dropdown-menu, .mega-menu');
      if (dropdown) {
        dropdown.classList.remove('force-hide');
      }
    });
  });
}

/**
 * Aleph INDIA - Global Load Popup JS
 * Manages first-time visit check with LocalStorage and handles form submission.
 */

(function () {
  const POPUP_STORAGE_KEY = 'aleph_first_visit_shown';

  window.openGlobalPopup = function () {
    const popup = document.getElementById('alephGlobalPopup');
    if (popup) {
      popup.classList.add('active');
      popup.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeGlobalPopup = function () {
    const popup = document.getElementById('alephGlobalPopup');
    if (popup) {
      popup.classList.remove('active');
      popup.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  window.handleAlephPopupSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('alephName')?.value || '';
    const service = document.getElementById('alephService')?.value || '';

    alert(`Thank you, ${name}! Your enquiry for "${service}" has been submitted successfully.`);
    closeGlobalPopup();
  };

  function createPopupDOMIfMissing() {
    if (!document.getElementById('alephGlobalPopup')) {
      const popupDiv = document.createElement('div');
      popupDiv.id = 'alephGlobalPopup';
      popupDiv.className = 'aleph-popup-overlay';
      popupDiv.setAttribute('aria-hidden', 'true');
      popupDiv.setAttribute('role', 'dialog');
      popupDiv.innerHTML = `
        <div class="aleph-popup-modal">
          <button type="button" class="aleph-popup-close" id="alephPopupCloseBtn" aria-label="Close modal">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div class="aleph-popup-container">
            <div class="aleph-popup-left">
              <div class="aleph-left-header">
                <span class="aleph-tagline">Looking for</span>
                <h2 class="aleph-heading">Product Certification?</h2>
                <div class="aleph-heading-underline"></div>
              </div>
              <div class="aleph-logo-box">
                <img src="image/website-load-popup-image/popup-logo.png" alt="Aleph INDIA Logo" class="aleph-popup-logo" onerror="this.src='image/headers-logo.png'">
              </div>
              <div class="aleph-trust-card">
                <div class="aleph-trust-icon">
                  <i class="fa-solid fa-shield-halved"></i>
                </div>
                <div class="aleph-trust-text">
                  <p>Your Partner in <strong>Quality.</strong></p>
                  <p>Your Path to <strong>Trust.</strong></p>
                </div>
              </div>
            </div>
            <div class="aleph-popup-right">
              <div class="aleph-form-header">
                <h3>Send us your <span>requirement</span></h3>
                <div class="aleph-form-underline"></div>
              </div>
              <form id="alephLeadForm" class="aleph-lead-form">
                <div class="aleph-input-group">
                  <div class="aleph-input-icon">
                    <i class="fa-solid fa-user"></i>
                  </div>
                  <input type="text" id="alephName" required pattern="[A-Za-z\s]+" title="Please enter letters only (no numbers or special characters)" placeholder="Your Name" class="aleph-input-control">
                </div>
                <div class="aleph-input-group">
                  <div class="aleph-input-icon">
                    <i class="fa-solid fa-envelope"></i>
                  </div>
                  <input type="email" id="alephEmail" required placeholder="Email Address" class="aleph-input-control">
                </div>
                <div class="aleph-input-group">
                  <div class="aleph-input-icon">
                    <i class="fa-solid fa-phone"></i>
                  </div>
                  <input type="tel" id="alephPhone" maxlength="10" pattern="[6-9][0-9]{9}" title="Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9" required placeholder="10-digit Mobile Number" class="aleph-input-control">
                </div>
                <div class="aleph-input-group">
                  <div class="aleph-input-icon">
                    <i class="fa-solid fa-comment-dots"></i>
                  </div>
                  <input type="text" id="alephService" required placeholder="Tell us which service you are interested in" class="aleph-input-control">
                </div>
                <button type="submit" class="aleph-submit-btn">
                  <span>SUBMIT ENQUIRY</span>
                  <div class="aleph-btn-arrow">
                    <i class="fa-solid fa-arrow-right"></i>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(popupDiv);
    }
  }

  function initGlobalPopup() {
    createPopupDOMIfMissing();

    const closeBtn = document.getElementById('alephPopupCloseBtn');
    const overlay = document.getElementById('alephGlobalPopup');
    const form = document.getElementById('alephLeadForm');
    const nameInput = document.getElementById('alephName');
    const phoneInput = document.getElementById('alephPhone');

    // Real-time restriction: Allow only letters and spaces in Name field
    if (nameInput) {
      nameInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^A-Za-z\s]/g, '');
      });
    }

    // Real-time restriction: Allow only digits in Phone field & max 10 digits
    if (phoneInput) {
      phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeGlobalPopup);
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeGlobalPopup();
      });
    }

    if (form) {
      form.addEventListener('submit', handleAlephPopupSubmit);
    }

    // Check performance navigation type or sessionStorage to detect fresh reload / tab open
    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
    const isSessionFirst = !sessionStorage.getItem('aleph_session_visited');

    // Show popup ONLY if it's a page RELOAD or first visit to session, NOT when navigating pages
    if ((isReload || isSessionFirst) && overlay) {
      sessionStorage.setItem('aleph_session_visited', 'true');
      setTimeout(() => {
        openGlobalPopup();
      }, 800);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalPopup);
  } else {
    initGlobalPopup();
  }
})();




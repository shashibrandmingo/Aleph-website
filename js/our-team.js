/**
 * Aleph INDIA Website - Our Team & Director Popup Sliders
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Director Slider
  initPopupSlider({
    modalId: 'dirProfileModal',
    closeBtnId: 'closeDirModal',
    trackId: 'dirSliderTrack',
    slideSelector: '.dir-slide',
    prevBtnId: 'dirSliderPrev',
    nextBtnId: 'dirSliderNext',
    triggerSelector: '.directors-section .dir-btn'
  });

  // Initialize Team Member Slider
  initPopupSlider({
    modalId: 'teamProfileModal',
    closeBtnId: 'closeTeamModal',
    trackId: 'teamSliderTrack',
    slideSelector: '.team-slide',
    prevBtnId: 'teamSliderPrev',
    nextBtnId: 'teamSliderNext',
    triggerSelector: '.team-section .team-action-btn'
  });
});

function initPopupSlider(config) {
  const modal = document.getElementById(config.modalId);
  const backdrop = modal ? modal.querySelector('.dir-modal-backdrop') : null;
  const closeBtn = document.getElementById(config.closeBtnId);
  const track = document.getElementById(config.trackId);
  const slides = Array.from(modal ? modal.querySelectorAll(config.slideSelector) : []);
  const prevBtn = document.getElementById(config.prevBtnId);
  const nextBtn = document.getElementById(config.nextBtnId);
  
  // Find all trigger buttons in the grid section
  const viewProfileBtns = Array.from(document.querySelectorAll(config.triggerSelector));
  
  // If the elements are not on this page, exit silently
  if (!modal || !track || !closeBtn || viewProfileBtns.length === 0) return;
  
  let activeIndex = 0;
  
  // Position active slide and update slider layout
  function updateSlider() {
    slides.forEach((slide, idx) => {
      if (idx === activeIndex) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
      } else {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');
      }
    });
    
    // Calculate offset to center the active slide
    const viewport = track.parentElement;
    if (!viewport) return;
    
    const slide = slides[activeIndex];
    if (!slide) return;
    
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const viewportCenter = viewport.offsetWidth / 2;
    const translateX = viewportCenter - slideCenter;
    
    track.style.transform = `translateX(${translateX}px)`;
    
    // Enable/disable navigation buttons
    if (prevBtn) {
      if (activeIndex === 0) {
        prevBtn.classList.add('disabled');
        prevBtn.setAttribute('disabled', 'true');
      } else {
        prevBtn.classList.remove('disabled');
        prevBtn.removeAttribute('disabled');
      }
    }
    
    if (nextBtn) {
      if (activeIndex === slides.length - 1) {
        nextBtn.classList.add('disabled');
        nextBtn.setAttribute('disabled', 'true');
      } else {
        nextBtn.classList.remove('disabled');
        nextBtn.removeAttribute('disabled');
      }
    }
  }
  
  // Open modal at specific index
  function openModal(index) {
    activeIndex = index;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
    
    // Position slider after browser layout
    setTimeout(() => {
      updateSlider();
    }, 50);
  }
  
  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background scrolling
  }
  
  // Event Listeners for View Profile triggers
  viewProfileBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(index);
    });
  });
  
  // Click directly on side slides to center them
  slides.forEach((slide, index) => {
    slide.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      
      if (index !== activeIndex) {
        activeIndex = index;
        updateSlider();
      }
    });
  });
  
  // Prev/Next Navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activeIndex > 0) {
        activeIndex--;
        updateSlider();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (activeIndex < slides.length - 1) {
        activeIndex++;
        updateSlider();
      }
    });
  }
  
  // Close buttons and backdrop clicks
  closeBtn.addEventListener('click', closeModal);
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }
  
  // Keyboard navigation (Esc key to close, Left/Right keys to navigate)
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight' && activeIndex < slides.length - 1) {
      activeIndex++;
      updateSlider();
    } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
      activeIndex--;
      updateSlider();
    }
  });
  
  // Touch Swipe support for mobile device screens
  let startX = 0;
  let curX = 0;
  let isSwiping = false;
  
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });
  
  track.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    curX = e.touches[0].clientX;
  }, { passive: true });
  
  track.addEventListener('touchend', () => {
    if (!isSwiping) return;
    isSwiping = false;
    const diff = startX - curX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < slides.length - 1) {
        activeIndex++; // Swiped left -> show next
        updateSlider();
      } else if (diff < 0 && activeIndex > 0) {
        activeIndex--; // Swiped right -> show prev
        updateSlider();
      }
    }
  });
  
  // Recenter active slide if window is resized
  window.addEventListener('resize', () => {
    if (modal.classList.contains('active')) {
      updateSlider();
    }
  });
}

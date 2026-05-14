 
// ── DROPDOWN TOGGLE ──
const dropdownTrigger = document.querySelector('.dropdown__trigger');
const dropdownMenu = document.querySelector('.dropdown__menu');

dropdownTrigger.addEventListener('click', () => {
  const isOpen = dropdownMenu.classList.toggle('is-open');
  dropdownTrigger.setAttribute('aria-expanded', isOpen);
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    dropdownMenu.classList.remove('is-open');
    dropdownTrigger.setAttribute('aria-expanded', 'false');
  }
});

// ── MOBILE HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const headerNav = document.getElementById('headerNav');

hamburger.addEventListener('click', () => {
  const isOpen = headerNav.classList.toggle('is-open');
  hamburger.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// ── IMAGE CAROUSEL + ZOOM ──
const images = [
  'assets/images/Gushwok_image.jpg',
  'assets/images/Gushwok_image.jpg',
  'assets/images/Gushwok_image.jpg',
  'assets/images/Gushwok_image.jpg',
  'assets/images/Gushwok_image.jpg',
];

let currentIndex = 0;
const mainImage     = document.getElementById('mainImage');
const thumbs        = document.querySelectorAll('.thumb');
const carouselMain  = document.getElementById('carouselMain');
const zoomLens      = document.getElementById('zoomLens');
const zoomPreview   = document.getElementById('zoomPreview');
const zoomPreviewImg= document.getElementById('zoomPreviewImg');

/* ── Go to slide ── */
function goToSlide(index) {
  currentIndex = index;
  mainImage.src = images[index];
  thumbs.forEach(t => t.classList.remove('thumb--active'));
  thumbs[index].classList.add('thumb--active');
  // Update zoom background when image changes
  updateZoomBackground();
}

/* ── Prev / Next ── */
document.getElementById('prevBtn').addEventListener('click', () => {
  goToSlide((currentIndex - 1 + images.length) % images.length);
});
document.getElementById('nextBtn').addEventListener('click', () => {
  goToSlide((currentIndex + 1) % images.length);
});

/* ── Thumbnail click ── */
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    goToSlide(parseInt(thumb.dataset.index));
  });
});

/* ── Set zoom background image ── */
function updateZoomBackground() {
  zoomPreviewImg.style.backgroundImage = `url('${mainImage.src}')`;
}

/* ── Zoom on mouse move ── */
carouselMain.addEventListener('mousemove', (e) => {
  const rect      = mainImage.getBoundingClientRect();
  const lensW     = zoomLens.offsetWidth;
  const lensH     = zoomLens.offsetHeight;
  const zoomLevel = 2.8; // how much to magnify

  // Mouse position relative to image
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  // Keep lens inside image bounds
  let lensX = x - lensW / 2;
  let lensY = y - lensH / 2;
  lensX = Math.max(0, Math.min(lensX, rect.width  - lensW));
  lensY = Math.max(0, Math.min(lensY, rect.height - lensH));

  // Position the lens
  zoomLens.style.left = lensX + 'px';
  zoomLens.style.top  = lensY + 'px';

  // Calculate background position for zoomed preview
  const previewW = zoomPreview.offsetWidth;
  const previewH = zoomPreview.offsetHeight;

  const bgW = rect.width  * zoomLevel;
  const bgH = rect.height * zoomLevel;

  // The ratio of lens position to image size maps to bg position
  const bgX = -(lensX / rect.width)  * bgW;
  const bgY = -(lensY / rect.height) * bgH;

  zoomPreviewImg.style.backgroundSize     = `${bgW}px ${bgH}px`;
  zoomPreviewImg.style.backgroundPosition = `${bgX}px ${bgY}px`;
});

/* ── Show/hide zoom on enter/leave ── */
carouselMain.addEventListener('mouseenter', () => {
  updateZoomBackground();
  zoomLens.style.display     = 'block';
  zoomPreview.style.display  = 'block';
});

carouselMain.addEventListener('mouseleave', () => {
  zoomLens.style.display    = 'none';
  zoomPreview.style.display = 'none';
});

/* ── Hide zoom when hovering prev/next buttons ── */
document.getElementById('prevBtn').addEventListener('mouseenter', () => {
  zoomLens.style.display    = 'none';
  zoomPreview.style.display = 'none';
});
document.getElementById('nextBtn').addEventListener('mouseenter', () => {
  zoomLens.style.display    = 'none';
  zoomPreview.style.display = 'none';
});

// Initial zoom background
updateZoomBackground();
/* ============================================================
   FAQ SECTION — append to script.js
   ============================================================ */

(function initFAQ() {

  /* ── Accordion ── */
  const accordion = document.querySelector('.faq-accordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.faq-item');

  function openItem(btn, answer) {
    btn.setAttribute('aria-expanded', 'true');
    answer.classList.add('is-open');
  }

  function closeItem(btn, answer) {
    btn.setAttribute('aria-expanded', 'false');
    answer.classList.remove('is-open');
  }

  // Initialise: open any item whose button has aria-expanded="true" in HTML
  items.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (btn.getAttribute('aria-expanded') === 'true') {
      answer.classList.add('is-open');
    }
  });

  accordion.addEventListener('click', function (e) {
    const btn = e.target.closest('.faq-question');
    if (!btn) return;

    const item      = btn.closest('.faq-item');
    const answer    = item.querySelector('.faq-answer');
    const isOpen    = btn.getAttribute('aria-expanded') === 'true';

    // Close all other items (single-open accordion)
    items.forEach(otherItem => {
      if (otherItem === item) return;
      closeItem(
        otherItem.querySelector('.faq-question'),
        otherItem.querySelector('.faq-answer')
      );
    });

    // Toggle current
    isOpen ? closeItem(btn, answer) : openItem(btn, answer);
  });

  /* ── Keyboard navigation (up/down arrows between questions) ── */
  accordion.addEventListener('keydown', function (e) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const btns   = [...accordion.querySelectorAll('.faq-question')];
    const idx    = btns.indexOf(document.activeElement);
    if (idx === -1) return;
    e.preventDefault();
    if (e.key === 'ArrowDown') btns[(idx + 1) % btns.length].focus();
    if (e.key === 'ArrowUp')   btns[(idx - 1 + btns.length) % btns.length].focus();
    if (e.key === 'Home')      btns[0].focus();
    if (e.key === 'End')       btns[btns.length - 1].focus();
  });

  /* ── Catalogue CTA email submission ── */
  const ctaBtn   = document.querySelector('.faq-cta-btn');
  const emailInp = document.querySelector('.faq-email-input');
  if (!ctaBtn || !emailInp) return;

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  ctaBtn.addEventListener('click', function () {
    const val = emailInp.value.trim();

    // Simple validation feedback
    if (!EMAIL_RE.test(val)) {
      emailInp.style.borderColor = '#ef4444';
      emailInp.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.15)';
      emailInp.focus();
      setTimeout(() => {
        emailInp.style.borderColor = '';
        emailInp.style.boxShadow   = '';
      }, 2000);
      return;
    }

    // Success state
    ctaBtn.textContent = '✓ Catalogue Sent!';
    ctaBtn.classList.add('faq-btn-success');
    emailInp.value     = '';
    emailInp.disabled  = true;

    // Reset after 4 s so user can try again
    setTimeout(() => {
      ctaBtn.textContent = 'Request Catalogue';
      ctaBtn.classList.remove('faq-btn-success');
      emailInp.disabled  = false;
    }, 4000);
  });

  // Allow Enter key on input to trigger submit
  emailInp.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') ctaBtn.click();
  });

})();
/* ============================================================
   END FAQ SECTION
   ============================================================ */
   /* ============================================================
   APPLICATIONS SECTION — append to script.js
   ============================================================ */

(function initApplications() {
  const track     = document.getElementById('appsTrack');
  const prevBtn   = document.getElementById('appsPrev');
  const nextBtn   = document.getElementById('appsNext');
  if (!track || !prevBtn || !nextBtn) return;

  const CARD_GAP    = 20;   // matches CSS gap
  let currentIndex  = 0;

  function getCardWidth() {
    const card = track.querySelector('.apps-card');
    return card ? card.offsetWidth + CARD_GAP : 340;
  }

  function getVisibleCount() {
    // How many cards fit in the viewport-width of the wrapper
    const wrap = track.closest('.apps-track-wrap');
    const wrapW = wrap ? wrap.offsetWidth : window.innerWidth;
    return Math.floor(wrapW / getCardWidth()) || 1;
  }

  function getTotalCards() {
    return track.querySelectorAll('.apps-card').length;
  }

  function clampIndex(idx) {
    const max = Math.max(0, getTotalCards() - getVisibleCount());
    return Math.min(Math.max(idx, 0), max);
  }

  function updateTrack(animated = true) {
    const offset = currentIndex * getCardWidth();
    if (!animated) track.style.transition = 'none';
    track.style.transform = `translateX(-${offset}px)`;
    if (!animated) {
      // force reflow then re-enable
      track.offsetHeight; // eslint-disable-line
      track.style.transition = '';
    }
    updateButtons();
  }

  function updateButtons() {
    const max = Math.max(0, getTotalCards() - getVisibleCount());
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= max;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = clampIndex(currentIndex - 1);
    updateTrack();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = clampIndex(currentIndex + 1);
    updateTrack();
  });

  /* ── Touch / swipe support ── */
  let touchStartX = 0;
  let touchDeltaX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (Math.abs(touchDeltaX) > 50) {
      currentIndex = clampIndex(touchDeltaX < 0 ? currentIndex + 1 : currentIndex - 1);
      updateTrack();
    }
  });

  /* ── Keyboard arrow support when track or card is focused ── */
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { currentIndex = clampIndex(currentIndex + 1); updateTrack(); }
    if (e.key === 'ArrowLeft')  { currentIndex = clampIndex(currentIndex - 1); updateTrack(); }
  });

  /* ── Re-clamp on resize ── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      currentIndex = clampIndex(currentIndex);
      updateTrack(false);
    }, 150);
  });

  /* ── Init ── */
  updateButtons();

})();
/* ============================================================
   END APPLICATIONS SECTION
   ============================================================ */

// ── MANUFACTURING PROCESS TABS ──
const tabs = document.querySelectorAll('.process-tab');
const panels = document.querySelectorAll('.process-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const index = tab.dataset.tab;

    // Update tabs
    tabs.forEach(t => {
      t.classList.remove('process-tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('process-tab--active');
    tab.setAttribute('aria-selected', 'true');

    // Update panels
    panels.forEach(p => p.classList.remove('is-active'));
    document.querySelector(`.process-panel[data-panel="${index}"]`)
            .classList.add('is-active');
  });
});

// ── TESTIMONIALS DRAG TO SCROLL ──
const testimonialsTrack = document.querySelector('.testimonials-track');

let isTestimonialDragging = false;
let testimonialStartX = 0;
let testimonialScrollLeft = 0;

testimonialsTrack.addEventListener('mousedown', (e) => {
  isTestimonialDragging = true;
  testimonialStartX = e.clientX;
  testimonialScrollLeft = testimonialsTrack.scrollLeft;
  testimonialsTrack.style.scrollBehavior = 'auto';
});

document.addEventListener('mousemove', (e) => {
  if (!isTestimonialDragging) return;
  const delta = e.clientX - testimonialStartX;
  testimonialsTrack.scrollLeft = testimonialScrollLeft - delta;
});

document.addEventListener('mouseup', () => {
  isTestimonialDragging = false;
  testimonialsTrack.style.scrollBehavior = 'smooth';
});
// Open Lovable Interactive Controller for Nectar AI Clone
// Canonical 100% Fidelity Standard

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Nectar AI Clone initializing...');

  const modules = [
    ['AgeGate', initAgeGate],
    ['HeroCarousel', initHeroCarousel],
    ['SidebarAndDrawer', initSidebarAndDrawer],
    ['Videos', initVideos],
    ['FaqAccordion', initFaqAccordion],
    ['FilterToggles', initFilterToggles]
  ];

  modules.forEach(([name, fn]) => {
    try {
      fn();
    } catch (err) {
      console.warn(`[Nectar] Error initializing ${name}:`, err);
    }
  });
});

/**
 * 1. Age Verification Gate
 */
function initAgeGate() {
  const backdrop = document.getElementById('age-gate-backdrop');
  const dialog = document.getElementById('age-gate-dialog');
  const confirmBtn = document.getElementById('age-gate-confirm-btn');
  const exitBtn = document.getElementById('age-gate-exit-btn');

  if (!backdrop || !dialog) return;

  const isVerified = localStorage.getItem('nectar_age_verified') === 'true';

  if (isVerified) {
    backdrop.classList.add('hidden');
    dialog.classList.add('hidden');
    document.body.style.pointerEvents = 'auto';
  } else {
    backdrop.classList.remove('hidden');
    dialog.classList.remove('hidden');
  }

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      dialog.style.opacity = '0';
      backdrop.style.opacity = '0';
      dialog.style.transition = 'opacity 0.3s ease';
      backdrop.style.transition = 'opacity 0.3s ease';
      
      setTimeout(() => {
        backdrop.classList.add('hidden');
        dialog.classList.add('hidden');
        document.body.style.pointerEvents = 'auto';
        localStorage.setItem('nectar_age_verified', 'true');
      }, 300);
    });
  }

  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      window.location.href = 'https://google.com';
    });
  }
}

/**
 * 2. Hero Carousel (5 Slides, 60fps auto-advance & dot navigation)
 */
function initHeroCarousel() {
  const track = document.getElementById('hero-carousel-track');
  const dots = document.querySelectorAll('[data-hero-dot]');
  if (!track || dots.length === 0) return;

  const totalSlides = 5;
  let currentSlide = 0;
  let intervalId = null;
  let isHovered = false;

  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    track.style.transform = `translate3d(-${currentSlide * 100}%, 0px, 0px)`;

    // Update dots active state
    dots.forEach((dot, idx) => {
      const span = dot.querySelector('span');
      if (idx === currentSlide) {
        dot.setAttribute('aria-current', 'true');
        if (span) {
          span.className = 'block h-1.5 rounded-full bg-white transition-all duration-300 w-6';
        }
      } else {
        dot.setAttribute('aria-current', 'false');
        if (span) {
          span.className = 'block h-1.5 rounded-full bg-white/40 transition-all duration-300 group-hover:bg-white/70 w-1.5';
        }
      }
    });
  }

  // Click on dots
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(dot.getAttribute('data-hero-dot'), 10);
      if (!isNaN(targetIndex)) {
        goToSlide(targetIndex);
      }
    });
  });

  // Auto rotation
  function startAutoPlay() {
    stopAutoPlay();
    intervalId = setInterval(() => {
      if (!isHovered) {
        goToSlide(currentSlide + 1);
      }
    }, 5000);
  }

  function stopAutoPlay() {
    if (intervalId) clearInterval(intervalId);
  }

  const carouselContainer = track.closest('[role="region"]');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => { isHovered = true; });
    carouselContainer.addEventListener('mouseleave', () => { isHovered = false; });
  }

  goToSlide(0);
  startAutoPlay();
}

/**
 * 3. Sidebar Navigation & Mobile Slide-Out Drawer
 */
function initSidebarAndDrawer() {
  const menuBtn = document.getElementById('sidebar-menu-button');
  const drawer = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.remove('-translate-x-full');
      drawer.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.add('-translate-x-full');
      drawer.classList.remove('translate-x-0');
      document.body.style.overflow = '';
    });
  }

  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        drawer.classList.add('-translate-x-full');
        drawer.classList.remove('translate-x-0');
        document.body.style.overflow = '';
      }
    });
  }
}

/**
 * 4. Video Autoplay & Hover Playback
 */
function initVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.muted = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const card = video.closest('.group\\/companion-card') || video.parentElement;
    if (card) {
      card.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
      });
      card.addEventListener('mouseleave', () => {
        video.pause();
      });
    }
  });
}

/**
 * 5. FAQ Accordion Panels
 */
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-accordion-trigger');
  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqId = btn.getAttribute('data-faq-id');
      const content = document.getElementById(`faq-content-${faqId}`);
      const chevron = btn.querySelector('.faq-chevron');

      if (!content) return;

      const isOpen = content.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-content').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.faq-chevron').forEach(s => s.classList.remove('rotated'));

      if (!isOpen) {
        content.classList.add('open');
        if (chevron) chevron.classList.add('rotated');
      }
    });
  });
}

/**
 * 6. Interactive Filter Toggles
 */
function initFilterToggles() {
  const groupSwitch = document.querySelector('button[role="switch"]');
  if (groupSwitch) {
    groupSwitch.addEventListener('click', () => {
      const isChecked = groupSwitch.getAttribute('data-state') === 'checked';
      groupSwitch.setAttribute('data-state', isChecked ? 'unchecked' : 'checked');
      groupSwitch.classList.toggle('bg-primary', !isChecked);
      groupSwitch.classList.toggle('bg-input', isChecked);
      const thumb = groupSwitch.querySelector('span');
      if (thumb) {
        thumb.classList.toggle('translate-x-5', !isChecked);
        thumb.classList.toggle('translate-x-0', isChecked);
      }
    });
  }
}

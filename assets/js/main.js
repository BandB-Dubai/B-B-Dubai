/* ═══════════════════════════════════════════════════
   KOMACHI MIDDLE EAST — main.js
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Lucide icons ─────────────────────────────── */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ── Elements ─────────────────────────────────── */
  const header    = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav   = document.getElementById('main-nav');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');

  /* ── 1. Sticky header shadow on scroll ─────────── */
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ── 2. Mobile nav toggle ───────────────────────── */
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav when a link is clicked
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close nav when clicking outside
  document.addEventListener('click', e => {
    if (!header.contains(e.target)) {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── 3. Active nav link on scroll ──────────────── */
  const OFFSET = 120;

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - OFFSET) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ── 4. Scroll-reveal with IntersectionObserver ── */
  const revealSections = document.querySelectorAll('.reveal-section');
  const revealCards    = document.querySelectorAll('.reveal-card');

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Also trigger child reveal-cards
          entry.target.querySelectorAll('.reveal-card').forEach(card => {
            card.classList.add('in-view');
          });
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
  );

  revealSections.forEach(el => sectionObserver.observe(el));

  /* ── 5. Services tab switching ──────────────────── */
  const tabBtns  = document.querySelectorAll('.tab-btn');
  const panels   = document.querySelectorAll('.services-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      // Update tab buttons
      tabBtns.forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });

      // Update panels
      panels.forEach(panel => {
        panel.classList.toggle('active', panel.dataset.panel === tab);
      });

      // Re-init icons for newly revealed panel (in case Lucide missed them)
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  });

  /* ── 6. Gallery filter ──────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.toggle('active', b === btn));

      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });

  /* ── 7. Contact form handler ────────────────────── */
  const form        = document.getElementById('contact-form');
  const successMsg  = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'rgba(239,68,68,.8)';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Submit via mailto as a fallback (replace with Formspree endpoint if available)
      // Example: change form action to "https://formspree.io/f/YOUR_ID"
      const name    = form.querySelector('[name="name"]').value;
      const email   = form.querySelector('[name="email"]').value;
      const phone   = form.querySelector('[name="phone"]').value;
      const service = form.querySelector('[name="service"]').value;
      const message = form.querySelector('[name="message"]').value;

      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`
      );

      // Open mailto
      window.location.href = `mailto:hello@komachime.com?subject=Project%20Enquiry%20from%20${encodeURIComponent(name)}&body=${body}`;

      // Show success
      successMsg.removeAttribute('hidden');
      form.reset();

      // Re-init Lucide for success icon
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      setTimeout(() => successMsg.setAttribute('hidden', ''), 6000);
    });

    // Clear red borders on input
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => { field.style.borderColor = ''; });
    });
  }

  /* ── 8. Marquee pause on hover (CSS handles it) ── */
  // No JS needed — handled via .marquee-track:hover in CSS

});

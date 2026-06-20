/* ============================================================
   TYPEWRITER — hero role cycling
============================================================ */
(function () {
  const el     = document.getElementById('typedText');
  const words  = ['Backend Engineer', 'Systems Architect', 'ML Engineer', 'Go & Java Developer'];
  let   wi     = 0;
  let   ci     = 0;
  let   del    = false;

  function tick() {
    const word = words[wi];

    if (del) {
      el.textContent = word.slice(0, --ci);
    } else {
      el.textContent = word.slice(0, ++ci);
    }

    if (!del && ci === word.length) {
      setTimeout(() => { del = true; tick(); }, 2400);
      return;
    }

    if (del && ci === 0) {
      del = false;
      wi  = (wi + 1) % words.length;
    }

    setTimeout(tick, del ? 45 : 95);
  }

  setTimeout(tick, 900);
})();


/* ============================================================
   NAV — frosted glass on scroll
============================================================ */
(function () {
  const nav = document.getElementById('navbar');

  function update() {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ============================================================
   NAV — mobile toggle
============================================================ */
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) {
      toggle.classList.remove('open');
      links.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();


/* ============================================================
   SCROLL REVEAL — IntersectionObserver
============================================================ */
(function () {
  // Apply stagger delays to grid children before observing
  const staggerTargets = [
    { selector: '#skillsGrid .reveal', delay: 0.08 },
    { selector: '#toolsGrid .reveal',  delay: 0.06 },
    { selector: '#projGrid .reveal',   delay: 0.07 },  // compact cards only
  ];

  staggerTargets.forEach(({ selector, delay }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = (i * delay) + 's';
    });
  });

  // Hero items stagger
  document.querySelectorAll('.hero-content .reveal').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.1) + 's';
  });

  // Observe all .reveal elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Don't unobserve so animation persists if user refreshes
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -48px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ============================================================
   SKILL BARS — animate to width on scroll
============================================================ */
(function () {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        // Small delay so the reveal animation settles first
        setTimeout(() => {
          bar.style.width = bar.dataset.w + '%';
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(bar => observer.observe(bar));
})();


/* ============================================================
   ACTIVE NAV LINK — highlight as sections scroll into view
============================================================ */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const anchors  = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !anchors.length) return;

  const setActive = (id) => {
    anchors.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + id
        ? 'rgba(255,255,255,1)'
        : '';
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


/* ============================================================
   CONTACT FORM — reset after submit
============================================================ */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', () => {
    setTimeout(() => form.reset(), 150);
  });
})();
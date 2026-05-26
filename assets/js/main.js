// ========== CORE: ICONOS Y HEADER (sin depender de GSAP) ==========
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. ICONOS LUCIDE — PRIMERO, antes que nada
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. HEADER SCROLL
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.pageYOffset > 50);
    });
  }

  // 3. MOBILE MENU
  const mobileToggle = document.getElementById('mobileToggle');
  const nav = document.querySelector('.nav');
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function() {
      mobileToggle.classList.toggle('active');
      nav.classList.toggle('open');
    });
    document.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // 4. FAQ ACCORDION
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var answer = btn.nextElementSibling;
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-question').forEach(function(b) { b.setAttribute('aria-expanded', 'false'); });
      document.querySelectorAll('.faq-answer').forEach(function(a) { a.classList.remove('open'); });
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });

  // 5. CONTACT FORM
  var cf = document.getElementById('contactForm');
  if (cf) {
    cf.addEventListener('submit', function(e) {
      e.preventDefault();
      var fd = new FormData(this);
      var msg = encodeURIComponent('Hola MilMat Group, soy ' + fd.get('name') + '.\n\n' + fd.get('message') + '\n\nTeléfono: ' + fd.get('phone'));
      window.open('https://wa.me/17868097313?text=' + msg, '_blank');
      document.getElementById('formContent').style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
    });
  }

  // 6. HERO PARTICLES
  var pc = document.getElementById('heroParticles');
  if (pc) {
    for (var i = 0; i < 50; i++) {
      var p = document.createElement('div');
      var s = Math.random() * 4 + 1;
      p.style.cssText = 'position:absolute;width:' + s + 'px;height:' + s + 'px;' +
        'background:' + (Math.random() > 0.6 ? 'rgba(200,164,78,0.5)' : 'rgba(255,255,255,0.2)') + ';' +
        'border-radius:50%;left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;' +
        'animation:fp ' + (Math.random() * 10 + 6) + 's linear infinite;' +
        'animation-delay:' + (Math.random() * 5) + 's';
      pc.appendChild(p);
    }
    var st = document.createElement('style');
    st.textContent = '@keyframes fp{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-120vh) translateX(60px);opacity:0}}';
    document.head.appendChild(st);
  }

  // 7. SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({behavior: 'smooth', block: 'start'}); }
    });
  });

  // ========== GSAP ANIMATIONS (solo si GSAP está disponible) ==========
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    
    try { gsap.registerPlugin(ScrollTrigger); } catch(e) {}

    // Hero stagger
    try {
      gsap.from('.hero-badge, .hero-title, .hero-subtitle, .hero-actions, .hero-trust', {
        y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out'
      });
    } catch(e) {}

    // Scroll reveal sections
    try {
      ['.ps-card','.step-card','.legal-badge','.legal-card','.service-card','.testimonial-card','.value-card','.contact-info-card','.faq-item'].forEach(function(sel) {
        var els = document.querySelectorAll(sel);
        if (els.length) {
          gsap.fromTo(els, { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: els[0].closest('section') || els[0], start: 'top 85%' }
          });
        }
      });
    } catch(e) {}

    // Counter animation
    try {
      document.querySelectorAll('.legal-stat').forEach(function(stat) {
        var text = stat.textContent.trim();
        var target = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (isNaN(target)) return;
        var isPercent = text.indexOf('%') > -1;
        var suffix = isPercent ? '%' : (text.charAt(0) === '+' ? '+' : '');
        gsap.from(stat, {
          textContent: 0, duration: 2, ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: { trigger: stat, start: 'top 90%' },
          onUpdate: function() {
            var val = Math.round(stat.textContent);
            stat.textContent = suffix + val + (isPercent ? '%' : '');
          }
        });
      });
    } catch(e) {}

    // Step numbers
    try {
      gsap.from('.step-number', {
        scale: 0.5, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.steps-grid', start: 'top 80%' }
      });
    } catch(e) {}

    // CTA reveal
    try {
      gsap.from('.cta-card', {
        y: 80, opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-card', start: 'top 85%' }
      });
    } catch(e) {}

    // Footer reveal
    try {
      gsap.from('.footer-grid > *', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.footer', start: 'top 90%' }
      });
    } catch(e) {}

  } // end GSAP check

});

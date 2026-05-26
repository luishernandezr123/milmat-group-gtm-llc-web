// ========== GSAP + ScrollTrigger ==========
gsap.registerPlugin(ScrollTrigger);

// ========== HEADER SCROLL ==========
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  header.classList.toggle('scrolled', currentScroll > 50);
  lastScroll = currentScroll;
});

// ========== MOBILE MENU ==========
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.querySelector('.nav');

if (mobileToggle && nav) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    nav.classList.toggle('open');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// ========== CONTACT FORM ==========
const cf = document.getElementById('contactForm');
if (cf) {
  cf.addEventListener('submit', function(e) {
    e.preventDefault();
    const fd = new FormData(this);
    const msg = encodeURIComponent(`Hola MilMat Group, soy ${fd.get('name')}.\n\n${fd.get('message')}\n\nTeléfono: ${fd.get('phone')}`);
    window.open(`https://wa.me/17868097313?text=${msg}`, '_blank');
    document.getElementById('formContent').style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
  });
}

// ========== HERO PARTICLES ==========
(function() {
  const pc = document.getElementById('heroParticles');
  if (!pc) return;
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    const s = Math.random() * 4 + 1;
    Object.assign(p.style, {
      position:'absolute',width:`${s}px`,height:`${s}px`,
      background:Math.random()>0.6?'rgba(200,164,78,0.5)':'rgba(255,255,255,0.2)',
      borderRadius:'50%',left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,
      animation:`fp ${Math.random()*10+6}s linear infinite`,
      animationDelay:`${Math.random()*5}s`
    });
    pc.appendChild(p);
  }
  const st = document.createElement('style');
  st.textContent = '@keyframes fp{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-120vh) translateX(60px);opacity:0}}';
  document.head.appendChild(st);
})();

// ========== GSAP: HERO PARALLAX ==========
if (document.querySelector('.hero')) {
  gsap.to('.hero::before', {
    y: '10%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  // Hero content stagger
  gsap.from('.hero-badge, .hero-title, .hero-subtitle, .hero-actions, .hero-trust', {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out'
  });
}

// ========== GSAP: SCROLL REVEAL SECTIONS ==========
const fadeUpSections = [
  '.section-header',
  '.ps-card',
  '.step-card',
  '.legal-badge',
  '.legal-card',
  '.service-card',
  '.testimonial-card',
  '.value-card',
  '.contact-info-card',
  '.faq-item',
  '.service-detail-grid > *',
  '.about-grid > *',
  '.contact-grid > *'
];

fadeUpSections.forEach(selector => {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  
  gsap.fromTo(els, 
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: els[0].closest('section') || els[0],
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    }
  );
});

// ========== GSAP: COUNTER ANIMATION ==========
document.querySelectorAll('.legal-stat').forEach(stat => {
  const text = stat.textContent;
  const isPercent = text.includes('%');
  const num = parseFloat(text.replace(/[^0-9.]/g, ''));
  
  if (isNaN(num)) return;
  
  gsap.from(stat, {
    textContent: 0,
    duration: 2,
    ease: 'power2.out',
    snap: { textContent: 1 },
    stagger: 0.2,
    scrollTrigger: {
      trigger: stat,
      start: 'top 85%'
    },
    onUpdate: function() {
      stat.textContent = isPercent 
        ? Math.round(this.targets()[0].textContent) + '%'
        : '+' + Math.round(this.targets()[0].textContent);
    }
  });
});

// ========== GSAP: STEP NUMBERS SCALE ==========
gsap.from('.step-number', {
  scale: 0.5,
  opacity: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: 'back.out(1.7)',
  scrollTrigger: {
    trigger: '.steps-grid',
    start: 'top 80%'
  }
});

// ========== GSAP: CTA CARD PARALLAX ==========
if (document.querySelector('.cta-card')) {
  gsap.from('.cta-card', {
    y: 80,
    opacity: 0,
    scale: 0.95,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.cta-card',
      start: 'top 85%'
    }
  });
}

// ========== GSAP: FOOTER REVEAL ==========
gsap.from('.footer-grid > *', {
  y: 40,
  opacity: 0,
  duration: 0.7,
  stagger: 0.1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.footer',
    start: 'top 90%'
  }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

// ========== LUCIDE ICONS ==========
lucide.createIcons();

console.log('MilMat Group GTM v2 — Animado ✓');

// ========== HEADER SCROLL ==========
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
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

// ========== SCROLL ANIMATIONS ==========
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

['.step-card','.service-card','.testimonial-card','.ps-card','.legal-card','.value-card','.contact-info-card'].forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
  });
});

// ========== HERO PARTICLES ==========
(function() {
  const pc = document.getElementById('heroParticles');
  if (!pc) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    const s = Math.random() * 3 + 1;
    Object.assign(p.style, {
      position:'absolute',width:`${s}px`,height:`${s}px`,
      background:Math.random()>0.7?'rgba(200,164,78,0.4)':'rgba(255,255,255,0.15)',
      borderRadius:'50%',left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,
      animation:`fp ${Math.random()*8+6}s linear infinite`,
      animationDelay:`${Math.random()*5}s`
    });
    pc.appendChild(p);
  }
  const st = document.createElement('style');
  st.textContent = '@keyframes fp{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100vh) translateX(40px);opacity:0}}';
  document.head.appendChild(st);
})();

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
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

console.log('MilMat Group GTM — Listo ✓');

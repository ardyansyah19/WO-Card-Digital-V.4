/* ============================================================
   THE WEDDING OF ARYAN & YASMIN — script.js  v2.0
   ============================================================ */
'use strict';

/* ---- helpers ---- */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ====================================================================
   1. LOADING SCREEN
   ==================================================================== */
(function initLoader(){
  const bar = $('loaderBar');
  let pct = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 18 + 4;
    if(pct >= 100){ pct = 100; clearInterval(interval); }
    bar.style.width = pct + '%';
    if(pct >= 100){
      setTimeout(() => {
        $('loader').classList.add('done');
        // remove from DOM after transition
        setTimeout(() => $('loader').remove(), 800);
      }, 350);
    }
  }, 100);
})();

/* ====================================================================
   2. URL PARAMS → GUEST NAME
   ==================================================================== */
(function setGuest(){
  const p = new URLSearchParams(location.search);
  const name = p.get('to') || p.get('nama') || p.get('name') || 'Tamu Undangan';
  const el = $('guestName');
  if(el) el.textContent = decodeURIComponent(name);
})();

/* ====================================================================
   3. PETAL / PARTICLE CANVAS (Cover page)
   ==================================================================== */
(function initPetalCanvas(){
  const canvas = document.querySelector('#petalCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize(){
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const petals = Array.from({length:40}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 5 + 2,
    vx: (Math.random() - .5) * .4,
    vy: Math.random() * .6 + .2,
    alpha: Math.random() * .6 + .2,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - .5) * .02,
    color: Math.random() > .5 ? '#c9a84c' : '#e2c87a',
  }));

  function drawPetal(p){
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r * 2.2, p.r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  let animId;
  function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      p.x  += p.vx; p.y += p.vy;
      p.rot += p.vrot;
      if(p.y > canvas.height + 10){ p.y = -10; p.x = Math.random() * canvas.width; }
      if(p.x < -10) p.x = canvas.width + 10;
      if(p.x > canvas.width + 10) p.x = -10;
      drawPetal(p);
    });
    animId = requestAnimationFrame(loop);
  }
  loop();

  // Stop when cover is hidden
  window.addEventListener('cover-hidden', () => {
    cancelAnimationFrame(animId);
    canvas.style.display = 'none';
  });
})();

/* ====================================================================
   4. OPEN BUTTON — Cover → App
   ==================================================================== */
(function initOpenBtn(){
  const btn    = $('openBtn');
  const cover  = $('cover');
  const app    = $('app');
  if(!btn) return;

  btn.addEventListener('click', () => {
    cover.classList.add('hidden');
    app.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
      cover.style.display = 'none';
      app.classList.add('visible');
      window.dispatchEvent(new Event('cover-hidden'));
      initAllAppFeatures();
    }, 900);
  });
})();

/* ====================================================================
   5. MAIN APP FEATURES (init after cover opened)
   ==================================================================== */
function initAllAppFeatures(){
  initMusic();
  initCountdown();
  initProgressBar();
  initNavDots();
  initReveal();
  initHeroParticles();
  initQuranSparkles();
  initParallax();
  initScrollHint();
  initGalleryLightbox();
  initRSVP();
  initBackToTop();
  initFooterPetals();
}

/* ====================================================================
   6. MUSIC PLAYER
   ==================================================================== */
function initMusic(){
  const audio = $('bgMusic');
  const coverBtn  = $('coverMusicBtn');
  const appBtn    = $('appMusicBtn');
  let playing = false;

  function setIcon(){
    const icon = playing ? '♪' : '♩';
    if(coverBtn) coverBtn.querySelector('.music-icon').textContent = icon;
    if(appBtn)   appBtn.textContent = icon;
    if(appBtn)   playing ? appBtn.classList.add('playing') : appBtn.classList.remove('playing');
  }

  function toggle(){
    if(!audio) return;
    if(playing){ audio.pause(); playing = false; }
    else {
      audio.volume = .35;
      audio.play().catch(() => {});
      playing = true;
    }
    setIcon();
  }

  // Auto-play on app open
  if(audio){
    audio.volume = .35;
    audio.play().then(() => { playing = true; setIcon(); }).catch(() => {});
  }

  if(coverBtn) coverBtn.addEventListener('click', toggle);
  if(appBtn)   appBtn.addEventListener('click',   toggle);
}

/* ====================================================================
   7. COUNTDOWN TIMER (with flip animation)
   ==================================================================== */
function initCountdown(){
  const target = new Date('2026-03-15T08:00:00+07:00').getTime();
  let prev = { d: -1, h: -1, m: -1, s: -1 };

  function pad(n){ return String(n).padStart(2,'0'); }

  function flipUnit(el, newVal, key){
    if(!el || prev[key] === newVal) return;
    el.classList.remove('flip');
    void el.offsetWidth; // reflow
    el.classList.add('flip');
    el.querySelector('span').textContent = newVal;
    prev[key] = newVal;
  }

  function tick(){
    const diff = target - Date.now();
    if(diff <= 0){
      ['cd-day','cd-hour','cd-min','cd-sec'].forEach(id => {
        const el = $(id);
        if(el) el.querySelector('span').textContent = '00';
      });
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    flipUnit($('cd-day'),  pad(d), 'd');
    flipUnit($('cd-hour'), pad(h), 'h');
    flipUnit($('cd-min'),  pad(m), 'm');
    flipUnit($('cd-sec'),  pad(s), 's');
  }
  tick();
  setInterval(tick, 1000);
}

/* ====================================================================
   8. SCROLL PROGRESS BAR
   ==================================================================== */
function initProgressBar(){
  const bar = $('progressBar');
  if(!bar) return;
  function update(){
    const tot = document.documentElement.scrollHeight - window.innerHeight;
    const pct = tot ? (window.scrollY / tot) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
}

/* ====================================================================
   9. NAV DOTS
   ==================================================================== */
function initNavDots(){
  const dots    = $$('.dot');
  const sections = Array.from($$('section[data-nav]'));
  if(!dots.length) return;

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const id = dot.dataset.section;
      const sec = document.getElementById(id);
      if(sec) sec.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const idx = parseInt(e.target.dataset.nav);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      }
    });
  }, { threshold: .4 });

  sections.forEach(s => observer.observe(s));
}

/* ====================================================================
   10. REVEAL ON SCROLL
   ==================================================================== */
function initReveal(){
  const els = $$('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .12 });
  els.forEach(el => obs.observe(el));
}

/* ====================================================================
   11. HERO PARTICLES
   ==================================================================== */
function initHeroParticles(){
  const container = $('heroParticles');
  if(!container) return;
  for(let i = 0; i < 25; i++){
    const p = document.createElement('div');
    p.style.cssText = `
      position:absolute;
      width:${2+Math.random()*4}px;
      height:${2+Math.random()*4}px;
      border-radius:50%;
      background:rgba(201,168,76,${.2+Math.random()*.4});
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      animation:heroFloat ${6+Math.random()*8}s ${Math.random()*6}s ease-in-out infinite;
    `;
    container.appendChild(p);
  }

  // Inject keyframe if not present
  if(!document.querySelector('#heroFloatStyle')){
    const style = document.createElement('style');
    style.id = 'heroFloatStyle';
    style.textContent = `
      @keyframes heroFloat{
        0%,100%{transform:translateY(0) scale(1);opacity:.5}
        50%{transform:translateY(-20px) scale(1.2);opacity:1}
      }
    `;
    document.head.appendChild(style);
  }
}

/* ====================================================================
   12. QUR'AN SPARKLES
   ==================================================================== */
function initQuranSparkles(){
  const container = $('quranSparkles');
  if(!container) return;
  const symbols = ['✦','✧','⋆','✶','❋'];
  for(let i = 0; i < 18; i++){
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.cssText = `
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dur:${3+Math.random()*4}s;
      --delay:${Math.random()*4}s;
      font-size:${10+Math.random()*10}px;
    `;
    container.appendChild(s);
  }
}

/* ====================================================================
   13. PARALLAX (Hero background)
   ==================================================================== */
function initParallax(){
  const bgImg = $('heroBgImg');
  if(!bgImg) return;

  window.addEventListener('scroll', () => {
    const hy = document.getElementById('hero').getBoundingClientRect().top;
    if(hy < window.innerHeight && hy > -window.innerHeight){
      bgImg.style.transform = `translateY(${-hy * .25}px)`;
    }
  }, { passive: true });
}

/* ====================================================================
   14. SCROLL HINT
   ==================================================================== */
function initScrollHint(){
  const hint = $('scrollHint');
  if(!hint) return;
  hint.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('intro').scrollIntoView({ behavior:'smooth' });
  });
  // Hide after user scrolls
  window.addEventListener('scroll', () => {
    if(window.scrollY > 80) hint.style.opacity = '0';
    else hint.style.opacity = '1';
  }, { passive:true });
}

/* ====================================================================
   15. GALLERY LIGHTBOX
   ==================================================================== */
function initGalleryLightbox(){
  const items    = $$('.gal-item');
  const lightbox = $('lightbox');
  const lbImg    = $('lbImg');
  const lbClose  = $('lbClose');
  const lbPrev   = $('lbPrev');
  const lbNext   = $('lbNext');
  const lbCounter= $('lbCounter');
  if(!lightbox) return;

  const srcs = Array.from(items).map(i => i.dataset.src || i.querySelector('img')?.src);
  let cur = 0;

  function open(idx){
    cur = (idx + srcs.length) % srcs.length;
    lbImg.src = srcs[cur];
    lbCounter.textContent = `${cur+1} / ${srcs.length}`;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    lbImg.style.opacity = '0';
    lbImg.onload = () => { lbImg.style.opacity = '1'; };
  }
  function close(){
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click',  () => open(cur - 1));
  lbNext.addEventListener('click',  () => open(cur + 1));
  lightbox.addEventListener('click', e => { if(e.target === lightbox) close(); });

  // Keyboard
  document.addEventListener('keydown', e => {
    if(lightbox.classList.contains('hidden')) return;
    if(e.key === 'ArrowLeft')  open(cur - 1);
    if(e.key === 'ArrowRight') open(cur + 1);
    if(e.key === 'Escape') close();
  });

  // Touch / swipe
  let tx = 0;
  lightbox.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive:true });
  lightbox.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if(Math.abs(dx) > 50){ dx < 0 ? open(cur+1) : open(cur-1); }
  });
}

/* ====================================================================
   16. RSVP FORM & WISHES
   ==================================================================== */
function initRSVP(){
  const form      = $('rsvpForm');
  const container = $('wishContainer');
  const msgArea   = $('fMsg');
  const charCount = $('charCount');
  if(!form || !container) return;

  // Seed wishes
  const seeds = [
    { name:'Budi Santoso',      status:'hadir', msg:'Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Barakallahu lakuma. 🌿', time:'3 jam lalu' },
    { name:'Sari Wulandari',    status:'hadir', msg:'Bahagia banget dengar kabar ini! Semoga langgeng hingga akhir hayat, selalu dalam lindungan Allah. 🤍', time:'6 jam lalu' },
    { name:'Fam. Hendra Wijaya',status:'hadir', msg:'Selamat dan bahagia selalu untuk Aryan dan Yasmin. Semoga Allah ridhai setiap langkah kalian. 💚', time:'1 hari lalu' },
  ];
  seeds.forEach(w => container.appendChild(buildWishCard(w)));

  // Char counter
  if(msgArea && charCount){
    msgArea.addEventListener('input', () => {
      const len = msgArea.value.length;
      charCount.textContent = `${len} / 300`;
      if(len > 300){ msgArea.value = msgArea.value.slice(0,300); }
    });
  }

  // Submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = $('fName').value.trim();
    const attend  = $('fAttend').value;
    const msg     = $('fMsg').value.trim();
    if(!name || !msg) return;

    const card = buildWishCard({ name, status:attend, msg, time:'Baru saja' });
    container.insertBefore(card, container.firstChild);
    setTimeout(() => card.classList.add('vis'), 20);
    form.reset();
    if(charCount) charCount.textContent = '0 / 300';
    showToast('💌 Ucapan berhasil dikirim!');
  });
}

function buildWishCard(data){
  const statusMap = { hadir:'✅ Hadir', tidak:'❌ Tidak Hadir', ragu:'🤔 Masih Ragu' };
  const div = document.createElement('div');
  div.className = 'wish-card reveal';
  div.innerHTML = `
    <div class="wish-head">
      <div class="wish-avatar">${(data.name[0]||'?').toUpperCase()}</div>
      <div>
        <div class="wish-name">${esc(data.name)}</div>
        <div class="wish-meta-row">
          <span class="wish-status">${statusMap[data.status]||data.status}</span>
          <span class="wish-time">${esc(data.time||'')}</span>
        </div>
      </div>
    </div>
    <p class="wish-body">"${esc(data.msg)}"</p>`;
  return div;
}
function esc(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ====================================================================
   17. COPY ACCOUNT NUMBER
   ==================================================================== */
window.copyAcc = function(elId, raw){
  navigator.clipboard.writeText(raw).then(() => {
    showToast('📋 Nomor rekening berhasil disalin!');
    const el = $(elId).nextElementSibling?.nextElementSibling;
    if(!el) return;
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = raw; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    showToast('📋 Nomor rekening berhasil disalin!');
  });
};

/* ====================================================================
   18. ADD TO CALENDAR
   ==================================================================== */
window.addToCalendar = function(title, loc, start, end){
  const url = `https://www.google.com/calendar/render?action=TEMPLATE`
    + `&text=${encodeURIComponent(title)}`
    + `&location=${encodeURIComponent(loc)}`
    + `&dates=${start}/${end}`;
  window.open(url, '_blank', 'noopener');
};

/* ====================================================================
   19. BACK TO TOP
   ==================================================================== */
function initBackToTop(){
  const btn = $('backToTop');
  if(!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

/* ====================================================================
   20. FOOTER PETALS
   ==================================================================== */
function initFooterPetals(){
  const container = $('footerPetals');
  if(!container) return;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes footerFloat{
      0%{transform:translateY(0) rotate(0deg);opacity:0}
      20%{opacity:.7}
      100%{transform:translateY(-120px) rotate(720deg);opacity:0}
    }`;
  document.head.appendChild(style);

  for(let i = 0; i < 20; i++){
    const p = document.createElement('div');
    p.style.cssText = `
      position:absolute;
      bottom:0;
      left:${Math.random()*100}%;
      width:${6+Math.random()*8}px;
      height:${6+Math.random()*8}px;
      border-radius:50% 0 50% 0;
      background:rgba(201,168,76,${.3+Math.random()*.4});
      animation:footerFloat ${4+Math.random()*6}s ${Math.random()*6}s ease-in-out infinite;
    `;
    container.appendChild(p);
  }
}

/* ====================================================================
   21. TOAST NOTIFICATION
   ==================================================================== */
let toastTimer;
function showToast(msg){
  const t = $('toast') || (() => {
    const el = document.createElement('div');
    el.id = 'toast'; el.className = 'toast';
    document.body.appendChild(el); return el;
  })();
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ====================================================================
   22. SMOOTH HOVER TILT on couple cards (desktop)
   ==================================================================== */
(function initTilt(){
  $$('.couple-card, .acara-card, .gift-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) / (r.width/2);
      const y = (e.clientY - r.top - r.height/2) / (r.height/2);
      card.style.transform = `perspective(600px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ====================================================================
   23. AMBIENT CURSOR GLOW (desktop only)
   ==================================================================== */
(function initCursorGlow(){
  if(window.matchMedia('(pointer:coarse)').matches) return; // skip on touch
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;pointer-events:none;z-index:9998;
    width:300px;height:300px;border-radius:50%;
    background:radial-gradient(circle,rgba(201,168,76,.06) 0%,transparent 70%);
    translate:-50% -50%;transition:left .15s ease,top .15s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();

/* ====================================================================
   24. TYPING ANIMATION on hero subtitle (runs immediately)
   ==================================================================== */
(function initTyping(){
  // Will run after the hero is visible (app opened)
  window.addEventListener('cover-hidden', () => {
    const el = document.querySelector('.hero-subtitle');
    if(!el) return;
    const text = el.textContent;
    el.textContent = '';
    el.style.borderRight = '2px solid rgba(255,255,255,.6)';
    let i = 0;
    const typ = setInterval(() => {
      el.textContent += text[i++];
      if(i >= text.length){ clearInterval(typ); el.style.borderRight='none'; }
    }, 40);
  });
})();

// ============================================================
// PRODUCT GENERATOR
// ============================================================
class ProductGenerator {
  constructor() {
    this.adjectives = [
      'Vintage', 'Boho', 'Retro', 'Classic', 'Chic', 'Pre-loved', 'Handpicked',
      'Timeless', 'Eclectic', 'Minimalist', 'Statement', 'Effortless', 'Urban',
      'Romantic', 'Edgy', 'Cozy', 'Structured', 'Flowing', 'Textured', 'Embroidered'
    ];
    this.eras = ['70s', '80s', '90s', 'Y2K', '2000s', '60s', '50s', 'Edwardian', 'Victorian', 'Grunge'];
    this.styles = [
      'Oversized', 'Slim Fit', 'Relaxed', 'Tailored', 'Cropped', 'Flared', 'Straight Leg',
      'High-Waisted', 'Low-Rise', 'Boxy', 'Tunic', 'Wrap', 'A-Line', 'Pencil', 'Maxi', 'Mini'
    ];
    this.garments = {
      'Tops': ['Silk Blouse', 'Cashmere Turtleneck', 'Linen Shirt', 'Cotton Tee', 'Satin Camisole',
        'Wool Sweater', 'Chiffon Top', 'Knit Polo'
      ],
      'Outerwear': ['Denim Jacket', 'Leather Jacket', 'Trench Coat', 'Wool Overcoat', 'Bomber Jacket',
        'Blazer', 'Parka', 'Cardigan'
      ],
      'Denim': ['Jeans', 'Denim Skirt', 'Denim Shorts', 'Denim Dress', 'Denim Jacket', 'Overalls',
        'Denim Shirt'
      ],
      'Vintage Dresses': ['Silk Kimono', 'Floral Dress', 'Velvet Gown', 'Slip Dress', 'Tea Dress',
        'Cocktail Dress', 'Sundress', 'Wrap Dress'
      ],
      'Footwear': ['Leather Boots', 'Sneakers', 'Loafers', 'Heels', 'Sandals', 'Ankle Boots', 'Oxfords',
        'Mules'
      ],
      'Accessories': ['Silk Scarf', 'Leather Belt', 'Vintage Handbag', 'Sunglasses', 'Wool Hat',
        'Statement Necklace', 'Leather Gloves', 'Embroidered Clutch'
      ]
    };
    this.conditions = ['Like New', 'Excellent', 'Gently Used', 'Vintage'];
    this.sizes = ['XS', 'S', 'M', 'L', 'XL'];
    this.descriptions = [
      'A rare find in excellent condition, sourced from a curated estate sale.',
      'Beautifully pre-loved with character and charm, ready for a second life.',
      'Vintage gem with unique details that make it truly one-of-a-kind.',
      'High-quality fabric and construction, in impeccable condition.',
      'A versatile piece that effortlessly transitions from day to night.',
      'Sustainably sourced and gently worn, with minimal signs of wear.',
      'A collector\'s piece with authentic vintage detailing.',
      'Timeless design that never goes out of style.',
      'Soft, breathable fabric perfect for all-day comfort.',
      'A statement piece that adds personality to any wardrobe.'
    ];
  }

  generateId(i) {
    return `TFS-${String(i + 1).padStart(4, '0')}`;
  }

  // --- CLOTHING-RELEVANT IMAGE GENERATION ---
  generateImageUrl(i, category = 'fashion') {
    // Use a seed that combines the index and category for variety
    const seed = i + (category ? '-' + category : '');
    // LoremFlickr returns real fashion/clothing images
    return `https://loremflickr.com/1200/800/fashion,clothing?random=${seed}`;
  }

  generateTitle() {
    const adj = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
    const era = this.eras[Math.floor(Math.random() * this.eras.length)];
    const style = this.styles[Math.floor(Math.random() * this.styles.length)];
    const cats = Object.keys(this.garments);
    const cat = cats[Math.floor(Math.random() * cats.length)];
    const gs = this.garments[cat];
    const g = gs[Math.floor(Math.random() * gs.length)];
    return `${adj} ${era} ${style} ${g}`;
  }

  generateCatalog(count = 500) {
    const products = [];
    const usedTitles = new Set();
    for (let i = 0; i < count; i++) {
      let title = this.generateTitle();
      while (usedTitles.has(title)) title = this.generateTitle();
      usedTitles.add(title);
      const cats = Object.keys(this.garments);
      const category = cats[Math.floor(Math.random() * cats.length)];
      const condition = this.conditions[Math.floor(Math.random() * this.conditions.length)];
      const size = this.sizes[Math.floor(Math.random() * this.sizes.length)];
      const stock = Math.floor(Math.random() * 5) + 1;
      const price = Math.floor(Math.random() * 400) + 25;
      const originalPrice = Math.floor(price * (1 + Math.random() * 0.8));
      const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
      products.push({
        id: this.generateId(i),
        title,
        category,
        price,
        originalPrice,
        discountPercent,
        size,
        condition,
        stock,
        description: this.descriptions[Math.floor(Math.random() * this.descriptions.length)],
        image: this.generateImageUrl(i, category),  // <-- clothing image
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
      });
    }
    return products;
  }
}

// ============================================================
// PARTICLE SYSTEM
// ============================================================
class Particle4D {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollVelocity = 0;
    this.resize();
    this.initParticles(300);
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initParticles(count) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: (Math.random() - 0.5) * this.width * 1.8,
        y: (Math.random() - 0.5) * this.height * 1.8,
        z: Math.random() * 600 - 300,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        speedZ: (Math.random() - 0.5) * 0.3,
        color: `hsla(${Math.random() * 60 + 220}, 70%, 70%, 0.35)`,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    const updateMouse = (x, y) => {
      this.mouse.targetX = (x / this.width) * 2 - 1;
      this.mouse.targetY = (y / this.height) * 2 - 1;
    };
    window.addEventListener('mousemove', (e) => updateMouse(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length) updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    let lastScroll = window.scrollY;
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      this.scrollVelocity = (current - lastScroll) * 0.2;
      lastScroll = current;
    }, { passive: true });
  }

  animate() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    ctx.clearRect(0, 0, w, h);

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    const sv = this.scrollVelocity * 0.01;
    const time = Date.now() * 0.0003;
    const mx = (this.mouse.x * 0.5 + 0.5) * w;
    const my = (this.mouse.y * 0.5 + 0.5) * h;

    for (const p of this.particles) {
      const waveX = Math.sin(time + p.phase) * 0.2;
      const waveY = Math.cos(time * 0.7 + p.phase) * 0.2;
      const dx = mx - p.x;
      const dy = my - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let attractX = 0, attractY = 0;
      if (dist < 200 && dist > 1) {
        const strength = (1 - dist / 200) * 0.02;
        attractX = dx * strength;
        attractY = dy * strength;
      }
      p.x += p.speedX + this.mouse.x * 0.02 * (p.z / 300 + 0.5) + sv * 0.1 + waveX * 0.06 + attractX;
      p.y += p.speedY + this.mouse.y * 0.02 * (p.z / 300 + 0.5) + sv * 0.06 + waveY * 0.06 + attractY;
      p.z += p.speedZ + sv * 0.02;

      if (p.x > w * 1.3) p.x = -w * 0.3;
      if (p.x < -w * 0.3) p.x = w * 1.3;
      if (p.y > h * 1.3) p.y = -h * 0.3;
      if (p.y < -h * 0.3) p.y = h * 1.3;
      if (p.z > 350) p.z = -350;
      if (p.z < -350) p.z = 350;

      const perspective = 450;
      const scale = perspective / (perspective + p.z);
      const px = p.x * scale + w * 0.5;
      const py = p.y * scale + h * 0.5;
      const size = p.size * scale * 0.8;
      const alpha = 0.15 + (p.z / 400) * 0.4 + 0.15;

      ctx.beginPath();
      ctx.arc(px, py, Math.max(size, 0.5), 0, Math.PI * 2);
      ctx.fillStyle = p.color.replace('0.35', Math.min(alpha, 0.7));
      ctx.fill();
    }
    this.scrollVelocity *= 0.93;
    requestAnimationFrame(() => this.animate());
  }
}

// ============================================================
// LIVE TICKER
// ============================================================
class LiveTicker {
  constructor() {
    this.clockElem = document.getElementById('tickerClock');
    this.dateElem = document.getElementById('tickerDate');
    this.locationElem = document.getElementById('tickerLocation');
    this.init();
  }

  init() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
    this.getLocation();
  }

  updateClock() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const h12 = now.getHours() % 12 || 12;
    const min = String(now.getMinutes()).padStart(2, '0');
    const sec = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    this.clockElem.textContent = `${h12}:${min}:${sec} ${ampm}`;
    this.dateElem.textContent = `${y}-${m}-${d}`;
  }

  getLocation() {
    if (!navigator.geolocation) {
      this.locationElem.innerHTML = '<i class="fas fa-map-pin"></i> Geolocation not supported';
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(r => r.json())
          .then(data => {
            const city = data.address?.city || data.address?.town || data.address?.village ||
              data.address?.county || 'Unknown';
            this.locationElem.innerHTML = `<i class="fas fa-map-pin"></i> ${city}`;
          })
          .catch(() => {
            this.locationElem.innerHTML = `<i class="fas fa-map-pin"></i> ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          });
      },
      () => { this.locationElem.innerHTML = '<i class="fas fa-map-pin"></i> Location unavailable'; },
      { timeout: 5000 }
    );
  }
}

// ============================================================
// MAIN APPLICATION
// ============================================================
class ThriftApp {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.currentPage = 1;
    this.itemsPerPage = 24;
    this.cart = [];
    this.currentUser = localStorage.getItem('thrift_user') || null;
    this.visitorCount = parseInt(localStorage.getItem('thrift_visitor_count')) || 1842;
    this.isFirstVisit = !localStorage.getItem('thrift_user');

    this.$ = (s) => document.querySelector(s);
    this.$$ = (s) => [...document.querySelectorAll(s)];

    this.loadingScreen = this.$('#loadingScreen');
    this.loaderFill = this.$('#loaderFill');
    this.heroSwiper = null;
    this.heroSliderWrapper = this.$('#heroSliderWrapper');

    this.init();
  }

  async init() {
    // Loading progress
    let progress = 0;
    const loadInterval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress > 100) progress = 100;
      if (this.loaderFill) this.loaderFill.style.width = `${Math.min(progress, 100)}%`;
      if (progress >= 100) {
        clearInterval(loadInterval);
        setTimeout(() => {
          if (this.loadingScreen) this.loadingScreen.classList.add('hidden');
        }, 400);
      }
    }, 120);

    // Load products
    try {
      const res = await fetch('data/products.json');
      if (res.ok) {
        const data = await res.json();
        if (data && data.length) this.products = data;
        else throw new Error('empty');
      } else throw new Error('fetch fail');
    } catch (_) {
      const gen = new ProductGenerator();
      this.products = gen.generateCatalog(500);
    }
    if (this.products.length < 500) {
      const gen = new ProductGenerator();
      const extra = gen.generateCatalog(500 - this.products.length);
      const offset = this.products.length;
      extra.forEach((p, i) => p.id = `TFS-${String(offset + i + 1).padStart(4, '0')}`);
      this.products = [...this.products, ...extra];
    }
    this.filteredProducts = [...this.products];
    if (this.$('#totalProductsCount')) {
      this.$('#totalProductsCount').textContent = `${this.products.length}+`;
    }

    this.updateVisitorCounter();
    if (this.isFirstVisit) this.showFirstVisitModal();
    else this.updateGreeting();

    this.initLenis();
    this.buildHeroSlider();
    this.initRiveLogo();
    this.initRiveGreeting();
    this.initRiveGauges();

    this.bindEvents();
    this.handleRoute();
    this.renderFeaturedProducts();
    this.renderShop();

    // Global image error fallback — now uses clothing placeholder
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
        e.target.src = 'https://loremflickr.com/1200/800/fashion?random=fallback';
      }
    }, true);

    // Header scroll effects
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const header = this.$('#siteHeader');
      if (header) {
        if (window.scrollY > 60) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        if (window.scrollY > 200 && window.scrollY > lastScroll) {
          header.classList.add('hidden-header');
        } else {
          header.classList.remove('hidden-header');
        }
        lastScroll = window.scrollY;
      }
    }, { passive: true });

    // GSAP for impact cards
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.impact-card', {
        scrollTrigger: {
          trigger: '#impactSection',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }
  }

  // ----- HERO SLIDER -----
  buildHeroSlider() {
    let featured = this.products.filter(p => p.discountPercent >= 10);
    if (featured.length < 6) {
      const shuffled = [...this.products].sort(() => 0.5 - Math.random());
      featured = shuffled.slice(0, 10);
    } else {
      featured = featured.sort(() => 0.5 - Math.random()).slice(0, 10);
    }
    if (featured.length < 5) {
      const shuffled = [...this.products].sort(() => 0.5 - Math.random());
      featured = shuffled.slice(0, 8);
    }

    this.heroSliderWrapper.innerHTML = featured.map((p) => `
      <div class="swiper-slide" data-id="${p.id}">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
      </div>
    `).join('');

    if (this.heroSwiper) this.heroSwiper.destroy(true, true);

    this.heroSwiper = new Swiper('#heroSwiper', {
      loop: true,
      speed: 800,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: '.hero-slider .swiper-button-next',
        prevEl: '.hero-slider .swiper-button-prev',
      },
      pagination: {
        el: '#heroPagination',
        clickable: true,
        dynamicBullets: true,
      },
      on: {
        slideChangeTransitionStart: () => {
          const slides = this.heroSliderWrapper.querySelectorAll('.swiper-slide');
          slides.forEach((s) => {
            if (s.classList.contains('swiper-slide-active')) {
              s.querySelector('img').style.transform = 'scale(1.06)';
            } else {
              s.querySelector('img').style.transform = 'scale(1)';
            }
          });
        },
        slideChangeTransitionEnd: () => {
          const active = this.heroSliderWrapper.querySelector('.swiper-slide-active');
          if (active) {
            active.querySelector('img').style.transform = 'scale(1.06)';
          }
        }
      }
    });

    setTimeout(() => {
      const active = this.heroSliderWrapper.querySelector('.swiper-slide-active');
      if (active) {
        active.querySelector('img').style.transform = 'scale(1.06)';
      }
    }, 200);

    // Category filter for hero
    const cats = this.$$('#heroCategories button');
    cats.forEach(btn => {
      btn.addEventListener('click', () => {
        cats.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        this.filterHeroSlides(category);
      });
    });
  }

  filterHeroSlides(category) {
    if (!this.heroSwiper) return;
    const slides = this.heroSliderWrapper.querySelectorAll('.swiper-slide');
    let visibleCount = 0;
    slides.forEach((slide) => {
      const id = slide.dataset.id;
      const product = this.products.find(p => p.id === id);
      const match = category === 'all' || (product && product.category === category);
      if (match) {
        slide.style.display = '';
        visibleCount++;
      } else {
        slide.style.display = 'none';
      }
    });
    if (visibleCount === 0) {
      slides.forEach(s => s.style.display = '');
      visibleCount = slides.length;
    }
    this.heroSwiper.update();
    this.heroSwiper.loop = visibleCount >= 2;
    this.heroSwiper.update();
    this.heroSwiper.slideTo(0, 0);
    this.heroSwiper.autoplay.start();
  }

  // ----- LENIS -----
  initLenis() {
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      window.lenis = lenis;
    }
  }

  // ----- VISITOR COUNTER -----
  updateVisitorCounter() {
    if (!sessionStorage.getItem('visitor_counted')) {
      this.visitorCount += Math.floor(Math.random() * 3) + 1;
      localStorage.setItem('thrift_visitor_count', this.visitorCount);
      sessionStorage.setItem('visitor_counted', 'true');
    }
    if (this.$('#visitorCount')) {
      this.$('#visitorCount').textContent = this.visitorCount.toLocaleString();
    }
  }

  // ----- FIRST VISIT MODAL -----
  showFirstVisitModal() {
    const modal = this.$('#firstVisitModal');
    if (modal) {
      modal.classList.add('active');
      this.$('#firstNameInput')?.focus();
    }
  }

  hideFirstVisitModal() {
    this.$('#firstVisitModal')?.classList.remove('active');
  }

  handleNameSubmit() {
    const name = this.$('#firstNameInput')?.value.trim();
    if (name) {
      localStorage.setItem('thrift_user', name);
      this.currentUser = name;
      this.updateGreeting();
      this.hideFirstVisitModal();
      this.showToast(`Welcome, ${name}!`);
      const banner = this.$('#bannerGreeting');
      if (banner && typeof anime !== 'undefined') {
        anime({
          targets: banner,
          scale: [0.5, 1.3, 1],
          duration: 700,
          easing: 'easeOutQuad',
          color: ['#66E5F3', '#FFFFFF']
        });
      }
    } else {
      const input = this.$('#firstNameInput');
      if (input) {
        input.style.borderColor = '#F06OD3';
        setTimeout(() => input.style.borderColor = '', 1500);
      }
    }
  }

  updateGreeting() {
    const name = this.currentUser || 'Guest';
    if (this.$('#userGreeting')) this.$('#userGreeting').textContent = `Welcome, ${name}`;
    if (this.$('#bannerGreeting')) this.$('#bannerGreeting').textContent = `Welcome, ${name}!`;
  }

  // ----- RIVE LOGO (canvas animation) -----
  initRiveLogo() {
    const container = document.getElementById('logoRive');
    if (!container) return;
    const canvas = document.createElement('canvas');
    canvas.width = 48;
    canvas.height = 48;
    canvas.style.width = '48px';
    canvas.style.height = '48px';
    canvas.style.display = 'block';
    canvas.style.borderRadius = '50%';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let t = 0;
    const draw = () => {
      t += 0.025;
      ctx.clearRect(0, 0, 48, 48);
      const grad = ctx.createRadialGradient(24, 24, 2, 24, 24, 24);
      grad.addColorStop(0, '#66E5F3');
      grad.addColorStop(1, '#800020');
      ctx.beginPath();
      ctx.arc(24, 24, 22, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      const float = Math.sin(t * 0.7) * 1.8;
      ctx.font = 'bold 22px "Cormorant Garamond", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('T', 20, 24 + float - 1);
      ctx.fillStyle = '#F06OD3';
      ctx.fillText('F', 28, 24 + float - 1);
      for (let i = 0; i < 8; i++) {
        const angle = t * 0.6 + i * 0.785;
        const r = 18 + Math.sin(t * 0.5 + i * 0.9) * 2.5;
        const px = 24 + Math.cos(angle) * r;
        const py = 24 + Math.sin(angle) * r;
        const size = 1.5 + Math.sin(t * 0.7 + i * 1.2) * 0.8;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(size, 0.5), 0, Math.PI * 2);
        const hue = [220, 280, 330, 40, 70][i % 5];
        ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${0.5 + Math.sin(t + i) * 0.2})`;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(24, 24, 20, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(102,229,243,${0.15 + Math.sin(t * 0.5) * 0.05})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([2, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
      requestAnimationFrame(draw);
    };
    draw();
  }

  // ----- RIVE GREETING (canvas animation) -----
  initRiveGreeting() {
    const container = document.getElementById('riveGreeting');
    if (!container) return;
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 60;
    canvas.style.width = '100%';
    canvas.style.height = '60px';
    canvas.style.borderRadius = '8px';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let t = 0;
    const draw = () => {
      t += 0.025;
      ctx.clearRect(0, 0, 240, 60);
      const wave = Math.sin(t * 0.6) * 2.5;
      ctx.strokeStyle = '#F06OD3';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(120, 18 + wave, 12, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(108, 18 + wave);
      ctx.lineTo(108, 36 + wave);
      ctx.lineTo(132, 36 + wave);
      ctx.lineTo(132, 18 + wave);
      ctx.stroke();
      for (let i = 0; i < 10; i++) {
        const a = t * 0.5 + i * 0.628;
        const r = 18 + Math.sin(t * 0.5 + i * 0.8) * 3;
        const px = 120 + Math.cos(a) * r;
        const py = 28 + Math.sin(a) * r * 0.5 + wave;
        ctx.beginPath();
        ctx.arc(px, py, 1.8 + Math.sin(t * 0.6 + i) * 0.8, 0, Math.PI * 2);
        const hue = [220, 280, 330, 40, 70][i % 5];
        ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${0.5 + Math.sin(t * 0.7 + i) * 0.2})`;
        ctx.fill();
      }
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText('thrift experience', 120, 52);
      requestAnimationFrame(draw);
    };
    draw();
  }

  // ----- RIVE GAUGES -----
  initRiveGauges() {
    const containers = [
      document.getElementById('riveGauge1'),
      document.getElementById('riveGauge2'),
      document.getElementById('riveGauge3')
    ];
    const colors = ['#66E5F3', '#F06OD3', '#FAB65C'];
    const labels = ['Items', 'Water', 'CO₂'];
    for (let idx = 0; idx < containers.length; idx++) {
      const container = containers[idx];
      if (!container) continue;
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 110;
      canvas.style.width = '100%';
      canvas.style.height = '110px';
      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      let progress = 0;
      const target = 0.5 + Math.random() * 0.45;
      let hasStarted = false;
      const draw = () => {
        if (!hasStarted) {
          const rect = container.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (isVisible) {
            hasStarted = true;
            if (typeof anime !== 'undefined') {
              anime({
                targets: { val: progress },
                val: target,
                duration: 2000,
                easing: 'easeOutCubic',
                update: (a) => {
                  progress = a.animations[0].currentValue;
                }
              });
            }
          }
        }
        ctx.clearRect(0, 0, 200, 110);
        ctx.beginPath();
        ctx.arc(100, 72, 42, 0.75 * Math.PI, 2.25 * Math.PI);
        ctx.strokeStyle = 'rgba(255,255,255,0.10)';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.stroke();
        const startAngle = 0.75 * Math.PI;
        const endAngle = 0.75 * Math.PI + Math.min(progress, 1) * 1.5 * Math.PI;
        ctx.beginPath();
        ctx.arc(100, 72, 42, startAngle, endAngle);
        ctx.strokeStyle = colors[idx % colors.length];
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.shadowColor = colors[idx % colors.length];
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.arc(100, 72, 42, startAngle, endAngle);
        ctx.strokeStyle = colors[idx % colors.length];
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
        const pct = Math.round(Math.min(progress, 1) * 100);
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = 'bold 20px "Cormorant Garamond", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${pct}%`, 100, 74);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '11px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(labels[idx % labels.length], 100, 98);
        requestAnimationFrame(draw);
      };
      draw();
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          hasStarted = true;
          if (typeof anime !== 'undefined') {
            anime({
              targets: { val: progress },
              val: target,
              duration: 2000,
              easing: 'easeOutCubic',
              update: (a) => {
                progress = a.animations[0].currentValue;
              }
            });
          }
        }
      }, { threshold: 0.3 });
      observer.observe(container);
    }
  }

  // ----- PRODUCT CARD RENDERING -----
  createProductCardHTML(p) {
    const hasDiscount = p.discountPercent > 0;
    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-image-container">
          <img class="product-image" src="${p.image}" alt="${p.title}" loading="lazy" />
          ${hasDiscount ? `<span class="discount-badge">&#8722;${p.discountPercent}%</span>` : ''}
        </div>
        <div class="product-info">
          <div class="product-meta">
            <span>${p.category || 'Uncategorized'}</span>
            <span>${p.condition || 'Gently Used'}</span>
          </div>
          <div class="product-title">${p.title}</div>
          <div class="product-price-row">
            $${p.price.toFixed(2)}
            ${hasDiscount ? `<span class="original">$${p.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <div class="product-actions">
            <button class="add-to-cart-btn" data-id="${p.id}">
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderFeaturedProducts() {
    const grid = this.$('#featuredGrid');
    if (!grid) return;
    const featured = [...this.products]
      .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
      .slice(0, 4);
    grid.innerHTML = featured.map(p => this.createProductCardHTML(p)).join('');
    this.attachProductCardEvents(grid);
  }

  attachProductCardEvents(container) {
    container.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.dataset.id;
        if (id) this.openProductModal(id);
      });
      card.querySelector('.add-to-cart-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = card.dataset.id;
        if (id) this.addToCart(id);
      });
    });
  }

  // ----- SHOP RENDERING -----
  renderShop() {
    this.applyFilters();
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const pageItems = this.filteredProducts.slice(start, end);
    const grid = this.$('#productGrid');
    if (!grid) return;

    if (!pageItems.length) {
      grid.innerHTML = `<div class="no-results">No products match your filters. Try adjusting your search.</div>`;
    } else {
      grid.innerHTML = pageItems.map(p => this.createProductCardHTML(p)).join('');
      this.attachProductCardEvents(grid);
    }
    this.renderPagination();
  }

  applyFilters() {
    const search = this.$('#searchInput')?.value.toLowerCase().trim() || '';
    const category = this.$('#categoryFilter')?.value || 'all';
    const size = this.$('#sizeFilter')?.value || 'all';
    const condition = this.$('#conditionFilter')?.value || 'all';
    const maxPrice = parseInt(this.$('#priceSlider')?.value) || 500;
    const sort = this.$('#sortSelect')?.value || 'featured';

    this.filteredProducts = this.products.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search) ||
        (p.category && p.category.toLowerCase().includes(search)) ||
        (p.condition && p.condition.toLowerCase().includes(search));
      const matchCategory = category === 'all' || p.category === category;
      const matchSize = size === 'all' || p.size === size;
      const matchCondition = condition === 'all' || p.condition === condition;
      const matchPrice = p.price <= maxPrice;
      return matchSearch && matchCategory && matchSize && matchCondition && matchPrice;
    });

    switch (sort) {
      case 'price-asc': this.filteredProducts.sort((a, b) => a.price - b.price); break;
      case 'price-desc': this.filteredProducts.sort((a, b) => b.price - a.price); break;
      case 'newest': this.filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      case 'discount': this.filteredProducts.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0)); break;
      default:
        this.filteredProducts.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0) || a.title.localeCompare(b.title));
    }
    this.currentPage = 1;
    if (this.$('#priceDisplay')) this.$('#priceDisplay').textContent = `$${maxPrice}`;
  }

  renderPagination() {
    const total = this.filteredProducts.length;
    const totalPages = Math.ceil(total / this.itemsPerPage) || 1;
    const pag = this.$('#pagination');
    if (!pag) return;
    if (totalPages <= 1) { pag.innerHTML = ''; return; }

    let html = `<button class="page-btn" data-page="prev" ${this.currentPage <= 1 ? 'disabled' : ''}>&#8249;</button>`;
    const maxVisible = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    if (endPage - startPage < maxVisible - 1) startPage = Math.max(1, endPage - maxVisible + 1);

    if (startPage > 1) html += `<button class="page-btn" data-page="1">1</button>${startPage > 2 ? '…' : ''}`;
    for (let i = startPage; i <= endPage; i++) {
      html += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    if (endPage < totalPages) html += `${endPage < totalPages - 1 ? '…' : ''}<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
    html += `<button class="page-btn" data-page="next" ${this.currentPage >= totalPages ? 'disabled' : ''}>&#8250;</button>`;

    pag.innerHTML = html;
    pag.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        if (page === 'prev' && this.currentPage > 1) this.currentPage--;
        else if (page === 'next' && this.currentPage < totalPages) this.currentPage++;
        else if (page !== 'prev' && page !== 'next') this.currentPage = parseInt(page);
        this.renderShop();
        window.scrollTo({ top: this.$('#view-shop')?.offsetTop - 80 || 0, behavior: 'smooth' });
      });
    });
  }

  // ----- PRODUCT MODAL -----
  openProductModal(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) return;
    const content = this.$('#productDetailsContent');
    if (!content) return;
    const hasDiscount = product.discountPercent > 0;
    const stockStatus = product.stock > 2 ? 'in-stock' : 'low-stock';
    const stockLabel = product.stock > 2 ? `In Stock (${product.stock})` : `Only ${product.stock} left!`;

    content.innerHTML = `
      <img class="product-details-image" src="${product.image}" alt="${product.title}" />
      <div class="product-details-info">
        <h2>${product.title}</h2>
        <div class="detail-price">
          $${product.price.toFixed(2)}
          ${hasDiscount ? `<span class="detail-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
          ${hasDiscount ? `<span style="color:var(--color-pink);font-size:1rem;margin-left:0.5rem;">&#8722;${product.discountPercent}%</span>` : ''}
        </div>
        <div class="detail-meta">
          <span class="detail-tag">${product.category || 'Uncategorized'}</span>
          <span class="detail-tag">${product.size || 'M'}</span>
          <span class="detail-tag">${product.condition || 'Gently Used'}</span>
          <span class="detail-tag stock-status ${stockStatus}">${stockLabel}</span>
        </div>
        <p style="color:var(--color-gray-dark);margin:var(--space-sm) 0;font-size:1.05rem;">${product.description || 'A beautifully curated pre-loved piece with character and charm.'}</p>
        <button class="btn btn-primary" id="modalAddToCart" style="width:100%;margin-top:var(--space-sm);">
          <i class="fas fa-cart-plus"></i> Add to Cart — $${product.price.toFixed(2)}
        </button>
      </div>
    `;
    this.$('#productModal')?.classList.add('active');
    this.$('#modalAddToCart')?.addEventListener('click', () => {
      this.addToCart(product.id);
      this.$('#productModal')?.classList.remove('active');
    });
  }

  closeProductModal() {
    this.$('#productModal')?.classList.remove('active');
  }

  // ----- CART -----
  addToCart(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) return;
    const existing = this.cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ ...product, qty: 1 });
    }
    this.updateCartUI();
    this.showToast(`Added "${product.title}" to cart`);
  }

  removeFromCart(id) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.updateCartUI();
  }

  updateQuantity(id, delta) {
    const item = this.cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.removeFromCart(id);
    else this.updateCartUI();
  }

  updateCartUI() {
    const container = this.$('#cartItems');
    const summary = this.$('#cartSummary');
    if (!container || !summary) return;

    const totalItems = this.cart.reduce((sum, i) => sum + i.qty, 0);
    const badge = this.$('#cartBadge');
    if (badge) {
      badge.textContent = totalItems;
      badge.classList.remove('bump');
      void badge.offsetWidth;
      badge.classList.add('bump');
    }

    if (!this.cart.length) {
      container.innerHTML = `<p style="color:var(--color-gray-mid);text-align:center;padding:var(--space-lg) 0;font-size:1.05rem;"><i class="fas fa-shopping-bag" style="margin-right:0.5rem;"></i> Your cart is empty. Start adding some treasures!</p>`;
      summary.innerHTML = '';
      return;
    }

    container.innerHTML = this.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}" />
        <div class="cart-item-info">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="quantity-controls">
            <button class="quantity-btn" data-id="${item.id}" data-delta="-1">&#8722;</button>
            <span style="font-weight:700;min-width:28px;text-align:center;font-size:1rem;">${item.qty}</span>
            <button class="quantity-btn" data-id="${item.id}" data-delta="1">+</button>
          </div>
        </div>
        <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
      </div>
    `).join('');

    container.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.updateQuantity(btn.dataset.id, parseInt(btn.dataset.delta));
      });
    });
    container.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        this.removeFromCart(btn.dataset.id);
      });
    });

    const subtotal = this.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    summary.innerHTML = `
      <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span></div>
      <div class="summary-row"><span>Tax (8%)</span><span>$${tax.toFixed(2)}</span></div>
      <div class="summary-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
    `;
  }

  generateInvoice() {
    if (!this.cart.length) {
      this.showToast('Cart is empty. Add items first!');
      return;
    }
    const subtotal = this.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const now = new Date().toLocaleString();

    let rows = this.cart.map(item => `
      <tr>
        <td>${item.title}</td>
        <td>${item.qty}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${(item.price * item.qty).toFixed(2)}</td>
      </tr>
    `).join('');

    this.$('#invoiceContent').innerHTML = `
      <div class="invoice-header">
        <h2 style="color:var(--color-burgundy);"><i class="fas fa-file-invoice"></i> Thrift Fashion Invoice</h2>
        <p style="color:var(--color-gray-dark);font-size:1rem;">${now}</p>
        <p style="color:var(--color-gray-dark);font-size:1rem;">Customer: ${this.currentUser || 'Guest'}</p>
      </div>
      <table class="invoice-table">
        <thead><tr><th>Item</th><th>Qty</th><th>Unit</th><th>Total</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="text-align:right;padding-top:var(--space-sm);">
        <div style="display:flex;justify-content:flex-end;gap:var(--space-lg);font-size:1rem;">
          <span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:var(--space-lg);font-size:1rem;">
          <span>Shipping:</span><span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:var(--space-lg);font-size:1rem;">
          <span>Tax:</span><span>$${tax.toFixed(2)}</span>
        </div>
        <div class="invoice-total" style="display:flex;justify-content:flex-end;gap:var(--space-lg);font-size:1.4rem;border-top:2px solid var(--color-burgundy);padding-top:0.5rem;margin-top:0.3rem;">
          <span>Total:</span><span>$${total.toFixed(2)}</span>
        </div>
      </div>
      <p style="text-align:center;color:var(--color-gray-mid);font-size:0.85rem;margin-top:var(--space-sm);">Thank you for shopping sustainably!</p>
    `;
    this.$('#invoiceModal')?.classList.add('active');
  }

  // ----- TOAST -----
  showToast(msg) {
    const container = this.$('#toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3200);
  }

  // ----- EVENT BINDING -----
  bindEvents() {
    // Cart toggle
    this.$('#cartToggle')?.addEventListener('click', () => {
      this.$('#cartDrawer')?.classList.toggle('open');
    });
    this.$('#cartOverlay')?.addEventListener('click', () => {
      this.$('#cartDrawer')?.classList.remove('open');
    });
    this.$('#closeCartDrawer')?.addEventListener('click', () => {
      this.$('#cartDrawer')?.classList.remove('open');
    });

    // First visit
    this.$('#saveNameBtn')?.addEventListener('click', () => this.handleNameSubmit());
    this.$('#firstNameInput')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleNameSubmit();
    });

    // Product modal
    this.$('#closeProductModal')?.addEventListener('click', () => this.closeProductModal());
    this.$('#productModal')?.addEventListener('click', (e) => {
      if (e.target === this.$('#productModal')) this.closeProductModal();
    });

    // Invoice modal
    this.$('#closeInvoiceModal')?.addEventListener('click', () => {
      this.$('#invoiceModal')?.classList.remove('active');
    });
    this.$('#invoiceModal')?.addEventListener('click', (e) => {
      if (e.target === this.$('#invoiceModal')) this.$('#invoiceModal')?.classList.remove('active');
    });
    this.$('#printInvoiceBtn')?.addEventListener('click', () => { window.print(); });
    this.$('#generateInvoiceBtn')?.addEventListener('click', () => this.generateInvoice());

    // Mobile menu
    this.$('#menuToggle')?.addEventListener('click', () => {
      this.$('#mainNav')?.classList.toggle('open');
    });

    // Shop filters
    this.$('#searchInput')?.addEventListener('input', () => this.renderShop());
    this.$('#categoryFilter')?.addEventListener('change', () => this.renderShop());
    this.$('#sizeFilter')?.addEventListener('change', () => this.renderShop());
    this.$('#conditionFilter')?.addEventListener('change', () => this.renderShop());
    this.$('#sortSelect')?.addEventListener('change', () => this.renderShop());
    this.$('#priceSlider')?.addEventListener('input', (e) => {
      if (this.$('#priceDisplay')) this.$('#priceDisplay').textContent = `$${e.target.value}`;
      this.renderShop();
    });
    this.$('#itemsPerPage')?.addEventListener('change', (e) => {
      this.itemsPerPage = parseInt(e.target.value);
      this.currentPage = 1;
      this.renderShop();
    });

    // Feedback form
    this.$('#feedbackForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.showToast('Thank you for your feedback!');
      e.target.reset();
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeProductModal();
        this.$('#invoiceModal')?.classList.remove('active');
        this.$('#cartDrawer')?.classList.remove('open');
        this.$('#firstVisitModal')?.classList.remove('active');
      }
    });
  }

  // ----- ROUTING -----
  handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    this.switchView(hash);
    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '') || 'home';
      this.switchView(h);
    });
    this.$$('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        if (view) {
          window.location.hash = view;
          this.switchView(view);
        }
      });
    });
  }

  switchView(view) {
    this.$$('.view').forEach(v => v.classList.remove('active'));
    const target = this.$(`#view-${view}`);
    if (target) target.classList.add('active');
    this.$$('.nav-link').forEach(l => {
      l.classList.toggle('active', l.dataset.view === view);
    });
    if (view === 'shop') this.renderShop();
    if (view === 'home') {
      if (this.heroSwiper) this.heroSwiper.autoplay.start();
    } else {
      if (this.heroSwiper) this.heroSwiper.autoplay.stop();
    }
    this.$('#mainNav')?.classList.remove('open');
  }
}

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const app = new ThriftApp();
  new LiveTicker();
  window.__app = app;
});

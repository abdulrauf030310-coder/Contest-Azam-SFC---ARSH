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
      Tops: ['Silk Blouse', 'Cashmere Turtleneck', 'Linen Shirt', 'Cotton Tee', 'Satin Camisole', 'Wool Sweater', 'Chiffon Top', 'Knit Polo'],
      Outerwear: ['Denim Jacket', 'Leather Jacket', 'Trench Coat', 'Wool Overcoat', 'Bomber Jacket', 'Blazer', 'Parka', 'Cardigan'],
      Denim: ['Jeans', 'Denim Skirt', 'Denim Shorts', 'Denim Dress', 'Denim Jacket', 'Overalls', 'Denim Shirt'],
      'Vintage Dresses': ['Silk Kimono', 'Floral Dress', 'Velvet Gown', 'Slip Dress', 'Tea Dress', 'Cocktail Dress', 'Sundress', 'Wrap Dress'],
      Footwear: ['Leather Boots', 'Sneakers', 'Loafers', 'Heels', 'Sandals', 'Ankle Boots', 'Oxfords', 'Mules'],
      Accessories: ['Silk Scarf', 'Leather Belt', 'Vintage Handbag', 'Sunglasses', 'Wool Hat', 'Statement Necklace', 'Leather Gloves', 'Embroidered Clutch']
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
      "A collector's piece with authentic vintage detailing.",
      'Timeless design that never goes out of style.',
      'Soft, breathable fabric perfect for all-day comfort.',
      'A statement piece that adds personality to any wardrobe.'
    ];
  }

  // Helper pick method to simplify random selections
  getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  generateId(index) {
    return `TFS-${String(index + 1).padStart(4, '0')}`;
  }

  generateImageUrl(index) {
    return `https://loremflickr.com/1200/800/fashion,clothing?random=${index + Date.now()}`;
  }

  generateTitle() {
    const adj = this.getRandom(this.adjectives);
    const era = this.getRandom(this.eras);
    const style = this.getRandom(this.styles);
    const categories = Object.keys(this.garments);
    const cat = this.getRandom(categories);
    const item = this.getRandom(this.garments[cat]);

    return `${adj} ${era} ${style} ${item}`;
  }

  generateCatalog(count = 500) {
    const products = [];
    const usedTitles = new Set();
    const categories = Object.keys(this.garments);

    for (let i = 0; i < count; i++) {
      let title = this.generateTitle();
      while (usedTitles.has(title)) {
        title = this.generateTitle();
      }
      usedTitles.add(title);

      const category = this.getRandom(categories);
      const condition = this.getRandom(this.conditions);
      const size = this.getRandom(this.sizes);
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
        description: this.getRandom(this.descriptions),
        image: this.generateImageUrl(i),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 1e10)).toISOString()
      });
    }

    return products;
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
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = now.getHours();
    const h12 = hours % 12 || 12;
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    if (this.clockElem) this.clockElem.textContent = `${h12}:${minutes}:${seconds} ${ampm}`;
    if (this.dateElem) this.dateElem.textContent = `${year}-${month}-${day}`;
  }

  async getLocation() {
    if (!navigator.geolocation) {
      if (this.locationElem) this.locationElem.innerHTML = '<i class="fas fa-map-pin"></i> Geolocation not supported';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || data.address?.county || 'Unknown';
          
          if (this.locationElem) {
            this.locationElem.innerHTML = `<i class="fas fa-map-pin"></i> ${city}`;
          }
        } catch {
          if (this.locationElem) {
            this.locationElem.innerHTML = `<i class="fas fa-map-pin"></i> ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          }
        }
      },
      () => {
        if (this.locationElem) this.locationElem.innerHTML = '<i class="fas fa-map-pin"></i> Location unavailable';
      },
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
    this.visitorCount = parseInt(localStorage.getItem('thrift_visitor_count'), 10) || 1842;
    this.isFirstVisit = !this.currentUser;

    this.loadingScreen = document.querySelector('#loadingScreen');
    this.loaderFill = document.querySelector('#loaderFill');
    this.heroSwiper = null;
    this.heroSliderWrapper = document.querySelector('#heroSliderWrapper');

    this.init();
  }

  async init() {
    this.handleLoadingProgress();

    // Fetch or generate product inventory
    try {
      const res = await fetch('data/products.json');
      if (!res.ok) throw new Error('Network response failed');
      const data = await res.json();
      
      if (Array.isArray(data) && data.length) {
        this.products = data;
      } else {
        throw new Error('Empty payload');
      }
    } catch {
      const gen = new ProductGenerator();
      this.products = gen.generateCatalog(500);
    }

    if (this.products.length < 500) {
      const gen = new ProductGenerator();
      const extra = gen.generateCatalog(500 - this.products.length);
      const offset = this.products.length;
      
      extra.forEach((p, idx) => (p.id = `TFS-${String(offset + idx + 1).padStart(4, '0')}`));
      this.products.push(...extra);
    }

    this.filteredProducts = [...this.products];

    const totalCountElem = document.querySelector('#totalProductsCount');
    if (totalCountElem) {
      totalCountElem.textContent = `${this.products.length}+`;
    }

    this.updateVisitorCounter();
    if (this.isFirstVisit) {
      this.showFirstVisitModal();
    } else {
      this.updateGreeting();
    }

    this.initLenis();
    this.buildHeroSlider();
    this.initRiveLogo();
    this.initRiveGreeting();
    this.initRiveGauges();

    this.bindEvents();
    this.handleRoute();
    this.renderFeaturedProducts();
    this.renderShop();

    // Image fallback handling
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
        e.target.src = 'https://loremflickr.com/1200/800/fashion?random=fallback';
      }
    }, true);

    // Header scroll behaviors
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const header = document.querySelector('#siteHeader');
      if (!header) return;

      const currentScroll = window.scrollY;
      header.classList.toggle('scrolled', currentScroll > 60);

      if (currentScroll > 200 && currentScroll > lastScroll) {
        header.classList.add('hidden-header');
      } else {
        header.classList.remove('hidden-header');
      }
      lastScroll = currentScroll;
    }, { passive: true });

    // GSAP ScrollTrigger integration
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

  handleLoadingProgress() {
    let progress = 0;
    const loadInterval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      
      if (this.loaderFill) {
        this.loaderFill.style.width = `${Math.min(progress, 100)}%`;
      }

      if (progress >= 100) {
        clearInterval(loadInterval);
        setTimeout(() => {
          this.loadingScreen?.classList.add('hidden');
        }, 400);
      }
    }, 120);
  }

  // ----- HERO SLIDER -----
  buildHeroSlider() {
    let featured = this.products.filter(p => p.discountPercent >= 10);
    
    if (featured.length < 6) {
      featured = [...this.products].sort(() => 0.5 - Math.random()).slice(0, 10);
    } else {
      featured = featured.sort(() => 0.5 - Math.random()).slice(0, 10);
    }

    if (this.heroSliderWrapper) {
      this.heroSliderWrapper.innerHTML = featured.map((p) => `
        <div class="swiper-slide" data-id="${p.id}">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
        </div>
      `).join('');
    }

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
        slideChangeTransitionStart: () => this.applySlideScaling(),
        slideChangeTransitionEnd: () => this.applySlideScaling()
      }
    });

    setTimeout(() => this.applySlideScaling(), 200);

    // Hero category filters
    const categoryButtons = document.querySelectorAll('#heroCategories button');
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.filterHeroSlides(btn.dataset.category);
      });
    });
  }

  applySlideScaling() {
    const slides = this.heroSliderWrapper?.querySelectorAll('.swiper-slide') || [];
    slides.forEach((slide) => {
      const img = slide.querySelector('img');
      if (img) {
        const isActive = slide.classList.contains('swiper-slide-active');
        img.style.transform = isActive ? 'scale(1.06)' : 'scale(1)';
      }
    });
  }

  filterHeroSlides(category) {
    if (!this.heroSwiper || !this.heroSliderWrapper) return;

    const slides = this.heroSliderWrapper.querySelectorAll('.swiper-slide');
    let visibleCount = 0;

    slides.forEach((slide) => {
      const product = this.products.find(p => p.id === slide.dataset.id);
      const matches = category === 'all' || (product && product.category === category);
      
      slide.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
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

  // ----- LENIS SCROLL -----
  initLenis() {
    if (typeof Lenis === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    const render = (time) => {
      lenis.raf(time);
      requestAnimationFrame(render);
    };
    
    requestAnimationFrame(render);
    window.lenis = lenis;
  }

  // ----- VISITOR COUNTER -----
  updateVisitorCounter() {
    if (!sessionStorage.getItem('visitor_counted')) {
      this.visitorCount += Math.floor(Math.random() * 3) + 1;
      localStorage.setItem('thrift_visitor_count', this.visitorCount);
      sessionStorage.setItem('visitor_counted', 'true');
    }

    const countElem = document.querySelector('#visitorCount');
    if (countElem) {
      countElem.textContent = this.visitorCount.toLocaleString();
    }
  }

  // ----- MODALS & USER GREETINGS -----
  showFirstVisitModal() {
    const modal = document.querySelector('#firstVisitModal');
    if (modal) {
      modal.classList.add('active');
      document.querySelector('#firstNameInput')?.focus();
    }
  }

  hideFirstVisitModal() {
    document.querySelector('#firstVisitModal')?.classList.remove('active');
  }

  handleNameSubmit() {
    const input = document.querySelector('#firstNameInput');
    const name = input?.value.trim();

    if (name) {
      localStorage.setItem('thrift_user', name);
      this.currentUser = name;
      this.updateGreeting();
      this.hideFirstVisitModal();
      this.showToast(`Welcome, ${name}!`);

      const banner = document.querySelector('#bannerGreeting');
      if (banner && typeof anime !== 'undefined') {
        anime({
          targets: banner,
          scale: [0.5, 1.3, 1],
          duration: 700,
          easing: 'easeOutQuad',
          color: ['#66E5F3', '#FFFFFF']
        });
      }
    } else if (input) {
      input.style.borderColor = '#F06OD3';
      setTimeout(() => input.style.borderColor = '', 1500);
    }
  }

  updateGreeting() {
    const name = this.currentUser || 'Guest';
    const userElem = document.querySelector('#userGreeting');
    const bannerElem = document.querySelector('#bannerGreeting');

    if (userElem) userElem.textContent = `Welcome, ${name}`;
    if (bannerElem) bannerElem.textContent = `Welcome, ${name}!`;
  }

  // ----- CANVAS ANIMATIONS -----
  initRiveLogo() {
    const container = document.getElementById('logoRive');
    if (!container) return;

    const canvas = document.createElement('canvas');
    Object.assign(canvas, { width: 48, height: 48 });
    Object.assign(canvas.style, { width: '100%', height: '100%', display: 'block', borderRadius: '50%' });
    
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let t = 0;

    const render = () => {
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

      const floatOffset = Math.sin(t * 0.7) * 1.8;
      ctx.font = 'bold 22px "Cormorant Garamond", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('T', 20, 23 + floatOffset);
      ctx.fillStyle = '#F06OD3';
      ctx.fillText('F', 28, 23 + floatOffset);

      for (let i = 0; i < 8; i++) {
        const angle = t * 0.6 + i * 0.785;
        const radius = 18 + Math.sin(t * 0.5 + i * 0.9) * 2.5;
        const px = 24 + Math.cos(angle) * radius;
        const py = 24 + Math.sin(angle) * radius;
        const size = Math.max(1.5 + Math.sin(t * 0.7 + i * 1.2) * 0.8, 0.5);

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        const hue = [220, 280, 330, 40, 70][i % 5];
        ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${0.5 + Math.sin(t + i) * 0.2})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(24, 24, 20, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(102, 229, 243, ${0.15 + Math.sin(t * 0.5) * 0.05})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([2, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      requestAnimationFrame(render);
    };

    render();
  }

  initRiveGreeting() {
    const container = document.getElementById('riveGreeting');
    if (!container) return;

    const canvas = document.createElement('canvas');
    Object.assign(canvas, { width: 240, height: 60 });
    Object.assign(canvas.style, { width: '100%', height: '60px', borderRadius: '8px' });

    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let t = 0;

    const render = () => {
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

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '12px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText('thrift experience', 120, 52);

      requestAnimationFrame(render);
    };

    render();
  }

  initRiveGauges() {
    const containers = ['riveGauge1', 'riveGauge2', 'riveGauge3']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const colors = ['#66E5F3', '#F06OD3', '#FAB65C'];
    const labels = ['Items', 'Water', 'CO₂'];

    containers.forEach((container, idx) => {
      const canvas = document.createElement('canvas');
      Object.assign(canvas, { width: 200, height: 110 });
      canvas.style.cssText = 'width: 100%; height: 110px;';

      container.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      
      let progress = 0;
      const target = 0.5 + Math.random() * 0.45;
      let hasStarted = false;

      const triggerAnimation = () => {
        if (hasStarted || typeof anime === 'undefined') return;
        hasStarted = true;
        
        anime({
          targets: { val: progress },
          val: target,
          duration: 2000,
          easing: 'easeOutCubic',
          update: (anim) => {
            progress = anim.animations[0].currentValue;
          }
        });
      };

      const render = () => {
        const rect = container.getBoundingClientRect();
        if (!hasStarted && rect.top < window.innerHeight && rect.bottom > 0) {
          triggerAnimation();
        }

        ctx.clearRect(0, 0, 200, 110);

        // Track background
        ctx.beginPath();
        ctx.arc(100, 72, 42, 0.75 * Math.PI, 2.25 * Math.PI);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Active track gauge
        const startAngle = 0.75 * Math.PI;
        const endAngle = startAngle + Math.min(progress, 1) * 1.5 * Math.PI;
        
        ctx.beginPath();
        ctx.arc(100, 72, 42, startAngle, endAngle);
        ctx.strokeStyle = colors[idx % colors.length];
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glow pass
        ctx.shadowColor = colors[idx % colors.length];
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.arc(100, 72, 42, startAngle, endAngle);
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Label details
        const pct = Math.round(Math.min(progress, 1) * 100);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 20px "Cormorant Garamond", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${pct}%`, 100, 74);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.font = '11px "Plus Jakarta Sans", sans-serif';
        ctx.textBaseline = 'top';
        ctx.fillText(labels[idx % labels.length], 100, 98);

        requestAnimationFrame(render);
      };

      render();

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          triggerAnimation();
        }
      }, { threshold: 0.3 });

      observer.observe(container);
    });
  }

  // ----- UI TEMPLATES & CARD EVENT BINDING -----
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
    const grid = document.querySelector('#featuredGrid');
    if (!grid) return;

    const featured = [...this.products]
      .sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0))
      .slice(0, 4);

    grid.innerHTML = featured.map(p => this.createProductCardHTML(p)).join('');
    this.attachProductCardEvents(grid);
  }

  attachProductCardEvents(container) {
    container.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        if (card.dataset.id) this.openProductModal(card.dataset.id);
      });

      const btn = card.querySelector('.add-to-cart-btn');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (card.dataset.id) this.addToCart(card.dataset.id);
        });
      }
    });
  }

  // ----- SHOP VIEW RENDERING & FILTERS -----
  renderShop() {
    this.applyFilters();
    
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const pageItems = this.filteredProducts.slice(start, start + this.itemsPerPage);
    const grid = document.querySelector('#productGrid');

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
    const search = document.querySelector('#searchInput')?.value.toLowerCase().trim() || '';
    const category = document.querySelector('#categoryFilter')?.value || 'all';
    const size = document.querySelector('#sizeFilter')?.value || 'all';
    const condition = document.querySelector('#conditionFilter')?.value || 'all';
    const maxPrice = parseInt(document.querySelector('#priceSlider')?.value, 10) || 500;
    const sort = document.querySelector('#sortSelect')?.value || 'featured';

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

    const sortStrategies = {
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      'newest': (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      'discount': (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0),
      'default': (a, b) => (b.discountPercent || 0) - (a.discountPercent || 0) || a.title.localeCompare(b.title)
    };

    this.filteredProducts.sort(sortStrategies[sort] || sortStrategies['default']);
    this.currentPage = 1;

    const priceDisplay = document.querySelector('#priceDisplay');
    if (priceDisplay) priceDisplay.textContent = `$${maxPrice}`;
  }

  renderPagination() {
    const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage) || 1;
    const paginationElem = document.querySelector('#pagination');
    
    if (!paginationElem) return;
    if (totalPages <= 1) {
      paginationElem.innerHTML = '';
      return;
    }

    let html = `<button class="page-btn" data-page="prev" ${this.currentPage <= 1 ? 'disabled' : ''}>&#8249;</button>`;
    
    const maxVisible = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      html += `<button class="page-btn" data-page="1">1</button>${startPage > 2 ? '…' : ''}`;
    }

    for (let i = startPage; i <= endPage; i++) {
      html += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    if (endPage < totalPages) {
      html += `${endPage < totalPages - 1 ? '…' : ''}<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
    }

    html += `<button class="page-btn" data-page="next" ${this.currentPage >= totalPages ? 'disabled' : ''}>&#8250;</button>`;

    paginationElem.innerHTML = html;

    paginationElem.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetPage = btn.dataset.page;
        
        if (targetPage === 'prev') {
          if (this.currentPage > 1) this.currentPage--;
        } else if (targetPage === 'next') {
          if (this.currentPage < totalPages) this.currentPage++;
        } else {
          this.currentPage = parseInt(targetPage, 10);
        }

        this.renderShop();
        const shopSection = document.querySelector('#view-shop');
        if (shopSection) {
          window.scrollTo({ top: shopSection.offsetTop - 80 || 0, behavior: 'smooth' });
        }
      });
    });
  }

  // ----- PRODUCT MODAL -----
  openProductModal(id) {
    const product = this.products.find(p => p.id === id);
    const content = document.querySelector('#productDetailsContent');
    
    if (!product || !content) return;

    const hasDiscount = product.discountPercent > 0;
    const isLowStock = product.stock <= 2;
    const stockStatus = isLowStock ? 'low-stock' : 'in-stock';
    const stockLabel = isLowStock ? `Only ${product.stock} left!` : `In Stock (${product.stock})`;

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
        <p style="color:var(--color-gray-dark);margin:var(--space-sm) 0;font-size:clamp(0.95rem,1.05vw,1.05rem);">
          ${product.description || 'A beautifully curated pre-loved piece with character and charm.'}
        </p>
        <button class="btn btn-primary" id="modalAddToCart" style="width:100%;margin-top:var(--space-sm);">
          <i class="fas fa-cart-plus"></i> Add to Cart — $${product.price.toFixed(2)}
        </button>
      </div>
    `;

    const modal = document.querySelector('#productModal');
    modal?.classList.add('active');

    document.querySelector('#modalAddToCart')?.addEventListener('click', () => {
      this.addToCart(product.id);
      modal?.classList.remove('active');
    });
  }

  closeProductModal() {
    document.querySelector('#productModal')?.classList.remove('active');
  }
}

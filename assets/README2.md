# Assets

Place any local static files here:

- **images/** — product images, logos, icons (if hosting locally instead of Picsum/CDN)
- **fonts/** — self-hosted font files (if moving off Google Fonts)
- **icons/** — favicon.ico, apple-touch-icon.png, etc.

## Currently used CDN assets

The following are loaded externally and do not need local copies unless you go offline-first:

| Asset | CDN URL |
|---|---|
| Font Awesome 6.5.1 | `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css` |
| Swiper 11 CSS | `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css` |
| Swiper 11 JS | `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js` |
| Lenis 1.1.20 | `https://unpkg.com/lenis@1.1.20/dist/lenis.min.js` |
| Anime.js 3.2.2 | `https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js` |
| Three.js r128 | `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js` |
| GSAP 3.12.5 | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| ScrollTrigger 3.12.5 | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |
| Plus Jakarta Sans | `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800` |
| Cormorant Garamond | `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700` |

## Product images

Product images are loaded from [Picsum Photos](https://picsum.photos) using seeded URLs:

```
https://picsum.photos/seed/thrift{N}/1200/800
```

To replace with real product photos, update the `image` field in `data/products.json`
and/or the `generateImageUrl()` method in `script.js`.

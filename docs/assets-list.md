# Assets List for TCG Landing Page (Page 0001)

This document provides a comprehensive list of all required assets for the TCG (Trading Card Game) landing page, based on the wireframe design file `docs/wireframes/0001/tcg-landing-page-wireframe.svg`. The wireframe uses a dark theme with accent color #e94560 and features a desktop-first design at 1200×2400px.

## Required Assets List

### 1. **Logo** (Header)
- **Location**: Header / Navigation section
- **Wireframe Reference**: Line 7, coordinates (x="60" y="50")
- **Recommended Sizes**:
  - Mobile: 120×40px (1x), 240×80px (2x)
  - Desktop: 160×50px (1x), 320×100px (2x)
- **Format**: SVG (vector, scalable) preferred, or PNG with transparency
- **File naming**: `logo.svg` or `logo.png`, `[email protected]`
- **Estimated size**: SVG <5KB, PNG <10KB
- **Usage**: Primary brand logo displayed in header navigation

### 2. **Hero Image/Card Animation** (Hero Section)
- **Location**: Hero section, right side
- **Wireframe Reference**: Lines 35-37, rect (x="680" y="180" width="420" height="340")
- **Recommended Sizes**:
  - Mobile: 280×240px (1x), 560×480px (2x)
  - Desktop: 420×340px (1x), 840×680px (2x)
- **Format**: WebP with JPEG fallback, or animated SVG/Lottie for animation
- **File naming**:
  - `hero-card-animation.webp`, `hero-card-animation@2x.webp`
  - `hero-card-animation.jpg`, `hero-card-animation@2x.jpg`
  - `hero-card-animation.json` (if using Lottie)
- **Estimated size**: WebP 30-50KB, JPEG 60-80KB, Lottie 10-30KB
- **Usage**: Main hero visual showcasing trading card game cards or animation

### 3. **Feature Icons** (Features Section)
- **Location**: Game Features section
- **Wireframe Reference**: Lines 51-69, circles (r="35") with emoji placeholders
- **Quantity**: 3 icons
  - Strategic Combat icon (⚔ sword placeholder)
  - Stunning Art icon (🎨 palette placeholder)
  - Global Ranked icon (🌐 globe placeholder)
- **Recommended Sizes**:
  - Mobile: 60×60px (scalable SVG)
  - Desktop: 70×70px (scalable SVG)
- **Format**: SVG (inline or external files) - scalable and performant
- **File naming**:
  - `icon-strategic-combat.svg`
  - `icon-stunning-art.svg`
  - `icon-global-ranked.svg`
- **Estimated size**: <2KB each (SVG)
- **Usage**: Visual representations for three main game features

### 4. **Product Pack Images** (Available Packs Section)
- **Location**: Currently Available Packs section
- **Wireframe Reference**: Lines 83-98, three packs at different positions
- **Quantity**: 3 product pack images
  - Starter Pack ($9.99)
  - Legends Pack ($24.99)
  - Premium Pack ($49.99)
- **Recommended Sizes**:
  - Mobile: 150×120px (1x), 300×240px (2x)
  - Desktop: 210×150px (1x), 420×300px (2x)
- **Format**: WebP with JPEG fallback
- **File naming**:
  - Starter: `pack-starter.webp`, `pack-starter@2x.webp`, `pack-starter.jpg`, `pack-starter@2x.jpg`
  - Legends: `pack-legends.webp`, `pack-legends@2x.webp`, `pack-legends.jpg`, `pack-legends@2x.jpg`
  - Premium: `pack-premium.webp`, `pack-premium@2x.webp`, `pack-premium.jpg`, `pack-premium@2x.jpg`
- **Estimated size**: WebP 15-25KB each, JPEG 30-40KB each
- **Usage**: Product showcase images for purchasable card packs

### 5. **Expansion Thumbnails** (Upcoming Releases Section)
- **Location**: Upcoming Releases / Schedule section
- **Wireframe Reference**: Lines 115-142, three expansion cards
- **Quantity**: 3 thumbnail images
  - Shadow Realm (March 15, 2026)
  - Crystal Warriors (April 22, 2026)
  - Cyber Age (May 10, 2026)
- **Recommended Sizes**:
  - Mobile: 64×64px (1x), 128×128px (2x)
  - Desktop: 80×80px (1x), 160×160px (2x)
- **Format**: WebP with JPEG fallback
- **File naming**:
  - Shadow Realm: `expansion-shadow-realm.webp`, `expansion-shadow-realm@2x.webp`, `expansion-shadow-realm.jpg`, `expansion-shadow-realm@2x.jpg`
  - Crystal Warriors: `expansion-crystal-warriors.webp`, `expansion-crystal-warriors@2x.webp`, `expansion-crystal-warriors.jpg`, `expansion-crystal-warriors@2x.jpg`
  - Cyber Age: `expansion-cyber-age.webp`, `expansion-cyber-age@2x.webp`, `expansion-cyber-age.jpg`, `expansion-cyber-age@2x.jpg`
- **Estimated size**: WebP 5-10KB each, JPEG 10-15KB each
- **Usage**: Preview thumbnails for upcoming game expansions

---

## Performance Optimization Strategies

### 1. **Image Format Optimization**

Use modern image formats with progressive fallbacks for optimal compression and browser compatibility.

```tsx
// Use picture element for format fallback
<picture>
  <source srcSet="hero-card.webp 1x, hero-card@2x.webp 2x" type="image/webp" />
  <source srcSet="hero-card.jpg 1x, hero-card@2x.jpg 2x" type="image/jpeg" />
  <img src="hero-card.jpg" alt="Hero card animation" loading="eager" />
</picture>
```

**Format Priority:**
1. AVIF (best compression, 50% smaller than JPEG, newer browser support)
2. WebP (excellent compression, 25-35% smaller than JPEG, wide support)
3. JPEG (universal fallback)

**Format Selection:**
- Logos & Icons: SVG (vector, infinitely scalable)
- Photos & Complex Images: WebP → JPEG
- Animations: Lottie JSON or animated SVG

### 2. **Lazy Loading Strategy**

Implement strategic lazy loading to optimize initial page load time.

```tsx
// Above the fold (Hero section) - load immediately
<img src="hero-card.webp" alt="Hero" loading="eager" />

// Below the fold (Product packs, expansions) - lazy load
<img src="pack-starter.webp" alt="Starter Pack" loading="lazy" decoding="async" />
```

**Loading Strategy:**
- **Hero Image**: `loading="eager"` (above the fold, critical)
- **Logo**: Load immediately (critical for branding)
- **Feature Icons**: Load immediately (above the fold)
- **Pack Images**: `loading="lazy"` (below the fold)
- **Expansion Thumbnails**: `loading="lazy"` (below the fold)

### 3. **Responsive Images with srcset**

Deliver device-appropriate image sizes using srcset and sizes attributes.

```tsx
<img
  srcSet="pack-starter-small.webp 300w,
          pack-starter-medium.webp 600w"
  sizes="(max-width: 768px) 150px, 210px"
  src="pack-starter-small.webp"
  alt="Starter Pack"
  loading="lazy"
/>
```

**Benefits:**
- Reduces bandwidth on mobile devices
- Improves load times
- Maintains quality on retina displays

### 4. **Compression Guidelines**

Apply appropriate compression settings for each format.

**Compression Targets:**
- **JPEG**: 75-85% quality (good balance for photos)
- **PNG**: Use TinyPNG or ImageOptim with lossy compression
- **WebP**: 75-80% quality (typically 25-35% smaller than JPEG)
- **AVIF**: 80-90% quality (typically 50% smaller than JPEG)
- **SVG**: Minify with SVGO, remove unnecessary metadata

**Tools:**
- [Squoosh](https://squoosh.app/) - Web-based compression
- [ImageOptim](https://imageoptim.com/) - Desktop app (Mac)
- [TinyPNG](https://tinypng.com/) - Online PNG/JPEG compression
- Sharp (Node.js) - Build-time optimization

### 5. **CDN & Caching Strategy**

Optimize delivery and caching for static assets.

**CDN Recommendations:**
- Use a CDN (Cloudflare, AWS CloudFront, Vercel Edge)
- Enable automatic format conversion (WebP/AVIF)
- Geographic distribution for global users

**Cache Headers:**
```
Cache-Control: public, max-age=31536000, immutable
```

**Asset Versioning:**
- Use content hashing for cache busting
- Example: `hero-card.a1b2c3d4.webp`
- Vite/Webpack handle this automatically in build

### 6. **Blur Placeholder (LQIP) Strategy**

Implement blur placeholders for improved perceived performance.

**Implementation:**
1. Generate tiny 20×20px blurred version of each image
2. Encode as base64 or ultra-low-quality WebP
3. Display while full image loads
4. Creates smooth "blur-up" effect

```tsx
<img
  src="pack-starter.webp"
  style={{
    backgroundImage: 'url(data:image/webp;base64,UklGRiQAAABXRUJQVlA4...)',
    backgroundSize: 'cover'
  }}
  alt="Starter Pack"
  loading="lazy"
/>
```

### 7. **Preload Critical Assets**

Preload above-the-fold images for faster initial render.

```html
<!-- In index.html head -->
<link rel="preload" as="image" href="/assets/logo.svg" />
<link rel="preload" as="image" href="/assets/hero-card.webp" type="image/webp" />
```

**Preload Priority:**
- Logo (critical for branding)
- Hero image (largest contentful paint)
- Feature icons (above the fold)

### 8. **Image Component Libraries**

Consider using React image libraries for automatic optimization.

```tsx
// Example with react-lazy-load-image-component
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

<LazyLoadImage
  src="pack-starter.webp"
  placeholderSrc="pack-starter-placeholder.webp"
  effect="blur"
  alt="Starter Pack"
  width={210}
  height={150}
/>
```

### 9. **Build-time Optimization**

Automate image optimization during the build process.

```bash
# Using Sharp for Node.js optimization
npm install sharp

# Example script
sharp input.jpg
  .resize(420, 340)
  .webp({ quality: 80 })
  .toFile('output.webp')
```

**Build Integration:**
- Vite: `vite-imagetools` or `vite-plugin-image-optimizer`
- Webpack: `image-webpack-loader`
- Next.js: Built-in Image Optimization

---

## Recommended Directory Structure

```
src/
  assets/
    images/
      logo/
        logo.svg
      hero/
        hero-card-animation.webp
        hero-card-animation.jpg
        hero-card-animation@2x.webp
        hero-card-animation@2x.jpg
        hero-card-animation-placeholder.webp
      icons/
        icon-strategic-combat.svg
        icon-stunning-art.svg
        icon-global-ranked.svg
      packs/
        pack-starter.webp
        pack-starter.jpg
        pack-starter@2x.webp
        pack-starter@2x.jpg
        pack-legends.webp
        pack-legends.jpg
        pack-legends@2x.webp
        pack-legends@2x.jpg
        pack-premium.webp
        pack-premium.jpg
        pack-premium@2x.webp
        pack-premium@2x.jpg
      expansions/
        expansion-shadow-realm.webp
        expansion-shadow-realm.jpg
        expansion-shadow-realm@2x.webp
        expansion-shadow-realm@2x.jpg
        expansion-crystal-warriors.webp
        expansion-crystal-warriors.jpg
        expansion-crystal-warriors@2x.webp
        expansion-crystal-warriors@2x.jpg
        expansion-cyber-age.webp
        expansion-cyber-age.jpg
        expansion-cyber-age@2x.webp
        expansion-cyber-age@2x.jpg
```

---

## Performance Budget & Metrics

### Asset Size Summary

| Asset Type | Count | Size per Asset (WebP) | Size per Asset (JPEG) | Total Size (WebP) | Total Size (JPEG) |
|------------|-------|----------------------|-----------------------|-------------------|-------------------|
| Logo | 1 | ~5KB (SVG) | N/A | ~5KB | N/A |
| Hero Image | 1 | ~40KB | ~70KB | ~40KB | ~70KB |
| Feature Icons | 3 | ~2KB (SVG) | N/A | ~6KB | N/A |
| Pack Images | 3 | ~20KB | ~35KB | ~60KB | ~105KB |
| Expansion Thumbnails | 3 | ~7KB | ~12KB | ~21KB | ~36KB |
| **TOTAL** | **11** | - | - | **~132KB** | **~211KB** |

### Performance Targets

- **Total Image Weight**: ~132KB (WebP) / ~211KB (JPEG)
- **Initial Load Time**: <1.5 seconds on 3G
- **Largest Contentful Paint (LCP)**: <2.5 seconds
- **First Contentful Paint (FCP)**: <1.8 seconds
- **Cumulative Layout Shift (CLS)**: <0.1
- **Performance Budget**: <200KB for all images

### Testing & Validation

**Tools:**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance auditing
- [WebPageTest](https://www.webpagetest.org/) - Real-world performance testing
- [PageSpeed Insights](https://pagespeed.web.dev/) - Google's performance analysis
- Chrome DevTools - Network tab and Performance panel

**Test Scenarios:**
- Desktop (1920×1080) - Fast 4G
- Mobile (375×667) - Slow 3G
- Tablet (768×1024) - Fast 4G

---

## Implementation Checklist

### Asset Creation
- [ ] Design logo in vector format (SVG preferred)
- [ ] Create or source hero card image/animation
- [ ] Design 3 custom feature icons (combat, art, ranked)
- [ ] Design 3 product pack images (starter, legends, premium)
- [ ] Design 3 expansion thumbnail images (shadow realm, crystal warriors, cyber age)

### Image Optimization
- [ ] Export all raster images in original quality
- [ ] Generate WebP versions of all raster images
- [ ] Generate 2x retina versions of all raster images
- [ ] Compress all images with appropriate tools (Squoosh, TinyPNG)
- [ ] Minify SVG files with SVGO
- [ ] Create blur placeholder versions for key images
- [ ] Validate file sizes against performance budget

### Implementation
- [ ] Set up image directory structure in `src/assets/images/`
- [ ] Import and reference all assets in React components
- [ ] Implement responsive image markup with srcset
- [ ] Add lazy loading attributes to below-the-fold images
- [ ] Set up preload tags for critical images in index.html
- [ ] Configure CDN for asset delivery (if applicable)
- [ ] Add proper alt text for accessibility

### Testing & Validation
- [ ] Test on desktop browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices (iOS Safari, Chrome Mobile)
- [ ] Verify responsive images load correct sizes
- [ ] Run Lighthouse performance audit (target score >90)
- [ ] Test on slow 3G connection
- [ ] Verify lazy loading works correctly
- [ ] Check WebP fallbacks in older browsers
- [ ] Validate accessibility with screen readers

### Documentation
- [ ] Document asset naming conventions for team
- [ ] Create asset source files backup
- [ ] Document optimization settings used
- [ ] Add assets to version control

---

## Summary

**Total Assets Required**: 10 image groups (25+ files including responsive variants)

**Asset Breakdown**:
- 1 logo (SVG)
- 1 hero image (with 2x variants)
- 3 feature icons (SVG)
- 3 pack images (with 2x variants)
- 3 expansion thumbnails (with 2x variants)

**Estimated Total Size**:
- Optimized (WebP): ~132KB
- Fallback (JPEG): ~211KB

**Wireframe Dimensions**: 1200×2400px (desktop reference)

**Target Performance**:
- Load time <1.5s on 3G
- LCP <2.5s
- Performance budget <200KB

**Key Recommendations**:
1. Use SVG for logos and icons (infinitely scalable, tiny file size)
2. Implement WebP with JPEG fallbacks for all photos
3. Provide 2x retina variants for crisp display on high-DPI screens
4. Use lazy loading for below-the-fold images
5. Preload critical above-the-fold assets
6. Set up CDN delivery for optimal performance
7. Test on real devices with slow connections

**Next Steps**:
1. Review wireframe with design team to finalize visual direction
2. Create or source all required assets based on specifications
3. Optimize images using recommended tools and settings
4. Implement assets in React components with proper markup
5. Test performance and iterate on optimization
6. Deploy to CDN and configure caching

---

**Document Version**: 1.0
**Last Updated**: 2026-02-14
**Related Files**: `docs/wireframes/0001/tcg-landing-page-wireframe.svg`, `src/App.tsx`

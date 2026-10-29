# Oglinda sălii — landing page

Static HTML/CSS. Open `index.html` locally to preview (it links `css/style.css` directly).

## Deploy
The host (Netlify / Cloudflare Pages / Vercel) builds the site on every push to `main`:
- Build command: `npm run build`
- Publish / output directory: `dist`

`npm run build` (`scripts/build.mjs`) copies the site into `dist/` and inlines a minified `css/style.css` into every page, which saves a render-blocking request on mobile. The source files are never changed, so keep editing `css/style.css` as usual. To check the built site locally: `npm install` once, then `npm run build` and open `dist/index.html`.

## Before launch
- [ ] Social icons in the footer (Facebook, Instagram, Pinterest, Google Business Profile) point to `#` in `index.html` and `confidentialitate.html`. Add the real URLs and list them as `"sameAs": [...]` in the `Organization` JSON-LD.
- [ ] Umami: `confidentialitate.html` says Umami analytics is used, but no Umami script is on the site or in the editor yet. Add it, or drop that section.
- [ ] Editor link: all buttons point to `/editor`; confirm that's the live editor URL.
- [ ] Editor templates: remove Rock from the template list in the editor project (`oglinda-salii`).
- [ ] Rock example image: band logos and cartoon-style characters belong to others; consider a version without them.

## After going live
- [ ] Add the site to Google Search Console and submit `sitemap.xml`.
- [ ] Set up a Google Business Profile, then link it from the Google icon in the footer.

## Later (accounts/email after the beta)
- [ ] Update `confidentialitate.html`, the "Trebuie să-mi fac cont?" FAQ (+ JSON-LD) and the hero note.
- [ ] Pricing: "Cât costă?" says it's free during the beta (FAQ + `FAQPage` JSON-LD + `offers` in the `WebApplication` JSON-LD). Update all three when pricing starts.

## Optional
- [ ] Open Graph tags on `confidentialitate.html` (nicer link previews when shared).

## Done
- [x] Domain: `https://oglindasalii.ro/` in `index.html` (canonical, Open Graph, JSON-LD), `confidentialitate.html`, `robots.txt`, `sitemap.xml`.
- [x] Privacy page `confidentialitate.html` and terms page `termeni.html`.
- [x] Rock moved out of the template gallery; shown only as an example in the "Design personalizat" offer.
- [x] Fonts self-hosted in `fonts/` (no Google Fonts request).
- [x] Responsive WebP images (`srcset`) built by `scripts/images.sh`: Lighthouse mobile performance 73 → 85, desktop 100.

## Files
- `index.html`: the page (SEO meta, social preview, structured data)
- `confidentialitate.html`, `termeni.html`: privacy policy and terms (same header/footer as `index.html`; keep them in sync)
- `css/style.css`: mobile-first styles; brand colours are in `:root`. Every page must link it exactly as `<link rel="stylesheet" href="css/style.css">` (the build replaces that tag with the inlined CSS)
- `js/carousel.js`: arrows and dots for `.carousel` (the "Design personalizat" photos); add a slide by copying a `<figure class="carousel__slide">`
- `js/contact.js`: builds the email and phone links at runtime (`data-email`, `data-email-subject`, `data-phone`) so they aren't in the HTML source; change the contact details there
- `fonts/`: Cormorant Garamond + Inter woff2 (latin and latin-ext), the same @fontsource 5.3.0 files as the editor's font list (`oglinda-salii/src/lib/fonts.js`), with their OFL licenses
- `img/src/`: original photos and template previews (not used by the pages directly)
- `img/`: the sized WebP copies the pages use (`<name>-<width>.webp`, generated), `og-image.jpg` (social preview, 1200×630), logo mark and icons
- `scripts/images.sh`: builds the `img/<name>-<width>.webp` copies from `img/src/` (needs `brew install webp`). To add or replace an image: put the original in `img/src/`, add a `make` line to the script, run `sh scripts/images.sh`, then add `srcset`/`sizes` to the `<img>` in the HTML
- `scripts/build.mjs`, `package.json`: the deploy build (see Deploy). `dist/` and `node_modules/` are generated and git-ignored
- `scripts/unused-images.sh`: lists files in `img/` no page uses; `--delete` removes them
- `favicon.ico`, `favicon.svg`, `site.webmanifest`, `robots.txt`, `sitemap.xml`

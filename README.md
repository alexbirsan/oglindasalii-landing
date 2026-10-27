# Oglinda sălii — landing page

Static HTML/CSS, no build step. Open `index.html` locally, or upload the whole folder to the web root.

## Before launch
- [ ] `termeni.html` (Termeni și condiții): the footer link on both pages is broken until it exists.
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
- [ ] Delete unused images: `img/presentare1.jpeg` (original of the hero), `img/oglinda-salii-suport-metalic.webp`.

## Done
- [x] Domain: `https://oglindasalii.ro/` in `index.html` (canonical, Open Graph, JSON-LD), `confidentialitate.html`, `robots.txt`, `sitemap.xml`.
- [x] Privacy page `confidentialitate.html`.
- [x] Rock moved out of the template gallery; shown only as an example in the "Design personalizat" offer.
- [x] Fonts self-hosted in `fonts/` (no Google Fonts request).
- [x] Hero image compressed (`img/oglinda-salii-sevalet-gradina.jpg`, JPEG quality 78).

## Files
- `index.html`: the page (SEO meta, social preview, structured data)
- `css/style.css`: mobile-first styles; brand colours are in `:root`
- `fonts/`: Cormorant Garamond + Inter woff2 (latin and latin-ext), the same @fontsource 5.3.0 files as the editor's font list (`oglinda-salii/src/lib/fonts.js`), with their OFL licenses
- `img/`: templates, venue photos, `og-image.jpg` (social preview, 1200×630), logo mark and icons
- `favicon.ico`, `favicon.svg`, `site.webmanifest`, `robots.txt`, `sitemap.xml`

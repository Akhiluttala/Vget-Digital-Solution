# VGET Digital Solution

A nine-page static marketing website built with semantic HTML, mobile-first CSS, and vanilla JavaScript. No frameworks, package installation, or backend is needed.

## Folder structure

The downloadable ZIP opens directly into this structure. In the hosted project these files live inside `dist/`.

```text
index.html
about.html
services.html
google-business-profile.html
website-development.html
social-media.html
google-ads.html
meta-ads.html
contact.html
css/style.css
js/script.js
images/favicon.svg
README.md
```

## Preview and deployment

1. Extract the ZIP and open `index.html` to browse locally. For testing submissions, use a local HTTP server or your HTTPS hosting provider.
2. Upload the contents of the extracted folder to your static hosting provider's public directory. No build command is required.
3. Keep the folder structure unchanged. Each HTML page contains its own navigation and footer so the content and links work without JavaScript. Update shared navigation in every HTML file if you add pages.

## Required setup before public launch

### Email enquiries

The displayed email is akhilraj06200@gmail.com. The online form is intentionally unconfigured and cannot send yet.

1. Create a Formspree form, verify the recipient address above, and enable the service's available spam protection.
2. Copy its HTTPS endpoint into `SITE_CONFIG.formEndpoint` at the top of `js/script.js`.
3. Submit a test enquiry from your hosted site and confirm delivery in your actual inbox and the provider dashboard. Check spam folders and the account's current usage limits.
4. Verify error handling by temporarily disconnecting your network. Do not put secret keys in the source code.

The site uses a vanilla `fetch` POST with `FormData` and `Accept: application/json`. Reference: https://formspree.io/blog/formspree-ajax/ . No Formspree JavaScript library is loaded. The form retains entered details on failure, prevents duplicate clicks, and reports success only after an accepted response. An accepted response confirms provider receipt, not guaranteed inbox delivery. Without JavaScript, visitors can email directly.

### Phone and WhatsApp

The supplied number, `709218069`, has nine digits and has not been used as a live destination. Confirm the complete number before launch. Set `SITE_CONFIG.phone` and `SITE_CONFIG.whatsapp` to the full international number (for India, +91 followed by the complete 10-digit mobile number). Call and WhatsApp controls become visible automatically when valid values are present. No digit has been guessed.

### SEO and social sharing

Every page has a unique title, description, heading structure, and Open Graph title/description. Before launch:

- Add one canonical link and `og:url` to each HTML head using the final domain and correct page path.
- Create a genuine 1200×630 social sharing image; add absolute `og:image` and `twitter:image` URLs. Then use `summary_large_image` for the Twitter card.
- Create `sitemap.xml` containing the nine absolute page URLs and `robots.txt` referring to it. Submit the sitemap to Google Search Console after the domain is verified.
- Add truthful Organization structured data when your final URL and verified contact details are ready. Do not invent reviews or business-address details.
- If using a new domain, update metadata and the sitemap to that domain. The private review link is not your public SEO launch.

### Analytics and visitor data

No analytics or advertising scripts are active. Add GA4 or Meta Pixel only after you have the correct IDs and any required consent setup. Before accepting live enquiries, establish an appropriate published privacy notice covering your contact details, purpose, retention, and form provider. The form currently includes a concise enquiry-use notice and does not save visitor details in browser storage.

## Included behaviour

- Sticky header, accessible mobile navigation, Escape-to-close, and current-page indicators.
- Smooth anchor navigation and subtle reveal animations with reduced-motion support.
- Per-service quote links, multi-service preselection, labelled fields, inline validation, live status messages, loading state, and network/error handling.
- Configurable call and WhatsApp controls, a working email link, and an SVG favicon.
- CSS-only decorative artwork; no stock photos, invented testimonials, statistics, or project claims.

## Verification

Passed: JavaScript syntax; internal asset/page links on all nine pages; one H1 per page; unique IDs and referenced label/ARIA targets; simulated form preselection, validation, missing endpoint, provider acceptance, HTTP rejection, and network failure. Simulations sent no live enquiries.

Not performed: browser visual QA, real-device testing, assistive-technology audit, and live Formspree delivery. The design targets WCAG 2.2 AA but is not certified compliant. Check keyboard use, zoom at 200%, screen reader announcements, and layouts at 320px, 768px, and desktop widths before public launch.

## Future improvements

Add real project case studies when available; refine service copy around the sectors you win; add original photography; connect verified social profiles; and measure qualified enquiry conversion after analytics setup. Keep ad spend separate from service fees in quotations.

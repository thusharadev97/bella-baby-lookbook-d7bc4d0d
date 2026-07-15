# Bella & Baby — Luxury Editorial Lookbook

Build a premium, editorial-style multi-page site on the existing TanStack Start + Tailwind v4 stack. No backend needed — all content is static/mock.

## Design direction

- Aesthetic: high-end editorial magazine (think Vogue Bambini × The Row). Warm off-white background, deep ink foreground, muted taupe/blush accents, tiny gold accent.
- Typography: serif display (Instrument Serif / Cormorant via Google Fonts `<link>` in `__root.tsx`) for headlines + clean sans (Inter) for body. High contrast, generous tracking on eyebrows.
- Motion: subtle fade-in on scroll, gentle image hover zoom (`scale-[1.03]`), underline reveal on links. No heavy libs.
- Imagery: Unsplash `source.unsplash.com` / curated `images.unsplash.com` URLs for kids/baby/fashion editorial shots. Varied aspect ratios to drive the masonry rhythm.
- Layout: CSS columns-based masonry (`columns-1 sm:columns-2 lg:columns-3`) with `break-inside-avoid` cards of mixed heights — no rigid square grid.

## Routes (TanStack file-based)

- `src/routes/index.tsx` — Home (replaces placeholder)
- `src/routes/trends.tsx` — Trends listing (reuses masonry, filtered mock)
- `src/routes/lookbook.tsx` — Full-bleed editorial lookbook gallery
- `src/routes/about.tsx` — Brand story by Thushara Sanjeewa
- `src/routes/contact.tsx` — Contact form (client-only, animated states) + info
- `src/routes/privacy.tsx` — Privacy Policy (US-oriented mock statutory text)
- `src/routes/disclaimer.tsx` — Disclaimer (US-oriented mock statutory text)

Each route defines its own `head()` with route-specific title/description/og tags. Root `__root.tsx` gets real defaults (title "Bella & Baby — Elevated Kids Fashion & Lookbook", matching description/og/twitter), plus Google Fonts `<link>` tags. No og:image on root.

## Components (`src/components/`)

- `SiteHeader.tsx` — floating sticky header, wordmark "Bella & Baby", nav links (Home, Trends, Lookbook, About, Contact), animated mobile overlay (state-driven, no extra deps).
- `SiteFooter.tsx` — 3-column footer (brand summary, quick links, HQ + email), copyright bar.
- `Hero.tsx` — full-viewport editorial banner, seasonal US baby collection headline, eyebrow, CTA, large image with soft vignette.
- `PostCard.tsx` — masonry card: image with hover zoom, category eyebrow, serif title, snippet, date, tag chips.
- `MasonryGrid.tsx` — column-based masonry rendering an array of posts.
- `Sidebar.tsx` — Author Profile (Thushara Sanjeewa, portrait, bio, Lucide social icons linking to LinkedIn `thushara-webdev`, Instagram `iam_thushara`, Facebook `daily lookbook`) + "Trending Now" keyword chips.
- `ContactForm.tsx` — name/email/message with focus animations, submit → animated success state (local state only).
- `SectionEyebrow.tsx`, `FadeIn.tsx` (IntersectionObserver-based reveal wrapper).

## Data

- `src/data/posts.ts` — exactly 30 mock post objects `{ id, title, category, snippet, date, tags[], image, aspect }` with varied categories (Streetwear, Chic Minimalist, Global Summer, Nursery Muse, Heritage, Play Editorial, etc.), varied Unsplash URLs and aspect ratios so the masonry breathes.
- `src/data/trending.ts` — keyword list for sidebar.
- `src/data/author.ts` — Thushara Sanjeewa profile + socials.

## Styling

- Extend `src/styles.css` `@theme` with brand tokens: `--color-ink`, `--color-cream`, `--color-taupe`, `--color-blush`, `--color-gold`, plus `--font-display` and `--font-sans`. Load fonts via `<link>` in `__root.tsx` head (not `@import`).
- Add small `@utility` helpers if needed (e.g. `.eyebrow` tracking); prefer Tailwind classes in JSX.

## Homepage composition

1. Sticky header
2. Hero (seasonal collection)
3. Editorial intro strip (eyebrow + serif tagline)
4. Two-column layout: left = 30-post masonry; right = sticky sidebar (Author + Trending Now)
5. "Lookbook teaser" full-bleed image band
6. Newsletter-style closing band (visual only)
7. Footer

## Contact page

- Address: No 96, Medirigiriya, Polonnaruwa
- Email: info.bellanadbaby.com (used verbatim as given)
- Form with animated focus rings + success toast-style inline confirmation.

## Legal pages

- Full standalone routes with elegant typography, table-of-contents style anchor list at top, US-audience-flavored mock text (jurisdiction, cookies, third-party links, no medical/professional advice, etc.).

## Out of scope

- No backend, no auth, no CMS, no real form submission, no analytics wiring.

## Technical notes

- All new route strings match filenames per TanStack rules.
- No `src/pages/`, no react-router-dom.
- Every route sets `head()`; only leaf routes may add og:image (skipped here — no generated hero image required by the brief).
- Uses only existing deps + `lucide-react` (already available). No new packages.

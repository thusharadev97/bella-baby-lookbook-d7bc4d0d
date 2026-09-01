# Blog engine + 5 new deep-research editorials

## What you get

- A real **Blog** link in the site header, next to Trends / Lookbook.
- `/blog` becomes a live index that reads every markdown file in `src/content/blog/` — including anything published from the CMS admin panel — and shows it in a chronological editorial grid (cover image, title, date, author, excerpt, keyword tags).
- `/blog/{slug}` renders the full article with Vogue-style typography, an auto-generated Table of Contents, FAQ accordion, founder byline, affiliate disclosure, and SEO/JSON-LD metadata.
- 5 new 1,500+ word articles written straight into `src/content/blog/` so they appear on the index alongside CMS posts.

## Blog plumbing

Currently `src/routes/blog.tsx` has one hard-coded post and its own header/footer, and the single markdown file in `src/content/blog/` is never read. Replacement:

- `src/data/blogPosts.ts` — loads markdown at build time with `import.meta.glob('/src/content/blog/*.md', { query: '?raw', eager: true })`, parses YAML front matter (title, date, author, image, metaTitle, metaDescription, keywords, excerpt) and body, derives the slug from the filename (strips the `YYYY-MM-DD-` prefix), sorts newest first, and computes word count + reading time.
- Markdown → HTML: a small in-project renderer (headings, paragraphs, lists, bold/italic, links, blockquotes, tables) so no runtime dependency is added and output is fully SSR-safe. Headings get stable IDs to drive the TOC.
- `src/routes/blog.tsx` — index page using `PageShell` (shared header/footer, so the standalone chrome and duplicate nav are removed), masonry/grid cards, per-route `head()` metadata.
- `src/routes/blog.$slug.tsx` — article view: hero image, TOC from H2/H3, prose body, FAQ section with `FAQPage` + `Article` JSON-LD, `AdSenseSlot` gated by the existing 1,200-word rule, `AffiliateDisclosure`, related-reading links into `/trends` and `/lookbook`. Unknown slug → `notFound()` with a noindex head.
- `SiteHeader` nav gets `{ to: "/blog", label: "Blog" }`; the sitemap route picks up all blog slugs.
- Any post whose front-matter `image` is missing or empty falls back to the curated Unsplash pool in `src/data/editorialImages.ts`, so no broken frames and no prompt text ever renders.

## The 5 articles

Each is a markdown file in `src/content/blog/` with complete front matter, 1,500+ words, H2/H3 structure, a GOTS/OEKO-TEX fabric & care matrix table, 5 FAQ blocks, internal links to `/trends`, `/lookbook` and sibling articles, and an "Editor's Styling Note" signed Thushara Sanjeewa.

1. The Quiet Luxury Edit: Autumn 2026 Capsule Wardrobes for Modern Women
2. Elevated Streetwear for Kids: Combining Playful Comfort with High Fashion
3. Regal Maximalism & Royal Purple: How SS26/FW26 Runway Trends Dominate Street Style
4. The '90s Slip-Dress Revival: Day-to-Night Styling for the Modern Minimalist
5. Tailored Loungewear & Elevated Silk Sets: Comfort Meets Executive Elegance

Claims stay factual and general (fibre properties, certification meanings, styling guidance) — no invented brand prices, lab results, or testimonials.

## Compliance & verification

- Text-heavy layouts, single H1 per page, alt text on every image, lazy-loaded body imagery.
- Ads only via `AdSenseSlot`, which already suppresses itself under 1,200 words.
- Finish with a typecheck plus a browser pass over `/blog` and one article to confirm zero route/import errors and that the CMS post renders next to the new five.

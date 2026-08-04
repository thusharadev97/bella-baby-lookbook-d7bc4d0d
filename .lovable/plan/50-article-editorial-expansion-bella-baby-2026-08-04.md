# 50-Article Editorial Expansion — Bella & Baby

## Scope

50 new editorial articles at 1,500–2,000 words each, all published as fresh URLs under `/editorial/$slug`. The existing articles (10 in `src/data/editorials10.ts` plus the wide-leg-trousers route) stay live at their current URLs.

Because ~30 of the 50 titles overlap those existing pieces, each new article gets a distinct slug, a distinct angle, and entirely new prose — written as the deeper Fall 2026 authority version of the topic (Malibu / Aspen / Sag Harbor framing, August–Fall 2026 market context). Each pair cross-links so the two read as a series, and the older short piece is canonicalised to the new deep version so search engines see one primary page per topic.

Delivery order: the 20 brand-new topics first, then the 30 overlapping ones.

## Structure per article

- H1 plus SEO title and meta description
- August/Fall 2026 hook intro
- H2 / H3 / H4 hierarchy: trend analysis, silhouette breakdowns, styling formulas
- Fabric & Care table: composition, sustainability index (GOTS / OEKO-TEX / recycled), care instructions
- Deep-research passages on sustainable fabrics (organic linen, mulberry silk, Tencel, cupro, hemp), fashion history, and styling theory
- 5-question FAQ wrapped in FAQPage JSON-LD
- Editor's Styling Note from Thushara Sanjeewa with the founder portrait
- 3 bracketed cinematic image prompts
- 3–4 keyword-anchor internal links to `/lookbook`, `/about`, and related journal/editorial URLs

## Generation approach

Content is generated through the Lovable AI Gateway in parallel batches (credits confirmed available), then normalised into the existing typed block model (`h2` / `h3` / `h4` / `p` / `ul` / `table` / `img`) so it renders through the article template already in place.

Every article is validated after generation: word count >= 1,500, fabric table present, exactly 5 FAQs, heading hierarchy intact, 3 image prompts. Anything failing is regenerated before it ships.

Batches:
1. Batch A — the 20 brand-new topics (quiet luxury, sculptural heels, silk-linen, jewelry layering, monochrome, trench reinvention, soft tailoring, sustainable denim, evening pyjamas, organza, architectural bags, organic cotton, blazer + slip, resort knitwear, modern tailoring, earthy palettes, vintage accessories, casual elegance, capsule shoes, investment pieces)
2. Batch B — 15 overlapping topics
3. Batch C — 15 overlapping topics

I report word counts and validation results after each batch.

## Routing and site wiring

- New content lives in `src/data/editorials50/`, split into one module per batch with a single registry, so no file becomes unmanageable.
- The registry feeds the existing `/editorial/$slug` route — no new route files needed.
- `/trends` becomes a full editorial index grouped by theme, so nothing is orphaned.
- `sitemap.xml` regenerates from the registry.
- The keyword-overlap internal-linking engine extends across the full corpus, so related-article blocks pull from all 60+ pieces.
- Ads continue to flow through the existing `AdSenseSlot` word-count guard; every new article clears the 1,200-word floor by construction.

## Technical notes

- Article data stays plain typed TypeScript/JSON; no database involved.
- Per-route `head()` supplies title, description, self-referencing canonical, OG/Twitter tags, Article JSON-LD, and FAQPage JSON-LD.
- Older overlapping articles get a canonical pointing at their new deep counterpart to prevent duplicate-content signals.
- Tables render in a horizontal-scroll wrapper; TOC, tables, and image-prompt blocks checked at 375px.
- Verification per batch: production build, structure/word-count validation script, and a headless pass over a sample of new routes to confirm zero console errors.
# Bella & Baby — Cleanup, Author Card, Global Trends Engine & 7-Article Batch

## 1. Remove raw image prompt boxes (site-wide)

Every article currently renders dashed "EDITORIAL IMAGE · PROMPT" boxes. These read as placeholder text and are an AdSense "low value / screens without publisher content" risk.

- Delete the `ImagePrompt` component from `editorial.$slug.tsx` and `editorial.wide-leg-trousers-2026.tsx`.
- Replace with a real `EditorialImage` figure: responsive Unsplash photo, descriptive alt text derived from the prompt, lazy loading, aspect-ratio framing, and an italic serif caption.
- Add a curated pool of high-fashion Unsplash images (neutral tailoring, cashmere texture, leather goods, evening slip, travel, activewear, wide-leg trousers) in a small data file, chosen deterministically per article slug + block index so an article always shows the same images.
- The hero prompt at the top of each article becomes a full-width hero photograph.

## 2. Subscribe / newsletter handler

- Convert the sidebar and footer subscribe blocks into a real `NewsletterForm` component: email input plus button, inline validation, submitting/success/error states, disabled button with spinner while submitting, success toast via sonner, and a persistent "You're on the list" confirmation state.
- Mount `Toaster` once in `__root.tsx` (not currently mounted).
- Emails are stored in a `newsletter_subscribers` table via a server function, so the signup is genuinely functional rather than a fake timeout.

## 3. Author / Founder card

- The founder portrait asset is confirmed serving correctly (HTTP 200), so the "broken image" is a framing/rendering issue rather than a bad URL. Fix with explicit dimensions, `object-cover object-center`, a soft ring border, lazy loading, and an `onError` fallback to initials so it can never render blank.
- Add `contact@bellanbaby.shop` as a visible mailto link beside the social icons, with a mail icon and the same letter-spaced uppercase treatment.
- Rebalance the card: larger portrait, tighter serif name/role stack, hairline divider above the contact row, consistent padding.

## 4. UI/UX polish pass

- Unify page top padding, max-widths, and section rhythm across home, trends, editorial library, and article pages.
- Article typography: measure capped near 68ch, consistent H2/H3/H4 scale, improved table styling and list markers.
- Editorial Library cards: equal heights, consistent eyebrow/title/excerpt spacing, refined hover states.
- Audit for leftover placeholder strings, dead links, and empty sections.

## 5. Global trends engine (Lovable Cloud)

Enable Lovable Cloud and add a `trending_keywords` table.

- Columns: `id`, `country`, `keyword`, `search_intent`, `aesthetic_tag`, `color_palette`, `silhouette`, `last_updated`.
- Migration includes GRANTs (SELECT to anon and authenticated), RLS enabled, one public read-only SELECT policy, and literal INSERT statements for all 14 seed rows from the research file.
- A public read server function fetches keywords by country using the publishable-key client (no admin key).

## 6. Regional retailer / affiliate routing

- A typed config maps each region to its retailer set:
  - US: Revolve, Nordstrom, Net-a-Porter, Farfetch, Reformation
  - UK: ASOS, Next, Net-a-Porter, Farfetch, Mango UK
  - DE / NL: Zalando, ABOUT YOU, Breuninger, Mytheresa, Net-a-Porter, NA-KD
  - FR: Galeries Lafayette, Net-a-Porter, Farfetch, La Redoute, Mytheresa
  - IT / ES: Net-a-Porter, Mytheresa, Farfetch, LuisaViaRoma, El Corte Inglés
- An `AffiliateLink` component renders the high-intent anchor copy and resolves the retailer by region, with a Farfetch global fallback and `rel="sponsored nofollow noopener"`.
- Program IDs stay as clearly marked config slots to fill later (LTK / Skimlinks).

## 7. Seven regional landing pages

New route `/trends/$country` for US, UK, DE, FR, IT, ES, NL, each with:

- Region-specific H1, editor's intro, dominant aesthetics, colour palette swatches, and silhouette notes.
- Keyword cluster rendered from the database rows for that country.
- Region-routed retailer edit block.
- Related editorials from the existing registry.
- Its own `head()` with unique title, description, og tags, canonical, and BreadcrumbList JSON-LD.
- Added to `sitemap.xml` and linked from the Trends index so no page is orphaned.

## 8. Seven monetization editorials

The uploaded batch is published as live site editorials at `/editorial/{slug}` using the existing editorial data model.

- All seven slugs preserved exactly as written in the frontmatter.
- Bracketed anchors such as "Shop the Loro Piana cashmere knitwear collection here" become `AffiliateLink` anchors, keeping the exact high-intent anchor copy.
- Prose expanded to the site's 1,800+ word Artisanal Flow standard with the technical metrics the batch specifies (ply counts, fabric weight, cost-per-wear formulas, full-grain vs top-grain markers), plus a Fabric & Care table, five-question FAQ, TOC, and an Editor's Note from Thushara.
- Localization notes (trousers / pantalon large / Lieferkette / maroquinerie) are carried into the geo keyword metadata rather than mixed into the English prose.
- Each gets full Article and FAQPage JSON-LD, and is surfaced in the Editorial Library and sitemap.

## Technical notes

- Stack stays TanStack Start (not Next.js); MDX is not introduced — content lives in the existing typed editorial registry so routing, SEO, and sitemap wiring keep working unchanged.
- Cloud reads go through public server functions with narrow anon SELECT policies; no service-role usage.
- The `AdSenseSlot` word-count guard stays in place on all new pages.
- Order of work: cleanup and polish first (1–4), then Cloud, data, and regional pages (5–7), then the article batch (8).

## Note on the seven articles' length

The uploaded batch totals roughly 6,200 words across seven pieces (~850 each). Reaching 1,800+ words each means substantial original expansion. Given the credit limits hit earlier, I will write these directly rather than through the AI gateway, and deliver them in two passes (four, then three) so nothing stalls mid-batch.
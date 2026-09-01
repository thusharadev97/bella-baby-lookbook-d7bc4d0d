# Blog powered by Sanity + Blog nav item

## What you get

- A **Blog** item in the site header (and mobile menu), linking to `/blog`.
- `/blog` — a luxury editorial grid that fetches posts live from your Sanity project (`ktdhlkkl` / `production`): cover image, title, category, date, excerpt.
- `/blog/{slug}` — full article view with Vogue-style typography, auto-generated Table of Contents, author card for Thushara Sanjeewa, FAQ section, and SEO + JSON-LD metadata.

## Sanity setup

- Install `@sanity/client` and `@sanity/image-url`.
- `src/integrations/sanity/client.ts` — client with `projectId: "ktdhlkkl"`, `dataset: "production"`, `useCdn: true`, a recent `apiVersion`, plus a `urlFor()` image helper for responsive cover/hero images.
- `src/integrations/sanity/queries.ts` — one query for the index list (ordered by publish date, newest first) and one for a single post by slug, dereferencing author and category and pulling the body.
- Before writing queries I'll connect the Sanity MCP connector to read your actual schema, so field names (`body` vs `content`, category shape, FAQ fields) match your dataset instead of being guessed. If a field I expect isn't there, I'll adapt the query and tell you what I mapped.
- **You'll need to allowlist this app's origin** in Sanity (`sanity.io/manage` → project → API → CORS origins), otherwise browser requests return 403. If the MCP connector is available I can add it for you.

## Pages

- `src/routes/blog.tsx` — index. Uses the shared `PageShell` (existing header/footer) instead of the current one-off chrome, replacing today's hard-coded single-post placeholder. Data via TanStack Query with a route loader prefetch; skeleton state while loading, and a graceful empty/error state (with a CORS hint if the request is rejected).
- `src/routes/blog.$slug.tsx` — article. Loader fetches by slug, `notFound()` + noindex head for unknown slugs. Renders:
  - hero cover image (Sanity image pipeline, responsive `srcSet`), falling back to the curated Unsplash pool in `src/data/editorialImages.ts` when a post has no cover;
  - Portable Text body rendered with the site's editorial prose styles (headings get stable IDs);
  - sticky Table of Contents built from H2/H3;
  - author card reusing `FounderAvatar` with `contact@bellanbaby.shop`;
  - FAQ section with `FAQPage` + `Article` JSON-LD;
  - `AdSenseSlot` (self-suppresses under 1,200 words) and `AffiliateDisclosure`;
  - per-route `head()` with title, description, canonical, `og:*`/`twitter:*` using the cover image URL.
- `SiteHeader` nav gains `{ to: "/blog", label: "Blog" }` in both desktop and mobile lists.

## Notes

- Portable Text needs `@portabletext/react` to render rich body content; I'll add it alongside the Sanity packages.
- The existing markdown file in `src/content/blog/` and the Decap admin config stay untouched — say the word if you'd rather retire the markdown/Decap path now that Sanity is the source of truth.
- Finish with a typecheck and a browser pass over `/blog` and one article to confirm no route or import errors.

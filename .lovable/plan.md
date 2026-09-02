# Bella & Baby — Magazine Hub, Contributor Workflow, Editorial Admin

Pass 1 of 4: architecture, contributor workflow, admin panel and SEO foundations. The 15 long-form articles follow in three batches of 5 once this is approved and shipped.

## 1. Magazine hub and UI direction

- New `/magazine` hub: the editorial home for all long-form content — hero feature, category rails (Quiet Luxury, Capsule Wardrobes, European Street Style, Mother & Baby), and a dense archive grid. Pulls from Sanity plus the existing in-code editorial library so nothing already written becomes orphaned.
- Category routes `/magazine/$category` so each niche is its own indexable page with unique metadata.
- Visual language stays with your current Vogue/Harper's system (cream/ink/taupe, display serif headlines, hairline rules, large editorial imagery, generous whitespace). Refinements: tighter grid rhythm, a proper masthead-style hub header, drop caps and pull quotes in article bodies, restrained fade/parallax motion only.
- Header nav gains **Magazine** and **Write for Us**; existing Blog/Trends/Lookbook links stay.

## 2. Contributor sign-up and submission

- `/write-for-us` — public pitch page explaining editorial standards, word counts, and what you accept.
- `/auth` — email + password accounts plus Google sign-in for contributors.
- `/contributor` (signed-in only) — submission form (title, category, region focus, body, cover image, bio, keywords) with autosave-free simple drafts, plus a dashboard listing each submission's status (submitted / in review / needs revision / approved) and your notes back to them.
- On submit, an admin notification email is sent to your address, and the writer gets a confirmation. Decision emails (approved / revision requested) go out from the admin panel.

## 3. Admin editorial panel

- `/admin` (admin role only) — queue of submissions with filters, full article preview, word count, and Approve / Request revision / Reject actions with a message box. Each action writes the decision and emails the writer.
- Roles live in a dedicated roles table with a server-side check — never client-side or on a profile row.
- Approved pieces are marked publish-ready; publishing itself stays in Sanity so the magazine keeps one source of truth for live content.

## 4. Content plan (15 articles, batches of 5)

Stored in Sanity as you chose. Batch 1 covers Quiet Luxury foundations, batch 2 capsule wardrobes and sustainable European street style, batch 3 mother-and-baby matching looks and seasonal edits. Each piece: 1,800+ words, H2/H3 structure, short human paragraphs, no AI-tell phrasing, US and EU search intent (UK/FR/DE terminology and sizing noted where it matters), plus meta title, meta description, primary and secondary keywords.

I will deliver each batch as ready-to-import Sanity documents. If the Sanity connector allows writes, I'll create them directly in your dataset; otherwise you get an import file and I'll tell you the one command to run.

## 5. Technical SEO / GEO

- Per-route metadata on every new page: unique title, description, og/twitter tags, self-referencing canonical.
- JSON-LD: `Article` on each story, `BreadcrumbList` on hub/category/article, `CollectionPage` on the hub, `Organization` sitewide. FAQ blocks stay where they already exist.
- Sitemap route extended to include magazine hub, category pages and Sanity slugs.
- AdSense compliance kept intact: the word-count guard on ad slots stays, contributor/admin pages carry `noindex` and no ad units, and no ads render next to form UI.

## Technical notes

- Sanity: connect the Sanity connector first to read your real schema before touching queries — the current blog queries guess field names via `coalesce()`. I'll add a `magazineCategory` mapping and register this app's origin as a CORS origin.
- Backend: `profiles`, `user_roles` (+ security-definer role check), `article_submissions`, `submission_reviews`. RLS scoped so writers see only their own rows and admins see all; grants issued in the same migration.
- Server logic uses server functions with authenticated middleware; the admin decision path verifies the admin role server-side before acting.
- Email: sent from a server function via the platform's email capability, routed to your admin address. **Confirm the exact address** — `info.coreleadmedia.com` isn't a valid email; I'll assume `info@coreleadmedia.com` unless you correct it.
- Auth: Google provider configured the same turn it's added, so first sign-in works.

## Verification

Typecheck, then a browser pass over `/magazine`, `/write-for-us`, sign-up, a submission, and an admin approve/revise cycle including the email send path.

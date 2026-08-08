import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { FadeIn } from "@/components/FadeIn";
import founderAsset from "@/assets/founder.jpg.asset.json";

const TITLE =
  "High-Waisted Wide-Leg Trousers: The 2026 Casual Uniform Every Modern Wardrobe Needs";
const DESCRIPTION =
  "An editorial guide to high-waisted wide-leg trousers — the defining silhouette of 2026. Fabric guide, styling advice, sustainable luxury picks, and the People-Also-Ask answers, from Bella & Baby's Editor-in-Chief.";
const URL = "https://www.bellanbaby.shop/editorial/wide-leg-trousers-2026";

export const Route = createFileRoute("/editorial/wide-leg-trousers-2026")({
  head: () => ({
    meta: [
      { title: `${TITLE} — Bella & Baby` },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "best women's fashion trends 2026, high-waisted wide-leg trousers, sustainable luxury clothing, modern capsule wardrobe, 2026 trouser trends, quiet luxury pants" },
      { name: "author", content: "Thushara Sanjeewa" },
      { property: "og:type", content: "article" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "article:author", content: "Thushara Sanjeewa" },
      { property: "article:section", content: "Women's Fashion" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          author: {
            "@type": "Person",
            name: "Thushara Sanjeewa",
            jobTitle: "Founder & Editor-in-Chief, Bella & Baby",
          },
          publisher: {
            "@type": "Organization",
            name: "Bella & Baby",
            url: "https://www.bellanbaby.shop",
          },
          datePublished: "2026-07-18",
          dateModified: "2026-07-18",
          mainEntityOfPage: URL,
          articleSection: "Women's Fashion",
          keywords:
            "wide-leg trousers, 2026 fashion trends, sustainable luxury, modern capsule wardrobe",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: EditorialPage,
});

const FAQS: { q: string; a: string }[] = [
  {
    q: "Are high-waisted wide-leg trousers still trending in 2026?",
    a: "Yes — decisively. Wide-leg trousers have moved past trend status into the modern capsule wardrobe as the defining daytime silhouette of 2026. Runways from The Row to Toteme confirmed the shape, and street style from New York to Copenhagen shows women wearing them from morning meetings through weekend errands.",
  },
  {
    q: "What shoes look best with wide-leg trousers?",
    a: "In 2026, the strongest pairings are sleek ballet flats, low-block-heel slingbacks, and minimal white leather sneakers. For evening, opt for a pointed pump peeking beneath a puddled hem. Avoid chunky platforms — they fight the fluid line the trouser is meant to create.",
  },
  {
    q: "What is the best fabric for wide-leg trousers in summer?",
    a: "Look for lightweight wool tropical, dry-touch cotton twill, silk-linen blends, and Tencel-cupro. These fabrics hold a clean drape without clinging, breathe in humidity, and elevate the trouser beyond athleisure — an essential distinction if you're building a sustainable luxury wardrobe.",
  },
  {
    q: "How do wide-leg trousers replace skinny jeans?",
    a: "Where skinny jeans compressed the leg line, wide-leg trousers extend it. Choose a mid-to-high rise, a break that just kisses the shoe, and a fluid mid-weight fabric. Paired with a fitted knit or tucked poplin shirt, they read as polished, not oversized — the exact modern proportion 2026 is asking for.",
  },
  {
    q: "Can petite women wear wide-leg trousers?",
    a: "Absolutely. The rules: keep the rise high, hem to the exact floor length of your chosen shoe, and choose a soft column of color from waist to hem. A slim tucked top and a small structured bag preserve proportion and let the trouser do the work.",
  },
];

function EditorialPage() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-[var(--color-ink)] md:px-0">
        {/* Hero */}
        <div className="eyebrow">Style Report · Ladies Wear 2026</div>
        <h1 className="mt-6 font-display text-4xl leading-[1.06] md:text-6xl">
          High-Waisted Wide-Leg Trousers:{" "}
          <span className="italic text-[var(--color-taupe)]">
            The 2026 Casual Uniform Every Modern Wardrobe Needs
          </span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink)]/70">
          The defining silhouette of the year isn't loud, embellished, or
          engineered for a single Instagram frame. It's a trouser. A quiet,
          fluid, high-waisted, wide-leg trouser — and it is rewriting how
          American women dress from Monday morning through Sunday brunch.
        </p>

        {/* Byline */}
        <FadeIn>
          <div className="mt-10 flex items-center gap-4 border-y border-[var(--color-ink)]/10 py-5">
            <img
              src={founderAsset.url}
              alt="Thushara Sanjeewa — Founder & Editor-in-Chief, Bella & Baby"
              className="h-14 w-14 rounded-full object-cover"
              loading="eager"
            />
            <div className="text-sm">
              <div className="font-display text-lg leading-tight">
                By Thushara Sanjeewa
              </div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                Founder · Editor-in-Chief · Jul 18, 2026 · 9 min read
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Image prompt block */}
        <ImagePrompt text="Cinematic editorial shot of a woman wearing cream high-waisted wide-leg wool trousers, tucked white poplin shirt, walking through a sunlit minimalist SoHo cafe, natural daylight, soft film grain, Vogue US editorial style." />

        {/* Intro */}
        <p className="body">
          If 2024 belonged to the balletcore flat and 2025 to the elongated
          maxi, then 2026 is unambiguously the year of the trouser. Not the
          low-rise. Not the cropped tapered pant your college self swore by.
          The trouser: high-waisted, wide through the leg, and cut with the
          kind of weight and drape that used to live only in menswear
          ateliers. Every credible list of the{" "}
          <em>best women's fashion trends 2026</em> — from the Business of
          Fashion State of Fashion report through the spring runways in
          Milan and New York — puts this silhouette at the top. And unlike
          most trend cycles, this one has legs (literally) because it
          solves a problem women have been quietly voicing for a decade:
          the desire for clothing that reads considered, comfortable, and
          grown-up all at once.
        </p>
        <p className="body">
          At Bella & Baby we cover the modern family wardrobe holistically
          — from the crib to the closet — and the questions arriving in
          our inbox from readers this July are strikingly consistent:{" "}
          <em>what do I wear now that skinny jeans feel wrong? How do I
          look polished without looking dressed up? How do I invest in a
          modern capsule wardrobe that will actually last?</em> The answer,
          repeatedly, starts with the same garment.
        </p>

        {/* H2 */}
        <h2 className="h2">Why the Wide-Leg Trouser Is the 2026 Uniform</h2>
        <p className="body">
          Three cultural forces converged this year. First, the return of
          the office. Second, the aesthetic ascendance of quiet luxury —
          the visual language perfected by houses like The Row, Khaite,
          Toteme, and Loro Piana. Third, and most importantly, a generational
          rejection of the compression-fit garment. After a decade of
          skinny denim and bike-short athleisure, women want ease without
          losing structure. The wide-leg trouser delivers exactly that: it
          skims rather than grips, it lengthens the line, and it photographs
          as intentional even when you threw it on with a tank top.
        </p>

        <h3 className="h3">The Silhouette, Explained</h3>
        <p className="body">
          The 2026 shape is specific, and the details separate a great pair
          from a passable one. Look for a natural-waist rise that sits at
          or just above the navel; a subtle front pleat (single or double)
          that opens the leg gracefully; a straight-to-slightly-flared
          drop from the knee; and a hem that either puddles a quarter-inch
          on the floor or breaks cleanly across the top of a slim shoe.
          Anything cropped, tapered, or cinched at the ankle belongs to
          another decade.
        </p>

        <ImagePrompt text="Full-length mirror flat lay of three pairs of high-waisted wide-leg trousers — cream wool, chocolate silk-linen, black tropical wool — arranged on a warm oak floor with a linen throw, overhead natural light, soft shadows, editorial minimalism." />

        <h3 className="h3">The Fabric Guide: What Actually Drapes</h3>
        <p className="body">
          Silhouette is only half the story. A wide-leg trouser lives or
          dies by its fabric — and this is where{" "}
          <em>sustainable luxury clothing</em> and technical performance
          intersect. The four fabrics carrying the trend this year are all
          fibers that reward you every time you wear them.
        </p>

        <h4 className="h4">1. Tropical Wool</h4>
        <p className="body">
          A finely woven, mid-weight wool that breathes in summer and
          transitions cleanly into fall. It resists wrinkles, holds a
          crease, and drapes with the fluidity that makes the silhouette
          work. Look for GOTS-certified or RWS-certified mills.
        </p>

        <h4 className="h4">2. Silk-Linen Blend</h4>
        <p className="body">
          The most photogenic of the four. The silk gives sheen and weight;
          the linen prevents the fabric from clinging. Best in earth tones
          — bone, oat, chocolate, olive — that read expensive under any
          light.
        </p>

        <h4 className="h4">3. Tencel-Cupro</h4>
        <p className="body">
          A regenerated-cellulose blend that behaves like silk without the
          care demands. Machine-washable, biodegradable, and dry to the
          touch even in humidity. The sustainable-luxury sleeper hit of
          the year.
        </p>

        <h4 className="h4">4. Dry-Touch Cotton Twill</h4>
        <p className="body">
          The casual weekend option. Choose a heavier compact twill (11 oz
          or above) so it holds its shape. This is your trouser for the
          Saturday farmers-market run and the Sunday coffee walk.
        </p>

        {/* H2 */}
        <h2 className="h2">Three Styling Formulas That Will Not Fail</h2>
        <p className="body">
          The genius of a wide-leg trouser is its refusal to belong to a
          single dress code. It flexes from breakfast to boardroom without
          changing garments — only the pieces around it. Here are the
          three formulas our editors return to weekly.
        </p>

        <h3 className="h3">Formula One: Weekday Ease</h3>
        <p className="body">
          Cream wide-leg wool trouser, fine-gauge cashmere crewneck in the
          same tonal family, low-vamp ballet flat, and a slim shoulder bag
          in cognac leather. Tuck the sweater loosely. The result is a
          tonal column of color that reads as effortlessly expensive.
        </p>

        <h3 className="h3">Formula Two: The Office Rewrite</h3>
        <p className="body">
          Black tropical-wool trouser, a fitted white poplin shirt with
          French cuffs, a leather waist belt, and a pointed-toe kitten
          heel slingback. This is what tailoring looks like in 2026 —
          softer at the top, more architectural at the bottom.
        </p>

        <h3 className="h3">Formula Three: Weekend Sculpture</h3>
        <p className="body">
          Chocolate silk-linen trouser, a rib-knit tank in ecru, minimal
          leather sandals, and a straw tote. Add a linen blazer thrown
          over the shoulders for a cool cafe. This is the outfit you'll
          be photographed in without knowing it.
        </p>

        <ImagePrompt text="Street-style photograph of a woman in her thirties crossing a Brooklyn crosswalk, wearing chocolate silk-linen wide-leg trousers, ecru rib-knit tank, cognac leather sandals, straw tote, golden-hour light, shot on 35mm film, Bill Cunningham influence." />

        {/* H2 */}
        <h2 className="h2">Building the 2026 Capsule Around One Trouser</h2>
        <p className="body">
          A well-chosen wide-leg trouser is the keystone of a{" "}
          <em>modern capsule wardrobe</em>. Buy two pairs — one neutral
          light (bone or cream), one neutral dark (black or chocolate) —
          in your best-fitting fabric, and you have unlocked roughly
          twenty-eight distinct outfits when combined with five tops, two
          knits, and a blazer. That is the math the quiet-luxury
          influencers rarely show you, and it is why this silhouette is
          also the smartest sustainability play of the year. Fewer
          garments, worn more times, in fabrics that survive a decade.
        </p>
        <p className="body">
          For a curated visual breakdown of these formulas on-body, our{" "}
          <Link
            to="/lookbook"
            className="underline decoration-[var(--color-taupe)]/60 underline-offset-4 hover:decoration-[var(--color-ink)]"
          >
            Summer '26 Lookbook
          </Link>{" "}
          documents thirty full looks styled by our team — many of them
          built around exactly this trouser. If you'd like the editorial
          philosophy behind those choices,{" "}
          <Link
            to="/about"
            className="underline decoration-[var(--color-taupe)]/60 underline-offset-4 hover:decoration-[var(--color-ink)]"
          >
            our About page
          </Link>{" "}
          explains how we approach slow, considered dressing for the
          modern family.
        </p>

        {/* H2 */}
        <h2 className="h2">The Trends Wide-Leg Trousers Are Quietly Replacing</h2>
        <h3 className="h3">Skinny Jeans</h3>
        <p className="body">
          Officially retired for most occasions in 2026. Not because there
          is anything wrong with a skinny jean, but because its cultural
          moment has passed. If you love the ease of denim, migrate to a
          barrel-leg or a straight-leg mid-rise cut.
        </p>
        <h3 className="h3">Bike Shorts and Compression Athleisure</h3>
        <p className="body">
          Still appropriate at the gym; increasingly out of place at
          brunch. A wide-leg trouser in a soft cotton twill delivers the
          same comfort with none of the second-skin quality that 2026 is
          moving away from.
        </p>
        <h3 className="h3">The Cropped Tapered Pant</h3>
        <p className="body">
          Once the office default, now the silhouette that instantly
          dates a look. If your closet is full of them, this is the year
          to donate mindfully and replace with one excellent wide-leg
          pair.
        </p>

        {/* Editor's Note */}
        <FadeIn>
          <aside className="mt-14 border-l-2 border-[var(--color-taupe)] bg-white/50 p-8">
            <div className="flex items-start gap-5">
              <img
                src={founderAsset.url}
                alt="Thushara Sanjeewa"
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
              <div>
                <div className="eyebrow">Editor's Note · From Thushara</div>
                <p className="mt-4 font-display text-xl italic leading-snug text-[var(--color-ink)]">
                  "If you buy one pair this season, spend the extra fifty
                  dollars on the hem. Have them tailored to the exact
                  shoe you will wear them with most. A wide-leg trouser
                  hemmed a half-inch too short reads as a mistake; hemmed
                  correctly, it reads as couture. That is the entire
                  secret."
                </p>
                <div className="mt-4 text-[11px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                  — Thushara Sanjeewa, Editor-in-Chief
                </div>
              </div>
            </div>
          </aside>
        </FadeIn>

        {/* FAQ */}
        <h2 className="h2">Frequently Asked Questions</h2>
        <dl className="mt-6 space-y-8">
          {FAQS.map((f) => (
            <div key={f.q}>
              <dt className="font-display text-xl text-[var(--color-ink)]">
                {f.q}
              </dt>
              <dd className="mt-3 text-[var(--color-ink)]/75 leading-relaxed">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>

        {/* Conclusion */}
        <h2 className="h2">The Takeaway</h2>
        <p className="body">
          The wide-leg trouser is not a trend to chase; it is a wardrobe
          decision to make once and benefit from for years. Choose the
          fabric that respects the way you actually live. Hem it
          precisely. Wear it with quiet, well-made pieces around it. If
          you do those three things, you will look — and feel — like the
          most polished version of yourself every day of 2026.
        </p>
        <p className="body">
          When you're ready to see the silhouette in motion, spend ten
          minutes with our{" "}
          <Link
            to="/lookbook"
            className="underline decoration-[var(--color-taupe)]/60 underline-offset-4 hover:decoration-[var(--color-ink)]"
          >
            latest lookbook
          </Link>{" "}
          — it is the most useful mood board we can give you.
        </p>

        {/* Signature */}
        <div className="mt-16 border-t border-[var(--color-ink)]/10 pt-8 text-sm text-[var(--color-ink)]/60">
          Published by <span className="font-medium text-[var(--color-ink)]">Bella & Baby Editorial</span> · Curated for the American reader who dresses with intention.
        </div>
      </article>

      <style>{`
        .body { margin-top: 1.25rem; font-size: 1.0625rem; line-height: 1.85; color: rgba(20,20,20,0.82); }
        .h2 { margin-top: 3.5rem; font-family: var(--font-display, serif); font-size: 2rem; line-height: 1.15; color: var(--color-ink); }
        .h3 { margin-top: 2.25rem; font-family: var(--font-display, serif); font-size: 1.4rem; line-height: 1.2; color: var(--color-ink); }
        .h4 { margin-top: 1.75rem; font-size: 0.78rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--color-taupe); }
      `}</style>
    </PageShell>
  );
}

function ImagePrompt({ text }: { text: string }) {
  return <EditorialImage note={text} seed={`wide-leg-trousers-2026-${text.length}`} />;
}
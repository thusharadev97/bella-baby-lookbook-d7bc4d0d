import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { FadeIn } from "@/components/FadeIn";
import { EditorialImage } from "@/components/EditorialImage";
import { MAGAZINE_CATEGORIES, MAGAZINE_STORIES, storiesInCategory } from "@/data/magazine";

const TITLE = "The Magazine — Quiet Luxury, Capsule Wardrobes & Kids Style | Bella & Baby";
const DESCRIPTION =
  "Long-form fashion journalism from Bella & Baby: quiet luxury tailoring, capsule wardrobe frameworks, sustainable European street style and chic mother-and-baby looks for readers in the US, UK, France and Germany.";

export const Route = createFileRoute("/magazine")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "quiet luxury fashion, capsule wardrobe guide, European street style, mother and baby matching outfits, luxury kids fashion",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/magazine" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/magazine" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "The Bella & Baby Magazine",
          description: DESCRIPTION,
          url: "/magazine",
          isPartOf: { "@type": "WebSite", name: "Bella & Baby" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Magazine", item: "/magazine" },
          ],
        }),
      },
    ],
  }),
  component: MagazineHub,
});

function MagazineHub() {
  const [lead, ...rest] = MAGAZINE_STORIES;
  const archive = rest.slice(0, 24);

  return (
    <PageShell>
      <div className="mx-auto max-w-[1400px] px-6 pb-28 pt-36 md:px-10 md:pt-44">
        {/* Masthead */}
        <header className="border-b border-[var(--color-ink)]/15 pb-10 text-center">
          <div className="eyebrow">Established 2026 · New York · London · Paris</div>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
            The <span className="italic text-[var(--color-taupe)]">Magazine</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--color-ink)]/70">
            Reported style writing for women who buy carefully — and dress their children the
            same way. {MAGAZINE_STORIES.length} long-form stories across four pillars.
          </p>
        </header>

        {/* Category rails */}
        <nav aria-label="Magazine sections" className="mt-10 grid gap-px border border-[var(--color-ink)]/12 bg-[var(--color-ink)]/12 md:grid-cols-4">
          {MAGAZINE_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/magazine/$category"
              params={{ category: c.slug }}
              className="group bg-[var(--color-cream)] p-7 transition hover:bg-white"
            >
              <div className="eyebrow">{storiesInCategory(c.slug).length} stories</div>
              <div className="mt-3 font-display text-2xl leading-tight">{c.label}</div>
              <div className="mt-2 text-[13px] leading-relaxed text-[var(--color-ink)]/60">
                {c.tagline}
              </div>
              <span className="mt-5 inline-block text-[10px] uppercase tracking-[0.28em] text-[var(--color-taupe)] transition group-hover:text-[var(--color-ink)]">
                Read the section →
              </span>
            </Link>
          ))}
        </nav>

        {/* Lead feature */}
        {lead && (
          <FadeIn>
            <article className="mt-20 grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <Link to={lead.path} className="block overflow-hidden">
                <EditorialImage note={lead.heroNote} seed={lead.slug} variant="hero" />
              </Link>
              <div>
                <div className="eyebrow">{lead.category.label} · The Feature</div>
                <h2 className="mt-5 font-display text-4xl leading-[1.06] md:text-5xl">
                  <Link to={lead.path} className="hover:italic">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-6 text-[15px] leading-relaxed text-[var(--color-ink)]/70">
                  {lead.description}
                </p>
                <div className="mt-6 text-[10px] uppercase tracking-[0.28em] text-[var(--color-taupe)]">
                  {lead.words.toLocaleString()} words · {lead.readMinutes} min read
                </div>
                <Link
                  to={lead.path}
                  className="mt-8 inline-block border border-[var(--color-ink)] px-8 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
                >
                  Read the story
                </Link>
              </div>
            </article>
          </FadeIn>
        )}

        {/* Archive grid */}
        <section className="mt-24">
          <div className="flex items-baseline justify-between border-b border-[var(--color-ink)]/15 pb-4">
            <h2 className="font-display text-3xl">The Archive</h2>
            <Link
              to="/blog"
              className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-taupe)] hover:text-[var(--color-ink)]"
            >
              Latest from the desk →
            </Link>
          </div>

          <div className="mt-12 grid gap-14 md:grid-cols-2 lg:grid-cols-3">
            {archive.map((s) => (
              <FadeIn key={s.slug}>
                <article className="group">
                  <Link to={s.path} className="block overflow-hidden">
                    <EditorialImage note={s.heroNote} seed={s.slug} />
                  </Link>
                  <div className="mt-5 eyebrow">{s.category.label}</div>
                  <h3 className="mt-3 font-display text-2xl leading-snug">
                    <Link to={s.path} className="transition group-hover:italic">
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-[var(--color-ink)]/65">
                    {s.description}
                  </p>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.26em] text-[var(--color-taupe)]">
                    {s.readMinutes} min read
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Contributor call */}
        <section className="mt-28 border-y border-[var(--color-ink)]/15 py-16 text-center">
          <div className="eyebrow">Contributors</div>
          <h2 className="mt-5 font-display text-4xl">Write for Bella &amp; Baby</h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--color-ink)]/70">
            We commission reported style writing from journalists and stylists across the US and
            Europe. Pitches are read by our editorial desk within five working days.
          </p>
          <Link
            to="/write-for-us"
            className="mt-8 inline-block border border-[var(--color-ink)] px-8 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
          >
            Submission guidelines
          </Link>
        </section>
      </div>
    </PageShell>
  );
}

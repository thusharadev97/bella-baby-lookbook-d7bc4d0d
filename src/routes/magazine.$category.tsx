import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { FadeIn } from "@/components/FadeIn";
import { EditorialImage } from "@/components/EditorialImage";
import { MAGAZINE_CATEGORIES, categoryBySlug, storiesInCategory } from "@/data/magazine";

export const Route = createFileRoute("/magazine/$category")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.category);
    if (!category) throw notFound();
    return { category, stories: storiesInCategory(category.slug) };
  },
  head: ({ params, loaderData }) => {
    const category = loaderData?.category;
    if (!category) {
      return {
        meta: [{ title: "Section not found — Bella & Baby" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${category.label} — ${category.tagline} | Bella & Baby Magazine`;
    const url = `/magazine/${params.category}`;
    return {
      meta: [
        { title },
        { name: "description", content: category.description },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: category.description },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: category.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Magazine", item: "/magazine" },
              { "@type": "ListItem", position: 3, name: category.label, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
        <div className="eyebrow">404</div>
        <h1 className="mt-6 font-display text-4xl">No such section</h1>
        <p className="mt-6 text-[var(--color-ink)]/70">
          Try{" "}
          <Link to="/magazine" className="underline">
            the magazine index
          </Link>
          .
        </p>
      </div>
    </PageShell>
  ),
});

function CategoryPage() {
  const { category, stories } = Route.useLoaderData();

  return (
    <PageShell>
      <div className="mx-auto max-w-[1400px] px-6 pb-28 pt-36 md:px-10 md:pt-44">
        <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.26em] text-[var(--color-taupe)]">
          <Link to="/" className="hover:text-[var(--color-ink)]">Home</Link>
          <span className="px-2">/</span>
          <Link to="/magazine" className="hover:text-[var(--color-ink)]">Magazine</Link>
          <span className="px-2">/</span>
          <span className="text-[var(--color-ink)]/70">{category.label}</span>
        </nav>

        <header className="mt-8 border-b border-[var(--color-ink)]/15 pb-10">
          <div className="eyebrow">{stories.length} stories</div>
          <h1 className="mt-5 font-display text-5xl leading-[1.03] md:text-6xl">{category.label}</h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--color-ink)]/70">
            {category.description}
          </p>
        </header>

        {stories.length === 0 ? (
          <p className="mt-16 text-[var(--color-ink)]/65">
            This section is being commissioned. New reporting lands here shortly.
          </p>
        ) : (
          <div className="mt-14 grid gap-14 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((s) => (
              <FadeIn key={s.slug}>
                <article className="group">
                  <Link to={s.path} className="block overflow-hidden">
                    <EditorialImage note={s.heroNote} seed={s.slug} />
                  </Link>
                  <h2 className="mt-5 font-display text-2xl leading-snug">
                    <Link to={s.path} className="transition group-hover:italic">
                      {s.title}
                    </Link>
                  </h2>
                  <p className="mt-3 line-clamp-3 text-[14px] leading-relaxed text-[var(--color-ink)]/65">
                    {s.description}
                  </p>
                  <div className="mt-4 text-[10px] uppercase tracking-[0.26em] text-[var(--color-taupe)]">
                    {s.words.toLocaleString()} words · {s.readMinutes} min read
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        )}

        <section className="mt-24 border-t border-[var(--color-ink)]/15 pt-10">
          <div className="eyebrow">Other sections</div>
          <div className="mt-6 flex flex-wrap gap-4">
            {MAGAZINE_CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
              <Link
                key={c.slug}
                to="/magazine/$category"
                params={{ category: c.slug }}
                className="border border-[var(--color-ink)]/25 px-7 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:border-[var(--color-ink)]"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}

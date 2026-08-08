import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PageShell } from "@/components/PageShell";
import { FadeIn } from "@/components/FadeIn";
import { FounderAvatar } from "@/components/FounderAvatar";
import { AffiliateLink, AffiliateDisclosure } from "@/components/AffiliateLink";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getTrendingKeywords } from "@/lib/trends.functions";
import { getRegion, REGIONS } from "@/data/regions";
import { relatedEditorials } from "@/data/editorialsAll";

export const Route = createFileRoute("/trends_/$country")({
  loader: ({ params }) => {
    const region = getRegion(params.country);
    if (!region) throw notFound();
    return { region };
  },
  head: ({ params, loaderData }) => {
    const r = loaderData?.region;
    if (!r) return { meta: [{ title: "Regional Trend Report — Bella & Baby" }] };
    const url = `https://www.bellanbaby.shop/trends/${params.country}`;
    const title = `${r.title} ${r.titleItalicTail} — Bella & Baby`;
    return {
      meta: [
        { title },
        { name: "description", content: r.description },
        { name: "keywords", content: r.aesthetics.join(", ") },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: r.description },
        { property: "og:url", content: url },
        { property: "og:locale", content: r.locale },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: r.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${r.title} ${r.titleItalicTail}`,
            description: r.description,
            inLanguage: r.locale.replace("_", "-"),
            author: { "@type": "Person", name: "Thushara Sanjeewa" },
            publisher: {
              "@type": "Organization",
              name: "Bella & Baby",
              url: "https://www.bellanbaby.shop",
            },
            mainEntityOfPage: url,
            about: r.aesthetics,
          }),
        },
      ],
    };
  },
  component: RegionPage,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
        <div className="eyebrow">404</div>
        <h1 className="mt-6 font-display text-4xl">No report for that region yet</h1>
        <p className="mt-6 text-[var(--color-ink)]/70">
          Browse the{" "}
          <Link to="/trends" className="underline">
            full trends index
          </Link>{" "}
          instead.
        </p>
      </div>
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
        <h1 className="font-display text-3xl">Something went wrong loading this report.</h1>
      </div>
    </PageShell>
  ),
});

function RegionPage() {
  const { region } = Route.useLoaderData();
  const fetchKeywords = useServerFn(getTrendingKeywords);
  const { data, isPending } = useQuery({
    queryKey: ["trending_keywords", region.country],
    queryFn: () => fetchKeywords({ data: { country: region.country } }),
  });

  const related = relatedEditorials(region.aesthetics[0] ?? region.name, 3);

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-40 md:px-10">
        <div className="eyebrow">Regional Trend Report · Autumn 2026</div>
        <h1 className="mt-6 max-w-[24ch] font-display text-4xl leading-[1.06] tracking-[-0.01em] md:text-6xl">
          {region.title}{" "}
          <span className="italic text-[var(--color-taupe)]">{region.titleItalicTail}</span>
        </h1>
        <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.8] text-[var(--color-ink)]/70">
          {region.intro}
        </p>

        <FadeIn>
          <div className="mt-10 flex items-center gap-4 border-y border-[var(--color-ink)]/10 py-5">
            <FounderAvatar size={56} eager />
            <div className="text-sm">
              <div className="font-display text-lg leading-tight">By Thushara Sanjeewa</div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                Founder · Editor-in-Chief · {region.name} · {region.language}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <section className="mt-16">
            <h2 className="font-display text-3xl tracking-tight">The Season&apos;s Palette</h2>
            <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {region.palette.map((c) => (
                <div key={c.label}>
                  <div
                    className="aspect-[4/3] w-full"
                    style={{ backgroundColor: c.swatch }}
                    aria-hidden="true"
                  />
                  <div className="mt-3 text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink)]/60">
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="mt-16 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl tracking-tight">Defining Aesthetics</h2>
              <ul className="mt-6 space-y-4">
                {region.aesthetics.map((a) => (
                  <li
                    key={a}
                    className="border-b border-[var(--color-ink)]/8 pb-4 text-[15px] leading-relaxed text-[var(--color-ink)]/80"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-3xl tracking-tight">Local Language</h2>
              <dl className="mt-6 space-y-5">
                {region.localTerms.map((t) => (
                  <div key={t.term} className="border-b border-[var(--color-ink)]/8 pb-4">
                    <dt className="font-display text-lg italic text-[var(--color-ink)]">{t.term}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink)]/70">
                      {t.meaning}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="mt-16">
            <h2 className="font-display text-3xl tracking-tight">
              Live Search Signals — {region.country}
            </h2>
            <div className="mt-7 overflow-x-auto">
              {isPending ? (
                <p className="text-sm text-[var(--color-ink)]/55">Loading trend signals…</p>
              ) : data?.error ? (
                <p className="text-sm text-[var(--color-ink)]/55">{data.error}</p>
              ) : data && data.keywords.length > 0 ? (
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-y border-[var(--color-ink)]/20">
                      {["Keyword", "Intent", "Aesthetic", "Palette", "Silhouette"].map((h) => (
                        <th key={h} className="py-3 pr-4 font-display text-[13px] font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.keywords.map((k) => (
                      <tr
                        key={k.keyword}
                        className="border-b border-[var(--color-ink)]/10 align-top"
                      >
                        <td className="py-3 pr-4 font-medium text-[var(--color-ink)]">{k.keyword}</td>
                        <td className="py-3 pr-4 text-[var(--color-ink)]/75">{k.search_intent}</td>
                        <td className="py-3 pr-4 text-[var(--color-ink)]/75">{k.aesthetic_tag}</td>
                        <td className="py-3 pr-4 text-[var(--color-ink)]/75">{k.color_palette}</td>
                        <td className="py-3 pr-4 text-[var(--color-ink)]/75">{k.silhouette}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-[var(--color-ink)]/55">
                  No signals recorded for this region yet.
                </p>
              )}
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="mt-16">
            <h2 className="font-display text-3xl tracking-tight">Where We Shop This Region</h2>
            <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-[var(--color-ink)]/70">
              Our editors route {region.name} readers to retailers that actually ship, price and
              return locally.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {region.retailers.map((r) => (
                <li key={r.name} className="font-display text-lg text-[var(--color-ink)]">
                  <AffiliateLink label={r.name} region={region.code} retailer={r.name} />
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        <FadeIn>
          <aside className="mt-16 border-l-2 border-[var(--color-taupe)] bg-white/50 p-8">
            <div className="flex items-start gap-5">
              <FounderAvatar size={64} />
              <div>
                <div className="eyebrow">Editor&apos;s Note · From Thushara</div>
                <p className="mt-4 font-display text-xl italic leading-snug text-[var(--color-ink)]">
                  {region.editorNote}
                </p>
              </div>
            </div>
          </aside>
        </FadeIn>

        <section className="mt-16 border-t border-[var(--color-ink)]/10 pt-10">
          <div className="eyebrow">Other Regions</div>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {REGIONS.filter((r) => r.code !== region.code).map((r) => (
              <li key={r.code}>
                <Link
                  to="/trends/$country"
                  params={{ country: r.code }}
                  className="font-display text-lg italic underline decoration-[var(--color-taupe)]/60 underline-offset-4 hover:decoration-[var(--color-ink)]"
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 && (
          <section className="mt-16 border-t border-[var(--color-ink)]/10 pt-10">
            <div className="eyebrow">Read Next</div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/editorial/$slug"
                  params={{ slug: r.slug }}
                  className="group block"
                >
                  <div className="eyebrow">{r.eyebrow.split("·")[0]?.trim()}</div>
                  <div className="mt-2 font-display text-lg leading-snug group-hover:italic">
                    {r.title} {r.titleItalicTail}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 border border-[var(--color-ink)]/10 bg-[var(--color-ink)] p-8 text-[var(--color-cream)] md:p-10">
          <div className="eyebrow" style={{ color: "var(--color-blush)" }}>
            The Weekly
          </div>
          <div className="mt-4 max-w-[24ch] font-display text-2xl leading-tight md:text-3xl">
            Regional edits, every Sunday.
          </div>
          <div className="mt-6 max-w-sm">
            <NewsletterForm source={`trends-${region.code}`} tone="dark" />
          </div>
        </section>

        <AffiliateDisclosure />
      </div>
    </PageShell>
  );
}

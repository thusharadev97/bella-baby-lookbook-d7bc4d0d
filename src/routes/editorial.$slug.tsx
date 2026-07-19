import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { FadeIn } from "@/components/FadeIn";
import founderAsset from "@/assets/founder.jpg.asset.json";
import { getEditorialBySlug, EDITORIALS, type Block, type Editorial } from "@/data/editorials10";

export const Route = createFileRoute("/editorial/$slug")({
  loader: ({ params }) => {
    const article = getEditorialBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Editorial — Bella & Baby" }] };
    const url = `https://www.bellanbaby.shop/editorial/${a.slug}`;
    const fullTitle = `${a.title}${a.titleItalicTail ? " " + a.titleItalicTail : ""}`;
    return {
      meta: [
        { title: `${fullTitle} — Bella & Baby` },
        { name: "description", content: a.description },
        { name: "keywords", content: a.keywords },
        { name: "author", content: "Thushara Sanjeewa" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: fullTitle },
        { property: "og:description", content: a.description },
        { property: "og:url", content: url },
        { property: "article:author", content: "Thushara Sanjeewa" },
        { property: "article:section", content: "Women's Fashion" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: fullTitle },
        { name: "twitter:description", content: a.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: fullTitle,
            description: a.description,
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
            datePublished: a.datePublished,
            dateModified: a.datePublished,
            mainEntityOfPage: url,
            articleSection: "Women's Fashion",
            keywords: a.keywords,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: a.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: EditorialSlugPage,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
        <div className="eyebrow">404</div>
        <h1 className="mt-6 font-display text-4xl">Editorial not found</h1>
        <p className="mt-6 text-[var(--color-ink)]/70">
          The piece you're looking for may have moved. Browse the{" "}
          <Link to="/trends" className="underline">Trends index</Link> or return{" "}
          <Link to="/" className="underline">home</Link>.
        </p>
      </div>
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
        <h1 className="font-display text-3xl">Something went wrong loading this piece.</h1>
      </div>
    </PageShell>
  ),
});

function ImagePrompt({ text }: { text: string }) {
  return (
    <FadeIn>
      <figure className="my-10 border border-dashed border-[var(--color-taupe)]/50 bg-white/40 p-6">
        <div className="eyebrow">Editorial Image · Prompt</div>
        <p className="mt-3 text-sm italic leading-relaxed text-[var(--color-ink)]/70">
          {text}
        </p>
      </figure>
    </FadeIn>
  );
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i} className="h2">{block.text}</h2>;
    case "h3":
      return <h3 key={i} className="h3">{block.text}</h3>;
    case "p":
      return <p key={i} className="body">{block.text}</p>;
    case "ul":
      return (
        <ul key={i} className="body list-disc space-y-2 pl-6 marker:text-[var(--color-taupe)]">
          {block.items.map((it, j) => <li key={j}>{it}</li>)}
        </ul>
      );
    case "img":
      return <ImagePrompt key={i} text={block.prompt} />;
  }
}

function EditorialSlugPage() {
  const { article: a } = Route.useLoaderData() as { article: Editorial };
  const related = EDITORIALS.filter((e) => e.slug !== a.slug).slice(0, 3);

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-[var(--color-ink)] md:px-0">
        <div className="eyebrow">{a.eyebrow}</div>
        <h1 className="mt-6 font-display text-4xl leading-[1.06] md:text-6xl">
          {a.title}{" "}
          {a.titleItalicTail && (
            <span className="italic text-[var(--color-taupe)]">{a.titleItalicTail}</span>
          )}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink)]/70">{a.lede}</p>

        <FadeIn>
          <div className="mt-10 flex items-center gap-4 border-y border-[var(--color-ink)]/10 py-5">
            <img
              src={founderAsset.url}
              alt="Thushara Sanjeewa — Founder & Editor-in-Chief, Bella & Baby"
              className="h-14 w-14 rounded-full object-cover"
              loading="eager"
            />
            <div className="text-sm">
              <div className="font-display text-lg leading-tight">By Thushara Sanjeewa</div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                Founder · Editor-in-Chief · {new Date(a.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} · {a.readMinutes} min read
              </div>
            </div>
          </div>
        </FadeIn>

        <ImagePrompt text={a.heroImagePrompt} />

        {a.blocks.map((b: Block, i: number) => renderBlock(b, i))}

        {/* Editor's Styling Note */}
        <FadeIn>
          <aside className="mt-14 border-l-2 border-[var(--color-taupe)] bg-white/50 p-8">
            <div className="flex items-start gap-5">
              <img
                src={founderAsset.url}
                alt="Thushara Sanjeewa"
                className="h-16 w-16 shrink-0 rounded-full object-cover"
              />
              <div>
                <div className="eyebrow">Editor's Styling Note · From Thushara</div>
                <p className="mt-4 font-display text-xl italic leading-snug text-[var(--color-ink)]">
                  {a.editorNote}
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
          {a.faqs.map((f: { q: string; a: string }) => (
            <div key={f.q}>
              <dt className="font-display text-xl text-[var(--color-ink)]">{f.q}</dt>
              <dd className="mt-3 text-[var(--color-ink)]/75 leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>

        {/* Internal link suggestions */}
        <section className="mt-16 border-t border-[var(--color-ink)]/10 pt-10">
          <div className="eyebrow">Continue Reading</div>
          <ul className="mt-6 space-y-4">
            {a.internalLinks.map((l: { anchor: string; futureSlug: string; note: string }) => (
              <li key={l.futureSlug} className="text-[var(--color-ink)]/80">
                <Link
                  to={l.futureSlug}
                  className="font-display text-lg italic underline decoration-[var(--color-taupe)]/60 underline-offset-4 hover:decoration-[var(--color-ink)]"
                >
                  {l.anchor}
                </Link>{" "}
                <span className="text-sm text-[var(--color-ink)]/60">— {l.note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Related editorials in this batch */}
        <section className="mt-16 border-t border-[var(--color-ink)]/10 pt-10">
          <div className="eyebrow">More from the 2026 Report</div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/editorial/$slug"
                params={{ slug: r.slug }}
                className="group block"
              >
                <div className="eyebrow">{r.eyebrow.split("·")[0].trim()}</div>
                <div className="mt-2 font-display text-lg leading-snug group-hover:italic">
                  {r.title} {r.titleItalicTail}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-16 text-center">
          <Link
            to="/lookbook"
            className="inline-block border border-[var(--color-ink)] px-8 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
          >
            Enter the Summer '26 Lookbook
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
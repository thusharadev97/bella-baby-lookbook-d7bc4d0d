import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { FadeIn } from "@/components/FadeIn";
import { getArticleBySlug, getSlugForPost, readingMinutes } from "@/data/articles";
import { posts } from "@/data/posts";
import founderAsset from "@/assets/founder.jpg.asset.json";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const found = getArticleBySlug(params.slug);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Journal — Bella & Baby" }],
      };
    }
    const { article, post } = loaderData;
    const title = `${post.title} — Bella & Baby`;
    const url = `/journal/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: article.metaDescription },
        { name: "keywords", content: `${post.category}, ${post.tags.join(", ")}, quiet luxury kids clothing, sustainable baby wardrobe, heirloom premium childrenswear` },
        { property: "og:title", content: title },
        { property: "og:description", content: article.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: post.image },
        { property: "og:locale", content: "en_US" },
        { property: "article:author", content: "Thushara Sanjeewa" },
        { property: "article:published_time", content: post.date },
        { property: "article:section", content: post.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: post.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: article.metaDescription,
            image: [post.image],
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: "Thushara Sanjeewa",
              jobTitle: "Founder & Editor-in-Chief",
              url: "https://www.bellanbaby.shop/about",
            },
            publisher: {
              "@type": "Organization",
              name: "Bella & Baby",
              url: "https://www.bellanbaby.shop",
              logo: {
                "@type": "ImageObject",
                url: "https://www.bellanbaby.shop/favicon.ico",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.bellanbaby.shop${url}`,
            },
            articleSection: post.category,
            keywords: post.tags.join(", "),
            inLanguage: "en-US",
          }),
        },
      ],
    };
  },
  component: JournalArticle,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 py-40 text-center">
        <div className="eyebrow">404</div>
        <h1 className="mt-4 font-display text-5xl text-[var(--color-ink)]">Story not found</h1>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm underline">
          <ArrowLeft className="h-4 w-4" /> Return to the journal
        </Link>
      </div>
    </PageShell>
  ),
});

function JournalArticle() {
  const { article, post } = Route.useLoaderData();
  const minutes = readingMinutes(article);

  const idx = posts.findIndex((p) => p.id === post.id);
  const prev = idx > 0 ? posts[idx - 1] : null;
  const next = idx < posts.length - 1 ? posts[idx + 1] : null;
  const prevSlug = prev ? getSlugForPost(prev.id) : null;
  const nextSlug = next ? getSlugForPost(next.id) : null;

  return (
    <PageShell>
      {/* Hero */}
      <article>
        <header className="mx-auto max-w-[1400px] px-6 pt-32 md:px-10 md:pt-40">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--color-taupe)] transition-colors hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> The Journal
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[var(--color-taupe)]">
            <span>{post.category}</span>
            <span className="h-px w-8 bg-[var(--color-taupe)]/50" />
            <span>{post.date}</span>
            <span className="h-px w-8 bg-[var(--color-taupe)]/50" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {minutes} min read
            </span>
          </div>
          <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[1.02] text-[var(--color-ink)] md:text-7xl lg:text-8xl">
            {post.title}
          </h1>
          <p className="mt-8 max-w-3xl font-display text-2xl italic leading-snug text-[var(--color-taupe)] md:text-3xl">
            {article.dek}
          </p>
          <div className="mt-10 flex items-center gap-4 border-t border-[var(--color-ink)]/10 pt-6">
            <img
              src={founderAsset.url}
              alt="Thushara Sanjeewa"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="text-sm">
              <div className="font-medium text-[var(--color-ink)]">By Thushara Sanjeewa</div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-taupe)]">
                Founder · Editor-in-Chief
              </div>
            </div>
          </div>
        </header>

        <FadeIn>
          <div className="mx-auto mt-16 max-w-[1600px] px-6 md:px-10">
            <div className="aspect-[16/9] overflow-hidden bg-[var(--color-ink)]/5">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </FadeIn>

        {/* Body */}
        <div className="mx-auto mt-20 grid max-w-[1200px] gap-16 px-6 pb-20 md:grid-cols-12 md:px-10">
          <div className="md:col-span-8 md:col-start-3">
            {article.sections.map((s, i) => (
              <FadeIn key={i}>
                <section className="mb-14">
                  <h2 className="font-display text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
                    {s.h2}
                  </h2>
                  <div className="mt-6 space-y-5 text-[17px] leading-[1.75] text-[var(--color-ink)]/85">
                    {s.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>

                  {s.h3 && (
                    <div className="mt-10">
                      <h3 className="font-display text-2xl italic text-[var(--color-ink)]">
                        {s.h3}
                      </h3>
                      {s.h3Paragraphs && (
                        <div className="mt-4 space-y-5 text-[17px] leading-[1.75] text-[var(--color-ink)]/85">
                          {s.h3Paragraphs.map((p, k) => (
                            <p key={k}>{p}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {s.list && s.list.length > 0 && (
                    <ul className="mt-8 space-y-3 border-l border-[var(--color-ink)]/15 pl-6">
                      {s.list.map((item, k) => (
                        <li
                          key={k}
                          className="relative text-[16px] leading-relaxed text-[var(--color-ink)]/85"
                        >
                          <span className="absolute -left-[27px] top-2.5 h-1 w-3 bg-[var(--color-taupe)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.table && (
                    <figure className="mt-10 overflow-hidden border border-[var(--color-ink)]/10">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-[var(--color-ink)] text-[var(--color-cream)]">
                          <tr>
                            {s.table.headers.map((h, k) => (
                              <th
                                key={k}
                                className="px-4 py-3 text-[10px] uppercase tracking-[0.24em]"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {s.table.rows.map((row, k) => (
                            <tr
                              key={k}
                              className="border-t border-[var(--color-ink)]/10 odd:bg-white/50"
                            >
                              {row.map((cell, m) => (
                                <td
                                  key={m}
                                  className="px-4 py-3 align-top text-[var(--color-ink)]/85"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {s.table.caption && (
                        <figcaption className="border-t border-[var(--color-ink)]/10 bg-[var(--color-cream)] px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                          {s.table.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </section>
              </FadeIn>
            ))}

            {/* Editor's Note */}
            <FadeIn>
              <aside className="my-16 border border-[var(--color-ink)]/10 bg-white/70 p-8 md:p-12">
                <div className="flex items-center gap-4">
                  <img
                    src={founderAsset.url}
                    alt="Thushara Sanjeewa"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="eyebrow">Editor's Styling Note</div>
                    <div className="mt-1 font-display text-xl text-[var(--color-ink)]">
                      Thushara Sanjeewa
                    </div>
                  </div>
                </div>
                <p className="mt-6 font-display text-xl italic leading-relaxed text-[var(--color-ink)]/85 md:text-2xl">
                  {article.editorsNote}
                </p>
              </aside>
            </FadeIn>

            {/* Closing */}
            <FadeIn>
              <p className="mt-10 border-t border-[var(--color-ink)]/10 pt-10 font-display text-2xl leading-snug text-[var(--color-ink)] md:text-3xl">
                {article.closing}
              </p>
            </FadeIn>

            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="border border-[var(--color-ink)]/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink)]/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <nav className="mx-auto max-w-[1200px] border-t border-[var(--color-ink)]/10 px-6 py-16 md:px-10">
          <div className="grid gap-8 md:grid-cols-2">
            {prev && prevSlug ? (
              <Link
                to="/journal/$slug"
                params={{ slug: prevSlug }}
                className="group"
              >
                <div className="eyebrow">
                  <ArrowLeft className="mr-2 inline h-3 w-3" /> Previous Edit
                </div>
                <div className="mt-3 font-display text-2xl text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-taupe)]">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next && nextSlug ? (
              <Link
                to="/journal/$slug"
                params={{ slug: nextSlug }}
                className="group md:text-right"
              >
                <div className="eyebrow">
                  Next Edit <ArrowRight className="ml-2 inline h-3 w-3" />
                </div>
                <div className="mt-3 font-display text-2xl text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-taupe)]">
                  {next.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </article>
    </PageShell>
  );
}

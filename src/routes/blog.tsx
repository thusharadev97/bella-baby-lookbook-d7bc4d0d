import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { FadeIn } from "@/components/FadeIn";
import { imageUrl } from "@/integrations/sanity/client";
import {
  BLOG_LIST_QUERY,
  formatPostDate,
  type BlogPostSummary,
} from "@/integrations/sanity/queries";
import { sanityClient } from "@/integrations/sanity/client";
import { resolveEditorialImage } from "@/data/editorialImages";

const TITLE = "The Blog — Luxury Fashion Editorials | Bella & Baby";
const DESCRIPTION =
  "New essays, seasonal edits and styling reports from the Bella & Baby editorial desk — quiet luxury for women, elevated design for children.";

export const Route = createFileRoute("/blog")({
  loader: async () => {
    const posts = await sanityClient.fetch<BlogPostSummary[]>(BLOG_LIST_QUERY);
    return { posts: posts ?? [] };
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndexPage,
  pendingComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/5] bg-[var(--color-ink)]/5" />
              <div className="mt-5 h-3 w-24 bg-[var(--color-ink)]/10" />
              <div className="mt-4 h-6 w-3/4 bg-[var(--color-ink)]/10" />
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-2xl px-6 pb-24 pt-40 text-center">
        <div className="eyebrow">The Blog</div>
        <h1 className="mt-6 font-display text-4xl">The journal is briefly unavailable</h1>
        <p className="mt-6 leading-relaxed text-[var(--color-ink)]/70">
          We couldn't reach the content library. If this persists, the site's address may
          need to be added as an allowed CORS origin in the Sanity project settings.
        </p>
        <Link
          to="/trends"
          className="mt-10 inline-block border border-[var(--color-ink)] px-8 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
        >
          Browse the Trends Report
        </Link>
      </div>
    </PageShell>
  ),
});

export function coverSrc(post: BlogPostSummary, width: number): string {
  return (
    imageUrl(post.cover, width) ??
    resolveEditorialImage(post.title ?? "editorial fashion portrait", post.slug ?? post._id, "hero").src
  );
}

function BlogIndexPage() {
  const { posts } = Route.useLoaderData();
  const [lead, ...rest] = posts;

  return (
    <PageShell>
      <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-36 md:px-10 md:pt-44">
        <header className="max-w-3xl">
          <div className="eyebrow">The Blog</div>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] md:text-7xl">
            Editorials, <span className="italic text-[var(--color-taupe)]">edits</span> &amp; field notes
          </h1>
          <p className="mt-7 text-lg leading-relaxed text-[var(--color-ink)]/70">{DESCRIPTION}</p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-20 border-t border-[var(--color-ink)]/10 pt-10 text-[var(--color-ink)]/65">
            No stories have been published yet. New pieces appear here the moment they go
            live in the studio.
          </p>
        ) : (
          <>
            {lead && (
              <FadeIn>
                <Link
                  to="/blog/$slug"
                  params={{ slug: lead.slug ?? "" }}
                  className="group mt-16 grid gap-8 border-t border-[var(--color-ink)]/10 pt-12 md:grid-cols-2 md:gap-14"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[var(--color-ink)]/5">
                    <img
                      src={coverSrc(lead, 1400)}
                      alt={lead.title ?? "Bella & Baby editorial"}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                      loading="eager"
                    />
                  </div>
                  <div className="self-center">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[var(--color-taupe)]">
                      <span>{lead.category ?? "Editorial"}</span>
                      <span className="h-px w-6 bg-[var(--color-taupe)]/50" />
                      <span>{formatPostDate(lead.publishedAt)}</span>
                    </div>
                    <h2 className="mt-5 font-display text-3xl leading-tight md:text-5xl">
                      {lead.title}
                    </h2>
                    {lead.excerpt && (
                      <p className="mt-5 max-w-xl leading-relaxed text-[var(--color-ink)]/70">
                        {lead.excerpt}
                      </p>
                    )}
                    <span className="mt-7 inline-block text-[10px] uppercase tracking-[0.28em] underline decoration-[var(--color-taupe)]/60 underline-offset-[6px]">
                      Read the edit →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            )}

            {rest.length > 0 && (
              <div className="mt-20 grid gap-x-10 gap-y-16 border-t border-[var(--color-ink)]/10 pt-14 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <FadeIn key={post._id}>
                    <article className="group">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug ?? "" }}
                        className="block aspect-[4/5] overflow-hidden bg-[var(--color-ink)]/5"
                      >
                        <img
                          src={coverSrc(post, 900)}
                          alt={post.title ?? "Bella & Baby editorial"}
                          className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                          loading="lazy"
                        />
                      </Link>
                      <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[var(--color-taupe)]">
                        <span>{post.category ?? "Editorial"}</span>
                        <span className="h-px w-5 bg-[var(--color-taupe)]/50" />
                        <span>{formatPostDate(post.publishedAt)}</span>
                      </div>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug ?? "" }}
                        className="mt-3 block font-display text-2xl leading-tight transition-colors group-hover:text-[var(--color-taupe)]"
                      >
                        {post.title}
                      </Link>
                      {post.excerpt && (
                        <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/65">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-4 text-[10px] uppercase tracking-[0.24em] text-[var(--color-ink)]/50">
                        By {post.author ?? "Thushara Sanjeewa"}
                      </div>
                    </article>
                  </FadeIn>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </PageShell>
  );
}

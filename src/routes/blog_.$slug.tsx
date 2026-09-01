import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { PageShell } from "@/components/PageShell";
import { FadeIn } from "@/components/FadeIn";
import { AdSenseSlot } from "@/components/AdSenseSlot";
import { AffiliateDisclosure } from "@/components/AffiliateLink";
import founderAsset from "@/assets/founder.jpg.asset.json";
import { imageUrl, sanityClient } from "@/integrations/sanity/client";
import {
  BLOG_POST_QUERY,
  blockText,
  formatPostDate,
  portableWordCount,
  slugifyHeading,
  type BlogPost,
  type PortableBlock,
} from "@/integrations/sanity/queries";
import { resolveEditorialImage } from "@/data/editorialImages";

export const Route = createFileRoute("/blog_/$slug")({
  loader: async ({ params }) => {
    const post = await sanityClient.fetch<BlogPost | null>(BLOG_POST_QUERY, {
      slug: params.slug,
    });
    if (!post) throw notFound();
    const hero =
      imageUrl(post.cover, 1600, 1000) ??
      resolveEditorialImage(post.title ?? "editorial fashion portrait", params.slug, "hero").src;
    return { post, hero };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [{ title: "Unavailable — Bella & Baby" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = post.metaTitle ?? post.title ?? "Editorial";
    const description =
      post.metaDescription ??
      post.excerpt ??
      "An editorial from the Bella & Baby fashion desk.";
    const url = `/blog/${params.slug}`;
    const faqs = (post.faqs ?? []).filter((f) => f.question && f.answer);

    return {
      meta: [
        { title: `${title} — Bella & Baby` },
        { name: "description", content: description },
        ...(post.keywords ? [{ name: "keywords", content: post.keywords }] : []),
        { name: "author", content: post.author ?? "Thushara Sanjeewa" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: loaderData.hero },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: loaderData.hero },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description,
            image: loaderData.hero,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            author: {
              "@type": "Person",
              name: post.author ?? "Thushara Sanjeewa",
              jobTitle: "Founder & Editor-in-Chief, Bella & Baby",
            },
            publisher: { "@type": "Organization", name: "Bella & Baby" },
            mainEntityOfPage: url,
          }),
        },
        ...(faqs.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqs.map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: { "@type": "Answer", text: f.answer },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  component: BlogArticlePage,
  notFoundComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
        <div className="eyebrow">404</div>
        <h1 className="mt-6 font-display text-4xl">This story isn't here</h1>
        <p className="mt-6 text-[var(--color-ink)]/70">
          The piece may have moved. Browse{" "}
          <Link to="/blog" className="underline">the blog index</Link> or return{" "}
          <Link to="/" className="underline">home</Link>.
        </p>
      </div>
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
        <h1 className="font-display text-3xl">Something went wrong loading this story.</h1>
        <p className="mt-5 text-[var(--color-ink)]/70">
          If this persists, the site's address may need to be allowlisted as a CORS origin
          in the Sanity project.
        </p>
      </div>
    </PageShell>
  ),
});

const components: PortableTextComponents = {
  block: {
    h1: ({ children, value }) => (
      <h2 id={slugifyHeading(blockText(value as PortableBlock))} className="h2 scroll-mt-28">
        {children}
      </h2>
    ),
    h2: ({ children, value }) => (
      <h2 id={slugifyHeading(blockText(value as PortableBlock))} className="h2 scroll-mt-28">
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={slugifyHeading(blockText(value as PortableBlock))} className="h3 scroll-mt-28">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 font-display text-lg tracking-tight text-[var(--color-ink)]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-2 border-[var(--color-taupe)] pl-6 font-display text-xl italic leading-snug text-[var(--color-ink)]">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="body">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="body list-disc space-y-2 pl-6 marker:text-[var(--color-taupe)]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="body list-decimal space-y-2 pl-6 marker:text-[var(--color-taupe)]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={(value as { href?: string })?.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="underline decoration-[var(--color-taupe)]/60 underline-offset-4 hover:decoration-[var(--color-ink)]"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = imageUrl(value, 1400);
      if (!src) return null;
      const caption = (value as { caption?: string; alt?: string })?.caption;
      const alt = (value as { alt?: string })?.alt ?? caption ?? "Bella & Baby editorial image";
      return (
        <FadeIn>
          <figure className="my-12">
            <div className="aspect-[3/2] overflow-hidden bg-[var(--color-blush)]/30">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            {caption && (
              <figcaption className="mt-3 font-display text-[13px] italic leading-relaxed text-[var(--color-ink)]/55">
                {caption}
              </figcaption>
            )}
          </figure>
        </FadeIn>
      );
    },
  },
};

function BlogArticlePage() {
  const { post, hero } = Route.useLoaderData();
  const body = (post.body ?? []) as PortableBlock[];
  const wordCount = portableWordCount(body);
  const readMinutes = Math.max(1, Math.round(wordCount / 220));
  const faqs = (post.faqs ?? []).filter((f) => f.question && f.answer);
  const toc = body
    .filter((b) => b._type === "block" && (b.style === "h2" || b.style === "h3"))
    .map((b) => ({ text: blockText(b), level: b.style === "h3" ? 3 : 2 }))
    .filter((t) => t.text.trim().length > 0)
    .map((t) => ({ ...t, id: slugifyHeading(t.text) }));

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-[var(--color-ink)] md:pt-44">
        <div className="eyebrow">{post.category ?? "Editorial"}</div>
        <h1 className="mt-6 font-display text-4xl leading-[1.06] md:text-6xl">{post.title}</h1>
        {post.excerpt && (
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink)]/70">{post.excerpt}</p>
        )}

        <FadeIn>
          <div className="mt-10 flex items-center gap-4 border-y border-[var(--color-ink)]/10 py-5">
            <img
              src={founderAsset.url}
              alt="Thushara Sanjeewa — Founder & Editor-in-Chief, Bella & Baby"
              className="h-14 w-14 rounded-full object-cover"
            />
            <div className="text-sm">
              <div className="font-display text-lg leading-tight">
                By {post.author ?? "Thushara Sanjeewa"}
              </div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                Founder · Editor-in-Chief
                {post.publishedAt ? ` · ${formatPostDate(post.publishedAt)}` : ""} ·{" "}
                {readMinutes} min read
              </div>
              <a
                href="mailto:contact@bellanbaby.shop"
                className="mt-1 inline-block text-[11px] tracking-[0.12em] text-[var(--color-ink)]/60 underline underline-offset-4 hover:text-[var(--color-ink)]"
              >
                contact@bellanbaby.shop
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <figure className="my-10 -mx-6 md:mx-0">
            <div className="aspect-[16/10] overflow-hidden bg-[var(--color-blush)]/30">
              <img
                src={hero}
                alt={post.title ?? "Bella & Baby editorial"}
                width={1600}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>
          </figure>
        </FadeIn>

        {toc.length > 1 && (
          <FadeIn>
            <nav
              aria-label="Table of contents"
              className="my-10 border border-[var(--color-ink)]/12 bg-white/50 p-7"
            >
              <div className="eyebrow">In This Article</div>
              <ol className="mt-4 space-y-2 text-sm text-[var(--color-ink)]/75">
                {toc.map((t, i) => (
                  <li key={`${t.id}-${i}`} className={`flex gap-3 ${t.level === 3 ? "pl-5" : ""}`}>
                    <span className="text-[var(--color-taupe)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a href={`#${t.id}`} className="hover:text-[var(--color-ink)] hover:underline">
                      {t.text}
                    </a>
                  </li>
                ))}
                {faqs.length > 0 && (
                  <li className="flex gap-3">
                    <span className="text-[var(--color-taupe)]">
                      {String(toc.length + 1).padStart(2, "0")}
                    </span>
                    <a href="#faq" className="hover:text-[var(--color-ink)] hover:underline">
                      Frequently Asked Questions
                    </a>
                  </li>
                )}
              </ol>
              <div className="mt-5 text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                {wordCount.toLocaleString()} words · {readMinutes} min read
              </div>
            </nav>
          </FadeIn>
        )}

        {body.length > 0 ? (
          <PortableText value={body} components={components} />
        ) : (
          <p className="body">This story is being finished in the studio — check back shortly.</p>
        )}

        <AdSenseSlot wordCount={wordCount} slot="1234567890" />

        {faqs.length > 0 && (
          <>
            <h2 id="faq" className="h2 scroll-mt-28">
              Frequently Asked Questions
            </h2>
            <dl className="mt-6 space-y-8">
              {faqs.map((f, i) => (
                <div key={`${f.question}-${i}`}>
                  <dt className="font-display text-xl">{f.question}</dt>
                  <dd className="mt-3 leading-relaxed text-[var(--color-ink)]/75">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </>
        )}

        <AffiliateDisclosure />

        <section className="mt-16 border-t border-[var(--color-ink)]/10 pt-10">
          <div className="eyebrow">Continue Reading</div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/blog"
              className="border border-[var(--color-ink)] px-7 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
            >
              All stories
            </Link>
            <Link
              to="/trends"
              className="border border-[var(--color-ink)]/25 px-7 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:border-[var(--color-ink)]"
            >
              Trends report
            </Link>
            <Link
              to="/lookbook"
              className="border border-[var(--color-ink)]/25 px-7 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:border-[var(--color-ink)]"
            >
              The lookbook
            </Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}

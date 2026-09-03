import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { FadeIn } from "@/components/FadeIn";
import { MAGAZINE_CATEGORIES } from "@/data/magazine";

const TITLE = "Write for Us — Contributor Submissions | Bella & Baby Magazine";
const DESCRIPTION =
  "Pitch a fashion feature to Bella & Baby. Submission guidelines, word counts, editorial standards and payment terms for contributing writers and stylists in the US, UK, France and Germany.";

export const Route = createFileRoute("/write-for-us")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/write-for-us" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/write-for-us" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "/" },
            { "@type": "ListItem", position: 2, name: "Write for Us", item: "/write-for-us" },
          ],
        }),
      },
    ],
  }),
  component: WriteForUsPage,
});

const standards = [
  {
    title: "1,800 words, minimum",
    body: "We publish reported features, not blog posts. Expect to file between 1,800 and 2,600 words with H2 and H3 structure, short paragraphs, and a clear point of view.",
  },
  {
    title: "First-hand reporting",
    body: "Quote the stylist, the buyer, the fabric mill or the mother. We do not accept pieces assembled from other publications, and we do not accept AI-generated copy.",
  },
  {
    title: "Named specifics",
    body: "Real labels, real fabrics, real prices in USD, GBP or EUR. Sizing conventions differ across the US, UK, FR and DE — note which market you are writing for.",
  },
  {
    title: "Original imagery or none",
    body: "Send imagery you own or have licensed, with credits. If you have none, we will art-direct the piece from our own library.",
  },
  {
    title: "Disclosure",
    body: "Declare gifted product, brand relationships and affiliate interests when you file. We disclose them to readers on publication.",
  },
  {
    title: "Five working days",
    body: "Our desk responds within five working days with an approval, a revision request, or a pass — always with a reason.",
  },
];

function WriteForUsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-[1100px] px-6 pb-28 pt-36 md:px-10 md:pt-44">
        <header className="border-b border-[var(--color-ink)]/15 pb-10">
          <div className="eyebrow">Contributors</div>
          <h1 className="mt-6 font-display text-5xl leading-[1.03] md:text-6xl">
            Write for Bella <span className="italic text-[var(--color-taupe)]">&amp;</span> Baby
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[var(--color-ink)]/70">
            We commission journalists, stylists and buyers who know the difference between a trend
            and a shift. If you can report on quiet luxury, capsule dressing, European street style
            or children's fashion with genuine authority, we want to read you.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/auth"
              search={{ redirect: "/contributor" }}
              className="border border-[var(--color-ink)] px-8 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
            >
              Create a contributor account
            </Link>
            <Link
              to="/contributor"
              className="border border-[var(--color-ink)]/25 px-8 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:border-[var(--color-ink)]"
            >
              Submit an article
            </Link>
          </div>
        </header>

        <section className="mt-16">
          <h2 className="font-display text-3xl">What we commission</h2>
          <div className="mt-8 grid gap-px border border-[var(--color-ink)]/12 bg-[var(--color-ink)]/12 md:grid-cols-2">
            {MAGAZINE_CATEGORIES.map((c) => (
              <div key={c.slug} className="bg-[var(--color-cream)] p-8">
                <div className="eyebrow">{c.tagline}</div>
                <h3 className="mt-3 font-display text-2xl">{c.label}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-ink)]/65">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl">Editorial standards</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {standards.map((s) => (
              <FadeIn key={s.title}>
                <div className="border-t border-[var(--color-ink)]/15 pt-6">
                  <h3 className="font-display text-xl">{s.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-ink)]/70">
                    {s.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl">How submission works</h2>
          <ol className="mt-8 space-y-6 text-[15px] leading-relaxed text-[var(--color-ink)]/75">
            {[
              "Create an account with your email or Google — this is how we tie your submissions and our notes together.",
              "File your piece in the contributor studio: headline, section, market focus, standfirst, body copy, keywords and imagery.",
              "Our desk reviews it and sets a status — in review, needs revision, approved or passed.",
              "You see the editor's notes on your dashboard, revise, and refile. Approved pieces are scheduled into the magazine.",
            ].map((step, i) => (
              <li key={i} className="flex gap-5">
                <span className="font-display text-2xl text-[var(--color-taupe)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 border-t border-[var(--color-ink)]/15 pt-10">
          <h2 className="font-display text-3xl">Questions</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-ink)]/70">
            Anything the guidelines don't cover, write to{" "}
            <a
              href="mailto:contact@bellanbaby.shop"
              className="underline decoration-[var(--color-taupe)]/60 underline-offset-4 hover:decoration-[var(--color-ink)]"
            >
              contact@bellanbaby.shop
            </a>{" "}
            or use the{" "}
            <Link to="/contact" className="underline underline-offset-4">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}

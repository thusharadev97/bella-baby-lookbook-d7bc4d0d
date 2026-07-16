import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { FadeIn } from "@/components/FadeIn";
import { posts } from "@/data/posts";
import { getSlugForPost } from "@/data/articles";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — Bella & Baby" },
      { name: "description", content: "A full-bleed editorial lookbook of contemporary kids and baby fashion, curated by Bella & Baby." },
      { property: "og:title", content: "Lookbook — Bella & Baby" },
      { property: "og:description", content: "A full-bleed editorial lookbook of contemporary kids fashion." },
    ],
  }),
  component: Lookbook,
});

function Lookbook() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 md:px-10">
        <div className="eyebrow">Volume 07 · Summer '26</div>
        <h1 className="mt-6 font-display text-6xl leading-[1.02] text-[var(--color-ink)] md:text-8xl">
          The <span className="italic text-[var(--color-taupe)]">Lookbook.</span>
        </h1>
      </section>

      <section className="mx-auto max-w-[1600px] space-y-8 px-6 pb-24 md:px-10">
        {posts.map((p, i) => {
          const flip = i % 2 === 1;
          const slug = getSlugForPost(p.id) ?? "";
          return (
            <FadeIn key={p.id}>
              <div className={`grid gap-6 md:grid-cols-12 md:gap-10 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="md:col-span-8">
                  <Link to="/journal/$slug" params={{ slug }} className="block aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-[1.04]"
                    />
                  </Link>
                </div>
                <div className="md:col-span-4 md:self-end md:pb-6">
                  <div className="eyebrow">{p.category} · {String(i + 1).padStart(2, "0")}</div>
                  <Link to="/journal/$slug" params={{ slug }} className="mt-4 block font-display text-4xl leading-tight text-[var(--color-ink)] hover:text-[var(--color-taupe)]">
                    {p.title}
                  </Link>
                  <p className="mt-4 text-[var(--color-ink)]/70">{p.snippet}</p>
                  <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-[var(--color-taupe)]">
                    <span>{p.date}</span>
                    <Link to="/journal/$slug" params={{ slug }} className="underline underline-offset-[6px] decoration-[var(--color-taupe)]/50 hover:decoration-[var(--color-ink)] hover:text-[var(--color-ink)]">
                      Read the edit →
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </section>
    </PageShell>
  );
}

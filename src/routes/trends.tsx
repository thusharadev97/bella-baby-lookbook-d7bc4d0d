import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { MasonryGrid } from "@/components/MasonryGrid";
import { FadeIn } from "@/components/FadeIn";
import { posts, trending } from "@/data/posts";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [
      { title: "Trends — Bella & Baby" },
      { name: "description", content: "Global style trends in contemporary kids and baby fashion, curated weekly by Bella & Baby." },
      { property: "og:title", content: "Trends — Bella & Baby" },
      { property: "og:description", content: "Global style trends in contemporary kids fashion." },
    ],
  }),
  component: Trends,
});

const cats = ["All", "Streetwear", "Chic Minimalist", "Global Summer", "Heritage", "Play Editorial"];

function Trends() {
  const [cat, setCat] = useState<string>("All");
  const filtered = useMemo(
    () => (cat === "All" ? posts : posts.filter((p) => p.category === cat)),
    [cat]
  );

  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 md:px-10">
        <div className="eyebrow">The Trend Report</div>
        <h1 className="mt-6 max-w-4xl font-display text-6xl leading-[1.02] text-[var(--color-ink)] md:text-8xl">
          The stories<br /><span className="italic text-[var(--color-taupe)]">shaping</span> a season.
        </h1>
        <p className="mt-8 max-w-xl text-[var(--color-ink)]/70">
          A living index of what our editors, photographers, and stylists are watching
          — from downtown New York to Copenhagen and back.
        </p>

        <div className="mt-16 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] transition-all ${
                cat === c
                  ? "bg-[var(--color-ink)] text-[var(--color-cream)]"
                  : "border border-[var(--color-ink)]/20 text-[var(--color-ink)]/70 hover:border-[var(--color-ink)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <FadeIn>
          <MasonryGrid posts={filtered} />
        </FadeIn>
      </section>

      <section className="border-t border-[var(--color-ink)]/10 bg-white/40 py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="eyebrow">Hot Keywords</div>
          <div className="mt-6 flex flex-wrap gap-3">
            {trending.map((k) => (
              <span key={k} className="border border-[var(--color-ink)]/15 px-4 py-2 text-sm text-[var(--color-ink)]/80 transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]">
                {k}
              </span>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bella & Baby" },
      { name: "description", content: "The story of Bella & Baby — a global editorial lookbook founded by Thushara Sanjeewa, curating elevated kids and baby fashion for the modern American family." },
      { property: "og:title", content: "About — Bella & Baby" },
      { property: "og:description", content: "The story of Bella & Baby, founded by Thushara Sanjeewa." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 md:px-10">
        <div className="eyebrow">Our Story</div>
        <h1 className="mt-6 max-w-4xl font-display text-6xl leading-[1.02] text-[var(--color-ink)] md:text-8xl">
          Elevating the way a<br /><span className="italic text-[var(--color-taupe)]">generation</span> is dressed.
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-16 px-6 pb-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80"
              alt="Editorial portrait"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-8">
            <div className="eyebrow">Founder</div>
            <div className="mt-3 font-display text-2xl text-[var(--color-ink)]">Thushara Sanjeewa</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">Editor-in-Chief · Polonnaruwa</div>
          </div>
        </div>

        <FadeIn className="md:col-span-7 md:pt-8">
          <p className="font-display text-3xl leading-snug text-[var(--color-ink)] md:text-4xl">
            Bella &amp; Baby began as a private mood board — and quietly became the
            slow, considered lookbook we always wished existed.
          </p>
          <div className="mt-10 space-y-6 text-[var(--color-ink)]/75 leading-relaxed">
            <p>
              Founded in 2026 by Thushara Sanjeewa, Bella &amp; Baby is a global editorial
              devoted to how a new generation is being dressed — from Sag Harbor
              linen mornings to Silver Lake weekends, from Copenhagen playgrounds
              to Tokyo side-streets.
            </p>
            <p>
              We are not a store. We are not a marketplace. We are a lookbook — a
              carefully paced, quietly opinionated visual journal for American
              families who care as much about how their children see the world
              as how the world sees them.
            </p>
            <p>
              Every story is shot, styled, and written with intention. Every
              recommendation is one we would give to a friend. And every issue is
              built on a simple belief: that children deserve beauty — the soft,
              honest, un-loud kind — long before they can ask for it.
            </p>
            <p className="font-display text-2xl italic text-[var(--color-taupe)]">
              — Thushara Sanjeewa, Founder
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-[var(--color-ink)]/10 bg-white/40 py-24">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-3 md:px-10">
          {[
            { k: "Curated", v: "Every look is hand-selected by our editorial team — no algorithms, no shortcuts." },
            { k: "Considered", v: "We publish slowly, on purpose. One Sunday edit, one seasonal issue at a time." },
            { k: "Global", v: "Written from Sri Lanka, styled for America, read by families in twenty-four countries." },
          ].map((it) => (
            <div key={it.k}>
              <div className="eyebrow">{it.k}</div>
              <p className="mt-4 font-display text-2xl leading-snug text-[var(--color-ink)]">{it.v}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { MasonryGrid } from "@/components/MasonryGrid";
import { Sidebar } from "@/components/Sidebar";
import { FadeIn } from "@/components/FadeIn";
import { posts } from "@/data/posts";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Hero />

      {/* Editorial intro strip */}
      <FadeIn className="mx-auto max-w-[1400px] px-6 py-24 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-3">
            <div className="eyebrow">The Journal</div>
          </div>
          <p className="md:col-span-9 font-display text-3xl leading-tight text-[var(--color-ink)] md:text-5xl">
            Thirty small stories on how a new generation is being dressed —
            <span className="italic text-[var(--color-taupe)]"> considered, contemporary, and quietly American.</span>
          </p>
        </div>
      </FadeIn>

      {/* Grid + Sidebar */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <FadeIn>
            <MasonryGrid posts={posts} />
          </FadeIn>
          <FadeIn delay={120}>
            <Sidebar />
          </FadeIn>
        </div>
      </section>

      {/* Lookbook teaser */}
      <FadeIn>
        <section className="relative h-[70vh] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1800&q=80"
            alt="Lookbook teaser"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
            <div className="eyebrow" style={{ color: "var(--color-blush)" }}>The Lookbook</div>
            <h2 className="mt-4 max-w-2xl font-display text-5xl leading-tight text-white md:text-7xl">
              A quiet edit for<br /><span className="italic">loud childhoods.</span>
            </h2>
            <Link
              to="/lookbook"
              className="group mt-8 inline-flex w-fit items-center gap-3 border border-white/50 px-7 py-4 text-[11px] uppercase tracking-[0.3em] text-white transition-all hover:bg-white hover:text-[var(--color-ink)]"
            >
              Enter the Lookbook <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* Closing quote */}
      <FadeIn className="mx-auto max-w-[1000px] px-6 py-28 text-center md:px-10">
        <div className="eyebrow">A Word From The Editor</div>
        <blockquote className="mt-8 font-display text-3xl italic leading-snug text-[var(--color-ink)] md:text-5xl">
          "We dress our children the way we tell them stories —
          softly, honestly, and with a little wonder left in."
        </blockquote>
        <div className="mt-8 text-[11px] uppercase tracking-[0.3em] text-[var(--color-taupe)]">
          — Thushara Sanjeewa, Founder
        </div>
      </FadeIn>
    </PageShell>
  );
}

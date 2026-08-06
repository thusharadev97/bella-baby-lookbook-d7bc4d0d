import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-[var(--color-cream)] pt-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 pt-12 md:px-10 lg:grid-cols-12 lg:gap-20 lg:pt-20">
        <div className="lg:col-span-5">
          <div className="eyebrow">The Fall '26 Issue · Vol. 07</div>
          <h1 className="mt-7 max-w-[15ch] font-display text-[44px] leading-[1.06] tracking-[-0.02em] text-[var(--color-ink)] text-balance sm:text-[56px] lg:text-[68px] xl:text-[76px]">
            The New Era of{" "}
            <span className="italic text-[var(--color-taupe)]">Quiet Luxury</span>
          </h1>
          <p className="mt-8 max-w-[46ch] text-[17px] leading-[1.75] text-[var(--color-ink)]/65">
            Effortless style, curated for the modern wardrobe — tailored
            silhouettes, neutral outerwear, and artisanal textures, studied by our
            editors from Aspen to Sag Harbor.
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-8">
            <Link
              to="/lookbook"
              className="group inline-flex items-center gap-3 bg-[var(--color-ink)] px-7 py-4 text-[11px] uppercase tracking-[0.3em] text-[var(--color-cream)] transition-transform hover:-translate-y-0.5"
            >
              Open the Lookbook
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/trends"
              className="group relative text-[11px] uppercase tracking-[0.3em] text-[var(--color-ink)]"
            >
              Explore Trends
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-[var(--color-ink)] transition-transform duration-500 group-hover:scale-x-0" />
            </Link>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="grid grid-cols-6 gap-5">
            <div className="col-span-4 aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
                alt="Editorial cover: model in a neutral tailored coat on a minimalist studio set"
                className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
                loading="eager"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-5">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80"
                  alt="Detail study: artisanal wool and leather textures in a neutral palette"
                  className="h-full w-full object-cover transition-transform duration-[1500ms] hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between overflow-hidden bg-[var(--color-blush)]/40 p-6">
                <div className="eyebrow">Issue No. 07</div>
                <div className="mt-5 font-display text-[26px] leading-[1.15] tracking-tight text-[var(--color-ink)]">
                  Chocolate brown,<br />
                  <span className="italic text-[var(--color-taupe)]">regal violet.</span>
                </div>
                <div className="mt-7 text-[10px] uppercase tracking-[0.28em] text-[var(--color-ink)]/60">
                  50 stories inside →
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -left-6 -top-6 hidden font-display text-[220px] leading-none text-[var(--color-ink)]/[0.04] lg:block">
            '26
          </div>
        </div>
      </div>
    </section>
  );
}

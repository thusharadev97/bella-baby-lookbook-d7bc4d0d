import { Instagram, Linkedin, Facebook } from "lucide-react";
import { trending } from "@/data/posts";
import founderAsset from "@/assets/founder.jpg.asset.json";

export function Sidebar() {
  return (
    <aside className="space-y-14 lg:sticky lg:top-28 lg:self-start">
      <section className="border border-[var(--color-ink)]/10 bg-white/60 p-8">
        <div className="eyebrow">The Author</div>
        <div className="mt-6 flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[var(--color-blush)]/40">
            <img
              src={founderAsset.url}
              alt="Thushara Sanjeewa — Founder & Editor-in-Chief, Bella & Baby"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="font-display text-xl text-[var(--color-ink)]">Thushara Sanjeewa</div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
              Founder · Editor-in-Chief
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-[var(--color-ink)]/70">
          Curating a slow, considered lens on contemporary kids and baby fashion for the
          modern global family — one seasonal edit at a time.
        </p>
        <div className="mt-6 flex gap-3 text-[var(--color-ink)]/60">
          <a href="https://www.linkedin.com/in/thushara-webdev" aria-label="LinkedIn" className="rounded-full border border-[var(--color-ink)]/15 p-2 transition-all hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="https://instagram.com/iam_thushara" aria-label="Instagram" className="rounded-full border border-[var(--color-ink)]/15 p-2 transition-all hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]">
            <Instagram className="h-4 w-4" />
          </a>
          <a href="https://facebook.com/daily.lookbook" aria-label="Facebook" className="rounded-full border border-[var(--color-ink)]/15 p-2 transition-all hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]">
            <Facebook className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section>
        <div className="eyebrow">Trending Now</div>
        <ul className="mt-6 space-y-4">
          {trending.map((t, i) => (
            <li key={t} className="group flex items-baseline gap-4 border-b border-[var(--color-ink)]/8 pb-4">
              <span className="font-display text-2xl text-[var(--color-taupe)]/60 group-hover:text-[var(--color-ink)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-[var(--color-ink)]/85 transition-colors group-hover:text-[var(--color-ink)]">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border border-[var(--color-ink)]/10 bg-[var(--color-ink)] p-8 text-[var(--color-cream)]">
        <div className="eyebrow" style={{ color: "var(--color-blush)" }}>The Weekly</div>
        <div className="mt-4 font-display text-2xl leading-tight">
          Sunday edit, delivered.
        </div>
        <p className="mt-3 text-sm text-white/70">
          One considered lookbook, every Sunday morning. No noise, no spam.
        </p>
        <button className="mt-6 w-full border border-white/30 px-4 py-3 text-[11px] uppercase tracking-[0.28em] transition-colors hover:bg-white hover:text-[var(--color-ink)]">
          Subscribe
        </button>
      </section>
    </aside>
  );
}

import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Facebook } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-[var(--color-ink)]/10 bg-[var(--color-cream)]">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-20 md:grid-cols-3 md:px-10">
        <div>
          <div className="font-display text-3xl text-[var(--color-ink)]">
            Bella <span className="italic text-[var(--color-taupe)]">&amp;</span> Baby
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--color-ink)]/70">
            Elevating contemporary kids fashion globally — a curated editorial for the
            modern family with an eye for the beautifully considered.
          </p>
          <div className="mt-6 flex gap-4 text-[var(--color-ink)]/60">
            <a href="https://www.linkedin.com/in/thushara-webdev" aria-label="LinkedIn" className="transition-colors hover:text-[var(--color-ink)]">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://instagram.com/iam_thushara" aria-label="Instagram" className="transition-colors hover:text-[var(--color-ink)]">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://facebook.com/daily.lookbook" aria-label="Facebook" className="transition-colors hover:text-[var(--color-ink)]">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <div className="eyebrow">Explore</div>
          <ul className="mt-5 space-y-3 text-sm text-[var(--color-ink)]/80">
            <li><Link to="/about" className="hover:text-[var(--color-ink)]">About</Link></li>
            <li><Link to="/trends" className="hover:text-[var(--color-ink)]">Trends</Link></li>
            <li><Link to="/lookbook" className="hover:text-[var(--color-ink)]">Lookbook</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--color-ink)]">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-[var(--color-ink)]">Privacy Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:text-[var(--color-ink)]">Disclaimer</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow">Headquarters</div>
          <div className="mt-5 text-sm text-[var(--color-ink)]/80">
            <span className="block text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">Official Mail</span>
            <a href="mailto:info.bellanadbaby.com" className="hover:text-[var(--color-ink)]">
              info.bellanadbaby.com
            </a>
          </div>
          <div className="mt-4 text-sm text-[var(--color-ink)]/80">
            <span className="block text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">Domain Gateway</span>
            <a href="https://www.bellanbaby.shop" className="hover:text-[var(--color-ink)]">
              www.bellanbaby.shop
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--color-ink)]/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center px-6 py-6 text-[11px] uppercase tracking-[0.28em] text-[var(--color-taupe)] md:px-10">
          <span>Copyright © 2026 Bella &amp; Baby. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

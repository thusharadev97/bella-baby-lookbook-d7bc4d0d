import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/trends", label: "Trends" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-cream)]/85 backdrop-blur-md border-b border-[var(--color-ink)]/8"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl font-medium tracking-tight text-[var(--color-ink)] md:text-[28px]">
            Bella <span className="italic text-[var(--color-taupe)]">&amp;</span> Baby
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-[var(--color-taupe)] md:inline">
            est. 2026
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <span className="sr-only">Main navigation</span>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group relative text-[11px] font-medium uppercase tracking-[0.28em] text-[var(--color-ink)]/80 transition-colors hover:text-[var(--color-ink)]"
              activeProps={{ className: "text-[var(--color-ink)]" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[var(--color-ink)] transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
          <span className="flex items-center gap-4 border-l border-[var(--color-ink)]/15 pl-6 text-[10px] uppercase tracking-[0.22em] text-[var(--color-taupe)]">
            <Link to="/privacy" className="hover:text-[var(--color-ink)]">Privacy</Link>
            <Link to="/terms" className="hover:text-[var(--color-ink)]">Terms</Link>
            <Link to="/disclaimer" className="hover:text-[var(--color-ink)]">Disclaimer</Link>
          </span>
        </nav>

        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="md:hidden text-[var(--color-ink)]"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-[var(--color-cream)] px-6 py-6 transition-all duration-500 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl text-[var(--color-ink)]">
            Bella <span className="italic text-[var(--color-taupe)]">&amp;</span> Baby
          </span>
          <button aria-label="Close menu" onClick={() => setOpen(false)}>
            <X className="h-6 w-6 text-[var(--color-ink)]" />
          </button>
        </div>
        <nav className="mt-16 flex flex-col gap-8">
          {links.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`font-display text-5xl text-[var(--color-ink)] transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto text-[11px] uppercase tracking-[0.3em] text-[var(--color-taupe)]">
          bellanbaby.shop
        </div>
      </div>
    </header>
  );
}

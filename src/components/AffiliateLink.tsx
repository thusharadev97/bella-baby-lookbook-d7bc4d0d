import { ArrowUpRight } from "lucide-react";
import { resolveRetailer, type RegionCode } from "@/data/regions";

type Props = {
  /** Brand or product being referenced. */
  label: string;
  region?: RegionCode;
  /** Force a specific retailer from that region's map. */
  retailer?: string;
  className?: string;
};

/**
 * Region-aware outbound link. Reader-facing disclosure lives in the editorial
 * footer; rel="sponsored nofollow" keeps monetised links policy-compliant.
 */
export function AffiliateLink({ label, region = "us", retailer, className = "" }: Props) {
  const target = resolveRetailer(region, retailer);

  return (
    <a
      href={target.url}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={`inline-flex items-baseline gap-1 underline decoration-[var(--color-taupe)]/60 underline-offset-4 transition-colors hover:decoration-[var(--color-ink)] ${className}`}
    >
      {label}
      <ArrowUpRight className="h-3 w-3 self-center opacity-60" aria-hidden="true" />
      <span className="sr-only">(shop at {target.name}, affiliate link)</span>
    </a>
  );
}

export function AffiliateDisclosure() {
  return (
    <p className="mt-12 border-t border-[var(--color-ink)]/10 pt-6 text-[12px] leading-relaxed text-[var(--color-ink)]/55">
      Bella &amp; Baby may earn a commission on purchases made through retailer links in
      this piece. Editorial selections are made independently by our editors.
    </p>
  );
}

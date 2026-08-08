import { useState } from "react";
import founderAsset from "@/assets/founder.jpg.asset.json";

type Props = {
  size?: number;
  className?: string;
  eager?: boolean;
};

/**
 * Founder portrait with a monogram fallback, so the author card never
 * renders an empty frame if the image fails to load.
 */
export function FounderAvatar({ size = 64, className = "", eager = false }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-blush)]/40 ring-1 ring-[var(--color-ink)]/12 ${className}`}
      style={{ width: size, height: size }}
    >
      {failed ? (
        <span
          aria-hidden="true"
          className="font-display text-[var(--color-taupe)]"
          style={{ fontSize: size * 0.36 }}
        >
          TS
        </span>
      ) : (
        <img
          src={founderAsset.url}
          alt="Thushara Sanjeewa — Founder & Editor-in-Chief, Bella & Baby"
          width={size}
          height={size}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-center"
        />
      )}
      {failed && <span className="sr-only">Thushara Sanjeewa, Founder & Editor-in-Chief</span>}
    </span>
  );
}

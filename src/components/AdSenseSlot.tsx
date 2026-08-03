import { useEffect, useRef } from "react";

const PUBLISHER_ID = "ca-pub-2473507519700576";
/** Google Publisher Policy: never serve ads on thin / low-content screens. */
export const MIN_WORDS_FOR_ADS = 1200;

type Props = {
  /** Word count of the publisher content on the page hosting this slot. */
  wordCount: number;
  slot: string;
  /** Reserved height prevents layout shift while the ad fills. */
  height?: number;
  label?: string;
  className?: string;
};

export function AdSenseSlot({
  wordCount,
  slot,
  height = 280,
  label = "Advertisement",
  className = "",
}: Props) {
  const ref = useRef<HTMLModElement>(null);
  const eligible = wordCount >= MIN_WORDS_FOR_ADS;

  useEffect(() => {
    if (!eligible || !ref.current) return;
    if (ref.current.getAttribute("data-adsbygoogle-status")) return;
    try {
      ((window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle ||= []).push({});
    } catch {
      /* ad blocker or script not loaded — fail silently */
    }
  }, [eligible]);

  if (!eligible) return null;

  return (
    <div className={`my-14 ${className}`}>
      <div className="mb-2 text-center text-[10px] uppercase tracking-[0.28em] text-[var(--color-taupe)]">
        {label}
      </div>
      <div style={{ minHeight: height }} className="w-full overflow-hidden">
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block", minHeight: height }}
          data-ad-client={PUBLISHER_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

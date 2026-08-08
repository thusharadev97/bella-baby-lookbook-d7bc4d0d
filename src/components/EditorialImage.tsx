import { FadeIn } from "@/components/FadeIn";
import { resolveEditorialImage } from "@/data/editorialImages";

type Props = {
  /** Art-direction note from the editorial data. */
  note: string;
  /** Stable seed so the same article always renders the same photograph. */
  seed: string;
  variant?: "hero" | "body";
};

export function EditorialImage({ note, seed, variant = "body" }: Props) {
  const frame = resolveEditorialImage(note, seed, variant);
  const isHero = variant === "hero";

  return (
    <FadeIn>
      <figure className={isHero ? "my-10 -mx-6 md:mx-0" : "my-12"}>
        <div
          className={`overflow-hidden bg-[var(--color-blush)]/30 ${
            isHero ? "aspect-[16/10]" : "aspect-[3/2]"
          }`}
        >
          <img
            src={frame.src}
            srcSet={frame.srcSet}
            sizes="(min-width: 768px) 768px, 100vw"
            alt={frame.alt}
            width={isHero ? 1600 : 1200}
            height={isHero ? 1000 : 800}
            loading={isHero ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        <figcaption className="mt-3 px-6 font-display text-[13px] italic leading-relaxed text-[var(--color-ink)]/55 md:px-0">
          {frame.caption}
        </figcaption>
      </figure>
    </FadeIn>
  );
}
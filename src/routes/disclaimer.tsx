import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Bella & Baby" },
      { name: "description", content: "Editorial disclaimer covering the informational nature of Bella & Baby content, affiliate relationships, and safety notes for parents." },
      { property: "og:title", content: "Disclaimer — Bella & Baby" },
      { property: "og:description", content: "Editorial disclaimer for Bella & Baby readers." },
    ],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-40 md:px-10">
        <div className="eyebrow">Legal · Effective January 1, 2026</div>
        <h1 className="mt-6 font-display text-6xl leading-[1.02] text-[var(--color-ink)] md:text-7xl">
          Editorial <span className="italic text-[var(--color-taupe)]">Disclaimer.</span>
        </h1>
      </section>

      <section className="mx-auto max-w-[900px] space-y-10 px-6 pb-32 text-[var(--color-ink)]/80 leading-relaxed md:px-10">
        <div>
          <h2 className="font-display text-3xl text-[var(--color-ink)]">General</h2>
          <p className="mt-4">
            The content published on www.bellanbaby.shop is provided for informational
            and inspirational purposes only. While we take reasonable care in curating
            our editorial, Bella &amp; Baby makes no warranty as to the accuracy,
            completeness, or suitability of any information for a particular purpose.
          </p>
        </div>

        <div>
          <h2 className="font-display text-3xl text-[var(--color-ink)]">Not Professional Advice</h2>
          <p className="mt-4">
            Nothing on this website constitutes medical, developmental, legal, or
            financial advice for children or families. Always consult a qualified
            professional for guidance specific to your child.
          </p>
        </div>

        <div>
          <h2 className="font-display text-3xl text-[var(--color-ink)]">Affiliate &amp; Sponsored Content</h2>
          <p className="mt-4">
            From time to time, Bella &amp; Baby may include affiliate links or clearly
            disclosed sponsored features. When we do, our editorial independence
            remains intact — we only feature brands and products that meet our
            standards.
          </p>
        </div>

        <div>
          <h2 className="font-display text-3xl text-[var(--color-ink)]">Child Safety</h2>
          <p className="mt-4">
            Product images and styling references shown throughout the site are
            editorial in nature. Parents and caregivers are responsible for assessing
            the safety, sizing, and appropriateness of any garment or accessory for
            their own child.
          </p>
        </div>

        <div>
          <h2 className="font-display text-3xl text-[var(--color-ink)]">External Links</h2>
          <p className="mt-4">
            Links to third-party websites are provided as a courtesy. Bella &amp; Baby
            is not responsible for the content, privacy practices, or products offered
            by external sites.
          </p>
        </div>

        <div>
          <h2 className="font-display text-3xl text-[var(--color-ink)]">Contact</h2>
          <p className="mt-4">
            Questions about this disclaimer may be sent to <a className="underline" href="mailto:info@coreleadmedia.com">info@coreleadmedia.com</a>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}

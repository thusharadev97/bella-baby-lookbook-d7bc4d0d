import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Bella & Baby" },
      { name: "description", content: "How Bella & Baby collects, uses, and protects information from readers in the United States and abroad." },
      { property: "og:title", content: "Privacy Policy — Bella & Baby" },
      { property: "og:description", content: "How we handle reader information." },
    ],
  }),
  component: Privacy,
});

const sections = [
  { id: "overview", title: "Overview" },
  { id: "collect", title: "Information We Collect" },
  { id: "use", title: "How We Use Information" },
  { id: "cookies", title: "Cookies & Analytics" },
  { id: "third", title: "Third-Party Services" },
  { id: "children", title: "Children's Privacy (COPPA)" },
  { id: "rights", title: "Your Rights (CCPA / CPRA)" },
  { id: "contact", title: "Contact" },
];

function Privacy() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-40 md:px-10">
        <div className="eyebrow">Legal · Effective January 1, 2026</div>
        <h1 className="mt-6 font-display text-6xl leading-[1.02] text-[var(--color-ink)] md:text-7xl">
          Privacy <span className="italic text-[var(--color-taupe)]">Policy.</span>
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-16 px-6 pb-32 md:grid-cols-12 md:px-10">
        <aside className="md:col-span-3">
          <div className="sticky top-28">
            <div className="eyebrow">Sections</div>
            <ol className="mt-4 space-y-2 text-sm text-[var(--color-ink)]/75">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-[var(--color-ink)]">
                    {String(i + 1).padStart(2, "0")} · {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="md:col-span-9 space-y-12 text-[var(--color-ink)]/80 leading-relaxed">
          <div id="overview">
            <h2 className="font-display text-3xl text-[var(--color-ink)]">Overview</h2>
            <p className="mt-4">
              Bella &amp; Baby ("we", "us", "our") operates the website at
              www.bellanbaby.shop. This Privacy Policy explains how we collect, use,
              and safeguard information when you visit our editorial lookbook. It is
              written for readers in the United States and complies, in spirit, with
              the California Consumer Privacy Act (CCPA/CPRA) and the Children's
              Online Privacy Protection Act (COPPA).
            </p>
          </div>

          <div id="collect">
            <h2 className="font-display text-3xl text-[var(--color-ink)]">Information We Collect</h2>
            <p className="mt-4">We collect only what is necessary to publish our editorial and reply to your notes:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Contact form submissions (name, email, message).</li>
              <li>Newsletter opt-ins (email address only).</li>
              <li>Aggregated, anonymized analytics such as page views and device type.</li>
            </ul>
          </div>

          <div id="use">
            <h2 className="font-display text-3xl text-[var(--color-ink)]">How We Use Information</h2>
            <p className="mt-4">
              We use collected information solely to (a) respond to your inquiries,
              (b) deliver requested editorial content, and (c) improve the readability
              and performance of the site. We do not sell or rent personal information
              to third parties.
            </p>
          </div>

          <div id="cookies">
            <h2 className="font-display text-3xl text-[var(--color-ink)]">Cookies &amp; Analytics</h2>
            <p className="mt-4">
              We use a minimal set of first-party cookies to remember your session
              preferences and privacy-friendly analytics to understand which stories
              resonate with our readers. You may disable cookies in your browser
              without loss of core functionality.
            </p>
          </div>

          <div id="third">
            <h2 className="font-display text-3xl text-[var(--color-ink)]">Third-Party Services</h2>
            <p className="mt-4">
              Certain images are served through third-party content delivery networks
              (e.g., Unsplash). Outbound links to brand partners are governed by the
              privacy policies of those destinations, which we encourage you to review.
            </p>
          </div>

          <div id="children">
            <h2 className="font-display text-3xl text-[var(--color-ink)]">Children's Privacy (COPPA)</h2>
            <p className="mt-4">
              Bella &amp; Baby is a parent-facing publication. We do not knowingly
              collect personal information from children under 13. If we become aware
              that a child has provided personal data, we will promptly delete it.
            </p>
          </div>

          <div id="rights">
            <h2 className="font-display text-3xl text-[var(--color-ink)]">Your Rights (CCPA / CPRA)</h2>
            <p className="mt-4">
              California residents may request access to, correction of, or deletion
              of their personal information at any time by writing to us at
              info.bellanadbaby.com. We do not discriminate against readers who
              exercise these rights.
            </p>
          </div>

          <div id="contact">
            <h2 className="font-display text-3xl text-[var(--color-ink)]">Contact</h2>
            <p className="mt-4">
              Questions about this policy? Write to <a className="underline" href="mailto:info.bellanadbaby.com">info.bellanadbaby.com</a> or by post to
              No 96, Medirigiriya, Polonnaruwa, Sri Lanka.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

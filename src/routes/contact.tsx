import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Globe } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bella & Baby" },
      { name: "description", content: "Get in touch with the Bella & Baby editorial team. Press, partnerships, and reader notes welcome." },
      { property: "og:title", content: "Contact — Bella & Baby" },
      { property: "og:description", content: "Get in touch with the Bella & Baby editorial team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 md:px-10">
        <div className="eyebrow">Say Hello</div>
        <h1 className="mt-6 max-w-4xl font-display text-6xl leading-[1.02] text-[var(--color-ink)] md:text-8xl">
          We reply,<br /><span className="italic text-[var(--color-taupe)]">personally.</span>
        </h1>
        <p className="mt-8 max-w-xl text-[var(--color-ink)]/70">
          Press, partnerships, submissions, or simply a note about a story you loved
          — every message reaches the editor's desk.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-16 px-6 pb-32 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5 space-y-10">
          <div>
            <div className="eyebrow">Email</div>
            <div className="mt-4 flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 text-[var(--color-taupe)]" />
              <a href="mailto:info@coreleadmedia.com" className="font-display text-2xl text-[var(--color-ink)] hover:italic">
                info@coreleadmedia.com
              </a>
            </div>
          </div>
          <div>
            <div className="eyebrow">Studio</div>
            <div className="mt-4 flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 text-[var(--color-taupe)]" />
              <address className="not-italic font-display text-2xl leading-snug text-[var(--color-ink)]">
                No 96, Medirigiriya,<br />Polonnaruwa, Sri Lanka
              </address>
            </div>
          </div>
          <div>
            <div className="eyebrow">Online</div>
            <div className="mt-4 flex items-start gap-4">
              <Globe className="mt-1 h-5 w-5 text-[var(--color-taupe)]" />
              <a href="https://www.bellanbaby.shop" className="font-display text-2xl text-[var(--color-ink)] hover:italic">
                www.bellanbaby.shop
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </section>
    </PageShell>
  );
}

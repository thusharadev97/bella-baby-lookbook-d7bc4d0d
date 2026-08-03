import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Bella & Baby" },
      {
        name: "description",
        content:
          "The terms governing use of Bella & Baby: editorial licence, acceptable use, advertising disclosures, affiliate relationships, and limitation of liability.",
      },
      { property: "og:title", content: "Terms of Service — Bella & Baby" },
      { property: "og:description", content: "Terms governing your use of Bella & Baby." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

const sections: { id: string; title: string; body: string[] }[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of These Terms",
    body: [
      "By accessing www.bellanbaby.shop (the \"Site\"), you agree to these Terms of Service and to our Privacy Policy and Editorial Disclaimer, which are incorporated here by reference. If you do not agree with any part of these terms, please discontinue use of the Site.",
      "We may revise these terms from time to time to reflect changes in our editorial practices, advertising partners, or applicable law. The effective date above indicates the most recent revision, and continued use of the Site after a revision constitutes acceptance of the updated terms.",
    ],
  },
  {
    id: "editorial",
    title: "2. Editorial Content and Intellectual Property",
    body: [
      "All original articles, editorial photography direction, styling notes, illustrations, layout, and brand marks published on the Site are the intellectual property of Bella & Baby unless credited otherwise. You may read, print, and share our work for personal, non-commercial purposes, and you may quote short excerpts with clear attribution and a working link to the original article.",
      "You may not republish full articles, resell our content, train commercial models on bulk copies of our archive, or present our editorial as your own. Requests for syndication, licensing, or press use should be directed to our editorial inbox.",
    ],
  },
  {
    id: "use",
    title: "3. Acceptable Use",
    body: [
      "You agree not to interfere with the operation of the Site, attempt to gain unauthorised access to any part of it, scrape it at a volume that degrades service for other readers, or use it to distribute unlawful, harassing, or misleading material.",
      "We reserve the right to restrict access where use of the Site breaches these terms or places the publication, its readers, or its advertising partners at risk.",
    ],
  },
  {
    id: "advertising",
    title: "4. Advertising and Sponsored Placements",
    body: [
      "Bella & Baby is supported by advertising, including ads served by Google AdSense. Advertising is clearly demarcated and is never permitted to substitute for editorial content: ad units appear only alongside substantive published articles and never on utility screens, error screens, or pages without original publisher content.",
      "We do not control the specific ads served by third-party networks and do not endorse the advertisers whose creative appears on the Site. Details of the cookies used by these networks, and the opt-out choices available to you, are set out in our Privacy Policy.",
    ],
  },
  {
    id: "affiliate",
    title: "5. Affiliate Relationships",
    body: [
      "Some outbound links to brands and retailers may be affiliate links, meaning we can earn a commission if you make a purchase. Commission never determines what we cover or how we assess a product. Editorial judgement is made independently of commercial relationships, and any sponsored placement is disclosed in the article itself.",
    ],
  },
  {
    id: "informational",
    title: "6. Informational Nature of Content",
    body: [
      "Our articles cover fashion, textiles, styling, and family lifestyle subjects. They are provided for information and inspiration and are not medical, developmental, safety, financial, or legal advice. Garment safety, fit, and suitability for an individual child remain the responsibility of the parent or guardian, and manufacturer guidance should always be followed.",
    ],
  },
  {
    id: "thirdparty",
    title: "7. Third-Party Sites and Services",
    body: [
      "The Site links to third-party retailers, image providers, and reference sources. Those destinations operate under their own terms and privacy policies, and we are not responsible for their content, availability, pricing, or data practices.",
    ],
  },
  {
    id: "liability",
    title: "8. Disclaimer of Warranties and Limitation of Liability",
    body: [
      "The Site and its content are provided on an \"as is\" and \"as available\" basis, without warranties of any kind, whether express or implied, including fitness for a particular purpose. We do not warrant that the Site will be uninterrupted or error-free.",
      "To the fullest extent permitted by law, Bella & Baby and its contributors will not be liable for indirect, incidental, consequential, or punitive damages arising from your use of the Site or reliance on its content.",
    ],
  },
  {
    id: "law",
    title: "9. Governing Law",
    body: [
      "These terms are governed by the laws of the United States and, where applicable, the laws of the state in which our publishing operations are administered, without regard to conflict-of-law principles.",
    ],
  },
  {
    id: "contact",
    title: "10. Contact",
    body: [
      "Questions about these terms, licensing requests, or corrections may be sent to info.bellanadbaby.com. We aim to respond to editorial and legal correspondence within five business days.",
    ],
  },
];

function Terms() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-40 md:px-10">
        <div className="eyebrow">Legal · Effective January 1, 2026</div>
        <h1 className="mt-6 font-display text-6xl leading-[1.02] text-[var(--color-ink)] md:text-7xl">
          Terms of <span className="italic text-[var(--color-taupe)]">Service.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-ink)]/70">
          The agreement between Bella &amp; Baby and the readers, advertisers, and partners
          who use this publication.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-16 px-6 pb-32 md:grid-cols-12 md:px-10">
        <aside className="md:col-span-3">
          <div className="sticky top-28">
            <div className="eyebrow">Contents</div>
            <ul className="mt-5 space-y-3 text-sm text-[var(--color-ink)]/70">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-[var(--color-ink)]">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-12 md:col-span-9">
          {sections.map((s) => (
            <div key={s.id} id={s.id} className="scroll-mt-32">
              <h2 className="font-display text-3xl text-[var(--color-ink)]">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed text-[var(--color-ink)]/80">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

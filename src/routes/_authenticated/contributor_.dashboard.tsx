import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { MAGAZINE_CATEGORIES } from "@/data/magazine";
import {
  getMyEditorialAccess,
  listMySubmissions,
  parseBacklinks,
  saveSubmission,
  STATUS_LABEL,
  type Backlink,
  type SubmissionStatus,
} from "@/lib/submissions.functions";

export const Route = createFileRoute("/_authenticated/contributor_/dashboard")({
  head: () => ({
    meta: [
      { title: "Contributor Studio — Bella & Baby Magazine" },
      {
        name: "description",
        content: "Write, save drafts and track your article submissions to the Bella & Baby desk.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Contributor Studio — Bella & Baby Magazine" },
      { property: "og:description", content: "Write, save drafts and track your submissions." },
    ],
  }),
  component: ContributorDashboard,
});

const MARKETS = ["United States", "United Kingdom", "France", "Germany", "Pan-European", "Global"];

interface FormState {
  id: string | null;
  title: string;
  category: string;
  regionFocus: string;
  excerpt: string;
  body: string;
  coverImageUrl: string;
  keywords: string;
  backlinks: Backlink[];
}

const EMPTY: FormState = {
  id: null,
  title: "",
  category: MAGAZINE_CATEGORIES[0].slug,
  regionFocus: MARKETS[0],
  excerpt: "",
  body: "",
  coverImageUrl: "",
  keywords: "",
  backlinks: [],
};

function statusTone(status: string) {
  switch (status) {
    case "approved":
      return "bg-[var(--color-ink)] text-[var(--color-cream)]";
    case "needs_revision":
      return "bg-[var(--color-gold)]/25 text-[var(--color-ink)]";
    case "rejected":
      return "bg-[var(--color-ink)]/10 text-[var(--color-ink)]/60";
    default:
      return "border border-[var(--color-ink)]/25 text-[var(--color-ink)]/70";
  }
}

function ContributorDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchMine = useServerFn(listMySubmissions);
  const fetchAccess = useServerFn(getMyEditorialAccess);
  const save = useServerFn(saveSubmission);

  const mine = useQuery({ queryKey: ["my-submissions"], queryFn: () => fetchMine() });
  const access = useQuery({ queryKey: ["editorial-access"], queryFn: () => fetchAccess() });

  const [form, setForm] = useState<FormState>(EMPTY);
  const words = form.body.split(/\s+/).filter(Boolean).length;

  const mutation = useMutation({
    mutationFn: (intent: "draft" | "submit") =>
      save({
        data: {
          id: form.id,
          title: form.title,
          category: form.category,
          regionFocus: form.regionFocus,
          excerpt: form.excerpt,
          body: form.body,
          coverImageUrl: form.coverImageUrl,
          keywords: form.keywords,
          backlinks: form.backlinks,
          intent,
        },
      }),
    onSuccess: (res) => {
      if (res.status === "submitted") {
        toast.success("Filed with the desk", {
          description: `${res.wordCount.toLocaleString()} words received. The editors have been notified.`,
        });
        setForm(EMPTY);
      } else {
        toast.success("Draft saved", { description: "Pick it up from your list any time." });
        setForm((f) => ({ ...f, id: res.submission.id }));
      }
      void queryClient.invalidateQueries({ queryKey: ["my-submissions"] });
    },
    onError: (err) =>
      toast.error("Could not save", {
        description: err instanceof Error ? err.message : "Please review the fields and retry.",
      }),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  const submissions = mine.data?.submissions ?? [];
  const reviews = mine.data?.reviews ?? [];

  function loadForEdit(id: string) {
    const row = submissions.find((s) => s.id === id);
    if (!row) return;
    setForm({
      id: row.id,
      title: row.title,
      category: row.category,
      regionFocus: row.region_focus ?? MARKETS[0],
      excerpt: row.excerpt ?? "",
      body: row.body,
      coverImageUrl: row.cover_image_url ?? "",
      keywords: row.keywords ?? "",
      backlinks: parseBacklinks(row.backlinks),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateBacklink(index: number, patch: Partial<Backlink>) {
    setForm((f) => ({
      ...f,
      backlinks: f.backlinks.map((b, i) => (i === index ? { ...b, ...patch } : b)),
    }));
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-[1200px] px-6 pb-28 pt-36 md:px-10 md:pt-44">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--color-ink)]/15 pb-8">
          <div>
            <div className="eyebrow">Contributor studio</div>
            <h1 className="mt-4 font-display text-4xl md:text-5xl">Your desk</h1>
          </div>
          <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.24em]">
            {access.data?.isStaff && (
              <Link
                to="/admin/editorial"
                className="text-[var(--color-taupe)] hover:text-[var(--color-ink)]"
              >
                Editorial queue →
              </Link>
            )}
            <button onClick={signOut} className="text-[var(--color-taupe)] hover:text-[var(--color-ink)]">
              Sign out
            </button>
          </div>
        </header>

        <div className="mt-14 grid gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <section>
            <h2 className="font-display text-2xl">
              {form.id ? "Editing a piece" : "File a new piece"}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-ink)]/65">
              Minimum 1,800 words for publication; review starts at 400. Read the{" "}
              <Link to="/write-for-us" className="underline underline-offset-4">
                guidelines
              </Link>{" "}
              before filing.
            </p>

            <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="eyebrow">Headline</span>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-2 w-full border-b border-[var(--color-ink)]/25 bg-transparent py-2 font-display text-xl outline-none focus:border-[var(--color-ink)]"
                  placeholder="The Quiet Case for the Unlined Blazer"
                />
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow">Category</span>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="mt-2 w-full border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                  >
                    {MAGAZINE_CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="eyebrow">Market focus</span>
                  <select
                    value={form.regionFocus}
                    onChange={(e) => setForm({ ...form, regionFocus: e.target.value })}
                    className="mt-2 w-full border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                  >
                    {MARKETS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="eyebrow">Standfirst / excerpt</span>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="mt-2 w-full resize-none border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[15px] leading-relaxed outline-none focus:border-[var(--color-ink)]"
                  placeholder="One or two sentences summarising the argument."
                />
              </label>

              <label className="block">
                <span className="eyebrow">Article body (Markdown)</span>
                <textarea
                  required
                  rows={16}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  className="mt-2 w-full border border-[var(--color-ink)]/20 bg-white/60 p-4 font-mono text-[14px] leading-relaxed outline-none focus:border-[var(--color-ink)]"
                  placeholder="## Subheading&#10;&#10;Body copy in Markdown. Use ## for H2 and ### for H3."
                />
                <span
                  className={`mt-2 block text-[10px] uppercase tracking-[0.26em] ${
                    words >= 1800 ? "text-[var(--color-ink)]" : "text-[var(--color-taupe)]"
                  }`}
                >
                  {words.toLocaleString()} words {words >= 1800 ? "· publication length" : "· 1,800 target"}
                </span>
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow">Cover image URL</span>
                  <input
                    value={form.coverImageUrl}
                    onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })}
                    className="mt-2 w-full border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[14px] outline-none focus:border-[var(--color-ink)]"
                    placeholder="https://…"
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">Target keywords</span>
                  <input
                    value={form.keywords}
                    onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                    className="mt-2 w-full border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[14px] outline-none focus:border-[var(--color-ink)]"
                    placeholder="quiet luxury blazer, unlined tailoring"
                  />
                </label>
              </div>

              {/* Backlink manager */}
              <div className="border-t border-[var(--color-ink)]/15 pt-6">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Backlinks</span>
                  <button
                    type="button"
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        backlinks: [...f.backlinks, { url: "", anchorText: "", rel: "dofollow" }],
                      }))
                    }
                    className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)] hover:text-[var(--color-ink)]"
                  >
                    + Add link
                  </button>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-ink)]/60">
                  Declare every outbound link you want placed in the piece so the desk can track it.
                </p>
                {form.backlinks.length === 0 ? (
                  <p className="mt-4 text-[13px] text-[var(--color-ink)]/45">No backlinks declared.</p>
                ) : (
                  <ul className="mt-5 space-y-5">
                    {form.backlinks.map((b, i) => (
                      <li key={i} className="grid gap-3 sm:grid-cols-[1.3fr_1fr_auto_auto] sm:items-end">
                        <input
                          value={b.url}
                          onChange={(e) => updateBacklink(i, { url: e.target.value })}
                          className="border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[13px] outline-none focus:border-[var(--color-ink)]"
                          placeholder="https://target-site.com/page"
                        />
                        <input
                          value={b.anchorText}
                          onChange={(e) => updateBacklink(i, { anchorText: e.target.value })}
                          className="border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[13px] outline-none focus:border-[var(--color-ink)]"
                          placeholder="Anchor text"
                        />
                        <select
                          value={b.rel}
                          onChange={(e) =>
                            updateBacklink(i, { rel: e.target.value as Backlink["rel"] })
                          }
                          className="border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[13px] outline-none focus:border-[var(--color-ink)]"
                        >
                          <option value="dofollow">dofollow</option>
                          <option value="nofollow">nofollow</option>
                        </select>
                        <button
                          type="button"
                          onClick={() =>
                            setForm((f) => ({
                              ...f,
                              backlinks: f.backlinks.filter((_, idx) => idx !== i),
                            }))
                          }
                          className="pb-2 text-[10px] uppercase tracking-[0.22em] text-[var(--color-taupe)] hover:text-[var(--color-ink)]"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={mutation.isPending}
                  onClick={() => mutation.mutate("draft")}
                  className="border border-[var(--color-ink)]/30 py-3.5 text-[11px] uppercase tracking-[0.28em] transition hover:border-[var(--color-ink)] disabled:opacity-50"
                >
                  Save as draft
                </button>
                <button
                  type="button"
                  disabled={mutation.isPending}
                  onClick={() => mutation.mutate("submit")}
                  className="bg-[var(--color-ink)] py-3.5 text-[11px] uppercase tracking-[0.28em] text-[var(--color-cream)] transition hover:opacity-90 disabled:opacity-50"
                >
                  {mutation.isPending ? "Working…" : "Submit for editorial review"}
                </button>
              </div>
              {form.id && (
                <button
                  type="button"
                  onClick={() => setForm(EMPTY)}
                  className="w-full text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)] hover:text-[var(--color-ink)]"
                >
                  Start a new piece instead
                </button>
              )}
            </form>
          </section>

          <section>
            <h2 className="font-display text-2xl">Status tracker</h2>
            {mine.isLoading ? (
              <p className="mt-6 text-[14px] text-[var(--color-ink)]/60">Loading…</p>
            ) : mine.isError ? (
              <p className="mt-6 text-[14px] text-[var(--color-ink)]/60">
                We couldn't load your submissions. Refresh to try again.
              </p>
            ) : submissions.length === 0 ? (
              <p className="mt-6 text-[14px] leading-relaxed text-[var(--color-ink)]/60">
                Nothing filed yet. Your first piece will appear here with the editor's notes.
              </p>
            ) : (
              <ul className="mt-6 space-y-8">
                {submissions.map((s) => {
                  const notes = reviews.filter((r) => r.submission_id === s.id);
                  const links = parseBacklinks(s.backlinks);
                  const editable =
                    s.status === "draft" || s.status === "needs_revision" || s.status === "submitted";
                  return (
                    <li key={s.id} className="border-t border-[var(--color-ink)]/15 pt-5">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-lg leading-snug">{s.title}</h3>
                        <span
                          className={`shrink-0 px-3 py-1 text-[9px] uppercase tracking-[0.22em] ${statusTone(s.status)}`}
                        >
                          {STATUS_LABEL[s.status as SubmissionStatus] ?? s.status}
                        </span>
                      </div>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                        {s.category} · {s.region_focus ?? "Global"} ·{" "}
                        {(s.word_count ?? 0).toLocaleString()} words
                        {links.length > 0 ? ` · ${links.length} backlinks` : ""}
                      </div>
                      {s.admin_notes && (
                        <p className="mt-3 border-l border-[var(--color-gold)] pl-4 text-[13px] leading-relaxed text-[var(--color-ink)]/75">
                          {s.admin_notes}
                        </p>
                      )}
                      {notes.length > 0 && (
                        <div className="mt-4 space-y-3 border-l border-[var(--color-ink)]/20 pl-4">
                          {notes.map((n) => (
                            <div key={n.id}>
                              <div className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                                Editor · {STATUS_LABEL[n.decision as SubmissionStatus] ?? n.decision}
                              </div>
                              {n.message && (
                                <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-ink)]/75">
                                  {n.message}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {editable && (
                        <button
                          type="button"
                          onClick={() => loadForEdit(s.id)}
                          className="mt-4 text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)] hover:text-[var(--color-ink)]"
                        >
                          Open in editor →
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </PageShell>
  );
}

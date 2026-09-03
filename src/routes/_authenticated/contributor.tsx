import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { MAGAZINE_CATEGORIES } from "@/data/magazine";
import {
  createSubmission,
  getMyEditorialAccess,
  listMySubmissions,
  STATUS_LABEL,
  type SubmissionStatus,
} from "@/lib/submissions.functions";

export const Route = createFileRoute("/_authenticated/contributor")({
  head: () => ({
    meta: [
      { title: "Contributor Studio — Bella & Baby Magazine" },
      {
        name: "description",
        content: "File and track your article submissions to the Bella & Baby editorial desk.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Contributor Studio — Bella & Baby Magazine" },
      { property: "og:description", content: "File and track your article submissions." },
    ],
  }),
  component: ContributorStudio,
});

const MARKETS = ["United States", "United Kingdom", "France", "Germany", "Pan-European", "Global"];

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

function ContributorStudio() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchMine = useServerFn(listMySubmissions);
  const fetchAccess = useServerFn(getMyEditorialAccess);
  const submit = useServerFn(createSubmission);

  const mine = useQuery({ queryKey: ["my-submissions"], queryFn: () => fetchMine() });
  const access = useQuery({ queryKey: ["editorial-access"], queryFn: () => fetchAccess() });

  const [form, setForm] = useState({
    title: "",
    category: MAGAZINE_CATEGORIES[0].slug,
    regionFocus: MARKETS[0],
    excerpt: "",
    body: "",
    coverImageUrl: "",
    keywords: "",
  });

  const words = form.body.split(/\s+/).filter(Boolean).length;

  const mutation = useMutation({
    mutationFn: () => submit({ data: form }),
    onSuccess: (res) => {
      toast.success("Filed with the desk", {
        description: `${res.wordCount.toLocaleString()} words received. You'll see a decision here.`,
      });
      setForm({ ...form, title: "", excerpt: "", body: "", coverImageUrl: "", keywords: "" });
      void queryClient.invalidateQueries({ queryKey: ["my-submissions"] });
    },
    onError: (err) =>
      toast.error("Submission not accepted", {
        description: err instanceof Error ? err.message : "Please review the fields and retry.",
      }),
  });

  async function signOut() {
    await supabase.auth.signOut();
    queryClient.clear();
    void navigate({ to: "/" });
  }

  const submissions = mine.data?.submissions ?? [];
  const reviews = mine.data?.reviews ?? [];

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
              <Link to="/admin" className="text-[var(--color-taupe)] hover:text-[var(--color-ink)]">
                Editorial queue →
              </Link>
            )}
            <button onClick={signOut} className="text-[var(--color-taupe)] hover:text-[var(--color-ink)]">
              Sign out
            </button>
          </div>
        </header>

        <div className="mt-14 grid gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Submission form */}
          <section>
            <h2 className="font-display text-2xl">File a new piece</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[var(--color-ink)]/65">
              Minimum 1,800 words for publication; we accept drafts from 400 words for early notes.
              Review the{" "}
              <Link to="/write-for-us" className="underline underline-offset-4">
                guidelines
              </Link>{" "}
              before filing.
            </p>

            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate();
              }}
            >
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
                  <span className="eyebrow">Section</span>
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
                <span className="eyebrow">Standfirst</span>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="mt-2 w-full resize-none border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[15px] leading-relaxed outline-none focus:border-[var(--color-ink)]"
                  placeholder="One or two sentences summarising the argument."
                />
              </label>

              <label className="block">
                <span className="eyebrow">Article body</span>
                <textarea
                  required
                  rows={14}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  className="mt-2 w-full border border-[var(--color-ink)]/20 bg-white/60 p-4 text-[15px] leading-relaxed outline-none focus:border-[var(--color-ink)]"
                  placeholder="Use ## for H2 and ### for H3 subheadings."
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

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-[var(--color-ink)] py-3.5 text-[11px] uppercase tracking-[0.28em] text-[var(--color-cream)] transition hover:opacity-90 disabled:opacity-50"
              >
                {mutation.isPending ? "Filing…" : "Submit to the desk"}
              </button>
            </form>
          </section>

          {/* Submissions list */}
          <section>
            <h2 className="font-display text-2xl">Your submissions</h2>
            {mine.isLoading ? (
              <p className="mt-6 text-[14px] text-[var(--color-ink)]/60">Loading…</p>
            ) : submissions.length === 0 ? (
              <p className="mt-6 text-[14px] leading-relaxed text-[var(--color-ink)]/60">
                Nothing filed yet. Your first piece will appear here with the editor's notes.
              </p>
            ) : (
              <ul className="mt-6 space-y-8">
                {submissions.map((s) => {
                  const notes = reviews.filter((r) => r.submission_id === s.id);
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
                      </div>
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

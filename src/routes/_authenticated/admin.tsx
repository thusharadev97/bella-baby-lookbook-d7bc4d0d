import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import {
  decideSubmission,
  getMyEditorialAccess,
  listSubmissionQueue,
  STATUS_LABEL,
  type SubmissionStatus,
} from "@/lib/submissions.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Editorial Queue — Bella & Baby" },
      { name: "description", content: "Review, approve or return contributor submissions." },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Editorial Queue — Bella & Baby" },
      { property: "og:description", content: "Review contributor submissions." },
    ],
  }),
  component: AdminQueue,
});

const DECISIONS: { value: "in_review" | "needs_revision" | "approved" | "rejected"; label: string }[] = [
  { value: "in_review", label: "Mark in review" },
  { value: "needs_revision", label: "Request revision" },
  { value: "approved", label: "Approve" },
  { value: "rejected", label: "Pass" },
];

function AdminQueue() {
  const queryClient = useQueryClient();
  const fetchQueue = useServerFn(listSubmissionQueue);
  const fetchAccess = useServerFn(getMyEditorialAccess);
  const decide = useServerFn(decideSubmission);

  const access = useQuery({ queryKey: ["editorial-access"], queryFn: () => fetchAccess() });
  const queue = useQuery({
    queryKey: ["submission-queue"],
    queryFn: () => fetchQueue(),
    enabled: access.data?.isStaff === true,
  });

  const [openId, setOpenId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: (vars: { submissionId: string; decision: (typeof DECISIONS)[number]["value"] }) =>
      decide({ data: { ...vars, message: message.trim() || null } }),
    onSuccess: (res) => {
      toast.success(`Recorded: ${STATUS_LABEL[res.decision as SubmissionStatus]}`, {
        description: "The writer sees your note on their dashboard.",
      });
      setMessage("");
      void queryClient.invalidateQueries({ queryKey: ["submission-queue"] });
    },
    onError: (err) =>
      toast.error("Could not record the decision", {
        description: err instanceof Error ? err.message : "Please retry.",
      }),
  });

  if (access.isLoading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-6 pb-28 pt-44 text-[var(--color-ink)]/60">Checking access…</div>
      </PageShell>
    );
  }

  if (!access.data?.isStaff) {
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl px-6 pb-28 pt-44 text-center">
          <div className="eyebrow">Restricted</div>
          <h1 className="mt-5 font-display text-4xl">Editorial staff only</h1>
          <p className="mt-6 text-[15px] leading-relaxed text-[var(--color-ink)]/70">
            This queue is limited to editors and administrators. If you're a contributor, your
            submissions live in the studio.
          </p>
          <Link
            to="/contributor"
            className="mt-8 inline-block border border-[var(--color-ink)] px-8 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
          >
            Go to contributor studio
          </Link>
        </div>
      </PageShell>
    );
  }

  const submissions = queue.data?.submissions ?? [];
  const profiles = queue.data?.profiles ?? [];
  const reviews = queue.data?.reviews ?? [];
  const pending = submissions.filter((s) => s.status === "submitted" || s.status === "in_review");

  return (
    <PageShell>
      <div className="mx-auto max-w-[1200px] px-6 pb-28 pt-36 md:px-10 md:pt-44">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--color-ink)]/15 pb-8">
          <div>
            <div className="eyebrow">Editorial desk</div>
            <h1 className="mt-4 font-display text-4xl md:text-5xl">Submission queue</h1>
            <p className="mt-4 text-[14px] text-[var(--color-ink)]/65">
              {pending.length} awaiting a decision · {submissions.length} total
            </p>
          </div>
          <Link to="/contributor" className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-taupe)] hover:text-[var(--color-ink)]">
            My studio →
          </Link>
        </header>

        {queue.isLoading ? (
          <p className="mt-12 text-[var(--color-ink)]/60">Loading queue…</p>
        ) : submissions.length === 0 ? (
          <p className="mt-12 text-[var(--color-ink)]/60">Nothing submitted yet.</p>
        ) : (
          <ul className="mt-12 space-y-10">
            {submissions.map((s) => {
              const author = profiles.find((p) => p.id === s.author_id);
              const notes = reviews.filter((r) => r.submission_id === s.id);
              const open = openId === s.id;
              return (
                <li key={s.id} className="border-t border-[var(--color-ink)]/15 pt-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl leading-snug">{s.title}</h2>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                        {author?.display_name ?? "Unknown writer"}
                        {author?.contact_email ? ` · ${author.contact_email}` : ""} · {s.category} ·{" "}
                        {s.region_focus ?? "Global"} · {(s.word_count ?? 0).toLocaleString()} words
                      </div>
                    </div>
                    <span className="shrink-0 border border-[var(--color-ink)]/25 px-3 py-1 text-[9px] uppercase tracking-[0.22em]">
                      {STATUS_LABEL[s.status as SubmissionStatus] ?? s.status}
                    </span>
                  </div>

                  {s.excerpt && (
                    <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[var(--color-ink)]/75">
                      {s.excerpt}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setOpenId(open ? null : s.id);
                      setMessage("");
                    }}
                    className="mt-5 text-[10px] uppercase tracking-[0.26em] text-[var(--color-taupe)] hover:text-[var(--color-ink)]"
                  >
                    {open ? "Close manuscript" : "Read manuscript & decide"}
                  </button>

                  {open && (
                    <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                      <div className="max-h-[28rem] overflow-y-auto border border-[var(--color-ink)]/15 bg-white/60 p-6 text-[15px] leading-relaxed whitespace-pre-wrap">
                        {s.body}
                      </div>
                      <div>
                        <label className="block">
                          <span className="eyebrow">Note to the writer</span>
                          <textarea
                            rows={6}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-2 w-full border border-[var(--color-ink)]/20 bg-transparent p-3 text-[14px] leading-relaxed outline-none focus:border-[var(--color-ink)]"
                            placeholder="What works, what needs another pass, and the deadline."
                          />
                        </label>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {DECISIONS.map((d) => (
                            <button
                              key={d.value}
                              type="button"
                              disabled={mutation.isPending}
                              onClick={() =>
                                mutation.mutate({ submissionId: s.id, decision: d.value })
                              }
                              className={`border px-4 py-3 text-[10px] uppercase tracking-[0.24em] transition disabled:opacity-50 ${
                                d.value === "approved"
                                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)] hover:opacity-90"
                                  : "border-[var(--color-ink)]/25 hover:border-[var(--color-ink)]"
                              }`}
                            >
                              {d.label}
                            </button>
                          ))}
                        </div>
                        {s.keywords && (
                          <p className="mt-5 text-[12px] leading-relaxed text-[var(--color-ink)]/60">
                            <span className="eyebrow">Keywords</span>
                            <br />
                            {s.keywords}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {notes.length > 0 && (
                    <div className="mt-6 space-y-3 border-l border-[var(--color-ink)]/20 pl-4">
                      {notes.map((n) => (
                        <div key={n.id}>
                          <div className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                            {STATUS_LABEL[n.decision as SubmissionStatus] ?? n.decision} ·{" "}
                            {new Date(n.created_at).toLocaleDateString()}
                          </div>
                          {n.message && (
                            <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-ink)]/70">
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
      </div>
    </PageShell>
  );
}

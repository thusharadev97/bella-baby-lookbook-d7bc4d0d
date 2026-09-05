import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import {
  decideSubmission,
  getMyEditorialAccess,
  listSubmissionQueue,
  parseBacklinks,
  STATUS_LABEL,
  type SubmissionStatus,
} from "@/lib/submissions.functions";

export const Route = createFileRoute("/_authenticated/admin_/editorial")({
  head: () => ({
    meta: [
      { title: "Editorial Review Queue — Bella & Baby" },
      {
        name: "description",
        content: "Review pending contributor submissions, check backlinks and approve or pass.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Editorial Review Queue — Bella & Baby" },
      { property: "og:description", content: "Approve, revise or pass contributor submissions." },
    ],
  }),
  component: EditorialQueuePage,
});

type Decision = "in_review" | "needs_revision" | "approved" | "rejected";

const DECISIONS: { value: Decision; label: string; primary?: boolean }[] = [
  { value: "approved", label: "Approve", primary: true },
  { value: "needs_revision", label: "Request revision" },
  { value: "in_review", label: "Mark in review" },
  { value: "rejected", label: "Pass" },
];

const FILTERS: { key: "pending" | "decided" | "all"; label: string }[] = [
  { key: "pending", label: "Pending review" },
  { key: "decided", label: "Decided" },
  { key: "all", label: "Everything" },
];

function EditorialQueuePage() {
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

  const [filter, setFilter] = useState<"pending" | "decided" | "all">("pending");
  const [openId, setOpenId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const mutation = useMutation({
    mutationFn: (vars: { submissionId: string; decision: Decision }) =>
      decide({
        data: {
          submissionId: vars.submissionId,
          decision: vars.decision,
          message: notes[vars.submissionId]?.trim() || null,
        },
      }),
    onSuccess: (res, vars) => {
      toast.success(`Recorded: ${STATUS_LABEL[res.decision as SubmissionStatus]}`, {
        description: "The writer sees your note on their dashboard.",
      });
      setNotes((n) => ({ ...n, [vars.submissionId]: "" }));
      void queryClient.invalidateQueries({ queryKey: ["submission-queue"] });
    },
    onError: (err) =>
      toast.error("Could not record the decision", {
        description: err instanceof Error ? err.message : "Please retry.",
      }),
  });

  const submissions = queue.data?.submissions ?? [];
  const profiles = queue.data?.profiles ?? [];
  const reviews = queue.data?.reviews ?? [];

  const pendingCount = submissions.filter(
    (s) => s.status === "submitted" || s.status === "in_review",
  ).length;

  const visible = useMemo(() => {
    if (filter === "pending")
      return submissions.filter((s) => s.status === "submitted" || s.status === "in_review");
    if (filter === "decided")
      return submissions.filter(
        (s) => s.status === "approved" || s.status === "rejected" || s.status === "needs_revision",
      );
    return submissions;
  }, [submissions, filter]);

  if (access.isLoading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-6 pb-28 pt-44 text-[var(--color-ink)]/60">
          Checking access…
        </div>
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
            to="/contributor/dashboard"
            className="mt-8 inline-block border border-[var(--color-ink)] px-8 py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
          >
            Go to contributor studio
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-[1200px] px-6 pb-28 pt-36 md:px-10 md:pt-44">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--color-ink)]/15 pb-8">
          <div>
            <div className="eyebrow">Editorial desk</div>
            <h1 className="mt-4 font-display text-4xl md:text-5xl">Review queue</h1>
            <p className="mt-4 text-[14px] text-[var(--color-ink)]/65">
              {pendingCount} awaiting a decision · {submissions.length} total
            </p>
          </div>
          <Link
            to="/contributor/dashboard"
            className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-taupe)] hover:text-[var(--color-ink)]"
          >
            My studio →
          </Link>
        </header>

        <div className="mt-8 flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`border px-5 py-2 text-[10px] uppercase tracking-[0.24em] transition ${
                filter === f.key
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)]"
                  : "border-[var(--color-ink)]/25 hover:border-[var(--color-ink)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {queue.isLoading ? (
          <div className="mt-12 space-y-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-24 animate-pulse border-t border-[var(--color-ink)]/10 bg-[var(--color-ink)]/5" />
            ))}
          </div>
        ) : queue.isError ? (
          <p className="mt-12 text-[var(--color-ink)]/60">
            The queue could not be loaded. Refresh and try again.
          </p>
        ) : visible.length === 0 ? (
          <p className="mt-12 text-[var(--color-ink)]/60">
            {filter === "pending" ? "Nothing awaiting review." : "No submissions to show."}
          </p>
        ) : (
          <ul className="mt-12 space-y-10">
            {visible.map((s) => {
              const author = profiles.find((p) => p.id === s.author_id);
              const history = reviews.filter((r) => r.submission_id === s.id);
              const links = parseBacklinks(s.backlinks);
              const open = openId === s.id;
              return (
                <li key={s.id} className="border-t border-[var(--color-ink)]/15 pt-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl leading-snug">{s.title}</h2>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                        {s.author_name ?? author?.display_name ?? "Unknown writer"}
                        {s.author_email || author?.contact_email
                          ? ` · ${s.author_email ?? author?.contact_email}`
                          : ""}{" "}
                        · {s.category} · {s.region_focus ?? "Global"} ·{" "}
                        {(s.word_count ?? 0).toLocaleString()} words ·{" "}
                        {new Date(s.submitted_at).toLocaleDateString()}
                      </div>
                    </div>
                    <span className="shrink-0 border border-[var(--color-ink)]/25 px-3 py-1 text-[9px] uppercase tracking-[0.22em]">
                      {STATUS_LABEL[s.status] ?? s.status}
                    </span>
                  </div>

                  {s.excerpt && (
                    <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[var(--color-ink)]/75">
                      {s.excerpt}
                    </p>
                  )}

                  {links.length > 0 && (
                    <div className="mt-5 border border-[var(--color-ink)]/12 bg-white/50 p-5">
                      <div className="eyebrow">Requested backlinks ({links.length})</div>
                      <ul className="mt-3 space-y-2 text-[13px]">
                        {links.map((l, i) => (
                          <li key={`${s.id}-link-${i}`} className="flex flex-wrap items-baseline gap-2">
                            <span className="text-[var(--color-ink)]/80">{l.anchorText || "—"}</span>
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="break-all underline decoration-[var(--color-taupe)]/60 underline-offset-4"
                            >
                              {l.url}
                            </a>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-taupe)]">
                              rel: {l.rel || "nofollow"}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : s.id)}
                    className="mt-5 text-[10px] uppercase tracking-[0.26em] text-[var(--color-taupe)] hover:text-[var(--color-ink)]"
                  >
                    {open ? "Close manuscript" : "Read manuscript & decide"}
                  </button>

                  {open && (
                    <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                      <div className="max-h-[28rem] overflow-y-auto whitespace-pre-wrap border border-[var(--color-ink)]/15 bg-white/60 p-6 text-[15px] leading-relaxed">
                        {s.body}
                      </div>
                      <div>
                        <label className="block">
                          <span className="eyebrow">Note to the writer</span>
                          <textarea
                            rows={6}
                            value={notes[s.id] ?? ""}
                            onChange={(e) =>
                              setNotes((n) => ({ ...n, [s.id]: e.target.value }))
                            }
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
                                d.primary
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

                  {history.length > 0 && (
                    <div className="mt-6 space-y-3 border-l border-[var(--color-ink)]/20 pl-4">
                      {history.map((n) => (
                        <div key={n.id}>
                          <div className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
                            {STATUS_LABEL[n.decision] ?? n.decision} ·{" "}
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

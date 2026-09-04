import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const EDITORIAL_INBOX = "info@coreleadmedia.com";

export const SUBMISSION_STATUSES = [
  "draft",
  "submitted",
  "in_review",
  "needs_revision",
  "approved",
  "rejected",
] as const;

export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

export const STATUS_LABEL: Record<SubmissionStatus, string> = {
  draft: "Draft",
  submitted: "Pending review",
  in_review: "In review",
  needs_revision: "Revision needed",
  approved: "Approved",
  rejected: "Not accepted",
};

export interface Backlink {
  url: string;
  anchorText: string;
  rel: "dofollow" | "nofollow";
}

const backlinkSchema = z.object({
  url: z.string().trim().url("Backlinks need a full URL").max(500),
  anchorText: z.string().trim().min(2, "Anchor text is required").max(160),
  rel: z.enum(["dofollow", "nofollow"]),
});

const submissionInput = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().trim().min(8, "Give the piece a real headline").max(180),
  category: z.string().trim().min(2).max(60),
  regionFocus: z.string().trim().max(120).optional().nullable(),
  excerpt: z.string().trim().max(400).optional().nullable(),
  body: z.string().trim().min(1, "Add some copy before saving"),
  coverImageUrl: z
    .string()
    .trim()
    .max(600)
    .refine((v) => v === "" || /^https?:\/\//.test(v), "Cover image must be a full URL")
    .optional()
    .nullable(),
  keywords: z.string().trim().max(300).optional().nullable(),
  backlinks: z.array(backlinkSchema).max(12).default([]),
  intent: z.enum(["draft", "submit"]),
});

export type SubmissionInput = z.input<typeof submissionInput>;

function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function parseBacklinks(value: unknown): Backlink[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((raw) => {
    const parsed = backlinkSchema.safeParse(raw);
    return parsed.success ? [parsed.data] : [];
  });
}

const SELECT_MINE =
  "id, title, slug, category, region_focus, excerpt, body, cover_image_url, keywords, backlinks, admin_notes, status, word_count, submitted_at, decided_at, updated_at";

/** Contributor: create or update a submission, as a draft or filed for review. */
export const saveSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => submissionInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId, claims } = context;
    const words = wordCount(data.body);
    const status: SubmissionStatus = data.intent === "submit" ? "submitted" : "draft";

    if (data.intent === "submit" && words < 400) {
      throw new Error("Submissions need at least 400 words before review");
    }

    const email = typeof claims?.["email"] === "string" ? (claims["email"] as string) : null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, contact_email")
      .eq("id", userId)
      .maybeSingle();

    const payload = {
      author_id: userId,
      author_name: profile?.display_name ?? null,
      author_email: profile?.contact_email ?? email,
      title: data.title,
      slug: slugify(data.title),
      category: data.category,
      region_focus: data.regionFocus || null,
      excerpt: data.excerpt || null,
      body: data.body,
      cover_image_url: data.coverImageUrl || null,
      keywords: data.keywords || null,
      backlinks: data.backlinks,
      word_count: words,
      status,
      submitted_at: new Date().toISOString(),
    };

    const query = data.id
      ? supabase.from("article_submissions").update(payload).eq("id", data.id).eq("author_id", userId)
      : supabase.from("article_submissions").insert(payload);

    const { data: row, error } = await query.select(SELECT_MINE).single();
    if (error) throw new Error(error.message);

    if (status === "submitted") {
      await supabase.from("submission_notifications").insert({
        submission_id: row.id,
        recipient: EDITORIAL_INBOX,
        subject: `New submission for review: ${data.title}`,
        body: [
          `Writer: ${payload.author_name ?? "Unknown"} <${payload.author_email ?? "no email"}>`,
          `Category: ${data.category}`,
          `Words: ${words}`,
          `Backlinks: ${data.backlinks.length}`,
          "",
          "Review it in the editorial queue at /admin/editorial.",
        ].join("\n"),
      });
    }

    return { submission: row, wordCount: words, status };
  });

/** Contributor: everything I have filed, with the editor's notes. */
export const listMySubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { data: submissions, error } = await supabase
      .from("article_submissions")
      .select(SELECT_MINE)
      .eq("author_id", userId)
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);

    const { data: reviews, error: reviewError } = await supabase
      .from("submission_reviews")
      .select("id, submission_id, decision, message, created_at")
      .order("created_at", { ascending: false });
    if (reviewError) throw new Error(reviewError.message);

    return { submissions: submissions ?? [], reviews: reviews ?? [] };
  });

/** Who am I, editorially speaking? */
export const getMyEditorialAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    if (error) throw new Error(error.message);

    const roles = (data ?? []).map((r) => r.role);
    return {
      roles,
      isStaff: roles.includes("admin") || roles.includes("editor"),
      isAdmin: roles.includes("admin"),
    };
  });

type AuthedSupabase = Parameters<
  Parameters<ReturnType<typeof createServerFn>["handler"]>[0]
> extends never
  ? never
  : never;

async function assertStaff(
  supabase: { rpc: (fn: "is_editorial_staff", args: { _user_id: string }) => PromiseLike<{ data: boolean | null; error: { message: string } | null }> },
  userId: string,
) {
  const { data, error } = await supabase.rpc("is_editorial_staff", { _user_id: userId });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden — editorial staff only");
}

/** Admin: the review queue. */
export const listSubmissionQueue = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await assertStaff(supabase, userId);

    const { data: submissions, error } = await supabase
      .from("article_submissions")
      .select(
        "id, author_id, author_name, author_email, title, slug, category, region_focus, excerpt, body, cover_image_url, keywords, backlinks, admin_notes, status, word_count, submitted_at, decided_at",
      )
      .order("submitted_at", { ascending: false });
    if (error) throw new Error(error.message);

    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("id, display_name, contact_email");
    if (profileError) throw new Error(profileError.message);

    const { data: reviews, error: reviewError } = await supabase
      .from("submission_reviews")
      .select("id, submission_id, decision, message, created_at")
      .order("created_at", { ascending: false });
    if (reviewError) throw new Error(reviewError.message);

    return {
      submissions: submissions ?? [],
      profiles: profiles ?? [],
      reviews: reviews ?? [],
    };
  });

const decisionInput = z.object({
  submissionId: z.string().uuid(),
  decision: z.enum(["in_review", "needs_revision", "approved", "rejected"]),
  message: z.string().trim().max(4000).optional().nullable(),
});

/** Admin: approve, request a revision, or decline — and record the note back to the writer. */
export const decideSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => decisionInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertStaff(supabase, userId);

    const decided = data.decision !== "in_review";

    const { error: updateError } = await supabase
      .from("article_submissions")
      .update({
        status: data.decision,
        admin_notes: data.message || null,
        decided_at: decided ? new Date().toISOString() : null,
      })
      .eq("id", data.submissionId);
    if (updateError) throw new Error(updateError.message);

    const { error: reviewError } = await supabase.from("submission_reviews").insert({
      submission_id: data.submissionId,
      reviewer_id: userId,
      decision: data.decision,
      message: data.message || null,
    });
    if (reviewError) throw new Error(reviewError.message);

    return { ok: true, decision: data.decision };
  });

export type { AuthedSupabase };

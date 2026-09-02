import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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
  submitted: "Submitted",
  in_review: "In review",
  needs_revision: "Needs revision",
  approved: "Approved",
  rejected: "Not accepted",
};

const submissionInput = z.object({
  title: z.string().trim().min(8, "Give the piece a real headline").max(180),
  category: z.string().trim().min(2).max(60),
  regionFocus: z.string().trim().max(120).optional().nullable(),
  excerpt: z.string().trim().max(400).optional().nullable(),
  body: z.string().trim().min(400, "Submissions need at least a few hundred words"),
  coverImageUrl: z.string().trim().url("Cover image must be a full URL").optional().nullable().or(z.literal("")),
  keywords: z.string().trim().max(300).optional().nullable(),
});

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

/** Contributor: file a new submission. */
export const createSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => submissionInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const words = wordCount(data.body);

    const { data: row, error } = await supabase
      .from("article_submissions")
      .insert({
        author_id: userId,
        title: data.title,
        slug: slugify(data.title),
        category: data.category,
        region_focus: data.regionFocus || null,
        excerpt: data.excerpt || null,
        body: data.body,
        cover_image_url: data.coverImageUrl || null,
        keywords: data.keywords || null,
        word_count: words,
        status: "submitted",
      })
      .select("id, title, status, word_count, submitted_at")
      .single();

    if (error) throw new Error(error.message);
    return { submission: row, wordCount: words };
  });

/** Contributor: everything I have filed, with the editor's notes. */
export const listMySubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;

    const { data: submissions, error } = await supabase
      .from("article_submissions")
      .select("id, title, category, region_focus, status, word_count, submitted_at, decided_at")
      .eq("author_id", userId)
      .order("submitted_at", { ascending: false });
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
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (error) throw new Error(error.message);

    const roles = (data ?? []).map((r) => r.role);
    return {
      roles,
      isStaff: roles.includes("admin") || roles.includes("editor"),
      isAdmin: roles.includes("admin"),
    };
  });

async function assertStaff(supabase: typeof import("@/integrations/supabase/client")["supabase"], userId: string) {
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
        "id, author_id, title, slug, category, region_focus, excerpt, body, cover_image_url, keywords, status, word_count, submitted_at, decided_at",
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

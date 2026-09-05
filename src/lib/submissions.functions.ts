import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database, Json } from "@/integrations/supabase/types";

export type SubmissionStatus = Database["public"]["Enums"]["submission_status"];
export type SubmissionRow = Database["public"]["Tables"]["article_submissions"]["Row"];
export type ReviewRow = Database["public"]["Tables"]["submission_reviews"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export const STATUS_LABEL: Record<SubmissionStatus, string> = {
  draft: "Draft",
  submitted: "Submitted",
  in_review: "In review",
  needs_revision: "Needs revision",
  approved: "Approved",
  rejected: "Passed",
};

export interface Backlink {
  url: string;
  anchorText: string;
  rel: string;
}

const backlinkSchema = z.object({
  url: z.string().trim().max(500).default(""),
  anchorText: z.string().trim().max(200).default(""),
  rel: z.string().trim().max(60).default("nofollow"),
});

/** Normalise the jsonb `backlinks` column into a typed array for the UI. */
export function parseBacklinks(value: Json | null | undefined): Backlink[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    const parsed = backlinkSchema.safeParse(entry);
    return parsed.success ? [parsed.data] : [];
  });
}

const EDITOR_NOTIFICATION_EMAIL = "info@coreleadmedia.com";

function countWords(body: string) {
  return body.split(/\s+/).filter(Boolean).length;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

const submissionInput = z.object({
  id: z.string().uuid().nullish(),
  title: z.string().trim().min(8, "Give the piece a headline of at least 8 characters.").max(180),
  category: z.string().trim().min(1),
  regionFocus: z.string().trim().max(80).optional().default("Global"),
  excerpt: z.string().trim().max(500).optional().default(""),
  body: z.string().trim().min(1, "The manuscript is empty."),
  coverImageUrl: z.string().trim().max(600).optional().default(""),
  keywords: z.string().trim().max(400).optional().default(""),
  backlinks: z.array(backlinkSchema).max(10).optional().default([]),
  intent: z.enum(["draft", "submit"]).default("submit"),
});

/** Create or update a submission; `intent: "submit"` files it with the desk. */
export const saveSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => submissionInput.parse(data))
  .handler(async ({ data, context }) => {
    const wordCount = countWords(data.body);
    if (data.intent === "submit" && wordCount < 800) {
      throw new Error(
        `Submissions need at least 800 words — this one has ${wordCount.toLocaleString()}. Save it as a draft and keep writing.`,
      );
    }

    const { data: profile } = await context.supabase
      .from("profiles")
      .select("display_name, contact_email")
      .eq("id", context.userId)
      .maybeSingle();

    const status: SubmissionStatus = data.intent === "submit" ? "submitted" : "draft";
    const backlinks = data.backlinks.filter((b) => b.url.length > 0);

    const payload = {
      author_id: context.userId,
      author_name: profile?.display_name ?? null,
      author_email:
        profile?.contact_email ??
        (typeof context.claims.email === "string" ? context.claims.email : null),
      title: data.title,
      slug: slugify(data.title),
      category: data.category,
      region_focus: data.regionFocus,
      excerpt: data.excerpt || null,
      body: data.body,
      cover_image_url: data.coverImageUrl || null,
      keywords: data.keywords || null,
      backlinks: backlinks as unknown as Json,
      word_count: wordCount,
      status,
      submitted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const query = data.id
      ? context.supabase
          .from("article_submissions")
          .update(payload)
          .eq("id", data.id)
          .eq("author_id", context.userId)
          .select("*")
          .single()
      : context.supabase.from("article_submissions").insert(payload).select("*").single();

    const { data: submission, error } = await query;
    if (error) throw new Error(error.message);

    if (status === "submitted") {
      await context.supabase.from("submission_notifications").insert({
        submission_id: submission.id,
        recipient: EDITOR_NOTIFICATION_EMAIL,
        subject: `New submission: ${submission.title}`,
        body: `${payload.author_name ?? "A contributor"} (${payload.author_email ?? "no email"}) filed "${submission.title}" in ${submission.category} — ${wordCount} words.`,
      });
    }

    return { submission, status, wordCount };
  });

/** Legacy single-shot submit used by the older studio screen. */
export const createSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    submissionInput.omit({ id: true, backlinks: true, intent: true }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const wordCount = countWords(data.body);
    if (wordCount < 800) {
      throw new Error(
        `Submissions need at least 800 words — this one has ${wordCount.toLocaleString()}.`,
      );
    }

    const { data: submission, error } = await context.supabase
      .from("article_submissions")
      .insert({
        author_id: context.userId,
        title: data.title,
        slug: slugify(data.title),
        category: data.category,
        region_focus: data.regionFocus,
        excerpt: data.excerpt || null,
        body: data.body,
        cover_image_url: data.coverImageUrl || null,
        keywords: data.keywords || null,
        word_count: wordCount,
        status: "submitted",
      })
      .select("*")
      .single();

    if (error) throw new Error(error.message);
    return { submission, wordCount };
  });

export const listMySubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: submissions, error } = await context.supabase
      .from("article_submissions")
      .select("*")
      .eq("author_id", context.userId)
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);

    const ids = (submissions ?? []).map((s) => s.id);
    let reviews: ReviewRow[] = [];
    if (ids.length > 0) {
      const { data: rows, error: reviewError } = await context.supabase
        .from("submission_reviews")
        .select("*")
        .in("submission_id", ids)
        .order("created_at", { ascending: false });
      if (reviewError) throw new Error(reviewError.message);
      reviews = rows ?? [];
    }

    return { submissions: submissions ?? [], reviews };
  });

export const getMyEditorialAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);

    const roles = (data ?? []).map((r) => r.role);
    return {
      roles,
      isStaff: roles.includes("admin") || roles.includes("editor"),
      isAdmin: roles.includes("admin"),
    };
  });

export const listSubmissionQueue = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: submissions, error } = await context.supabase
      .from("article_submissions")
      .select("*")
      .neq("status", "draft")
      .order("submitted_at", { ascending: false });
    if (error) throw new Error(error.message);

    const rows = submissions ?? [];
    const authorIds = [...new Set(rows.map((s) => s.author_id))];

    let profiles: ProfileRow[] = [];
    let reviews: ReviewRow[] = [];

    if (authorIds.length > 0) {
      const { data: profileRows } = await context.supabase
        .from("profiles")
        .select("*")
        .in("id", authorIds);
      profiles = profileRows ?? [];
    }

    if (rows.length > 0) {
      const { data: reviewRows } = await context.supabase
        .from("submission_reviews")
        .select("*")
        .in(
          "submission_id",
          rows.map((s) => s.id),
        )
        .order("created_at", { ascending: false });
      reviews = reviewRows ?? [];
    }

    return { submissions: rows, profiles, reviews };
  });

const decisionInput = z.object({
  submissionId: z.string().uuid(),
  decision: z.enum(["in_review", "needs_revision", "approved", "rejected"]),
  message: z.string().trim().max(4000).nullish(),
});

export const decideSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => decisionInput.parse(data))
  .handler(async ({ data, context }) => {
    const { data: isStaff, error: roleError } = await context.supabase.rpc("is_editorial_staff", {
      _user_id: context.userId,
    });
    if (roleError) throw new Error(roleError.message);
    if (!isStaff) throw new Error("Editorial staff only.");

    const { error: updateError } = await context.supabase
      .from("article_submissions")
      .update({
        status: data.decision,
        admin_notes: data.message ?? null,
        decided_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.submissionId);
    if (updateError) throw new Error(updateError.message);

    const { error: reviewError } = await context.supabase.from("submission_reviews").insert({
      submission_id: data.submissionId,
      reviewer_id: context.userId,
      decision: data.decision,
      message: data.message ?? null,
    });
    if (reviewError) throw new Error(reviewError.message);

    return { decision: data.decision };
  });

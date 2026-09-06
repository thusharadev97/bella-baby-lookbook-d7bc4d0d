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
  submitted: "Pending review",
  in_review: "In review",
  needs_revision: "Revision needed",
  approved: "Approved",
  rejected: "Passed",
};

export const EDITORIAL_NOTIFICATION_EMAIL = "info@coreleadmedia.com";

export type Backlink = {
  url: string;
  anchorText: string;
  rel: "dofollow" | "nofollow";
};

const backlinkSchema = z.object({
  url: z.string().url(),
  anchorText: z.string().min(1).max(120),
  rel: z.enum(["dofollow", "nofollow"]).default("nofollow"),
});

/** Safely read the jsonb `backlinks` column into typed objects. */
export function parseBacklinks(value: Json | null | undefined): Backlink[] {
  if (!Array.isArray(value)) return [];
  const out: Backlink[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const rec = item as Record<string, unknown>;
    const url = typeof rec["url"] === "string" ? rec["url"] : "";
    if (!url) continue;
    out.push({
      url,
      anchorText: typeof rec["anchorText"] === "string" ? rec["anchorText"] : "",
      rel: rec["rel"] === "dofollow" ? "dofollow" : "nofollow",
    });
  }
  return out;
}

const saveSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  title: z.string().min(6).max(200),
  category: z.string().min(2).max(80),
  regionFocus: z.string().min(2).max(80).optional(),
  excerpt: z.string().max(600).optional(),
  body: z.string().min(1),
  coverImageUrl: z.string().url().or(z.literal("")).optional(),
  keywords: z.string().max(600).optional(),
  backlinks: z.array(backlinkSchema).max(10).default([]),
  intent: z.enum(["draft", "submit"]),
});

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const saveSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => saveSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId, claims } = context;
    const wordCount = data.body.split(/\s+/).filter(Boolean).length;

    if (data.intent === "submit" && wordCount < 800) {
      throw new Error(
        `Submissions need at least 800 words — this draft has ${wordCount.toLocaleString()}.`,
      );
    }

    const email = (claims as { email?: string } | null)?.email ?? null;
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name, contact_email")
      .eq("id", userId)
      .maybeSingle();

    const status: SubmissionStatus = data.intent === "submit" ? "submitted" : "draft";
    const payload = {
      author_id: userId,
      author_name: profile?.display_name ?? null,
      author_email: profile?.contact_email ?? email,
      title: data.title,
      slug: slugify(data.title),
      category: data.category,
      region_focus: data.regionFocus ?? null,
      excerpt: data.excerpt ?? null,
      body: data.body,
      cover_image_url: data.coverImageUrl ? data.coverImageUrl : null,
      keywords: data.keywords ?? null,
      backlinks: data.backlinks as unknown as Json,
      word_count: wordCount,
      status,
      updated_at: new Date().toISOString(),
    };

    let submission: SubmissionRow;
    if (data.id) {
      const { data: row, error } = await supabase
        .from("article_submissions")
        .update(payload)
        .eq("id", data.id)
        .eq("author_id", userId)
        .select("*")
        .single();
      if (error) throw new Error(error.message);
      submission = row;
    } else {
      const { data: row, error } = await supabase
        .from("article_submissions")
        .insert(payload)
        .select("*")
        .single();
      if (error) throw new Error(error.message);
      submission = row;
    }

    if (status === "submitted") {
      await supabase.from("submission_notifications").insert({
        submission_id: submission.id,
        recipient: EDITORIAL_NOTIFICATION_EMAIL,
        subject: `New submission for review: ${submission.title}`,
        body: [
          `Writer: ${submission.author_name ?? "Unknown"} (${submission.author_email ?? "no email"})`,
          `Category: ${submission.category}`,
          `Words: ${wordCount}`,
          `Backlinks: ${data.backlinks.length}`,
        ].join("\n"),
      });
    }

    return { submission, status, wordCount };
  });

/** Legacy single-shot submit kept for older screens. */
export const createSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    saveSchema.omit({ intent: true, id: true, backlinks: true }).parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const wordCount = data.body.split(/\s+/).filter(Boolean).length;
    const { data: row, error } = await supabase
      .from("article_submissions")
      .insert({
        author_id: userId,
        title: data.title,
        slug: slugify(data.title),
        category: data.category,
        region_focus: data.regionFocus ?? null,
        excerpt: data.excerpt ?? null,
        body: data.body,
        cover_image_url: data.coverImageUrl ? data.coverImageUrl : null,
        keywords: data.keywords ?? null,
        word_count: wordCount,
        status: "submitted" as SubmissionStatus,
      })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return { submission: row, wordCount };
  });

export const listMySubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: submissions, error } = await supabase
      .from("article_submissions")
      .select("*")
      .eq("author_id", userId)
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);

    const ids = (submissions ?? []).map((s) => s.id);
    let reviews: ReviewRow[] = [];
    if (ids.length > 0) {
      const { data: rows, error: reviewError } = await supabase
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
    const { supabase, userId } = context;
    const { data: roles, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    const list = (roles ?? []).map((r) => r.role as string);
    return {
      userId,
      roles: list,
      isStaff: list.includes("admin") || list.includes("moderator"),
    };
  });

export const listSubmissionQueue = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase } = context;
    const { data: submissions, error } = await supabase
      .from("article_submissions")
      .select("*")
      .neq("status", "draft")
      .order("submitted_at", { ascending: false });
    if (error) throw new Error(error.message);

    const rows = submissions ?? [];
    const authorIds = Array.from(new Set(rows.map((s) => s.author_id)));
    const ids = rows.map((s) => s.id);

    let profiles: ProfileRow[] = [];
    if (authorIds.length > 0) {
      const { data: p } = await supabase.from("profiles").select("*").in("id", authorIds);
      profiles = p ?? [];
    }

    let reviews: ReviewRow[] = [];
    if (ids.length > 0) {
      const { data: r } = await supabase
        .from("submission_reviews")
        .select("*")
        .in("submission_id", ids)
        .order("created_at", { ascending: false });
      reviews = r ?? [];
    }

    return { submissions: rows, profiles, reviews };
  });

export const decideSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        submissionId: z.string().uuid(),
        decision: z.enum(["in_review", "needs_revision", "approved", "rejected"]),
        message: z.string().max(2000).nullable().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const decision = data.decision as SubmissionStatus;

    const { error: updateError } = await supabase
      .from("article_submissions")
      .update({
        status: decision,
        admin_notes: data.message ?? null,
        decided_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.submissionId);
    if (updateError) throw new Error(updateError.message);

    const { error: reviewError } = await supabase.from("submission_reviews").insert({
      submission_id: data.submissionId,
      reviewer_id: userId,
      decision,
      message: data.message ?? null,
    });
    if (reviewError) throw new Error(reviewError.message);

    return { submissionId: data.submissionId, decision };
  });

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database, Json } from "@/integrations/supabase/types";

export type SubmissionStatus = Database["public"]["Enums"]["submission_status"];
export type SubmissionRow = Database["public"]["Tables"]["article_submissions"]["Row"];
export type ReviewRow = Database["public"]["Tables"]["submission_reviews"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export const submitArticle = createServerFn({ method: "POST" })
  .validator((data: { title: string; category: string; content: string; authorName?: string }) => data)
  .handler(async ({ data }) => {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: result, error } = await supabase
      .from("submissions")
      .insert([data]);

    if (error) throw new Error(error.message);
    return { success: true, result };
  });

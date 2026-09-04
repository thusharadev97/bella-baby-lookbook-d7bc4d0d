import { supabase } from "@/integrations/supabase/client";

export interface SubmissionPayload {
  id?: string;
  title: string;
  content: string;
  excerpt?: string;
  backlinks?: string[];
  [key: string]: any;
}

export const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  pending: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
};

export function parseBacklinks(input: string | string[]): string[] {
  if (Array.isArray(input)) return input;
  if (!input) return [];
  return input.split("\n").map((url) => url.trim()).filter(Boolean);
}

export async function getMyEditorialAccess() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return { userId: user.id, email: user.email };
}

export async function listMySubmissions() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("author_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching submissions:", error);
    return [];
  }
  return data || [];
}

export async function createSubmission(payload: SubmissionPayload) {
  return saveSubmission(payload);
}

export async function saveSubmission(payload: SubmissionPayload) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const submissionData = {
    title: payload.title,
    content: payload.content,
    excerpt: payload.excerpt || "",
    author_id: user.id,
    status: "pending",
  };

  if (payload.id) {
    const { data, error } = await supabase
      .from("submissions")
      .update(submissionData)
      .eq("id", payload.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from("submissions")
      .insert([submissionData])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

export async function listSubmissionQueue() {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching queue:", error);
    return [];
  }
  return data || [];
}

export async function decideSubmission(id: string, status: "approved" | "rejected") {
  const { data, error } = await supabase
    .from("submissions")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

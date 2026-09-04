import { supabase } from "@/integrations/supabase/client";

export const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  pending: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
};

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

export async function createSubmission(payload: { title: string; content: string; excerpt?: string }) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("submissions")
    .insert([
      {
        title: payload.title,
        content: payload.content,
        excerpt: payload.excerpt || "",
        author_id: user.id,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

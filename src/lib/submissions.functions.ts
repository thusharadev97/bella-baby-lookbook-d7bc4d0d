import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

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

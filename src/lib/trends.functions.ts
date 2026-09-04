import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const schema = z.object({ country: z.string().trim().min(2).max(4).toUpperCase() });

export const getTrendingKeywords = createServerFn({ method: "GET" })
  .validator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { data: rows, error } = await supabase
      .from("trending_keywords")
      .select("keyword, search_intent, aesthetic_tag, color_palette, silhouette, last_updated")
      .eq("country", data.country)
      .order("keyword", { ascending: true });

    if (error) {
      console.error("trending_keywords read failed", error.code, error.message);
      return { keywords: [], error: "Trend data is briefly unavailable." as const };
    }

    return { keywords: rows ?? [], error: null };
  });

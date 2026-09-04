import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const schema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(255),
  source: z.string().trim().max(120).optional(),
});

export const subscribeToNewsletter = createServerFn({ method: "POST" })
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

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: data.email, source: data.source ?? null });

    // 23505 = unique violation: already subscribed, which is a success for the reader.
    if (error && error.code !== "23505") {
      console.error("newsletter subscribe failed", error.code, error.message);
      return { ok: false as const, message: "We couldn't save that just now. Please try again." };
    }

    return {
      ok: true as const,
      message: error?.code === "23505" ? "You're already on the list." : "You're on the list.",
    };
  });
import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageShell } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

const TITLE = "Contributor Sign In — Bella & Baby Magazine";
const DESCRIPTION =
  "Sign in or create a contributor account to pitch and submit fashion features to the Bella & Baby editorial desk.";

function safePath(value: unknown): string {
  const raw = typeof value === "string" ? value : "";
  return raw.startsWith("/") && !raw.startsWith("//") ? raw : "/contributor";
}

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: safePath(search["redirect"]),
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/auth" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) void navigate({ to: redirect });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) void navigate({ to: redirect });
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate, redirect]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${redirect}`,
            data: { display_name: displayName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Account created", {
          description: "Check your inbox to confirm your email, then sign in.",
        });
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      }
    } catch (err) {
      toast.error("That didn't work", {
        description: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    try {
      await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
    } catch (err) {
      toast.error("Google sign-in failed", {
        description: err instanceof Error ? err.message : "Please try again.",
      });
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-md px-6 pb-28 pt-36 md:pt-44">
        <div className="text-center">
          <div className="eyebrow">Contributor access</div>
          <h1 className="mt-5 font-display text-4xl">
            {mode === "signin" ? "Sign in" : "Create an account"}
          </h1>
          <p className="mt-4 text-[14px] leading-relaxed text-[var(--color-ink)]/65">
            For writers and stylists filing to the Bella &amp; Baby desk.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={busy}
          className="mt-10 w-full border border-[var(--color-ink)] py-3 text-[11px] uppercase tracking-[0.28em] transition hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)] disabled:opacity-50"
        >
          Continue with Google
        </button>

        <div className="my-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-[var(--color-taupe)]">
          <span className="h-px flex-1 bg-[var(--color-ink)]/15" />
          or
          <span className="h-px flex-1 bg-[var(--color-ink)]/15" />
        </div>

        <form onSubmit={handleEmail} className="space-y-5">
          {mode === "signup" && (
            <label className="block">
              <span className="eyebrow">Byline name</span>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-2 w-full border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </label>
          )}
          <label className="block">
            <span className="eyebrow">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="eyebrow">Password</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border-b border-[var(--color-ink)]/25 bg-transparent py-2 text-[15px] outline-none focus:border-[var(--color-ink)]"
              placeholder="At least 8 characters"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-[var(--color-ink)] py-3 text-[11px] uppercase tracking-[0.28em] text-[var(--color-cream)] transition hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-8 w-full text-[11px] uppercase tracking-[0.24em] text-[var(--color-taupe)] hover:text-[var(--color-ink)]"
        >
          {mode === "signin" ? "No account? Register as a contributor" : "Already registered? Sign in"}
        </button>
      </div>
    </PageShell>
  );
}

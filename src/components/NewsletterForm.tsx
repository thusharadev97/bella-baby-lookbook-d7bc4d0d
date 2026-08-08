import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/lib/newsletter.functions";

type Props = {
  /** Where the signup happened, for reporting. */
  source: string;
  /** "dark" sits on the ink panel; "light" sits on cream. */
  tone?: "dark" | "light";
};

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function NewsletterForm({ source, tone = "dark" }: Props) {
  const subscribe = useServerFn(subscribeToNewsletter);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const dark = tone === "dark";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();

    if (!EMAIL.test(value) || value.length > 255) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setStatus("loading");

    try {
      const result = await subscribe({ data: { email: value, source } });
      if (result.ok) {
        setStatus("done");
        toast.success(result.message, {
          description: "One considered lookbook, every Sunday morning.",
        });
      } else {
        setStatus("idle");
        setError(result.message);
        toast.error(result.message);
      }
    } catch {
      setStatus("idle");
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div
        className={`mt-6 flex items-center gap-3 border px-4 py-3.5 text-[11px] uppercase tracking-[0.24em] ${
          dark ? "border-white/30 text-white/85" : "border-[var(--color-ink)]/20 text-[var(--color-ink)]/80"
        }`}
        role="status"
      >
        <Check className="h-4 w-4 shrink-0" />
        You&apos;re on the list
      </div>
    );
  }

  const inputClasses = dark
    ? "border-white/30 bg-transparent text-white placeholder:text-white/45 focus:border-white"
    : "border-[var(--color-ink)]/25 bg-white/70 text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-ink)]";

  const buttonClasses = dark
    ? "border-white/30 text-white hover:bg-white hover:text-[var(--color-ink)]"
    : "border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3" noValidate>
      <label htmlFor={`newsletter-${source}`} className="sr-only">
        Email address
      </label>
      <input
        id={`newsletter-${source}`}
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        maxLength={255}
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError(null);
        }}
        placeholder="your@email.com"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `newsletter-${source}-error` : undefined}
        className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${inputClasses}`}
      />
      {error && (
        <p
          id={`newsletter-${source}-error`}
          className={`text-[11px] ${dark ? "text-[var(--color-blush)]" : "text-[var(--color-ink)]/70"}`}
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className={`flex w-full items-center justify-center gap-2 border px-4 py-3 text-[11px] uppercase tracking-[0.28em] transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${buttonClasses}`}
      >
        {status === "loading" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {status === "loading" ? "Subscribing" : "Subscribe"}
      </button>
    </form>
  );
}

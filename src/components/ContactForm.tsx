import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setTimeout(() => setState("done"), 900);
  };

  const field =
    "w-full border-b border-[var(--color-ink)]/20 bg-transparent py-4 text-[var(--color-ink)] placeholder:text-[var(--color-ink)]/40 focus:border-[var(--color-ink)] focus:outline-none transition-colors";

  if (state === "done") {
    return (
      <div className="animate-fade-in border border-[var(--color-ink)]/15 p-10 text-center">
        <Check className="mx-auto h-8 w-8 text-[var(--color-ink)]" />
        <div className="mt-4 font-display text-3xl text-[var(--color-ink)]">Thank you.</div>
        <p className="mt-3 text-sm text-[var(--color-ink)]/70">
          Your note has landed. We reply, personally, within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div>
        <label className="eyebrow block">Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your full name"
          className={field}
        />
      </div>
      <div>
        <label className="eyebrow block">Email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          className={field}
        />
      </div>
      <div>
        <label className="eyebrow block">Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us what brings you here..."
          className={field + " resize-none"}
        />
      </div>
      <button
        type="submit"
        disabled={state === "loading"}
        className="group inline-flex items-center gap-3 bg-[var(--color-ink)] px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-[var(--color-cream)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
      >
        {state === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending</>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}

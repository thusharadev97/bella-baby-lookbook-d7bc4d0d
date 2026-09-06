import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

interface KeywordChipsProps {
  value: string[];
  onChange: (keywords: string[]) => void;
  max?: number;
}

export function KeywordChips({ value, onChange, max = 8 }: KeywordChipsProps) {
  const [draft, setDraft] = useState("");

  const addKeyword = () => {
    const cleaned = draft.trim();
    if (!cleaned) return;
    if (value.includes(cleaned)) { setDraft(""); return; }
    if (value.length >= max) return;
    onChange([...value, cleaned]);
    setDraft("");
  };

  const removeKeyword = (kw: string) => {
    onChange(value.filter((k) => k !== kw));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword();
    } else if (e.key === "Backspace" && !draft && value.length > 0) {
      removeKeyword(value[value.length - 1]);
    }
  };

  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
        Target keywords
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-2 rounded-sm border border-[var(--color-ink)]/20 px-3 py-2 focus-within:border-[var(--color-ink)]/50">
        {value.map((kw) => (
          <span key={kw} className="flex items-center gap-1.5 rounded-full bg-[var(--color-ink)]/8 px-3 py-1 text-xs text-[var(--color-ink)]/80">
            {kw}
            <button type="button" onClick={() => removeKeyword(kw)} className="text-[var(--color-ink)]/40 transition-colors hover:text-[var(--color-ink)]" aria-label={`Remove ${kw}`}>
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {value.length < max && (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={addKeyword}
            placeholder={value.length === 0 ? "Type a keyword and press Enter…" : ""}
            className="min-w-[120px] flex-1 bg-transparent py-1 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-ink)]/35"
          />
        )}
      </div>
      <p className="mt-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-taupe)]">
        {value.length}/{max} keywords · Enter or comma to add
      </p>
    </div>
  );
}

import { useCallback, useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CoverImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
}

const BUCKET = "article-covers";
const MAX_MB = 8;

export function CoverImageUpload({ value, onChange }: CoverImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (JPG, PNG, or WebP).");
        return;
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`Image must be under ${MAX_MB}MB.`);
        return;
      }
      setUploading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${user?.id ?? "anon"}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
        onChange(publicUrlData.publicUrl);
      } catch (err) {
        console.error(err);
        setError("Upload failed. Please try again.");
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.24em] text-[var(--color-taupe)]">
        Cover image
      </label>
      {!value ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`mt-2 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed px-6 py-10 text-center transition-colors ${dragActive ? "border-[var(--color-ink)] bg-[var(--color-ink)]/5" : "border-[var(--color-ink)]/25 hover:border-[var(--color-ink)]/50"}`}
        >
          {uploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-[var(--color-ink)]/60" />
              <span className="text-sm text-[var(--color-ink)]/60">Uploading…</span>
            </>
          ) : (
            <>
              <UploadCloud className="h-5 w-5 text-[var(--color-ink)]/50" />
              <span className="text-sm text-[var(--color-ink)]/70">
                Drag an image here, or <span className="underline underline-offset-2">browse</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-taupe)]">
                JPG, PNG or WebP · up to {MAX_MB}MB
              </span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
        </div>
      ) : (
        <div className="relative mt-2 overflow-hidden rounded-sm border border-[var(--color-ink)]/10">
          <img src={value} alt="Cover preview" className="h-56 w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-cream)]/90 text-[var(--color-ink)] shadow-sm transition-colors hover:bg-[var(--color-cream)]"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}

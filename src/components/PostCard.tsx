import type { Post } from "@/data/posts";

const aspectClass: Record<Post["aspect"], string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  tall: "aspect-[3/5]",
};

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group mb-8 break-inside-avoid">
      <div className={`relative overflow-hidden bg-[var(--color-ink)]/5 ${aspectClass[post.aspect]}`}>
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-4 top-4 rounded-full bg-[var(--color-cream)]/90 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-ink)] backdrop-blur-sm">
          {post.category}
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[var(--color-taupe)]">
          <span>{post.date}</span>
          <span className="h-px w-6 bg-[var(--color-taupe)]/50" />
          <span>{post.tags[0]}</span>
        </div>
        <h3 className="mt-3 font-display text-2xl leading-tight text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-ink)]/70">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/65">
          {post.snippet}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="border border-[var(--color-ink)]/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-ink)]/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

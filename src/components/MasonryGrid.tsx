import type { Post } from "@/data/posts";
import { PostCard } from "./PostCard";

export function MasonryGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="columns-1 gap-8 sm:columns-2 lg:columns-2 xl:columns-3">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}

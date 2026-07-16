import raw from "./articles.json";
import { posts } from "./posts";

export type ArticleTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type ArticleSection = {
  h2: string;
  paragraphs: string[];
  h3?: string;
  h3Paragraphs?: string[];
  list?: string[];
  table?: ArticleTable;
};

export type Article = {
  id: number;
  dek: string;
  metaDescription: string;
  sections: ArticleSection[];
  editorsNote: string;
  closing: string;
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const articles: Article[] = raw as Article[];

const bySlug = new Map<string, { article: Article; post: (typeof posts)[number] }>();
const byPostId = new Map<number, { slug: string; article: Article }>();

for (const post of posts) {
  const article = articles.find((a) => a.id === post.id);
  if (!article) continue;
  const slug = slugify(post.title);
  bySlug.set(slug, { article, post });
  byPostId.set(post.id, { slug, article });
}

export const getArticleBySlug = (slug: string) => bySlug.get(slug);
export const getSlugForPost = (postId: number) => byPostId.get(postId)?.slug;
export const allArticleSlugs = () => Array.from(bySlug.keys());

export const readingMinutes = (a: Article) => {
  const words =
    a.sections.reduce(
      (n, s) =>
        n +
        s.paragraphs.reduce((m, p) => m + p.split(/\s+/).length, 0) +
        (s.h3Paragraphs?.reduce((m, p) => m + p.split(/\s+/).length, 0) ?? 0),
      0,
    ) + a.closing.split(/\s+/).length;
  return Math.max(4, Math.round(words / 220));
};

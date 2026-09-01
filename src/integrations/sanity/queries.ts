import { queryOptions } from "@tanstack/react-query";
import { sanityClient } from "./client";

/**
 * Field names differ between Sanity studio schemas, so every projection uses
 * `coalesce()` over the conventional aliases. Attributes that don't exist in
 * the dataset simply resolve to null instead of erroring.
 */

export type PortableBlock = {
  _type: string;
  _key?: string;
  style?: string;
  children?: { _key?: string; text?: string; marks?: string[] }[];
  [key: string]: unknown;
};

export type BlogFaq = { question: string | null; answer: string | null };

export type BlogPostSummary = {
  _id: string;
  slug: string | null;
  title: string | null;
  excerpt: string | null;
  publishedAt: string | null;
  category: string | null;
  author: string | null;
  cover: unknown;
};

export type BlogPost = BlogPostSummary & {
  body: PortableBlock[] | null;
  faqs: BlogFaq[] | null;
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string | null;
};

const POST_TYPES = `_type in ["post", "blogPost", "article", "editorial", "journal"]`;

const SUMMARY_FIELDS = `
  _id,
  "slug": slug.current,
  title,
  "excerpt": coalesce(excerpt, description, summary, subtitle, metaDescription),
  "publishedAt": coalesce(publishedAt, date, _createdAt),
  "category": coalesce(category->title, categories[0]->title, category, categories[0], tags[0]),
  "author": coalesce(author->name, author, byline),
  "cover": coalesce(mainImage, coverImage, image, heroImage, featuredImage)
`;

export const BLOG_LIST_QUERY = `*[${POST_TYPES} && defined(slug.current)]
  | order(coalesce(publishedAt, date, _createdAt) desc) [0...100] {
  ${SUMMARY_FIELDS}
}`;

export const BLOG_POST_QUERY = `*[${POST_TYPES} && slug.current == $slug][0] {
  ${SUMMARY_FIELDS},
  "body": coalesce(body, content, bodyContent, blocks),
  "faqs": coalesce(faqs, faq, faqSection)[]{
    "question": coalesce(question, q, title),
    "answer": coalesce(answer, a, text)
  },
  metaTitle,
  metaDescription,
  "keywords": coalesce(keywords, seoKeywords)
}`;

export const blogListQueryOptions = () =>
  queryOptions({
    queryKey: ["sanity", "blog", "list"],
    queryFn: () => sanityClient.fetch<BlogPostSummary[]>(BLOG_LIST_QUERY),
    staleTime: 60_000,
  });

export const blogPostQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["sanity", "blog", "post", slug],
    queryFn: () => sanityClient.fetch<BlogPost | null>(BLOG_POST_QUERY, { slug }),
    staleTime: 60_000,
  });

/** Flatten Portable Text to plain text — used for word counts and TOC labels. */
export function blockText(block: PortableBlock): string {
  return (block.children ?? []).map((c) => c.text ?? "").join("");
}

export function portableWordCount(body: PortableBlock[] | null | undefined): number {
  if (!body) return 0;
  return body
    .filter((b) => b._type === "block")
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPostDate(value: string | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { posts } from "@/data/posts";
import { getSlugForPost } from "@/data/articles";
import { ALL_EDITORIALS } from "@/data/editorialsAll";

const BASE_URL = "https://www.bellanbaby.shop";

type Entry = { path: string; changefreq?: string; priority?: string };

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const staticEntries: Entry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/trends", changefreq: "weekly", priority: "0.9" },
          { path: "/lookbook", changefreq: "weekly", priority: "0.9" },
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          { path: "/disclaimer", changefreq: "yearly", priority: "0.3" },
        ];

        const articleEntries: Entry[] = posts
          .map((p): Entry | null => {
            const slug = getSlugForPost(p.id);
            if (!slug) return null;
            return { path: `/journal/${slug}`, changefreq: "monthly", priority: "0.8" };
          })
          .filter((e): e is Entry => Boolean(e));

        const editorialEntries: Entry[] = ALL_EDITORIALS.map((e) => ({
          path: `/editorial/${e.slug}`,
          changefreq: "monthly",
          priority: "0.9",
        }));

        const entries = [...staticEntries, ...editorialEntries, ...articleEntries];
        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

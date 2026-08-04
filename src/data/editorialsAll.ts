// Single registry for every long-form editorial on the site:
// the original nine (editorials10.ts) plus the Fall 2026 authority batch
// stored as data in editorials50.json.
import batch from "./editorials50.json";
import {
  EDITORIALS,
  editorialWordCount,
  type Block,
  type Editorial,
} from "./editorials10";

const BATCH = batch as Editorial[];

export const ALL_EDITORIALS: Editorial[] = [...BATCH, ...EDITORIALS];

const KNOWN = new Set(ALL_EDITORIALS.map((e) => e.slug));
const STATIC_PATHS = new Set(["/lookbook", "/about", "/trends", "/journal", "/contact"]);

// Drop any suggested internal link that would resolve to a page we do not have.
for (const e of ALL_EDITORIALS) {
  e.internalLinks = e.internalLinks.filter((l) => {
    if (STATIC_PATHS.has(l.futureSlug)) return true;
    const m = /^\/editorial\/(.+)$/.exec(l.futureSlug);
    return Boolean(m && KNOWN.has(m[1]));
  });
  if (e.internalLinks.length === 0) {
    e.internalLinks = [
      {
        anchor: "the summer 2026 lookbook",
        futureSlug: "/lookbook",
        note: "our full styling reference",
      },
    ];
  }
}

export function getEditorialBySlug(slug: string): Editorial | undefined {
  return ALL_EDITORIALS.find((e) => e.slug === slug);
}

export function relatedEditorials(slug: string, n = 3): Editorial[] {
  const self = getEditorialBySlug(slug);
  const words = (s: string) =>
    new Set(s.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 4));
  const mine = self ? words(self.keywords + " " + self.title) : new Set<string>();
  return ALL_EDITORIALS.filter((e) => e.slug !== slug)
    .map((e) => {
      const theirs = words(e.keywords + " " + e.title);
      let score = 0;
      theirs.forEach((w) => {
        if (mine.has(w)) score++;
      });
      return { e, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.e);
}

export { editorialWordCount };
export type { Block, Editorial };
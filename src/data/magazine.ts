// Magazine hub taxonomy. Maps the four editorial pillars onto the existing
// in-code editorial library so nothing already written is orphaned, and gives
// contributor submissions a fixed vocabulary to choose from.
import { ALL_EDITORIALS, editorialWordCount } from "./editorialsAll";
import type { Editorial } from "./editorials10";

export type MagazineCategory = {
  slug: string;
  label: string;
  tagline: string;
  description: string;
  match: RegExp;
};

export const MAGAZINE_CATEGORIES: MagazineCategory[] = [
  {
    slug: "quiet-luxury",
    label: "Quiet Luxury",
    tagline: "Discretion, cut and cloth",
    description:
      "Unbranded tailoring, considered fabric and the discipline of dressing well without shouting — reported from New York, London, Paris and Milan.",
    match: /quiet luxury|tailor|cashmere|coat|trouser|blazer|minimal|neutral|wool|silk|linen/i,
  },
  {
    slug: "capsule-wardrobes",
    label: "Capsule Wardrobes",
    tagline: "Fewer pieces, better decisions",
    description:
      "Seasonal capsule frameworks, cost-per-wear maths and the twelve-piece edits that carry a wardrobe from March to September.",
    match: /capsule|wardrobe|edit|essential|staple|uniform|invest|packing|travel/i,
  },
  {
    slug: "european-street-style",
    label: "European Street Style",
    tagline: "Copenhagen to Paris, on the pavement",
    description:
      "Sustainable street dressing across the UK, France and Germany — GOTS-certified cotton, resale culture and the silhouettes moving through the European show circuit.",
    match: /street|copenhagen|paris|london|berlin|europe|sustainab|denim|sneaker|resale|vintage/i,
  },
  {
    slug: "mother-and-baby",
    label: "Mother & Baby",
    tagline: "Matching, considered",
    description:
      "Chic mother-and-baby looks, nursery palettes and the children's labels worth the outlay — sizing, fabric safety and styling that survives real life.",
    match: /baby|kid|child|toddler|nursery|mother|mom|matching|family|stroller|pram/i,
  },
];

export function categoryBySlug(slug: string): MagazineCategory | undefined {
  return MAGAZINE_CATEGORIES.find((c) => c.slug === slug);
}

export type MagazineStory = {
  slug: string;
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  datePublished: string;
  readMinutes: number;
  words: number;
  heroNote: string;
  category: MagazineCategory;
};

function classify(e: Editorial): MagazineCategory {
  const haystack = `${e.title} ${e.eyebrow} ${e.keywords} ${e.description}`;
  const hit = MAGAZINE_CATEGORIES.find((c) => c.match.test(haystack));
  return hit ?? MAGAZINE_CATEGORIES[0];
}

export const MAGAZINE_STORIES: MagazineStory[] = ALL_EDITORIALS.map((e) => ({
  slug: e.slug,
  path: `/editorial/${e.slug}`,
  title: `${e.title}${e.titleItalicTail ? ` ${e.titleItalicTail}` : ""}`.trim(),
  eyebrow: e.eyebrow,
  description: e.description,
  datePublished: e.datePublished,
  readMinutes: e.readMinutes,
  words: editorialWordCount(e),
  heroNote: e.heroImagePrompt,
  category: classify(e),
})).sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export function storiesInCategory(slug: string): MagazineStory[] {
  return MAGAZINE_STORIES.filter((s) => s.category.slug === slug);
}

export function categoryCount(slug: string): number {
  return storiesInCategory(slug).length;
}

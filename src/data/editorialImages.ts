// Curated editorial photography pool. Every ID is a verified Unsplash asset.
// Articles carry descriptive art-direction notes; we map each note to a real
// photograph deterministically so an article always renders the same imagery.

type Frame = { id: string; subject: string };

const PORTRAIT: Frame[] = [
  { id: "photo-1490481651871-ab68de25d43d", subject: "A model in a neutral tailored coat on a pared-back studio set" },
  { id: "photo-1485462537746-965f33f7f6a7", subject: "A woman in soft monochrome layers photographed in natural daylight" },
  { id: "photo-1495121605193-b116b5b9c5fe", subject: "An editorial portrait in an oversized wool overcoat" },
  { id: "photo-1509631179647-0177331693ae", subject: "A relaxed silhouette in ecru knitwear against a plaster wall" },
  { id: "photo-1487222477894-8943e31ef7b2", subject: "A street-style figure in fluid tailoring crossing a city block" },
  { id: "photo-1529139574466-a303027c1d8b", subject: "A minimalist look styled with a single leather accessory" },
  { id: "photo-1594633312681-425c7b97ccd1", subject: "A tonal outfit photographed in low afternoon light" },
  { id: "photo-1550928431-ee0ec6db30d3", subject: "A softly draped dress moving in open air" },
  { id: "photo-1581044777550-4cfa60707c03", subject: "A neutral layered look shot against a bare concrete backdrop" },
  { id: "photo-1571945153237-4929e783af4a", subject: "A quiet-luxury outfit in warm neutral tones" },
];

const STILL_LIFE: Frame[] = [
  { id: "photo-1483985988355-763728e1935b", subject: "A rail of neutral outerwear in a considered wardrobe" },
  { id: "photo-1441984904996-e0b6ba687e04", subject: "A leather handbag styled as a still life" },
  { id: "photo-1445205170230-053b83016050", subject: "Folded knitwear and accessories arranged on a pale surface" },
  { id: "photo-1469334031218-e382a71b716b", subject: "A tailored coat and boots laid out as a flat study" },
  { id: "photo-1492707892479-7bc8d5a4ee93", subject: "A detail study of textured wool and fine gold hardware" },
  { id: "photo-1515886657613-9f3515b0c78f", subject: "A pair of trousers and heeled shoes photographed overhead" },
  { id: "photo-1554568218-0f1715e72254", subject: "A leather bag and folded scarf on warm oak" },
  { id: "photo-1544022613-e87ca75a784a", subject: "A minimal accessories edit in muted tones" },
  { id: "photo-1524253482453-3fed8d2fe12b", subject: "A pared-back shoe and belt study in daylight" },
  { id: "photo-1506152983158-b4a74a01c721", subject: "Layered knitwear textures photographed close up" },
];

const SCENE: Frame[] = [
  { id: "photo-1434389677669-e08b4cac3105", subject: "A styling session in progress in a daylit studio" },
  { id: "photo-1496747611176-843222e1e57c", subject: "A city sidewalk scene in soft golden light" },
  { id: "photo-1539109136881-3be0616acf4b", subject: "An interior corner arranged in warm neutral tones" },
  { id: "photo-1533659124865-d6072dc035e1", subject: "A calm atelier interior with natural light" },
  { id: "photo-1560243563-062bfc001d68", subject: "A minimal retail space with neutral garments on display" },
  { id: "photo-1591047139829-d91aecb6caea", subject: "A quiet urban street framed for editorial context" },
  { id: "photo-1509319117193-57bab727e09d", subject: "An open, light-filled dressing space" },
  { id: "photo-1479064555552-3ef4979f8908", subject: "A textural backdrop of stone and linen" },
];

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

const NOISE =
  /\b(cinematic|editorial|photograph(?:y|ic)?|photo|shot on|shot|8k|resolution|aesthetic|style|lighting|light|depth of field|film grain|35mm|50mm|overhead|close-?up|natural|soft|vogue|harper'?s bazaar|us|magazine|influence|palette|wide|full-?length|flat lay|mirror)\b/gi;

/** Turn an art-direction note into a short, human caption. */
export function imageCaption(note: string): string {
  const first = note.split(/[.;]/)[0] ?? note;
  const cleaned = first
    .replace(NOISE, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/^[\s,–-]+|[\s,–-]+$/g, "")
    .replace(/\s+,/g, ",");
  const trimmed = cleaned.length > 130 ? cleaned.slice(0, 127).replace(/\s\S*$/, "") + "…" : cleaned;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export type EditorialFrame = {
  src: string;
  srcSet: string;
  alt: string;
  caption: string;
};

function build(frame: Frame, note: string, wide: boolean): EditorialFrame {
  const url = (w: number) =>
    `https://images.unsplash.com/${frame.id}?auto=format&fit=crop&w=${w}&q=80`;
  return {
    src: url(wide ? 1600 : 1200),
    srcSet: `${url(800)} 800w, ${url(1200)} 1200w, ${url(1600)} 1600w`,
    alt: `${frame.subject} — ${imageCaption(note)}`,
    caption: imageCaption(note),
  };
}

/**
 * Resolve a real photograph for an art-direction note.
 * `kind` picks the pool; `seed` keeps the choice stable per article + position.
 */
export function resolveEditorialImage(
  note: string,
  seed: string,
  kind: "hero" | "body" = "body",
): EditorialFrame {
  const lower = note.toLowerCase();
  const pool =
    kind === "hero"
      ? PORTRAIT
      : /flat lay|still life|detail|swatch|arrang|folded|bag|shoe|texture|fabric|leather goods/.test(lower)
        ? STILL_LIFE
        : /interior|atelier|store|boutique|room|street scene|backdrop/.test(lower)
          ? SCENE
          : PORTRAIT;
  const frame = pool[hash(seed + note) % pool.length]!;
  return build(frame, note, kind === "hero");
}
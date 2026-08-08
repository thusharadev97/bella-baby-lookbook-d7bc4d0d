// Regional intelligence derived from the Global Trending Fashion Keywords &
// Brands research report (August 2026). Drives /trends/$country and the
// region-aware affiliate routing used across editorials.

export type RegionCode = "us" | "uk" | "de" | "fr" | "it" | "es" | "nl";

export type Retailer = {
  name: string;
  /** Landing page used until a program ID is attached. */
  url: string;
};

export type Region = {
  code: RegionCode;
  /** Matches trending_keywords.country */
  country: string;
  name: string;
  locale: string;
  language: string;
  title: string;
  titleItalicTail: string;
  description: string;
  intro: string;
  aesthetics: string[];
  palette: { label: string; swatch: string }[];
  silhouettes: string[];
  localTerms: { term: string; meaning: string }[];
  retailers: Retailer[];
  editorNote: string;
};

const NAP: Retailer = { name: "Net-a-Porter", url: "https://www.net-a-porter.com" };
const FARFETCH: Retailer = { name: "Farfetch", url: "https://www.farfetch.com" };
const MYTHERESA: Retailer = { name: "Mytheresa", url: "https://www.mytheresa.com" };

export const REGIONS: Region[] = [
  {
    code: "us",
    country: "US",
    name: "United States",
    locale: "en_US",
    language: "English",
    title: "United States Trend Report:",
    titleItalicTail: "Regal Maximalism & Expensive Brown",
    description:
      "The US autumn 2026 trend report: royal purple regal maximalism, expensive-brown quiet luxury, the '90s satin slip revival, and office-siren tailoring — with the retailers our editors route to.",
    intro:
      "American search behaviour this season splits cleanly in two directions: saturated, unapologetic colour on one side and deeply tonal brown dressing on the other. Both are luxury signals. What links them is confidence in a single decision — one violet coat, one chocolate suit — rather than a busy outfit built from six competing ideas.",
    aesthetics: [
      "Regal maximalism — royal purple as the season's statement colour",
      "Expensive brown quiet luxury, worn tonally head to toe",
      "'90s satin slip revival, layered rather than worn alone",
      "Office siren crossed with coquettecore detailing",
    ],
    palette: [
      { label: "Royal purple", swatch: "#4c2a72" },
      { label: "Chocolate brown", swatch: "#4a3327" },
      { label: "Ivory", swatch: "#f2ece2" },
      { label: "Cognac", swatch: "#96603a" },
    ],
    silhouettes: ["Statement layering", "Tonal dressing", "Bias-cut slip", "Wide-leg trousers"],
    localTerms: [
      { term: "trousers / pants", meaning: "US readers search both; product copy favours 'pants'" },
      { term: "fall", meaning: "never 'autumn' in US-facing headlines" },
    ],
    retailers: [
      { name: "Revolve", url: "https://www.revolve.com" },
      { name: "Nordstrom", url: "https://www.nordstrom.com" },
      NAP,
      FARFETCH,
      { name: "Reformation", url: "https://www.thereformation.com" },
    ],
    editorNote:
      "If you buy one thing for a US autumn, make it the chocolate-brown coat. Purple is the photograph; brown is the wardrobe.",
  },
  {
    code: "uk",
    country: "UK",
    name: "United Kingdom",
    locale: "en_GB",
    language: "English (British)",
    title: "United Kingdom Trend Report:",
    titleItalicTail: "Punchy Colour, Funnel-Neck Tailoring",
    description:
      "The UK autumn 2026 trend report: cobalt, emerald and tomato brights anchored in neutrals, funnel-neck jackets, bubble hems, and the sludgy-neutral counter-trend.",
    intro:
      "The British high street has moved decisively toward punchy colour — cobalt blue, emerald green, tomato red — but the styling grammar is restrained: one loud piece, everything else quiet. Running underneath it is a sludgy-neutral counter-trend in taupe, khaki and stone for readers who would rather not be the brightest thing in the room.",
    aesthetics: [
      "Expressive tailoring — one bold colour anchored by neutrals",
      "Funnel-neck jackets, now high-street rather than designer-only",
      "Sculptural volume: bubble hems and shaped skirts",
      "Quiet 'sludgy' neutrals as the counter-trend",
    ],
    palette: [
      { label: "Cobalt blue", swatch: "#2b4ea2" },
      { label: "Emerald", swatch: "#1f5c47" },
      { label: "Tomato red", swatch: "#b8402f" },
      { label: "Taupe / stone", swatch: "#a99b8a" },
    ],
    silhouettes: ["Funnel-neck structured", "Bubble hem", "Relaxed tailoring", "Wide-leg jeans"],
    localTerms: [
      { term: "trousers", meaning: "never 'pants' in UK copy" },
      { term: "jumper", meaning: "UK term for a knit sweater" },
      { term: "autumn", meaning: "never 'fall'" },
    ],
    retailers: [
      { name: "ASOS", url: "https://www.asos.com" },
      { name: "Next", url: "https://www.next.co.uk" },
      NAP,
      FARFETCH,
      { name: "Mango UK", url: "https://shop.mango.com/gb" },
    ],
    editorNote:
      "The funnel neck is the most quietly useful shape of a British autumn — it does the job of a scarf without the bulk.",
  },
  {
    code: "de",
    country: "DE",
    name: "Germany",
    locale: "de_DE",
    language: "German",
    title: "Germany Trend Report:",
    titleItalicTail: "Nachhaltigkeit & Zeitlose Garderobe",
    description:
      "The German autumn 2026 trend report: sustainability-led buying, timeless silhouettes over micro-trends, supply-chain transparency, and the Berlin avant-garde streetwear niche.",
    intro:
      "German readers research before they buy, and they research provenance. Search interest clusters around nachhaltige Mode, zeitlose Garderobe and Kaschmirpullover kaufen — durability language rather than trend language. Berlin runs a separate, smaller and louder track: deconstructed tailoring and gender-fluid avant-garde streetwear.",
    aesthetics: [
      "Sustainable minimalism with documented supply chains",
      "Timeless, classic pieces bought to keep",
      "Business chic tailoring for office dressing",
      "Berlin avant-garde streetwear as a distinct niche",
    ],
    palette: [
      { label: "Earth brown", swatch: "#5b4636" },
      { label: "Loden green", swatch: "#4a5442" },
      { label: "Stone", swatch: "#b3ab9d" },
      { label: "Charcoal", swatch: "#33322f" },
    ],
    silhouettes: ["Timeless silhouette", "Wide-leg business trouser", "Straight coat", "Deconstructed tailoring"],
    localTerms: [
      { term: "Lieferkette", meaning: "supply chain — central to German sustainability claims" },
      { term: "weite Hose", meaning: "wide-leg trousers" },
      { term: "Kaschmir", meaning: "cashmere; ply and gauge detail matter to this reader" },
    ],
    retailers: [
      { name: "Zalando", url: "https://www.zalando.de" },
      { name: "ABOUT YOU", url: "https://www.aboutyou.de" },
      { name: "Breuninger", url: "https://www.breuninger.com" },
      MYTHERESA,
      NAP,
    ],
    editorNote:
      "Write for this reader the way you would write a spec sheet: gauge, ply, mill, Lieferkette. Vagueness reads as evasion.",
  },
  {
    code: "fr",
    country: "FR",
    name: "France",
    locale: "fr_FR",
    language: "French",
    title: "France Trend Report:",
    titleItalicTail: "Le Chic Parisien, Toujours",
    description:
      "The French autumn 2026 trend report: Parisian chic as an evergreen category, blazer-and-trouser tailoring, and timeless staples framed against the trend cycle.",
    intro:
      "France is the one market where the dominant search cluster is not a trend at all: look parisien chic outperforms every seasonal micro-trend, year after year. The interest sits in permanence — the jean brut, the robe noire, the marinière, the tailored blazer — and in the styling discipline that makes those pieces read as deliberate rather than default.",
    aesthetics: [
      "Parisian chic as an evergreen search category",
      "Blazer and trouser tailoring as the default uniform",
      "Timeless staples positioned against trend cycles",
      "Investment leather goods (maroquinerie)",
    ],
    palette: [
      { label: "Noir", swatch: "#1d1c1b" },
      { label: "Écru", swatch: "#e8e0d2" },
      { label: "Navy", swatch: "#232f45" },
      { label: "Camel", swatch: "#a8825a" },
    ],
    silhouettes: ["Tailored blazer", "Pantalon large", "Robe noire", "Straight denim"],
    localTerms: [
      { term: "pantalon large", meaning: "wide-leg trousers" },
      { term: "maroquinerie", meaning: "fine leather goods" },
      { term: "garde-robe capsule", meaning: "capsule wardrobe" },
    ],
    retailers: [
      { name: "Galeries Lafayette", url: "https://www.galerieslafayette.com" },
      NAP,
      FARFETCH,
      { name: "La Redoute", url: "https://www.laredoute.fr" },
      MYTHERESA,
    ],
    editorNote:
      "Parisian chic is a subtraction exercise. Remove one accessory from every outfit you assemble and you are most of the way there.",
  },
  {
    code: "it",
    country: "IT",
    name: "Italy",
    locale: "it_IT",
    language: "Italian",
    title: "Italy Trend Report:",
    titleItalicTail: "Eleganza Sartoriale",
    description:
      "The Italian autumn 2026 trend report: tailoring-forward luxury, heritage craftsmanship over logos, and leather goods as a core national search category.",
    intro:
      "Italian search behaviour is craft-first. Quiet luxury translates here not as beige minimalism but as eleganza sartoriale — cut, canvas, provenance. Pelletteria di lusso is a standing category rather than a seasonal one, and readers arrive already fluent in construction language.",
    aesthetics: [
      "Sartorial luxury led by cut and construction",
      "Heritage craftsmanship valued over visible logos",
      "Leather goods as an evergreen national category",
      "Palazzo trousers and long, fluid lines",
    ],
    palette: [
      { label: "Camel", swatch: "#b08a5c" },
      { label: "Tobacco", swatch: "#7a5636" },
      { label: "Cream", swatch: "#efe7da" },
      { label: "Deep olive", swatch: "#4d5133" },
    ],
    silhouettes: ["Tailored jacket", "Pantaloni palazzo", "Long coat", "Structured leather bag"],
    localTerms: [
      { term: "pelletteria", meaning: "leather goods" },
      { term: "pantaloni palazzo", meaning: "wide palazzo trousers" },
      { term: "guardaroba capsula", meaning: "capsule wardrobe" },
    ],
    retailers: [NAP, MYTHERESA, FARFETCH, { name: "LuisaViaRoma", url: "https://www.luisaviaroma.com" }],
    editorNote:
      "In Italy, the tell is the shoulder. If a jacket's shoulder is right, everything below it forgives itself.",
  },
  {
    code: "es",
    country: "ES",
    name: "Spain",
    locale: "es_ES",
    language: "Spanish",
    title: "Spain Trend Report:",
    titleItalicTail: "Transitional Layering",
    description:
      "The Spanish autumn 2026 trend report: warm-climate transitional dressing, lighter layering into autumn, satin dressing, and fast-growing resale interest.",
    intro:
      "Spanish autumn dressing runs several degrees warmer than German or British autumn dressing, and the wardrobe reflects that: lighter layers held longer, satin worn into October, outerwear treated as an evening decision rather than a daily one. Resale interest is climbing here as quickly as anywhere in Europe.",
    aesthetics: [
      "Transitional layering for a warmer autumn",
      "Satin and fluid fabrics extended into the season",
      "Wide-leg trousers as the daytime default",
      "Resale and second-hand as mainstream buying",
    ],
    palette: [
      { label: "Warm sand", swatch: "#d3bda0" },
      { label: "Terracotta", swatch: "#a85c42" },
      { label: "Ivory", swatch: "#f1eae0" },
      { label: "Espresso", swatch: "#43332a" },
    ],
    silhouettes: ["Layered lightweight", "Pantalón ancho", "Satin slip", "Wool coat"],
    localTerms: [
      { term: "pantalón ancho", meaning: "wide-leg trousers" },
      { term: "armario cápsula", meaning: "capsule wardrobe" },
      { term: "abrigo de lana", meaning: "wool coat" },
    ],
    retailers: [NAP, FARFETCH, { name: "El Corte Inglés", url: "https://www.elcorteingles.es" }, MYTHERESA],
    editorNote:
      "Buy the wool coat in Spain the way you would buy an evening jacket: for the six weeks it genuinely earns, not the six months it does not.",
  },
  {
    code: "nl",
    country: "NL",
    name: "Netherlands & Scandinavia",
    locale: "en_NL",
    language: "English / Dutch",
    title: "Netherlands & Scandi Trend Report:",
    titleItalicTail: "Function-Forward Minimalism",
    description:
      "The Netherlands and Scandinavian autumn 2026 trend report: muted neutral minimalism, function-forward luxury, and the timeless capsule wardrobe.",
    intro:
      "The Dutch and Scandinavian cluster reads as one market for styling purposes: muted neutrals, clean lines, and function treated as a luxury attribute rather than a compromise. Toteme and COS operate here as reference points people actually own, not aspirational distance.",
    aesthetics: [
      "Scandinavian minimalism in muted neutrals",
      "Function-forward luxury — weather, cycling, walking",
      "Timeless neutral capsule building",
      "Clean architectural silhouettes",
    ],
    palette: [
      { label: "Muted grey", swatch: "#9c9b96" },
      { label: "Off-white", swatch: "#eeeae3" },
      { label: "Slate blue", swatch: "#5a6875" },
      { label: "Black", swatch: "#1c1c1c" },
    ],
    silhouettes: ["Clean silhouette", "Straight trouser", "Oversized coat", "Flat leather boot"],
    localTerms: [
      { term: "tijdloos", meaning: "timeless — a buying criterion here, not a compliment" },
      { term: "capsule", meaning: "used in English across NL and Scandi search" },
    ],
    retailers: [NAP, MYTHERESA, { name: "Zalando", url: "https://www.zalando.nl" }, { name: "NA-KD", url: "https://www.na-kd.com" }],
    editorNote:
      "This is the market that tests whether a garment works in rain, on a bicycle, at 8am. It is the honest test.",
  },
];

export const REGION_CODES = REGIONS.map((r) => r.code);

export function getRegion(code: string): Region | undefined {
  return REGIONS.find((r) => r.code === code.toLowerCase());
}

/**
 * Affiliate routing: resolve the retailer for a brand in a given region.
 * Program IDs (LTK / Skimlinks / direct) attach here once available.
 */
export const AFFILIATE_PROGRAM_IDS: Record<string, string> = {
  // e.g. skimlinks: "xxxxxx", ltk: "xxxxxx"  — fill in when programs are live.
};

const GLOBAL_FALLBACK = FARFETCH;

export function resolveRetailer(region: RegionCode | undefined, preferred?: string): Retailer {
  const r = region ? getRegion(region) : undefined;
  if (!r) return GLOBAL_FALLBACK;
  if (preferred) {
    const match = r.retailers.find((x) => x.name.toLowerCase() === preferred.toLowerCase());
    if (match) return match;
  }
  return r.retailers[0] ?? GLOBAL_FALLBACK;
}

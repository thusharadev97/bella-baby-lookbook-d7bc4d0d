export type Post = {
  id: number;
  title: string;
  category: string;
  snippet: string;
  date: string;
  tags: string[];
  image: string;
  aspect: "portrait" | "square" | "landscape" | "tall";
};

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const posts: Post[] = [
  { id: 1, title: "Soft Power: The New Nursery Palette", category: "Chic Minimalist", snippet: "Whispered ivories, dune, and morning oat rewrite the modern nursery.", date: "Jul 02, 2026", tags: ["Neutrals", "Editorial"], image: img("photo-1503919545889-aef636e10ad4"), aspect: "portrait" },
  { id: 2, title: "Little Angelenos: LA Streetwear for Small People", category: "Streetwear", snippet: "Cropped tees, wide legs, and unbothered swagger from Silver Lake to Venice.", date: "Jun 28, 2026", tags: ["USA", "Streetwear"], image: img("photo-1519689680058-324335c77eba"), aspect: "landscape" },
  { id: 3, title: "Summer in Sag Harbor", category: "Global Summer", snippet: "Linen sets, straw hats, and salt-tousled hair — East Coast quiet luxury.", date: "Jun 24, 2026", tags: ["Summer", "Coastal"], image: img("photo-1519457431-44ccd64a579b"), aspect: "tall" },
  { id: 4, title: "The Heirloom Cardigan", category: "Heritage", snippet: "Hand-knits passed down and re-styled for a new generation.", date: "Jun 20, 2026", tags: ["Knitwear", "Heritage"], image: img("photo-1522771930-78848d9293e8"), aspect: "square" },
  { id: 5, title: "Playground Couture", category: "Play Editorial", snippet: "Tulle meets scraped knees. Joy, uncurated.", date: "Jun 18, 2026", tags: ["Editorial"], image: img("photo-1596435217008-a415ba7d1650"), aspect: "portrait" },
  { id: 6, title: "Denim, Reworked", category: "Streetwear", snippet: "Vintage Levis cut down for the smallest style critics in Brooklyn.", date: "Jun 14, 2026", tags: ["Denim", "USA"], image: img("photo-1503944583220-79d8926ad5e2"), aspect: "landscape" },
  { id: 7, title: "Copenhagen Kids", category: "Global Summer", snippet: "Scandinavian ease: primary color, primary joy.", date: "Jun 10, 2026", tags: ["Nordic"], image: img("photo-1519681393784-d120267933ba"), aspect: "tall" },
  { id: 8, title: "Whites Only: A Study in Cotton", category: "Chic Minimalist", snippet: "One color. Endless silhouettes. Zero compromise.", date: "Jun 06, 2026", tags: ["Neutrals"], image: img("photo-1518051870910-a46e30d9db16"), aspect: "portrait" },
  { id: 9, title: "The Tiny Trench", category: "Heritage", snippet: "British tailoring, downsized. A rainy-day rite of passage.", date: "Jun 02, 2026", tags: ["Outerwear"], image: img("photo-1544441893-675973e31985"), aspect: "square" },
  { id: 10, title: "Sun-Bleached in Malibu", category: "Global Summer", snippet: "Terry cloth, tan lines, and Pacific afternoons.", date: "May 30, 2026", tags: ["USA", "Coastal"], image: img("photo-1445633629932-0029acc44e88"), aspect: "landscape" },
  { id: 11, title: "Studio Portrait: The Ribbon Series", category: "Play Editorial", snippet: "A single ribbon, twelve moods, one afternoon.", date: "May 26, 2026", tags: ["Editorial"], image: img("photo-1503454537195-1dcabb73ffb9"), aspect: "portrait" },
  { id: 12, title: "Marché Day in Provence", category: "Global Summer", snippet: "Straw baskets, gingham, and slow mornings.", date: "May 22, 2026", tags: ["France", "Summer"], image: img("photo-1500462918059-b1a0cb512f1d"), aspect: "tall" },
  { id: 13, title: "The Anti-Pastel Manifesto", category: "Chic Minimalist", snippet: "Slate, bone, clay — a grown-up palette for small humans.", date: "May 18, 2026", tags: ["Neutrals"], image: img("photo-1476703993599-0035a21b17a9"), aspect: "square" },
  { id: 14, title: "Nolita Weekends", category: "Streetwear", snippet: "Downtown moms, downtown kids. All effortless.", date: "May 14, 2026", tags: ["USA", "NYC"], image: img("photo-1518831959646-742c3a14ebf7"), aspect: "landscape" },
  { id: 15, title: "The Tokyo Uniform", category: "Streetwear", snippet: "Harajuku spirit meets nursery-friendly proportions.", date: "May 10, 2026", tags: ["Japan"], image: img("photo-1519689680058-324335c77eba"), aspect: "portrait" },
  { id: 16, title: "First Suit", category: "Heritage", snippet: "A rite of passage, cut in soft Italian wool.", date: "May 06, 2026", tags: ["Tailoring"], image: img("photo-1552168324-d612d77725e3"), aspect: "tall" },
  { id: 17, title: "The Barefoot Portrait", category: "Play Editorial", snippet: "No shoes, no rules, no filter.", date: "May 02, 2026", tags: ["Editorial"], image: img("photo-1504196606672-aef5c9cefc92"), aspect: "square" },
  { id: 18, title: "Small Icons: Frida-Inspired", category: "Global Summer", snippet: "Bloom crowns, embroidery, and unfiltered joy — Mexico City muse.", date: "Apr 28, 2026", tags: ["Mexico"], image: img("photo-1509909756405-be0199881695"), aspect: "portrait" },
  { id: 19, title: "The Weekend Overall", category: "Streetwear", snippet: "One garment. Every playground. Zero fuss.", date: "Apr 24, 2026", tags: ["Denim"], image: img("photo-1503919545889-aef636e10ad4"), aspect: "landscape" },
  { id: 20, title: "Modernist Nursery", category: "Chic Minimalist", snippet: "Bauhaus lines and butter-soft cotton.", date: "Apr 20, 2026", tags: ["Interiors"], image: img("photo-1519710164239-da123dc03ef4"), aspect: "tall" },
  { id: 21, title: "The First Sundress", category: "Play Editorial", snippet: "Twirl-tested, mother-approved.", date: "Apr 16, 2026", tags: ["Editorial"], image: img("photo-1470217957101-da7150b9b681"), aspect: "square" },
  { id: 22, title: "Aspen in Miniature", category: "Heritage", snippet: "Shearling, cable knits, and mountain-morning light.", date: "Apr 12, 2026", tags: ["Winter", "USA"], image: img("photo-1516627145497-ae6968895b74"), aspect: "portrait" },
  { id: 23, title: "London Rain, Small Umbrellas", category: "Global Summer", snippet: "Puddle-jump chic from Notting Hill to Primrose Hill.", date: "Apr 08, 2026", tags: ["UK"], image: img("photo-1519741497674-611481863552"), aspect: "landscape" },
  { id: 24, title: "Boy Meets Blazer", category: "Heritage", snippet: "The wardrobe pillar that grows with him.", date: "Apr 04, 2026", tags: ["Tailoring"], image: img("photo-1517263904808-5dc91e3e7044"), aspect: "tall" },
  { id: 25, title: "The Ballet Flat Comeback", category: "Chic Minimalist", snippet: "Soft leather, softer footfalls.", date: "Mar 30, 2026", tags: ["Footwear"], image: img("photo-1524504388940-b1c1722653e1"), aspect: "square" },
  { id: 26, title: "Backyard Editorial", category: "Play Editorial", snippet: "Sprinklers as spotlights. A summer story.", date: "Mar 26, 2026", tags: ["USA"], image: img("photo-1596464716127-f2a82984de30"), aspect: "portrait" },
  { id: 27, title: "Marrakech Muse", category: "Global Summer", snippet: "Kaftans, tile-blue, and a slow North African sun.", date: "Mar 22, 2026", tags: ["Morocco"], image: img("photo-1489749798305-4fea3ae63d43"), aspect: "landscape" },
  { id: 28, title: "The Everyday White Tee", category: "Streetwear", snippet: "The one uniform every wardrobe should build around.", date: "Mar 18, 2026", tags: ["Basics"], image: img("photo-1503342217505-b0a15ec3261c"), aspect: "tall" },
  { id: 29, title: "Grandmother's Locket", category: "Heritage", snippet: "Small jewelry, large sentiment. Styling the sentimental.", date: "Mar 14, 2026", tags: ["Accessories"], image: img("photo-1509909756405-be0199881695"), aspect: "square" },
  { id: 30, title: "Sunday Slow: Pancakes & Pyjamas", category: "Play Editorial", snippet: "The most-worn look in every American home.", date: "Mar 10, 2026", tags: ["Loungewear"], image: img("photo-1519689680058-324335c77eba"), aspect: "portrait" },
];

export const trending = [
  "Quiet Luxury",
  "Coastal Grandkid",
  "Neo-Prep",
  "Nordic Minimal",
  "Heritage Denim",
  "Butter Yellow",
  "Balletcore Mini",
  "Sun-Bleached Neutrals",
  "Modern Nursery",
  "Vintage Americana",
];

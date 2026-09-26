import json

# Read existing articles from src/data/articles.ts
with open("src/data/articles.ts", "r") as f:
    content = f.read()

# Extract the existing articles array
start_idx = content.find("export const articles: Article[] = ") + len("export const articles: Article[] = ")
end_idx = content.rfind(";")
existing_articles = json.loads(content[start_idx:end_idx])

articles_batch3 = [
    {
        "id": "111",
        "slug": "monochrome-power-suits-2026-guide",
        "title": "Monochrome Power Suits: Redefining Professional Elegance for Women in 2026",
        "category": "Ladies Outfit Ideas",
        "date": "September 16, 2026",
        "readTime": "12 min read",
        "author": "Thushara Sanjeewa",
        "excerpt": "A deep dive into double-breasted silhouettes, relaxed tailoring, and monochrome power moves for executive women.",
        "image": "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1800&q=80",
        "content": """
### The Modern Executive Aesthetic in 2026

The power suit has undergone a massive transformation. In 2026, professional women are moving away from restrictive, stiff tailoring in favor of fluid, sharp monochrome suits that offer both authority and physical ease.

A well-tailored power suit in a single color tone creates an immediate statement of poise, executive clarity, and modern style.

---

### Section 1: Key Design Innovations in 2026 Power Suiting

1. **Unstructured Shoulders with Defined Chest Architecture:** Modern blazers maintain visual structure while dropping rigid internal shoulder padding.
2. **Floor-Sweeping Pleated Trousers:** High-waisted trousers that taper slightly over leather pumps create extended height lines.
3. **Double-Breasted Closures:** Broad front overlaps deliver a strong masculine-meets-feminine silhouette.

---

### Summary

Embrace single-color power tailoring in 2026 to elevate your professional presence with modern structure and ease.
"""
    },
    {
        "id": "112",
        "slug": "soft-utility-trend-cargo-trousers-linen-vests-2026",
        "title": "The Soft Utility Trend: Functional Cargo Trousers & Structured Linen Vests",
        "category": "Ladies Outfit Ideas",
        "date": "September 15, 2026",
        "readTime": "11 min read",
        "author": "Thushara Sanjeewa",
        "excerpt": "How functional pocketing, breathable linen fabrics, and neutral utility cuts are taking street fashion by storm.",
        "image": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=80",
        "content": """
### Utility Reimagined for Everyday Fashion

Utility fashion—historically rooted in military and heavy workwear—is being completely reimagined for women in 2026. The "Soft Utility" trend replaces stiff canvas and heavy brass hardware with soft organic linens, drape-friendly Tencel, and delicate tonal closures.

The result is a functional, highly comfortable wardrobe that looks effortlessly structured.

---

### Section 1: Core Pieces of Soft Utility

* **High-Waisted Fluid Cargo Pants:** Featuring flat streamline pockets rather than bulky side pouches.
* **Tailored Linen Vests:** Worn solo as a sleek top or open over a tissue-thin silk t-shirt.
* **Cinched Utility Jackets:** Lightweight outerwear with internal drawstrings to highlight the waistline.

---

### Summary

Soft utility offers the ultimate combination of practical pockets and refined tailoring for urban women on the go.
"""
    },
    {
        "id": "113",
        "slug": "modern-knitwear-architecture-oversized-sweaters-2026",
        "title": "Modern Knitwear Architecture: Oversized Sweaters & Ribbed Co-Ord Sets in 2026",
        "category": "Ladies Outfit Ideas",
        "date": "September 14, 2026",
        "readTime": "10 min read",
        "author": "Thushara Sanjeewa",
        "excerpt": "Master tactile warmth with chunky ribbed knits, cashmere co-ord sets, and sculptural necklines.",
        "image": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1800&q=80",
        "content": """
### Tactile Comfort Meets High Design

As seasonal weather shifts, luxury knitwear becomes the central hero of a stylish woman's wardrobe. In 2026, knitwear goes far beyond basic crewnecks into sculptural architecture, featuring exaggerated cuffs, wide ribbed textures, and matching co-ord sets.

---

### Section 1: How to Style Ribbed Co-Ord Sets

Matching knit sweater-and-trouser sets deliver instant effortless chic. 

* **For the Office:** Layer a matching cream ribbed set beneath a long structured wool trench coat and pair with sleek leather boots.
* **For Travel:** Pair an oversized oat knit co-ord with clean white leather sneakers and a spacious leather tote bag.

---

### Summary

Architectural knits deliver thermal comfort and high-end texture to your daily rotations.
"""
    },
    {
        "id": "114",
        "slug": "high-fashion-accessories-gold-chains-totes-2026",
        "title": "High-Fashion Accessories: Chunky Gold Chains, Structured Totes & Oversized Sunglasses",
        "category": "Ladies Outfit Ideas",
        "date": "September 13, 2026",
        "readTime": "10 min read",
        "author": "Thushara Sanjeewa",
        "excerpt": "The definitive guide to anchoring minimalist outfits with bold statement jewelry, premium leather totes, and eyewear.",
        "image": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1800&q=80",
        "content": """
### The Finishing Touches That Define Style

Even the most immaculate monochrome or tailored outfit can feel incomplete without strategic accessorizing. In 2026, accessories are designed to ground simple capsule wardrobe pieces with bold polish and personality.

---

### Section 1: The Three Accessory Investments for 2026

1. **Chunky Brushed Gold Chain Necklaces:** Adding warmth and metallic contrast against high crewneck tops and open blazers.
2. **Structured Architectural Leather Totes:** Boxy, clean-lined totes that accommodate laptops while maintaining sharp silhouette boundaries.
3. **Oversized Acetate Sunglasses:** Bold square frames that add immediate movie-star intrigue to daily street wear.

---

### Summary

Use high-impact accessories to transform basic outfit combinations into memorable personal statements.
"""
    },
    {
        "id": "115",
        "slug": "evening-glamour-tailored-velvet-blazers-metallic-skirts-2026",
        "title": "Evening Glamour: Tailored Velvet Blazers & Liquid Metallic Slip Skirts in 2026",
        "category": "Ladies Outfit Ideas",
        "date": "September 12, 2026",
        "readTime": "11 min read",
        "author": "Thushara Sanjeewa",
        "excerpt": "How rich tactile velvet and shimmering metallic textures redefine evening attire for dinner parties and galas.",
        "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=80",
        "content": """
### Light-Reflecting Textures for Night Outfits

Evening fashion in 2026 plays heavily with light absorption and reflection. Pairing light-absorbing deep velvet with light-reflecting metallic satin creates a captivating visual dialogue for night events.

---

### Section 1: The Ultimate Evening Combination

* **The Top Anchor:** A deep midnight navy or espresso velvet blazer worn buttoned as a top or layered over a sheer lace bralette.
* **The Bottom Anchor:** A liquid silver or champagne metallic bias-cut midi slip skirt.
* **The Shoes:** Pointed-toe metallic heels with delicate ankle straps.

---

### Summary

Step into evening occasions with confident tactile contrast by mastering velvet and metallic pairings.
"""
    }
]

# Combine existing articles and new batch 3
updated_articles = existing_articles + articles_batch3

ts_code = f"""export interface Article {{
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  image: string;
  content: string;
}}

export const articles: Article[] = {json.dumps(updated_articles, indent=2)};
"""

with open("src/data/articles.ts", "w") as f:
    f.write(ts_code)

print("Batch 3 successfully added! Total articles now:", len(updated_articles))

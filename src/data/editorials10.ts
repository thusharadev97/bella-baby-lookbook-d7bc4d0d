// 9 long-form editorials (articles 2–10). Article #1 lives at
// src/routes/editorial.wide-leg-trousers-2026.tsx.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "img"; prompt: string };

export type Editorial = {
  slug: string;
  title: string;
  titleItalicTail?: string;
  eyebrow: string;
  description: string;
  keywords: string;
  datePublished: string;
  readMinutes: number;
  lede: string;
  heroImagePrompt: string;
  blocks: Block[];
  editorNote: string;
  faqs: { q: string; a: string }[];
  internalLinks: { anchor: string; futureSlug: string; note: string }[];
};

export const EDITORIALS: Editorial[] = [
  // ─────────────────────────────── #2 ───────────────────────────────
  {
    slug: "babydoll-sleep-dress-daytime-styling",
    title: "How to Style a Babydoll Sleep Dress for Daytime:",
    titleItalicTail: "The Softest Silhouette of 2026",
    eyebrow: "Style Report · Ladies Wear 2026",
    description:
      "The babydoll sleep dress is 2026's softest daytime silhouette. A US editor's guide to fabric, layering, footwear, and the styling formulas that take it from bedroom to boulevard.",
    keywords:
      "babydoll dress styling, sleep dress daytime outfit, 2026 dress trends, cottagecore luxury, quiet luxury dressing",
    datePublished: "2026-07-19",
    readMinutes: 7,
    lede:
      "Once confined to bedside tables and Sunday-morning coffee, the babydoll sleep dress has quietly crossed the threshold into daytime dressing — and 2026's most confident women are wearing it to lunch, gallery openings, and the school run without a second thought.",
    heroImagePrompt:
      "Editorial daylight shot of a woman in an ivory cotton-voile babydoll sleep dress belted at the waist, layered over a fine ecru rib tank, walking a cobblestone street in the West Village, natural light, Vogue US aesthetic.",
    blocks: [
      {
        type: "p",
        text: "The babydoll dress — that short, empire-waist, gently gathered silhouette borrowed from lingerie — is not a costume anymore. On the spring 2026 runways at Chloé, Ulla Johnson, and Cecilie Bahnsen, it appeared in cotton voile, silk-cotton, and airy Swiss dot, styled unmistakably for the sidewalk rather than the bedroom. The proposition is refreshingly simple: a dress that skims instead of grips, breathes in July heat, and can be reinterpreted six ways with pieces you almost certainly already own.",
      },
      { type: "h2", text: "Why the Babydoll Works in 2026" },
      {
        type: "p",
        text: "Three things separate this iteration from the 2010s ditsy-print babydoll that lives in your memory. First, the fabric is heavier and better constructed — no more sheer polyester. Second, the length is deliberately imperfect, hitting mid-thigh to just above the knee, which reads modern rather than juvenile. Third, and most importantly, women are layering it. A babydoll dress worn alone is a nightgown; a babydoll dress layered over a rib tank, under a boyfriend blazer, or belted at the waist becomes an outfit.",
      },
      { type: "h3", text: "The Fabric Cheat Sheet" },
      {
        type: "ul",
        items: [
          "Cotton voile — breathable, holds shape, does not cling in humidity.",
          "Silk-cotton blend — the photogenic choice; a subtle sheen elevates the look instantly.",
          "Swiss dot cotton — textured enough to read intentional in daylight.",
          "Linen-cotton — the most casual, best for weekend errands and coastal travel.",
        ],
      },
      {
        type: "img",
        prompt:
          "Flat lay of three folded babydoll dresses — cream cotton voile, blush silk-cotton, powder-blue Swiss dot — on warm oak floorboards with a woven straw bag and beige ballet flats, overhead natural light.",
      },
      { type: "h2", text: "Three Styling Formulas That Work in Daylight" },
      { type: "h3", text: "Formula One — The Boyfriend Blazer" },
      {
        type: "p",
        text: "Pull a soft, unlined blazer (cotton, linen, or lightweight wool) over the shoulders and let the dress peek out below. Ballet flats or minimal white sneakers. This is the outfit that reads as put-together without any effort visibly having been made — the essence of American quiet luxury.",
      },
      { type: "h3", text: "Formula Two — The Rib-Tank Layer" },
      {
        type: "p",
        text: "Slide a fine-gauge rib tank underneath in a matching or slightly darker tone. The layering removes any bedroom association, adds visual interest, and lets you wear the dress into a chillier evening without a coat.",
      },
      { type: "h3", text: "Formula Three — The Slim Waist Belt" },
      {
        type: "p",
        text: "A one-inch leather belt at the natural waist transforms an empire cut into an hourglass, and instantly grounds the dress for a lunch or a client meeting. Cognac, black, or a warm ivory — always leather, never fabric.",
      },
      { type: "h2", text: "Shoes, Bags, and Small Choices That Matter" },
      {
        type: "p",
        text: "The strongest footwear pairings this year are ballet flats, minimal square-toe sandals, and low-vamp mules. Avoid heavy platforms and chunky trainers — they fight the dress's lightness. For bags, choose small structured leather (a top-handle or a boxy shoulder) rather than a slouchy hobo; the structure sharpens the silhouette. Jewelry stays quiet: a single gold chain, small hoops, one considered ring.",
      },
      { type: "h2", text: "When Not to Wear It" },
      {
        type: "p",
        text: "The babydoll dress is not a wedding-guest garment, nor an office-mandated one. Save it for the days when the dress code is your own — weekend brunches, gallery visits, travel days, the summer evenings that stretch until nine. Worn to the wrong occasion it can read informal; worn to the right one, it reads unmistakably chic.",
      },
    ],
    editorNote:
      "\"The babydoll only works if the fabric has weight. If you can see the shape of your hand through it in daylight, it belongs on a nightstand — not on the sidewalk. Spend the extra thirty dollars on a proper cotton voile or silk-cotton, and it will earn its place in your summer rotation for years.\"",
    faqs: [
      {
        q: "Can I really wear a babydoll dress outside the bedroom?",
        a: "Yes — provided the fabric is opaque and the styling is deliberate. Layer it with a rib tank underneath or a boyfriend blazer on top, add a leather belt, and pair it with structured shoes. Those three choices are what separate a modern babydoll outfit from a nightgown.",
      },
      {
        q: "What body type suits the babydoll silhouette?",
        a: "Every body type wears it well when the fit is correct. The critical dimension is where the empire seam falls — it should sit just below the bust, never on it. Belting at the natural waist flatters an hourglass or pear shape; leaving it loose flatters a rectangular or apple frame.",
      },
      {
        q: "What shoes should I avoid with a babydoll dress?",
        a: "Skip chunky platform sneakers, heavy hiking sandals, and cowboy boots — they all fight the dress's softness. Ballet flats, square-toe sandals, minimal white leather sneakers, and low block-heel slingbacks are the reliable pairings for 2026.",
      },
    ],
    internalLinks: [
      { anchor: "the-summer-2026-lookbook", futureSlug: "/lookbook", note: "our full styling reference" },
      { anchor: "tailored-loungewear-sets", futureSlug: "/editorial/tailored-loungewear-sets-2026", note: "for weekend-comfort dressing" },
      { anchor: "floral-prints-returning", futureSlug: "/editorial/floral-prints-2026", note: "the print story for spring/summer" },
    ],
  },

  // ─────────────────────────────── #3 ───────────────────────────────
  {
    slug: "world-cup-jersey-styling-women-2026",
    title: "World Cup Jersey Styling:",
    titleItalicTail: "Sporty Chic for Women in 2026",
    eyebrow: "Style Report · Sport Meets Style",
    description:
      "How to style a World Cup jersey without looking like a fan-shop cliché. A US editor's guide to fabric, proportion, tailoring, and the Blokecore evolution that is dressing women in 2026.",
    keywords:
      "world cup jersey outfit women, blokecore 2026, football jersey styling, sporty chic outfit, jersey with skirt",
    datePublished: "2026-07-19",
    readMinutes: 7,
    lede:
      "The 2026 FIFA World Cup on North American soil is the largest cultural event of the year — and the football jersey has, almost overnight, become the most-photographed garment in New York, LA, and Miami street style.",
    heroImagePrompt:
      "Street-style shot of a woman crossing a Manhattan crosswalk, wearing a vintage-fit US women's national team jersey tucked into a long bias-cut satin skirt, red ballet flats, tan leather shoulder bag, golden-hour light, 35mm film aesthetic.",
    blocks: [
      {
        type: "p",
        text: "What began quietly on London and Copenhagen sidewalks two summers ago has arrived in force on American streets: the football jersey as everyday wear. Call it Blokecore, call it the World Cup effect, call it a well-timed cultural moment. The jersey — mesh-lined, mid-weight polyester, unmistakably athletic — has become the shirt women reach for when they want an outfit that reads confident, current, and a little defiant of the usual quiet-luxury script.",
      },
      { type: "h2", text: "Why the Jersey, Why Now" },
      {
        type: "p",
        text: "Three converging currents put the jersey at the top of the 2026 style stack. First, the World Cup itself: an event that reaches into households that would not typically consider a football shirt fashion. Second, the ongoing fatigue with polished minimalism — women want an item that has personality, provenance, and a story. Third, the jersey's specific texture (that unmistakable athletic mesh, the crisp screen-printed number) photographs beautifully in the natural light everyone now shoots outfits in.",
      },
      { type: "h3", text: "Fit Is Everything" },
      {
        type: "p",
        text: "The single biggest mistake is choosing a men's jersey in your \"usual\" size. Size down one full size from the men's cut, or buy the women's fit if the team offers it. The shoulder seam should sit at your shoulder, not on your upper arm. The hem should hit at or just below the hip. A jersey that is even one size too large collapses the entire look into oversized-basketball-jersey territory — flattering to no one.",
      },
      {
        type: "img",
        prompt:
          "Editorial flat lay of a folded USA women's national team jersey, a black leather midi skirt, red suede ballet flats, gold hoop earrings, and a small structured cognac shoulder bag, arranged on a bone-colored linen background.",
      },
      { type: "h2", text: "Three Styling Formulas That Don't Look Like a Fan Costume" },
      { type: "h3", text: "Formula One — Jersey + Bias-Cut Satin Skirt" },
      {
        type: "p",
        text: "Tuck the jersey into a bias-cut satin midi in bone, black, or bordeaux. Add ballet flats or a pointed kitten heel. The tension between athletic mesh and liquid satin is the entire look — high-low done exactly right.",
      },
      { type: "h3", text: "Formula Two — Jersey + Wide-Leg Trouser" },
      {
        type: "p",
        text: "Half-tuck the jersey into a cream or black wide-leg wool trouser. Add a slim leather belt, a small structured bag, and minimal white leather sneakers. This is the outfit that photographs cleanly for a stadium walk-in and still reads sharp at the after-dinner.",
      },
      { type: "h3", text: "Formula Three — Jersey + Denim Maxi Skirt" },
      {
        type: "p",
        text: "A dark-wash denim column skirt with a front slit anchors the jersey and pushes the outfit toward downtown. Finish with a leather kitten heel mule and a chain-strap leather bag. Perfect for gallery openings and the after-match dinner.",
      },
      { type: "h2", text: "Which Jersey to Buy" },
      {
        type: "p",
        text: "Prioritize the retro-fit or 1990s reissue whenever it's offered — the cuts are more flattering, the fabrics feel less plastic, and the graphics are cleaner. Vintage and dead-stock national-team jerseys from Depop, Grailed, and specialist football-fashion shops are the strongest investment. If you're buying new, opt for the away kit rather than the home — away colors (deep blue, forest, cream, dusty pink) integrate more easily into a real wardrobe.",
      },
      { type: "h2", text: "The Accessories That Make It Work" },
      {
        type: "p",
        text: "Keep everything else quiet: gold hoops, a signet ring, a leather bag with real structure, minimal makeup. The jersey is the loud piece — the rest of the outfit exists to make it look intentional, not costumed.",
      },
    ],
    editorNote:
      "\"Buy the jersey a size smaller than you think, tuck it, and add one piece with real polish — a satin skirt, a leather belt, a proper structured bag. That single piece is the difference between looking like a fan and looking like a woman who happens to love football.\"",
    faqs: [
      {
        q: "Can I wear a football jersey to a nice restaurant?",
        a: "Yes, if the styling around it is polished. A tucked jersey with a bias-cut satin midi, kitten-heel mules, and gold jewelry is entirely appropriate for a bistro or a wine bar. Avoid it for formal dining rooms or dress-coded venues.",
      },
      {
        q: "What jersey looks best for someone who doesn't follow a team?",
        a: "Choose based on the color and cut, not the team. A 1990s away-kit in deep navy, cream, or forest green integrates seamlessly into a neutral wardrobe. Vintage reissues from Umbro, Adidas Originals, and specialist football-fashion shops are the safest starting point.",
      },
      {
        q: "Is Blokecore actually going to last past the World Cup?",
        a: "The jersey-as-outerwear silhouette will outlast the tournament, but it will evolve. Expect it to migrate toward more tailored jerseys and rugby-style tops through fall 2026 as the pure football moment cools.",
      },
    ],
    internalLinks: [
      { anchor: "wide-leg-trousers-guide", futureSlug: "/editorial/wide-leg-trousers-2026", note: "the trouser to tuck it into" },
      { anchor: "leather-jacket-styling", futureSlug: "/editorial/leather-jacket-spring-summer-2026", note: "for cooler evenings" },
      { anchor: "our-summer-lookbook", futureSlug: "/lookbook", note: "full styling references" },
    ],
  },

  // ─────────────────────────────── #4 ───────────────────────────────
  {
    slug: "skinny-jeans-are-out-what-to-wear-instead",
    title: "Why Skinny Jeans Are Officially Out",
    titleItalicTail: "(And What to Wear Instead in 2026)",
    eyebrow: "Trend Report · Denim 2026",
    description:
      "Skinny jeans have exited the modern wardrobe. A US editor's guide to the four denim silhouettes replacing them in 2026 — barrel, straight, wide, and low-slung boyfriend.",
    keywords:
      "skinny jeans out 2026, best jeans 2026, barrel leg jeans, wide leg jeans women, denim trends 2026",
    datePublished: "2026-07-19",
    readMinutes: 7,
    lede:
      "The most-searched fashion question of 2026 is a question everyone already knows the answer to: are skinny jeans still in style? They are not. And the alternatives are more flattering, more comfortable, and more current than the skinny ever was.",
    heroImagePrompt:
      "Editorial flat lay of four folded jeans — barrel-leg indigo, straight-leg raw denim, wide-leg cream, low-slung boyfriend — on a warm oak floor with a linen throw, overhead natural light, minimalist styling.",
    blocks: [
      {
        type: "p",
        text: "The compression-fit skinny jean had a fifteen-year run — an extraordinary lifespan for any single silhouette — and its exit is not a fashion tantrum but a genuine cultural pivot. Women are choosing garments that move with them, extend the leg line, and photograph as considered rather than compressed. In denim, that has produced four distinct silhouettes worth knowing.",
      },
      { type: "h2", text: "The Four Denim Silhouettes Replacing the Skinny" },
      { type: "h3", text: "1. The Barrel Leg" },
      {
        type: "p",
        text: "The single most-worn denim shape on the spring 2026 runways. A gentle curve out from the hip, a rounded midsection, and a tapered ankle. It flatters nearly every body type because it disguises the calf while showing the ankle. Best in a mid-indigo wash for versatility.",
      },
      { type: "h3", text: "2. The Straight Leg" },
      {
        type: "p",
        text: "The classic that never fully leaves. Choose a mid- or high-rise, a rigid or lightly stretched raw denim, and a full-length hem that just kisses the shoe. This is the workhorse — the pair that gets worn three times a week for five years.",
      },
      { type: "h3", text: "3. The Wide Leg" },
      {
        type: "p",
        text: "Denim's answer to the tailored wide-leg trouser. High-rise, straight-to-slightly-flared through the leg, and hemmed to puddle a quarter-inch on the floor. Reads polished with a fitted knit or tucked shirt.",
      },
      { type: "h3", text: "4. The Low-Slung Boyfriend" },
      {
        type: "p",
        text: "For confident dressers only, this is the return of a truly relaxed hip. Sits low on the natural waist, drapes generously through the thigh, and reads deliberately casual. Best paired with a tank and a leather belt.",
      },
      {
        type: "img",
        prompt:
          "Street-style photograph of a woman in her thirties wearing high-rise barrel-leg indigo jeans, a fitted white rib tank, tan leather belt, cognac loafers, walking in soft afternoon light in the West Village.",
      },
      { type: "h2", text: "The Two Rules for Any 2026 Denim" },
      { type: "h3", text: "Rule One — Mid or High Rise, Never Low" },
      {
        type: "p",
        text: "Even the boyfriend cut has moved back up to the natural waist. A rise that sits below the hipbone lengthens the torso the wrong way and dates the outfit instantly.",
      },
      { type: "h3", text: "Rule Two — Hem to the Exact Shoe" },
      {
        type: "p",
        text: "Denim hem length is the single detail non-editors most often get wrong. Have every pair tailored to the exact shoe you wear them with most. A wide-leg jean an inch too short is unforgiving; hemmed correctly, it reads as investment dressing.",
      },
      { type: "h2", text: "What to Do With the Skinnies You Own" },
      {
        type: "p",
        text: "Donate mindfully rather than dump. Skinny jeans in excellent condition are still useful for a specific set of situations — under knee-high boots, for backcountry travel, for the gym — and thrift shops and clothing-cycling programs will re-home them thoughtfully. Keep one dark-wash pair for boot season; retire the rest.",
      },
    ],
    editorNote:
      "\"Buy the barrel first. It is the most flattering, the most forgiving, and the easiest to style with everything you already own. Once you've worn it for a month you'll wonder why you spent a decade in a pair of jeans you had to lie down to zip.\"",
    faqs: [
      {
        q: "Are skinny jeans really over, or is this just a trend cycle?",
        a: "The trend cycle for the skinny is genuinely closed. What returns will be a different cut — probably a slim straight-leg or a modernized cigarette pant — but the compression-fit skinny that defined 2010–2023 is not coming back in the same form.",
      },
      {
        q: "Which of the four new denim shapes is most flattering?",
        a: "For most body types, the high-rise barrel leg is the strongest single pick. It elongates the leg line, disguises the thigh, and shows the slimmest part of the ankle. Straight-leg is the safest all-purpose choice.",
      },
      {
        q: "What shoes work with the new denim silhouettes?",
        a: "Loafers, ballet flats, minimal white leather sneakers, low block-heel slingbacks, and pointed kitten-heel mules. Skip chunky platforms and heavy trainers — they fight the fluid line the new silhouettes create.",
      },
    ],
    internalLinks: [
      { anchor: "wide-leg-trouser-guide", futureSlug: "/editorial/wide-leg-trousers-2026", note: "the sister silhouette" },
      { anchor: "leather-jacket-styling", futureSlug: "/editorial/leather-jacket-spring-summer-2026", note: "to layer with denim" },
      { anchor: "the-summer-lookbook", futureSlug: "/lookbook", note: "for full outfit references" },
    ],
  },

  // ─────────────────────────────── #5 ───────────────────────────────
  {
    slug: "tailored-loungewear-sets-2026",
    title: "Tailored Loungewear Sets:",
    titleItalicTail: "Where Comfort Meets Style in 2026",
    eyebrow: "Style Report · Modern Comfort",
    description:
      "Tailored loungewear is the sleeper hit of 2026 — soft as pyjamas, sharp as suiting. A US editor's guide to fabric, fit, and how to wear a set from the sofa to the sidewalk.",
    keywords:
      "tailored loungewear sets, matching set outfit 2026, luxury loungewear women, work from home style, elevated comfort dressing",
    datePublished: "2026-07-19",
    readMinutes: 7,
    lede:
      "The most-worn garment in the closets of 2026's best-dressed women is not a dress, a coat, or a jean. It is a matching two-piece set — cut like tailoring, feels like sleepwear, and reads intentional everywhere it goes.",
    heroImagePrompt:
      "Editorial daylight shot of a woman in a matching bone silk-cotton loungewear set — button-front camp shirt and drawstring wide-leg trousers — barefoot in a sunlit modern apartment, natural light, minimalist styling.",
    blocks: [
      {
        type: "p",
        text: "The pandemic-era matching set has grown up. Where the 2020 sweat-set was fleece and drawstring, the 2026 tailored set is silk-cotton, cupro, cashmere-blend jersey, or dry-touch tencel — cut with real seams, a considered rise, and a drape that survives a coffee run to the corner store. It is the garment that finally solves the tension between comfort and polish.",
      },
      { type: "h2", text: "What Separates a Tailored Set from a Pyjama" },
      { type: "h3", text: "Structure at the Shoulder and Waist" },
      {
        type: "p",
        text: "A proper tailored set has a defined shoulder seam, a shirt collar (camp or notch), and a trouser with either a real waistband or a fabric-covered elastic that reads clean. If the shoulders slouch or the trouser rise puddles at the front, it belongs on the bed, not on the sidewalk.",
      },
      { type: "h3", text: "Fabric Weight" },
      {
        type: "p",
        text: "The strongest sets this year use fabrics with enough weight to drape rather than cling: silk-cotton (roughly 120-140 gsm), cupro-tencel blends, mid-weight linen, and heavier cashmere-blend jerseys. Sheer or featherweight fabrics read as loungewear; mid-weight reads as ready-to-wear.",
      },
      {
        type: "img",
        prompt:
          "Flat lay of three matching tailored sets — bone silk-cotton, chocolate cupro, sage cashmere jersey — folded on warm oak floor with leather slides and a small structured bag, overhead natural light.",
      },
      { type: "h2", text: "Three Ways to Wear a Set Beyond the Living Room" },
      { type: "h3", text: "Formula One — The Sofa Uniform" },
      {
        type: "p",
        text: "Worn together, unbelted, with bare feet or leather slides. This is the version that lives at home — but choose a color that photographs well in your living-room light, because a working-from-home video call will happen and the wrong fabric will look like sleepwear on camera.",
      },
      { type: "h3", text: "Formula Two — The Sidewalk Set" },
      {
        type: "p",
        text: "Add a leather belt at the waist of the trouser, tuck the top loosely, and finish with minimal leather sandals or ballet flats. Grab a structured shoulder bag. The set now reads as ready-to-wear and can go anywhere a linen suit can go.",
      },
      { type: "h3", text: "Formula Three — Split the Set" },
      {
        type: "p",
        text: "This is where the investment pays for itself. Wear the trouser with a fitted rib tank and a boyfriend blazer; wear the shirt with denim; belt the shirt into a skirt. A well-chosen set doubles as four separate garments.",
      },
      { type: "h2", text: "Where to Spend, Where to Save" },
      {
        type: "p",
        text: "Spend on the fabric and the construction — you will wear a great set two hundred times. Save on the color: bone, chocolate, black, and deep navy will outlast any seasonal shade, and they photograph consistently under any lighting. If you buy one set this year, make it bone silk-cotton in a camp-shirt-and-drawstring-trouser cut. It is the closest thing 2026 has to a modern uniform.",
      },
    ],
    editorNote:
      "\"The test is whether you would happily wear the top alone with jeans, and the trouser alone with a knit. If both halves earn their place independently, the set was worth every dollar. If one half only survives when paired with the other, you bought pyjamas.\"",
    faqs: [
      {
        q: "Can I wear a tailored set to a client meeting?",
        a: "A silk-cotton or wool-blend set in bone, chocolate, or navy is entirely appropriate for a business-casual client meeting. Add a leather belt, structured shoes, and a proper handbag; skip anything with a drawstring waist for that context.",
      },
      {
        q: "What fabric holds up best for daily wear?",
        a: "Cupro-tencel blends and mid-weight silk-cotton wear the best across a full year. They resist wrinkling, drape cleanly after washing, and behave in humidity — three qualities that make a set survive real life.",
      },
      {
        q: "Is a matching set flattering on a curvy figure?",
        a: "Yes, when the pieces have real structure. Look for a defined shoulder, a waistband with belt loops, and a trouser rise at or above the navel. Belt the top or the trouser to define the waist and the set will read as tailoring, not loungewear.",
      },
    ],
    internalLinks: [
      { anchor: "wide-leg-trousers", futureSlug: "/editorial/wide-leg-trousers-2026", note: "the tailored trouser story" },
      { anchor: "babydoll-dress-daytime", futureSlug: "/editorial/babydoll-sleep-dress-daytime-styling", note: "for weekend softness" },
      { anchor: "our-lookbook", futureSlug: "/lookbook", note: "styled sets on-body" },
    ],
  },

  // ─────────────────────────────── #6 ───────────────────────────────
  {
    slug: "jelly-heels-summer-2026-trend",
    title: "Jelly Heels:",
    titleItalicTail: "Summer 2026's Boldest Shoe Trend",
    eyebrow: "Accessory Report · Footwear 2026",
    description:
      "Jelly heels are the loudest shoe of summer 2026 — translucent, sculptural, unmistakable. A US editor's guide to fit, color, styling, and the outfits that make them work.",
    keywords:
      "jelly heels 2026, transparent heels trend, PVC sandals women, summer shoe trends 2026, sculptural heels",
    datePublished: "2026-07-19",
    readMinutes: 7,
    lede:
      "Nothing has divided the fashion internet this summer quite like the return of the jelly heel — that translucent, injection-moulded, unapologetically synthetic sandal that first passed through cool-girl wardrobes in 1997. In 2026, it is back, and this time it is deliberately grown-up.",
    heroImagePrompt:
      "Editorial close-up of a woman's foot in a translucent amber jelly kitten-heel sandal on a warm marble floor, soft golden-hour light, natural shadow, high-end still-life aesthetic.",
    blocks: [
      {
        type: "p",
        text: "The jelly heel of 2026 is not the plastic drugstore flat of your childhood. Bottega Veneta, Alaïa, and Melissa have all released elevated versions — thicker walls, sculpted architectural heels, tinted transparencies in amber, smoke, blush, and rose — and their price points sit anywhere between forty and eight hundred dollars. The trend has arrived at every tier of the market simultaneously, which is usually the surest sign a silhouette will define a full season.",
      },
      { type: "h2", text: "Why the Jelly Heel, Why Now" },
      {
        type: "p",
        text: "Three forces put jelly on every accessories page this year. First, Y2K's continuing influence, now filtered through a more grown-up lens. Second, a genuine appetite for a summer shoe that is waterproof and beach-adjacent — jelly can survive a boat, a pool, a rainstorm. Third, sustainability messaging: several major brands now use recycled PVC or bio-based plastics, giving the shoe an ethical narrative that leather cannot match.",
      },
      { type: "h3", text: "The Four Silhouettes to Know" },
      {
        type: "ul",
        items: [
          "Translucent kitten-heel sandal — the editor pick; wearable with almost anything.",
          "Sculpted block heel — the architectural statement; best with tailoring.",
          "Fisherman jelly with a mid-heel — the coastal-cool option.",
          "Mary-Jane jelly flat — for those who want the trend without the height.",
        ],
      },
      {
        type: "img",
        prompt:
          "Editorial flat lay of four translucent jelly heels in different colors — amber kitten heel, smoke block heel, blush fisherman, rose Mary Jane flat — arranged on a bone linen surface with soft natural light.",
      },
      { type: "h2", text: "The Colors That Work" },
      {
        type: "p",
        text: "Skip the pure clear if you're new to the trend — it reads too closely to the childhood original. The strongest colors this summer are tinted transparencies: warm amber, smoke grey, blush pink, and pale rose. These read as intentional in daylight and integrate with a neutral wardrobe. Save the neon-tinted jellies for pool days and cocktail events.",
      },
      { type: "h2", text: "Three Styling Formulas That Work" },
      { type: "h3", text: "Formula One — Jelly + Wide-Leg Trouser" },
      {
        type: "p",
        text: "The tension is the entire point: fluid tailored trousers, a synthetic architectural heel. Wear the trouser with a clean puddle-hem so the shoe barely shows — the flash of tinted jelly at the toe is exactly the level of statement 2026 is asking for.",
      },
      { type: "h3", text: "Formula Two — Jelly + Slip Dress" },
      {
        type: "p",
        text: "A bias-cut silk-satin slip dress paired with an amber jelly kitten heel is the strongest summer-evening outfit of the year. Add small gold hoops and a slim clutch. Done.",
      },
      { type: "h3", text: "Formula Three — Jelly + Denim Bermuda" },
      {
        type: "p",
        text: "For the daytime version, pair a smoke or blush jelly with a knee-length denim bermuda short, a rib tank, and a leather shoulder bag. Reads instantly as considered summer dressing rather than beach-adjacent throwaway.",
      },
      { type: "h2", text: "Sizing and Comfort — the Honest Part" },
      {
        type: "p",
        text: "Jelly is unforgiving. Buy true to size, expect a short break-in period, and always wear on skin that has been moisturized — dry skin sticks, moisturized skin glides. For anyone with sensitive feet, a thin silicone insole solves the comfort issue entirely.",
      },
    ],
    editorNote:
      "\"Buy the tinted transparency, not the fully clear. Amber, smoke, and blush are the shades that read intentional in daylight — the pure crystal reads as childhood memory. And spend the extra for a sculpted heel; the injection-moulded chunky block is what separates the 2026 jelly from the 1997 one.\"",
    faqs: [
      {
        q: "Are jelly heels actually comfortable?",
        a: "The 2026 versions are dramatically improved over the 1990s originals — thicker footbeds, contoured arches, and softer PVC blends. Expect a two-to-three-wear break-in, and add a thin silicone insole if your skin is prone to sticking.",
      },
      {
        q: "Can I wear jelly heels to work?",
        a: "A tinted kitten-heel jelly in amber or smoke can absolutely work in a creative or business-casual office. Pair with tailored trousers or a midi skirt. Save the fisherman and neon-tinted versions for weekends.",
      },
      {
        q: "Do jelly heels look cheap?",
        a: "Not the current generation. The elevated versions from Alaïa, Bottega, and Melissa are sculpturally distinct from the drugstore original — buy the architectural silhouette, not the flat one, and choose a tinted rather than crystal-clear color.",
      },
    ],
    internalLinks: [
      { anchor: "wide-leg-trousers-guide", futureSlug: "/editorial/wide-leg-trousers-2026", note: "the trouser to wear them with" },
      { anchor: "fish-necklace-accessory-guide", futureSlug: "/editorial/fish-necklaces-statement-accessories-2026", note: "the summer jewelry story" },
      { anchor: "our-lookbook", futureSlug: "/lookbook", note: "full styled looks" },
    ],
  },

  // ─────────────────────────────── #7 ───────────────────────────────
  {
    slug: "fish-necklaces-statement-accessories-2026",
    title: "Fish Necklaces and Statement Accessories:",
    titleItalicTail: "The 2026 Jewelry Trend Guide",
    eyebrow: "Accessory Report · Jewelry 2026",
    description:
      "From the fish pendant to the sculpted brass cuff, a US editor's guide to the statement accessories defining 2026 — what to buy, what to skip, and how to style them without overload.",
    keywords:
      "fish necklace trend, statement necklace 2026, sculptural jewelry, brass cuff trend, layered necklaces women",
    datePublished: "2026-07-19",
    readMinutes: 7,
    lede:
      "The single most-searched piece of jewelry this summer is a small silver fish on a chain — an unlikely style icon that has landed on every editor's neck from Copenhagen to Los Angeles. It is one of a handful of statement accessories quietly defining the 2026 look.",
    heroImagePrompt:
      "Editorial close-up of a woman's collarbone wearing a small silver fish pendant on a fine chain, layered with a slightly longer gold chain, natural daylight, warm skin tone, high-end jewelry campaign aesthetic.",
    blocks: [
      {
        type: "p",
        text: "Jewelry in 2026 is not delicate. After a decade of paper-thin gold chains and tiny bezel-set diamonds, the pendulum has swung — and it has swung specifically toward sculptural, tactile, story-carrying pieces. The fish pendant is the smallest and most personal of these; the sculpted brass cuff, the oversized signet, the resin bangle stack, and the return of the layered mixed-metal necklace complete the picture.",
      },
      { type: "h2", text: "The Fish Pendant — Why This, Why Now" },
      {
        type: "p",
        text: "The little fish on a fine chain first appeared on Alaïa's spring runway, resurfaced on Marine Serre, and then broke through Copenhagen street style in early summer. The appeal is symbolic — the fish reads as luck, abundance, and coastal life — but the styling appeal is more prosaic: it is small enough to layer, distinctive enough to notice, and inexpensive enough to buy in silver or vermeil without a second thought.",
      },
      { type: "h3", text: "How to Wear It" },
      {
        type: "p",
        text: "Layer the fish over a plain rib tank, a poplin shirt with the top two buttons undone, or a soft crewneck knit. Pair with one longer chain — never more than two — and always in the same metal family. Sterling silver reads coastal and current; vermeil (gold-plated silver) reads slightly warmer and pairs better with olive and honey skin tones.",
      },
      {
        type: "img",
        prompt:
          "Editorial flat lay of five statement accessories on bone linen — silver fish pendant, sculpted brass cuff, oversized signet ring, layered gold chains, translucent amber resin bangle stack, natural light.",
      },
      { type: "h2", text: "The Other Statement Accessories to Know" },
      { type: "h3", text: "The Sculpted Brass Cuff" },
      {
        type: "p",
        text: "One heavy, hand-hammered brass cuff worn on the wrist that shows most in conversation. Reads instantly as considered rather than costume — a single sculpted piece always outperforms three delicate bangles.",
      },
      { type: "h3", text: "The Oversized Signet Ring" },
      {
        type: "p",
        text: "On the pinky or the middle finger, in silver or gold, with either a family crest or a blank chalcedony face. Reads as inheritance whether or not it actually is one.",
      },
      { type: "h3", text: "The Layered Mixed-Metal Necklace Stack" },
      {
        type: "p",
        text: "The one rule of 2026 layering: two to four chains, at least two different lengths, and mixed metals are back after a decade of matching-set rigidity. Combine a fine silver chain, a warm gold rope, and one pendant — the fish, a saint medallion, a small pearl.",
      },
      { type: "h3", text: "The Resin Bangle Stack" },
      {
        type: "p",
        text: "Amber, smoke, and warm rose resin bangles stacked three or four deep on the same wrist as the brass cuff. Weight and texture — the story of every 2026 accessory.",
      },
      { type: "h2", text: "What to Skip This Year" },
      {
        type: "p",
        text: "The paper-thin gold chain, the tiny name necklace, the single stud earring, the delicate stacking ring. None of these are wrong — they simply do not photograph as intentional in 2026, and they read as leftover from a different decade. Retire them to the drawer; bring back the pieces with weight.",
      },
    ],
    editorNote:
      "\"Buy one heavy piece and one small story piece. A sculpted brass cuff for the wrist, a small silver fish for the neck. Every outfit you wear for the next three months will land better because of those two purchases — and neither one costs more than a dinner out.\"",
    faqs: [
      {
        q: "Is the fish necklace trend actually going to last?",
        a: "The specific fish pendant is a summer story; the underlying preference for symbolic, sculptural, small-pendant jewelry will last through 2027. Buy the fish because you like it, not as an investment.",
      },
      {
        q: "Can I mix silver and gold in 2026?",
        a: "Yes — deliberately. The 2026 rule is that mixed metals now read as considered rather than accidental, provided the pieces are of similar weight and finish. Pair a warm gold rope chain with a fine silver chain and a single pendant.",
      },
      {
        q: "What's the best statement piece for someone who prefers minimalism?",
        a: "The sculpted brass cuff. Worn alone on an otherwise bare wrist, it is a single considered piece that adds real weight to a quiet outfit without visual clutter.",
      },
    ],
    internalLinks: [
      { anchor: "jelly-heels-summer-guide", futureSlug: "/editorial/jelly-heels-summer-2026-trend", note: "the summer footwear story" },
      { anchor: "modern-ethnic-wear", futureSlug: "/editorial/modern-ethnic-wear-2026", note: "for pairing with lightweight silhouettes" },
      { anchor: "our-lookbook", futureSlug: "/lookbook", note: "accessories on-body" },
    ],
  },

  // ─────────────────────────────── #8 ───────────────────────────────
  {
    slug: "modern-ethnic-wear-2026",
    title: "Modern Ethnic Wear:",
    titleItalicTail: "Lightweight Silhouettes for 2026",
    eyebrow: "Style Report · Global Craft 2026",
    description:
      "Modern ethnic wear reimagined for 2026 — lightweight, sculptural, and unmistakably contemporary. A US editor's guide to fabric, tailoring, and cross-cultural styling done with care.",
    keywords:
      "modern ethnic wear 2026, lightweight kurta women, contemporary saree drape, artisan fashion 2026, global craft dressing",
    datePublished: "2026-07-19",
    readMinutes: 7,
    lede:
      "The 2026 conversation around ethnic wear is quieter, lighter, and more thoughtful than at any point in the last decade. The heavy embroidered silhouettes have given way to a modern language: lightweight fabrics, sculpted drapes, and a level of restraint that lets craft take centre-stage.",
    heroImagePrompt:
      "Editorial daylight shot of a woman in a modern lightweight ivory cotton kurta with contemporary tailored trousers, minimal gold jewelry, warm natural light, minimalist urban backdrop, high-end fashion campaign aesthetic.",
    blocks: [
      {
        type: "p",
        text: "For years the phrase 'ethnic wear' in Western fashion vocabulary connoted heavy embellishment, saturated color, and occasion dressing. That reading has genuinely shifted. Designers like Rahul Mishra, Bode, Priya Ahluwalia, and Karishma Shahani Khan have built entire houses around a modern reinterpretation — lighter fabrics, cleaner cuts, sparer embroidery, and a wearability that suits the everyday.",
      },
      { type: "h2", text: "The 2026 Silhouettes to Know" },
      { type: "h3", text: "The Contemporary Kurta" },
      {
        type: "p",
        text: "Long, lightweight, with a defined shoulder and a hem that hits mid-calf or ankle. In cotton voile, silk-cotton, or handwoven khadi. Wear over a slim tailored trouser or a straight-leg jean — the tension between craft and modern silhouette is the entire look.",
      },
      { type: "h3", text: "The Modern Saree Drape" },
      {
        type: "p",
        text: "The pre-stitched saree and the contemporary belted drape have made the garment accessible to a much wider wearer base. Look for pieces from labels investing in handloom weavers, pair with a fitted blouse or a plain rib tank, and add a leather belt — the belt is the styling detail that signals 2026 rather than 2016.",
      },
      { type: "h3", text: "The Pared-Back Sherwani-Inspired Jacket" },
      {
        type: "p",
        text: "Structured, mid-length, minimal embroidery, worn open over a rib tank and wide-leg trouser. This is the piece that translates most easily into a Western wardrobe rotation.",
      },
      {
        type: "img",
        prompt:
          "Editorial flat lay of modern ethnic wear pieces — ivory kurta, block-printed cotton saree, sculpted brass cuff, tan leather belt, minimal jhumka earrings — on a warm oak floor with soft daylight.",
      },
      { type: "h2", text: "Fabric — The Story Beneath the Silhouette" },
      {
        type: "p",
        text: "The single most meaningful shift in 2026 ethnic wear is fabric weight. Handwoven cotton, silk-cotton blends, chanderi, mulmul, and lightweight khadi have replaced the heavier brocades and tissue silks that once dominated. Lighter fabrics move well in any climate, layer easily, and photograph as modern rather than costumed.",
      },
      { type: "h2", text: "Styling With Care and Respect" },
      {
        type: "p",
        text: "For any reader wearing pieces from a cultural tradition that isn't their own, the rule is straightforward and non-negotiable: buy from artisans and designers of that culture, learn the piece's history, and wear it in contexts appropriate to what the garment is. A kurta is everyday clothing across South Asia and pairs perfectly with jeans; a formal saree at a temple or wedding is a different garment with different meaning. Respect the difference.",
      },
      { type: "h2", text: "Three Modern Formulas" },
      { type: "h3", text: "Formula One — Kurta + Straight Jean" },
      {
        type: "p",
        text: "White or ecru handloom cotton kurta over a mid-wash straight-leg jean, minimal leather sandals, gold jhumkas or plain hoops. The most everyday-wearable ethnic-modern look of the year.",
      },
      { type: "h3", text: "Formula Two — Belted Saree + Tank" },
      {
        type: "p",
        text: "A cotton or chanderi saree draped over a rib tank, cinched with a slim leather belt, finished with minimal metallic sandals. Modern, wearable, unmistakably considered.",
      },
      { type: "h3", text: "Formula Three — Sherwani Jacket + Wide-Leg Trouser" },
      {
        type: "p",
        text: "A cream or navy sherwani-cut jacket worn open over a rib tank and a wide-leg tailored trouser, ballet flats or loafers. Effortless dinner-out styling.",
      },
    ],
    editorNote:
      "\"Buy from designers who employ artisan weavers directly, and choose the lightest fabric that suits your climate. A handloom cotton kurta from a fair-wage atelier will outlast three fast-fashion embroidered pieces, and it will read intentional every time you wear it.\"",
    faqs: [
      {
        q: "How do I style a kurta without looking like I'm in costume?",
        a: "Pair it with a modern silhouette from a different tradition — a straight-leg jean, a wide-leg tailored trouser, a slim leather belt. Keep the styling quiet, the shoes minimal, and the jewelry restrained. The mix is what reads as considered.",
      },
      {
        q: "What is the best modern ethnic piece for a Western wardrobe?",
        a: "A lightweight ivory or ecru handloom cotton kurta. It layers with everything, wears easily in any climate, and comes in enough silhouettes to suit any body type.",
      },
      {
        q: "Is it appropriate for me to wear a saree if I'm not South Asian?",
        a: "Buy from South Asian designers and artisans, learn what the garment is and what occasions it belongs to, and wear it with respect for that context. Everyday cotton pieces are widely welcomed; formal ceremonial pieces should be approached only when invited into that context.",
      },
    ],
    internalLinks: [
      { anchor: "wide-leg-trousers-story", futureSlug: "/editorial/wide-leg-trousers-2026", note: "the trouser to pair with a kurta" },
      { anchor: "fish-necklace-guide", futureSlug: "/editorial/fish-necklaces-statement-accessories-2026", note: "modern accessories" },
      { anchor: "our-lookbook", futureSlug: "/lookbook", note: "styling references" },
    ],
  },

  // ─────────────────────────────── #9 ───────────────────────────────
  {
    slug: "leather-jacket-spring-summer-2026",
    title: "Leather Jacket Styling",
    titleItalicTail: "for Spring and Summer 2026",
    eyebrow: "Style Report · Outerwear 2026",
    description:
      "The leather jacket has been reimagined for warmer weather. A US editor's guide to lightweight leathers, cropped cuts, and styling a jacket you'll wear through July.",
    keywords:
      "leather jacket spring 2026, lightweight leather jacket women, cropped leather jacket, moto jacket styling, summer leather outfit",
    datePublished: "2026-07-19",
    readMinutes: 7,
    lede:
      "The leather jacket has always been a fall garment. Not anymore. The 2026 iteration is thinner, lighter, cropped higher, and cut for exactly the seventy-degree evenings that used to leave a wardrobe stranded between a knit and a coat.",
    heroImagePrompt:
      "Editorial street-style shot of a woman in a cropped soft-tan lambskin jacket over a bias-cut silk slip dress, walking a Manhattan sidewalk at golden hour, natural light, 35mm film aesthetic, Vogue US influence.",
    blocks: [
      {
        type: "p",
        text: "The winter shearling still exists. But the story this year is the reinvented spring-summer leather — feather-light lambskin, cropped or waist-length, in colors that stretch well beyond the classic black. Tan, bone, chocolate, dove grey, and washed cognac have all appeared on the spring 2026 runways, and they behave beautifully as a lightweight layer over the summer dresses and rib tanks that dominate the season.",
      },
      { type: "h2", text: "What Makes a Leather Jacket 'Summer'" },
      { type: "h3", text: "Weight" },
      {
        type: "p",
        text: "A summer leather is unlined or half-lined and cut from a thinner hide — lambskin, deerskin, or a supple washed cowhide. It should fold into a small bag and feel breathable across the shoulders. Anything with a heavy quilted lining or a fleece collar belongs to a colder season.",
      },
      { type: "h3", text: "Length" },
      {
        type: "p",
        text: "The 2026 shape is either cropped (ending at the natural waist) or bomber-length (ending at the hip). The mid-thigh moto jacket has quietly stepped back — it reads too heavy for the current spring silhouette.",
      },
      {
        type: "img",
        prompt:
          "Editorial flat lay of three summer leather jackets — cropped soft-tan lambskin, bone unlined bomber, chocolate washed cowhide moto — on a warm oak floor with a slip dress, wide-leg trouser, and white sneakers, natural daylight.",
      },
      { type: "h2", text: "Colors That Wear All Summer" },
      {
        type: "p",
        text: "Black still works, but the strongest colors this year are soft tan, bone, and washed cognac. All three integrate seamlessly with slip dresses, rib tanks, denim, and tailored trousers. Chocolate and dove grey are the sleeper picks — quieter than black, richer than tan, and photograph beautifully in every kind of light.",
      },
      { type: "h2", text: "Three Styling Formulas" },
      { type: "h3", text: "Formula One — Cropped Leather + Slip Dress" },
      {
        type: "p",
        text: "A bias-cut silk slip dress with a cropped soft-tan leather jacket over the shoulders and ballet flats. The single most-photographed street-style outfit of the year.",
      },
      { type: "h3", text: "Formula Two — Bomber + Wide-Leg Trouser" },
      {
        type: "p",
        text: "A bone unlined leather bomber, a rib tank, wide-leg cream trousers, and minimal white leather sneakers. Reads polished for a weekend flight, a gallery visit, or a summer-evening dinner.",
      },
      { type: "h3", text: "Formula Three — Moto + Denim + Jersey" },
      {
        type: "p",
        text: "The Blokecore crossover: a chocolate washed-leather moto over a tucked football jersey, high-rise straight-leg jeans, and pointed leather loafers. Downtown, current, unmistakable.",
      },
      { type: "h2", text: "Care — the Detail Most People Skip" },
      {
        type: "p",
        text: "A summer leather jacket lives or dies by its treatment. Condition twice a year with a leather cream (not oil), hang on a padded hanger, and never dry-clean unless the label specifies. The right care will keep a good jacket wearable for fifteen years — which, at the price of quality leather, is the calculation that makes the purchase worth it.",
      },
    ],
    editorNote:
      "\"Skip black this time. A soft tan or washed cognac in a cropped or bomber cut will earn its place over slip dresses, rib tanks, and every summer outfit you already own. It's the layer that turns a warm-weather look into a photograph.\"",
    faqs: [
      {
        q: "Isn't a leather jacket too hot for summer?",
        a: "Not the current generation. A thin unlined or half-lined lambskin or deerskin jacket weighs almost nothing and breathes across the shoulders. Wear it for the seventy-degree evenings, and keep it in your bag for the cool restaurant interior.",
      },
      {
        q: "What's the best leather jacket color for a small wardrobe?",
        a: "Soft tan or washed cognac. Both colors pair with black, cream, chocolate, denim, and every neutral you already own — and they photograph as intentional rather than seasonal.",
      },
      {
        q: "How much should I spend on a summer leather jacket?",
        a: "A well-made lambskin or deerskin jacket from a reputable label falls between six hundred and two thousand dollars. Vintage from consignment can drop that meaningfully. A cheaper leather will crack within a season; the investment holds its shape and value for a decade.",
      },
    ],
    internalLinks: [
      { anchor: "skinny-jeans-alternatives", futureSlug: "/editorial/skinny-jeans-are-out-what-to-wear-instead", note: "the denim to wear underneath" },
      { anchor: "world-cup-jersey-styling", futureSlug: "/editorial/world-cup-jersey-styling-women-2026", note: "the Blokecore crossover" },
      { anchor: "our-lookbook", futureSlug: "/lookbook", note: "full outfit references" },
    ],
  },

  // ─────────────────────────────── #10 ───────────────────────────────
  {
    slug: "floral-prints-2026",
    title: "Floral Prints",
    titleItalicTail: "Making a Comeback This Season",
    eyebrow: "Print Report · Spring/Summer 2026",
    description:
      "Florals are back — but not the way you remember. A US editor's guide to the four 2026 floral prints defining spring and summer, and how to style them without cliché.",
    keywords:
      "floral prints 2026, floral dress trends, painterly florals, ditsy floral 2026, botanical prints women",
    datePublished: "2026-07-19",
    readMinutes: 7,
    lede:
      "Yes, florals — for spring — are groundbreaking, again. The 2026 print story is meaningfully different from the ditsy-floral moment of the late 2010s: bigger, painterly, moodier, and cut into silhouettes that finally let the print do the talking.",
    heroImagePrompt:
      "Editorial full-length shot of a woman in a painterly rose-and-charcoal floral silk midi dress, cognac ballet flats, small structured leather bag, walking a sunlit European boulevard, golden-hour light, Vogue US aesthetic.",
    blocks: [
      {
        type: "p",
        text: "The seasonal return of florals is not news. What is news is how differently the print reads in 2026. On the spring runways at Erdem, Ulla Johnson, Zimmermann, and Chloé, the floral was oversized, painterly, and set against saturated or moody backgrounds — a genuine departure from the sweet ditsy florals of the past decade.",
      },
      { type: "h2", text: "The Four Floral Prints Defining 2026" },
      { type: "h3", text: "1. The Painterly Rose" },
      {
        type: "p",
        text: "A single oversized rose (or a small cluster) rendered in an impressionist watercolor style, usually on a bone, cream, or dark background. Reads as art rather than pattern. Best on a bias-cut silk midi or a soft tailored blouse.",
      },
      { type: "h3", text: "2. The Moody Botanical" },
      {
        type: "p",
        text: "Dark-background florals — charcoal, deep navy, forest green — with saturated blooms scattered across the fabric. The grown-up floral of the year, and the print most likely to work into fall.",
      },
      { type: "h3", text: "3. The Micro Ditsy — Reworked" },
      {
        type: "p",
        text: "The ditsy floral has returned, but in a more considered form: tighter repeats, muted tonal color palettes, and cut into modern silhouettes (the sleeveless midi shift, the bias slip, the wide-leg trouser). Not the 2018 prairie dress.",
      },
      { type: "h3", text: "4. The Botanical Illustration" },
      {
        type: "p",
        text: "Line-drawn or engraved-style botanical prints — think antique herbarium — in tonal color palettes on cotton voile and silk-cotton. Reads as considered heritage rather than seasonal trend.",
      },
      {
        type: "img",
        prompt:
          "Editorial flat lay of four floral fabric swatches — painterly rose on cream, moody dark navy botanical, tonal micro ditsy in sage, engraved botanical on bone — on a warm oak surface, natural daylight.",
      },
      { type: "h2", text: "The Silhouettes That Suit the New Florals" },
      {
        type: "p",
        text: "The strongest floral pieces this year live on silhouettes that let the print breathe: the bias-cut silk midi, the fluid wide-leg trouser, the soft blouse with a defined shoulder. Skip the tiered prairie dress and the ruffle-shouldered mini — both silhouettes belong to a different floral moment.",
      },
      { type: "h2", text: "Three Styling Formulas" },
      { type: "h3", text: "Formula One — Painterly Midi + Ballet Flat" },
      {
        type: "p",
        text: "A painterly-rose silk midi with cognac ballet flats, a small structured leather bag, gold hoops. The most photographable summer outfit in the closet.",
      },
      { type: "h3", text: "Formula Two — Moody Botanical Blouse + Wide-Leg Trouser" },
      {
        type: "p",
        text: "A dark-background botanical silk blouse tucked into a cream wide-leg wool trouser, minimal leather loafers, one gold cuff. Reads instantly as considered dinner dressing.",
      },
      { type: "h3", text: "Formula Three — Micro Ditsy Slip + Leather Jacket" },
      {
        type: "p",
        text: "A tonal micro-ditsy silk slip dress with a cropped tan leather jacket over the shoulders and ballet flats. The evening version of the trend, wearable from a gallery opening through a late dinner.",
      },
      { type: "h2", text: "What to Avoid" },
      {
        type: "p",
        text: "Skip the neon floral, the head-to-toe matching floral suit, and the ditsy tiered mini-dress — all three belong to a floral moment that has passed. Choose one considered floral piece per outfit and let the rest of the look stay quiet. The print is the statement.",
      },
    ],
    editorNote:
      "\"Buy the moody botanical — the dark-background print in silk-cotton or cotton voile. It's the floral that wears into fall, styles with everything you already own, and photographs as considered rather than seasonal. One piece, three years of wear.\"",
    faqs: [
      {
        q: "Are big florals really flattering?",
        a: "The 2026 painterly and botanical prints, placed on fluid silhouettes like the bias midi or the wide-leg trouser, are unusually flattering because the drape carries the print. Avoid stiff fabrics — that is where floral prints stop working.",
      },
      {
        q: "Can I wear florals to the office?",
        a: "A moody-background botanical blouse tucked into a tailored trouser is entirely office-appropriate. Save the painterly midi and the slip dress for after-hours and weekends.",
      },
      {
        q: "What's the best floral to buy first?",
        a: "A dark-background botanical silk-cotton blouse. It layers with denim, tucks into trousers, works over a slip skirt, and integrates seamlessly with the neutrals you already own.",
      },
    ],
    internalLinks: [
      { anchor: "babydoll-daytime-styling", futureSlug: "/editorial/babydoll-sleep-dress-daytime-styling", note: "the softer summer silhouette" },
      { anchor: "leather-jacket-styling", futureSlug: "/editorial/leather-jacket-spring-summer-2026", note: "the layer that finishes a slip dress" },
      { anchor: "our-lookbook", futureSlug: "/lookbook", note: "full styled looks" },
    ],
  },
];

export function getEditorialBySlug(slug: string): Editorial | undefined {
  return EDITORIALS.find((e) => e.slug === slug);
}
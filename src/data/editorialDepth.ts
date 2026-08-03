import type { Block } from "./editorials10";

/**
 * Deep-research expansion layer for the 2026 editorial series.
 * Each entry adds US-market context (July/August 2026), a sourcing and care
 * data table, an H4-level buying breakdown, and two additional FAQs so every
 * editorial carries a five-question FAQ block.
 */
export type Depth = { blocks: Block[]; faqs: { q: string; a: string }[] };

const careHeaders = ["Fabric", "Typical composition", "Certification to look for", "Care"];

export const DEPTH: Record<string, Depth> = {
  "babydoll-sleep-dress-daytime-styling": {
    blocks: [
      { type: "h2", text: "The US Market Picture: What Changed Between Spring and August 2026" },
      {
        type: "p",
        text: "American retail moved faster on this silhouette than any other dress shape this year. Through spring, the babydoll sat in the sleepwear and intimates category on most department-store floors; by midsummer it had migrated to contemporary ready-to-wear, priced between $180 and $520 and merchandised beside tailoring rather than beside robes. That relocation matters more than any runway image, because it tells you how the buyer expects the piece to be worn: as a daytime dress with structure nearby, not as a novelty.",
      },
      {
        type: "p",
        text: "The second shift is fabric weight. The dresses arriving for the August delivery are noticeably heavier — 110 to 140 grams per square metre of cotton voile rather than the 70 to 90 gsm of the 2010s version. That extra weight is what allows the dress to skim rather than cling in humidity, which is precisely why it reads as sustainable luxury clothing rather than a seasonal impulse. Heavier cloth also survives more wash cycles, and cost-per-wear is now the argument American shoppers make out loud.",
      },
      { type: "h3", text: "Fabric, Certification, and Care" },
      {
        type: "p",
        text: "If you buy one babydoll dress this year, buy the one whose fabric you can identify by name. Certification is the fastest shortcut: GOTS governs organic fibre content and the chemistry used across the whole supply chain, while OEKO-TEX Standard 100 certifies the finished garment as free of a defined list of harmful substances. The two are complementary rather than interchangeable, and the better American labels now print both on the care label.",
      },
      {
        type: "table",
        caption: "Babydoll dress fabrics: composition, certification, and care",
        headers: careHeaders,
        rows: [
          ["Cotton voile", "100% organic cotton, 110–130 gsm", "GOTS 6.0", "Cold machine wash, line dry, warm iron while damp"],
          ["Silk-cotton", "55% silk / 45% cotton", "OEKO-TEX Standard 100 Class II", "Hand wash or delicate cycle in a mesh bag, dry flat"],
          ["Swiss dot cotton", "100% cotton with woven dot", "GOTS or OEKO-TEX", "Cold wash, low tumble, steam rather than press the dots"],
          ["Linen-cotton", "55% linen / 45% cotton", "European Flax plus OEKO-TEX", "Warm wash, shake out damp, embrace the crease"],
        ],
      },
      { type: "h4", text: "What to check before you pay" },
      {
        type: "ul",
        items: [
          "French seams or flat-felled seams at the side — overlocked raw edges signal a short life.",
          "An empire seam that is topstitched, not just pressed; it holds the gather after washing.",
          "Opacity tested in daylight, not shop light. Two layers at the skirt is the standard for a daytime dress.",
          "A hem deep enough to let down half an inch, which is what makes the dress work across three summers.",
        ],
      },
      { type: "h2", text: "Building the Dress Into a Modern Capsule Wardrobe" },
      {
        type: "p",
        text: "A babydoll earns capsule status only if it connects to at least four pieces you already own. In practice that means a fine rib tank, an unlined blazer, a slim leather belt, and one flat shoe in a neutral you actually wear. With those four anchors, a single dress produces a weekday lunch outfit, a gallery-evening outfit, a travel outfit, and a genuine off-duty outfit — the effortless off-duty formula American editors have been quietly rebuilding all year.",
      },
      {
        type: "p",
        text: "The failure mode is buying the dress and no anchors. That is the purchase that hangs unworn, and it is the same mistake that made the skinny-jean wardrobe collapse: one silhouette with nothing to speak to. Buy the dress and the tank in the same order, and the dress leaves the closet.",
      },
    ],
    faqs: [
      {
        q: "How do I wear a babydoll dress without looking like I'm in nightwear?",
        a: "Add one structured element and one hard material. A soft unlined blazer supplies the structure; a leather belt, a flat leather sandal, or a rigid straw bag supplies the hard material. With both present, no observer reads the dress as sleepwear, regardless of fabric.",
      },
      {
        q: "Is the babydoll dress a lasting trend or a 2026 moment?",
        a: "The silhouette is cyclical rather than novel, which is why it endures. The specific 2026 markers — heavier cloth, mid-thigh to knee length, deliberate layering — are what will date. Buy the fabric and the length rather than the styling and the dress stays wearable well beyond this year.",
      },
    ],
  },

  "world-cup-jersey-styling-women-2026": {
    blocks: [
      { type: "h2", text: "The US Market Picture: A Tournament Summer Rewrites the Category" },
      {
        type: "p",
        text: "The 2026 tournament hosted across North America did something no marketing budget could: it made the football jersey a mainstream American women's separates category. Through July, resale platforms reported the sharpest listing growth in vintage and reissue jerseys of any single garment type, and by August the mainstream contemporary retailers were merchandising jerseys against satin skirts and tailored trousers rather than against athletic shorts. The jersey stopped being fan merchandise and became a top.",
      },
      {
        type: "p",
        text: "For the reader, the practical consequence is sizing. Modern women's fit jerseys run close to the body and short in the torso; men's and unisex cuts run boxy with a dropped shoulder. Both work, but they produce entirely different outfits, and buying the wrong one is the single most common reason a jersey look fails.",
      },
      { type: "h3", text: "Fabric, Certification, and Care" },
      {
        type: "p",
        text: "Almost every performance jersey is recycled polyester, which is where sustainability claims begin and end unless the label goes further. The credible markers are the Global Recycled Standard for verified recycled content and OEKO-TEX Standard 100 for chemical safety. Because polyester sheds microfibres, care is not a footnote here — washing in a filter bag is the highest-impact thing an owner can actually do.",
      },
      {
        type: "table",
        caption: "Jersey fabrics: composition, certification, and care",
        headers: careHeaders,
        rows: [
          ["Performance knit", "100% recycled polyester", "Global Recycled Standard", "Cold wash inside out in a microfibre bag, never fabric softener"],
          ["Retro cotton jersey", "100% cotton, 180–200 gsm", "GOTS or OEKO-TEX", "Cold wash, line dry, no tumble to protect the print"],
          ["Cotton-modal blend", "60% cotton / 40% modal", "OEKO-TEX Standard 100", "Cool wash, low tumble, cool iron on the reverse"],
          ["Mesh panel", "Recycled polyester mesh", "Global Recycled Standard", "Hand wash, dry flat, avoid direct heat"],
        ],
      },
      { type: "h4", text: "How to buy a jersey that reads as fashion" },
      {
        type: "ul",
        items: [
          "Choose a single-colour or two-tone kit over a busy sponsor-heavy print.",
          "Look for a set-in sleeve rather than raglan; it sits closer to a shirt shoulder line.",
          "Sleeve length matters more than body length — mid-bicep photographs best.",
          "Vintage reissues in cotton drape better with skirts; performance knit belongs with denim and trousers.",
        ],
      },
      { type: "h2", text: "Where the Jersey Sits in an Off-Duty Wardrobe" },
      {
        type: "p",
        text: "Treat the jersey exactly as you would a striped Breton or a well-worn band tee: a graphic top that carries the personality of an outfit whose other pieces are quiet. Paired with a bias satin skirt and a flat sandal it becomes an evening look; half-tucked into a wide-leg trouser with a loafer it is a credible summer-office outfit in the more relaxed American offices; with a denim maxi and a leather sandal it is the weekend uniform.",
      },
      {
        type: "p",
        text: "What it should not do is compete. One graphic per outfit remains the governing rule of sporty-chic dressing, and the jersey is a loud graphic. Everything else in the look should be solid, tonal, and quietly cut.",
      },
    ],
    faqs: [
      {
        q: "Should I size up or down in a football jersey?",
        a: "For a tucked, fitted look, buy the women's cut in your true size. For a relaxed half-tuck over a wide-leg trouser, take a men's or unisex jersey one size below your usual men's equivalent — the dropped shoulder supplies the volume without swamping the frame.",
      },
      {
        q: "Can I wear a jersey somewhere dressy?",
        a: "Yes, with a bias-cut satin skirt, a fine gold chain, and a heeled sandal. The shine of the satin reframes the jersey as a deliberate texture contrast rather than sportswear, which is the whole point of sporty-chic dressing in 2026.",
      },
    ],
  },

  "skinny-jeans-are-out-what-to-wear-instead": {
    blocks: [
      { type: "h2", text: "The US Market Picture: Where Denim Actually Landed by August 2026" },
      {
        type: "p",
        text: "The most useful denim data of the year came not from the runway but from American resale and markdown behaviour. Straight, barrel, and wide legs held full price through July, while skinny fits carried the deepest and earliest markdowns of any denim cut. That is a more honest signal than any trend headline: retailers discount the cut they cannot sell at full margin, and the American consumer has decisively moved to a fuller leg.",
      },
      {
        type: "p",
        text: "The nuance is that skinny denim has not vanished — it has been demoted to a layering piece, worn under longer coats and tall boots in the colder months. What is genuinely finished is the skinny jean as a wardrobe default, the piece around which every other purchase was planned.",
      },
      { type: "h3", text: "Fabric, Certification, and Care" },
      {
        type: "p",
        text: "The fuller silhouettes work because they are cut in rigid or low-stretch denim, which is also the more durable and more repairable cloth. Look for GOTS-certified organic cotton where the denim is rigid, and OEKO-TEX certification on any indigo dye process. Cotton denim with under two per cent elastane can be repaired and re-hemmed; heavy-stretch denim cannot, which is the quiet sustainability argument for the new cuts.",
      },
      {
        type: "table",
        caption: "Denim by cut: composition, certification, and care",
        headers: careHeaders,
        rows: [
          ["Rigid straight leg", "100% cotton, 12–14 oz", "GOTS plus OEKO-TEX indigo", "Wash cold and rarely, hang dry, spot clean between wears"],
          ["Barrel leg", "99% cotton / 1% elastane", "OEKO-TEX Standard 100", "Cold wash inside out, line dry to protect the curve of the leg"],
          ["Wide leg / trouser jean", "100% cotton, 10–12 oz", "GOTS", "Cold wash, hang by the waistband, steam the crease back in"],
          ["Selvedge tapered", "100% cotton, 13–15 oz raw", "OEKO-TEX", "Minimal washing, air out, professional wash once a season"],
        ],
      },
      { type: "h4", text: "The three replacements worth owning" },
      {
        type: "ul",
        items: [
          "One rigid straight leg in a mid indigo — the closest thing to a lifetime jean.",
          "One wide-leg trouser jean in ecru or off-white for warm months and tonal dressing.",
          "One barrel or curved leg in a darker wash for the outfits that need a point of view.",
        ],
      },
      { type: "h2", text: "Proportion Rules That Make Fuller Denim Work" },
      {
        type: "p",
        text: "Volume below demands restraint above. A fitted rib tank, a fine knit, a tucked poplin shirt, or a cropped structured jacket all balance a wide leg; an oversized sweatshirt over a wide leg reads as pyjamas in daylight. The second rule is hemline: the denim should break just above the sole of your shoe, and any pair worth keeping is worth paying a tailor to shorten.",
      },
      {
        type: "p",
        text: "Footwear is the third lever. A slight lift — a loafer with a stacked heel, a mule, a mid-block sandal — restores the leg line that fuller denim absorbs. Flat ballet shoes work with cropped hems only, which is where most wide-leg outfits go wrong.",
      },
    ],
    faqs: [
      {
        q: "Should I throw out my skinny jeans?",
        a: "No. Keep one dark, well-fitting pair for layering under boots and long coats in winter. Stop buying replacements and redirect the budget to a rigid straight leg, which will carry far more of your outfits.",
      },
      {
        q: "What jean cut is most flattering if I am petite?",
        a: "A straight leg cropped to just above the ankle bone, worn with a shoe that shows some instep. The uninterrupted vertical line does the work; the cropped hem prevents the fabric from stacking and shortening the leg.",
      },
    ],
  },

  "tailored-loungewear-sets-2026": {
    blocks: [
      { type: "h2", text: "The US Market Picture: Loungewear Grew Up" },
      {
        type: "p",
        text: "Five years of American hybrid work produced a category that did not previously exist: clothing engineered for a home office that also has to survive a lunch outside it. Through 2026 the successful sets are the ones cut like ready-to-wear — set-in sleeves, a proper shoulder, a waistband with a facing rather than an exposed elastic — in fabrics with recovery. Priced from $220 to $600 for the pair, they are being bought as separates and worn apart far more often than together.",
      },
      {
        type: "p",
        text: "That last point is the buying insight. A set is only worth its price if each half works alone: the trouser with a poplin shirt, the top with denim. Sets that only function as a matched pair are a costume, and American shoppers have learned to test for this in the fitting room.",
      },
      { type: "h3", text: "Fabric, Certification, and Care" },
      {
        type: "p",
        text: "The fabrics that make tailored loungewear feel expensive are the ones with a controlled drape and a matte surface. Tencel lyocell and cupro both come from regenerated cellulose and both drape beautifully; look for Lenzing-certified lyocell with FSC-managed pulp, and OEKO-TEX on the finished garment. Fine merino is the cold-weather equivalent, and the mulesing-free declaration is the standard to demand.",
      },
      {
        type: "table",
        caption: "Loungewear fabrics: composition, certification, and care",
        headers: careHeaders,
        rows: [
          ["Tencel lyocell twill", "100% lyocell", "Lenzing Tencel plus FSC pulp", "Cool delicate wash, dry flat, steam rather than iron"],
          ["Cupro-viscose blend", "70% cupro / 30% viscose", "OEKO-TEX Standard 100", "Hand wash cool, dry flat away from sun"],
          ["Fine merino knit", "100% extra-fine merino, 17.5 micron", "Responsible Wool Standard, mulesing-free", "Wool cycle or hand wash, dry flat, never hang"],
          ["Cotton-silk jersey", "80% cotton / 20% silk", "GOTS cotton plus OEKO-TEX", "Cold wash in a mesh bag, low tumble, cool iron"],
        ],
      },
      { type: "h4", text: "The fitting-room test" },
      {
        type: "ul",
        items: [
          "Sit down in the trouser: the waistband should not roll or gap at the back.",
          "Raise both arms: a real set has an armhole high enough that the hem does not lift.",
          "Check the fabric against light for recovery — pinch and release; a good cloth returns flat.",
          "Photograph yourself. Matte fabrics that look luxurious in person can read cheap on camera, and this is a video-call wardrobe.",
        ],
      },
      { type: "h2", text: "Six Outfits From One Set" },
      {
        type: "p",
        text: "Worn together with a mule, the set is a monochrome column that reads as tailoring. The trouser alone, with a crisp cotton shirt and a loafer, is an office outfit. The top alone over rigid straight denim is a weekend outfit. Add a leather belt and a structured tote and the same pieces carry a client meeting. The value of a set is arithmetic: two garments producing six credible outfits is the definition of a modern capsule wardrobe.",
      },
      {
        type: "p",
        text: "Colour discipline makes the arithmetic work. Buy the first set in a deep neutral — charcoal, espresso, bone, or navy — and save the colour experiment for the second. Neutral sets integrate with everything already hanging in the closet, which is the entire point.",
      },
    ],
    faqs: [
      {
        q: "Is tailored loungewear appropriate for the office?",
        a: "In most American hybrid workplaces, yes, provided the fabric is matte and the fit is deliberate. Add a hard accessory — a leather belt, a structured bag, a loafer — and the set reads as soft tailoring rather than as leisurewear.",
      },
      {
        q: "How do I stop knit sets from pilling?",
        a: "Wash cold on a wool or delicate cycle, always inside out and in a mesh bag, dry flat, and rest the garment a day between wears. Pilling is friction damage, and rest plus low-agitation washing prevents most of it.",
      },
    ],
  },

  "jelly-heels-summer-2026-trend": {
    blocks: [
      { type: "h2", text: "The US Market Picture: A Novelty Shoe With Real Sell-Through" },
      {
        type: "p",
        text: "Jelly footwear returned as a runway curiosity and stayed because it solved a genuine American summer problem: a heel that survives rain, boardwalks, boat decks, and city humidity without staining or warping. Through July and August 2026 the strongest sell-through sat in the mid-height block and kitten shapes rather than the stiletto, and in translucent smoke, amber, and clear rather than bright colour — the palette that lets a novelty material behave like a neutral.",
      },
      {
        type: "p",
        text: "Price stratification is unusually wide, from $60 mass-market pairs to $700 designer editions. The material cost difference is smaller than the price gap suggests; what you pay for at the top is the footbed, the last, and the strap engineering, all three of which determine whether the shoe is wearable past an hour.",
      },
      { type: "h3", text: "Material, Certification, and Care" },
      {
        type: "p",
        text: "The sustainability question with jelly footwear is real and worth asking directly. Traditional PVC is the least defensible option; bio-based TPU and recycled EVA are meaningfully better, and a handful of labels now publish recycled content verified to the Global Recycled Standard. Since these shoes are moulded rather than stitched, repairability is limited — durability of the sole and the strap attachment is where longevity actually lives.",
      },
      {
        type: "table",
        caption: "Jelly footwear materials: composition, certification, and care",
        headers: careHeaders,
        rows: [
          ["Recycled EVA", "Moulded recycled ethylene-vinyl acetate", "Global Recycled Standard", "Rinse in cool water, air dry out of sunlight"],
          ["Bio-based TPU", "Partly plant-derived thermoplastic polyurethane", "OEKO-TEX Eco Passport on inputs", "Wipe with mild soap, avoid solvents and alcohol"],
          ["Recycled PVC", "Post-industrial PVC", "Recycled content declaration only", "Cool rinse, never leave in a hot car — heat deforms the last"],
          ["Leather-lined jelly", "TPU upper with vegetable-tanned leather footbed", "Leather Working Group tannery", "Air out after each wear, condition the footbed seasonally"],
        ],
      },
      { type: "h4", text: "How to make a jelly heel look expensive" },
      {
        type: "ul",
        items: [
          "Choose translucent smoke, amber, or clear over saturated brights.",
          "Take the block or kitten heel; the stiletto in this material always reads costume.",
          "Insist on a lined or padded footbed — unlined moulded shoes stick to skin in heat.",
          "Wear with tailored trousers, a bias midi, or a linen suit, never with an already playful outfit.",
        ],
      },
      { type: "h2", text: "Where the Shoe Belongs" },
      {
        type: "p",
        text: "The jelly heel is at its best as the single unexpected element in an otherwise disciplined outfit: an ecru linen suit, a slate bias-cut midi, a white poplin shirt and rigid straight denim. The contrast between serious clothing and a frankly playful shoe is the entire proposition. Two playful elements and the look collapses into novelty.",
      },
      {
        type: "p",
        text: "Practically, plan for a break-in that does not exist. Moulded footwear does not soften the way leather does, so buy the size that is comfortable in the shop, add a thin leather insole if needed, and keep them for days measured in hours rather than in miles.",
      },
    ],
    faqs: [
      {
        q: "Are jelly heels actually comfortable?",
        a: "Only if the footbed is padded or leather-lined and the heel is block or kitten height. Unlined moulded pairs grip damp skin and do not stretch, so size for comfort on the day and expect no break-in period.",
      },
      {
        q: "Can jelly shoes be worn to a wedding or a formal event?",
        a: "For a daytime outdoor or coastal wedding, a smoke or amber block-heel pair with a fluid midi is entirely appropriate and considerably more practical on grass than a stiletto. For formal evening dress codes, choose leather.",
      },
    ],
  },
};

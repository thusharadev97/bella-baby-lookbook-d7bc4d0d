# Fix the Author card (sidebar)

## What changes

**1. Portrait that never appears broken**
Keep the real founder headshot (it is hosted and loading fine on the CDN), but wrap it in a small reusable `FounderAvatar` component that:
- renders the uploaded portrait in a circular frame with a thin gold/ink hairline ring and soft inner shadow,
- falls back to an elegant serif "TS" monogram on a blush background if the image ever fails to load,
- uses `loading="lazy"`, explicit width/height, and `object-cover object-top` so the crop stays flattering.

The same component replaces the raw `<img>` usages in the journal and editorial article bylines, so a broken image can't appear anywhere.

**2. Contact email in the author card**
Add a clearly visible `contact@bellanbaby.shop` line to the Author card, styled as a small uppercase label + serif mailto link, sitting directly above the social icon row and separated by a hairline rule.

**3. Editorial layout polish**
- Slightly larger portrait (72–80px), more generous card padding, tighter name/role stack.
- Name in the display serif, role in wide-tracked uppercase micro-caps.
- Bio copy updated to match the site's adult fashion positioning (currently still says "kids and baby fashion").
- Balanced vertical rhythm: eyebrow → portrait row → bio → hairline → email → socials.

## Technical notes
- New file: `src/components/FounderAvatar.tsx` (uses `src/assets/founder.jpg.asset.json`, `onError` state fallback).
- Edit `src/components/Sidebar.tsx` for the card layout + email.
- Swap the two `<img src={founderAsset.url}>` byline usages in `src/routes/journal.$slug.tsx` and `src/routes/editorial.$slug.tsx` to the new component.
- All colors stay on existing CSS variable tokens; no new hardcoded colors.

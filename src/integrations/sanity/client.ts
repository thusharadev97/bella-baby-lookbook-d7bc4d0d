import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const SANITY_PROJECT_ID = "ktdhlkkl";
export const SANITY_DATASET = "production";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-10-01",
  useCdn: true,
  perspective: "published",
});

const builder = imageUrlBuilder(sanityClient);

type ImageSource = Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0];

export function urlFor(source: ImageSource) {
  return builder.image(source).auto("format").fit("crop");
}

/** Safe width-based URL; returns null when the asset reference is unusable. */
export function imageUrl(source: unknown, width: number, height?: number): string | null {
  if (!source) return null;
  try {
    const b = urlFor(source as ImageSource).width(width).quality(80);
    return (height ? b.height(height) : b).url();
  } catch {
    return null;
  }
}

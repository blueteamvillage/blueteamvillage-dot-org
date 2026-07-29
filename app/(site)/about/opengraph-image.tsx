import { getPage } from "@/lib/contentful";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const alt = "About Blue Team Village";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const page = await getPage("about");
  return renderOgCard({
    eyebrow: "Who we are",
    title: page?.heroHeading ?? "About Blue Team Village",
    sub: page?.heroSubheading ?? page?.seoDescription,
  });
}

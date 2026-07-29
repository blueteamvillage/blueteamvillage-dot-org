import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";
import { getCurrentEvent } from "@/lib/contentful";

/* Inherited by every route under (site) that doesn't declare its own card. */
export const alt =
  "Blue Team Village — welcome to the other side of the hacking mirror";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const current = await getCurrentEvent();
  return renderOgCard({
    eyebrow: current?.title ?? "Blue Team Village",
    title: "The other side of the hacking mirror.",
    sub: "A place and a community built for and by defenders — learning, sharing, and support for all cyber defenders.",
  });
}

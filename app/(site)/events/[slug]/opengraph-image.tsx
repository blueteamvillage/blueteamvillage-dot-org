import { notFound } from "next/navigation";
import { getEvent, getEvents } from "@/lib/contentful";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const alt = "Blue Team Village event";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/* Without this the card would be rendered per request instead of at build. */
export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  return renderOgCard({
    eyebrow: event.dateRange,
    title: event.title,
    sub: event.tagline,
  });
}

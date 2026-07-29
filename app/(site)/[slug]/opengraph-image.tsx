import { notFound } from "next/navigation";
import { getPage, getPages } from "@/lib/contentful";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const alt = "Blue Team Village";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/* Mirrors the page route: /about has its own segment, so it isn't listed here. */
export async function generateStaticParams() {
  const pages = await getPages();
  return pages.filter((p) => p.slug !== "about").map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return renderOgCard({
    eyebrow: "Blue Team Village",
    title: page.heroHeading ?? page.title,
    sub: page.heroSubheading ?? page.seoDescription,
  });
}

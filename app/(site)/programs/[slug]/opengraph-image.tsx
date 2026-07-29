import { notFound } from "next/navigation";
import { getProgram, getPrograms } from "@/lib/contentful";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const alt = "Blue Team Village program";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) notFound();

  return renderOgCard({
    eyebrow: "BTV Program",
    title: program.name,
    sub: program.summary,
  });
}

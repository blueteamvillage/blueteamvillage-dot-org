import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { getPrograms } from "@/lib/contentful";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Blue Team Village programs — directed by BTV Directors and built by volunteers, running year-round.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        heading="Programs"
        sub="BTV programs are directed by BTV Directors and staffed by volunteers who develop, run, and implement them — year-round, not just at DEF CON."
      />
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 px-6 md:grid-cols-2">
        {programs.map((p) => (
          <Link
            key={p.slug}
            href={`/programs/${p.slug}`}
            className="rounded-lg border border-white/[0.06] bg-navy-card p-6 transition-colors hover:border-white/20"
          >
            <h2 className="text-2xl font-black text-white">{p.name}</h2>
            <p className="mt-3 leading-relaxed text-mist">{p.summary}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-teal-bright">
              Learn more
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

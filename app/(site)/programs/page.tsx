import type { Metadata } from "next";
import Link from "next/link";
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
        logLine="[btv] programs"
        heading="Programs"
        sub="BTV programs are directed by BTV Directors and staffed by volunteers who develop, run, and implement them — year-round, not just at DEF CON."
      />
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 px-4 md:grid-cols-2">
        {programs.map((p) => (
          <Link
            key={p.slug}
            href={`/programs/${p.slug}`}
            className="rounded-lg border border-teal/60 bg-navy p-6 hover:border-mint"
          >
            <h2 className="text-2xl font-black text-foam">{p.name}</h2>
            <p className="mt-3 text-mist">{p.summary}</p>
            <p className="mt-4 font-bold text-mint">Learn more →</p>
          </Link>
        ))}
      </div>
    </>
  );
}

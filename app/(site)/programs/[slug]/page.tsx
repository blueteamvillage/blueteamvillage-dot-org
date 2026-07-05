import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/rich-text";
import { getProgram, getPrograms, getSiteSettings } from "@/lib/contentful";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return {};
  return { title: program.name, description: program.summary };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const [program, settings] = await Promise.all([
    getProgram(slug),
    getSiteSettings(),
  ]);
  if (!program) notFound();

  return (
    <article>
      <PageHeader
        logLine={`[btv] program: ${program.slug}`}
        heading={program.name}
        sub={program.summary}
      />
      <div className="mx-auto max-w-4xl px-4">
        {program.disciplines.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2">
            {program.disciplines.map((d) => (
              <li
                key={d}
                className="rounded-full border border-cyan px-4 py-1.5 text-sm font-bold text-foam"
              >
                {d}
              </li>
            ))}
          </ul>
        )}

        <Prose body={program.body} />

        <div className="mt-10 flex flex-wrap gap-3">
          {program.intakeFormUrl && (
            <a
              href={program.intakeFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-gold px-5 py-3 font-black text-abyss hover:brightness-110"
            >
              Sign up ↗
            </a>
          )}
          <a
            href={settings.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-mint px-5 py-3 font-bold text-mint hover:bg-mint hover:text-abyss"
          >
            Join the Discord ↗
          </a>
        </div>
      </div>
    </article>
  );
}

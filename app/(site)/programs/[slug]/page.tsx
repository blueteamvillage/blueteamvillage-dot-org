import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/rich-text";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProgram, getPrograms, getSiteSettings } from "@/lib/contentful";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const revalidate = 3600;

/** Project Obsidian and the CTF are one program, so its page leads to the CTF. */
const OBSIDIAN_SLUG = "project-obsidian";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return {};
  return pageMeta({
    title: program.name,
    description: program.summary,
    path: `/programs/${program.slug}`,
  });
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
      <JsonLd
        data={breadcrumbSchema([
          ["Home", "/"],
          ["Programs", "/programs"],
          [program.name, `/programs/${program.slug}`],
        ])}
      />
      <PageHeader
        eyebrow="Program"
        heading={program.name}
        sub={program.summary}
      />
      <div className="mx-auto max-w-4xl px-6">
        {program.disciplines.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2">
            {program.disciplines.map((d) => (
              <li key={d}>
                <Badge variant="outline">{d}</Badge>
              </li>
            ))}
          </ul>
        )}

        <Prose body={program.body} />

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {program.slug === OBSIDIAN_SLUG && (
            <Button asChild size="lg">
              <a
                href={settings.ctfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Play the CTF ↗
              </a>
            </Button>
          )}
          {program.intakeFormUrl && (
            <Button asChild size="lg">
              <a
                href={program.intakeFormUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign up ↗
              </a>
            </Button>
          )}
          <Button asChild size="lg" variant="outline">
            <a
              href={settings.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Discord ↗
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

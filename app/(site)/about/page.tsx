import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/rich-text";
import { Timeline } from "@/components/site/timeline";
import { getPage } from "@/lib/contentful";
import { fallbackMilestones } from "@/lib/fallback-content";
import { pageMeta } from "@/lib/seo";

export const revalidate = 3600;

/*
 * About has its own route rather than falling through to [slug] because it
 * appends the history timeline after the CMS body. The static segment wins
 * over the dynamic one, and [slug] skips this slug in generateStaticParams.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("about");
  return pageMeta({
    title: page?.title ?? "About",
    description: page?.seoDescription,
    path: "/about",
  });
}

export default async function AboutPage() {
  const page = await getPage("about");
  if (!page) notFound();

  return (
    <article>
      <PageHeader
        eyebrow="Who we are"
        heading={page.heroHeading ?? page.title}
        sub={page.heroSubheading}
      />
      <div className="mx-auto max-w-4xl px-6">
        <Prose body={page.body} />
        <Timeline milestones={fallbackMilestones} />
      </div>
    </article>
  );
}

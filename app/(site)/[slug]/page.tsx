import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/rich-text";
import { getPage, getPages } from "@/lib/contentful";
import { pageMeta } from "@/lib/seo";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

/* "about" has its own route (it appends the history timeline), so exclude it
 * here — generating it in both places is a duplicate-route build error. */
const OWN_ROUTE = new Set(["about"]);

export async function generateStaticParams() {
  const pages = await getPages();
  return pages
    .filter((p) => !OWN_ROUTE.has(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return pageMeta({
    title: page.title,
    description: page.seoDescription,
    path: `/${page.slug}`,
  });
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <article>
      <PageHeader
        eyebrow={page.title}
        heading={page.heroHeading ?? page.title}
        sub={page.heroSubheading}
      />
      <div className="mx-auto max-w-4xl px-6">
        <Prose body={page.body} />
      </div>
    </article>
  );
}

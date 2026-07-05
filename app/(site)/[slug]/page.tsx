import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/rich-text";
import { getPage, getPages } from "@/lib/contentful";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return { title: page.title, description: page.seoDescription };
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <article>
      <PageHeader
        logLine={`[btv] page: ${page.slug}`}
        heading={page.heroHeading ?? page.title}
        sub={page.heroSubheading}
      />
      <div className="mx-auto max-w-4xl px-4">
        <Prose body={page.body} />
      </div>
    </article>
  );
}

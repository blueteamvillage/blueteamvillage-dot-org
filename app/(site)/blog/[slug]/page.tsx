import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/rich-text";
import { JsonLd } from "@/components/seo/json-ld";
import { getPost, getPosts, getSiteSettings } from "@/lib/contentful";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { articleMeta } from "@/lib/seo";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return articleMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    publishedTime: post.publishDate,
    authors: post.authorHandle ? [post.authorHandle] : undefined,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPost(slug),
    getSiteSettings(),
  ]);
  if (!post) notFound();

  return (
    <article>
      <JsonLd data={articleSchema(post, settings)} />
      <JsonLd
        data={breadcrumbSchema([
          ["Home", "/"],
          ["Blog", "/blog"],
          [post.title, `/blog/${post.slug}`],
        ])}
      />
      <PageHeader
        eyebrow={`${post.publishDate}${post.authorHandle ? ` · by ${post.authorHandle}` : ""}`}
        heading={post.title}
      />
      <div className="mx-auto max-w-4xl px-6">
        <Prose body={post.body} />
      </div>
    </article>
  );
}

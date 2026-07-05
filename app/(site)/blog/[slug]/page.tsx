import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/rich-text";
import { getPost, getPosts } from "@/lib/contentful";

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
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <PageHeader
        logLine={`[post] ${post.publishDate}${post.authorHandle ? ` :: by ${post.authorHandle}` : ""}`}
        heading={post.title}
      />
      <div className="mx-auto max-w-4xl px-4">
        <Prose body={post.body} />
      </div>
    </article>
  );
}

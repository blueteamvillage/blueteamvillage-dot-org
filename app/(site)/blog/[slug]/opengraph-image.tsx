import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/contentful";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const alt = "Blue Team Village blog post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return renderOgCard({
    eyebrow: "BTV Blog",
    title: post.title,
    sub: post.excerpt,
  });
}

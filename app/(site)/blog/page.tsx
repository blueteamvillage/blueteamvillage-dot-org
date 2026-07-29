import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getPosts } from "@/lib/contentful";
import { pageMeta } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description: "News and notes from Blue Team Village.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        eyebrow="From the village"
        heading="Blog"
        sub="News and notes from the village."
      />
      <div className="mx-auto mt-12 max-w-4xl space-y-4 px-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-lg border border-white/[0.06] bg-navy-card p-6 transition-colors hover:border-white/20"
          >
            <p className="font-mono text-sm text-teal-bright">
              {post.publishDate}
            </p>
            <h2 className="mt-2 text-xl font-black text-white">{post.title}</h2>
            <p className="mt-2 leading-relaxed text-mist">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

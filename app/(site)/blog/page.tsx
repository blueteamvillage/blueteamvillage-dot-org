import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getPosts } from "@/lib/contentful";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description: "News and notes from Blue Team Village.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        logLine="[btv] blog"
        heading="Blog"
        sub="News and notes from the village."
      />
      <div className="mx-auto mt-12 max-w-4xl space-y-4 px-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-lg border border-teal/60 bg-navy p-6 hover:border-mint"
          >
            <p className="log-line">[post] {post.publishDate}</p>
            <h2 className="mt-2 text-xl font-black text-foam">{post.title}</h2>
            <p className="mt-2 text-mist">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

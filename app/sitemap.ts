import type { MetadataRoute } from "next";
import { getEvents, getPages, getPosts, getPrograms } from "@/lib/contentful";
import { SITE_URL } from "@/lib/seo";

/*
 * CMS pages whose slug is also a hand-built route. Listing both would put the
 * same URL in the sitemap twice, which reads as duplicate content.
 */
const HAND_BUILT = new Set(["about", "donate"]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, events, programs, posts] = await Promise.all([
    getPages(),
    getEvents(),
    getPrograms(),
    getPosts(),
  ]);

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/events`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/programs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/donate`, changeFrequency: "yearly", priority: 0.6 },
    ...pages
      .filter((p) => !HAND_BUILT.has(p.slug))
      .map((p) => ({
        url: `${SITE_URL}/${p.slug}`,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
    ...events.map((e) => ({
      url: `${SITE_URL}/events/${e.slug}`,
      // The upcoming event changes often; past years are settled records.
      changeFrequency: e.isCurrent ? ("weekly" as const) : ("yearly" as const),
      priority: e.isCurrent ? 0.9 : 0.4,
    })),
    ...programs.map((p) => ({
      url: `${SITE_URL}/programs/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.publishDate ? new Date(p.publishDate) : undefined,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}

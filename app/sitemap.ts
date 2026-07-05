import type { MetadataRoute } from "next";
import { getEvents, getPages, getPosts, getPrograms } from "@/lib/contentful";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://blueteamvillage.org";
  const [pages, events, programs, posts] = await Promise.all([
    getPages(),
    getEvents(),
    getPrograms(),
    getPosts(),
  ]);

  return [
    { url: base },
    { url: `${base}/events` },
    { url: `${base}/programs` },
    { url: `${base}/blog` },
    { url: `${base}/donate` },
    ...pages.map((p) => ({ url: `${base}/${p.slug}` })),
    ...events.map((e) => ({ url: `${base}/events/${e.slug}` })),
    ...programs.map((p) => ({ url: `${base}/programs/${p.slug}` })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}` })),
  ];
}

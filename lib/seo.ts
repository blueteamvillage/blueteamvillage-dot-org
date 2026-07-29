import type { Metadata } from "next";

/*
 * Every page declares its canonical URL and Open Graph block through these
 * helpers, so a route can't ship with a title but no canonical. Paths stay
 * relative — metadataBase in the root layout makes them absolute.
 */

export const SITE_URL = "https://blueteamvillage.org";

type PageMetaInput = {
  title: string;
  description?: string;
  /** Route path, leading slash, e.g. "/events/def-con-34". */
  path: string;
};

export function pageMeta({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
  };
}

export function articleMeta({
  title,
  description,
  path,
  publishedTime,
  authors,
}: PageMetaInput & {
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
      publishedTime,
      authors,
    },
  };
}

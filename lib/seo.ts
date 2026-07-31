import type { Metadata } from "next";

/*
 * Every page declares its canonical URL and Open Graph block through these
 * helpers, so a route can't ship with a title but no canonical. Paths stay
 * relative — metadataBase in the root layout makes them absolute.
 */

const CANONICAL_HOST = "https://blueteamvillage.org";

/*
 * Absolute metadata URLs have to point at the host that actually serves this
 * build. Hardcoding the canonical domain broke link previews before the DNS
 * move: og:image resolved to blueteamvillage.org, which still serves the old
 * WordPress site, so Discord/Slack/X fetched a 404 and showed no image.
 *
 * Order matters — an explicit NEXT_PUBLIC_SITE_URL always wins, preview
 * deployments use their own unique URL, and production follows whatever domain
 * Vercel considers primary. That means this fixes itself when DNS flips: the
 * project's production domain becomes blueteamvillage.org and these URLs
 * follow, with no code change.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  // Older Vercel runtimes, then local dev / CI.
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return CANONICAL_HOST;
}

export const SITE_URL = resolveSiteUrl();

/** Preview builds shouldn't compete with the live site in search results. */
export const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

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

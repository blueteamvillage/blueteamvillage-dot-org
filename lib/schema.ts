import type { BlogPost, EventItem, SiteSettings } from "@/types/content";
import { SITE_URL } from "./seo";

/*
 * schema.org builders. Everything here is derived from content we actually
 * hold — nothing is inferred or filled in with plausible-looking values, so a
 * builder returns null rather than guessing (see eventSchema's dates).
 */

const LOGO = `${SITE_URL}/icons/btv-512.png`;

export function organizationSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: settings.siteName,
    url: SITE_URL,
    logo: LOGO,
    description: settings.tagline,
    sameAs: settings.socialLinks.map((s) => s.href),
  };
}

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/**
 * "August 7–9, 2026 · Las Vegas, NV" → ISO start/end dates.
 * Returns null on anything it doesn't recognise; a wrong date in structured
 * data is worse than no date at all.
 */
export function parseDateRange(
  range: string,
): { startDate: string; endDate: string } | null {
  const match = /^([A-Za-z]+)\s+(\d{1,2})\s*[–—-]\s*(\d{1,2}),\s*(\d{4})/.exec(
    range.trim(),
  );
  if (!match) return null;

  const month = MONTHS.indexOf(match[1].toLowerCase());
  if (month < 0) return null;

  const [, , from, to, year] = match;
  const pad = (n: string) => n.padStart(2, "0");
  const mm = String(month + 1).padStart(2, "0");
  return {
    startDate: `${year}-${mm}-${pad(from)}`,
    endDate: `${year}-${mm}-${pad(to)}`,
  };
}

export function eventSchema(event: EventItem, settings: SiteSettings) {
  const dates = parseDateRange(event.dateRange);
  const locality = event.dateRange.includes("Las Vegas") ? "Las Vegas" : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    url: `${SITE_URL}/events/${event.slug}`,
    description: event.tagline,
    image: LOGO,
    ...(dates ?? {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(locality
      ? {
          /* City-level only: the venue moved between years (LVCC West Hall,
           * the Flamingo, the Savoy), and a wrong venue is worse than none. */
          location: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: locality,
              addressRegion: "NV",
              addressCountry: "US",
            },
          },
        }
      : {}),
    organizer: {
      "@type": "NGO",
      name: settings.siteName,
      url: SITE_URL,
    },
  };
}

export function articleSchema(post: BlogPost, settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: `${SITE_URL}/blog/${post.slug}`,
    description: post.excerpt,
    image: LOGO,
    datePublished: post.publishDate,
    author: post.authorHandle
      ? { "@type": "Person", name: post.authorHandle }
      : { "@type": "NGO", name: settings.siteName, url: SITE_URL },
    publisher: { "@type": "NGO", name: settings.siteName, url: SITE_URL },
  };
}

/** Trail of [name, path] pairs, root first. Renders SERP breadcrumbs. */
export function breadcrumbSchema(trail: Array<[string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

import "server-only";
import { createClient, type Entry } from "contentful";
import { draftMode } from "next/headers";
import type { Document } from "@contentful/rich-text-types";
import type {
  BlogPost,
  Body,
  EventItem,
  NavItem,
  Page,
  Program,
  SiteSettings,
  Sponsor,
  SponsorTier,
} from "@/types/content";
import { cacheKey, cachedFetch } from "./cache";
import {
  fallbackEvents,
  fallbackPages,
  fallbackPosts,
  fallbackPrograms,
  fallbackSettings,
} from "./fallback-content";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environment = process.env.CONTENTFUL_ENVIRONMENT ?? "master";

export const contentfulConfigured = Boolean(
  spaceId && process.env.CONTENTFUL_DELIVERY_TOKEN,
);

const deliveryClient = contentfulConfigured
  ? createClient({
      space: spaceId!,
      environment,
      accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
    })
  : null;

const previewClient =
  contentfulConfigured && process.env.CONTENTFUL_PREVIEW_TOKEN
    ? createClient({
        space: spaceId!,
        environment,
        accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
        host: "preview.contentful.com",
      })
    : null;

/** draftMode() is only available in request scope (not generateStaticParams). */
async function isPreview(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

/*
 * Every getter follows the same shape:
 *  - Contentful not configured → bundled fallback content
 *  - draft mode → preview API, no cache
 *  - otherwise → delivery API through the Upstash read-through cache
 */
async function fetchEntries<T>(
  key: string,
  query: Record<string, unknown>,
  map: (items: Entry<never>[]) => T,
  fallback: T,
): Promise<T> {
  if (!deliveryClient) return fallback;

  const preview = await isPreview();
  const client = preview ? (previewClient ?? deliveryClient) : deliveryClient;
  const run = async () => {
    const res = await client.getEntries({ include: 2, ...query });
    return map(res.items as unknown as Entry<never>[]);
  };

  if (preview) return run();
  return cachedFetch(key, run);
}

/* ---------- field mapping ---------- */

type Fields = Record<string, unknown>;

function fieldsOf(entry: Entry<never>): Fields {
  return entry.fields as unknown as Fields;
}

function str(f: Fields, name: string): string | undefined {
  const v = f[name];
  return typeof v === "string" ? v : undefined;
}

function toBody(f: Fields, name = "body"): Body {
  const v = f[name];
  if (v && typeof v === "object" && "nodeType" in (v as object)) {
    return { kind: "rich", document: v as Document };
  }
  return { kind: "blocks", blocks: [] };
}

function toSponsor(entry: Entry<never>): Sponsor | null {
  const f = fieldsOf(entry);
  const name = str(f, "name");
  if (!name) return null;
  const logo = f.logo as
    | { fields?: { file?: { url?: string } } }
    | undefined;
  return {
    name,
    tier: (str(f, "tier") ?? "Community") as SponsorTier,
    url: str(f, "url") ?? "#",
    logoUrl: logo?.fields?.file?.url
      ? `https:${logo.fields.file.url}`
      : undefined,
  };
}

function toPage(entry: Entry<never>): Page {
  const f = fieldsOf(entry);
  return {
    title: str(f, "title") ?? "",
    slug: str(f, "slug") ?? "",
    heroHeading: str(f, "heroHeading"),
    heroSubheading: str(f, "heroSubheading"),
    body: toBody(f),
    seoDescription: str(f, "seoDescription"),
  };
}

function toEvent(entry: Entry<never>): EventItem {
  const f = fieldsOf(entry);
  return {
    title: str(f, "title") ?? "",
    slug: str(f, "slug") ?? "",
    year: typeof f.year === "number" ? f.year : 0,
    dateRange: str(f, "dateRange") ?? "",
    tagline: str(f, "tagline"),
    body: toBody(f, "description"),
    tracks: Array.isArray(f.tracks) ? (f.tracks as string[]) : [],
    sponsors: Array.isArray(f.sponsors)
      ? (f.sponsors as Entry<never>[])
          .map(toSponsor)
          .filter((s): s is Sponsor => s !== null)
      : [],
    scheduleUrl: str(f, "scheduleUrl"),
    isCurrent: f.isCurrent === true,
  };
}

function toProgram(entry: Entry<never>): Program {
  const f = fieldsOf(entry);
  return {
    name: str(f, "name") ?? "",
    slug: str(f, "slug") ?? "",
    summary: str(f, "summary") ?? "",
    body: toBody(f),
    disciplines: Array.isArray(f.disciplines)
      ? (f.disciplines as string[])
      : [],
    intakeFormUrl: str(f, "intakeFormUrl"),
    order: typeof f.order === "number" ? f.order : 99,
  };
}

function toPost(entry: Entry<never>): BlogPost {
  const f = fieldsOf(entry);
  const author = f.author as
    | { fields?: { handle?: string } }
    | undefined;
  return {
    title: str(f, "title") ?? "",
    slug: str(f, "slug") ?? "",
    publishDate: str(f, "publishDate") ?? "",
    authorHandle: author?.fields?.handle,
    excerpt: str(f, "excerpt") ?? "",
    body: toBody(f),
  };
}

/* ---------- public getters ---------- */

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchEntries(
    cacheKey.settings(),
    // "websiteSettings" — the space is shared with ctf.blueteamvillage.org,
    // whose own "siteSettings" type belongs to that site.
    { content_type: "websiteSettings", limit: 1 },
    (items) => {
      if (items.length === 0) return fallbackSettings;
      const f = fieldsOf(items[0]);
      return {
        siteName: str(f, "siteName") ?? fallbackSettings.siteName,
        tagline: str(f, "tagline") ?? fallbackSettings.tagline,
        navigation: Array.isArray(f.navigation)
          ? (f.navigation as unknown as NavItem[])
          : fallbackSettings.navigation,
        discordUrl: str(f, "discordUrl") ?? fallbackSettings.discordUrl,
        shopUrl: str(f, "shopUrl") ?? fallbackSettings.shopUrl,
        ctfUrl: str(f, "ctfUrl") ?? fallbackSettings.ctfUrl,
        scheduleUrl: str(f, "scheduleUrl") ?? fallbackSettings.scheduleUrl,
        paypalButtonId:
          str(f, "paypalButtonId") ?? fallbackSettings.paypalButtonId,
        legalBlock:
          typeof f.legalBlock === "string"
            ? (f.legalBlock as string).split("\n").filter(Boolean)
            : fallbackSettings.legalBlock,
      };
    },
    fallbackSettings,
  );
}

export async function getPages(): Promise<Page[]> {
  return fetchEntries(
    cacheKey.list("page"),
    { content_type: "page", limit: 100 },
    (items) => (items.length ? items.map(toPage) : fallbackPages),
    fallbackPages,
  );
}

export async function getPage(slug: string): Promise<Page | undefined> {
  const fallback = fallbackPages.find((p) => p.slug === slug);
  return fetchEntries(
    cacheKey.entry("page", slug),
    { content_type: "page", "fields.slug": slug, limit: 1 },
    (items) => (items.length ? toPage(items[0]) : fallback),
    fallback,
  );
}

export async function getEvents(): Promise<EventItem[]> {
  return fetchEntries(
    cacheKey.list("event"),
    { content_type: "event", order: ["-fields.year"], limit: 50 },
    (items) => (items.length ? items.map(toEvent) : fallbackEvents),
    fallbackEvents,
  );
}

export async function getEvent(slug: string): Promise<EventItem | undefined> {
  const fallback = fallbackEvents.find((e) => e.slug === slug);
  return fetchEntries(
    cacheKey.entry("event", slug),
    { content_type: "event", "fields.slug": slug, limit: 1 },
    (items) => (items.length ? toEvent(items[0]) : fallback),
    fallback,
  );
}

export async function getCurrentEvent(): Promise<EventItem | undefined> {
  const events = await getEvents();
  return events.find((e) => e.isCurrent) ?? events[0];
}

export async function getPrograms(): Promise<Program[]> {
  return fetchEntries(
    cacheKey.list("program"),
    { content_type: "program", order: ["fields.order"], limit: 50 },
    (items) => (items.length ? items.map(toProgram) : fallbackPrograms),
    fallbackPrograms,
  );
}

export async function getProgram(slug: string): Promise<Program | undefined> {
  const fallback = fallbackPrograms.find((p) => p.slug === slug);
  return fetchEntries(
    cacheKey.entry("program", slug),
    { content_type: "program", "fields.slug": slug, limit: 1 },
    (items) => (items.length ? toProgram(items[0]) : fallback),
    fallback,
  );
}

export async function getPosts(): Promise<BlogPost[]> {
  return fetchEntries(
    cacheKey.list("blogPost"),
    { content_type: "blogPost", order: ["-fields.publishDate"], limit: 100 },
    (items) => (items.length ? items.map(toPost) : fallbackPosts),
    fallbackPosts,
  );
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const fallback = fallbackPosts.find((p) => p.slug === slug);
  return fetchEntries(
    cacheKey.entry("blogPost", slug),
    { content_type: "blogPost", "fields.slug": slug, limit: 1 },
    (items) => (items.length ? toPost(items[0]) : fallback),
    fallback,
  );
}

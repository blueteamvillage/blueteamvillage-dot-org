import type { Document } from "@contentful/rich-text-types";

export type SponsorTier =
  | "Blue"
  | "Diamond"
  | "Platinum"
  | "Gold"
  | "Silver"
  | "Community";

export interface Sponsor {
  name: string;
  tier: SponsorTier;
  url: string;
  logoUrl?: string;
}

/**
 * Body content is either Contentful rich text (when the CMS is connected)
 * or simple structured blocks (bundled fallback content / CI builds).
 */
export type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type Body =
  | { kind: "rich"; document: Document }
  | { kind: "blocks"; blocks: Block[] };

export interface Page {
  title: string;
  slug: string;
  heroHeading?: string;
  heroSubheading?: string;
  body: Body;
  seoDescription?: string;
}

export interface EventItem {
  title: string;
  slug: string;
  year: number;
  dateRange: string;
  tagline?: string;
  body: Body;
  tracks: string[];
  sponsors: Sponsor[];
  scheduleUrl?: string;
  isCurrent: boolean;
}

export interface Program {
  name: string;
  slug: string;
  summary: string;
  body: Body;
  disciplines: string[];
  intakeFormUrl?: string;
  order: number;
}

export interface BlogPost {
  title: string;
  slug: string;
  publishDate: string;
  authorHandle?: string;
  excerpt: string;
  body: Body;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  navigation: NavItem[];
  discordUrl: string;
  shopUrl: string;
  ctfUrl: string;
  scheduleUrl: string;
  paypalButtonId: string;
  legalBlock: string[];
}

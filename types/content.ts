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
  /** One-line description shown under the logo. Not yet a Contentful field
   *  on `websiteSponsor` — mapped optimistically, seeded from code. */
  blurb?: string;
}

/** A year in BTV's history, rendered on the home-page timeline. */
export interface Milestone {
  year: string;
  title: string;
  body: string;
}

/** A single figure in the home-page stat row. */
export interface Stat {
  value: string;
  label: string;
  suffix?: string;
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

export interface SocialLink {
  /** Platform name, e.g. "Mastodon". */
  label: string;
  href: string;
  /** How the account reads on that platform, e.g. "@blueteamvillage". */
  handle: string;
  /** Emit `rel="me"`, which lets the platform verify this site links back. */
  verifiable?: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  navigation: NavItem[];
  socialLinks: SocialLink[];
  discordUrl: string;
  shopUrl: string;
  ctfUrl: string;
  scheduleUrl: string;
  paypalButtonId: string;
  legalBlock: string[];
  /** Header announcement bar. Off unless `announcementEnabled` and text are
   *  both set. Not yet Contentful-backed on `websiteSettings`. */
  announcementEnabled?: boolean;
  announcementText?: string;
  announcementUrl?: string;
}

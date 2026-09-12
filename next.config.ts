import { withBotId } from "botid/next/config";
import type { NextConfig } from "next";

/*
 * Baseline response headers. Vercel supplies HSTS; nothing else was set, so
 * the site shipped with no clickjacking, MIME-sniffing, or referrer controls.
 *
 * The CSP is deliberately partial, and there is no `script-src` on purpose.
 * A meaningful one needs a per-request nonce, which Next can only issue from
 * the proxy and only for dynamically rendered pages — every public route here
 * is prerendered, so a nonce would trade the static site away. The alternative,
 * `script-src 'self' 'unsafe-inline'`, stops no XSS that matters and reads as
 * coverage the site doesn't have, so it's left out rather than faked.
 *
 * What remains needs no nonce and breaks nothing: framing, <base> injection,
 * plugin content, and cross-origin form posts are all closed off. Adding
 * script-src is a live decision — see the review notes.
 */
const CSP = [
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  // Both forms on the site are same-origin server actions; PayPal is a link,
  // not a form post, so 'self' doesn't break the donate flow.
  "form-action 'self'",
  // Contentful assets, Next's image optimizer, and inline SVG data URIs.
  "img-src 'self' data: blob: https://images.ctfassets.net",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  // frame-ancestors supersedes this, but it still covers older user agents.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework version to scanners.
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Contentful-hosted assets
      { protocol: "https", hostname: "images.ctfassets.net" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      // The console is already noindex via metadata; this is the header-level
      // equivalent, which crawlers honour without parsing the page.
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Legacy WordPress paths → new canonical routes
      {
        source: "/btv-at-def-con-34",
        destination: "/events/def-con-34",
        permanent: true,
      },
      {
        source: "/btv-at-def-con-33",
        destination: "/events/def-con-33",
        permanent: true,
      },
      {
        source: "/events/btv-at-def-con-32/:path*",
        destination: "/events/def-con-32",
        permanent: true,
      },
      {
        source: "/events/def-con-31/:path+",
        destination: "/events/def-con-31",
        permanent: true,
      },
      {
        source: "/2023/05/15/thank-you-project-obsidian-cr3w",
        destination: "/blog/thank-you-project-obsidian-cr3w",
        permanent: true,
      },
      // Meet-a-Mentor is retired; both legacy paths were live on WordPress
      {
        source: "/programs/meet-a-mentor",
        destination: "/programs",
        permanent: true,
      },
      { source: "/meet-a-mentor", destination: "/programs", permanent: true },
      // External services that lived on site paths
      {
        source: "/shop",
        destination: "https://blueteamvillage.myspreadshop.com/",
        permanent: false,
      },
      {
        source: "/schedule",
        destination: "https://schedule.blueteamvillage.org/",
        permanent: false,
      },
    ];
  },
};

export default withBotId(nextConfig);

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Contentful-hosted assets
      { protocol: "https", hostname: "images.ctfassets.net" },
    ],
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

export default nextConfig;

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Blue Team Village",
    short_name: "BTV",
    description:
      "A place and a community built for and by defenders. Welcome to the other side of the hacking mirror.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d294a",
    theme_color: "#0d294a",
    icons: [
      { src: "/icons/btv-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/btv-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

import type { Metadata, Viewport } from "next";
import { Lato, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

/* Same two faces as ctf.blueteamvillage.org — Lato for everything, Geist
 * Mono for terminal cues (years, copyright, invite URLs). */
const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Blue Team Village",
    template: "%s | Blue Team Village",
  },
  description:
    "Blue Team Village (BTV) is a place and a community built for and by defenders. Welcome to the other side of the hacking mirror.",
  applicationName: "Blue Team Village",
  /* No canonical here on purpose: children inherit root metadata, so a
   * canonical set here would point every page at "/". Each route declares its
   * own through lib/seo.ts. */
  openGraph: {
    siteName: "Blue Team Village",
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: "@blueteamvillage",
    creator: "@blueteamvillage",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* Colours the browser chrome on mobile to match the site's canvas. */
export const viewport: Viewport = {
  themeColor: "#0d294a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

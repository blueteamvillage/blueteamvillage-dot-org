import type { Metadata } from "next";
import { Lato, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://blueteamvillage.org"),
  title: {
    default: "Blue Team Village",
    template: "%s | Blue Team Village",
  },
  description:
    "Blue Team Village (BTV) is a place and a community built for and by defenders. Welcome to the other side of the hacking mirror.",
  openGraph: {
    siteName: "Blue Team Village",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@blueteamvillage",
    creator: "@blueteamvillage",
  },
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
      </body>
    </html>
  );
}

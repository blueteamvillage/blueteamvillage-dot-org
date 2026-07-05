import type { Metadata } from "next";
import { Lato, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-atkinson",
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${atkinson.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

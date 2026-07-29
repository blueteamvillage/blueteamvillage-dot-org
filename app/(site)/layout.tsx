import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScanlineOverlay } from "@/components/site/scanline-overlay";
import { getSiteSettings } from "@/lib/contentful";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  /* Ties the accounts to the organization for search engines, so BTV's own
   * profiles outrank impersonators. Escaping "<" per the Next JSON-LD guide. */
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: settings.siteName,
    url: "https://blueteamvillage.org",
    logo: "https://blueteamvillage.org/btv-logo.png",
    description: settings.tagline,
    sameAs: settings.socialLinks.map((s) => s.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* CRT chrome sits at z-10; all real content rides above it at z-20. */}
      <ScanlineOverlay />
      <Header settings={settings} />
      <main id="main" className="relative z-20 flex-1 pb-24">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}

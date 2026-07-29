import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { JsonLd } from "@/components/seo/json-ld";
import { ScanlineOverlay } from "@/components/site/scanline-overlay";
import { getSiteSettings } from "@/lib/contentful";
import { organizationSchema } from "@/lib/schema";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Ties BTV's social accounts to the organization, so its own profiles
       * are the ones search engines treat as authoritative. */}
      <JsonLd data={organizationSchema(settings)} />
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

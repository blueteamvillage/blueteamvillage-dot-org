import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScanlineOverlay } from "@/components/site/scanline-overlay";
import { getSiteSettings } from "@/lib/contentful";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <>
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

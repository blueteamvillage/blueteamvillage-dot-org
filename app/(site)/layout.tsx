import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getSiteSettings } from "@/lib/contentful";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <>
      <Header settings={settings} />
      <main id="main" className="flex-1 pb-24">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/types/content";
import { Nav } from "./nav";

export function Header({ settings }: { settings: SiteSettings }) {
  const announcement =
    settings.announcementEnabled && settings.announcementText
      ? { text: settings.announcementText, url: settings.announcementUrl }
      : undefined;

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-mint focus:px-3 focus:py-2 focus:text-navy-deep"
      >
        Skip to content
      </a>

      {announcement && (
        <div className="border-b border-teal/30 bg-teal-dark">
          <div className="mx-auto max-w-6xl px-6 py-2 text-center text-sm font-bold text-white">
            {announcement.url ? (
              <a
                href={announcement.url}
                className="underline underline-offset-2 hover:text-mint"
              >
                {announcement.text}
              </a>
            ) : (
              announcement.text
            )}
          </div>
        </div>
      )}

      <div className="border-b border-white/[0.06] bg-navy-deep/90 backdrop-blur-md">
        <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/btv-logo.png"
              alt=""
              width={44}
              height={50}
              className="h-8 w-auto"
            />
            <span className="text-lg font-black tracking-tight text-white">
              BLUE TEAM <span className="text-teal-bright">VILLAGE</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Nav items={settings.navigation} />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/donate">Donate</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

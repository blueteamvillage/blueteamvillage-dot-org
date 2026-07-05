import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/types/content";
import { Nav } from "./nav";

export function Header({ settings }: { settings: SiteSettings }) {
  return (
    <header className="sticky top-0 z-40 border-b border-teal/60 bg-navy/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-mint focus:px-3 focus:py-2 focus:text-abyss"
      >
        Skip to content
      </a>
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/btv-logo.png"
            alt=""
            width={44}
            height={50}
            className="h-9 w-auto"
          />
          <span className="font-display text-lg font-black tracking-tight text-foam">
            BLUE TEAM VILLAGE
          </span>
          <span className="log-line hidden sm:inline">status: defending</span>
        </Link>
        <div className="flex items-center gap-3">
          <Nav items={settings.navigation} />
          <Link
            href="/donate"
            className="hidden rounded bg-gold px-3 py-2 text-sm font-black text-abyss hover:brightness-110 sm:inline-block"
          >
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}

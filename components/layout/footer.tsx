import Link from "next/link";
import type { SiteSettings } from "@/types/content";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-24 border-t border-teal/60 bg-abyss">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="log-line">[btv] community</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={settings.discordUrl} className="text-foam hover:text-mint">
                Discord ↗
              </a>
            </li>
            <li>
              <a href={settings.ctfUrl} className="text-foam hover:text-mint">
                Capture the Flag ↗
              </a>
            </li>
            <li>
              <a href={settings.scheduleUrl} className="text-foam hover:text-mint">
                Schedule ↗
              </a>
            </li>
            <li>
              <a href={settings.shopUrl} className="text-foam hover:text-mint">
                Shop ↗
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="log-line">[btv] village</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-foam hover:text-mint">
                About
              </Link>
            </li>
            <li>
              <Link href="/programs" className="text-foam hover:text-mint">
                Programs
              </Link>
            </li>
            <li>
              <Link href="/events" className="text-foam hover:text-mint">
                Events
              </Link>
            </li>
            <li>
              <Link href="/code-of-conduct" className="text-foam hover:text-mint">
                Code of Conduct
              </Link>
            </li>
            <li>
              <Link href="/donate" className="text-foam hover:text-mint">
                Donate
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="log-line">[btv] legal</p>
          <div className="mt-3 space-y-2 text-sm text-mist">
            {settings.legalBlock.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-teal/40">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-mist">
          © {new Date().getFullYear()} {settings.siteName}. {settings.tagline}
        </p>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { GradientDivider } from "@/components/site/gradient-divider";
import type { SiteSettings } from "@/types/content";

const programLinks = [
  { href: "/programs/project-obsidian", label: "Project Obsidian" },
  { href: "/programs/venator-aurum", label: "Venator Aurum" },
  { href: "/programs/meet-a-mentor", label: "Meet-a-Mentor" },
  { href: "/programs", label: "All programs" },
];

const eventLinks = [
  { href: "/events/def-con-34", label: "DEF CON 34" },
  { href: "/events/def-con-33", label: "DEF CON 33" },
  { href: "/events/def-con-32", label: "DEF CON 32" },
  { href: "/events/def-con-31", label: "DEF CON 31" },
  { href: "/events/def-con-30", label: "DEF CON 30" },
];

const villageLinks = [
  { href: "/about", label: "About BTV" },
  { href: "/blog", label: "Blog" },
  { href: "/donate", label: "Donate" },
  { href: "/code-of-conduct", label: "Code of Conduct" },
  { href: "/prospectus", label: "Sponsorship" },
];

const linkClass = "text-sm text-mist transition-colors hover:text-teal-bright";
const headingClass =
  "mb-3 text-xs font-bold uppercase tracking-[0.2em] text-mint";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="relative z-20 mt-24 border-t border-white/[0.06] bg-navy-deep">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/btv-logo.png"
                alt=""
                width={44}
                height={50}
                className="h-7 w-auto"
              />
              <span className="font-black text-white">BLUE TEAM VILLAGE</span>
            </Link>
            <p className="text-sm leading-relaxed text-haze">
              A place and a community built for and by defenders. We&apos;ll
              keep a blue light on for you.
            </p>
            <ul className="space-y-2 pt-1">
              <li>
                <a
                  href={settings.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Discord ↗
                </a>
              </li>
              <li>
                <a
                  href={settings.ctfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Capture the Flag ↗
                </a>
              </li>
              <li>
                <a
                  href={settings.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Shop ↗
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <h2 className={headingClass}>Follow</h2>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {settings.socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      /* rel="me" is how the platform verifies this site
                       * belongs to the account — see SocialLink.verifiable. */
                      rel={
                        link.verifiable
                          ? "me noopener noreferrer"
                          : "noopener noreferrer"
                      }
                      title={link.handle}
                      className={linkClass}
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <nav aria-label="Programs">
            <h2 className={headingClass}>Programs</h2>
            <ul className="space-y-2">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Events">
            <h2 className={headingClass}>Events</h2>
            <ul className="space-y-2">
              {eventLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={settings.scheduleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Schedule ↗
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Village">
            <h2 className={headingClass}>Village</h2>
            <ul className="space-y-2">
              {villageLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <GradientDivider className="my-8" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1 text-xs text-haze">
            {settings.legalBlock.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="pt-2 font-mono">
              © {new Date().getFullYear()} {settings.siteName}
            </p>
          </div>
          <p className="shrink-0 font-mono text-xs text-haze">
            {"// DEFEND · DETECT · DETER"}
          </p>
        </div>
      </div>
    </footer>
  );
}

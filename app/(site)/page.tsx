import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Flag,
  GraduationCap,
  Puzzle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Eyebrow } from "@/components/site/eyebrow";
import { GradientDivider } from "@/components/site/gradient-divider";
import { IconChip } from "@/components/site/icon-chip";
import { PillBadge } from "@/components/site/pill-badge";
import { SponsorGrid } from "@/components/sponsor-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCurrentEvent,
  getCurrentSponsors,
  getEvents,
  getPrograms,
  getSiteSettings,
} from "@/lib/contentful";
import { fallbackStats } from "@/lib/fallback-content";
import { pageMeta } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: "Blue Team Village",
  description:
    "Blue Team Village (BTV) is a place and a community built for and by defenders. Welcome to the other side of the hacking mirror.",
  path: "/",
});

/*
 * Values / Mission / Vision, in the order and wording BTV publishes them.
 * Values leads because it frames the other two ("to accomplish our Mission
 * and Vision, we Value…").
 */
const FOUNDATION = [
  {
    title: "Values",
    body: "To embody the highest ideals and accomplish our Mission and Vision, we Value: Excellence, Inclusion, Transparency, Integrity, Community, Education, Support, and Encouragement.",
  },
  {
    title: "Mission",
    body: "To curate content and create global, safe, and inclusive spaces designed to foster sharing, learning, community, support and encouragement for all cyber defenders regardless of skill level.",
  },
  {
    title: "Vision",
    body: "To be the premier organization supporting the cyber defender community. To build a community that encourages, teaches, learns, and shares experiences and knowledge. To be the model for what a cyber defender community should embody.",
  },
];

/* Programs are CMS-driven; the icon per slug is presentation, so it lives here. */
const PROGRAM_ICONS = {
  "project-obsidian": { icon: GraduationCap, tone: "teal" },
  "venator-aurum": { icon: Puzzle, tone: "gold" },
} as const;

/** Project Obsidian and the CTF are the same program, so its card links out. */
const OBSIDIAN_SLUG = "project-obsidian";

const BLUE_TIER_PERKS = [
  "Exclusive presenting-sponsor placement on all BTV materials",
  "Featured speaking or workshop slot at DEF CON",
  "Premier logo on the BTV website, CTF platform, and event signage",
  "Dedicated social spotlight to the BTV community",
  "Direct access to the most engaged defensive security community in the world",
];

export default async function HomePage() {
  const [settings, current, events, programs, sponsors] = await Promise.all([
    getSiteSettings(),
    getCurrentEvent(),
    getEvents(),
    getPrograms(),
    getCurrentSponsors(),
  ]);

  const past = events.filter((e) => e.slug !== current?.slug);
  const hasBlueSponsor = sponsors.some((s) => s.tier === "Blue");

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-20 pb-16 lg:grid-cols-[1fr_auto]">
        <div>
          {/* current.title is "BTV at DEF CON 34" — drop the prefix so the
              eyebrow doesn't say the village's name twice. */}
          <Eyebrow>
            Blue Team Village ·{" "}
            {current?.title.replace(/^BTV at /i, "") ?? "DEF CON"}
          </Eyebrow>
          <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-tight text-white md:text-7xl">
            The other side of the{" "}
            <span className="animate-pulse-glow text-teal-bright">
              hacking mirror
            </span>
            .
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
            Blue Team Village is a place and a community built for and by
            defenders — a global, safe, and inclusive space for sharing,
            learning, and support for all cyber defenders, regardless of skill
            level.
          </p>

          <div className="mt-8 flex items-center gap-5" aria-hidden>
            <IconChip icon={ShieldCheck} tone="teal" />
            <IconChip icon={Search} tone="mint" />
            <IconChip icon={Flag} tone="gold" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {current && <PillBadge>{current.dateRange}</PillBadge>}
            <PillBadge>9th year at DEF CON</PillBadge>
            <PillBadge>
              <span className="text-teal-bright">501(c)(3)</span> nonprofit
            </PillBadge>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {current && (
              <Button asChild size="lg">
                <Link href={`/events/${current.slug}`}>
                  {current.title}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            )}
            <Button asChild size="lg" variant="outline">
              <a
                href={settings.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the Discord
              </a>
            </Button>
          </div>
        </div>

        <Image
          src="/btv-logo.png"
          alt="Blue Team Village logo — a letter B formed by a dagger, power plug, and wrench"
          width={545}
          height={620}
          priority
          className="mx-auto h-auto w-52 drop-shadow-[0_0_45px_rgba(1,127,164,0.55)] sm:w-64 lg:w-96"
        />
      </section>

      {/* Stat row */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-4 rounded-lg border border-white/[0.06] bg-navy-card p-6 sm:grid-cols-3 sm:p-8">
          {fallbackStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-black text-white sm:text-4xl">
                {stat.value}
                {stat.suffix && (
                  <span className="text-teal-bright">{stat.suffix}</span>
                )}
              </p>
              {/* mist, not haze: haze on navy-card is only 3.7:1, which
                  doesn't clear AA for text this small. */}
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-mist">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / vision / values */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Eyebrow>Our foundation</Eyebrow>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Built by defenders, for defenders.
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-mist">
          In early 2018, a small group of defenders started a conversation about
          what a defense-focused village at DEF CON could look like. In weeks
          there was an organization. In months, BTV was at DEF CON 26.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {FOUNDATION.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-mist">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>What we do</Eyebrow>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Programs &amp; initiatives
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/programs">
              All programs
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const art = PROGRAM_ICONS[
              program.slug as keyof typeof PROGRAM_ICONS
            ] ?? { icon: ShieldCheck, tone: "teal" as const };
            return (
              <Card key={program.slug} className="gap-4">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <IconChip icon={art.icon} tone={art.tone} />
                    <CardTitle className="text-lg leading-tight">
                      {program.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  <p className="flex-1 text-sm leading-relaxed text-mist">
                    {program.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-bright transition-colors hover:text-mint"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                    {/* The CTF *is* Project Obsidian, run on its own site. */}
                    {program.slug === OBSIDIAN_SLUG && (
                      <a
                        href={settings.ctfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-bright transition-colors hover:text-mint"
                      >
                        Play the CTF ↗
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <Eyebrow>Where to find us</Eyebrow>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Events
        </h2>

        {current && (
          <Card className="mt-8 border-teal/30">
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                Up next · Featured event
              </Badge>
              <CardTitle className="mt-2 text-2xl">{current.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-white/[0.06] bg-navy-deep p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint">
                    Dates
                  </p>
                  <p className="mt-2 font-bold text-white">
                    {current.dateRange.split("·")[0].trim()}
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-navy-deep p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint">
                    Location
                  </p>
                  <p className="mt-2 font-bold text-white">
                    {current.dateRange.split("·")[1]?.trim() ?? "Las Vegas, NV"}
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-navy-deep p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint">
                    Tracks
                  </p>
                  <p className="mt-2 font-bold text-white">
                    {current.tracks.length || 6} content tracks
                  </p>
                </div>
              </div>

              {current.tagline && (
                <p className="leading-relaxed text-mist">{current.tagline}</p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href={`/events/${current.slug}`}>
                    Event details
                    <ArrowRight aria-hidden />
                  </Link>
                </Button>
                {current.scheduleUrl && (
                  <Button asChild variant="outline">
                    <a
                      href={current.scheduleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View the schedule ↗
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {past.length > 0 && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {past.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="rounded-lg border border-white/[0.06] bg-navy-card p-5 transition-colors hover:border-white/20"
              >
                <p className="font-mono text-sm text-teal-bright">
                  {event.year}
                </p>
                <p className="mt-1 font-bold text-white">{event.title}</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Community */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <Eyebrow>Stay connected</Eyebrow>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Join the community
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-mist">
          The conversation never stops. Hang out in our Discord to ask
          questions, catch up with old friends, meet new ones, and stay sharp
          between events.
        </p>
        <p className="mt-6 font-mono text-teal-bright">
          discord.gg/blueteamvillage
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild size="lg">
            <a
              href={settings.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Discord
              <ArrowRight aria-hidden />
            </a>
          </Button>
        </div>

        <p className="mt-10 text-sm text-mist">
          Follow along between events:
        </p>
        <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {settings.socialLinks.map((social) => (
            <li key={social.href} className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-mist">
                {social.label}
              </span>
              <a
                href={social.href}
                target="_blank"
                rel={
                  social.verifiable
                    ? "me noopener noreferrer"
                    : "noopener noreferrer"
                }
                className="font-mono text-sm text-teal-bright transition-colors hover:text-mint"
              >
                {social.handle}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Sponsors */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <Eyebrow>Partners in defense</Eyebrow>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Thank you, {current?.year ?? ""} sponsors
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-mist">
          Their support funds free defender education, our community programs,
          and BTV&apos;s village at DEF CON.
        </p>

        <div className="mt-8">
          <SponsorGrid sponsors={sponsors} />
        </div>

        {/* The Blue tier is a single presenting slot — pitch it only while
            it's actually unclaimed. */}
        {!hasBlueSponsor && (
          <Card className="mt-10 border-gold/30">
            <CardHeader>
              <Badge variant="warning" className="w-fit">
                <Award aria-hidden />
                Premier opportunity
              </Badge>
              <CardTitle className="mt-2 text-2xl">
                Become the Blue sponsor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="max-w-3xl leading-relaxed text-mist">
                The Blue tier is BTV&apos;s highest sponsorship level — named
                after the community itself. As the sole Blue sponsor, your brand
                stands alone at the top, reaching{" "}
                <strong className="text-white">
                  active cyber defenders at DEF CON and year-round
                </strong>{" "}
                through our Discord, CTF, and Project Obsidian training program.
              </p>
              <ul className="space-y-2">
                {BLUE_TIER_PERKS.map((perk) => (
                  <li
                    key={perk}
                    className="flex gap-2.5 text-sm leading-relaxed text-mist"
                  >
                    <span aria-hidden className="mt-0.5 text-teal-bright">
                      ▸
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a href="mailto:sponsorship@blueteamvillage.org">
                    Contact us about sponsorship
                    <ArrowRight aria-hidden />
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/prospectus">Sponsorship prospectus</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Support */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-lg border border-white/[0.06] bg-navy-card p-8 sm:p-10">
          <Eyebrow>Keep the blue light on</Eyebrow>
          <h2 className="mt-3 text-3xl font-black text-white">
            Support Blue Team Village
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-mist">
            BTV runs on community support. Your tax-deductible donation funds
            free training, hands-on labs, and our village at DEF CON.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/donate">
                Make a donation
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={settings.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit the shop ↗
              </a>
            </Button>
          </div>

          <GradientDivider className="my-8" />

          <div className="space-y-1 text-sm text-haze">
            {settings.legalBlock.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

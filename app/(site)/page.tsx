import Image from "next/image";
import Link from "next/link";
import { getCurrentEvent, getPrograms, getSiteSettings } from "@/lib/contentful";

export const revalidate = 3600;

const VALUES = [
  "Excellence",
  "Inclusion",
  "Transparency",
  "Integrity",
  "Community",
  "Education",
  "Mentoring",
  "Support",
  "Encouragement",
];

export default async function HomePage() {
  const [settings, current, programs] = await Promise.all([
    getSiteSettings(),
    getCurrentEvent(),
    getPrograms(),
  ]);

  return (
    <>
      {/* Hero: the SOC status board — the BTV mark is the radar contact */}
      <section className="relative overflow-hidden border-b border-teal/40">
        <div className="radar" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:py-24 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="log-line">
              [btv-{current ? `dc${current.year - 1992}` : "2026"}] status:
              defending
            </p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-none text-foam sm:text-7xl">
              The other side of the hacking mirror.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-mist">
              Blue Team Village is a place and a community built for and by
              defenders — a global, safe, and inclusive space for sharing,
              learning, and support for all cyber defenders, regardless of
              skill level.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {current && (
                <Link
                  href={`/events/${current.slug}`}
                  className="rounded bg-gold px-5 py-3 font-black text-abyss hover:brightness-110"
                >
                  {current.title} → {current.dateRange.split("·")[0].trim()}
                </Link>
              )}
              <a
                href={settings.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-mint px-5 py-3 font-bold text-mint hover:bg-mint hover:text-abyss"
              >
                Join the Discord
              </a>
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
        </div>
      </section>

      {/* Mission / vision */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="log-line">[btv] mission</p>
            <p className="mt-3 text-xl leading-relaxed text-foam">
              To curate content and create global, safe, and inclusive spaces
              designed to foster sharing, learning, community, support and
              encouragement for all cyber defenders regardless of skill level.
            </p>
          </div>
          <div>
            <p className="log-line">[btv] vision</p>
            <p className="mt-3 text-xl leading-relaxed text-foam">
              To be the premier organization supporting the cyber defender
              community.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {VALUES.map((v) => (
                <li
                  key={v}
                  className="rounded-full border border-teal px-3 py-1 text-sm text-mist"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <p className="log-line">[btv] programs: year-round</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {programs.map((p) => (
            <Link
              key={p.slug}
              href={`/programs/${p.slug}`}
              className="rounded-lg border border-teal/60 bg-navy p-6 hover:border-mint"
            >
              <h2 className="text-2xl font-black text-foam">{p.name}</h2>
              <p className="mt-3 text-mist">{p.summary}</p>
              <p className="mt-4 font-bold text-mint">Learn more →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Support strip */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-lg border border-teal/60 bg-navy p-8 sm:p-10">
          <p className="log-line">[btv] support</p>
          <h2 className="mt-3 text-3xl font-black text-foam">
            Keep defender education free.
          </h2>
          <p className="mt-3 max-w-2xl text-mist">
            The Association of Blue Team Villages is a 501(c)(3) public
            charity. Donations are tax-deductible and fund free training,
            mentorship, and our village at DEF CON.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/donate"
              className="rounded bg-gold px-5 py-3 font-black text-abyss hover:brightness-110"
            >
              Donate
            </Link>
            <a
              href={settings.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-teal px-5 py-3 font-bold text-foam hover:border-mint hover:text-mint"
            >
              Shop merch ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

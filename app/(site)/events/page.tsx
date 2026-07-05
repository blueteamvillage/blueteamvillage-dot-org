import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getEvents } from "@/lib/contentful";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Blue Team Village events — a venue for defenders at DEF CON since 2018.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        logLine="[btv] events"
        heading="Events"
        sub="BTV is a venue for defenders to gather, learn, and share — anchored by our village at DEF CON every year since DEF CON 26."
      />
      <div className="mx-auto mt-12 max-w-4xl space-y-4 px-4">
        {events.map((e) => (
          <Link
            key={e.slug}
            href={`/events/${e.slug}`}
            className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-teal/60 bg-navy p-6 hover:border-mint"
          >
            <div>
              <h2 className="text-xl font-black text-foam">{e.title}</h2>
              <p className="mt-1 text-sm text-mist">{e.dateRange}</p>
            </div>
            {e.isCurrent ? (
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-black text-abyss">
                Up next
              </span>
            ) : (
              <span className="font-bold text-mint">→</span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

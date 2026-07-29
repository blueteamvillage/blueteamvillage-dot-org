import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { getEvents } from "@/lib/contentful";
import { pageMeta } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: "Events",
  description:
    "Blue Team Village events — a venue for defenders at DEF CON since 2018.",
  path: "/events",
});

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        eyebrow="Where to find us"
        heading="Events"
        sub="BTV is a venue for defenders to gather, learn, and share — anchored by our village at DEF CON every year since DEF CON 26."
      />
      <div className="mx-auto mt-12 max-w-4xl space-y-4 px-6">
        {events.map((e) => (
          <Link
            key={e.slug}
            href={`/events/${e.slug}`}
            className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-white/[0.06] bg-navy-card p-6 transition-colors hover:border-white/20"
          >
            <div>
              <h2 className="text-xl font-black text-white">{e.title}</h2>
              <p className="mt-1 text-sm text-mist">{e.dateRange}</p>
            </div>
            {e.isCurrent ? (
              <Badge variant="secondary">Up next</Badge>
            ) : (
              <ArrowRight className="h-4 w-4 text-teal-bright" aria-hidden />
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

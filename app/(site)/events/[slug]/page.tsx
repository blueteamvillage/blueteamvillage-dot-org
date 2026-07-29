import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/rich-text";
import { JsonLd } from "@/components/seo/json-ld";
import { Eyebrow } from "@/components/site/eyebrow";
import { SponsorGrid } from "@/components/sponsor-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getCurrentSponsors,
  getEvent,
  getEvents,
  getSiteSettings,
} from "@/lib/contentful";
import { breadcrumbSchema, eventSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};
  return pageMeta({
    title: event.title,
    description: event.tagline,
    path: `/events/${event.slug}`,
  });
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const [event, settings] = await Promise.all([
    getEvent(slug),
    getSiteSettings(),
  ]);
  if (!event) notFound();

  /*
   * For the current event the live roster is authoritative (it carries logos
   * and blurbs); past events keep their own linked list as the year's record.
   */
  const sponsors = event.isCurrent ? await getCurrentSponsors() : event.sponsors;

  return (
    <article>
      <JsonLd data={eventSchema(event, settings)} />
      <JsonLd
        data={breadcrumbSchema([
          ["Home", "/"],
          ["Events", "/events"],
          [event.title, `/events/${event.slug}`],
        ])}
      />
      <PageHeader
        eyebrow={event.dateRange}
        heading={event.title}
        sub={event.tagline}
      />
      <div className="mx-auto max-w-4xl px-6">
        {event.tracks.length > 0 && (
          <section className="mt-10">
            <Eyebrow>Content tracks</Eyebrow>
            <ul className="mt-3 flex flex-wrap gap-2">
              {event.tracks.map((t) => (
                <li key={t}>
                  <Badge variant="outline">{t}</Badge>
                </li>
              ))}
            </ul>
          </section>
        )}

        <Prose body={event.body} />

        {event.scheduleUrl && (
          <div className="mt-8">
            <Button asChild size="lg" variant="outline">
              <a
                href={event.scheduleUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View the schedule ↗
              </a>
            </Button>
          </div>
        )}

        {sponsors.length > 0 && (
          <section className="mt-16">
            <Eyebrow>Partners in defense</Eyebrow>
            <h2 className="mt-3 text-2xl font-black text-white">Sponsors</h2>
            <div className="mt-6">
              <SponsorGrid sponsors={sponsors} />
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

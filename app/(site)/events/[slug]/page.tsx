import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Prose } from "@/components/rich-text";
import { SponsorGrid } from "@/components/sponsor-grid";
import { getEvent, getEvents } from "@/lib/contentful";

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
  return { title: event.title, description: event.tagline };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  return (
    <article>
      <PageHeader
        logLine={`[btv] event: ${event.slug} :: ${event.dateRange}`}
        heading={event.title}
        sub={event.tagline}
      />
      <div className="mx-auto max-w-4xl px-4">
        {event.tracks.length > 0 && (
          <section className="mt-10">
            <p className="log-line">[event] content tracks</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {event.tracks.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-cyan px-4 py-1.5 text-sm font-bold text-foam"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>
        )}

        <Prose body={event.body} />

        {event.scheduleUrl && (
          <p className="mt-8">
            <a
              href={event.scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-mint px-5 py-3 font-bold text-mint hover:bg-mint hover:text-abyss"
            >
              View the schedule ↗
            </a>
          </p>
        )}

        {event.sponsors.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-black text-foam">Sponsors</h2>
            <SponsorGrid sponsors={event.sponsors} />
          </section>
        )}
      </div>
    </article>
  );
}

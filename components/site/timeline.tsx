import { Eyebrow } from "@/components/site/eyebrow";
import type { Milestone } from "@/types/content";

/*
 * BTV's history on a vertical rail — left-aligned on mobile, alternating
 * around a centred rail from lg up. Lives on /about rather than the home
 * page, which leads with the current DEF CON instead.
 */
export function Timeline({ milestones }: { milestones: Milestone[] }) {
  if (milestones.length === 0) return null;

  return (
    <section className="mt-16">
      <Eyebrow>A decade of defense</Eyebrow>
      <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
        Ten years of Blue Team Village
      </h2>

      <ol className="relative mt-12 space-y-4">
        <div
          aria-hidden
          className="absolute inset-y-0 left-[7px] w-px bg-linear-to-b from-transparent via-teal/40 to-transparent lg:left-1/2 lg:-translate-x-1/2"
        />
        {milestones.map((milestone, i) => (
          <li
            key={milestone.year}
            className="relative pl-8 lg:grid lg:grid-cols-2 lg:gap-10 lg:pl-0"
          >
            <span
              aria-hidden
              className="absolute left-0 top-5 h-3.5 w-3.5 rounded-full border-2 border-navy bg-teal-bright lg:left-1/2 lg:-translate-x-1/2"
            />
            <div
              className={
                i % 2 === 0 ? "lg:col-start-1 lg:text-right" : "lg:col-start-2"
              }
            >
              <div className="rounded-lg border border-white/[0.06] bg-navy-card p-5">
                <p className="font-mono text-sm text-teal-bright">
                  {milestone.year}
                </p>
                <h3 className="mt-1 text-xl font-black text-white">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {milestone.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

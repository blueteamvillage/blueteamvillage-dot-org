/* eslint-disable @next/next/no-img-element */
import type { Sponsor } from "@/types/content";

const TIER_ORDER = ["Blue", "Diamond", "Platinum", "Gold", "Silver", "Community"];

export function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) return null;

  const byTier = new Map<string, Sponsor[]>();
  for (const s of sponsors) {
    byTier.set(s.tier, [...(byTier.get(s.tier) ?? []), s]);
  }

  return (
    <div className="mt-6 space-y-8">
      {TIER_ORDER.filter((tier) => byTier.has(tier)).map((tier) => (
        <div key={tier}>
          <p className="log-line">[sponsors] tier: {tier.toLowerCase()}</p>
          <ul className="mt-3 flex flex-wrap gap-3">
            {byTier.get(tier)!.map((s) => (
              <li key={s.name}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-teal/60 bg-navy px-4 py-3 font-bold text-foam hover:border-mint hover:text-mint"
                >
                  {s.logoUrl && (
                    <img
                      src={s.logoUrl}
                      alt=""
                      className="h-6 w-auto"
                      loading="lazy"
                    />
                  )}
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

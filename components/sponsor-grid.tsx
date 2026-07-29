/* eslint-disable @next/next/no-img-element */
import { Handshake } from "lucide-react";
import type { Sponsor, SponsorTier } from "@/types/content";

/*
 * Card shape and tier accents match components/dc34/sponsor-grid.tsx on
 * ctf.blueteamvillage.org — sponsors see the same treatment on both sites.
 */
const TIER_ORDER: SponsorTier[] = [
  "Blue",
  "Diamond",
  "Platinum",
  "Gold",
  "Silver",
  "Community",
];

const tierAccent: Record<SponsorTier, string> = {
  Blue: "border-teal/40 text-teal-bright",
  Diamond: "border-teal-bright/40 text-teal-bright",
  Platinum: "border-fog/40 text-fog",
  Gold: "border-gold/40 text-gold",
  Silver: "border-mist/40 text-mist",
  Community: "border-mint/40 text-mint",
};

/*
 * Contentful serves assets from images.ctfassets.net, which resizes on the fly
 * — ask for a small webp rather than the original (uploads can be several MB).
 */
function logoSrc(url: string): string {
  return url.includes("ctfassets.net") ? `${url}?w=320&fm=webp&q=90` : url;
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const card = (
    <div className="flex h-full flex-col items-center gap-3 rounded-lg border border-white/[0.06] bg-navy-card p-6 text-center">
      <span
        className={`inline-flex rounded-md border bg-white/[0.03] px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.15em] ${tierAccent[sponsor.tier]}`}
      >
        {sponsor.tier}
      </span>
      {sponsor.logoUrl ? (
        // White chip so logos with dark wordmarks stay legible on navy
        <span className="flex h-20 w-full items-center justify-center rounded-md bg-white px-4 py-2.5">
          <img
            src={logoSrc(sponsor.logoUrl)}
            alt={sponsor.name}
            className="h-full w-auto max-w-full object-contain"
            loading="lazy"
          />
        </span>
      ) : (
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-white/10 text-haze">
          <Handshake className="h-6 w-6" aria-hidden />
        </span>
      )}
      <p className="font-bold text-white">{sponsor.name}</p>
      {sponsor.blurb && <p className="text-xs text-haze">{sponsor.blurb}</p>}
    </div>
  );

  return sponsor.url && sponsor.url !== "#" ? (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-opacity hover:opacity-80"
    >
      {card}
    </a>
  ) : (
    card
  );
}

/*
 * One flat grid, highest tier first — same as the CTF site. Tier bands were
 * tried and rejected: with one Blue and one Platinum sponsor they leave rows
 * three-quarters empty. The per-card badge carries the tier instead.
 */
export function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) return null;

  const ranked = [...sponsors].sort(
    (a, b) => TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier),
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ranked.map((s) => (
        <SponsorCard key={s.name} sponsor={s} />
      ))}
    </div>
  );
}

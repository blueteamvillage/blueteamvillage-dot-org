"use client";

import { useState, useTransition } from "react";
import {
  purgeContentCache,
  purgeGroupCache,
  type PurgeResult,
} from "@/lib/actions";

export function PurgeButtons() {
  const [pending, startTransition] = useTransition();
  const [last, setLast] = useState<PurgeResult | null>(null);

  const run = (action: () => Promise<PurgeResult>) =>
    startTransition(async () => {
      setLast(await action());
    });

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={() => run(purgeContentCache)}
          className="rounded bg-gold px-5 py-3 font-black text-abyss hover:brightness-110 disabled:opacity-50"
        >
          Purge content cache
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => run(purgeGroupCache)}
          className="rounded border border-teal px-5 py-3 font-bold text-foam hover:border-mint hover:text-mint disabled:opacity-50"
        >
          Purge group cache
        </button>
      </div>
      {last && (
        <p className="log-line mt-4">
          [cache] purged {last.purged} keys matching {last.scope} at {last.at}
        </p>
      )}
    </div>
  );
}

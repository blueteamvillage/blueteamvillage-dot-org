"use client";

import { useActionState } from "react";
import { lookupUserGroups, type LookupResult } from "@/lib/actions";

export function UserLookup() {
  const [result, action, pending] = useActionState<LookupResult | null, FormData>(
    lookupUserGroups,
    null,
  );

  return (
    <div className="max-w-2xl">
      <p className="log-line">[directory] group lookup</p>
      <p className="mt-2 text-sm text-mist">
        Look up any workspace user&apos;s Google groups and the webapp role
        they resolve to. Queries the Directory API live (bypasses cache).
      </p>
      <form action={action} className="mt-4 flex gap-2">
        <label htmlFor="email" className="sr-only">
          Workspace email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="user@blueteamvillage.org"
          className="w-full rounded border border-teal bg-abyss px-4 py-2.5 text-foam placeholder:text-mist/60"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-gold px-5 py-2.5 font-black text-abyss hover:brightness-110 disabled:opacity-50"
        >
          {pending ? "Looking up…" : "Look up"}
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded-lg border border-teal/60 bg-navy p-6">
          {result.error ? (
            <p className="log-line text-magenta">[alert] {result.error}</p>
          ) : (
            <>
              <p className="log-line">
                [directory] {result.email} :: resolves to
              </p>
              <p className="mt-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    result.role === "admin"
                      ? "bg-gold text-abyss"
                      : "bg-teal text-foam"
                  }`}
                >
                  {result.role}
                </span>
              </p>
              {result.groups.length === 0 ? (
                <p className="mt-4 text-mist">No group memberships.</p>
              ) : (
                <ul className="mt-4 space-y-2">
                  {result.groups.map((g) => (
                    <li
                      key={g}
                      className="rounded border border-teal/40 px-4 py-2 font-mono text-sm text-foam"
                    >
                      {g}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

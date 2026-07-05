import type { Metadata } from "next";
import { auth } from "@/auth";
import { roleGroupMap } from "@/lib/rbac";

export const metadata: Metadata = {
  title: "Who am I",
  robots: { index: false },
};

export default async function WhoAmIPage() {
  const session = await auth();
  if (!session?.user) return null;

  const { user } = session;

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-teal/60 bg-navy p-6">
        <p className="log-line">[jwt] identity</p>
        <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[10rem_1fr]">
          <dt className="font-bold text-mist">Email</dt>
          <dd className="text-foam">{user.email}</dd>
          <dt className="font-bold text-mist">Name</dt>
          <dd className="text-foam">{user.name ?? "—"}</dd>
          <dt className="font-bold text-mist">Resolved role</dt>
          <dd>
            <span
              className={`rounded-full px-3 py-1 text-xs font-black ${
                user.role === "admin"
                  ? "bg-gold text-abyss"
                  : "bg-teal text-foam"
              }`}
            >
              {user.role}
            </span>
          </dd>
          <dt className="font-bold text-mist">Session expires</dt>
          <dd className="text-foam">{session.expires}</dd>
        </dl>
      </div>

      <div className="rounded-lg border border-teal/60 bg-navy p-6">
        <p className="log-line">[jwt] workspace groups ({user.groups.length})</p>
        {user.groups.length === 0 ? (
          <p className="mt-3 text-mist">
            No groups on this token. Either the Google Directory integration
            isn&apos;t configured yet, or this account has no group
            memberships. Group data refreshes within ~10 minutes of a change.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {user.groups.map((g) => (
              <li
                key={g}
                className="flex items-center justify-between rounded border border-teal/40 px-4 py-2 font-mono text-sm text-foam"
              >
                {g}
                {roleGroupMap[g] && (
                  <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-black text-abyss">
                    grants {roleGroupMap[g]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-lg border border-teal/60 bg-navy p-6">
        <p className="log-line">[jwt] raw session claims</p>
        <pre className="mt-4 overflow-x-auto rounded bg-abyss p-4 font-mono text-xs text-mint">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}

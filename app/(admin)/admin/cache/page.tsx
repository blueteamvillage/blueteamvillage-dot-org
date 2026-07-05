import type { Metadata } from "next";
import { auth } from "@/auth";
import { PurgeButtons } from "@/components/admin/purge-buttons";
import { redis } from "@/lib/redis";

export const metadata: Metadata = {
  title: "Cache",
  robots: { index: false },
};

export default async function CachePage() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return (
      <p className="log-line text-magenta">
        [alert] 403 :: this tool requires the admin role
        (btv-website-admins@blueteamvillage.org)
      </p>
    );
  }

  if (!redis) {
    return (
      <p className="text-gold">
        Upstash is not configured. Set UPSTASH_REDIS_REST_URL and
        UPSTASH_REDIS_REST_TOKEN to enable the cache layer.
      </p>
    );
  }

  let keyCount: number | null = null;
  try {
    keyCount = await redis.dbsize();
  } catch {
    // Stats are best-effort.
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="rounded-lg border border-teal/60 bg-navy p-6">
        <p className="log-line">[cache] upstash status</p>
        <p className="mt-2 text-mist">
          Connected.{" "}
          {keyCount !== null && (
            <span className="text-foam">{keyCount} keys in the database.</span>
          )}{" "}
          Content entries cache for 1 hour; group lookups for 10 minutes.
          Contentful publishes purge affected keys automatically via webhook —
          use the buttons below to force it.
        </p>
      </div>
      <PurgeButtons />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { contentfulConfigured } from "@/lib/contentful";
import { directoryConfigured } from "@/lib/google-directory";
import { redis } from "@/lib/redis";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false },
};

function StatusCard({
  label,
  ok,
  okText,
  missingText,
}: {
  label: string;
  ok: boolean;
  okText: string;
  missingText: string;
}) {
  return (
    <div className="rounded-lg border border-teal/60 bg-navy p-5">
      <p className="log-line">{label}</p>
      <p className={`mt-2 font-bold ${ok ? "text-mint" : "text-gold"}`}>
        {ok ? okText : missingText}
      </p>
    </div>
  );
}

export default async function AdminOverview() {
  const session = await auth();
  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          label="[integration] contentful"
          ok={contentfulConfigured}
          okText="Connected"
          missingText="Not configured — serving bundled fallback content"
        />
        <StatusCard
          label="[integration] upstash"
          ok={Boolean(redis)}
          okText="Connected"
          missingText="Not configured — caching disabled"
        />
        <StatusCard
          label="[integration] google directory"
          ok={directoryConfigured}
          okText="Connected"
          missingText="Not configured — everyone resolves to reader"
        />
        <StatusCard
          label="[deploy] build"
          ok={Boolean(sha)}
          okText={`Commit ${sha}`}
          missingText="Local / non-Vercel build"
        />
      </div>

      <div className="mt-10 rounded-lg border border-teal/60 bg-navy p-6">
        <p className="log-line">[session] {session?.user?.email}</p>
        <p className="mt-2 text-mist">
          You are signed in with role{" "}
          <span className="font-bold text-foam">{session?.user?.role}</span>.
          Inspect your full token on{" "}
          <Link href="/admin/whoami" className="text-mint underline">
            Who am I
          </Link>
          . Content is edited in Contentful; this dashboard manages access,
          cache, and previews.
        </p>
      </div>
    </div>
  );
}

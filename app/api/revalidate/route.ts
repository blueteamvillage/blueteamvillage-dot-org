import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { cacheKey, purgeByPattern } from "@/lib/cache";
import { redis } from "@/lib/redis";

export const runtime = "nodejs";

function secretMatches(provided: string | null): boolean {
  const expected = process.env.CONTENTFUL_REVALIDATE_SECRET;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Contentful "Entry publish/unpublish/delete" webhook target.
 * Purges the Upstash layer for the affected entry, then triggers
 * ISR revalidation so the next request refetches from Contentful.
 */
export async function POST(req: NextRequest) {
  if (!secretMatches(req.headers.get("x-revalidate-secret"))) {
    return NextResponse.json({ error: "invalid secret" }, { status: 401 });
  }

  let contentType = "unknown";
  let slug: string | undefined;
  try {
    const payload = await req.json();
    contentType = payload?.sys?.contentType?.sys?.id ?? "unknown";
    slug = payload?.fields?.slug?.["en-US"];
  } catch {
    // Purge broadly when the payload isn't parseable.
  }

  const purged: string[] = [];
  if (redis) {
    if (contentType !== "unknown" && slug) {
      await redis.del(
        cacheKey.entry(contentType, slug),
        cacheKey.list(contentType),
        cacheKey.settings(),
      );
      purged.push(
        cacheKey.entry(contentType, slug),
        cacheKey.list(contentType),
        cacheKey.settings(),
      );
    } else {
      const n = await purgeByPattern("cf:*");
      purged.push(`cf:* (${n} keys)`);
    }
  }

  // Upstash is purged first so regeneration misses the cache and
  // pulls fresh content from Contentful.
  revalidatePath("/", "layout");

  return NextResponse.json({
    revalidated: true,
    contentType,
    slug: slug ?? null,
    purged,
  });
}

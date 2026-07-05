import { redis } from "./redis";

export const CONTENT_TTL_SECONDS = 3600;
export const GROUPS_TTL_SECONDS = 600;

/** Key builders — single source of truth for the cache namespace. */
export const cacheKey = {
  entry: (type: string, slug: string) => `cf:entry:${type}:${slug}`,
  list: (type: string) => `cf:list:${type}`,
  settings: () => "cf:settings",
  groups: (email: string) => `groups:${email.toLowerCase()}`,
};

/**
 * Read-through cache. Falls back to a direct fetch when Redis is not
 * configured or unavailable — the cache must never take the site down.
 */
export async function cachedFetch<T>(
  key: string,
  fn: () => Promise<T>,
  ttlSeconds: number = CONTENT_TTL_SECONDS,
): Promise<T> {
  if (!redis) return fn();

  try {
    const hit = await redis.get<T>(key);
    if (hit !== null && hit !== undefined) return hit;
  } catch (err) {
    console.error(`cache read failed for ${key}`, err);
    return fn();
  }

  const fresh = await fn();
  try {
    await redis.set(key, fresh, { ex: ttlSeconds });
  } catch (err) {
    console.error(`cache write failed for ${key}`, err);
  }
  return fresh;
}

/** Delete all keys matching a pattern (SCAN-based; safe for Upstash). */
export async function purgeByPattern(pattern: string): Promise<number> {
  if (!redis) return 0;
  let cursor = "0";
  let deleted = 0;
  do {
    const [next, keys] = await redis.scan(cursor, {
      match: pattern,
      count: 100,
    });
    cursor = next;
    if (keys.length > 0) {
      deleted += await redis.del(...keys);
    }
  } while (cursor !== "0");
  return deleted;
}

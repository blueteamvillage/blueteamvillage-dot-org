import { Redis } from "@upstash/redis";

/**
 * Upstash client, or null when the cache layer isn't configured
 * (local dev without secrets, CI). Callers must degrade gracefully.
 */
export const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

/**
 * Same-origin redirect validation for user-supplied `?redirect=` values.
 *
 * A `startsWith("/") && !startsWith("//")` check is not enough. Browsers parse
 * Location headers with the WHATWG URL algorithm, which treats a backslash as
 * a path separator and strips tab/newline/CR before parsing — so both
 * `/\evil.com` and `/<TAB>/evil.com` resolve to `https://evil.com/` even
 * though each passes that check.
 *
 * Rather than blocklisting those shapes, run the target through the same
 * parser the browser uses against a throwaway origin. If the parse lands
 * anywhere other than that origin, the value was never a relative path.
 */
const PROBE_ORIGIN = "https://redirect.invalid";

export function safeRedirectPath(
  target: string | null | undefined,
  fallback = "/",
): string {
  if (!target) return fallback;

  let url: URL;
  try {
    url = new URL(target, PROBE_ORIGIN);
  } catch {
    return fallback;
  }

  // Absolute URLs, protocol-relative URLs, and the backslash/tab escapes above
  // all move the origin off the probe.
  if (url.origin !== PROBE_ORIGIN) return fallback;

  const path = `${url.pathname}${url.search}${url.hash}`;
  return path.startsWith("/") ? path : fallback;
}

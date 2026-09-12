/**
 * Kill switch for the admin console and everything that only exists to serve
 * it — the console routes, the Auth.js endpoints, and Contentful draft preview.
 *
 * BTV does not have a Google Workspace yet, so the sign-in flow behind these
 * routes cannot succeed: auth.config.ts requires `profile.hd` to equal the
 * workspace domain, and no such account exists to return it. Until the
 * workspace is set up, production was serving a public Google OIDC sign-in
 * page and a live OAuth callback that nobody could ever complete — surface
 * with no corresponding capability.
 *
 * Deliberately fail-closed: anything other than the exact string "true" leaves
 * the console off, so a missing or misspelled env var disables it rather than
 * exposing it. Set ADMIN_CONSOLE_ENABLED=true in the Vercel project once the
 * workspace, the OAuth client, and the btv-website-admins group are in place.
 *
 * Must stay edge-safe — proxy.ts imports it.
 */
export const ADMIN_CONSOLE_ENABLED =
  process.env.ADMIN_CONSOLE_ENABLED === "true";

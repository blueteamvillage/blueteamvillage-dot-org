import { initBotId } from "botid/client/core";

/**
 * BotID attaches classification headers only to fetch/XHR requests
 * matching this list; checkBotId() on the server fails without them.
 * Server actions POST to the page path that invoked them, so the
 * admin console's actions (user lookup, cache purges, sign-out) are
 * covered by the /admin patterns. The Contentful webhook
 * (/api/revalidate) and navigation routes (/api/preview, /api/auth)
 * must stay off this list — they are not browser fetches.
 */
initBotId({
  protect: [
    { path: "/admin", method: "POST" },
    { path: "/admin/*", method: "POST" },
  ],
});

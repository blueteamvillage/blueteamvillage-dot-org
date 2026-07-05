# blueteamvillage.org

The Blue Team Village website — Next.js on Vercel, content managed in
Contentful, cached through Upstash Redis, with a Google Workspace–gated
admin dashboard. Design follows the DEF CON 34 "Agency" style guide.

## Architecture

```
Contentful (CMS) ──publish webhook──▶ /api/revalidate
     │                                     │ purges
     ▼                                     ▼
Delivery API ──▶ Upstash Redis (1h TTL) ──▶ Next.js ISR (1h) ──▶ visitor
```

- **Content**: editors work in Contentful (space `mgfsp0s6h7v2`, shared
  with ctf.blueteamvillage.org — the website's types are `page`, `event`,
  `program`, `websiteSponsor`, `blogPost`, `person`, `websiteSettings`).
  Publishing fires a webhook that purges Upstash and revalidates ISR, so
  edits go live in seconds without a deploy.
- **Fallback content**: `lib/fallback-content.ts` carries the complete
  site content. It serves local dev and CI builds without secrets, and it
  is the seed source for Contentful. Once Contentful is connected, edit
  there — not in the fallback file.
- **Caching**: `lib/cache.ts` is a read-through Upstash cache
  (`cf:entry:*`, `cf:list:*`, `cf:settings`, 1h; `groups:*`, 10m). The
  cache degrades gracefully — if Upstash is down or unconfigured, fetches
  go straight to the source.
- **Auth**: Auth.js v5 (`auth.ts` + edge-safe `auth.config.ts` used by
  `proxy.ts`). Google sign-in restricted to the blueteamvillage.org
  workspace: the `hd` param filters the chooser, and the `signIn`
  callback re-verifies `hd` + `email_verified` (the real enforcement,
  alongside the Internal OAuth consent screen).
- **RBAC**: Google ID tokens don't carry groups, so at sign-in the app
  calls the Admin SDK Directory API via a domain-wide-delegated service
  account (`lib/google-directory.ts`), maps groups → roles
  (`lib/rbac.ts`: `btv-website-admins@blueteamvillage.org` → admin,
  everyone else → reader), and mints `groups[]` + `role` into the session
  JWT. Group data refreshes ~10 minutes after a change.
- **Admin dashboard** (`/admin`, any workspace member): integration
  status, JWT/groups inspector (`/admin/whoami`), draft-mode toggle
  (`/admin/preview`). Admin role also gets a live Directory group lookup
  for any user (`/admin/users`) and cache purge (`/admin/cache`).

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in what you have; everything degrades gracefully
npm run dev
```

With no env vars at all the site renders from bundled fallback content
and `/admin` sign-in is unavailable. Checks: `npm run lint`,
`npx tsc --noEmit`, `npm run build`.

## Environment variables

See `.env.local.example` for the full list with generation commands.
Secrets live in `.env.local` (gitignored) locally and in Vercel project
env vars in deployment — never in code or git.

## One-time provisioning runbook

1. **Contentful API keys** — Settings → API keys → Add API key. Copy the
   Delivery and Preview tokens into env. (Content model + entries are
   already seeded.)
2. **Contentful webhook** — Settings → Webhooks → Add:
   URL `https://blueteamvillage.org/api/revalidate`, events: Entry
   publish/unpublish/delete, custom header `x-revalidate-secret` =
   `CONTENTFUL_REVALIDATE_SECRET`.
3. **GCP OAuth client** — project under the blueteamvillage.org org →
   OAuth consent screen: **Internal** → Create OAuth client (Web):
   redirect URIs `http://localhost:3000/api/auth/callback/google` and
   `https://blueteamvillage.org/api/auth/callback/google` (plus the
   Vercel preview domain). → `AUTH_GOOGLE_ID/SECRET`.
4. **Directory service account** — same project: enable Admin SDK API;
   create service account `btv-directory-reader`, create a JSON key;
   base64 the `private_key` PEM into `GOOGLE_SA_PRIVATE_KEY_B64`.
5. **Domain-wide delegation** — Workspace Admin console → Security → API
   controls → Manage Domain Wide Delegation → add the service account's
   numeric client ID with scope
   `https://www.googleapis.com/auth/admin.directory.group.readonly`.
   Set `GOOGLE_ADMIN_IMPERSONATION_SUBJECT` to a workspace admin (or a
   user with the Groups Reader admin role). Propagation can take 24h.
6. **RBAC group** — create Google group
   `btv-website-admins@blueteamvillage.org` and add website admins.
7. **Vercel** — import `blueteamvillage/blueteamvillage-dot-org` into the
   BTV team (Pro — Hobby prohibits org use; ask about the nonprofit
   discount), set all env vars for Production + Preview, add the
   `blueteamvillage.org` + `www` domains, then cut DNS over per Vercel's
   instructions.

## Content editing

Day-to-day content changes happen in Contentful — no code, no deploys.
Invite editors in Contentful (Settings → Users). Access to the *webapp's*
admin dashboard is separate and controlled by Google Workspace groups.

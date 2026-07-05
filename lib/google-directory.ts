import "server-only";
import { google } from "googleapis";
import { GROUPS_TTL_SECONDS, cacheKey, cachedFetch } from "./cache";

/**
 * Google Admin SDK Directory client using a service account with
 * domain-wide delegation, scoped to read-only group data.
 * Node runtime only — never import from proxy.ts or edge code.
 */

export const directoryConfigured = Boolean(
  process.env.GOOGLE_SA_CLIENT_EMAIL &&
    process.env.GOOGLE_SA_PRIVATE_KEY_B64 &&
    process.env.GOOGLE_ADMIN_IMPERSONATION_SUBJECT,
);

function directoryClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SA_CLIENT_EMAIL,
    key: Buffer.from(process.env.GOOGLE_SA_PRIVATE_KEY_B64!, "base64").toString(
      "utf8",
    ),
    scopes: ["https://www.googleapis.com/auth/admin.directory.group.readonly"],
    subject: process.env.GOOGLE_ADMIN_IMPERSONATION_SUBJECT,
  });
  return google.admin({ version: "directory_v1", auth });
}

async function fetchGroups(email: string): Promise<string[]> {
  const admin = directoryClient();
  const groups: string[] = [];
  let pageToken: string | undefined;
  do {
    const res = await admin.groups.list({ userKey: email, pageToken });
    for (const g of res.data.groups ?? []) {
      if (g.email) groups.push(g.email.toLowerCase());
    }
    pageToken = res.data.nextPageToken ?? undefined;
  } while (pageToken);
  return groups;
}

/**
 * Groups for a workspace user, cached briefly so sign-ins don't hammer
 * the Directory API. Returns [] when the directory isn't configured —
 * everyone resolves to "reader" until RBAC env vars are in place.
 */
export async function getGroupsForUser(
  email: string,
  { fresh = false }: { fresh?: boolean } = {},
): Promise<string[]> {
  if (!directoryConfigured) return [];
  if (fresh) return fetchGroups(email);
  return cachedFetch(
    cacheKey.groups(email),
    () => fetchGroups(email),
    GROUPS_TTL_SECONDS,
  );
}

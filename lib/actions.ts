"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { purgeByPattern } from "./cache";
import { getGroupsForUser } from "./google-directory";
import { resolveRole, type Role } from "./rbac";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new Error("Admin role required");
  }
  return session;
}

export interface LookupResult {
  email: string;
  groups: string[];
  role: Role;
  error?: string;
}

export async function lookupUserGroups(
  _prev: LookupResult | null,
  formData: FormData,
): Promise<LookupResult> {
  await requireAdmin();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { email, groups: [], role: "reader", error: "Enter a valid email." };
  }
  try {
    const groups = await getGroupsForUser(email, { fresh: true });
    return { email, groups, role: resolveRole(groups) };
  } catch (err) {
    console.error(`directory lookup failed for ${email}`, err);
    return {
      email,
      groups: [],
      role: "reader",
      error:
        "Lookup failed — the user may not exist in the workspace, or the Directory API rejected the request.",
    };
  }
}

export interface PurgeResult {
  purged: number;
  scope: string;
  at: string;
}

export async function purgeContentCache(): Promise<PurgeResult> {
  await requireAdmin();
  const purged = await purgeByPattern("cf:*");
  revalidatePath("/", "layout");
  return { purged, scope: "cf:*", at: new Date().toISOString() };
}

export async function purgeGroupCache(): Promise<PurgeResult> {
  await requireAdmin();
  const purged = await purgeByPattern("groups:*");
  return { purged, scope: "groups:*", at: new Date().toISOString() };
}

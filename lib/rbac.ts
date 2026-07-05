export type Role = "admin" | "reader";

/**
 * Google Workspace group → webapp role.
 * Any signed-in workspace member without an admin group is a reader.
 * Extend this map to add roles; the JWT carries the raw group list,
 * so new mappings take effect at the next token refresh.
 */
const ROLE_GROUPS: Record<string, Role> = {
  "btv-website-admins@blueteamvillage.org": "admin",
};

export function resolveRole(groups: string[]): Role {
  return groups.some((g) => ROLE_GROUPS[g.toLowerCase()] === "admin")
    ? "admin"
    : "reader";
}

export const roleGroupMap = ROLE_GROUPS;

import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { getGroupsForUser } from "@/lib/google-directory";
import { resolveRole } from "@/lib/rbac";

const GROUPS_REFRESH_MS = 10 * 60 * 1000;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, profile }) {
      const email = profile?.email ?? token.email;
      const stale =
        typeof token.groupsFetchedAt !== "number" ||
        Date.now() - token.groupsFetchedAt > GROUPS_REFRESH_MS;
      if (email && (profile || stale)) {
        try {
          const groups = await getGroupsForUser(email);
          token.groups = groups;
          token.role = resolveRole(groups);
          token.groupsFetchedAt = Date.now();
        } catch (err) {
          console.error(`group lookup failed for ${email}`, err);
          token.groups ??= [];
          token.role ??= "reader";
          token.groupsFetchedAt = Date.now();
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.groups = (token.groups as string[]) ?? [];
      session.user.role = (token.role as "admin" | "reader") ?? "reader";
      return session;
    },
  },
});

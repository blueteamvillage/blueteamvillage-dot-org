import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const ALLOWED_HD = process.env.ALLOWED_GOOGLE_HD ?? "blueteamvillage.org";

/**
 * Edge-safe Auth.js config: no Node-only imports, so proxy.ts can use it.
 * The full config in auth.ts adds the Directory-API group lookup.
 */
export const authConfig = {
  providers: [
    Google({
      // Filters Google's account chooser to the workspace. UI hint only —
      // enforcement is the signIn callback below plus the Internal
      // consent screen on the GCP OAuth client.
      authorization: { params: { hd: ALLOWED_HD } },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ profile }) {
      return (
        profile?.hd === ALLOWED_HD &&
        profile?.email_verified === true &&
        (profile?.email?.endsWith(`@${ALLOWED_HD}`) ?? false)
      );
    },
  },
} satisfies NextAuthConfig;

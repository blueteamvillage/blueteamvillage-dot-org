import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

/**
 * Next 16 middleware (proxy). Cheap cookie-level gate for /admin —
 * the authoritative session + role checks live in the admin layout
 * and pages, which run the full Node config.
 */
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!req.auth) {
    const signInUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return Response.redirect(signInUrl);
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};

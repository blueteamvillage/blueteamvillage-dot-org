import NextAuth from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authConfig } from "@/auth.config";
import { ADMIN_CONSOLE_ENABLED } from "@/lib/admin-console";

/**
 * Next 16 middleware (proxy). Two jobs:
 *
 * 1. While the admin console is disabled, 404 every route that belongs to it —
 *    the console, the Auth.js endpoints, and draft preview. 404 rather than
 *    403 so the routes read as absent instead of merely locked.
 * 2. When it is enabled, a cheap cookie-level gate for /admin. The
 *    authoritative session + role checks live in the admin layout and pages,
 *    which run the full Node config.
 */
const { auth } = NextAuth(authConfig);

const requireSession = auth((req) => {
  if (!req.auth) {
    const signInUrl = new URL("/api/auth/signin", req.nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return Response.redirect(signInUrl);
  }
});

export default function proxy(
  req: NextRequest,
  ctx: Parameters<typeof requireSession>[1],
) {
  if (!ADMIN_CONSOLE_ENABLED) {
    return new NextResponse(null, { status: 404 });
  }

  // /api/auth/* must pass through untouched or the sign-in flow can't run, and
  // the preview routes do their own session check.
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  return requireSession(req, ctx);
}

export const config = {
  // /api/preview exactly, not /api/preview/:path* — /api/preview/disable must
  // stay reachable so a stale draft cookie can still be cleared by hand.
  matcher: ["/admin/:path*", "/api/auth/:path*", "/api/preview"],
};

import { draftMode } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { ADMIN_CONSOLE_ENABLED } from "@/lib/admin-console";
import { safeRedirectPath } from "@/lib/safe-redirect";

/** Enables Contentful draft preview. Requires a signed-in workspace member. */
export async function GET(req: NextRequest) {
  // Draft preview is part of the console; it goes dark with it.
  if (!ADMIN_CONSOLE_ENABLED) notFound();

  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin/preview");
  }

  (await draftMode()).enable();

  redirect(safeRedirectPath(req.nextUrl.searchParams.get("redirect")));
}

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { safeRedirectPath } from "@/lib/safe-redirect";

/*
 * Intentionally NOT gated on ADMIN_CONSOLE_ENABLED. Turning draft mode *off*
 * is the safe direction: anyone still holding a draft cookie from before the
 * console was disabled needs a way to clear it.
 */
export async function GET(req: NextRequest) {
  (await draftMode()).disable();
  redirect(safeRedirectPath(req.nextUrl.searchParams.get("redirect")));
}

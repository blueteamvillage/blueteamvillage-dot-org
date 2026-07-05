import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { auth } from "@/auth";

/** Enables Contentful draft preview. Requires a signed-in workspace member. */
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin/preview");
  }

  (await draftMode()).enable();

  const target = req.nextUrl.searchParams.get("redirect") ?? "/";
  // Only allow same-site relative redirects.
  redirect(target.startsWith("/") && !target.startsWith("//") ? target : "/");
}

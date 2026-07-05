import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  (await draftMode()).disable();
  const target = req.nextUrl.searchParams.get("redirect") ?? "/";
  redirect(target.startsWith("/") && !target.startsWith("//") ? target : "/");
}

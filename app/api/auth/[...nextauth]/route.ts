import { notFound } from "next/navigation";
import { handlers } from "@/auth";
import { ADMIN_CONSOLE_ENABLED } from "@/lib/admin-console";

/*
 * proxy.ts already 404s these while the console is off. This repeats the check
 * at the handler so the OAuth callback can't be reached if the matcher ever
 * drifts — the sign-in surface is the part worth double-locking.
 */
export const GET = ADMIN_CONSOLE_ENABLED ? handlers.GET : async () => notFound();
export const POST = ADMIN_CONSOLE_ENABLED ? handlers.POST : async () => notFound();

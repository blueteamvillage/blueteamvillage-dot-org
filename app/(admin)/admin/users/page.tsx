import type { Metadata } from "next";
import { auth } from "@/auth";
import { UserLookup } from "@/components/admin/user-lookup";
import { directoryConfigured } from "@/lib/google-directory";

export const metadata: Metadata = {
  title: "User lookup",
  robots: { index: false },
};

export default async function UsersPage() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return (
      <p className="log-line text-magenta">
        [alert] 403 :: this tool requires the admin role
        (btv-website-admins@blueteamvillage.org)
      </p>
    );
  }

  if (!directoryConfigured) {
    return (
      <p className="text-gold">
        Google Directory integration is not configured. Set
        GOOGLE_SA_CLIENT_EMAIL, GOOGLE_SA_PRIVATE_KEY_B64, and
        GOOGLE_ADMIN_IMPERSONATION_SUBJECT to enable user lookups.
      </p>
    );
  }

  return <UserLookup />;
}

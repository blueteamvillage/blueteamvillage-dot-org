import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/whoami", label: "Who am I" },
  { href: "/admin/users", label: "Users", adminOnly: true },
  { href: "/admin/cache", label: "Cache", adminOnly: true },
  { href: "/admin/preview", label: "Preview" },
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Authoritative gate — proxy.ts is only the cheap edge redirect.
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  const role = session.user.role;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-teal/60 pb-6">
        <div>
          <p className="log-line">[btv-admin] session: {role}</p>
          <h1 className="mt-1 text-2xl font-black text-foam">
            Website admin
          </h1>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-mist">{session.user.email}</span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-black ${
              role === "admin" ? "bg-gold text-abyss" : "bg-teal text-foam"
            }`}
          >
            {role}
          </span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="rounded border border-teal px-3 py-1.5 text-foam hover:border-mint hover:text-mint"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <nav aria-label="Admin" className="mt-6 flex flex-wrap gap-2">
        {NAV.filter((item) => !item.adminOnly || role === "admin").map(
          (item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded border border-teal px-3 py-1.5 text-sm font-bold text-foam hover:border-mint hover:text-mint"
            >
              {item.label}
            </Link>
          ),
        )}
        <Link
          href="/"
          className="rounded border border-teal px-3 py-1.5 text-sm text-mist hover:border-mint hover:text-mint"
        >
          ← Public site
        </Link>
      </nav>

      <div className="mt-10">{children}</div>
    </div>
  );
}

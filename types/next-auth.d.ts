import type { DefaultSession } from "next-auth";
import type { Role } from "@/lib/rbac";

declare module "next-auth" {
  interface Session {
    user: {
      groups: string[];
      role: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    groups?: string[];
    role?: Role;
    groupsFetchedAt?: number;
  }
}

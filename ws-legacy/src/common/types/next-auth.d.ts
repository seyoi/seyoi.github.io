import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    acntUid: string | null;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      plan?: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    plan?: string
  }

  interface JWT extends DefaultJWT {
    id?: string
    plan?: string
  }
}

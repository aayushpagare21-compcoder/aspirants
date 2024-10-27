import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/app/server/db/prisma";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google,
    Resend({
      from: process.env.EMAIL_FROM! as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
});

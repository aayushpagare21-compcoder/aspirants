import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUserByEmail } from "@/app/lib/actions/users";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async (params) => {
      if (!params.user.email) {
        return false;
      }
      const existingUser = await getUserByEmail(params.user.email ?? "");
      if (!existingUser) {
        await createUser({
          email: params.user.email,
          image: params.user.image,
          name: params.user.name,
        });
      }
      return true;
    },
    session({ session }) {
      return session;
    },
  },
};

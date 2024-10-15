import type { Metadata } from "next";
import { Navbar } from "@/app/components/shared/Navbar/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import {SessionUser} from "@/app/lib/types/auth.types";
export const metadata: Metadata = {
  title: "Be an aspirant",
  description: "Created with ❤️ by Aayush Pagare.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: Session | null = await getServerSession(authOptions as never);
  if (!session?.user) {
    throw new Error("Not authenticated");
  }
  return (
    <div>
      <Navbar user={session.user as SessionUser} />
      {children}
    </div>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/app/components/shared/Navbar/Navbar";
import {getServerSession, Session, User} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Be an aspirant",
  description: "Created with ❤️ by Aayush Pagare.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session =
      await getServerSession(authOptions as never);

  return (
    <div>
      <Navbar user={session.user}/>
      {children}
    </div>
  );
}

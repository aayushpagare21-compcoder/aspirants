import type { Metadata } from "next";
import { Navbar } from "@/app/components/dashboard/header/Navbar";
import { SessionUser } from "@/app/lib/types/auth.types";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Be an aspirant",
  description: "Created with ❤️ by Aayush Pagare.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
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

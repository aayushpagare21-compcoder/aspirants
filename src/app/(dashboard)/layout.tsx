import type { Metadata } from "next";
import { Navbar } from "@/app/components/dashboard/header/Navbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
    redirect("/");
  }
  return (
    <div>
      <Navbar user={session.user} />
      {children}
    </div>
  );
}

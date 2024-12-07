import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function LandingLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth();
  if (session) {
    redirect("/feed");
  }
  return (
    <div>
      {modal}
      {children}
    </div>
  );
}

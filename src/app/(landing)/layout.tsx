import { LandingPageNavBar } from "@/app/components/landing/LandingPageNavbar";
import { Divider } from "@/app/components/shared/Divider/Divider";
import { LandingPageFooter } from "@/app/components/landing/LandingPageFooter";
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
      <div>
        <div className="flex h-[100vh] flex-col items-center gap-8 bg-primary">
          <LandingPageNavBar />
          {children}
          <LandingPageFooter />
        </div>
      </div>
    </div>
  );
}

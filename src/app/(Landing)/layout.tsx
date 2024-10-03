import { Navbar } from "@/app/components/shared/Navbar/Navbar";
import { LandingPageNavBar } from "@/app/components/shared/Navbar/LandingPageNavbar";
import { Divider } from "@/app/components/shared/Divider/Divider";
import { LandingPageFooter } from "@/app/components/shared/Footer/LandingPageFooter";
import React from "react";
import { auth } from "@clerk/nextjs/server";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <>
      {userId && (
        <>
          <Navbar />
          {children}
        </>
      )}
      {!userId && (
        <div className="bg-[#F7F4ED] h-[100vh] flex flex-col items-center">
          <LandingPageNavBar />
          <Divider overrideClassNames="border-b-black" />
          {children}
          <Divider overrideClassNames="border-b-black" />
          <LandingPageFooter />
        </div>
      )}
    </>
  );
}

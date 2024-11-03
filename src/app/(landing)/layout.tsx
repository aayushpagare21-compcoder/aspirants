import { LandingPageNavBar } from "@/app/components/landing/LandingPageNavbar";
import { Divider } from "@/app/components/shared/Divider/Divider";
import { LandingPageFooter } from "@/app/components/landing/LandingPageFooter";
import React from "react";
export default function LandingLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div>
      {modal}
      <div>
        <div className="flex h-[100vh] flex-col items-center bg-landing">
          <LandingPageNavBar />
          <Divider />
          {children}
          <Divider />
          <LandingPageFooter />
        </div>
      </div>
    </div>
  );
}

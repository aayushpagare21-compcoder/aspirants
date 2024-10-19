import { LandingPageNavBar } from "@/app/components/shared/Navbar/LandingPageNavbar";
import { Divider } from "@/app/components/shared/Divider/Divider";
import { LandingPageFooter } from "@/app/components/shared/Footer/LandingPageFooter";
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
        <div className="flex h-[100vh] flex-col items-center">
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

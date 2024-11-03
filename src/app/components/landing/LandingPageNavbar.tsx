import { AspirantsLogo } from "@/app/components/shared/Logo/AspirantsLogo";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import React from "react";

export const LandingPageNavBar = () => {
  return (
    <header>
      <nav className="flex w-[90vw] items-center justify-between p-4 xl:w-[80vw] 2xl:w-[60vw]">
        <AspirantsLogo />
        <div className="flex justify-around gap-8">
          <ul className="hidden items-center gap-6 font-[family-name:var(--font-sohneone)] text-[14px] md:flex">
            <Link href="#">
              <li> About Us </li>
            </Link>
            <Link href="#">
              <li> Guide </li>
            </Link>
            <Link href="#">
              <li> Write</li>
            </Link>
            <Link href="#">
              <li> Sign in</li>
            </Link>
          </ul>
          <div className="flex items-center">
            <Button className="w-[6.5rem] rounded-full bg-landingSecondary py-5 font-bold text-secondary-foreground">
              <Link href="/login"> Get started </Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

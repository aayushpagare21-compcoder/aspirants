import { AspirantsLogo } from "@/app/components/shared/Logo/AspirantsLogo";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/app/components/ui/button";
import React from "react";

export const LandingPageNavBar = () => {
  return (
    <header>
      <nav className="flex justify-between w-[90vw] xl:w-[80vw] 2xl:w-[50vw] p-4 items-center">
        <AspirantsLogo overrideClasses="text-black" />
        <div className="flex justify-around gap-8">
          <ul className="font-[family-name:var(--font-sohneone)] text-[14px] text-black items-center md:flex gap-6 hidden">
            <Link href="#">
              <li> Our Story</li>
            </Link>
            <Link href="#">
              <li> Membership</li>
            </Link>
            <Link href="#">
              <li> Write</li>
            </Link>
            <Link href="#">
              <li> Sign in</li>
            </Link>
          </ul>
          <div className="flex items-center">
            <SignInButton>
              <Button className="py-5 rounded-full w-[6.5rem] font-bold text-white">
                Get started
              </Button>
            </SignInButton>
          </div>
        </div>
      </nav>
    </header>
  );
};

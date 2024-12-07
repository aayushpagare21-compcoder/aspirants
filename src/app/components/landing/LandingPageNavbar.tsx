import { AspirantsLogo } from "@/app/components/shared/Logo/AspirantsLogo";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import React from "react";

export const LandingPageNavBar = () => {
  return (
    <nav className="mt-4 flex w-full max-w-[90vw] items-center justify-between p-4">
      <AspirantsLogo />
      <Button
        variant="transparentTertiary"
        className="w-[6rem] md:w-[12rem] md:text-[1rem]"
      >
        <Link href="/login"> Get Started </Link>
      </Button>
    </nav>
  );
};

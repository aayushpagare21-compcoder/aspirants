import React from "react";
import { AspirantsLogo } from "../shared/Logo/AspirantsLogo";
import { Button } from "../ui/button";
import Link from "next/link";

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

import React from "react";
import { AspirantsLogo } from "../shared/Logo/AspirantsLogo";
import { Button } from "../ui/button";
import Link from "next/link";

export const LandingPageNavBar = () => {
  return (
    <nav className="mt-4 flex w-full max-w-[90vw] items-center justify-between p-4">
      <AspirantsLogo />
      <Link href="/login" passHref>
        <Button
          variant="transparentTertiary"
          className="w-[6rem] h-[3rem] md:w-[12rem] md:h-[3.5rem] md:text-[1rem] flex items-center justify-center"
        >
          Get Started
        </Button>
      </Link>
    </nav>
  );
};

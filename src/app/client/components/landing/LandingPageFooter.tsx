import React from "react";
import { Button } from "../ui/button";
import { GithubLogo } from "../shared/Logo/GithubLogo";
import { WhatsAppLogo } from "../shared/Logo/WhatsApp";
import Link from "next/link";

export const LandingPageFooter = () => {
  return (
    <footer className="z-10 flex w-full max-w-3xl items-center justify-center gap-4 p-4 text-white">
      <Link
        href="https://github.com/aayushpagare21-compcoder/aspirants"
        passHref
        target="_blank"
      >
        <Button className="flex w-32 gap-2">
          <GithubLogo />
          Contribute
        </Button>
      </Link>

      <Link href="https://chat.whatsapp.com/Hot3u6QDICaGTqMAKSiJqv">
        <Button className="flex w-32 gap-2">
          <WhatsAppLogo />
          Join Us
        </Button>
      </Link>
    </footer>
  );
};

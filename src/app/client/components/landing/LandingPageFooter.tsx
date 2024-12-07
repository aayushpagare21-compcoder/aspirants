import React from "react";
import { Button } from "../ui/button";
import { GithubLogo } from "../shared/Logo/GithubLogo";
import Link from "next/link";
import { WhatsAppLogo } from "../shared/Logo/WhatsApp";

export const LandingPageFooter = () => {
  return (
    <footer className="z-10 flex gap-4 w-full max-w-3xl items-center justify-center p-4 text-white">
      <Link
        href="https://github.com/aayushpagare21-compcoder/aspirants"
        target="_blank"
      >
        <Button className="flex gap-2 w-32">
          <GithubLogo />
          Contribute
        </Button>
      </Link>
      <Link
        href="https://chat.whatsapp.com/Hot3u6QDICaGTqMAKSiJqv"
        target="_blank"
      >
        <Button className="flex gap-2 w-32">
          <WhatsAppLogo />
          Join Us
        </Button>
      </Link>
    </footer>
  );
};

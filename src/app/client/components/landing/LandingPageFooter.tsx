import React from "react";
import { Button } from "../ui/button";
import { GithubLogo } from "../shared/Logo/GithubLogo";
import { WhatsAppLogo } from "../shared/Logo/WhatsApp";

export const LandingPageFooter = () => {
  return (
    <footer className="z-10 flex w-full max-w-3xl items-center justify-center gap-4 p-4 text-white">
      <Button className="flex w-32 gap-2">
        <GithubLogo link="https://github.com/aayushpagare21-compcoder/aspirants" />
        Contribute
      </Button>
      <Button className="flex w-32 gap-2">
        <WhatsAppLogo link="https://chat.whatsapp.com/Hot3u6QDICaGTqMAKSiJqv" />
        Join Us
      </Button>
    </footer>
  );
};

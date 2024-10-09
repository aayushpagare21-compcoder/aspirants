import Link from "next/link";
import React from "react";

export const LandingPageFooter = () => {
  return (
    <footer className="z-10 w-full bg-black p-4 text-secondary lg:bg-inherit lg:text-primary">
      <nav>
        <ul className="flex items-center justify-start gap-6 font-[family-name:var(--font-sohneone)] text-[12px] lg:justify-center lg:text-[#6B6B6B]">
          <Link href="#">
            <li> Help</li>
          </Link>
          <Link href="#" className="hidden lg:block">
            <li> Status</li>
          </Link>
          <Link href="#">
            <li> About</li>
          </Link>
          <Link href="#" className="hidden lg:block">
            <li> Careers </li>
          </Link>
          <Link href="#" className="hidden lg:block">
            <li> Press </li>
          </Link>
          <Link href="#" className="hidden lg:block">
            <li> Blog </li>
          </Link>
          <Link href="#">
            <li> Privacy</li>
          </Link>
          <Link href="#" className="hidden lg:block">
            <li> Text to speech</li>
          </Link>
          <Link href="#">
            <li> Terms </li>
          </Link>
        </ul>
      </nav>
    </footer>
  );
};

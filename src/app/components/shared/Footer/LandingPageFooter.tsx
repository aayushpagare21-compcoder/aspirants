import Link from "next/link";
import React from "react";

export const LandingPageFooter = () => {
  return (
    <footer className="w-full p-4 bg-black text-secondary lg:text-primary lg:bg-inherit z-10">
      <ul className="font-[family-name:var(--font-sohneone)] text-[12px] lg:text-[#6B6B6B] flex items-center justify-start lg:justify-center gap-6">
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
    </footer>
  );
};

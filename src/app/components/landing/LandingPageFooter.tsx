import Link from "next/link";
import React from "react";

export const LandingPageFooter = () => {
  return (
    <footer className="z-10 w-full bg-[#45474B] p-4 text-secondary-foreground lg:bg-inherit lg:text-primary">
      <nav>
        <ul className="flex items-center justify-start gap-6 font-[family-name:var(--font-sohneone)] text-[12px] lg:justify-center lg:text-[#6B6B6B]">
          <Link href="/about-us">
            <li> About Us </li>
          </Link>
          <Link href="/guide">
            <li> Guide </li>
          </Link>
          <Link href="/login">
            <li> Write </li>
          </Link>
          <Link href="/login">
            <li> Sign In </li>
          </Link>
        </ul>
      </nav>
    </footer>
  );
};

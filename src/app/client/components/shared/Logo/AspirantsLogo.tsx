import React from "react";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
export const AspirantsLogo = ({
  overrideClasses,
}: {
  overrideClasses?: string;
}) => {
  const defaultClasses =
    "flex font-[family-name:var(--font-gtsuper-medium)] text-[1.2rem] md:text-[1.4rem] font-bold gap-1 items-center";
  return (
    <Link href="/" passHref>
      <div className={cn(defaultClasses, overrideClasses)}>
        <Image
          className="h-10 w-10 md:h-12 md:w-12"
          src="/android-chrome-512x512.png"
          width={60}
          height={40}
          alt="aspirantsai logo"
        />
        <div className="mt-1 flex">
          <span className="text-tertiary">Aspirants</span>AI
        </div>
      </div>
    </Link>
  );
};

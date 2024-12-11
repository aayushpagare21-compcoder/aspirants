import React from "react";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
export const AspirantsLogo = ({
  overrideClasses,
}: {
  overrideClasses?: string;
}) => {
  const defaultClasses =
    "flex font-[family-name:var(--font-gtsuper-medium)] md:text-[1.4rem] font-bold gap-1 items-center";
  return (
    <div className={cn(defaultClasses, overrideClasses)}>
      <Image
        className="w-12 h-12"
        src="/android-chrome-512x512.png"
        width={60}
        height={40}
        alt="aspirantsai logo"
      />
      <div className="hidden md:flex mt-1">
        <span className="text-tertiary">Aspirants</span>AI
      </div>
    </div>
  );
};

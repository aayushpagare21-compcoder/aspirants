import React from "react";
import { cn } from "@/app/lib/utils";
export const AspirantsLogo = ({
  overrideClasses,
}: {
  overrideClasses?: string;
}) => {
  const defaultClasses =
    "font-[family-name:var(--font-gtsuper-medium)] text-[1.6rem] md:text-[1.8rem] font-bold";
  return (
    <div className={cn(defaultClasses, overrideClasses)}>
      <span className="text-tertiary">Aspirant</span>AI
    </div>
  );
};

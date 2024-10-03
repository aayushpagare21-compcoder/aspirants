import React from "react";
import { cn } from "@/app/lib/utils";

export const AspirantsLogo = ({
  overrideClasses,
}: {
  overrideClasses?: string;
}) => {
  const defaultClasses =
    "font-[family-name:var(--font-gtsuper-medium)] text-[2rem] font-bold";
  return <div className={cn(defaultClasses, overrideClasses)}>Medium</div>;
};

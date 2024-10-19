import React from "react";
import { cn } from "@/app/lib/utils";

export const Divider = ({
  overrideClassNames,
}: {
  overrideClassNames?: string;
}) => {
  const defaultClasses = "border border-b-primary w-full z-0";
  return <div className={cn(defaultClasses, overrideClassNames)}></div>;
};

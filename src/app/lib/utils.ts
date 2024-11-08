import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getAPI<T>(path: string): Promise<T> {
  const resp = await fetch(`${process.env.NEXT_BASE_URL}/api/${path}`, {
    ...(process.env.NODE_ENV === "development" && {
      cache: "no-store",
    }),
  });

  const data = await resp.json();

  return data as T;
}

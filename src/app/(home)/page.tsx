import { Button } from "@/app/components/ui/button";
import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="flex h-[90vh] w-[90vw] justify-between xl:w-[80vw] 2xl:w-[60vw]">
      <div className="mt-[6rem] flex flex-col justify-center gap-8 md:gap-12">
        <div className="font-[family-name:var(--font-gtsuper-medium)] text-[4rem] leading-[4rem] tracking-normal lg:text-[7rem] lg:leading-[7rem]">
          Aspirant <br /> {"write and inspire"}
        </div>
        <div className="font-[family-name:var(--font-sohneone)] text-[1.5rem] leading-none">
          A place to connect and collaborate with other aspirants
        </div>

        <Button
          className="mb-[1rem] w-[12rem] rounded-full py-6 text-[1.2rem]"
          variant="secondary"
        >
          <Link href="/login"> Start Writing </Link>
        </Button>
      </div>
    </section>
  );
}

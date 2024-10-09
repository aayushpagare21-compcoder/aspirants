import { Button } from "@/app/components/ui/button";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="flex h-[90vh] w-[90vw] justify-between xl:w-[80vw] 2xl:w-[60vw]">
      <div className="mt-[6rem] flex flex-col justify-center gap-8 md:gap-12">
        <div className="font-[family-name:var(--font-gtsuper-medium)] text-[5rem] leading-[4rem] tracking-normal text-black lg:text-[7rem] lg:leading-[6rem]">
          Human <br /> {"stories & ideas"}
        </div>
        <div className="font-[family-name:var(--font-sohneone)] text-[1.5rem] leading-none text-black">
          A place to read, write and deepen your understanding
        </div>

        <Button className="mb-[1rem] w-[12rem] rounded-full bg-[#1A8917] py-6 text-[1.2rem] text-white lg:bg-black">
          <Link href="/login"> Start reading </Link>
        </Button>
      </div>
      <Image
        src={"/images/medium.webp"}
        alt={"medium image here"}
        height={600}
        width={460}
        className="absolute right-0 z-0 hidden h-[600px] w-[460px] xl:bottom-[4vh] xl:block 2xl:bottom-[18vh]"
      />
    </section>
  );
}
